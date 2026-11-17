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

const languageSignals = loadContentModule("../src/lib/localized-language-signal.ts");
const {withShopifyUtm} = loadContentModule("../src/lib/marketing-links.ts");

test("Shopify attribution preserves existing parameters and ignores other destinations", () => {
  const href = "https://apps.shopify.com/spark-1?keyword=sales%20report&source=ciwiweb#reviews";
  const result = withShopifyUtm(href);
  const url = new URL(result);
  assert.equal(url.searchParams.get("utm_source"), "ciwi.ai");
  assert.equal(url.searchParams.get("utm_medium"), "referral");
  assert.equal(url.searchParams.get("utm_campaign"), "website");
  assert.equal(url.searchParams.get("keyword"), "sales report");
  assert.equal(url.searchParams.get("source"), "ciwiweb");
  assert.equal(url.hash, "#reviews");
  assert.equal(withShopifyUtm(result), result);
  assert.equal(new URL(withShopifyUtm("https://apps.shopify.com/spark-1?utm_campaign=partner")).searchParams.get("utm_campaign"), "partner");
  for (const other of ["/products/translator/", "https://example.com/", "https://apps.shopify.com.example.com/app"]) {
    assert.equal(withShopifyUtm(other), other);
  }
});
const i18n = loadContentModule("../src/lib/i18n.ts");
const nextConfig = loadContentModule("../next.config.ts").default;
const resources = loadContentModule("../src/content/resources-page-copy.ts", {
  "@/lib/localized-language-signal": languageSignals,
});

test("resource guide URLs survive Chinese copy translation", () => {
  for (const locale of ["en", "zh-cn"]) {
    const {guides} = resources.getResourcesPageCopy(locale).sections;
    assert.equal(guides.categoryHref, "/guides/localization");
    assert.equal(guides.scenarioHref, "/guides/function-scenarios");
  }
  assert.equal(languageSignals.localizeLanguageSignalText("zh-cn", "Localization"), "本地化");
});

test("internal page URLs collapse duplicate slashes and retain query and fragment", () => {
  const href = "/products/spark-analytics-agent/playbook//keyword/test?ref=a//b#details";
  assert.equal(i18n.normalizeInternalHref(href), "/products/spark-analytics-agent/playbook/keyword/test/?ref=a//b#details");
  assert.equal(i18n.localizeHref("zh-cn", href), "/zh-cn/products/spark-analytics-agent/playbook/keyword/test/?ref=a//b#details");
  assert.equal(i18n.normalizeInternalHref("https://example.com/a//b"), "https://example.com/a//b");
});

test("next.config 只保留 host 级跳转，页面级旧链接交给中间件", async () => {
  // `redirects()` 在 middleware 之前执行。一旦页面路径写回这里，中间件就看不到
  // 请求，语言参数与 UTM 只能靠下一跳摘除——每条旧链接都要多走一次 308。
  const redirects = await nextConfig.redirects();

  for (const redirect of redirects) {
    const hostCondition = Array.isArray(redirect.has) && redirect.has.some((condition) => condition.type === "host");
    assert.ok(hostCondition, `${redirect.source} 不是 host 级跳转，应移到 legacy-redirects.ts`);
    assert.ok(!redirect.destination.includes("/products/content-ai/"), redirect.source);
  }
});
