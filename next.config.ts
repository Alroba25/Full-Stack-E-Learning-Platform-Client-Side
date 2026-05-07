import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Allow ALL external https image sources.
        // This prevents having to add new domains every time a new image host is used.
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
