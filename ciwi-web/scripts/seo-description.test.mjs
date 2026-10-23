// 校验 meta description 截断行为，防止 SERP 文案被搜索引擎改写。
// 复用 seo-localization.test.mjs 的加载方式：直接转译 TS 源码后求值。
import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

function loadContentModule(filePath, dependencies = {}) {
  const source = fs.readFileSync(new URL(filePath, import.meta.url), "utf8");
  const {outputText} = ts.transpileModule(source, {
    compilerOptions: {module: ts.ModuleKind.CommonJS},
  });
  const exports = {};
  vm.runInNewContext(outputText, {exports, URL, require: (name) => dependencies[name]});
  return exports;
}

const i18n = loadContentModule("../src/lib/i18n.ts");
const languageSignals = loadContentModule("../src/lib/localized-language-signal.ts");
const metadata = loadContentModule("../src/lib/seo/metadata.ts", {
  "@/lib/i18n": i18n,
  "@/lib/localized-language-signal": languageSignals,
});

const {truncateDescription, buildPageMetadata} = metadata;

test("descriptions that already fit are left untouched", () => {
  const short = "Ciwi Blog shares practical thinking on Shopify localization.";
  assert.equal(truncateDescription(short), short);
  assert.equal(truncateDescription(""), "");
  assert.equal(truncateDescription("   "), "");
});

test("CJK glyphs are charged double so Chinese snippets stay readable", () => {
  const chinese = "为 Shopify 商家提供可直接落地的多语言店铺与运营自动化方案".repeat(4);
  const result = truncateDescription(chinese);

  assert.ok(result.length < chinese.length, "long Chinese copy should be truncated");
  assert.ok(result.endsWith("…"));
});

test("long English descriptions are truncated and never cut a word in half", () => {
  const long =
    "A merchant is choosing what to sell but cannot separate durable demand from short-lived popularity. In this case, the immediate task is to evaluate product opportunities using a structured research workflow with real evidence and next tests.";
  const repeatedWords = "playbook ".repeat(80).trim();

  const result = truncateDescription(long);
  assert.ok(result.length < long.length);
  assert.ok(result.endsWith("…"));
  assert.ok(!result.includes("\n"));

  const wordsResult = truncateDescription(repeatedWords);
  assert.equal(wordsResult.slice(0, -1).endsWith(" "), false);
});

test("buildPageMetadata emits a truncated description and keeps the full title", () => {
  const result = buildPageMetadata({
    title: "Shopify AI Growth Platform",
    description:
      "Build a multilingual storefront with Ciwi AI Translator, and use Spark to plan and execute supported Shopify store tasks. Reach global customers while keeping every market-specific page consistent, localized, and measurable across campaigns, channels, regions and teams over time.",
    path: "/",
    locale: "en",
  });

  assert.ok(result.description);
  assert.ok(result.description.length < 160, `description too long: ${result.description.length}`);
  assert.equal(result.title, "Shopify AI Growth Platform | Ciwi");
});

test("canonical and hreflang survive description truncation", () => {
  const result = buildPageMetadata({
    title: "Blog",
    description: "x".repeat(400),
    path: "/blog",
    locale: "en",
  });

  assert.equal(result.alternates.canonical, "https://ciwi.ai/blog/");
  assert.ok(result.alternates.languages["zh-CN"]);
  assert.ok(result.alternates.languages["x-default"]);
});

test("noindex pages get index false with follow preserved", () => {
  const result = buildPageMetadata({
    title: "Affiliate dashboard",
    description: "Affiliate dashboard with referral and payout data.",
    path: "/affiliate/dashboard",
    locale: "en",
    noIndex: true,
  });

  // vm 沙箱内的对象来自不同 realm，逐个字段比较而不是 deepEqual。
  assert.equal(result.robots.index, false);
  assert.equal(result.robots.follow, true);
});

// 与 metadata.ts 的 estimateSERPWidth 保持一致的宽度估算，用于断言标题是否守住预算。
function serpWidth(text) {
  let width = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    if (ch === " " || ch === "-" || ch === "|" || ch === ":") width += 0.3;
    else if (ch === "." || ch === "," || ch === "'" || ch === "/") width += 0.25;
    else if (code < 128) width += 0.52;
    else width += 1.0;
  }
  return width;
}
const TITLE_BUDGET = 34;

test("titleLead puts the keyword first and keeps it intact when the title is long", () => {
  const keyword = "shopify product research tool";
  const result = buildPageMetadata({
    titleLead: keyword,
    title: "Evaluate product opportunities using a structured research workflow",
    description: "Validate product demand before you commit to inventory.",
    path: "/products/spark-analytics-agent/playbook/keyword/shopify-product-research-tool",
    locale: "en",
  });

  assert.ok(result.title.startsWith(`${keyword} — `), `keyword must lead the title: ${result.title}`);
  assert.ok(result.title.endsWith(" | Ciwi"));
  assert.ok(
    serpWidth(result.title) <= TITLE_BUDGET + 0.5,
    `title should stay inside the SERP budget (${serpWidth(result.title).toFixed(1)}): ${result.title}`
  );

  const body = result.title.slice(`${keyword} — `.length, -" | Ciwi".length);
  assert.ok(body.length > 0, "descriptive tail should survive");
  assert.ok(!body.startsWith("…"), "descriptive tail must not start with an ellipsis");
});

test("titleLead keeps a short title untouched apart from the ordering", () => {
  const result = buildPageMetadata({
    titleLead: "shopify bulk price editor",
    title: "Bulk price editor",
    description: "Update prices in bulk.",
    path: "/products/spark-analytics-agent/playbook/keyword/shopify-bulk-price-editor",
    locale: "en",
  });

  assert.equal(result.title, "shopify bulk price editor — Bulk price editor | Ciwi");
});

test("titleLead uses a CJK separator and preserves the keyword for zh-cn", () => {
  const keyword = "shopify 选品工具";
  const result = buildPageMetadata({
    titleLead: keyword,
    title: "先验证需求，再下采购单",
    description: "先验证需求，再下采购单。",
    path: "/zh-cn/products/spark-analytics-agent/playbook/keyword/shopify-product-research-tool",
    locale: "zh-cn",
  });

  assert.ok(result.title.startsWith(`${keyword}：`), `unexpected zh title: ${result.title}`);
  assert.ok(result.title.endsWith(" | Ciwi"));
  assert.ok(
    serpWidth(result.title) <= TITLE_BUDGET + 0.5,
    `zh title should stay inside the SERP budget (${serpWidth(result.title).toFixed(1)}): ${result.title}`
  );
});

test("titleLead does not prefix a title that already embeds the keyword", () => {
  const keyword = "shopify product research tool";
  const result = buildPageMetadata({
    titleLead: keyword,
    title: `处理「${keyword}」对应的选品与市场机会问题`,
    description: "按结构化流程评估选品机会。",
    path: "/zh-cn/products/spark-analytics-agent/playbook/keyword/shopify-product-research-tool",
    locale: "zh-cn",
  });

  assert.equal(result.title.match(/shopify product research tool/gi).length, 1, `keyword duplicated: ${result.title}`);
  assert.ok(!result.title.includes("："), `should not add a separator: ${result.title}`);
  assert.ok(serpWidth(result.title) <= TITLE_BUDGET + 0.5);
});

test("pages without titleLead keep the previous title behaviour", () => {
  const result = buildPageMetadata({
    title: "Shopify AI Growth Platform",
    description: "Short.",
    path: "/",
    locale: "en",
  });

  assert.equal(result.title, "Shopify AI Growth Platform | Ciwi");
});
