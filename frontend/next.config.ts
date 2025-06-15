import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  // クロスオリジンリクエストを許可
  allowedDevOrigins: ['192.168.0.5', 'localhost', '127.0.0.1'],
  // 開発時のホスト設定
  devIndicators: {
    buildActivity: true,
  },
};

export default nextConfig;
