import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images and videos
  images: {
    unoptimized: true
  },
  
  // Ensure proper trailing slash handling
  trailingSlash: false,
  
  // Handle video files in webpack
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });
    return config;
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;
