// 校验中间件把「旧路径 / 语言参数 / UTM」收敛成一次跳转。
//
// 背景：`__ciwi_locale` 原本单独处理，落在旧链接映射和路径归一化之后。
// 于是「旧路径 + 语言参数」会先 308 到新路径（参数被 clone 带过去），
// 下一跳才摘参数——两跳。这组断言要求跳转目标本身就是最终地址：
// 把返回的地址再喂回中间件一次，不得再产生 308。
//
// 范围说明：这里测的是中间件这一层的输入输出。线上还有一类跳转发生在中间件
// 之前，中间件看不到也合并不了——Next 自己对尾斜杠/重复斜杠的归一化。那批地址
// 仍会多一跳，但不影响最终落点。页面级的旧链接（原 next.config `redirects()`
// 里的 marketing slug）已经全部搬进 legacy-redirects.ts，由中间件一次跳到位。
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
  vm.runInNewContext(outputText, {exports, URL, URLSearchParams, Headers, require: (name) => dependencies[name]});
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

// next/server 只用到 NextResponse 三个工厂；断言只关心跳转目标与状态码。
const nextServer = {
  NextResponse: {
    redirect: (url, status) => ({kind: "redirect", status, url: new URL(url.href)}),
    rewrite: (url) => ({kind: "rewrite", url: new URL(url.href)}),
    next: () => ({kind: "next"}),
  },
};

const {middleware} = loadModule("../src/middleware.ts", {
  "next/server": nextServer,
  "@/lib/i18n": i18n,
  "@/lib/seo/legacy-redirects": legacyRedirects,
});

function makeNextUrl(href) {
  const url = new URL(href);
  url.clone = () => makeNextUrl(url.href);
  return url;
}

function run(href, headers = {}) {
  return middleware({nextUrl: makeNextUrl(href), headers: new Headers(headers)});
}

// 跳转目标必须已是最终地址：再跑一次不能还是 308。
function expectSingleHop(href, expected, headers = {}, expectedHash = "") {
  const first = run(href, headers);

  assert.equal(first.kind, "redirect", `${href} 应当是跳转`);
  assert.equal(first.status, 308, `${href} 应当用 308`);
  assert.equal(first.url.pathname + first.url.search, expected, `${href} 的跳转目标`);
  assert.equal(first.url.hash, expectedHash, `${href} 的锚点`);
  // 锚点拼进 pathname 会被编码成 %23，落到一条 404 路径上。
  assert.ok(!first.url.href.includes("%23"), `${href} 的跳转目标里出现了被编码的锚点：${first.url.href}`);

  const second = run(first.url.href, headers);
  assert.notEqual(second.kind, "redirect", `${href} 的落点 ${expected} 不该再跳一次`);
}

test("旧路径带着语言参数和 UTM 时一次跳到位", () => {
  // `/vs-transcy` 只由中间件的映射表处理，next.config 不拦它。
  expectSingleHop(
    "https://ciwi.ai/vs-transcy?__ciwi_locale=zh-cn&utm_source=newsletter",
    "/zh-cn/compare/transcy-alternative/?utm_source=newsletter",
  );
});

test("非规范路径带着语言参数和 UTM 时一次跳到位", () => {
  expectSingleHop(
    "https://ciwi.ai/guides/localization?__ciwi_locale=zh-cn&utm_source=newsletter",
    "/zh-cn/guides/localization/?utm_source=newsletter",
  );
});

test("原先写在 next.config 的 marketing slug 也走同一跳", () => {
  // 这一条以前由 `redirects()` 先发 308，中间件只能接力处理语言参数，共两跳。
  expectSingleHop(
    "https://ciwi.ai/deepl/?__ciwi_locale=zh-cn&utm_source=newsletter",
    "/zh-cn/products/translator/?utm_source=newsletter",
  );
});

test("带锚点的旧链接把锚点放进 hash，而不是拼进 pathname", () => {
  expectSingleHop(
    "https://ciwi.ai/product-title-generation/?__ciwi_locale=zh-cn",
    "/zh-cn/products/spark-analytics-agent/",
    {},
    "#features",
  );
  // 中文侧曾经跳到 /zh-cn/products/spark-analytics-agent/%23features/ 并返回 404，
  // 因为 `#` 被当成 pathname 的一部分编码掉了。
  expectSingleHop(
    "https://ciwi.ai/zh-cn/product-title-generation/",
    "/zh-cn/products/spark-analytics-agent/",
    {},
    "#features",
  );
});

test("下沉到中间件的产品级旧链接也一次到位", () => {
  expectSingleHop("https://ciwi.ai/products/content-ai/", "/products/spark-analytics-agent/");
  expectSingleHop(
    "https://ciwi.ai/zh-cn/products/bundle-discount/",
    "/zh-cn/help-center/ShopifyApp/bundle-discount-app-overview/",
  );
});

test("旧的语言前缀优先于查询参数里的语言", () => {
  expectSingleHop(
    "https://ciwi.ai/help-center/zh-Hans/ShopifyApp/about-ciwi-ai-translator-shopify-app?__ciwi_locale=en",
    "/zh-cn/help-center/ShopifyApp/about-ciwi-ai-translator-shopify-app/",
  );
});

test("规范页带着同语言参数时只摘参数，保留其余 query", () => {
  expectSingleHop(
    "https://ciwi.ai/zh-cn/guides/localization/?__ciwi_locale=zh-cn&utm_source=newsletter",
    "/zh-cn/guides/localization/?utm_source=newsletter",
  );
});

test("双斜杠历史地址在中间件层也只跳一次", () => {
  // 线上这类地址还会先被 Next 的重复斜杠归一化啃掉一跳，中间件这一跳不再重复做。
  expectSingleHop(
    "https://ciwi.ai/products/spark-analytics-agent/playbook//keyword/shopify-product-research-tool?__ciwi_locale=zh-cn",
    "/zh-cn/products/spark-analytics-agent/playbook/keyword/shopify-product-research-tool/",
  );
});

test("规范地址不放行多余跳转", () => {
  assert.equal(run("https://ciwi.ai/guides/localization/").kind, "next");
  assert.equal(run("https://ciwi.ai/zh-cn/guides/localization/").kind, "rewrite");
});

test("无法识别的语言参数不跳转，由内部 rewrite 摘掉", () => {
  const result = run("https://ciwi.ai/guides/localization/?__ciwi_locale=fr");

  assert.equal(result.kind, "rewrite");
  assert.equal(result.url.searchParams.has("__ciwi_locale"), false);
});

test("中文路径的 rewrite 把语言标记交给页面", () => {
  const result = run("https://ciwi.ai/zh-cn/guides/localization/");

  assert.equal(result.kind, "rewrite");
  assert.equal(result.url.pathname, "/guides/localization/");
  assert.equal(result.url.searchParams.get("__ciwi_locale"), "zh-cn");
});
