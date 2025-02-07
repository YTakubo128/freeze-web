import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects(){
    return[
      {
        source: "/",
        destination: "/start",
        permanent: true,
      },
    ];
  },

  reactStrictMode: true,  
};

export default nextConfig;
