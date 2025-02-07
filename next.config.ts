import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // ルートページを/startにリダイレクトする
  async redirects(){
    return[
      {
        source: "/",
        destination: "/start",
        permanent: true,
      },
    ];
  },

  // React Strict Modeを有効にする
  reactStrictMode: true,  
};

export default nextConfig;
