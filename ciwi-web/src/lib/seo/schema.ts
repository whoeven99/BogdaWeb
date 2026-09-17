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
  author?: {name: string; jobTitle?: string; url?: string};
};

type WebPageSchemaInput = {
  url: string;
  name: string;
  description: string;
  keywords?: string[];
  type?: "WebPage" | "CollectionPage";
};

export function buildGraphSchema(schemas: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map((schema) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {["@context"]: __context, ...rest} = schema as Record<string, unknown>;
      return rest;
    }),
  };
}

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

export function buildBlogPostingSchema({url, headline, description, datePublished, dateModified, keywords = [], author}: ArticleSchemaInput) {
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
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          ...(author.jobTitle ? {jobTitle: author.jobTitle} : {}),
          ...(author.url ? {url: author.url} : {}),
        }
      : {"@type": "Organization", name: siteName},
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function buildTechArticleSchema({url, headline, description, datePublished, dateModified, keywords = [], author}: ArticleSchemaInput) {
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
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          ...(author.jobTitle ? {jobTitle: author.jobTitle} : {}),
          ...(author.url ? {url: author.url} : {}),
        }
      : {"@type": "Organization", name: siteName},
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
  image?: string;
  sku?: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  bestRating?: number;
  reviews?: {reviewBody: string; ratingValue: number}[];
  offers?: {
    price: string;
    priceCurrency: string;
    availability?: string;
    url?: string;
  };
};

export function buildProductSchema({
  url,
  name,
  description,
  image,
  sku,
  brand = siteName,
  rating,
  reviewCount,
  bestRating = 5,
  reviews = [],
  offers,
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

  const defaultOffer =
    !aggregateRating && reviewItems.length === 0
      ? {
          "@type": "Offer",
          url: offers?.url ?? url,
          price: offers?.price ?? "0",
          priceCurrency: offers?.priceCurrency ?? "USD",
          availability: offers?.availability ?? "https://schema.org/InStock",
        }
      : offers
        ? {
            "@type": "Offer",
            url: offers.url ?? url,
            price: offers.price,
            priceCurrency: offers.priceCurrency,
            availability: offers.availability ?? "https://schema.org/InStock",
          }
        : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    ...(image ? {image} : {}),
    ...(sku ? {sku} : {}),
    brand: {
      "@type": "Brand",
      name: brand,
    },
    ...(aggregateRating ? {aggregateRating} : {}),
    ...(reviewItems.length ? {review: reviewItems} : {}),
    ...(defaultOffer ? {offers: defaultOffer} : {}),
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

type HowToSchemaInput = {
  url: string;
  name: string;
  description?: string;
  steps: {name: string; text: string; url?: string}[];
};

export function buildHowToSchema({url, name, description, steps}: HowToSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    ...(description ? {description} : undefined),
    ...(url ? {mainEntityOfPage: url} : undefined),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url ? {url: step.url} : undefined),
    })),
  };
}

type ItemListSchemaInput = {
  url: string;
  name: string;
  description?: string;
  items: {position: number; name: string; url: string; description?: string}[];
};

export function buildItemListSchema({url, name, description, items}: ItemListSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    ...(description ? {description} : undefined),
    mainEntityOfPage: url,
    numberOfItems: items.length,
    itemListElement: items.map((it) => ({
      "@type": "ListItem",
      position: it.position,
      name: it.name,
      item: it.url,
      ...(it.description ? {description: it.description} : undefined),
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
    keywords: keywords.length ? keywords.join(", ") : undefined,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
}
