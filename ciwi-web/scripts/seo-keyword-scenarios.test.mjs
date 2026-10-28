// 防止 Spark 关键词场景页的内容再次退化成模板复制。
//
// 2026-10-26 之前 `shopify_keyword_use_cases.json` 里：
//   - EN howToSolve 只有 167 个不同值覆盖 535 个场景（同一 category 内整段完全相同）
//   - ZH 更差：zh_howToSolve 只有 **9** 个不同值覆盖全部 535 个场景，且被跨 43 个类目
//     复用——"转化分析"的页面渲染的是"商品/变体 ID、供应商资料"这类完全不相干的中文步骤。
// 结果：同一 topic 的关键词页两两 8-gram Jaccard 高达 0.936（博客文章之间仅 0.208），
// Google 判定 Soft 404。
//
// 这里把重写后的不变量固化成断言：每个场景都要有自己的步骤与 FAQ，且要能被页面正确切分。
import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const scenarios = JSON.parse(
  fs.readFileSync(new URL("../src/content/data/shopify_keyword_use_cases.json", import.meta.url), "utf8")
);

/** Mirrors splitHowToSteps() in the keyword detail page for the English locale. */
function splitEn(text) {
  const raw = String(text ?? "").trim();
  let parts = raw
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length <= 1) {
    parts = raw
      .split(". ")
      .map((s) => s.trim())
      .filter((s) => s.length > 20);
  }
  return parts.length ? parts : [raw];
}

/** Mirrors splitHowToSteps() for the zh-cn locale. */
function splitZh(text) {
  const raw = String(text ?? "").trim();
  const parts = raw
    .split(/(?<=[。！？])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length ? parts : [raw];
}

const hanCount = (value) => (String(value).match(/[㐀-鿿]/g) ?? []).length;

function groupByCategory() {
  const groups = new Map();
  for (const item of scenarios) {
    if (!groups.has(item.category)) groups.set(item.category, []);
    groups.get(item.category).push(item);
  }
  return groups;
}

test("每个场景都有独立的英文解决步骤（类目内不重复）", () => {
  const dupes = [];
  for (const [category, items] of groupByCategory()) {
    const distinct = new Set(items.map((item) => String(item.howToSolve).trim()));
    if (distinct.size !== items.length) {
      dupes.push(`${category}: ${items.length} 条仅 ${distinct.size} 个不同值`);
    }
  }
  assert.deepEqual(dupes, [], `同类目内出现了重复的 howToSolve:\n${dupes.join("\n")}`);
});

test("每个场景都有独立的中文解决步骤（类目内不重复）", () => {
  const dupes = [];
  for (const [category, items] of groupByCategory()) {
    const distinct = new Set(items.map((item) => String(item.zh_howToSolve).trim()));
    if (distinct.size !== items.length) {
      dupes.push(`${category}: ${items.length} 条仅 ${distinct.size} 个不同值`);
    }
  }
  assert.deepEqual(dupes, [], `同类目内出现了重复的 zh_howToSolve:\n${dupes.join("\n")}`);
});

test("中英文步骤都能被页面正确切成 3 段", () => {
  const bad = [];
  for (const item of scenarios) {
    const en = splitEn(item.howToSolve);
    if (en.length !== 3) bad.push(`${item.slug}: EN 切成 ${en.length} 段`);
    const zh = splitZh(item.zh_howToSolve);
    if (zh.length !== 3) bad.push(`${item.slug}: ZH 切成 ${zh.length} 段`);
  }
  assert.deepEqual(bad.slice(0, 10), [], `步骤切分异常 ${bad.length} 处:\n${bad.slice(0, 10).join("\n")}`);
});

test("中文字段是真实中文且没有占位符", () => {
  const bad = [];
  for (const item of scenarios) {
    if (hanCount(item.zh_howToSolve) < 40) bad.push(`${item.slug}: zh_howToSolve 汉字过少`);
    if (hanCount(item.zh_title) === 0) bad.push(`${item.slug}: zh_title 无汉字`);
    if (hanCount(item.zh_scenarioDescription) < 20) bad.push(`${item.slug}: zh_scenarioDescription 汉字过少`);
    for (const field of ["zh_title", "zh_scenarioDescription", "zh_howToSolve"]) {
      if (/\[[^\]]+\]/.test(item[field])) bad.push(`${item.slug}: ${field} 含占位符`);
    }
  }
  assert.deepEqual(bad.slice(0, 10), [], `中文字段异常 ${bad.length} 处:\n${bad.slice(0, 10).join("\n")}`);
});

