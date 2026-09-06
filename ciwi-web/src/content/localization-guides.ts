import type {Locale} from "@/lib/i18n";
import {createLocalizedGuideContent} from "@/content/guide-content";
import importedGuides from "@/content/data/localization_guides.json";
import importedGuidesZh from "@/content/data/localization_guides.zh-cn.json";

export type GuideOverviewDriver = {
  title: string;
  description: string;
};

export type GuideBenefit = {
  title: string;
  description: string;
  evidence: string;
};

export type GuideMistake = {
  category: string;
  wrongExample: string;
  correct: string;
  impact: string;
  severity: string;
};

export type GuideImpact = {
  metric: string;
  description: string;
  source: string;
};

export type GuideLanguage = {
  market: string;
  language: string;
  priority: string;
  reason: string;
};

export type GuideMarketHabit = {
  market: string;
  language: string;
  habit: string;
  localizationFocus: string;
};

export type GuideTranslationScope = {
  category: string;
  items: string[];
  priority: string;
};

export type GuideExpansionStep = {
  stage: string;
  market: string;
  language: string;
  reason: string;
};

export type GuideBestPractice = {
  title: string;
  description: string;
};

export type GuideStyleRule = {
  title: string;
  description: string;
};

export type GuideSolution = {
  name: string;
  advantages: string[];
  limitations: string[];
};

export type GuideRecommendation = {
  title: string;
  description: string;
};

export type GuideTerminology = {
  term: string;
  meaning: string;
  localized: string;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type LocalizationGuide = {
  slug: string;
  href: string;
  year: number;
  publishedAt: string;
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
  keywords: string[];
  overviewDrivers: GuideOverviewDriver[];
  benefits: GuideBenefit[];
  mistakes: GuideMistake[];
  impacts: GuideImpact[];
  languages: GuideLanguage[];
  marketHabits: GuideMarketHabit[];
  translationScope: GuideTranslationScope[];
  expansionPlan: GuideExpansionStep[];
  bestPractices: GuideBestPractice[];
  styleRules: GuideStyleRule[];
  solutions: GuideSolution[];
  features: string[];
  recommendations: GuideRecommendation[];
  terminology: GuideTerminology[];
  checklist: string[];
  faq: GuideFaq[];
};

const localizationGuidesByLocale = {
  en: importedGuides as LocalizationGuide[],
  "zh-cn": importedGuidesZh as LocalizationGuide[],
} as const;

const localizationGuideContent = createLocalizedGuideContent(localizationGuidesByLocale);

export function getLocalizationGuides(locale: Locale) {
  return localizationGuideContent.getItems(locale);
}

export function getLocalizationGuideMap(locale: Locale) {
  return localizationGuideContent.getMap(locale);
}

export function getAvailableLocalizationGuideLocales(slug: string) {
  return localizationGuideContent.getAvailableLocales(slug);
}
