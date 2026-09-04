import type {Locale} from "@/lib/i18n";
import importedReviews from "@/content/data/tool_reviews.json";
import importedReviewsZh from "@/content/data/tool_reviews.zh-cn.json";
import {createLocalizedGuideContent} from "@/content/guide-content";

export type ToolReviewScore = {
  label: string;
  score: number;
};

export type ToolReviewFeature = {
  title: string;
  description: string;
};

export type ToolReviewAlternative = {
  name: string;
  href: string;
};

export type ToolReviewFaq = {
  question: string;
  answer: string;
};

export type ToolReview = {
  slug: string;
  href: string;
  year: number;
  status?: "draft" | "published";
  sourceLocale?: Locale;
  translationStatus?: "manual" | "ai-draft" | "reviewed";
  toolName: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  verdict: string;
  rating: number;
  scoreBreakdown: ToolReviewScore[];
  pros: string[];
  cons: string[];
  pricing: string;
  bestFor: string[];
  features: ToolReviewFeature[];
  alternatives: ToolReviewAlternative[];
  faq: ToolReviewFaq[];
};

const toolReviewsByLocale = {
  en: importedReviews as ToolReview[],
  "zh-cn": importedReviewsZh as ToolReview[],
} as const;

const toolReviewContent = createLocalizedGuideContent(toolReviewsByLocale);

export function getToolReviews(locale: Locale) {
  return toolReviewContent.getItems(locale);
}

export function getToolReviewMap(locale: Locale) {
  return toolReviewContent.getMap(locale);
}

export function getAvailableToolReviewLocales(slug: string) {
  return toolReviewContent.getAvailableLocales(slug);
}

export function getToolReviewHrefMap(locale: Locale) {
  return new Map(getToolReviews(locale).map((review) => [review.toolName, review.href]));
}
