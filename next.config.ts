import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // URIを開いたらpages/index.tsxを表示する
  // React Strict Modeを有効にする
  reactStrictMode: true,  
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
