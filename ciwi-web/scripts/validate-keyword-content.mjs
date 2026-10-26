#!/usr/bin/env node
/**
 * 校验关键词页正文是否达到撰写标准。
 *
 * 与旧版的区别（针对评审反馈修复的三处假阳性）：
 *   1. 步骤切分改用与 page.tsx 的 splitHowToSteps 完全一致的「按语言分叉」逻辑。
 *      旧版对中文按句号切、但模板按英文句末切，导致「校验通过」而页面渲染为 1 步。
 *   2. 跨页去重改用全文 n-gram Jaccard 相似度，不再只比较英文开头 120 字符。
 *   3. 「三个专属数字」改为检查数字是否带有规则上下文（单位/口径/来源）并统计跨页复用，
 *      不再只是统计出现了几个数字词。
 *
 * 用法：
 *   node ./scripts/validate-keyword-content.mjs [相对仓库根目录的文件]
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const target = process.argv[2] ?? "docs/keyword-content-pilot.json";
const file = path.resolve(root, target);

const MIN_SCENARIO = 85;
const MAX_SCENARIO = 130;
const MIN_STEPS_WORDS = 240;
const MAX_STEPS_WORDS = 330;
const MIN_PROMPT = 170;
const MAX_PROMPT = 230;
const MIN_FAQ = 50;
const MAX_FAQ = 95;
const MIN_STEP_CHARS = 60;
const MAX_CROSS_PAGE_JACCARD = 0.3;

const REQUIRED = [
  "slug", "keyword", "category", "title", "scenarioDescription", "howToSolve", "aiPrompt", "faqs",
  "zh_keyword", "zh_category", "zh_title", "zh_scenarioDescription", "zh_howToSolve", "zh_aiPrompt", "zh_faqs",
];

const words = (text) => String(text ?? "").trim().split(/\s+/).filter(Boolean).length;

/**
 * 与 page.tsx 的 splitHowToSteps 保持逐字一致。
 * 中文没有「句点 + 空格 + 大写字母」形态，必须走 CJK 分支，否则整段被当作一步。
 */
function splitSteps(text, locale = "en") {
  if (!text) return [];
  const raw = String(text).trim();
  if (locale === "zh-cn") {
    const parts = raw.split(/(?<=[。！？])/).map((s) => s.trim()).filter((s) => s.length > 0);
    return parts.length ? parts : [raw];
  }
  const parts = raw.split(/(?<=[.!?])\s+(?=[A-Z])/).map((s) => s.trim()).filter(Boolean);
  if (parts.length <= 1) {
    const fallback = raw.split(". ").map((s) => s.trim()).filter((s) => s.length > 20);
    return fallback.length ? fallback : [raw];
  }
  return parts;
}

const zhLength = (text) => String(text ?? "").replace(/\s/g, "").length;

// 数字 + 规则上下文：只有带上单位/口径/来源，才算「可复核的规则」而不是装饰性数字。
const UNIT = "(?:%|percent|days?|weeks?|months?|hours?|minutes?|units?|SKUs?|variants?|orders?|sessions?|listings?|reviews?|candidates?|quarters?|years?)";
const NUM_WITH_UNIT = new RegExp(`\\d+(?:\\.\\d+)?[\\s\\-]?${UNIT}`, "gi");
// 裸数字：排除 GA4、Shopify 360 这类「字母+数字」的产品名中的数字
const NUM_BARE = /(?<![A-Za-z0-9])\d+(?:\.\d+)?/g;

