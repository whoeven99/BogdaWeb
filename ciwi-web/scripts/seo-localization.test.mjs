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
  vm.runInNewContext(outputText, {exports, require: (name) => dependencies[name]});
  return exports;
}

const languageSignals = loadContentModule("../src/lib/localized-language-signal.ts");
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

test("legacy redirects do not target the removed Content AI product", async () => {
  const redirects = await nextConfig.redirects();
  for (const redirect of redirects) {
    assert.ok(!redirect.destination.includes("/products/content-ai/"), redirect.source);
  }
  const titleRedirect = redirects.find((redirect) => redirect.source === "/product-title-generation/");
  assert.equal(titleRedirect.destination, "/products/spark-analytics-agent/#features");
});
