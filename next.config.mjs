import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  reactStrictMode: false,

  // Prevent server processing of these packages
  // serverExternalPackages: ['@imgly/background-removal', 'onnxruntime-web'],

  // webpack(config, { isServer }) {
  //   if (!isServer) {
  //     // Force client to use the browser bundle
  //     config.resolve.alias['onnxruntime-web$'] = path.join(__dirname, 'node_modules/onnxruntime-web/dist/ort.bundle.min.mjs');
  //     config.resolve.alias['onnxruntime-web/dist/ort.node.min.mjs'] = false; // Explicitly ignore node bundle
  //   }

  //   // ONLY the problematic ORT bundles that Terser chokes on.
  //   // Do NOT apply to all .mjs in onnxruntime-web, or you can break runtime URL handling.
  //   config.module.rules.push({
  //     test: /(ort\.node\.min|ort\.webgpu\.bundle\.min)\.mjs$/,
  //     type: "javascript/auto",
  //   });

  //   return config;
  // },
};

export default nextConfig;
