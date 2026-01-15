/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,

  webpack(config) {
  config.module.rules.push({
    test: /ort\..*\.mjs$/,
    include: /node_modules[\\/](onnxruntime-web)[\\/]/,
    type: "javascript/auto",
  });
  return config;
}

}

export default nextConfig
