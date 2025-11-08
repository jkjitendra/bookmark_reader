import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // allows any HTTPS image
    ],
  },
};

export default nextConfig;

