import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

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
  // 页面级的旧链接跳转全部在 `src/lib/seo/legacy-redirects.ts` 里，由 middleware
  // 统一发一次 308。这里只留 host 级规则：`redirects()` 在 middleware 之前执行，
  // 一旦把页面路径写在这里，middleware 就看不到请求，`__ciwi_locale` 和 UTM 只能
  // 靠下一跳处理，每条旧链接都要多走一次 308。
  async redirects() {
    return [
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
