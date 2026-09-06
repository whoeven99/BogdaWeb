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
  dateModified?: string;
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

export function buildBlogPostingSchema({url, headline, description, datePublished, dateModified, keywords = []}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    datePublished,
    dateModified,
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

export function buildTechArticleSchema({url, headline, description, datePublished, dateModified, keywords = []}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    datePublished,
    dateModified,
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

type ProductSchemaInput = {
  url: string;
  name: string;
  description: string;
  rating?: number;
  reviewCount?: number;
  bestRating?: number;
  reviews?: {reviewBody: string; ratingValue: number}[];
};

export function buildProductSchema({
  url,
  name,
  description,
  rating,
  reviewCount,
  bestRating = 5,
  reviews = [],
}: ProductSchemaInput) {
  const aggregateRating =
    typeof rating === "number" && typeof reviewCount === "number"
      ? {
          "@type": "AggregateRating",
          ratingValue: rating,
          reviewCount,
          bestRating,
        }
      : undefined;

  const reviewItems = reviews.map((item) => ({
    "@type": "Review",
    author: {
      "@type": "Organization",
      name: siteName,
    },
    reviewBody: item.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: item.ratingValue,
      bestRating,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    ...(aggregateRating ? {aggregateRating} : {}),
    ...(reviewItems.length ? {review: reviewItems} : {}),
  };
}

type ReviewSchemaInput = {
  url: string;
  itemName: string;
  reviewBody?: string;
  ratingValue: number;
  bestRating: number;
  datePublished?: string;
};

export function buildReviewSchema({
  url,
  itemName,
  reviewBody,
  ratingValue,
  bestRating,
  datePublished,
}: ReviewSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: itemName,
    },
    author: {
      "@type": "Organization",
      name: siteName,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue,
      bestRating,
    },
    ...(reviewBody ? {reviewBody} : {}),
    ...(datePublished ? {datePublished} : {}),
    url,
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
