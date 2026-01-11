import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ['react-map-gl', 'mapbox-gl'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
