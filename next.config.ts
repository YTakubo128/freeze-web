import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? '/freeze-web/' : '',
  basePath: isProd ? '/freeze-web' : '',
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  output: "export",
};

export default nextConfig;
