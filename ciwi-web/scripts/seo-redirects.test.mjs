// 校验历史 URL 的跳转解析：每个旧地址必须直接落到现存的最终页，
// 而不是落到另一个需要再跳一次的中间形态。
import assert from "node:assert/strict";
import fs from "node:fs";
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

const compareSlugs = loadModule("../src/content/compare-slugs.ts");
const i18n = loadModule("../src/lib/i18n.ts");
const legacyRoutes = loadModule("../src/content/legacy-routes.ts", {
  "@/content/compare-slugs": compareSlugs,
});
const legacyRedirects = loadModule("../src/lib/seo/legacy-redirects.ts", {
  "@/content/compare-slugs": compareSlugs,
  "@/content/legacy-routes": legacyRoutes,
  "@/lib/i18n": i18n,
});

const {canonicalizePathname, collapseDuplicateSlashes, resolveLegacyDestination} = legacyRedirects;

// 断言逐字段比对：模块在独立 vm context 里求值，跨 realm 的对象不能用 deepEqual。
function expectRedirect(pathname, destination, locale) {
  const match = resolveLegacyDestination(pathname);

  assert.ok(match, `${pathname} 应当有跳转目标`);
  assert.equal(match.destination, destination, pathname);
  assert.equal(match.locale, locale, pathname);
}

test("根级旧 slug 直接落到产品页", () => {
  expectRedirect("/deepl", "/products/translator");
  expectRedirect("/gpt-4o", "/products/translator");
  expectRedirect("/about-us", "/about");
});

test("旧 compare slug 落到规范 slug，规范 slug 不再跳", () => {
  expectRedirect("/compare/ciwi-vs-weglot", "/compare/weglot-alternative");
  expectRedirect("/vs-transcy", "/compare/transcy-alternative");
  assert.equal(resolveLegacyDestination("/compare/weglot-alternative"), undefined);
});

test("改过 slug 的 help center 文档落到新文档", () => {
  expectRedirect("/help-center/ShopifyApp/why-do-i-need-to-pay-for-purchasing-credits", "/help-center/ShopifyApp/where-to-buy-credits");
  assert.equal(resolveLegacyDestination("/help-center/ShopifyApp/where-to-buy-credits"), undefined);
});

test("zh-Hans 旧语言前缀落到 zh-cn", () => {
  expectRedirect("/help-center/zh-Hans/ShopifyApp/about-ciwi-ai-translator-shopify-app", "/help-center/ShopifyApp/about-ciwi-ai-translator-shopify-app", "zh-cn");
  expectRedirect("/help-center/zh-Hans", "/help-center", "zh-cn");
});

test("已下线但仍有外链的页面还有去处", () => {
  expectRedirect("/pricing", "/products/spark-analytics-agent");
  expectRedirect("/vs-g-translate", "/compare/gtranslate-alternative");
});

test("正常页面不参与跳转", () => {
  for (const pathname of ["/", "/about", "/products/spark-analytics-agent", "/products/spark-analytics-agent/playbook/keyword/shopify-ads-not-converting"]) {
    assert.equal(resolveLegacyDestination(pathname), undefined, pathname);
  }
});

test("双斜杠形态被压平，避免 playbook//keyword 这类历史 URL 多跳一次", () => {
  assert.equal(collapseDuplicateSlashes("/products/spark-analytics-agent/playbook//keyword/shopify-ads-not-converting"), "/products/spark-analytics-agent/playbook/keyword/shopify-ads-not-converting");
  assert.equal(collapseDuplicateSlashes("/zh-cn/products/spark-analytics-agent/playbook//keyword/category/ad-performance-alerts"), "/zh-cn/products/spark-analytics-agent/playbook/keyword/category/ad-performance-alerts");
  assert.equal(canonicalizePathname("/products/spark-analytics-agent/playbook//keyword/shopify-ads-not-converting"), "/products/spark-analytics-agent/playbook/keyword/shopify-ads-not-converting/");
  // 已经规范的形态保持不变，避免自跳。
  assert.equal(canonicalizePathname("/products/spark-analytics-agent/playbook/keyword/shopify-ads-not-converting/"), "/products/spark-analytics-agent/playbook/keyword/shopify-ads-not-converting/");
  assert.equal(canonicalizePathname("/"), "/");
});

test("带双斜杠的历史 URL 仍然能匹配到映射", () => {
  expectRedirect("/help-center//ShopifyApp/why-do-i-need-to-pay-for-purchasing-credits", "/help-center/ShopifyApp/where-to-buy-credits");
  expectRedirect("//deepl", "/products/translator");
});

test("映射表自身不出现自指和空值", () => {
  const maps = [legacyRoutes.legacyRouteMap, legacyRoutes.legacyExtraRootRedirects, legacyRoutes.legacyHelpCenterSlugRedirects];

  for (const map of maps) {
    for (const [source, entry] of Object.entries(map)) {
      const destination = typeof entry === "string" ? entry : entry.destination;

      assert.ok(destination.startsWith("/"), `${source} -> ${destination}`);
      assert.ok(!destination.startsWith(`/${source}`), `${source} 指向了自己`);
    }
  }
});
