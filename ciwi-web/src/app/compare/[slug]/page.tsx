import {notFound, permanentRedirect} from "next/navigation";

import type {CSSProperties} from "react";

import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {ArticleCard} from "@/components/cards/ArticleCard";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import type {CompareItem, CompareMetric} from "@/content/compare";
import {getCanonicalCompareSlug} from "@/content/compare-slugs";
import {getCompareMap, getCompares, compares} from "@/content/compare";
import {getBlogPosts} from "@/content/blog";
import {getHelpCenterDocs} from "@/content/help-center";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {ciwiShopifyInstallUrl} from "@/lib/marketing-links";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";

type CompareDetailPageProps = {
  params: Promise<{slug: string}>;
};

const primaryProductName = "Ciwi Translator";

function clampScore(value: number) {
  return Math.max(0, Math.min(10, value));
}

function getScoreTone(value: number) {
  if (value <= 5) {
    return "weak";
  }

  if (value <= 8) {
    return "medium";
  }

  return "strong";
}

function getStrengthLabel(value: number, locale: "en" | "zh-cn") {
  const tone = getScoreTone(value);

  if (locale === "zh-cn") {
    return tone === "weak" ? "弱" : tone === "medium" ? "中" : "强";
  }

  return tone === "weak" ? "Weak" : tone === "medium" ? "Medium" : "Strong";
}

function getScoreBarStyle(value: number, delay = 0) {
  return {
    "--score-width": `${clampScore(value) * 10}%`,
    "--score-delay": `${delay}ms`,
  } as CSSProperties;
}

function formatScore(value: number) {
  const safeValue = clampScore(value);
  const formatted = Number.isInteger(safeValue) ? safeValue.toString() : safeValue.toFixed(1);

  return `${formatted}/10`;
}

function getAverageScore(items: CompareMetric[], key: "ciwi" | "alternative") {
  return items.reduce((total, item) => total + item[key], 0) / items.length;
}

function getTotalScore(items: CompareMetric[], key: "ciwi" | "alternative") {
  return items.reduce((total, item) => total + item[key], 0);
}

function getTotalStarRating(total: number, totalMax: number) {
  if (totalMax <= 0) {
    return 0;
  }

  return (total / totalMax) * 5;
}

function getVisualTotalStarRating(value: number) {
  const safeValue = Math.max(0, Math.min(5, value));

  return Math.round(safeValue * 2) / 2;
}

function formatTotalStarRating(value: number) {
  const safeValue = Math.max(0, Math.min(5, value));
  const formatted = Number.isInteger(safeValue) ? safeValue.toString() : safeValue.toFixed(1);

  return formatted;
}

function getTotalStarStyle(value: number) {
  return {"--total-rating": getVisualTotalStarRating(value)} as CSSProperties;
}

function getTopLabels(items: CompareMetric[], key: "ciwi" | "alternative", limit = 2) {
  return items
    .filter((item) => item[key] > item[key === "ciwi" ? "alternative" : "ciwi"])
    .sort((a, b) => (b[key] - b[key === "ciwi" ? "alternative" : "ciwi"]) - (a[key] - a[key === "ciwi" ? "alternative" : "ciwi"]))
    .slice(0, limit)
    .map((item) => item.label);
}

function buildOverallAssessment(data: CompareItem, locale: "en" | "zh-cn") {
  const allScores = [...data.summaryMetrics, ...data.scoreMatrix];
  const ciwiWins = allScores.filter((item) => item.ciwi > item.alternative).length;
  const alternativeWins = allScores.filter((item) => item.alternative > item.ciwi).length;
  const ciwiFocus = getTopLabels(allScores, "ciwi").join(locale === "zh-cn" ? "、" : ", ");
  const alternativeFocus = getTopLabels(allScores, "alternative").join(locale === "zh-cn" ? "、" : ", ");

  if (locale === "zh-cn") {
    if (ciwiWins === alternativeWins) {
      return `综合评价：按 ${allScores.length} 个 10 分制评分点看，两者各领先 ${ciwiWins} 项。${primaryProductName} 的高分维度主要是 ${ciwiFocus || "长期治理"}，${data.alternativeName} 的高分维度主要是 ${alternativeFocus || "快速上线"}。`;
    }

    if (ciwiWins > alternativeWins) {
      return `综合评价：按 ${allScores.length} 个 10 分制评分点看，${primaryProductName} 领先 ${ciwiWins} 项，${data.alternativeName} 领先 ${alternativeWins} 项。${primaryProductName} 的优势主要集中在 ${ciwiFocus || "长期治理"}；${data.alternativeName} 的高分维度主要是 ${alternativeFocus || "价格和上线速度"}。`;
    }

    return `综合评价：按 ${allScores.length} 个 10 分制评分点看，${data.alternativeName} 领先 ${alternativeWins} 项，${primaryProductName} 领先 ${ciwiWins} 项。${data.alternativeName} 的高分维度主要是 ${alternativeFocus || "快速上线"}；${primaryProductName} 的高分维度主要是 ${ciwiFocus || "长期治理"}。`;
  }

  if (ciwiWins === alternativeWins) {
    return `Overall: across ${allScores.length} ten-point signals, both products lead in ${ciwiWins} areas. ${primaryProductName}'s highest-scoring areas are ${ciwiFocus || "long-term governance"}, while ${data.alternativeName}'s highest-scoring areas are ${alternativeFocus || "faster launch"}.`;
  }

  if (ciwiWins > alternativeWins) {
    return `Overall: across ${allScores.length} ten-point signals, ${primaryProductName} leads in ${ciwiWins} areas and ${data.alternativeName} leads in ${alternativeWins}. ${primaryProductName}'s strongest areas are ${ciwiFocus || "long-term governance"}; ${data.alternativeName}'s strongest areas are ${alternativeFocus || "price and launch speed"}.`;
  }

  return `Overall: across ${allScores.length} ten-point signals, ${data.alternativeName} leads in ${alternativeWins} areas and ${primaryProductName} leads in ${ciwiWins}. ${data.alternativeName}'s strongest areas are ${alternativeFocus || "faster launch"}; ${primaryProductName}'s strongest areas are ${ciwiFocus || "long-term governance"}.`;
}

function buildScoreSummary(data: CompareItem, locale: "en" | "zh-cn") {
  const allScores = [...data.summaryMetrics, ...data.scoreMatrix];
  const ciwiTotal = getTotalScore(allScores, "ciwi");
  const alternativeTotal = getTotalScore(allScores, "alternative");
  const totalMax = allScores.length * 10;
  const ciwiFocus = getTopLabels(allScores, "ciwi").join(locale === "zh-cn" ? "、" : ", ");
  const alternativeFocus = getTopLabels(allScores, "alternative").join(locale === "zh-cn" ? "、" : ", ");
  const priceMetric = getPriceMetric(data);

  if (locale === "zh-cn") {
    const pricingText = priceMetric
      ? `价格评分为 Ciwi ${formatScore(priceMetric.ciwi)}，${data.alternativeName} ${formatScore(priceMetric.alternative)}。`
      : "当前页未单列价格评分。";

    return `按 ${allScores.length} 个 10 分制评分点计算，Ciwi 总分 ${ciwiTotal}/${totalMax}，${data.alternativeName} 总分 ${alternativeTotal}/${totalMax}。Ciwi 领先维度集中在 ${ciwiFocus || "长期治理"}；${data.alternativeName} 的相对高分维度集中在 ${alternativeFocus || "上线速度"}。${pricingText}`;
  }

  const pricingText = priceMetric
    ? `The price signal is ${formatScore(priceMetric.ciwi)} for Ciwi versus ${formatScore(priceMetric.alternative)} for ${data.alternativeName}.`
    : "This page does not expose a standalone price signal.";

  return `Across ${allScores.length} ten-point signals, Ciwi totals ${ciwiTotal}/${totalMax} and ${data.alternativeName} totals ${alternativeTotal}/${totalMax}. Ciwi's leading dimensions are ${ciwiFocus || "long-term governance"}, while ${data.alternativeName}'s relative strengths are ${alternativeFocus || "launch speed"}. ${pricingText}`;
}

function getPriceMetric(data: CompareItem) {
  return data.summaryMetrics.find((item) => {
    const label = item.label.toLowerCase();

    return label.includes("price") || item.label.includes("价");
  });
}

function isOperationalScoreMetric(label: string) {
  return /after-sales support|third-party app data compatibility|theme compatibility|seo performance|售后服务|第三方 app 数据兼容|主题兼容|seo 性能/i.test(label);
}

function getVisibleTotalScoreMetrics(data: CompareItem) {
  const existingLabels = new Set(data.summaryMetrics.map((item) => item.label));
  const operationalMetrics = data.scoreMatrix.filter((item) => isOperationalScoreMetric(item.label) && !existingLabels.has(item.label));

  return [...data.summaryMetrics, ...operationalMetrics];
}

