import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // 开启静态导出
  images: {
    unoptimized: true, // 关闭图片优化
  },
  async rewrites() {
    return [
      {
        source: "/help-center/:path*",
        destination: "/help-center/index.html",
      },
      {
        source: '/blog',
        destination: '/blog/index.html', // 静态博客主页
      },
    ];
  },
};

export default nextConfig;