// 把数字标注为「示例 / 配置 / 有出处」的措辞
const FRAMING = /(for example|such as|you set|you choose|you calibrate|you pick|start(?:ing)? (?:at|point|with)|merchant[ -]specific|depends on|your own|a useful|a workable|a practical|where the|which percentile|state which|per your|configured|from \[)/i;

const shingles = (text, n = 5) => {
  const toks = String(text ?? "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= toks.length; i += 1) set.add(toks.slice(i, i + n).join(" "));
  return set;
};
const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter += 1;
  return inter / (a.size + b.size - inter);
};

// 本次评审点名、不得再次出现的普遍化断言
const FORBIDDEN = [
  {re: /only good for about six weeks|only good for six weeks|only good for\s+about\s+six\s+weeks/i, why: "把需求信号有效期写成普遍结论"},
  {re: /decay in roughly four to eight weeks|four to eight weeks/i, why: "把衰减周期写成行业通则"},
  {re: /at least 100 conversions per variant/i, why: "把固定转化数当作样本量判据"},
  {re: /whichever (?:comes|is) (?:later|later)/i, why: "与正文的「或」表述自相矛盾"},
  {re: /stop early only when the observed difference exceeds/i, why: "把观测差异当作提前停止判据"},
  {re: /recoverable revenue/i, why: "隐含全部流失均可回收"},
  {re: /20 to 30%|20–30%|twenty to thirty percent/i, why: "预设建模比例，无依据"},
  {re: /at least 40 (?:fields|attributes)|more than five fields/i, why: "字段数量缺少类目依据"},
  {re: /first 100 characters/i, why: "关于搜索摘要长度的不准确说法"},
  {re: /only.*duplicate.*SEO risk|SEO risk.*only.*duplicate/i, why: "关于 SEO 风险的绝对化表述"},
];

const records = JSON.parse(fs.readFileSync(file, "utf8"));
const list = Array.isArray(records) ? records : records.records ?? [];
const problems = [];
const enShingles = new Map();
const zhShingles = new Map();
const numUsage = new Map();

list.forEach((r, i) => {
  const id = r.slug ?? `#${i + 1}`;
  const push = (msg) => problems.push(`${id}: ${msg}`);

  for (const field of REQUIRED) if (!r[field]) push(`缺字段 ${field}`);
  if (!r.scenarioDescription) return;

  // ---- 英文侧 ----
  const scenario = words(r.scenarioDescription);
  if (scenario < MIN_SCENARIO || scenario > MAX_SCENARIO) {
    push(`scenarioDescription ${scenario} 词，应在 ${MIN_SCENARIO}–${MAX_SCENARIO}`);
  }

  const steps = splitSteps(r.howToSolve, "en");
  const stepWords = words(r.howToSolve);
  if (stepWords < MIN_STEPS_WORDS || stepWords > MAX_STEPS_WORDS) {
    push(`howToSolve ${stepWords} 词，应在 ${MIN_STEPS_WORDS}–${MAX_STEPS_WORDS}`);
  }
  if (steps.length < 5 || steps.length > 6) {
    push(`howToSolve 按模板正则切出 ${steps.length} 步，应 5–6 步`);
  }
  steps.forEach((s, si) => {
    if (s.length < MIN_STEP_CHARS) push(`step[${si}] 仅 ${s.length} 字符，信息量不足`);
  });

  const prompt = words(r.aiPrompt);
  if (prompt < MIN_PROMPT || prompt > MAX_PROMPT) {
    push(`aiPrompt ${prompt} 词，应在 ${MIN_PROMPT}–${MAX_PROMPT}`);
  }

  if (!Array.isArray(r.faqs) || r.faqs.length !== 3) {
    push(`faqs 应为 3 条，实际 ${Array.isArray(r.faqs) ? r.faqs.length : 0}`);
  } else {
    r.faqs.forEach((f, fi) => {
      const len = words(f.answer);
      if (len < MIN_FAQ || len > MAX_FAQ) push(`faqs[${fi}] answer ${len} 词，应在 ${MIN_FAQ}–${MAX_FAQ}`);
      if (!f.question || f.question.length < 15) push(`faqs[${fi}] question 过短`);
    });
  }

  // ---- 中文侧：步数必须与模板 zh 分支一致 ----
  const zhSteps = splitSteps(r.zh_howToSolve, "zh-cn");
  if (zhSteps.length < 5 || zhSteps.length > 6) {
    push(`zh_howToSolve 按模板 CJK 分支切出 ${zhSteps.length} 句，应 5–6 句`);
  }
  if (zhSteps.length !== steps.length) {
    push(`中英步骤数不一致（en ${steps.length} / zh ${zhSteps.length}），双语规则有遗漏`);
  }
  if (zhLength(r.zh_scenarioDescription) < 120) {
    push(`zh_scenarioDescription 仅 ${zhLength(r.zh_scenarioDescription)} 字，信息量不足`);
  }
  if (!Array.isArray(r.zh_faqs) || r.zh_faqs.length !== (Array.isArray(r.faqs) ? r.faqs.length : 0)) {
    push(`zh_faqs 条数应与 faqs 一致（${Array.isArray(r.faqs) ? r.faqs.length : 0}）`);
  }
  (r.zh_faqs ?? []).forEach((f, fi) => {
    if (zhLength(f.answer) < 60) push(`zh_faqs[${fi}] 仅 ${zhLength(f.answer)} 字，应 ≥60 字`);
  });

  // ---- 数字必须带规则上下文，且不能全站复用同一组数字 ----
  const body = `${r.scenarioDescription} ${r.howToSolve}`;
  const withUnit = new Set((body.match(NUM_WITH_UNIT) ?? []).map((s) => s.toLowerCase().replace(/\s+/g, "")));
  if (withUnit.size < 3) {
    push(`带单位的阈值/周期只有 ${withUnit.size} 处（${[...withUnit].join(", ") || "无"}），要求 ≥3`);
  }
  // 已被单位覆盖的数字不需要再要求「示例/配置」措辞，否则判定过严。
  const unitRanges = [];
  for (const m of body.matchAll(NUM_WITH_UNIT)) {
    unitRanges.push([m.index, m.index + m[0].length]);
  }
  const covered = (start, end) => unitRanges.some(([s, e]) => start < e && end > s);

  const unframed = [];
  for (const m of body.matchAll(NUM_BARE)) {
    const start = m.index;
    const end = start + m[0].length;
    if (covered(start, end)) continue;
    const win = body.slice(Math.max(0, start - 140), end + 140);
    if (!FRAMING.test(win)) unframed.push(m[0]);
  }
  if (unframed.length) {
    push(`以下数字未标注为示例/配置/有出处：${unframed.join(", ")}`);
  }
  for (const n of withUnit) numUsage.set(n, (numUsage.get(n) ?? 0) + 1);

  // ---- 提示词必须有缺项兜底 ----
  if (!/cannot determine|write unknown|insufficient evidence/i.test(String(r.aiPrompt))) {
    push(`aiPrompt 缺少「缺项即输出不可判断」的兜底指令`);
  }
  if (!/不可判断|未知|证据不足/.test(String(r.zh_aiPrompt ?? ""))) {
    push(`zh_aiPrompt 缺少「缺项即输出不可判断」的兜底指令`);
  }

  // ---- 标题须含关键词核心词 ----
  const core = String(r.keyword).toLowerCase().split(" ").slice(-2).join(" ");
  if (!String(r.title).toLowerCase().includes(core)) push(`title 未包含关键词核心词：${r.keyword}`);
  if (/[㐀-鿿]/.test(String(r.title))) push(`英文 title 含中文字符`);

  // ---- 跨页去重（全文 n-gram）----
  const es = shingles(`${r.scenarioDescription} ${r.howToSolve} ${r.aiPrompt}`);
  for (const [other, set] of enShingles) {
    const j = jaccard(es, set);
    if (j > MAX_CROSS_PAGE_JACCARD) push(`英文正文与 ${other} 相似度过高（Jaccard ${(j * 100).toFixed(1)}%）`);
  }
  enShingles.set(id, es);

  const zs = new Set(
    String(`${r.zh_scenarioDescription}${r.zh_howToSolve}${r.zh_aiPrompt}`)
      .replace(/\s/g, "")
      .match(/.{4}/g) ?? []
  );
  for (const [other, set] of zhShingles) {
    const j = jaccard(zs, set);
    if (j > MAX_CROSS_PAGE_JACCARD) push(`中文正文与 ${other} 相似度过高（Jaccard ${(j * 100).toFixed(1)}%）`);
  }
  zhShingles.set(id, zs);
});

// ---- 全站回归：禁止的普遍化断言 ----
list.forEach((r) => {
  for (const field of ["scenarioDescription", "howToSolve", "aiPrompt", ...(r.faqs ?? []).flatMap((f) => [f.question, f.answer])]) {
    const text = typeof field === "string" ? field : "";
    for (const {re, why} of FORBIDDEN) {
      if (re.test(text)) problems.push(`${r.slug}: 命中禁止表述（${why}）-> ${text.slice(0, 80)}`);
    }
  }
  for (const field of ["zh_scenarioDescription", "zh_howToSolve", "zh_aiPrompt", ...(r.zh_faqs ?? []).flatMap((f) => [f.question, f.answer])]) {
    const text = typeof field === "string" ? field : "";
    if (/必然|一定会被|所有.*都会/.test(text)) problems.push(`${r.slug}: 中文含绝对化表述 -> ${text.slice(0, 80)}`);
  }
});

const avg = (fn) => Math.round(list.reduce((s, r) => s + fn(r), 0) / list.length);

if (problems.length) {
  console.error(`✗ ${target}：${problems.length} 处不达标\n`);
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

console.log(`✓ ${target}：${list.length} 条全部达标`);
console.log(`  scenario 均值 ${avg((r) => words(r.scenarioDescription))} 词 · howToSolve 均值 ${avg((r) => words(r.howToSolve))} 词 / ${avg((r) => splitSteps(r.howToSolve, "en").length)} 步 · aiPrompt 均值 ${avg((r) => words(r.aiPrompt))} 词`);
const shared = [...numUsage.entries()].filter(([, c]) => c > 3).map(([n, c]) => `${n}×${c}`);
console.log(`  跨页复用 3 次以上的数字：${shared.length ? shared.join(", ") : "无"}`);
