/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  reactStrictMode: false,

  webpack(config, { dev, isServer }) {
    // 1) REMOVE the "javascript/auto" override for onnxruntime-web.
    // It breaks ORT runtime URL handling (import.meta.url -> url.replace crash).

    // 2) Fix the Vercel build error by telling Terser to ignore ORT .mjs outputs.
    if (!dev && !isServer && config.optimization?.minimizer) {
      for (const plugin of config.optimization.minimizer) {
        if (plugin?.constructor?.name === "TerserPlugin" && plugin.options) {
          const prevExclude = plugin.options.exclude;
          plugin.options.exclude = Array.isArray(prevExclude)
            ? [...prevExclude, /ort\..*\.mjs$/]
            : prevExclude
              ? [prevExclude, /ort\..*\.mjs$/]
              : [/ort\..*\.mjs$/];
        }
      }
    }

    return config;
  },
};

export default nextConfig;
