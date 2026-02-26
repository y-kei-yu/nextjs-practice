import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-ap-northeast-1.amazonaws.com",
        pathname: "/qiita-image-store/**",
      },
    ],
  },
};

export default nextConfig;
