/**
 * 将 ciwi-web-prod 的联盟表数据复制到已有数据的 Turso 库（如 admin-prod / admin-test）。
 * 只操作 AffiliateAccount、AffiliateSession、AffiliateClick，不影响 ReferralCode 等现有表。
 *
 * 前置：目标库先跑 schema 迁移
 *   $env:TURSO_ADMIN_DATABASE_URL="libsql://admin-prod-xxx.turso.io"
 *   $env:TURSO_ADMIN_AUTH_TOKEN="..."
 *   npm run turso:migrate
 *
 * 复制数据：
 *   $env:TURSO_SOURCE_DATABASE_URL="libsql://ciwi-web-prod-xxx.turso.io"
 *   $env:TURSO_SOURCE_AUTH_TOKEN="..."
 *   $env:TURSO_TARGET_DATABASE_URL="libsql://admin-prod-xxx.turso.io"
 *   $env:TURSO_TARGET_AUTH_TOKEN="..."
 *   npm run turso:copy-affiliate
 *
 * 可选：DRY_RUN=1 只统计行数，不写入。
 */
const fs = require("fs");
const path = require("path");
const {createClient} = require("@libsql/client/http");

const AFFILIATE_TABLES = ["AffiliateAccount", "AffiliateSession", "AffiliateClick"];
const BATCH_SIZE = 100;

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

function readCredentials(urlKey, tokenKey, label) {
  const url = process.env[urlKey]?.trim();
  const authToken = process.env[tokenKey]?.trim();

  if (!url?.startsWith("libsql://")) {
    throw new Error(`${label}：请设置有效的 ${urlKey}`);
  }

  if (!authToken) {
    throw new Error(`${label}：请设置 ${tokenKey}`);
  }

  return {url, authToken};
}

function createDbClient(credentials) {
  return createClient(credentials);
}

async function tableExists(client, tableName) {
  const result = await client.execute({
    sql: `SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?`,
    args: [tableName],
  });
  return result.rows.length > 0;
}

async function fetchAllRows(client, tableName) {
  const result = await client.execute(`SELECT * FROM "${tableName}"`);
  return result.rows;
}

function rowToArgs(row) {
  const columns = Object.keys(row);
  const placeholders = columns.map(() => "?").join(", ");
  const quotedColumns = columns.map((column) => `"${column}"`).join(", ");
  const args = columns.map((column) => row[column]);

  return {quotedColumns, placeholders, args};
}

async function upsertRows(client, tableName, rows, dryRun) {
  if (rows.length === 0) {
    console.log(`[turso:copy] ${tableName}: 源库 0 行，跳过`);
    return 0;
  }

  const sample = rowToArgs(rows[0]);
  const insertSql = `INSERT OR REPLACE INTO "${tableName}" (${sample.quotedColumns}) VALUES (${sample.placeholders})`;

  if (dryRun) {
    console.log(`[turso:copy] ${tableName}: 源库 ${rows.length} 行（DRY_RUN，未写入）`);
    return rows.length;
  }

  let written = 0;

  for (let offset = 0; offset < rows.length; offset += BATCH_SIZE) {
    const batch = rows.slice(offset, offset + BATCH_SIZE);
    const statements = batch.map((row) => {
      const {quotedColumns, placeholders, args} = rowToArgs(row);
      if (quotedColumns !== sample.quotedColumns) {
        throw new Error(`${tableName} 行结构不一致，请检查源库与目标库 schema 是否相同`);
      }

      return {
        sql: insertSql,
        args,
      };
    });

    await client.batch(statements, "write");
    written += batch.length;
    console.log(`[turso:copy] ${tableName}: 已写入 ${written}/${rows.length}`);
  }

  return written;
}

async function main() {
  const root = process.cwd();
  const loaded = loadDotEnv(path.join(root, ".env"));

  for (const [key, value] of Object.entries(loaded)) {
    if (process.env[key] === undefined || process.env[key] === "") {
      process.env[key] = value;
    }
  }

  const source = readCredentials(
    process.env.TURSO_SOURCE_DATABASE_URL?.trim()
      ? "TURSO_SOURCE_DATABASE_URL"
      : "TURSO_ADMIN_DATABASE_URL",
    process.env.TURSO_SOURCE_AUTH_TOKEN?.trim()
      ? "TURSO_SOURCE_AUTH_TOKEN"
      : "TURSO_ADMIN_AUTH_TOKEN",
    "源库",
  );

  const target = readCredentials(
    "TURSO_TARGET_DATABASE_URL",
    "TURSO_TARGET_AUTH_TOKEN",
    "目标库",
  );

  if (source.url === target.url) {
    throw new Error("源库与目标库 URL 相同，拒绝执行");
  }

  const dryRun = ["1", "true", "yes"].includes(String(process.env.DRY_RUN || "").toLowerCase());

  const sourceClient = createDbClient(source);
  const targetClient = createDbClient(target);

  console.log("[turso:copy] 源库:", source.url);
  console.log("[turso:copy] 目标库:", target.url);
  if (dryRun) {
    console.log("[turso:copy] DRY_RUN 模式");
  }

  for (const tableName of AFFILIATE_TABLES) {
    const existsOnSource = await tableExists(sourceClient, tableName);
    if (!existsOnSource) {
      throw new Error(`源库缺少表 ${tableName}`);
    }

    const existsOnTarget = await tableExists(targetClient, tableName);
    if (!existsOnTarget) {
      throw new Error(
        `目标库缺少表 ${tableName}，请先在目标库执行 npm run turso:migrate`,
      );
    }
  }

  let total = 0;

  for (const tableName of AFFILIATE_TABLES) {
    const rows = await fetchAllRows(sourceClient, tableName);
    total += await upsertRows(targetClient, tableName, rows, dryRun);
  }

  console.log(`[turso:copy] 完成，共处理 ${total} 行`);
}

main().catch((error) => {
  console.error("[turso:copy] 失败:", error.message || error);
  process.exit(1);
});
