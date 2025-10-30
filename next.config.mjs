/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.securecash.com.au' },
      { protocol: 'https', hostname: 'i.vimeocdn.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  webpack: (config, { isServer, dev }) =>
  {
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          framework: {
            name: "framework",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module)
            {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1];
              return packageName
                ? `npm.${packageName.replace("@", "")}`
                : "lib";
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: "commons",
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
            priority: 50,
          },
        },
      };
    }
    return config;
  },

  experimental: {
    optimizeCss: true, // ✅ Fixes render-blocking global.css
    scrollRestoration: true,
    optimizePackageImports: [
      "react-icons",
      "lucide-react",
      "@react-google-maps/api",
      "react-slick",
      "react-hook-form",
    ],
  },
};

export default nextConfig;
