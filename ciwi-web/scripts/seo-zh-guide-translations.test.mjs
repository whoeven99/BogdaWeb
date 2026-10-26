// 防止未翻译的占位内容再次上线。
//
// 2026-10-24 之前 localization_guides.zh-cn.json 里 25 条仍是 `ai-draft` + `status: draft`，
// 标题带 `[TODO zh-cn]` 前缀，被 guide-content.ts 的 isIndexable() 过滤掉，
// 于是 /zh-cn/guides/<slug>/ 会 308 跳到英文页，在 GSC 里表现为 "Page with redirect"。
// 这里把 `isIndexable` 的准入条件原样复刻成断言，任何一条被回填成占位符都会立刻失败。
import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const readJson = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));

const guidesByLocale = {
  en: readJson("../src/content/data/localization_guides.json"),
  "zh-cn": readJson("../src/content/data/localization_guides.zh-cn.json"),
};

const hanCount = (value) => (String(value).match(/[㐀-鿿]/g) ?? []).length;
const latinWordCount = (value) => (String(value).match(/[A-Za-z]{3,}/g) ?? []).length;
const hasTodoMarker = (value) => typeof value === "string" && /\[TODO\b/i.test(value);

/** Mirrors createLocalizedGuideContent().hasLocaleContentSignal for zh-cn. */
function hasLocaleContentSignal(item) {
  const combined = [item.title, item.description, item.mainValue]
    .filter((value) => typeof value === "string" && value.trim().length > 0)
    .join(" ");
  const han = hanCount(combined);
  const latin = latinWordCount(combined);

  if (han === 0) {
    return false;
  }

  return !(han < 8 && latin > han * 2);
}

test("zh-cn 指南全部通过 isIndexable，不会退回英文页", () => {
  const guides = guidesByLocale["zh-cn"];

  assert.ok(guides.length > 0, "zh-cn 指南数据不应为空");

  for (const guide of guides) {
    assert.notEqual(guide.status, "draft", `${guide.slug} 仍是 draft`);
    assert.notEqual(guide.translationStatus, "ai-draft", `${guide.slug} 仍是 ai-draft`);

    for (const field of ["title", "description", "mainValue"]) {
      assert.ok(!hasTodoMarker(guide[field]), `${guide.slug}.${field} 含 [TODO] 占位符: ${guide[field]}`);
    }

    assert.ok(hasLocaleContentSignal(guide), `${guide.slug} 的中文字量不足，会被判为无本语言内容`);
  }
});

test("zh-cn 指南与英文源结构一致，且保留路由字段", () => {
  const source = new Map(guidesByLocale.en.map((guide) => [guide.slug, guide]));
  const keys = new Set(Object.keys(guidesByLocale.en[0]));

  for (const guide of guidesByLocale["zh-cn"]) {
    const sourceGuide = source.get(guide.slug);

    assert.ok(sourceGuide, `${guide.slug} 在英文源文件里不存在`);

    for (const routeField of ["slug", "href", "year", "publishedAt"]) {
      assert.equal(guide[routeField], sourceGuide[routeField], `${guide.slug}.${routeField} 被改动了`);
    }

    for (const key of keys) {
      assert.ok(key in guide, `${guide.slug} 缺少字段 ${key}`);
      assert.equal(Array.isArray(guide[key]), Array.isArray(sourceGuide[key]), `${guide.slug}.${key} 类型不一致`);
    }
  }
});

test("zh-cn 指南正文不含整句未翻译的英文", () => {
  // 品牌词与技术缩写保留英文是有意为之，因此只拦截"整串没有汉字"的长文本。
  const skip = new Set(["slug", "href", "year", "publishedAt", "status", "sourceLocale", "translationStatus"]);

  function walk(value, path, slug, problems) {
    if (typeof value === "string") {
      if (value.length > 12 && hanCount(value) === 0 && latinWordCount(value) > 0 && !skip.has(path)) {
        problems.push(`${slug}.${path}: ${value.slice(0, 60)}`);
      }

      return;
    }

    if (Array.isArray(value)) {
      value.forEach((entry, index) => walk(entry, `${path}[${index}]`, slug, problems));

      return;
    }

    if (value && typeof value === "object") {
      for (const [key, entry] of Object.entries(value)) {
        if (!skip.has(key)) {
          walk(entry, key, slug, problems);
        }
      }
    }
  }

  const problems = [];

  for (const guide of guidesByLocale["zh-cn"]) {
    for (const [key, value] of Object.entries(guide)) {
      if (!skip.has(key)) {
        walk(value, key, guide.slug, problems);
      }
    }
  }

  assert.deepEqual(problems, [], `以下字段疑似未翻译:\n${problems.join("\n")}`);
});
