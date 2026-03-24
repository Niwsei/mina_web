import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Optimize package imports to reduce bundle size
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Smaller sizes for faster loading
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year cache
  },
  
  // Transpile deps that still ship optional chaining to avoid crashes on old Safari/iOS
  transpilePackages: ["framer-motion", "lucide-react"],
  
  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Compression
  compress: true,
  
  // Power static generation
  output: "standalone",
};

export default nextConfig;
