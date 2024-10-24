import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["story-dict.s3.ap-northeast-2.amazonaws.com"],
  },
  webpack: (config) => {
    config.resolve.alias["#"] = path.resolve(__dirname, "../../packages/ui");
    return config;
  },
};

export default nextConfig;
