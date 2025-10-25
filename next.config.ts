import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: [] },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    qualities: [60, 75, 85],
  },
  // Transpile deps that still ship optional chaining to avoid crashes on old Safari/iOS
  transpilePackages: ["framer-motion", "lucide-react"],
};

export default nextConfig;
