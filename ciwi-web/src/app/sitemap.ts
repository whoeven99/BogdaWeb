import {getPublishedProblems} from "@/lib/merchant-intelligence/content";
import {targetUrl} from "@/lib/merchant-intelligence/core.mjs";
import type {MetadataRoute} from "next";

import {authors} from "@/content/authors";
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
import {getProductPlaybookHref, getUseCases} from "@/content/use-cases";
import {
  getKeywordUseCaseCategories,
  getKeywordUseCaseCategorySlug,
  getKeywordUseCases,
} from "@/content/shopify-keyword-use-cases";
import type {Locale} from "@/lib/i18n";
import {toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";

const CATEGORIES_PER_PAGE = 25;

/**
 * Spark playbook 关键词库的最后一次实质更新（数据文件 2026-10-28，模板 2026-10-10）。
 * 这 1300 多个 URL 之前完全没有 lastmod，Google 没有重新排抓取的依据，
 * 整批只进 “Discovered - currently not indexed” 队列。日期取的是内容真实改动日，不是构建日。
 */
const KEYWORD_LIBRARY_UPDATED_AT = "2026-10-28";

const staticRoutes = [
  "/",
  "/about",
  "/best-shopify-apps",
  "/blog",
  "/compare",
  "/contact",
  "/demo",
  "/guides",
  "/guides/function-scenarios",
  "/guides/localization",
  "/guides/shopify-translation",
  "/guides/shopify-translation/prompts",
  "/help-center",
  "/privacy-policy",
  "/resources/product-research",
  "/resources/product-research/reviews",
  "/products",
  "/resources",
  "/solutions",
  "/terms-and-conditions",
  "/use-cases",
  "/waitlist",
] as const;

function toAbsoluteUrl(locale: Locale, path: string) {
  return toAbsoluteLocalizedUrl(locale, path);
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
      // Chinese legal pages intentionally use noindex.
      if (locale === "zh-cn" && (route === "/privacy-policy" || route === "/terms-and-conditions")) {
        continue;
      }
      addEntry(route, locale);
    }

    for (const author of authors) {
      addEntry(`/authors/${author.id}`, locale);
    }

    for (const product of getProducts(locale)) {
      addEntry(`/products/${product.slug}`, locale);
      addEntry(getProductPlaybookHref(product.slug), locale);

      if (product.slug === "spark-analytics-agent") {
        const keywordRoot = `${getProductPlaybookHref(product.slug)}/keyword`;
        addEntry(keywordRoot, locale, KEYWORD_LIBRARY_UPDATED_AT);

        const totalCats = getKeywordUseCaseCategories(locale).length;
        const totalPages = Math.max(1, Math.ceil(totalCats / CATEGORIES_PER_PAGE));
        for (let p = 2; p <= totalPages; p++) {
          addEntry(`${keywordRoot}/page/${p}`, locale, KEYWORD_LIBRARY_UPDATED_AT);
        }

        for (const category of getKeywordUseCaseCategories(locale)) {
          const catSlug = getKeywordUseCaseCategorySlug(locale, category.name);
          addEntry(`${keywordRoot}/category/${catSlug}`, locale, KEYWORD_LIBRARY_UPDATED_AT);
        }

        for (const keywordUseCase of getKeywordUseCases(locale)) {
          addEntry(`${keywordRoot}/${keywordUseCase.slug}`, locale, KEYWORD_LIBRARY_UPDATED_AT);
        }
      }
    }

    for (const useCase of getUseCases(locale)) {
      addEntry(`/use-cases/${useCase.slug}`, locale);
    }

    for (const solution of getSolutions(locale)) {
      addEntry(`/solutions/${solution.slug}`, locale);
    }

    for (const compare of getCompares(locale)) {
      addEntry(`/compare/${compare.slug}`, locale, compare.updatedAt);
    }

    for (const collection of getBestShopifyAppCollections(locale)) {
      addEntry(collection.href, locale, collection.updatedAt);
    }

    for (const blogPost of getBlogPosts(locale)) {
      addEntry(blogPost.href, locale, blogPost.publishedAt);
    }

    for (const helpCenterDoc of getHelpCenterDocs(locale)) {
      addEntry(helpCenterDoc.href, locale, helpCenterDoc.publishedAt);
    }

    for (const guide of getLocalizationGuides(locale)) {
      addEntry(guide.href, locale, guide.publishedAt);
    }

    for (const guide of getFunctionScenarioGuides(locale)) {
      addEntry(guide.href, locale, guide.updatedAt ?? guide.publishedAt);
    }

    for (const article of getProductResearchWorkflowArticles(locale)) {
      addEntry(article.href, locale, article.publishedAt);
    }

    for (const review of getToolReviews(locale)) {
      addEntry(review.href, locale, review.publishedAt);
    }
  }

  const merchantProblems = getPublishedProblems();
  for (const problem of merchantProblems) {
    addEntry(targetUrl(problem), "en", problem.page?.reviewedAt ?? undefined);
  }

  return [...entries.values()];
}