function buildAppPositioningComparison(data: CompareItem, locale: "en" | "zh-cn") {
  if (data.appComparison) {
    return data.appComparison;
  }

  const allScores = [...data.summaryMetrics, ...data.scoreMatrix];
  const ciwiFocus = getTopLabels(allScores, "ciwi").join(locale === "zh-cn" ? "、" : ", ");
  const alternativeFocus = getTopLabels(allScores, "alternative").join(locale === "zh-cn" ? "、" : ", ");

  if (locale === "zh-cn") {
    return `${data.description} ${primaryProductName} 的高分维度主要是 ${ciwiFocus || "长期治理"}；${data.alternativeName} 的高分维度主要是 ${alternativeFocus || "快速上线"}。`;
  }

  return `${data.description} ${primaryProductName}'s higher-scoring areas are ${ciwiFocus || "long-term governance"}; ${data.alternativeName}'s higher-scoring areas are ${alternativeFocus || "faster launch"}.`;
}

function buildPricingComparison(data: CompareItem, locale: "en" | "zh-cn") {
  if (data.pricingComparison) {
    return data.pricingComparison;
  }

  const priceMetric = getPriceMetric(data);

  if (!priceMetric) {
    return locale === "zh-cn"
      ? "当前条目没有单独价格评分，但仍建议把入门成本、收费模型透明度和后续维护成本一起看。"
      : "This entry does not expose a dedicated price signal, so the better comparison is still upfront cost, pricing-model clarity, and ongoing maintenance cost together.";
  }

  const delta = priceMetric.ciwi - priceMetric.alternative;

  if (locale === "zh-cn") {
    if (delta >= 2) {
      return `按本页的价格评分口径，${primaryProductName} 为 ${formatScore(priceMetric.ciwi)}，${data.alternativeName} 为 ${formatScore(priceMetric.alternative)}。这通常意味着 Ciwi 在价格透明度、长期性价比或预算可预期性上更稳。`;
    }

    if (delta > 0) {
      return `按本页的价格评分口径，${primaryProductName} 为 ${formatScore(priceMetric.ciwi)}，${data.alternativeName} 为 ${formatScore(priceMetric.alternative)}。两者差距不大，但 Ciwi 在收费边界和长期可控性上略占优势。`;
    }

    if (delta === 0) {
      return `按本页的价格评分口径，${primaryProductName} 和 ${data.alternativeName} 都是 ${formatScore(priceMetric.ciwi)}。这通常说明真正的差异不在“贵不贵”本身，而在收费模式和后续维护成本。`;
    }

    if (delta <= -2) {
      return `按本页的价格评分口径，${data.alternativeName} 为 ${formatScore(priceMetric.alternative)}，${primaryProductName} 为 ${formatScore(priceMetric.ciwi)}。这通常意味着对手在入门价格或原生成本上更有吸引力，但未必代表长期运营成本更低。`;
    }

    return `按本页的价格评分口径，${data.alternativeName} 为 ${formatScore(priceMetric.alternative)}，${primaryProductName} 为 ${formatScore(priceMetric.ciwi)}。如果你更看重短期起步成本，对手略有吸引力；如果更看重长期治理，仍需要结合其他维度一起判断。`;
  }

  if (delta >= 2) {
    return `On this page's pricing signal, ${primaryProductName} scores ${formatScore(priceMetric.ciwi)} versus ${formatScore(priceMetric.alternative)} for ${data.alternativeName}. That usually suggests stronger pricing clarity, better long-term value, or more predictable budgeting on the Ciwi side.`;
  }

  if (delta > 0) {
    return `On this page's pricing signal, ${primaryProductName} scores ${formatScore(priceMetric.ciwi)} versus ${formatScore(priceMetric.alternative)} for ${data.alternativeName}. The gap is modest, but Ciwi looks slightly steadier on pricing boundaries and long-term predictability.`;
  }

  if (delta === 0) {
    return `On this page's pricing signal, both ${primaryProductName} and ${data.alternativeName} score ${formatScore(priceMetric.ciwi)}. That usually means the real difference is less about sticker price and more about pricing model and maintenance cost over time.`;
  }

  if (delta <= -2) {
    return `On this page's pricing signal, ${data.alternativeName} scores ${formatScore(priceMetric.alternative)} versus ${formatScore(priceMetric.ciwi)} for ${primaryProductName}. That usually makes the alternative more attractive on entry price or native cost, without necessarily meaning lower long-term operating cost.`;
  }

  return `On this page's pricing signal, ${data.alternativeName} scores ${formatScore(priceMetric.alternative)} versus ${formatScore(priceMetric.ciwi)} for ${primaryProductName}. If upfront cost matters most, the alternative may look slightly more attractive, while long-term governance still needs a broader comparison.`;
}

type CompareInsightCard = {
  ciwiContent: string;
  alternativeContent: string;
  summary: string;
};

type CompareFactRow = {
  label: string;
  ciwi: string;
  alternative: string;
};

type CompareFaqItem = CompareItem["faq"][number];
type CompareBestFitItem = {
  label: string;
  text: string;
};

type ContinueResourceItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  meta: string[];
  kind: "compare" | "blog" | "help";
};

function normalizeInsightText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function sanitizeInsightContent(value: string, locale: "en" | "zh-cn") {
  const normalized = normalizeInsightText(value);

  if (locale === "zh-cn") {
    return normalized
      .replace(/^从你给的[^，。]*[看图描述]，?/, "")
      .replace(/^按你给的[^，。]*[图述]，?/, "")
      .replace(/^根据你给的[^，。]*，?/, "")
      .replace(/^换句话说，?/, "")
      .replace(/^简单说，?/, "")
      .replace(/^Ciwi 的公开定位则?/, "")
      .replace(/^Ciwi 的公开套餐结构则?/, "")
      .replace(/^它强调/, "")
      .replace(/更像/g, "定位为")
      .trim();
  }

  return normalized
    .replace(/^Based on the [^.]*\.\s*/i, "")
    .replace(/^From the [^.]*\.\s*/i, "")
    .replace(/^In practice,\s*/i, "")
    .replace(/^That means\s*/i, "")
    .replace(/^So\s*/i, "")
    .replace(/reads more like/gi, "is positioned as")
    .replace(/leans more toward/gi, "focuses more on")
    .trim();
}

function findFirstMarkerIndex(text: string, markers: string[]) {
  const matches = markers
    .map((marker) => ({marker, index: text.indexOf(marker)}))
    .filter((match) => match.index >= 0)
    .sort((a, b) => a.index - b.index);

  return matches[0] ?? null;
}

function getDefaultCiwiAppContent(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? "Ciwi 是面向 Shopify 的原生翻译与本地化工具，强调更快的 i18n 前台切换速度和对多语言 SEO 更友好的落地方式。它覆盖商品页、主题内容、元字段、第三方 app 文本和自定义 Liquid 文本，并支持 switcher 切换、商品图片与 Alt 文本本地化，以及持续同步。公开能力包括 147+ 种语言、200+ 货币、术语库、自定义 AI 提示词，以及 GPT 5.6、DeepSeek 等先进模型支持。"
    : "Ciwi is a native Shopify translation and localization product built for faster storefront i18n switching and a more SEO-friendly multilingual setup. It covers product pages, theme content, metafields, third-party app text, and custom Liquid text, while supporting switcher-based language selection, localized product images and alt text, and ongoing sync. Public capabilities include 147+ languages, 200+ currencies, glossaries, custom AI prompts, and support for advanced models such as GPT 5.6 and DeepSeek.";
}

function getDefaultCiwiPricingContent(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? "Ciwi 当前公开 4 档：Free、Basic $7.99/月、Pro $19.99/月、Premium $39.99/月，年付可省 20%，并提供 5 天免费试用。公开能力从 147+ 种语言、200+ 货币、术语库、自定义 AI 提示词和 GPT 5.6、DeepSeek 等模型支持起步，逐步提升到更高积分额度、自动翻译、商品图片与 Alt 文本本地化、1 对 1 支持和人工翻译审核，整体价格门槛相对友好。"
    : "Ciwi currently publishes four tiers: Free, Basic at $7.99/month, Pro at $19.99/month, and Premium at $39.99/month, with annual billing saving 20% and a 5-day free trial. Public capability starts from 147+ languages, 200+ currencies, glossaries, custom AI prompts, and support for models such as GPT 5.6 and DeepSeek, then scales into higher credits, auto translation, localized product images and alt text, 1v1 support, and manual review by translation experts, with a relatively accessible entry price overall.";
}