// 2026-10-27：aiPrompt / scenarioDescription 也曾经是整类目复制的模板——
// 同类目内 aiPrompt 的 8-gram 相似度高达 0.894，占整页约 27%，是 Google 判 Soft 404 的另一半原因。
// 现在每条场景的提示词都由它自己的 three steps 生成，这里把相似度上限固化下来。
const EN_PROMPT_PREFIX = "Act as a Shopify operations specialist. Help me ";
const EN_PROMPT_SUFFIX = " for the specified task. Show the relevant evidence";
const ZH_PROMPT_PREFIX = "你是一名 Shopify 运营专家。请帮我处理「";
const ZH_PROMPT_SUFFIX = "3. 输出问题判断";

/** 去掉固定前后缀，只留下随场景变化的核心部分。 */
function promptCore(prompt, prefix, suffix) {
  let text = String(prompt ?? "");
  if (text.startsWith(prefix)) text = text.slice(prefix.length);
  const cut = text.indexOf(suffix);
  return (cut === -1 ? text : text.slice(0, cut)).trim();
}

function wordGrams(text, n = 8) {
  const words = text.split(/\s+/).filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= words.length; i += 1) set.add(words.slice(i, i + n).join(" "));
  return set;
}

function charGrams(text, n = 4) {
  const compact = String(text).replace(/\s+/g, "");
  const set = new Set();
  for (let i = 0; i + n <= compact.length; i += 1) set.add(compact.slice(i, i + n));
  return set;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let shared = 0;
  for (const value of a) if (b.has(value)) shared += 1;
  return shared / (a.size + b.size - shared);
}

test("每个场景都有独立的情景描述与提示词核心（类目内不重复）", () => {
  const bad = [];
  for (const [category, items] of groupByCategory()) {
    for (const [label, value] of [
      ["scenarioDescription", (i) => String(i.scenarioDescription).trim()],
      ["aiPrompt core", (i) => promptCore(i.aiPrompt, EN_PROMPT_PREFIX, EN_PROMPT_SUFFIX)],
      ["zh_scenarioDescription", (i) => String(i.zh_scenarioDescription).trim()],
      ["zh_aiPrompt core", (i) => promptCore(i.zh_aiPrompt, ZH_PROMPT_PREFIX, ZH_PROMPT_SUFFIX)],
    ]) {
      const distinct = new Set(items.map(value));
      if (distinct.size !== items.length) {
        bad.push(`${category}: ${label} ${items.length} 条仅 ${distinct.size} 个不同值`);
      }
    }
  }
  assert.deepEqual(bad.slice(0, 10), [], `情景描述/提示词出现重复:\n${bad.slice(0, 10).join("\n")}`);
});

test("提示词保留固定前后缀，核心里不含模板套话", () => {
  const bad = [];
  for (const item of scenarios) {
    if (!String(item.aiPrompt).startsWith(EN_PROMPT_PREFIX)) bad.push(`${item.slug}: aiPrompt 缺少固定前缀`);
    if (!String(item.aiPrompt).includes(EN_PROMPT_SUFFIX)) bad.push(`${item.slug}: aiPrompt 缺少固定后缀`);
    if (!String(item.zh_aiPrompt).startsWith(ZH_PROMPT_PREFIX)) bad.push(`${item.slug}: zh_aiPrompt 缺少固定前缀`);
    if (!String(item.zh_aiPrompt).includes(ZH_PROMPT_SUFFIX)) bad.push(`${item.slug}: zh_aiPrompt 缺少固定后缀`);
    const core = promptCore(item.aiPrompt, EN_PROMPT_PREFIX, EN_PROMPT_SUFFIX);
    if (!core.includes("[describe the business, products and target audience]")) {
      bad.push(`${item.slug}: 提示词核心缺少店铺背景占位符`);
    }
    if (!core.includes("[specify the affected products, pages, customers or reporting period]")) {
      bad.push(`${item.slug}: 提示词核心缺少处理范围占位符`);
    }
  }
  assert.deepEqual(bad.slice(0, 10), [], `提示词结构异常 ${bad.length} 处:\n${bad.slice(0, 10).join("\n")}`);
});

