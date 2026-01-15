/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  reactStrictMode: false,

  // webpack(config) {
  //   // ONLY the problematic ORT bundles that Terser chokes on.
  //   // Do NOT apply to all .mjs in onnxruntime-web, or you can break runtime URL handling.
  //   config.module.rules.push({
  //     test: /(ort\.node\.min|ort\.webgpu\.bundle\.min)\.mjs$/,
  //     include: /node_modules[\\/](onnxruntime-web)[\\/]/,
  //     type: "javascript/auto",
  //   });

  //   return config;
  // },
};

export default nextConfig;
