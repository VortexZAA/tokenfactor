/** @type {import('next').NextConfig} */
import { env } from "process";
const nextConfig = {
    compiler: {
        removeConsole: env.NODE_ENV === "production" ? true : false,
      },
      compress: true,
      trailingSlash: true,
      experimental: {
        forceSwcTransforms: true,
      },
      swcMinify: true,
};

export default nextConfig;