test("同类目关键词页的相似度高不过阈值（8-gram Jaccard）", () => {
  const stats = { en: [], zh: [] };
  for (const [, items] of groupByCategory()) {
    const en = items.map((i) =>
      wordGrams(
        `${i.scenarioDescription} ${promptCore(i.aiPrompt, EN_PROMPT_PREFIX, EN_PROMPT_SUFFIX)}`
      )
    );
    const zh = items.map((i) =>
      charGrams(`${i.zh_scenarioDescription ?? ""}${promptCore(i.zh_aiPrompt, ZH_PROMPT_PREFIX, ZH_PROMPT_SUFFIX)}`)
    );
    for (let a = 0; a < items.length; a += 1) {
      for (let b = a + 1; b < items.length; b += 1) {
        stats.en.push({ pair: `${items[a].slug} vs ${items[b].slug}`, score: jaccard(en[a], en[b]) });
        stats.zh.push({ pair: `${items[a].slug} vs ${items[b].slug}`, score: jaccard(zh[a], zh[b]) });
      }
    }
  }
  const mean = (arr) => arr.reduce((sum, x) => sum + x.score, 0) / arr.length;
  const peak = (arr) => arr.reduce((top, x) => (x.score > top.score ? x : top));
  const enMean = mean(stats.en);
  const zhMean = mean(stats.zh);
  const enPeak = peak(stats.en);
  const zhPeak = peak(stats.zh);
  // 2026-10-26 重写前：EN 均值 0.720 / 峰值 0.810，ZH 均值 0.827 / 峰值 0.980。
  assert.ok(enMean < 0.35, `EN 相似度均值回升到 ${enMean.toFixed(3)}`);
  assert.ok(zhMean < 0.60, `ZH 相似度均值回升到 ${zhMean.toFixed(3)}`);
  assert.ok(enPeak.score < 0.5, `EN 峰值相似度 ${enPeak.score.toFixed(3)} (${enPeak.pair})`);
  assert.ok(zhPeak.score < 0.7, `ZH 峰值相似度 ${zhPeak.score.toFixed(3)} (${zhPeak.pair})`);
});

// 2026-10-28：去重只是及格线。评审指出重写后的页面仍是"不同的任务摘要"——
// EN 步骤平均 47 词、FAQ 答案 18 词，读者拿不到判断规则（分母口径、归因规则、
// 例外处理、回滚字段、核对方法）。以下仅检查最低长度与结构，
// 不能证明方法正确或内容可执行；业务口径和事实依据仍须人工验收。
test("步骤与 FAQ 满足最低长度与标点结构", () => {
  const bad = [];
  for (const item of scenarios) {
    const en = splitEn(item.howToSolve);
    const enWords = en.map((s) => s.split(/\s+/).filter(Boolean).length);
    if (enWords.some((n) => n < 20)) bad.push(`${item.slug}: EN 步骤过短 ${enWords.join("/")}`);
    if (enWords.reduce((a, b) => a + b, 0) < 70) bad.push(`${item.slug}: EN 步骤总词数 ${enWords.reduce((a, b) => a + b, 0)}`);

    const zh = splitZh(item.zh_howToSolve);
    const zhLen = zh.map((s) => s.length);
    if (zhLen.some((n) => n < 35)) bad.push(`${item.slug}: ZH 分句过短 ${zhLen.join("/")}`);
    if (item.zh_howToSolve.length < 130) bad.push(`${item.slug}: ZH 步骤总长 ${item.zh_howToSolve.length}`);

    for (const faq of item.faqs ?? []) {
      const words = String(faq.answer).split(/\s+/).filter(Boolean).length;
      if (words < 20) bad.push(`${item.slug}: EN FAQ 答案仅 ${words} 词`);
      const qw = String(faq.question).split(/\s+/).filter(Boolean).length;
      if (qw > 16) bad.push(`${item.slug}: EN FAQ 问题 ${qw} 词，过长`);
      if (!String(faq.answer).trimEnd().endsWith(".")) bad.push(`${item.slug}: EN FAQ 答案未以句号结尾`);
    }
    for (const faq of item.zh_faqs ?? []) {
      const len = String(faq.answer).replace(/\s+/g, "").length;
      if (len < 32) bad.push(`${item.slug}: ZH FAQ 答案仅 ${len} 字`);
      if (!String(faq.answer).trimEnd().endsWith("。")) bad.push(`${item.slug}: ZH FAQ 答案未以句号结尾`);
    }
  }
  assert.deepEqual(bad.slice(0, 10), [], `内容退化成摘要 ${bad.length} 处:\n${bad.slice(0, 10).join("\n")}`);
});

