import type { NextConfig } from "next";
import {compareSlugRedirectMap} from "./src/content/compare-slugs";

const compareRedirects = Object.entries(compareSlugRedirectMap).flatMap(([legacyCompareSlug, canonicalSlug]) => [
  {
    source: `/compare/${legacyCompareSlug}`,
    destination: `/compare/${canonicalSlug}`,
    permanent: true,
  },
  {
    source: `/${legacyCompareSlug}`,
    destination: `/compare/${canonicalSlug}`,
    permanent: true,
  },
  {
    source: `/${legacyCompareSlug.replace(/^ciwi-/, "")}`,
    destination: `/compare/${canonicalSlug}`,
    permanent: true,
  },
]);

const legacyMarketingRedirectTargets = {
  "product-title-generation": "/products/content-ai#features",
  "product-description-generation": "/products/content-ai#features",
  "product-image-generation": "/products/content-ai#features",
  "product-seo-information-generation": "/products/content-ai#features",
  "collection-description-generation": "/products/content-ai#features",
  "product-faq-generation": "/products/content-ai#features",
  "image-alt-text-generation": "/products/content-ai#features",
  deepl: "/products/translator",
} as const;

const legacyMarketingRedirects = Object.entries(legacyMarketingRedirectTargets).flatMap(([sourceSlug, destination]) => [
  {
    source: `/${sourceSlug}`,
    destination,
    permanent: true,
  },
  {
    source: `/${sourceSlug}/`,
    destination,
    permanent: true,
  },
]);

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  async redirects() {
    return [
      ...compareRedirects,
      ...legacyMarketingRedirects,
      {
        source: "/ghost/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog",
        permanent: true,
      },
      {
        source: "/tag/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog",
        permanent: true,
      },
      {
        source: "/author/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog",
        permanent: true,
      },
      {
        source: "/page/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog",
        permanent: true,
      },
      {
        source: "/rss",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog",
        permanent: true,
      },
      {
        source: "/rss/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog",
        permanent: true,
      },
      {
        source: "/zh-cn",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/zh-cn/blog",
        permanent: true,
      },
      {
        source: "/zh-cn/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/zh-cn/blog/:path*",
        permanent: true,
      },
      {
        source: "/",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
