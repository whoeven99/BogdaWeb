import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const legacyMarketingRedirectTargets = {
  "product-title-generation": "/products/spark-analytics-agent/#features",
  "product-description-generation": "/products/spark-analytics-agent/#features",
  "product-image-generation": "/products/spark-analytics-agent/#features",
  "product-seo-information-generation": "/products/spark-analytics-agent/#features",
  "collection-description-generation": "/products/spark-analytics-agent/#features",
  "product-faq-generation": "/products/spark-analytics-agent/#features",
  "image-alt-text-generation": "/products/spark-analytics-agent/#features",
  "store-theme-translation": "/products/translator/#features",
  "product-content-translation": "/products/translator/#features",
  "ip-based-automatic-switching": "/products/translator/#features",
  "currency-exchange-rate-inquiry": "/guides/how-to-localize-currency-pricing-on-shopify/",
  deepl: "/products/translator/",
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
  serverExternalPackages: ["@libsql/client", "@prisma/adapter-libsql"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      ...legacyMarketingRedirects,
      {
        source: "/products/content-ai/",
        destination: "/products/spark-analytics-agent/",
        permanent: true,
      },
      {
        source: "/zh-cn/products/content-ai/",
        destination: "/zh-cn/products/spark-analytics-agent/",
        permanent: true,
      },
      {
        source: "/products/bundle-discount/",
        destination: "/help-center/ShopifyApp/bundle-discount-app-overview/",
        permanent: true,
      },
      {
        source: "/zh-cn/products/bundle-discount/",
        destination: "/zh-cn/help-center/ShopifyApp/bundle-discount-app-overview/",
        permanent: true,
      },
      {
        source: "/ghost/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog/",
        permanent: true,
      },
      {
        source: "/tag/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog/",
        permanent: true,
      },
      {
        source: "/author/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog/",
        permanent: true,
      },
      {
        source: "/page/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog/",
        permanent: true,
      },
      {
        source: "/rss",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog/",
        permanent: true,
      },
      {
        source: "/rss/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog/",
        permanent: true,
      },
      {
        source: "/zh-cn",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/zh-cn/blog/",
        permanent: true,
      },
      {
        source: "/zh-cn/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/zh-cn/blog/:path*/",
        permanent: true,
      },
      {
        source: "/",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{type: "host", value: "blog.ciwi.ai"}],
        destination: "https://ciwi.ai/blog/:path*/",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