// 数字字面量只触发人工复核，不等同于判定事实真伪；英文拼写数字也仍需人工检查。
function numericLiterals(text) {
  return String(text).replace(/\b(?:GA4|B2B|1P|AOV\d?)\b/gi, "").match(/\d+(?:\.\d+)?[%％]?/g) ?? [];
}

test("数字复核能发现普通百分比、周期和中文数字字面量", () => {
  assert.deepEqual(numericLiterals("Use 20% for 14 days; 等待 7 天，比例 5％。"), ["20%", "14", "7", "5％"]);
  assert.deepEqual(numericLiterals("GA4 B2B 1P AOV2"), []);
});

test("中英文步骤、提示词与 FAQ 无未复核的数字字面量", () => {
  const bad = [];
  for (const item of scenarios) {
    for (const field of ["howToSolve", "zh_howToSolve", "aiPrompt", "zh_aiPrompt", "faqs", "zh_faqs"]) {
      // 中文提示词的编号是结构标记，不是业务阈值。
      const text = (Array.isArray(item[field]) ? item[field].map((f) => `${f.question} ${f.answer}`).join(" ") : String(item[field]))
        .replace(/^\s*\d+\.\s*/gm, "");
      // 仅在对应 HTTP 故障场景中放行状态码，不为业务阈值全局放行。
      const technicalCode = item.slug === "shopify-404-error-checker" ? /\b404\b/g
        : item.slug === "shopify-500-error-troubleshooting" ? /\b500\b/g : null;
      const numbers = numericLiterals(technicalCode ? text.replace(technicalCode, "HTTP status") : text);
      if (numbers.length) bad.push(`${item.slug}: ${field} 的数字须人工复核 ${numbers.join(", ")}`);
    }
  }
  assert.deepEqual(bad.slice(0, 10), [], `数字待复核 ${bad.length} 处:\n${bad.slice(0, 10).join("\n")}`);
});

test("两种语言都有 3 条 FAQ，且同类目内问题不重复", () => {
  const bad = [];
  for (const item of scenarios) {
    if (!Array.isArray(item.faqs) || item.faqs.length !== 3) bad.push(`${item.slug}: EN faqs ${item.faqs?.length}`);
    if (!Array.isArray(item.zh_faqs) || item.zh_faqs.length !== 3) bad.push(`${item.slug}: ZH faqs ${item.zh_faqs?.length}`);
  }

  for (const [category, items] of groupByCategory()) {
    for (const key of ["faqs", "zh_faqs"]) {
      const questions = items.flatMap((item) => (item[key] ?? []).map((f) => String(f.question).trim()));
      const distinct = new Set(questions);
      if (distinct.size !== questions.length) {
        bad.push(`${category}: ${key} 有 ${questions.length - distinct.size} 个重复问题`);
      }
    }
  }
  assert.deepEqual(bad.slice(0, 10), [], `FAQ 异常 ${bad.length} 处:\n${bad.slice(0, 10).join("\n")}`);
});
