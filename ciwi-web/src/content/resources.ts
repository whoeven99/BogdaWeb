import type {Locale} from "@/lib/i18n";
import {getBestShopifyAppCollections} from "@/content/best-shopify-apps";
import {getBlogPosts} from "@/content/blog";
import {getCompares} from "@/content/compare";
import {getFunctionScenarioGuides} from "@/content/function-scenario-guides";
import {getFeaturedHelpCenterDocs, getHelpCenterDocs} from "@/content/help-center";
import {getLocalizationGuides} from "@/content/localization-guides";
import {getProductResearchWorkflowArticles} from "@/content/product-research";

export type ResourceItem = {
  title: string;
  description: string;
  href: string;
  meta: string[];
};

export function getBlogResources(locale: Locale): ResourceItem[] {
  return getBlogPosts(locale).map((post) => ({
    title: post.title,
    description: post.description,
    href: post.href,
    meta: [locale === "zh-cn" ? "博客" : "Blog", post.publishedAt],
  }));
}

export function getHelpCenterResources(locale: Locale): ResourceItem[] {
  return getHelpCenterDocs(locale);
}

export function getFeaturedHelpCenterResources(locale: Locale): ResourceItem[] {
  return getFeaturedHelpCenterDocs(locale);
}

export function getCompareResources(locale: Locale): ResourceItem[] {
  return getCompares(locale).map((item) => ({
    title: item.title,
    description: item.description,
    href: `/compare/${item.slug}`,
    meta: [locale === "zh-cn" ? "对比" : "Compare", locale === "zh-cn" ? "选型" : "Selection"],
  }));
}

export function getBestShopifyAppsResources(locale: Locale): ResourceItem[] {
  return getBestShopifyAppCollections(locale).map((item) => ({
    title: item.title,
    description: item.description,
    href: item.href,
    meta: [locale === "zh-cn" ? "合集" : "Collection", item.categoryLabel, String(item.year)],
  }));
}

export function getLocalizationGuideCategoryResources(locale: Locale): ResourceItem[] {
  return getLocalizationGuides(locale).map((item) => ({
    title: item.title,
    description: item.description,
    href: item.href,
    meta: [locale === "zh-cn" ? "指南" : "Guide", item.segmentLabel, String(item.year)],
  }));
}

export function getFunctionScenarioGuideResources(locale: Locale): ResourceItem[] {
  return getFunctionScenarioGuides(locale).map((item) => ({
    title: item.title,
    description: item.description,
    href: item.href,
    meta: [locale === "zh-cn" ? "指南" : "Guide", item.segmentLabel, String(item.year)],
  }));
}

export function getLocalizationGuideResources(locale: Locale): ResourceItem[] {
  return [...getLocalizationGuideCategoryResources(locale), ...getFunctionScenarioGuideResources(locale)].map((item) => ({
    title: item.title,
    description: item.description,
    href: item.href,
    meta: item.meta,
  }));
}

export function getProductResearchResources(locale: Locale): ResourceItem[] {
  return getProductResearchWorkflowArticles(locale).map((article) => ({
    title: article.title,
    description: article.description,
    href: article.href,
    meta: [locale === "zh-cn" ? "选品" : "Product Research", article.stageLabel, String(article.year)],
  }));
}
