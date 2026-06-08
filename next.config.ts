import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    API_BASE: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
