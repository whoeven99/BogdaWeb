import type {Locale} from "@/lib/i18n";

const nonLocalizedKeys = new Set([
  "href",
  "ctaHref",
  "primaryHref",
  "secondaryHref",
  "destination",
  "videoUrl",
  "icon",
  "slug",
  "productSlug",
  "entryId",
]);

const zhExactLabelMap: Record<string, string> = {
  Blog: "博客",
  "Help Center": "帮助中心",
  Compare: "对比",
  Overview: "概览",
  Geolocation: "地理位置",
  Switcher: "切换器",
  Glossary: "术语表",
  Languages: "语言",
  FAQ: "常见问题",
  "Translation Workflow": "翻译流程",
  "Task Setup": "任务配置",
  Currency: "多币种",
  Models: "模型",
  "Content Modules": "内容模块",
  Credits: "积分",
  "Bundle Discount": "套餐优惠",
  "Bundle Offer": "套餐优惠",
  Spark: "Spark",
  Product: "产品",
  Products: "产品",
  Localization: "本地化",
  "URL Strategy": "URL 策略",
  Spanish: "西语",
  Portuguese: "葡语",
  Translation: "翻译",
  Reporting: "报表分析",
  Scaling: "扩量",
  Catalog: "商品目录",
  "Best Shopify Apps": "最佳 Shopify 应用",
  Alternative: "替代方案",
};

const zhPatternReplacements: Array<[RegExp, string]> = [
  [/^(\d+)\s*min read$/i, "$1 分钟阅读"],
  [/^(\d+)\s*minute read$/i, "$1 分钟阅读"],
  [/^(.+?) Alternative for Shopify Translation$/i, "$1 Shopify 翻译替代方案"],
  [/^(.+?) Alternative for Shopify Localization$/i, "$1 Shopify 本地化替代方案"],
  [/^(.+?) Alternative for Shopify$/i, "$1 Shopify 替代方案"],
  [/^(.+?) Alternative: Shopify Localization & Geolocation$/i, "$1 替代方案：Shopify 本地化与地理位置"],
  [/^(.+?) Alternative: Shopify Language & Market Selection$/i, "$1 替代方案：Shopify 语言与市场选择"],
  [/^(.+?) Alternative$/i, "$1 替代方案"],
];

const zhInlineReplacements: Array<[RegExp, string]> = [
  [/\bHelp Center\b/gi, "帮助中心"],
  [/\bBundle Discount\b/gi, "套餐优惠"],
  [/\bBundle Offer\b/gi, "套餐优惠"],
  [/\bTranslation Workflow\b/gi, "翻译流程"],
  [/\bTask Setup\b/gi, "任务配置"],
  [/\bContent Modules\b/gi, "内容模块"],
  [/\bBest Shopify Apps\b/gi, "最佳 Shopify 应用"],
  [/\bShopify Markets\b/g, "Shopify Markets"],
  [/\bGlossary\b/gi, "术语表"],
  [/\bCredits\b/gi, "积分"],
  [/\bcredit-based\b/gi, "积分制"],
  [/\bcredits\b/gi, "积分"],
  [/\bOverview\b/gi, "概览"],
  [/\bCompare\b/gi, "对比"],
  [/\bBlog\b/gi, "博客"],
  [/\bAlternative\b/gi, "替代方案"],
  [/\bLocalization\b/gi, "本地化"],
  [/\bstorefronts\b/gi, "店铺前台"],
  [/\bstorefront\b/gi, "店铺前台"],
  [/\bgeolocation\b/gi, "地理位置"],
];

export function localizeLanguageSignalText(locale: Locale, value: string) {
  if (locale !== "zh-cn" || !value) {
    return value;
  }

  const exactMatch = zhExactLabelMap[value];
  if (exactMatch) {
    return exactMatch;
  }

  for (const [pattern, replacement] of zhPatternReplacements) {
    if (pattern.test(value)) {
      return value.replace(pattern, replacement);
    }
  }

  return zhInlineReplacements.reduce((currentValue, [pattern, replacement]) => currentValue.replace(pattern, replacement), value);
}

export function localizeLanguageSignalList(locale: Locale, values: string[]) {
  return values.map((value) => localizeLanguageSignalText(locale, value));
}

export function localizeLanguageSignalFields<T>(locale: Locale, value: T): T {
  if (typeof value === "string") {
    return localizeLanguageSignalText(locale, value) as T;
  }

  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => localizeLanguageSignalFields(locale, item)) as T;
  }

  if (typeof value === "object") {
    const localizedEntries = Object.entries(value as Record<string, unknown>).map(([key, entry]) => {
      if (typeof entry === "string" && nonLocalizedKeys.has(key)) {
        return [key, entry];
      }

      return [key, localizeLanguageSignalFields(locale, entry)];
    });

    return Object.fromEntries(localizedEntries) as T;
  }

  return value;
}
