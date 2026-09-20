import {NextResponse} from "next/server";

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
  getKeywordUseCases,
  getKeywordUseCaseCategories,
  getKeywordUseCaseCategorySlug,
} from "@/content/shopify-keyword-use-cases";
import type {Locale} from "@/lib/i18n";
import {toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {getPublishedProblems} from "@/lib/merchant-intelligence/content";
import {targetUrl} from "@/lib/merchant-intelligence/core.mjs";

const llmsConfig = {
  contact: {
    legal: "/legal/",
    privacy: "/privacy-policy/",
    terms: "/terms-and-conditions/",
    about: "/about/",
    contact: "/contact/",
    affiliates: "/affiliate/",
    waitlist: "/waitlist/",
  },
  content: {
    guides: "/guides/",
    guides_localization: "/guides/localization/",
    guides_function_scenarios: "/guides/function-scenarios/",
    resources: "/resources/",
    help_center: "/help-center/",
    blog: "/blog/",
    products: "/products/",
    use_cases: "/use-cases/",
    spark_playbook_keyword: "/products/spark-analytics-agent/playbook/keyword/",
    solutions: "/solutions/",
    compare: "/compare/",
    best_shopify_apps: "/best-shopify-apps/",
    product_research: "/resources/product-research/",
    prompts: "/guides/shopify-translation/prompts/",
  },
} as const;

function absolute(locale: Locale, href: string) {
  return toAbsoluteLocalizedUrl(locale, href);
}

function buildBody() {
  const locales: readonly Locale[] = ["en", "zh-cn"] as const;
  const today = new Date("2026-09-16").toISOString().slice(0, 10);
  const lines: string[] = [];

  lines.push("# llms.txt");
  lines.push(`# Generated at: ${today}`);
  lines.push("Scope: Main public site and documentation (no tooling, no paid-only pages)");
  lines.push("");
  lines.push("## Ciwi - Shopify localization, translation, and store-growth tools");
  lines.push("");
  lines.push("Official website  : https://ciwi.ai");
  lines.push("Robots file       : " + absolute("en", "/robots.txt"));
  lines.push("Sitemap file      : " + absolute("en", "/sitemap.xml"));
  lines.push("Crawl policy      : Public pages and discovery files are open to search and AI crawlers under robots.txt. API endpoints are excluded.");
  lines.push("This file is a content directory, not an access-control or indexing directive.");
  lines.push("");
  lines.push("## Primary contact");
  lines.push("");
  for (const [label, path] of Object.entries(llmsConfig.contact)) {
    lines.push(`${label.padEnd(12)}: ${absolute("en", path)}`);
  }
  lines.push("");
  lines.push("## Main content entrypoints (English)");
  lines.push("");
  for (const [label, path] of Object.entries(llmsConfig.content)) {
    lines.push(`${label.padEnd(20)}: ${absolute("en", path)}`);
  }
  lines.push("");
  lines.push("## Main content entrypoints (Simplified Chinese)");
  lines.push("");
  for (const [label, path] of Object.entries(llmsConfig.content)) {
    lines.push(`${label.padEnd(20)}: ${absolute("zh-cn", path)}`);
  }
  lines.push("");
  lines.push("## Guides & Workflows (localization + function-scenario)");
  lines.push("");
  for (const locale of locales) {
    const allGuides = [...getLocalizationGuides(locale), ...getFunctionScenarioGuides(locale)].sort((a, b) => a.slug.localeCompare(b.slug));
    lines.push(`### Locale: ${locale}  (total: ${allGuides.length})`);
    for (const guide of allGuides) {
      const tag = (guide.guideLabel ?? "Guide").replace(/\s+/g, "-").toLowerCase();
      const date = guide.publishedAt?.slice(0, 10) ?? today;
      lines.push(`[${tag}] ${date}  ${absolute(locale, guide.href)}  ${guide.title}`);
    }
    lines.push("");
  }
  const taskGuides = getPublishedProblems().sort((a, b) => a.id.localeCompare(b.id));
  if (taskGuides.length > 0) {
    lines.push("## Task guides (English)");
    lines.push("");
    for (const problem of taskGuides) {
      lines.push(`${absolute("en", targetUrl(problem))}  ${problem.page?.title ?? problem.canonicalProblem}`);
    }
    lines.push("");
  }
  lines.push("## Products & Playbooks");
  lines.push("");
  for (const locale of locales) {
    lines.push(`### Locale: ${locale}`);
    for (const product of getProducts(locale)) {
      const productUrl = absolute(locale, `/products/${product.slug}`);
      const playbookUrl = absolute(locale, getProductPlaybookHref(product.slug));
      lines.push(`product   : ${productUrl}`);
      lines.push(`playbook  : ${playbookUrl}   (${product.name})`);
    }
    lines.push("");
  }
  lines.push("## Help Center");
  lines.push("");
  for (const locale of locales) {
    lines.push(`### Locale: ${locale}  (total: ${getHelpCenterDocs(locale).length})`);
    for (const doc of getHelpCenterDocs(locale).sort((a, b) => a.href.localeCompare(b.href))) {
      const date = doc.publishedAt?.slice(0, 10) ?? today;
      lines.push(`${date}  ${absolute(locale, doc.href)}  ${doc.title}`);
    }
    lines.push("");
  }
  lines.push("## Blog");
  lines.push("");
  for (const locale of locales) {
    const posts = getBlogPosts(locale).sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
    lines.push(`### Locale: ${locale}  (total: ${posts.length})`);
    for (const post of posts) {
      const date = post.publishedAt?.slice(0, 10) ?? today;
      lines.push(`${date}  ${absolute(locale, post.href)}  ${post.title}`);
    }
    lines.push("");
  }
  lines.push("## Use Cases");
  lines.push("");
  for (const locale of locales) {
    lines.push(`### Locale: ${locale}  (total: ${getUseCases(locale).length})`);
    for (const item of getUseCases(locale).sort((a, b) => a.slug.localeCompare(b.slug))) {
      lines.push(`${absolute(locale, `/use-cases/${item.slug}`)}  [${item.category}] ${item.title}`);
    }
    lines.push("");
  }
  lines.push("## Spark Playbook Keyword Library");
  lines.push("");
  for (const locale of locales) {
    const sparkProduct = getProducts(locale).find((p) => p.slug === "spark-analytics-agent");
    const sparkName = sparkProduct ? sparkProduct.name : "Spark Analytics Agent";
    const kwItems = getKeywordUseCases(locale).sort((a, b) => a.slug.localeCompare(b.slug));
    const sparkPlaybookHref = getProductPlaybookHref("spark-analytics-agent");
    const kwIndexHref = `${sparkPlaybookHref}/keyword`;
    const categories = getKeywordUseCaseCategories(locale);
    lines.push(`### Locale: ${locale}  (product: ${sparkName})  (total: ${kwItems.length}) (categories: ${categories.length})  |  index: ${absolute(locale, kwIndexHref)}`);
    if (sparkProduct) {
      for (const cat of categories) {
        lines.push(`${absolute(locale, `${sparkPlaybookHref}/keyword/category/${getKeywordUseCaseCategorySlug(locale, cat.name)}`)}  [Category · ${cat.count}] (${sparkName}) ${cat.name}`);
      }
      for (const item of kwItems) {
        lines.push(`${absolute(locale, `${sparkPlaybookHref}/keyword/${item.slug}`)}  [${item.category}] (${sparkName}) ${item.keyword} :: ${item.title}`);
      }
    }
    lines.push("");
  }
  lines.push("## Solutions");
  lines.push("");
  for (const locale of locales) {
    lines.push(`### Locale: ${locale}  (total: ${getSolutions(locale).length})`);
    for (const s of getSolutions(locale).sort((a, b) => a.slug.localeCompare(b.slug))) {
      lines.push(`${absolute(locale, `/solutions/${s.slug}`)}  ${s.title}`);
    }
    lines.push("");
  }
  lines.push("## Compare pages");
  lines.push("");
  for (const locale of locales) {
    lines.push(`### Locale: ${locale}  (total: ${getCompares(locale).length})`);
    for (const c of getCompares(locale).sort((a, b) => a.slug.localeCompare(b.slug))) {
      lines.push(`${absolute(locale, `/compare/${c.slug}`)}  ${c.title}`);
    }
    lines.push("");
  }
  lines.push("## Best Shopify Apps collections");
  lines.push("");
  for (const locale of locales) {
    lines.push(`### Locale: ${locale}  (total: ${getBestShopifyAppCollections(locale).length})`);
    for (const c of getBestShopifyAppCollections(locale).sort((a, b) => a.href.localeCompare(b.href))) {
      lines.push(`${absolute(locale, c.href)}  ${c.title}`);
    }
    lines.push("");
  }
  lines.push("## Product Research (workflows + tool reviews)");
  lines.push("");
  for (const locale of locales) {
    lines.push(`### Locale: ${locale}`);
    const workflows = getProductResearchWorkflowArticles(locale).sort((a, b) => a.href.localeCompare(b.href));
    lines.push(`- Workflows (${workflows.length}):`);
    for (const w of workflows) {
      const date = w.publishedAt?.slice(0, 10) ?? today;
      lines.push(`  ${date}  ${absolute(locale, w.href)}  ${w.title}`);
    }
    const reviews = getToolReviews(locale).sort((a, b) => a.href.localeCompare(b.href));
    lines.push(`- Reviews (${reviews.length}):`);
    for (const r of reviews) {
      const date = r.publishedAt?.slice(0, 10) ?? today;
      lines.push(`  ${date}  ${absolute(locale, r.href)}  ${r.title}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

export const dynamic = "force-static";

export function GET() {
  return new NextResponse(buildBody(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