function getAppInsightSummary(data: CompareItem, locale: "en" | "zh-cn") {
  const allScores = [...data.summaryMetrics, ...data.scoreMatrix];
  const ciwiWins = allScores.filter((item) => item.ciwi > item.alternative).length;
  const alternativeWins = allScores.filter((item) => item.alternative > item.ciwi).length;
  const ciwiFocus = getTopLabels(allScores, "ciwi").join(locale === "zh-cn" ? "、" : ", ");
  const alternativeFocus = getTopLabels(allScores, "alternative").join(locale === "zh-cn" ? "、" : ", ");

  if (locale === "zh-cn") {
    return `评分摘要：共 ${allScores.length} 个评分点，Ciwi 领先 ${ciwiWins} 项，${data.alternativeName} 领先 ${alternativeWins} 项。Ciwi 的高分维度主要是 ${ciwiFocus || "长期治理"}；${data.alternativeName} 的高分维度主要是 ${alternativeFocus || "快速上线"}。`;
  }

  return `Scoring summary: across ${allScores.length} scoring signals, Ciwi leads in ${ciwiWins} and ${data.alternativeName} leads in ${alternativeWins}. Ciwi's strongest areas are ${ciwiFocus || "long-term governance"}; ${data.alternativeName}'s strongest areas are ${alternativeFocus || "faster launch"}.`;
}

function getPricingInsightSummary(data: CompareItem, locale: "en" | "zh-cn") {
  const priceMetric = getPriceMetric(data);

  if (!priceMetric) {
    return locale === "zh-cn"
      ? "价格摘要：当前条目没有单独价格评分，建议重点比较公开套餐数量、入门门槛、收费单位和追加成本。"
      : "Pricing summary: this entry does not expose a dedicated pricing score, so the better comparison is published tiers, entry threshold, billing unit, and expansion cost.";
  }

  if (locale === "zh-cn") {
    return `价格摘要：Ciwi 价格评分 ${formatScore(priceMetric.ciwi)}，${data.alternativeName} 价格评分 ${formatScore(priceMetric.alternative)}，分差 ${Math.abs(priceMetric.ciwi - priceMetric.alternative)} 分。`;
  }

  return `Pricing summary: Ciwi scores ${formatScore(priceMetric.ciwi)} on price and ${data.alternativeName} scores ${formatScore(priceMetric.alternative)}, a gap of ${Math.abs(priceMetric.ciwi - priceMetric.alternative)} points.`;
}

function getPricingTableRows(data: CompareItem, locale: "en" | "zh-cn") {
  const table = data.pricingTable;

  if (!table) {
    return [];
  }

  const rowCount = Math.max(table.ciwiPlans.length, table.alternativePlans.length);

  return Array.from({length: rowCount}, (_, index) => ({
    label:
      table.rowLabels?.[index] ??
      (locale === "zh-cn" ? `第 ${index + 1} 档` : `Tier ${index + 1}`),
    ciwi: table.ciwiPlans[index],
    alternative: table.alternativePlans[index],
  }));
}

