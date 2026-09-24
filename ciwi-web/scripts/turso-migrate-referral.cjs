/**
 * 在翻译库和 Spark 库补齐 ReferralInstall、ReferralClaim。
 * 只执行这一份 SQL，不会动联盟账号表。
 *
 * 用法：npm run turso:migrate-referral
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const {createClient} = require("@libsql/client/http");

const MIGRATION_NAME = "20260924000000_referral_install_claim";

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

function loadEnv() {
  const root = process.cwd();
  const loaded = {
    ...loadDotEnv(path.join(root, "..", ".env")),
    ...loadDotEnv(path.join(root, ".env")),
  };

  for (const [key, value] of Object.entries(loaded)) {
    if (process.env[key] === undefined || process.env[key] === "") {
      process.env[key] = value;
    }
  }
}

function splitStatements(sql) {
  return sql
    .split(/;\s*(?:\r?\n|$)/g)
    .map((statement) => statement.trim())
    .filter(Boolean);
}

function checksumSql(sql) {
  return crypto.createHash("sha256").update(sql, "utf8").digest("hex");
}

function reachableUrl(url) {
  // 本机到 *.aws-us-west-2.turso.io 的 ELB 会连接超时，短域名指向同一库。
  return url.replace(".aws-us-west-2.turso.io", ".turso.io");
}

async function alreadyApplied(client) {
  const result = await client.execute({
    sql: `SELECT 1 AS found FROM "_prisma_migrations" WHERE migration_name = ? AND rolled_back_at IS NULL LIMIT 1`,
    args: [MIGRATION_NAME],
  });
  return result.rows.length > 0;
}

async function markApplied(client, sql) {
  const now = new Date().toISOString().replace("T", " ").replace("Z", "");
  await client.execute({
    sql: `INSERT INTO "_prisma_migrations"
      (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
      VALUES (?, ?, ?, ?, NULL, NULL, ?, 1)`,
    args: [crypto.randomUUID(), checksumSql(sql), now, MIGRATION_NAME, now],
  });
}

async function applyToDatabase(label, url, authToken, sql) {
  if (!url?.startsWith("libsql://") || !authToken) {
    throw new Error(`${label} 未配置`);
  }

  const client = createClient({url: reachableUrl(url), authToken});
  await client.execute(PRISMA_MIGRATIONS_DDL.trim());

  if (await alreadyApplied(client)) {
    console.log(`[turso:migrate-referral] ${label} 已应用，跳过`);
    return;
  }

  console.log(`[turso:migrate-referral] 应用 ${label}: ${reachableUrl(url)}`);
  for (const statement of splitStatements(sql)) {
    await client.execute(statement);
  }
  await markApplied(client, sql);

  const tables = await client.execute(
    `SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('ReferralInstall', 'ReferralClaim') ORDER BY name`,
  );
  console.log(
    `[turso:migrate-referral] ${label} 现有表: ${tables.rows.map((row) => row.name).join(", ")}`,
  );
}

async function main() {
  loadEnv();
  const sqlPath = path.join(process.cwd(), "prisma", "migrations", MIGRATION_NAME, "migration.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");

  await applyToDatabase("TURSO_TSF", process.env.TURSO_TSF_DATABASE_URL, process.env.TURSO_TSF_AUTH_TOKEN, sql);
  await applyToDatabase("TURSO_SPARK", process.env.TURSO_SPARK_DATABASE_URL, process.env.TURSO_SPARK_AUTH_TOKEN, sql);
}

main().catch((error) => {
  console.error("[turso:migrate-referral] 失败:", error.message || error);
  process.exit(1);
});
