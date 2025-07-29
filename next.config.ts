import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // 开启静态导出
  images: {
    unoptimized: true, // 关闭图片优化
  },
};

export default nextConfig;
