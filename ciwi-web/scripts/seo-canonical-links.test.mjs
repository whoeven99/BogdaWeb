// 守卫站内链接的规范形态：无重复斜杠、带尾斜杠、带语言前缀。
//
// 背景：2026-09-20 至 2026-09-24 的 `getProductPlaybookHref` 曾返回带尾斜杠的
// 路径，所有关键词页链接因此被拼成 `/products/<slug>/playbook//keyword/<kw>`。
// 四天内 Google 抓取了 387 条这类形态，在 Search Console 里长期挂在
// "Page with redirect"（312 条属于 double-slash）。代码已修复，这组断言负责
// 让它不再复发：路径拼接函数不得自带尾斜杠，对外 href 一律过 localizeHref。
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

function loadModule(filePath, dependencies = {}) {
  const source = fs.readFileSync(new URL(filePath, import.meta.url), "utf8");
  const {outputText} = ts.transpileModule(source, {
    compilerOptions: {module: ts.ModuleKind.CommonJS},
  });
  const exports = {};
  vm.runInNewContext(outputText, {exports, URL, require: (name) => dependencies[name]});
  return exports;
}

const i18n = loadModule("../src/lib/i18n.ts");
const {localizeHref} = i18n;

const playbookSources = loadModule("../src/content/use-cases.ts", {
  "@/lib/i18n-content": {normalizeInternalHrefFields: (value) => value},
  "@/lib/localized-language-signal": {localizeLanguageSignalFields: (_locale, value) => value},
  "@/lib/marketing-links": {ciwiShopifyInstallUrl: "https://apps.shopify.com/translator-by-ciwi"},
});

test("localizeHref 折叠重复斜杠并补齐尾斜杠", () => {
  const keywordPath = "/products/spark-analytics-agent/playbook/keyword/shopify-ai-agent/";

  // 线上真实出现过的两种双斜杠形态都必须收敛到同一个规范地址。
  assert.equal(
    localizeHref("en", "/products/spark-analytics-agent/playbook//keyword/shopify-ai-agent"),
    keywordPath,
  );
  assert.equal(
    localizeHref("en", "/products/spark-analytics-agent/playbook//keyword/shopify-ai-agent/"),
    keywordPath,
  );
  assert.equal(localizeHref("zh-cn", "/zh-cn/products/spark-analytics-agent/playbook//keyword/x/"), "/zh-cn/products/spark-analytics-agent/playbook/keyword/x/");

  // 缺尾斜杠的普通页面补斜杠，首页保持原样。
  assert.equal(localizeHref("en", "/deepl"), "/deepl/");
  assert.equal(localizeHref("en", "/"), "/");
  assert.equal(localizeHref("en", "/blog/x/"), "/blog/x/");

  // 语言前缀只加一次，已经带 zh-cn 的不再重复。
  assert.equal(localizeHref("zh-cn", "/"), "/zh-cn/");
  assert.equal(localizeHref("zh-cn", "/zh-cn"), "/zh-cn/");
  assert.equal(localizeHref("zh-cn", "/compare/langify-alternative"), "/zh-cn/compare/langify-alternative/");
  assert.equal(localizeHref("zh-cn", "/zh-cn/compare/langify-alternative"), "/zh-cn/compare/langify-alternative/");

  // 锚点与查询串保留在尾斜杠之后，外链与 mailto 不被改写。
  assert.equal(localizeHref("en", "/compare/langify-alternative#faq"), "/compare/langify-alternative/#faq");
  assert.equal(localizeHref("en", "/guides/x?y=1"), "/guides/x/?y=1");
  assert.equal(localizeHref("en", "https://apps.shopify.com/x"), "https://apps.shopify.com/x");
  assert.equal(localizeHref("en", "#features"), "#features");
  assert.equal(localizeHref("en", "mailto:a@b.c"), "mailto:a@b.c");
});

test("playbook 路径拼接不会产生重复斜杠", () => {
  const href = playbookSources.getProductPlaybookHref("spark-analytics-agent");

  assert.equal(href, "/products/spark-analytics-agent/playbook");
  assert.ok(!href.endsWith("/"), "playbook 基址不能带尾斜杠，否则拼 /keyword 会出现 //");
  assert.ok(!`${href}/keyword/shopify-ai-agent`.includes("//"));
  assert.equal(localizeHref("en", `${href}/keyword/shopify-ai-agent`), "/products/spark-analytics-agent/playbook/keyword/shopify-ai-agent/");
});

test("内容数据里的站内 href 存储形态没有重复斜杠", () => {
  const dataRoot = path.resolve("src", "content", "data");
  const offenders = [];

  for (const file of fs.readdirSync(dataRoot)) {
    if (!file.endsWith(".json")) {
      continue;
    }

    const raw = fs.readFileSync(path.join(dataRoot, file), "utf8");

    for (const match of raw.matchAll(/"href"\s*:\s*"(\/[^"]*)"/g)) {
      const href = match[1];
      if (href.includes("//")) {
        offenders.push(`${file}: ${href}`);
      }
    }
  }

  assert.deepEqual(offenders, [], `内容数据里存在重复斜杠的 href：\n${offenders.join("\n")}`);
});
