import {siteName, siteUrl} from "@/lib/seo/metadata";
import type {FaqEntry} from "@/lib/content/sections";

type BreadcrumbItem = {
  name: string;
  item: string;
};

type ArticleSchemaInput = {
  url: string;
  headline: string;
  description: string;
  datePublished?: string;
  keywords?: string[];
};

type WebPageSchemaInput = {
  url: string;
  name: string;
  description: string;
  keywords?: string[];
  type?: "WebPage" | "CollectionPage";
};

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function buildBlogPostingSchema({url, headline, description, datePublished, keywords = []}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    datePublished,
    mainEntityOfPage: url,
    url,
    keywords,
    author: {
      "@type": "Organization",
      name: siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function buildTechArticleSchema({url, headline, description, keywords = []}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    mainEntityOfPage: url,
    url,
    keywords,
    author: {
      "@type": "Organization",
      name: siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function buildFaqSchema(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function buildWebPageSchema({
  url,
  name,
  description,
  keywords = [],
  type = "WebPage",
}: WebPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url,
    keywords,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
}
