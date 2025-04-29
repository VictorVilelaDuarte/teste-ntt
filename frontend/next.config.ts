import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn-images.dzcdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
