import type {Locale} from "@/lib/i18n";
import importedArticles from "@/content/data/product_research.json";
import importedArticlesZh from "@/content/data/product_research.zh-cn.json";
import {createLocalizedGuideContent} from "@/content/guide-content";

export type ProductResearchTool = {
  name: string;
  pricing: string;
  bestFor: string;
  strengths: string[];
  watchouts: string[];
};

export type ProductResearchStep = {
  title: string;
  description: string;
};

export type ProductResearchMistake = {
  category: string;
  wrongExample: string;
  correct: string;
  impact: string;
  severity: string;
};

export type ProductResearchRecommendation = {
  title: string;
  description: string;
};

export type ProductResearchFaq = {
  question: string;
  answer: string;
};

export type ProductResearchArticle = {
  slug: string;
  href: string;
  year: number;
  status?: "draft" | "published";
  sourceLocale?: Locale;
  translationStatus?: "manual" | "ai-draft" | "reviewed";
  title: string;
  description: string;
  stage: string;
  stageLabel: string;
  audience: string;
  mainValue: string;
  keywords: string[];
  overviewDrivers: ProductResearchStep[];
  tools: ProductResearchTool[];
  methods: ProductResearchStep[];
  mistakes: ProductResearchMistake[];
  checklist: string[];
  recommendations: ProductResearchRecommendation[];
  faq: ProductResearchFaq[];
};

const productResearchByLocale = {
  en: importedArticles as ProductResearchArticle[],
  "zh-cn": importedArticlesZh as ProductResearchArticle[],
} as const;

const productResearchContent = createLocalizedGuideContent(productResearchByLocale);

export function getProductResearchArticles(locale: Locale) {
  return productResearchContent.getItems(locale);
}

export function getProductResearchArticleMap(locale: Locale) {
  return productResearchContent.getMap(locale);
}

export function getAvailableProductResearchLocales(slug: string) {
  return productResearchContent.getAvailableLocales(slug);
}

export function getProductResearchStages(locale: Locale) {
  return [...new Set(getProductResearchArticles(locale).map((article) => article.stage))];
}

export function getProductResearchHub(locale: Locale) {
  return getProductResearchArticles(locale).find((article) => article.stage === "overview");
}

export function getProductResearchWorkflowArticles(locale: Locale) {
  return getProductResearchArticles(locale).filter((article) => article.stage !== "overview");
}
