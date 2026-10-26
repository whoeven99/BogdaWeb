#!/usr/bin/env node
/**
 * 由 535 条关键词数据 + 人工意图合并表，生成关键词页的内容计划。
 *
 * 输出：
 *   docs/keyword-content-plan.csv  —— 逐词的计划表（供业务方标注）
 *
 * 校验规则（任一不满足即退出非 0）：
 *   - 合并表中的每个关键词必须在数据里精确存在
 *   - 同一关键词不能出现在两个合并组里
 *   - 同组的词必须落在同一个正文簇（howToSolve 相同），跨簇合并需显式允许
 *
 * 用法：node ./scripts/build-keyword-content-plan.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dataPath = path.join(root, "src/content/data/shopify_keyword_use_cases.json");
const mapPath = path.join(root, "docs/keyword-intent-map.json");
const outPath = path.join(root, "docs/keyword-content-plan.csv");

const items = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const intentMap = JSON.parse(fs.readFileSync(mapPath, "utf8"));

const byKeyword = new Map();
for (const it of items) {
  if (byKeyword.has(it.keyword)) {
    console.error(`数据重复：关键词 "${it.keyword}" 出现多次`);
    process.exit(1);
  }
  byKeyword.set(it.keyword, it);
}

const clusterOf = (kw) => byKeyword.get(kw).howToSolve;

const allowCross = new Set(intentMap.allowCrossCluster ?? []);

const groupOf = new Map(); // keyword -> group index
const problems = [];
intentMap.groups.forEach((group, gi) => {
  if (group.length < 2) problems.push(`第 ${gi + 1} 组只有一个词：${group[0]}`);
  for (const kw of group) {
    if (!byKeyword.has(kw)) {
      problems.push(`合并表中的关键词在数据里不存在："${kw}"`);
      continue;
    }
    if (groupOf.has(kw)) problems.push(`关键词被分配了两次："${kw}"`);
    groupOf.set(kw, gi);
  }
  const clusters = new Set(group.filter((kw) => byKeyword.has(kw)).map(clusterOf));
  if (clusters.size > 1 && !allowCross.has(group[0])) {
    problems.push(`第 ${gi + 1} 组跨簇合并（${clusters.size} 个簇）：${group[0]}`);
  }
});

if (problems.length) {
  console.error("意图表校验失败：");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

const rows = [];
items.forEach((it) => {
  const gi = groupOf.get(it.keyword);
  let action = "standalone";
  let canonical = it.keyword;
  let intentKey = `single:${it.slug}`;
  if (gi !== undefined) {
    const group = intentMap.groups[gi];
    canonical = group[0];
    intentKey = `intent:${gi + 1}`;
    action = group[0] === it.keyword ? "canonical" : "consolidate";
  }
  rows.push({
    clusterId: "",
    category: it.category,
    keyword: it.keyword,
    slug: it.slug,
    intentGroup: intentKey,
    action,
    canonicalKeyword: canonical,
    intentSize: gi !== undefined ? intentMap.groups[gi].length : 1,
    titleLen: it.title.length,
  });
});

// 簇编号：按类目 + 首词稳定排序
const clusterKeys = [...new Set(items.map((i) => i.category + "\u0000" + i.howToSolve))];
const sorted = [...clusterKeys].sort((a, b) => a.localeCompare(b));
const clusterIndex = new Map(sorted.map((k, i) => [k, i + 1]));
for (const r of rows) {
  const it = byKeyword.get(r.keyword);
  r.clusterId = clusterIndex.get(it.category + "\u0000" + it.howToSolve);
}

const esc = (v) => {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const header = ["簇号", "类目", "关键词", "当前slug", "意图组", "我的建议", "建议主关键词", "同组词数", "你的决定", "备注"];
const lines = [header.join(",")];
for (const r of rows.sort((a, b) => a.clusterId - b.clusterId || a.keyword.localeCompare(b.keyword))) {
  lines.push([
    r.clusterId, r.category, r.keyword, r.slug, r.intentGroup,
    r.action === "standalone" ? "独立成页" : r.action === "canonical" ? "作为规范页" : "合并 301",
    r.canonicalKeyword, r.intentSize, "", "",
  ].map(esc).join(","));
}
fs.writeFileSync(outPath, "\uFEFF" + lines.join("\n") + "\n", "utf8");

const standalone = rows.filter((r) => r.action === "standalone").length;
const canonical = rows.filter((r) => r.action === "canonical").length;
const consolidated = rows.filter((r) => r.action === "consolidate").length;
console.log(`原始关键词            : ${rows.length}`);
console.log(`独立成页              : ${standalone}`);
console.log(`合并组规范页          : ${canonical}`);
console.log(`合并掉的 URL          : ${consolidated}`);
console.log(`需要唯一正文的页面数  : ${standalone + canonical}  (英文) / ${(standalone + canonical) * 2} 篇中英合计`);
console.log(`URL 总量              : ${rows.length} -> ${standalone + canonical}`);
console.log(`输出                  : ${path.relative(root, outPath)}`);
