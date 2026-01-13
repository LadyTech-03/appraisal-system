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
      test: /\.mjs$/,
      type: "javascript/auto",
    })
    return config
  },
}

export default nextConfig
