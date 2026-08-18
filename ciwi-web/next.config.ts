import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  async redirects() {
    return [
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
      {
        source: "/product-title-generation",
        destination: "/products/content-ai#features",
        permanent: true,
      },
      {
        source: "/product-description-generation",
        destination: "/products/content-ai#features",
        permanent: true,
      },
      {
        source: "/product-image-generation",
        destination: "/products/content-ai#features",
        permanent: true,
      },
      {
        source: "/product-seo-information-generation",
        destination: "/products/content-ai#features",
        permanent: true,
      },
      {
        source: "/collection-description-generation",
        destination: "/products/content-ai#features",
        permanent: true,
      },
      {
        source: "/product-faq-generation",
        destination: "/products/content-ai#features",
        permanent: true,
      },
      {
        source: "/image-alt-text-generation",
        destination: "/products/content-ai#features",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
