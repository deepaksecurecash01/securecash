/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ✅ REMOVED: domains (deprecated in Next.js 14+)
    formats: ["image/avif", "image/webp"],

    // ✅ OPTIMIZED: Reduced device sizes (only what you need)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],

    // ✅ OPTIMIZED: Reduced image sizes (removed unnecessary small sizes)
    imageSizes: [16, 32, 48, 64, 96, 128, 256],

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

  // ✅ REMOVED: swcMinify (enabled by default in Next.js 13+)

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  webpack: (config, { isServer, dev }) =>
  {
    if (!isServer && !dev) {
      // ✅ OPTIMIZED: Simplified chunk splitting
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,

          // React framework
          framework: {
            name: "framework",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 40,
            enforce: true,
          },

          // ✅ REMOVED: Swiper chunk (you're not using Swiper)

          // All other node_modules
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

          // Shared components
          commons: {
            name: "commons",
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },

          // CSS
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

      // ✅ Cache all static images
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
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

      // ✅ Cache static JS/CSS/fonts
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // ✅ ADDED: Security headers for all pages
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },

      // ✅ HTML pages - revalidate
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

    // ✅ OPTIMIZED: Removed swiper/react, swiper/modules (not installed)
    optimizePackageImports: [
      "react-icons",
      "@react-google-maps/api",
      "react-hook-form",
     
    ],

    scrollRestoration: true,
    webpackBuildWorker: true,

    // ✅ REMOVED: optimisticClientCache (not a valid Next.js 15 option)
  },
};

export default nextConfig;