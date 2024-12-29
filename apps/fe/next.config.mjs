import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storydict.s3.ap-northeast-2.amazonaws.com"],
  },
  webpack: (config) => {
    config.resolve.alias["#"] = path.resolve(__dirname, "../../packages/ui");
    return config;
  },

  // [docker로 빌드 시 최적화를 위함](https://github.com/vercel/turborepo/blob/main/examples/with-docker/apps/web/next.config.js)
  transpilePackages: ["@sd/fe"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};

export default nextConfig;
