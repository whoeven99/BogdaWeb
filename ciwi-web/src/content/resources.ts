import type {Locale} from "@/lib/i18n";
import {getBestShopifyAppCollections} from "@/content/best-shopify-apps";
import {getBlogPosts} from "@/content/blog";
import {getCompares} from "@/content/compare";
import {getFeaturedHelpCenterDocs, getHelpCenterDocs} from "@/content/help-center";

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
