/**
 * 对 Turso 做 Prisma 风格增量迁移：维护 _prisma_migrations，只执行未应用的 migration.sql。
 *
 * Prisma CLI 的 `migrate deploy` 在 provider=sqlite 时要求 DATABASE_URL 为 file:，
 * 不能直接连 libsql://。本脚本用 @libsql/client 执行 SQL。
 *
 * 用法：npm run turso:migrate
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const {createClient} = require("@libsql/client/http");

const PRISMA_MIGRATIONS_DDL = `
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL,
    "applied_steps_count"   INTEGER NOT NULL DEFAULT 0
);
`;

function loadDotEnv(dotenvPath) {
  if (!fs.existsSync(dotenvPath)) {
    return {};
  }

  const content = fs.readFileSync(dotenvPath, "utf8");
  const result = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const idx = line.indexOf("=");
    if (idx <= 0) {
      continue;
    }

    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

function listMigrations(migrationsDir) {
  if (!fs.existsSync(migrationsDir)) {
    return [];
  }

  return fs
    .readdirSync(migrationsDir, {withFileTypes: true})
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .map((name) => ({
      name,
      sqlPath: path.join(migrationsDir, name, "migration.sql"),
    }))
    .filter((migration) => fs.existsSync(migration.sqlPath));
}

function checksumSql(sql) {
  return crypto.createHash("sha256").update(sql, "utf8").digest("hex");
}

function splitStatements(sql) {
  return sql
    .split(/;\s*(?:\r?\n|$)/g)
    .map((statement) => statement.trim())
    .filter(Boolean);
}

async function executeWithRetry(client, statement, maxAttempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await client.execute(statement);
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 800));
      }
    }
  }

  throw lastError;
}

function stripLeadingSqlComments(statement) {
  return statement
    .split(/\r?\n/)
    .filter((line) => !/^\s*--/.test(line))
    .join("\n")
    .trim();
}

async function executeMigrationStatement(client, statement) {
  try {
    return await executeWithRetry(client, statement);
  } catch (error) {
    const msg = String(error.message || error);
    const executable = stripLeadingSqlComments(statement);
    const isAlterAdd = /^\s*ALTER\s+TABLE\b/i.test(executable) && /\bADD\s+COLUMN\b/i.test(executable);
    if (isAlterAdd && /duplicate column name/i.test(msg)) {
      console.log(`[turso:migrate] 跳过已存在列 (${executable.split(/\s+/).slice(-3).join(" ")})`);
      return;
    }

    const isCreateIndex = /^\s*CREATE\s+(UNIQUE\s+)?INDEX\b/i.test(executable);
    if (isCreateIndex && /already exists/i.test(msg)) {
      console.log("[turso:migrate] 跳过已存在索引");
      return;
    }

    throw error;
  }
}

async function getAppliedNames(client) {
  const result = await client.execute(
    'SELECT migration_name FROM "_prisma_migrations" WHERE rolled_back_at IS NULL',
  );
  return new Set(result.rows.map((row) => String(row.migration_name)));
}

async function markApplied(client, migrationName, sql) {
  const now = new Date().toISOString().replace("T", " ").replace("Z", "");
  await client.execute({
    sql: `INSERT INTO "_prisma_migrations"
      (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
      VALUES (?, ?, ?, ?, NULL, NULL, ?, 1)`,
    args: [crypto.randomUUID(), checksumSql(sql), now, migrationName, now],
  });
}

async function main() {
  const root = process.cwd();
  const loaded = loadDotEnv(path.join(root, ".env"));

  for (const [key, value] of Object.entries(loaded)) {
    if (process.env[key] === undefined || process.env[key] === "") {
      process.env[key] = value;
    }
  }

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url?.startsWith("libsql://")) {
    throw new Error("请设置有效的 TURSO_DATABASE_URL，例如 libsql://xxx.turso.io");
  }

  if (!authToken) {
    throw new Error("请设置 TURSO_AUTH_TOKEN");
  }

  const client = createClient({url, authToken});
  const migrations = listMigrations(path.join(root, "prisma", "migrations"));

  await executeWithRetry(client, PRISMA_MIGRATIONS_DDL.trim());
  const applied = await getAppliedNames(client);
  let ran = 0;

  for (const migration of migrations) {
    if (applied.has(migration.name)) {
      continue;
    }

    const sql = fs.readFileSync(migration.sqlPath, "utf8");
    console.log(`[turso:migrate] 应用: ${migration.name}`);

    for (const statement of splitStatements(sql)) {
      await executeMigrationStatement(client, statement);
    }

    await markApplied(client, migration.name, sql);
    ran += 1;
  }

  const status = await client.execute(
    'SELECT migration_name, finished_at FROM "_prisma_migrations" ORDER BY finished_at',
  );
  console.log(`[turso:migrate] 本次应用 ${ran} 条 migration`);
  console.log(`[turso:migrate] 共 ${status.rows.length} 条记录在 _prisma_migrations`);

  if (ran === 0) {
    console.log("[turso:migrate] 无待执行 migration（已是最新）");
  }
}

main().catch((error) => {
  console.error("[turso:migrate] 失败:", error.message || error);
  process.exit(1);
});
