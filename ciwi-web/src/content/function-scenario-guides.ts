import type {Locale} from "@/lib/i18n";
import importedGuides from "@/content/data/function_scenario_guides.json";
import importedGuidesZh from "@/content/data/function_scenario_guides.zh-cn.json";
import {createLocalizedGuideContent} from "@/content/guide-content";

export type FunctionScenarioOverviewDriver = {
  title: string;
  description: string;
};

export type FunctionScenarioSolution = {
  name: string;
  advantages: string[];
  limitations: string[];
};

export type FunctionScenarioTranslationScope = {
  category: string;
  items: string[];
  priority: string;
};

export type FunctionScenarioMistake = {
  category: string;
  wrongExample: string;
  correct: string;
  impact: string;
  severity: string;
};

export type FunctionScenarioRecommendation = {
  title: string;
  description: string;
  /** 可选内链；填了标题会渲染成链接 */
  href?: string;
};

export type FunctionScenarioFaq = {
  question: string;
  answer: string;
};

export type FunctionScenarioGuide = {
  slug: string;
  href: string;
  year: number;
  publishedAt: string;
  /** 内容最后一次实质改写的日期；用于 sitemap lastmod 与 schema 的 dateModified，未填则沿用 publishedAt */
  updatedAt?: string;
  status?: "draft" | "published";
  sourceLocale?: Locale;
  translationStatus?: "manual" | "ai-draft" | "reviewed";
  title: string;
  description: string;
  industry: string;
  audience: string;
  segmentLabel: string;
  guideLabel: string;
  mainValue: string;
  topic: string;
  keywords: string[];
  overviewDrivers: FunctionScenarioOverviewDriver[];
  solutions: FunctionScenarioSolution[];
  translationScope: FunctionScenarioTranslationScope[];
  checklist: string[];
  mistakes: FunctionScenarioMistake[];
  features: string[];
  recommendations: FunctionScenarioRecommendation[];
  faq: FunctionScenarioFaq[];
};

const functionScenarioGuidesByLocale = {
  en: importedGuides as FunctionScenarioGuide[],
  "zh-cn": importedGuidesZh as FunctionScenarioGuide[],
} as const;

const functionScenarioGuideContent = createLocalizedGuideContent(functionScenarioGuidesByLocale);

export const functionScenarioGuides = functionScenarioGuideContent.getItems("en");

export function getFunctionScenarioGuides(locale: Locale) {
  return functionScenarioGuideContent.getItems(locale);
}

export function getFunctionScenarioGuideMap(locale: Locale) {
  return functionScenarioGuideContent.getMap(locale);
}

export function getAvailableFunctionScenarioGuideLocales(slug: string) {
  return functionScenarioGuideContent.getAvailableLocales(slug);
}

export function getFunctionScenarioGuideTopics(locale: Locale) {
  return [...new Set(getFunctionScenarioGuides(locale).map((guide) => guide.topic))];
}
