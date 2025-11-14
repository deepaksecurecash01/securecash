// ============================================
// 1. next.config.js - FINAL OPTIMIZED VERSION
// ============================================
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
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
  swcMinify: true,

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // ✅ ADDED: Transpile packages to remove polyfills
  transpilePackages: ['swiper'],

  // ✅ REMOVED: Custom webpack splitChunks - let Next.js handle it optimally
  // The experimental.optimizePackageImports does this better

  async headers()
  {
    return [
      // Cache banner images aggressively
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

      // Cache all static images
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // Cache Next.js optimized images
      {
        source: "/_next/image:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // Cache static JS/CSS/fonts
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // Security headers for all pages
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

      // HTML pages - revalidate
      {
        source: "/:path((?!.*\\.).*)",
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
    // ✅ REMOVED: 'modern: true' (deprecated, causes errors)
    optimizeCss: true,
    optimizePackageImports: [
      "swiper",
      "react-icons",
      "@react-google-maps/api",
      "react-hook-form",
    ],
    scrollRestoration: true,
    webpackBuildWorker: true,
  },
};

export default nextConfig;
