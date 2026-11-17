// 守卫：`npm run seo:check` 必须跑满 scripts/ 下的每一个 seo-*.test.mjs。
//
// 背景：seo:check 是显式枚举测试文件的，不是通配符。新增一个测试文件却忘了
// 加进这条命令时，本地手动跑 `node --test ./scripts/seo-*.test.mjs` 照样全绿，
// 但 `npm run build` 会静默跳过它——回归守卫等于没接上。这条用例就是把这个
// 缺口本身变成失败。
//
// 唯一需要维护的地方：新增测试文件时把它加进 seo:check（以及下面 allowlist，
// 只有在确实不想让它进构建时才写）。正常情况下 allowlist 保持为空。
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {fileURLToPath} from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scriptsDir = path.join(repoRoot, "scripts");

// 刻意不进 seo:check 的测试（需要真实网络、外部服务等）。目前没有。
const ALLOWED_TO_SKIP = new Set();

function readSeoCheckCommand() {
  const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));
  const command = pkg.scripts?.["seo:check"];

  assert.equal(typeof command, "string", "package.json 缺少 seo:check 脚本");
  return command;
}

function listedTestFiles(command) {
  return new Set(
    [...command.matchAll(/\.\/scripts\/([\w.-]+\.test\.mjs)/g)].map((match) => match[1]),
  );
}

function actualTestFiles() {
  return new Set(
    fs
      .readdirSync(scriptsDir)
      .filter((name) => /^seo-.*\.test\.mjs$/.test(name)),
  );
}

test("seo:check 覆盖 scripts 下全部 seo-*.test.mjs", () => {
  const listed = listedTestFiles(readSeoCheckCommand());
  const missing = [...actualTestFiles()].filter(
    (name) => !listed.has(name) && !ALLOWED_TO_SKIP.has(name),
  );

  assert.deepEqual(
    missing.sort(),
    [],
    `这些测试文件没有接入 seo:check，构建时不会跑到：${missing.join(", ")}`,
  );
});

test("seo:check 里列出的测试文件都真实存在", () => {
  const listed = listedTestFiles(readSeoCheckCommand());
  const existing = actualTestFiles();
  const stale = [...listed].filter((name) => !existing.has(name));

  assert.deepEqual(
    stale.sort(),
    [],
    `seo:check 引用了不存在的测试文件：${stale.join(", ")}`,
  );
});

test("seo:check 没有重复列出同一个测试文件", () => {
  const command = readSeoCheckCommand();
  const names = [...command.matchAll(/\.\/scripts\/([\w.-]+\.test\.mjs)/g)].map((match) => match[1]);
  const duplicates = names.filter((name, index) => names.indexOf(name) !== index);

  assert.deepEqual(duplicates, [], `seo:check 重复列出：${duplicates.join(", ")}`);
});
