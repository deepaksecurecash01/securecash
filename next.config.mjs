/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.securecash.com.au", "i.vimeocdn.com"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.securecash.com.au",
      },
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
    ],
  },

  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  swcMinify: true,

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
        cacheGroups: {
          default: false,
          vendors: false,

          framework: {
            name: "framework",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 40,
            enforce: true,
          },

          // ✅ Separate Swiper chunk with aggressive optimization
          swiper: {
            name: "swiper",
            test: /[\\/]node_modules[\\/](swiper)[\\/]/,
            priority: 35,
            enforce: true,
            reuseExistingChunk: true,
            chunks: 'async', // ✅ Load async since we use dynamic import
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

  async headers()
  {
    return [
      // ✅ Cache banner images aggressively
      {
        source: "/images/banner/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      // ✅ Cache Next.js optimized images
      {
        source: "/_next/image:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // ✅ Cache static assets
      {
        source: "/(.*)\\.(js|css|woff2|woff|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // ✅ HTML pages - no cache
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "swiper/react",
      "swiper/modules",
      "react-icons",
      "lucide-react",
      "@react-google-maps/api",
      "react-hook-form",
      "react-slick",
    ],
    scrollRestoration: true,
    webpackBuildWorker: true,
    optimisticClientCache: true,
  },
};

export default nextConfig;