function splitInsightSentences(text: string) {
  return normalizeInsightText(text)
    .split(/(?<=[。！？.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getFirstSentence(text: string, fallback: string) {
  return splitInsightSentences(text)[0] ?? fallback;
}

function collectMatchedLabels(
  text: string,
  rules: Array<{label: string; pattern: RegExp}>,
  locale: "en" | "zh-cn",
  fallback: string,
) {
  const normalized = text.toLowerCase();
  const matched = rules.filter((rule) => rule.pattern.test(normalized)).map((rule) => rule.label);

  if (matched.length === 0) {
    return fallback;
  }

  return locale === "zh-cn" ? matched.join("、") : matched.join(", ");
}

function getCiwiAppFactRows(locale: "en" | "zh-cn"): CompareFactRow[] {
  if (locale === "zh-cn") {
    return [
      {
        label: "定位",
        ciwi: "Shopify 原生翻译与本地化工具，强调更快的 i18n 切换速度、对多语言 SEO 更友好的落地方式，以及更高的前台体验效率。在翻译速度表现上，目前是 shopify app store 最快的原生翻译工具。相比大部分使用前端页面翻译的工具，例如 EA translate，Ciwi 提供了和 Shopify translate & adapt 一致的原生翻译模式，不仅可以有效翻译到多个语言，还可以根据用户需求进行自定义翻译。在 SEO 表现上，对于页面的索引和抓取也有非常优秀的性能。除此之外，自动更新和语言翻译估算等功能，有效帮助客户快速了解自己的商店规模和需要的花费。在数据覆盖度上，目前 Ciwi 除了覆盖已有的文本内容，还针对自定义 liquid 和第三方 app 做了兼容处理，可以完美实现全面数据覆盖。在使用过程中，Ciwi 还提供了 AI 模型选择的能力，可以自由选择不同的优秀 AI 模型。此外，他们的售后服务非常明确，愿意为翻译质量负责，并积极配合客户解决问题，同时也有补偿积分和退款的明确政策。",
        alternative: "",
      },
      {
        label: "覆盖内容",
        ciwi: "覆盖商品页、主题内容、元字段、第三方 app 文本、自定义 Liquid 文本、商品图片和 Alt 文本，并支持 switcher 与自定义 AI 提示词。",
        alternative: "",
      },
      {
        label: "SEO/同步",
        ciwi: "支持 200+ 货币、switcher 切换、按 IP 自动识别、术语库和实时同步，并兼顾翻译速度、SEO 友好度与持续更新效率。",
        alternative: "",
      },
    ];
  }

  return [
    {
      label: "Positioning",
      ciwi: "Native Shopify translation and localization for merchants who want faster storefront i18n switching, a more SEO-friendly multilingual implementation, and higher on-site experience efficiency. In translation speed, it is currently the fastest native translation tool in the Shopify App Store. Compared with tools that rely on front-end page translation, such as EA Translate, Ciwi follows the same native translation approach as Shopify Translate & Adapt, so merchants can localize multiple languages effectively while still customizing translations to fit their needs. For SEO, it performs strongly for page indexing and crawling. Features such as auto-update and translation cost estimation also help merchants quickly understand their store size and expected spend. In terms of coverage, Ciwi goes beyond existing text content by supporting custom Liquid and third-party apps for more complete data coverage. Merchants can also choose from multiple strong AI models. The team is also explicit about after-sales support: they are willing to stand behind translation quality, actively help solve issues, and offer clear credit compensation and refund policies.",
      alternative: "",
    },
    {
      label: "Coverage",
      ciwi: "Covers product pages, theme content, metafields, third-party app text, custom Liquid text, product images, and alt text with switcher support and custom AI prompts.",
      alternative: "",
    },
    {
      label: "SEO / Sync",
      ciwi: "Supports 200+ currencies, switcher-based selection, IP-based detection, glossaries, and real-time sync while staying focused on translation speed, SEO friendliness, and update efficiency.",
      alternative: "",
    },
  ];
}

function getAlternativeAppFactRows(data: CompareItem, locale: "en" | "zh-cn", appInsightCard: CompareInsightCard): CompareFactRow[] {
  const text = `${data.appComparison ?? ""} ${data.description} ${data.pricingComparison ?? ""}`;
  const coverage = collectMatchedLabels(
    text,
    locale === "zh-cn"
      ? [
          {label: "商品/集合/页面", pattern: /(products?|商品|collections?|集合|pages?|页面|blogs?|博客)/i},
          {label: "主题/导航/FAQ", pattern: /(themes?|主题|navigation|导航|faq)/i},
          {label: "第三方应用/结账", pattern: /(third-?party apps?|第三方应用|checkout|结账|dynamic content|动态内容)/i},
          {label: "图片/Alt 文本/元字段", pattern: /(images?|图片|alt text|alt-text|metafields?|metaobjects?|元字段)/i},
          {label: "货币/切换器", pattern: /(currenc|货币|switcher|切换器|geolocation|地理定位)/i},
        ]
      : [
          {label: "products / collections / pages", pattern: /(products?|collections?|pages?|blogs?)/i},
          {label: "themes / navigation / FAQs", pattern: /(themes?|navigation|faq)/i},
          {label: "third-party apps / checkout", pattern: /(third-?party apps?|checkout|dynamic content)/i},
          {label: "images / alt text / metafields", pattern: /(images?|alt text|alt-text|metafields?|metaobjects?)/i},
          {label: "currency / switcher", pattern: /(currenc|switcher|geolocation)/i},
        ],
    locale,
    locale === "zh-cn" ? "公开信息未单列更多覆盖项。" : "Public copy does not expose more coverage detail.",
  );
  const seoSync = collectMatchedLabels(
    text,
    locale === "zh-cn"
      ? [
          {label: "多语言 SEO", pattern: /(seo|meta tags|metadata|url|slug|hreflang|structured data|搜索引擎|多语言 seo)/i},
          {label: "自动同步", pattern: /(sync|自动同步|持续同步|new items translation auto sync|autopilot)/i},
          {label: "自动翻译", pattern: /(auto-translate|auto translation|自动翻译)/i},
          {label: "语言/货币自动切换", pattern: /(switcher|切换器|geolocation|redirection|redirect|ip)/i},
        ]
      : [
          {label: "multilingual SEO", pattern: /(seo|meta tags|metadata|url|slug|hreflang|structured data)/i},
          {label: "auto sync", pattern: /(sync|autopilot|new items translation auto sync)/i},
          {label: "auto translation", pattern: /(auto-translate|auto translation)/i},
          {label: "language / currency switching", pattern: /(switcher|geolocation|redirection|redirect|ip)/i},
        ],
    locale,
    locale === "zh-cn" ? "公开信息未单列 SEO 或同步能力。" : "Public copy does not expose dedicated SEO or sync detail.",
  );

  return [
    {
      label: locale === "zh-cn" ? "定位" : "Positioning",
      ciwi: "",
      alternative: getFirstSentence(appInsightCard.alternativeContent, data.description),
    },
    {
      label: locale === "zh-cn" ? "覆盖内容" : "Coverage",
      ciwi: "",
      alternative: locale === "zh-cn" ? `公开覆盖项主要包括 ${coverage}。` : `Public coverage highlights ${coverage}.`,
    },
    {
      label: locale === "zh-cn" ? "SEO/同步" : "SEO / Sync",
      ciwi: "",
      alternative: locale === "zh-cn" ? `公开强调 ${seoSync}。` : `Public messaging emphasizes ${seoSync}.`,
    },
  ];
}

function summarizePricingStructure(
  plans: Array<{name: string; note?: string}>,
  locale: "en" | "zh-cn",
  fallbackBasis: string,
) {
  const names = plans.map((plan) => plan.name).filter(Boolean);
  const noteText = plans.map((plan) => plan.note ?? "").join(" ");
  const basis = collectMatchedLabels(
    noteText,
    locale === "zh-cn"
      ? [
          {label: "credits", pattern: /credits?/i},
          {label: "词数", pattern: /(words?|词数)/i},
          {label: "语言数", pattern: /(languages?|语言)/i},
          {label: "产品数", pattern: /(products?|产品)/i},
          {label: "货币数", pattern: /(currenc|货币)/i},
        ]
      : [
          {label: "credits", pattern: /credits?/i},
          {label: "word volume", pattern: /(words?|word)/i},
          {label: "language count", pattern: /(languages?|language)/i},
          {label: "product count", pattern: /(products?|product)/i},
          {label: "currency count", pattern: /(currenc|currency)/i},
        ],
    locale,
    fallbackBasis,
  );

  if (locale === "zh-cn") {
    return `${plans.length} 档：${names.join(" / ")}。公开分层主要按 ${basis} 扩展。`;
  }

  return `${plans.length} tiers: ${names.join(" / ")}. Public packaging mainly expands by ${basis}.`;
}

function getEntryPriceFact(
  plans: Array<{name: string; price: string}>,
  locale: "en" | "zh-cn",
) {
  const freePlan = plans.find((plan) => /free/i.test(plan.price) || /free/i.test(plan.name));
  const firstPaidPlan = plans.find((plan) => !/free/i.test(plan.price) && !/free/i.test(plan.name));

  if (locale === "zh-cn") {
    if (freePlan && firstPaidPlan) {
      return `可先从 ${freePlan.name} 开始，首个付费档是 ${firstPaidPlan.name} ${firstPaidPlan.price}。`;
    }

    if (firstPaidPlan) {
      return `无免费版，入门价格从 ${firstPaidPlan.name} ${firstPaidPlan.price} 起。`;
    }

    return "当前没有更明确的公开门槛数据。";
  }

  if (freePlan && firstPaidPlan) {
    return `Starts with ${freePlan.name}, and the first paid tier is ${firstPaidPlan.name} at ${firstPaidPlan.price}.`;
  }

  if (firstPaidPlan) {
    return `No free tier is published; entry starts at ${firstPaidPlan.name} ${firstPaidPlan.price}.`;
  }

  return "No clearer public entry threshold is exposed.";
}

function getPricingFactRows(
  data: CompareItem,
  locale: "en" | "zh-cn",
  pricingInsightCard: CompareInsightCard,
): CompareFactRow[] {
  const ciwiPlans = data.pricingTable?.ciwiPlans ?? [];
  const alternativePlans = data.pricingTable?.alternativePlans ?? [];

  if (ciwiPlans.length > 0 && alternativePlans.length > 0) {
    return [
      {
        label: locale === "zh-cn" ? "套餐结构" : "Package structure",
        ciwi: summarizePricingStructure(
          ciwiPlans,
          locale,
          locale === "zh-cn" ? "credits 和能力层级" : "credits and capability depth",
        ),
        alternative: summarizePricingStructure(
          alternativePlans,
          locale,
          locale === "zh-cn" ? "公开套餐字段" : "published plan variables",
        ),
      },
      {
        label: locale === "zh-cn" ? "价格门槛" : "Entry price",
        ciwi: getEntryPriceFact(ciwiPlans, locale),
        alternative: getEntryPriceFact(alternativePlans, locale),
      },
    ];
  }

  return [
    {
      label: locale === "zh-cn" ? "套餐结构" : "Package structure",
      ciwi: getDefaultCiwiPricingContent(locale),
      alternative: pricingInsightCard.alternativeContent,
    },
    {
      label: locale === "zh-cn" ? "价格门槛" : "Entry price",
      ciwi: locale === "zh-cn" ? "首个付费档是 Basic $7.99/月。提供 5 天的免费试用，试用期间可以获得150 万积分" : "The first paid tier is Basic at $7.99/month.",
      alternative:
        locale === "zh-cn"
          ? "目前免费，App Store 定价页为准。"
          : "Free now, rely on the App Store pricing page.",
    },
  ];
}

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function getSeededItems<T>(items: T[], seedKey: string, limit: number) {
  return [...items]
    .map((item, index) => ({
      item,
      score: hashString(`${seedKey}-${index}-${JSON.stringify(item)}`),
    }))
    .sort((left, right) => left.score - right.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

function getContinueResourceItems(
  data: CompareItem,
  locale: "en" | "zh-cn",
  compares: CompareItem[],
  blogPosts: ReturnType<typeof getBlogPosts>,
  helpCenterDocs: ReturnType<typeof getHelpCenterDocs>,
  copy: ReturnType<typeof getCompareDetailCopy>,
) {
  const compareItems: ContinueResourceItem[] = compares
    .filter((item) => item.slug !== data.slug)
    .map((item) => ({
      id: `compare-${item.slug}`,
      title: item.title,
      description: item.description,
      href: `/compare/${item.slug}`,
      meta: [...copy.sections.continue.siblingMeta],
      kind: "compare",
    }));

  const blogItems: ContinueResourceItem[] = blogPosts.map((item) => ({
    id: `blog-${item.href}`,
    title: item.title,
    description: item.description,
    href: item.href,
    meta: [locale === "zh-cn" ? "博客" : "Blog", item.publishedAt],
    kind: "blog",
  }));

  const helpItems: ContinueResourceItem[] = helpCenterDocs.map((item) => ({
    id: `help-${item.href}`,
    title: item.title,
    description: item.description,
    href: item.href,
    meta: [...item.meta],
    kind: "help",
  }));

  const compareSeed = `${data.slug}-${locale}-compare`;
  const contentSeed = `${data.slug}-${locale}-content`;
  const fallbackSeed = `${data.slug}-${locale}-fallback`;
  const selectedCompares = getSeededItems(compareItems, compareSeed, 2);
  const mixedContent = getSeededItems([...blogItems, ...helpItems], contentSeed, 3);
  const selectedIds = new Set([...selectedCompares, ...mixedContent].map((item) => item.id));
  const fallbackPool = [...compareItems, ...blogItems, ...helpItems].filter((item) => !selectedIds.has(item.id));
  const fallbackItems = getSeededItems(fallbackPool, fallbackSeed, Math.max(0, 5 - selectedCompares.length - mixedContent.length));

  return [...selectedCompares, ...mixedContent, ...fallbackItems].slice(0, 5);
}

function getBestFitItems(data: CompareItem, locale: "en" | "zh-cn"): CompareBestFitItem[] {
  const allScores = [...data.summaryMetrics, ...data.scoreMatrix];
  const scoreLabels = allScores.map((item) => item.label.toLowerCase());
  const ciwiPlans = data.pricingTable?.ciwiPlans ?? [];
  const alternativePlans = data.pricingTable?.alternativePlans ?? [];
  const hasPricingTable = ciwiPlans.length > 0 || alternativePlans.length > 0;
  const adjacentTool = isAdjacentToolComparison(data);
  const hasSeoSignal = scoreLabels.some((label) => /seo|url|routing|hreflang|content routing|承接|索引/.test(label));
  const hasBrandSignal = scoreLabels.some((label) => /glossary|quality|human review|manual|brand|术语|人工|翻译质量/.test(label));
  const hasMarketSignal = scoreLabels.some((label) => /market|currency|location|geolocation|language coverage|storefront selector|货币|市场|地理|语言覆盖/.test(label));
  const hasScaleSignal = scoreLabels.some((label) => /data coverage|structured|sync|workflow|operations|governance|coverage|结构化|同步|运营|治理|覆盖/.test(label));
  const numericPlanPrices = alternativePlans
    .map((plan) => Number.parseFloat(plan.price.replace(/[^0-9.]/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);
  const firstPaidPrice = numericPlanPrices[0] ?? 0;
  const highestPrice = numericPlanPrices.at(-1) ?? 0;
  const highBudgetCompare = firstPaidPrice >= 25 || highestPrice >= 75 || /reversia/i.test(data.slug);

  if (locale === "zh-cn") {
    return [
      {
        label: "Shopify 套餐",
        text: adjacentTool
          ? "适合 Shopify Basic 到 Advanced、已经在使用 Markets 或地域分流，并希望补齐翻译环节的店铺。"
          : highBudgetCompare
            ? "适合 Shopify Advanced、Plus 或已经在多个市场稳定出单的店铺。"
            : hasPricingTable
              ? "适合 Shopify Basic、Grow 到 Advanced 阶段，已经开始系统做多语言运营的店铺。"
              : "适合已经开启 Shopify Markets，正在比较不同本地化方案的店铺。",
      },
      {
        label: "翻译质量要求",
        text: hasBrandSignal
          ? "适合对翻译准确度、术语一致性、人工复核或已有人审流程有要求的团队。"
          : "适合先满足多语言覆盖和日常上新，再逐步提高翻译精细度的团队。",
      },
      {
        label: "品牌调性",
        text: hasBrandSignal
          ? "适合重品牌语气、商品卖点表达和营销文案一致性的品牌。"
          : "适合品牌调性要求中等，但仍希望保留手动修订空间的品牌。",
      },
      {
        label: "业务规模",
        text: hasScaleSignal
          ? "适合 SKU、集合页、主题内容、FAQ 和活动页会持续增长的中大型业务。"
          : "适合先解决单一翻译或单一市场问题，再逐步扩展到更多内容类型的业务。",
      },
      {
        label: "SEO / 多市场",
        text: adjacentTool
          ? "适合同时关注 Markets 路由、地域识别、图片或前台切换逻辑，而不是只看翻译本身的团队。"
          : hasSeoSignal || hasMarketSignal
            ? "适合同步关注多语言 SEO、URL、Markets、货币切换和不同市场内容差异的团队。"
            : "适合已经开始做多语言落地页和基础搜索承接，但 SEO 不是唯一决策点的团队。",
      },
    ];
  }

  return [
    {
      label: "Shopify plan",
      text: adjacentTool
        ? "Best for Shopify Basic to Advanced stores already using Markets or regional routing and now filling the translation layer."
        : highBudgetCompare
          ? "Best for Shopify Advanced or Plus stores already operating across multiple revenue-generating markets."
          : hasPricingTable
            ? "Best for Shopify Basic, Grow, and Advanced stores already turning multilingual work into a repeatable operating process."
            : "Best for stores already using Shopify Markets and comparing localization options more seriously.",
    },
    {
      label: "Translation requirements",
      text: hasBrandSignal
        ? "Best for teams with higher expectations around translation accuracy, terminology consistency, and human review."
        : "Best for teams first solving multilingual coverage and launch efficiency, then improving quality depth over time.",
    },
    {
      label: "Brand Voice",
      text: hasBrandSignal
        ? "Best for brands that care about voice consistency, product positioning language, and marketing copy staying on-brand across markets."
        : "Best for brands with lighter voice requirements that still want room for manual revision.",
    },
    {
      label: "Business Size",
      text: hasScaleSignal
        ? "Best for mid-sized to larger operations where SKUs, collection pages, theme content, FAQs, and launch pages keep growing."
        : "Best for businesses solving one market or one workflow gap first before expanding across more content types.",
    },
    {
      label: "SEO / multi-market",
      text: adjacentTool
        ? "Best for teams comparing geolocation, market routing, image localization, or storefront selector logic alongside translation."
        : hasSeoSignal || hasMarketSignal
          ? "Best for teams that care about multilingual SEO, URLs, Markets, currency switching, and market-specific content differences together."
          : "Best for teams already building multilingual landing pages and basic search visibility, even if SEO is not the only buying factor.",
    },
  ];
}

function getTopDifferenceLabels(data: CompareItem, locale: "en" | "zh-cn") {
  const ciwiFocus = getTopLabels(data.scoreMatrix, "ciwi").join(locale === "zh-cn" ? "、" : ", ");
  const alternativeFocus = getTopLabels(data.scoreMatrix, "alternative").join(locale === "zh-cn" ? "、" : ", ");

  return {
    ciwiFocus: ciwiFocus || (locale === "zh-cn" ? "长期治理" : "long-term governance"),
    alternativeFocus: alternativeFocus || (locale === "zh-cn" ? "快速上线" : "faster launch"),
  };
}

function isAdjacentToolComparison(data: CompareItem) {
  const overlapMetric = data.scoreMatrix.find((item) => /functional overlap|功能重叠度/i.test(item.label));

  if (overlapMetric) {
    return overlapMetric.ciwi <= 4 && overlapMetric.alternative <= 4;
  }

  return /geolocation|selecty|image translate|ez product image/i.test(data.slug) || /地理|图片/.test(data.title);
}

function buildGeneratedFaqItems(data: CompareItem, locale: "en" | "zh-cn"): CompareFaqItem[] {
  const {ciwiFocus, alternativeFocus} = getTopDifferenceLabels(data, locale);
  const pricingRows = getPricingTableRows(data, locale);
  const firstCiwiPaid = pricingRows.find((row) => row.ciwi?.price && !/free/i.test(row.ciwi.price));
  const firstAlternativePaid = pricingRows.find((row) => row.alternative?.price && !/free/i.test(row.alternative.price));
  const bestForText = data.bestFor.slice(0, 2).join(locale === "zh-cn" ? "；" : "; ");
  const items: CompareFaqItem[] = [];

  items.push(
    locale === "zh-cn"
      ? {
          question: `${data.title} 更适合哪类商家？`,
          answer: `结论：这页比较最适合已经明确要做多语言运营、但还在比较“快速上线”与“长期治理”两条路径的 Shopify 商家。`,
          evidence: bestForText ? [`当前条目的适用人群重点包括：${bestForText}。`] : undefined,
        }
      : {
          question: `Who is ${data.title} most useful for?`,
          answer: `Conclusion: this comparison is most useful for Shopify merchants who already know they need multilingual operations and are deciding between faster launch and stronger long-term governance.`,
          evidence: bestForText ? [`Best-fit signals on this page include: ${bestForText}.`] : undefined,
        },
  );

  items.push(
    locale === "zh-cn"
      ? {
          question: `${primaryProductName} 和 ${data.alternativeName} 的核心差异是什么？`,
          answer: `结论：这页最核心的差异，不是“能不能翻译”，而是 ${primaryProductName} 更强在 ${ciwiFocus}，而 ${data.alternativeName} 更突出在 ${alternativeFocus}。`,
          evidence: [
            `该条目评分最高的 Ciwi 维度主要是：${ciwiFocus}。`,
            `${data.alternativeName} 的高分维度主要是：${alternativeFocus}。`,
          ],
        }
      : {
          question: `What is the biggest difference between ${primaryProductName} and ${data.alternativeName}?`,
          answer: `Conclusion: the biggest difference on this page is not whether translation exists at all, but that ${primaryProductName} scores higher on ${ciwiFocus}, while ${data.alternativeName} stands out more on ${alternativeFocus}.`,
          evidence: [
            `${primaryProductName}'s highest-scoring dimensions here are ${ciwiFocus}.`,
            `${data.alternativeName}'s highest-scoring dimensions here are ${alternativeFocus}.`,
          ],
        },
  );

  items.push(
    locale === "zh-cn"
      ? {
          question: `${data.alternativeName} 和 ${primaryProductName} 的定价应该怎么比较？`,
          answer: `结论：真正要比较的不是首页价格高低，而是首个付费门槛、套餐分层逻辑，以及后续扩容是否容易失控。`,
          evidence: pricingRows.length > 0
            ? [
                firstCiwiPaid?.ciwi ? `${primaryProductName} 的首个付费档是 ${firstCiwiPaid.ciwi.name} ${firstCiwiPaid.ciwi.price}。` : `${primaryProductName} 当前公开多档套餐。`,
                firstAlternativePaid?.alternative ? `${data.alternativeName} 的首个付费档是 ${firstAlternativePaid.alternative.name} ${firstAlternativePaid.alternative.price}。` : `${data.alternativeName} 当前公开的价格结构需要结合其定价页一起看。`,
              ]
            : [`这页暂无完整套餐表时，更适合比较价格评分、收费单位和长期扩容成本。`],
        }
      : {
          question: `How should pricing be compared between ${data.alternativeName} and ${primaryProductName}?`,
          answer: `Conclusion: the better comparison is not the headline sticker price alone, but the first paid threshold, the plan structure, and whether expansion cost stays predictable.`,
          evidence: pricingRows.length > 0
            ? [
                firstCiwiPaid?.ciwi ? `${primaryProductName}'s first paid tier is ${firstCiwiPaid.ciwi.name} at ${firstCiwiPaid.ciwi.price}.` : `${primaryProductName} publishes multiple plans on this page.`,
                firstAlternativePaid?.alternative ? `${data.alternativeName}'s first paid tier is ${firstAlternativePaid.alternative.name} at ${firstAlternativePaid.alternative.price}.` : `${data.alternativeName}'s published pricing should be read together with its pricing page.`,
              ]
            : [`When a full pricing ladder is unavailable, compare price score, billing unit, and long-term expansion cost instead.`],
        },
  );

  if (isAdjacentToolComparison(data)) {
    items.push(
      locale === "zh-cn"
        ? {
            question: `${primaryProductName} 和 ${data.alternativeName} 是直接替代关系吗？`,
            answer: `结论：不是严格的一对一替代。${primaryProductName} 更偏翻译与本地化治理，${data.alternativeName} 更像相邻能力层工具。`,
            evidence: [`这页评分里“功能重叠度”本身就偏低，说明两者解决的问题只有部分重合。`, `当前条目描述也更强调要先分清你缺的是翻译工作流，还是 ${data.alternativeName} 所在的能力层。`],
          }
        : {
            question: `Are ${primaryProductName} and ${data.alternativeName} direct substitutes?`,
            answer: `Conclusion: not in a strict one-to-one sense. ${primaryProductName} is more about translation and localization governance, while ${data.alternativeName} sits on an adjacent capability layer.`,
            evidence: [`The functional-overlap signal on this page is intentionally low, which means the two products only partially solve the same problem.`, `The comparison itself is more useful for deciding whether the real gap is translation workflow or ${data.alternativeName}'s adjacent capability.`],
          },
    );
  }

  return items;
}

function getRenderedFaqItems(data: CompareItem, locale: "en" | "zh-cn") {
  const existing = data.faq ?? [];
  const generated = buildGeneratedFaqItems(data, locale);
  const seen = new Set(existing.map((item) => item.question));
  const merged = [...existing];

  for (const item of generated) {
    if (!seen.has(item.question)) {
      merged.push(item);
      seen.add(item.question);
    }

    if (merged.length >= 4) {
      break;
    }
  }

  return merged;
}

function buildInsightCard(
  text: string,
  locale: "en" | "zh-cn",
  fallbackCiwiContent: string,
  fallbackAlternativeContent: string,
  fallbackSummary: string,
  ciwiMarkers: string[],
  summaryMarkers: string[],
): CompareInsightCard {
  const normalized = normalizeInsightText(text);
  const ciwiMatch = findFirstMarkerIndex(normalized, ciwiMarkers);

  if (!ciwiMatch) {
    return {
      ciwiContent: sanitizeInsightContent(fallbackCiwiContent, locale),
      alternativeContent: sanitizeInsightContent(normalized || fallbackAlternativeContent, locale),
      summary: fallbackSummary,
    };
  }

  const alternativeContent = sanitizeInsightContent(normalized.slice(0, ciwiMatch.index), locale) || sanitizeInsightContent(fallbackAlternativeContent, locale);
  const remainder = normalized.slice(ciwiMatch.index);
  const summaryMatch = findFirstMarkerIndex(remainder, summaryMarkers);

  if (!summaryMatch) {
    return {
      ciwiContent: sanitizeInsightContent(remainder, locale) || sanitizeInsightContent(fallbackCiwiContent, locale),
      alternativeContent,
      summary: fallbackSummary,
    };
  }

  const ciwiContent = sanitizeInsightContent(remainder.slice(0, summaryMatch.index), locale) || sanitizeInsightContent(fallbackCiwiContent, locale);

  return {
    ciwiContent,
    alternativeContent,
    summary: fallbackSummary,
  };
}

function getAppInsightCard(data: CompareItem, locale: "en" | "zh-cn") {
  const comparison = buildAppPositioningComparison(data, locale);

  return buildInsightCard(
    comparison,
    locale,
    getDefaultCiwiAppContent(locale),
    data.description,
    getAppInsightSummary(data, locale),
    locale === "zh-cn"
      ? ["Ciwi 的公开定位", "Ciwi 的产品定位", "Ciwi 的公开套餐结构", "Ciwi 的公开定位则", "Ciwi 则"]
      : ["Ciwi's public positioning", "Ciwi's public packaging", "Ciwi, by contrast,", "Ciwi's public positioning is"],
    locale === "zh-cn" ? ["换句话说", "简单说"] : ["In practice,", "So "],
  );
}

function getPricingInsightCard(data: CompareItem, locale: "en" | "zh-cn") {
  const comparison = buildPricingComparison(data, locale);
  const priceMetric = getPriceMetric(data);
  const fallbackAlternativeContent = priceMetric
    ? locale === "zh-cn"
      ? `${data.alternativeName} 当前价格评分为 ${formatScore(priceMetric.alternative)}，更适合和收费模式、入门门槛以及长期运营成本一起看。`
      : `${data.alternativeName} scores ${formatScore(priceMetric.alternative)} on this page's pricing signal, so the better judgment is still entry cost, pricing model, and long-term operating cost together.`
    : data.description;

  const fallbackSummary = priceMetric
    ? getPricingInsightSummary(data, locale)
    : getPricingInsightSummary(data, locale);

  return buildInsightCard(
    comparison,
    locale,
    getDefaultCiwiPricingContent(locale),
    fallbackAlternativeContent,
    fallbackSummary,
    locale === "zh-cn" ? ["Ciwi 也是", "Ciwi 则是", "Ciwi 的付费结构", "Ciwi 的公开套餐结构"] : ["Ciwi also publishes", "Ciwi, by contrast,", "Ciwi's paid structure"],
    locale === "zh-cn" ? ["简单说", "换句话说"] : ["So ", "That means"],
  );
}

function getCompareDetailCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        notFound: {
          title: "未找到对比页",
          description: "你访问的对比页面不存在。",
          path: "/compare",
        },
        hero: {
          eyebrow: "对比",
          panels: {
            summaryTitle: "概览",
            bestFitTitle: "更适合谁",
            totalScoreTitle: "总分对比",
            appCompareTitle: "应用定位",
            pricingCompareTitle: "定价对比",
          },
        },
        sections: {
          scoreTable: {
            eyebrow: "功能对比",
            title: "关键差异与快速结论",
            description: "纵向看能力项，横向比较两款产品在 10 分制下的表现。0-5 为弱，6-8 为中，9-10 为强。",
            featureLabel: "功能点",
            overallLabel: "综合",
          },
          faq: {
            eyebrow: "FAQ",
            title: "常见问题",
            description: "把商家最常见的判断问题收在一起，方便快速确认选型方向。",
          },
          continue: {
            eyebrow: "其他测评",
            title: "测评&翻译经验分享",
            description: "继续看其他产品测评、翻译经验和帮助文档，把选型判断和后续落地一起看清楚。",
            siblingMeta: ["对比", "替代方案"],
            translatorCard: {
              title: "AI Translator",
              description: "回到产品页，直接看适用场景、Demo 和关键能力。",
              href: "/products/translator",
              meta: ["产品", "Translator"],
            },
          },
        },
        finalCta: {
          title: "限时领取 5 天免费试用",
          description: "如果你已经看清方向差异，现在更适合直接安装 Ciwi Translator，用 5 天试用把真实商品、主题和 FAQ 跑一遍。",
          primaryLabel: "安装 Ciwi Translator",
          primaryHref: ciwiShopifyInstallUrl,
        },
        breadcrumbLabel: "对比",
        keywordLabel: "Shopify 对比",
      }
    : {
        notFound: {
          title: "Compare not found",
          description: "The requested compare page could not be found.",
          path: "/compare",
        },
        hero: {
          eyebrow: "Compare",
          panels: {
            summaryTitle: "Overview",
            bestFitTitle: "Who it's best for",
            totalScoreTitle: "Total score",
            appCompareTitle: "App positioning",
            pricingCompareTitle: "Pricing comparison",
          },
        },
        sections: {
          scoreTable: {
            eyebrow: "Score table",
            title: "Key differences and quick conclusions",
            description: "Read the feature rows vertically and compare both products horizontally on a ten-point scale. Scores 0-5 are weak, 6-8 are medium, and 9-10 are strong.",
            featureLabel: "Capability",
            overallLabel: "Overall",
          },
          faq: {
            eyebrow: "FAQ",
            title: "Frequently asked questions",
            description: "Collect the questions merchants ask most often so the comparison can turn into a clearer decision more quickly.",
          },
          continue: {
            eyebrow: "Continue reading",
            title: "Continue reading",
            description: "From here, continue into the product page, articles, and help docs.",
            siblingMeta: ["Compare", "Alternative"],
            translatorCard: {
              title: "AI Translator",
              description: "Return to the product page for scenarios, demo, and core capabilities.",
              href: "/products/translator",
              meta: ["Product", "Translator"],
            },
          },
        },
        finalCta: {
          title: "Claim a 5-day free trial",
          description: "If the direction is already clear, the best next step is to install Ciwi Translator and run a real five-day trial on products, themes, and FAQs.",
          primaryLabel: "Install Ciwi Translator",
          primaryHref: ciwiShopifyInstallUrl,
        },
        breadcrumbLabel: "Compare",
        keywordLabel: "Shopify compare",
      };
}

export function generateStaticParams() {
  return compares.map((item) => ({slug: item.slug}));
}

export async function generateMetadata({params}: CompareDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const canonicalSlug = getCanonicalCompareSlug(slug);
  const data = getCompareMap(locale)[canonicalSlug];
  const copy = getCompareDetailCopy(locale);

  if (!data) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: copy.notFound.path,
      locale,
    });
  }

  return buildPageMetadata({
    title: data.title,
    description: data.description,
    path: `/compare/${data.slug}`,
    locale,
  });
}

export default async function CompareDetailPage({params}: CompareDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const canonicalSlug = getCanonicalCompareSlug(slug);
  const data = getCompareMap(locale)[canonicalSlug];
  const copy = getCompareDetailCopy(locale);
  const compares = getCompares(locale);
  const blogPosts = getBlogPosts(locale);
  const helpCenterDocs = getHelpCenterDocs(locale);

  if (!data) {
    notFound();
  }

  if (canonicalSlug !== slug) {
    permanentRedirect(localizeHref(locale, `/compare/${canonicalSlug}`));
  }

  const pageUrl = new URL(localizeHref(locale, `/compare/${data.slug}`), siteUrl).toString();
  const continueResourceItems = getContinueResourceItems(data, locale, compares, blogPosts, helpCenterDocs, copy);
  const allScores = [...data.summaryMetrics, ...data.scoreMatrix];
  const overallReview = buildOverallAssessment(data, locale);
  const scoreSummary = buildScoreSummary(data, locale);
  const ciwiTotal = getTotalScore(allScores, "ciwi");
  const alternativeTotal = getTotalScore(allScores, "alternative");
  const totalMax = allScores.length * 10;
  const visibleTotalScoreMetrics = getVisibleTotalScoreMetrics(data);
  const ciwiTotalStars = getTotalStarRating(ciwiTotal, totalMax);
  const alternativeTotalStars = getTotalStarRating(alternativeTotal, totalMax);
  const ciwiAverage = getAverageScore(data.scoreMatrix, "ciwi");
  const alternativeAverage = getAverageScore(data.scoreMatrix, "alternative");
  const appInsightCard = getAppInsightCard(data, locale);
  const pricingInsightCard = getPricingInsightCard(data, locale);
  const alternativeAppFactRows = getAlternativeAppFactRows(data, locale, appInsightCard);
  const appFactRows = getCiwiAppFactRows(locale).map((row, index) => ({
    label: row.label,
    ciwi: row.ciwi,
    alternative: alternativeAppFactRows[index]?.alternative ?? "",
  }));
  const pricingFactRows = getPricingFactRows(data, locale, pricingInsightCard);
  const pricingTableRows = getPricingTableRows(data, locale);
  const bestFitItems = getBestFitItems(data, locale);
  const renderedFaqItems = getRenderedFaqItems(data, locale);
  const hasFaq = renderedFaqItems.length > 0;
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: copy.breadcrumbLabel, item: new URL(localizeHref(locale, "/compare"), siteUrl).toString()},
      {name: data.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: data.title,
      description: data.description,
      keywords: [copy.keywordLabel, data.title, ...data.bestFor],
    }),
    ...(hasFaq ? [buildFaqSchema(renderedFaqItems)] : []),
  ];
  return (
    <main className="compare-detail-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${data.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero compare-page-hero">
          <SectionHeading eyebrow={copy.hero.eyebrow} title={data.title} description={data.description} as="h1" />
          <div className="compare-page-overview" aria-label={locale === "zh-cn" ? "对比页概览" : "Compare page overview"}>
            <div className="compare-page-overview__item">
              <span className="compare-page-overview__label">{locale === "zh-cn" ? "对比产品" : "Products"}</span>
              <strong className="compare-page-overview__value">{primaryProductName} vs {data.alternativeName}</strong>
            </div>
            <div className="compare-page-overview__item">
              <span className="compare-page-overview__label">{locale === "zh-cn" ? "评分维度" : "Score dimensions"}</span>
              <strong className="compare-page-overview__value">
                {locale === "zh-cn"
                  ? `${data.scoreMatrix.length} 项功能 + ${data.summaryMetrics.length} 项摘要`
                  : `${data.scoreMatrix.length} feature signals + ${data.summaryMetrics.length} summary signals`}
              </strong>
            </div>
            <div className="compare-page-overview__item">
              <span className="compare-page-overview__label">{locale === "zh-cn" ? "评测方式" : "Method"}</span>
              <strong className="compare-page-overview__value">{locale === "zh-cn" ? "10 分制 / 弱中强" : "10-point / weak-medium-strong"}</strong>
            </div>
          </div>
          <div className="detail-grid detail-grid--single compare-detail-stack">
            <article className="compare-hero-panel compare-summary-card">
              <h2 className="compare-hero-panel__title">{copy.hero.panels.summaryTitle}</h2>
              <p className="compare-summary-card__lead">{overallReview}</p>
              <p className="quote">{scoreSummary}</p>
              <div className="compare-insight-stack">
                <section className="compare-insight-card">
                  <div className="compare-insight-card__header">
                    <div className="compare-insight-card__label">{copy.hero.panels.appCompareTitle}</div>
                  </div>
                  <div className="compare-facts-table" role="table" aria-label={copy.hero.panels.appCompareTitle}>
                    <div className="compare-facts-table__row compare-facts-table__row--head" role="row">
                      <div className="compare-facts-table__cell compare-facts-table__cell--head" role="columnheader">
                        {locale === "zh-cn" ? "字段" : "Field"}
                      </div>
                      <div className="compare-facts-table__cell compare-facts-table__cell--head" role="columnheader">
                        {primaryProductName}
                      </div>
                      <div className="compare-facts-table__cell compare-facts-table__cell--head" role="columnheader">
                        {data.alternativeName}
                      </div>
                    </div>
                    {appFactRows.map((row) => (
                      <div key={`${data.slug}-app-${row.label}`} className="compare-facts-table__row" role="row">
                        <div className="compare-facts-table__cell compare-facts-table__cell--label" role="cell">
                          {row.label}
                        </div>
                        <div className="compare-facts-table__cell" role="cell">
                          <p className="compare-facts-table__text">{row.ciwi}</p>
                        </div>
                        <div className="compare-facts-table__cell" role="cell">
                          <p className="compare-facts-table__text">{row.alternative}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="compare-insight-card__summary">
                    <span className="compare-insight-card__summary-label">{locale === "zh-cn" ? "总结摘要" : "Summary"}</span>
                    <p className="compare-insight-card__summary-text">{appInsightCard.summary}</p>
                  </div>
                </section>

                <section className="compare-insight-card">
                  <div className="compare-insight-card__header">
                    <div className="compare-insight-card__label">{copy.hero.panels.pricingCompareTitle}</div>
                  </div>
                  <div className="compare-facts-table" role="table" aria-label={copy.hero.panels.pricingCompareTitle}>
                    <div className="compare-facts-table__row compare-facts-table__row--head" role="row">
                      <div className="compare-facts-table__cell compare-facts-table__cell--head" role="columnheader">
                        {locale === "zh-cn" ? "字段" : "Field"}
                      </div>
                      <div className="compare-facts-table__cell compare-facts-table__cell--head" role="columnheader">
                        {primaryProductName}
                      </div>
                      <div className="compare-facts-table__cell compare-facts-table__cell--head" role="columnheader">
                        {data.alternativeName}
                      </div>
                    </div>
                    {pricingFactRows.map((row) => (
                      <div key={`${data.slug}-pricing-${row.label}`} className="compare-facts-table__row" role="row">
                        <div className="compare-facts-table__cell compare-facts-table__cell--label" role="cell">
                          {row.label}
                        </div>
                        <div className="compare-facts-table__cell" role="cell">
                          <p className="compare-facts-table__text">{row.ciwi}</p>
                        </div>
                        <div className="compare-facts-table__cell" role="cell">
                          <p className="compare-facts-table__text">{row.alternative}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {pricingTableRows.length > 0 ? (
                    <div className="compare-pricing-table" role="table" aria-label={copy.hero.panels.pricingCompareTitle}>
                      <div className="compare-pricing-table__row compare-pricing-table__row--head" role="row">
                        <div className="compare-pricing-table__cell compare-pricing-table__cell--head" role="columnheader">
                          {locale === "zh-cn" ? "档位" : "Tier"}
                        </div>
                        <div className="compare-pricing-table__cell compare-pricing-table__cell--head" role="columnheader">
                          {primaryProductName}
                        </div>
                        <div className="compare-pricing-table__cell compare-pricing-table__cell--head" role="columnheader">
                          {data.alternativeName}
                        </div>
                      </div>
                      {pricingTableRows.map((row) => (
                        <div key={`${data.slug}-${row.label}`} className="compare-pricing-table__row" role="row">
                          <div className="compare-pricing-table__cell compare-pricing-table__cell--tier" role="cell">
                            {row.label}
                          </div>
                          <div className="compare-pricing-table__cell" role="cell">
                            {row.ciwi ? (
                              <div className="compare-pricing-plan">
                                <strong className="compare-pricing-plan__name">{row.ciwi.name}</strong>
                                <span className="compare-pricing-plan__price">{row.ciwi.price}</span>
                                {row.ciwi.note ? <span className="compare-pricing-plan__note">{row.ciwi.note}</span> : null}
                              </div>
                            ) : <span className="compare-pricing-plan__empty">{locale === "zh-cn" ? "无公开数据" : "No public data"}</span>}
                          </div>
                          <div className="compare-pricing-table__cell" role="cell">
                            {row.alternative ? (
                              <div className="compare-pricing-plan">
                                <strong className="compare-pricing-plan__name">{row.alternative.name}</strong>
                                <span className="compare-pricing-plan__price">{row.alternative.price}</span>
                                {row.alternative.note ? <span className="compare-pricing-plan__note">{row.alternative.note}</span> : null}
                              </div>
                            ) : <span className="compare-pricing-plan__empty">{locale === "zh-cn" ? "无公开数据" : "No public data"}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div className="compare-insight-card__summary">
                    <span className="compare-insight-card__summary-label">{locale === "zh-cn" ? "总结摘要" : "Summary"}</span>
                    <p className="compare-insight-card__summary-text">{pricingInsightCard.summary}</p>
                  </div>
                </section>
              </div>
              <div className="compare-total-card">
                <div className="compare-total-card__title">{copy.hero.panels.totalScoreTitle}</div>
                <div className="compare-total-card__summary">
                  {[
                    {name: primaryProductName, value: ciwiTotalStars, accentClass: "compare-total-stat--ciwi"},
                    {name: data.alternativeName, value: alternativeTotalStars, accentClass: "compare-total-stat--alternative"},
                  ].map((item) => (
                    <div key={`summary-${item.name}`} className={`compare-total-stat ${item.accentClass}`}>
                      <span className="compare-total-stat__label">{item.name}</span>
                      <strong className="compare-total-stat__value">
                        {formatTotalStarRating(item.value)}
                      </strong>
                      <span className="compare-total-stat__stars" style={getTotalStarStyle(item.value)} aria-hidden="true">
                        <span className="compare-total-stat__stars-base">★★★★★</span>
                        <span className="compare-total-stat__stars-fill">★★★★★</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="compare-metric__rows">
                  {[
                    {name: primaryProductName, value: ciwiTotalStars, accentClass: "compare-metric__fill--ciwi"},
                    {name: data.alternativeName, value: alternativeTotalStars, accentClass: "compare-metric__fill--alternative"},
                  ].map((item, index) => (
                    <div key={`total-${item.name}`} className="compare-metric__row compare-metric__row--total">
                      <span className="compare-metric__name">{item.name}</span>
                      <div className="compare-metric__track compare-metric__track--total" aria-hidden="true">
                        <span
                          className={`compare-metric__fill ${item.accentClass}`}
                          style={getScoreBarStyle((item.value / 5) * 10, index * 100)}
                        />
                      </div>
                      <span className="compare-metric__value compare-metric__value--total">
                        {formatTotalStarRating(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="compare-metric-list">
                {visibleTotalScoreMetrics.map((metric, metricIndex) => (
                  <div key={metric.label} className="compare-metric">
                    <div className="compare-metric__header">
                      <strong>{metric.label}</strong>
                    </div>
                    <div className="compare-metric__rows">
                      {[
                        {name: primaryProductName, value: metric.ciwi, accentClass: "compare-metric__fill--ciwi"},
                        {name: data.alternativeName, value: metric.alternative, accentClass: "compare-metric__fill--alternative"},
                      ].map((item, itemIndex) => (
                        <div key={`${metric.label}-${item.name}`} className="compare-metric__row">
                          <span className="compare-metric__name">{item.name}</span>
                          <div className="compare-metric__track" aria-hidden="true">
                            <span
                              className={`compare-metric__fill ${item.accentClass}`}
                              style={getScoreBarStyle(item.value, metricIndex * 120 + itemIndex * 80)}
                            />
                          </div>
                          <span className="compare-metric__value">
                            {formatScore(item.value)} {getStrengthLabel(item.value, locale)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <article className="compare-hero-panel compare-bestfit-card">
              <h2 className="compare-hero-panel__title">{copy.hero.panels.bestFitTitle}</h2>
              <ul className="compare-bestfit-list">
                {bestFitItems.map((item, index) => (
                  <li key={`${item.label}-${index}`} className="compare-bestfit-item">
                    <span className="compare-bestfit-item__index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="compare-bestfit-item__body">
                      <span className="compare-bestfit-item__label">{item.label}</span>
                      <span className="compare-bestfit-item__text">{item.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
        <section className="page-section compare-page-section compare-page-section--matrix">
          <div className="compare-score-intro">
            <div className="compare-score-intro__header">
              <div className="section-heading__eyebrow">{copy.sections.scoreTable.eyebrow}</div>
              <h2>{copy.sections.scoreTable.title}</h2>
            </div>
            <p className="compare-score-intro__description">{copy.sections.scoreTable.description}</p>
          </div>
          <div className="surface-card compare-table-card">
            <div className="compare-table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col">{copy.sections.scoreTable.featureLabel}</th>
                    <th scope="col">{primaryProductName}</th>
                    <th scope="col">{data.alternativeName}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.scoreMatrix.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{renderScoreCell(row.ciwi, locale)}</td>
                      <td>{renderScoreCell(row.alternative, locale)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">{copy.sections.scoreTable.overallLabel}</th>
                    <td>{renderScoreCell(ciwiAverage, locale)}</td>
                    <td>{renderScoreCell(alternativeAverage, locale)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        <section className="page-section compare-page-section compare-page-section--resources">
          <SectionHeading
            eyebrow={copy.sections.continue.eyebrow}
            title={copy.sections.continue.title}
            description={copy.sections.continue.description}
          />
          <div className="resource-grid">
            {continueResourceItems.map((item) => (
              <ArticleCard
                key={item.id}
                title={item.title}
                description={item.description}
                href={item.href}
                meta={item.meta}
              />
            ))}
            <ArticleCard
              title={copy.sections.continue.translatorCard.title}
              description={copy.sections.continue.translatorCard.description}
              href={copy.sections.continue.translatorCard.href}
              meta={[...copy.sections.continue.translatorCard.meta]}
            />
          </div>
        </section>

        {hasFaq ? (
          <FaqSection
            eyebrow={copy.sections.faq.eyebrow}
            title={copy.sections.faq.title}
            description={copy.sections.faq.description}
            items={renderedFaqItems}
          />
        ) : null}
        <FinalCtaSection
          title={copy.finalCta.title}
          description={copy.finalCta.description}
          primaryLabel={copy.finalCta.primaryLabel}
          primaryHref={copy.finalCta.primaryHref}
        />
      </PageContainer>
    </main>
  );
}

function renderScoreCell(value: number, locale: "en" | "zh-cn") {
  const tone = getScoreTone(value);

  return (
    <div className="compare-score-cell">
      <span className={`compare-score-badge compare-score-badge--${tone}`}>{getStrengthLabel(value, locale)}</span>
      <span className="compare-score-cell__value">{formatScore(value)}</span>
    </div>
  );
}
