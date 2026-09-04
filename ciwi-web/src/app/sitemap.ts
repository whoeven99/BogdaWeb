import type {MetadataRoute} from "next";

import {getBestShopifyAppCollections} from "@/content/best-shopify-apps";
import {getBlogPosts} from "@/content/blog";
import {getCompares} from "@/content/compare";
import {getFunctionScenarioGuides} from "@/content/function-scenario-guides";
import {getHelpCenterDocs} from "@/content/help-center";
import {getLocalizationGuides} from "@/content/localization-guides";
import {getProductResearchWorkflowArticles} from "@/content/product-research";
import {getProducts} from "@/content/products";
import {getSolutions} from "@/content/solutions";
import {getToolReviews} from "@/content/tool-reviews";
import {localizeHref, type Locale} from "@/lib/i18n";
import {siteUrl} from "@/lib/seo/metadata";

const staticRoutes = [
  "/",
  "/about",
  "/best-shopify-apps",
  "/blog",
  "/compare",
  "/contact",
  "/demo",
  "/guides",
  "/help-center",
  "/privacy-policy",
  "/resources/product-research",
  "/resources/product-research/reviews",
  "/products",
  "/resources",
  "/solutions",
  "/terms-and-conditions",
  "/waitlist",
] as const;

function toAbsoluteUrl(locale: Locale, path: string) {
  return new URL(localizeHref(locale, path), siteUrl).toString();
}

function buildEntry(path: string, locale: Locale, lastModified?: string): MetadataRoute.Sitemap[number] {
  return {
    url: toAbsoluteUrl(locale, path),
    lastModified,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();

  const addEntry = (path: string, locale: Locale, lastModified?: string) => {
    const entry = buildEntry(path, locale, lastModified);
    entries.set(entry.url, entry);
  };

  for (const locale of ["en", "zh-cn"] as const) {
    for (const route of staticRoutes) {
      addEntry(route, locale);
    }

    for (const product of getProducts(locale)) {
      addEntry(`/products/${product.slug}`, locale);
    }

    for (const solution of getSolutions(locale)) {
      addEntry(`/solutions/${solution.slug}`, locale);
    }

    for (const compare of getCompares(locale)) {
      addEntry(`/compare/${compare.slug}`, locale);
    }

    for (const collection of getBestShopifyAppCollections(locale)) {
      addEntry(collection.href, locale);
    }

    for (const blogPost of getBlogPosts(locale)) {
      addEntry(blogPost.href, locale, blogPost.publishedAt);
    }

    for (const helpCenterDoc of getHelpCenterDocs(locale)) {
      addEntry(helpCenterDoc.href, locale, helpCenterDoc.publishedAt);
    }

    for (const guide of getLocalizationGuides(locale)) {
      addEntry(guide.href, locale);
    }

    for (const guide of getFunctionScenarioGuides(locale)) {
      addEntry(guide.href, locale);
    }

    for (const article of getProductResearchWorkflowArticles(locale)) {
      addEntry(article.href, locale);
    }

    for (const review of getToolReviews(locale)) {
      addEntry(review.href, locale);
    }
  }

  return [...entries.values()];
}
