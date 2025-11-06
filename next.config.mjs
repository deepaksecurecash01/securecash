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

    // ✅ ADD: More secure pattern matching
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
  swcMinify: true, // ✅ ADD: Faster minification

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

          // ✅ ADD: Separate Swiper chunk
          swiper: {
            name: "swiper",
            test: /[\\/]node_modules[\\/](swiper)[\\/]/,
            priority: 35,
            enforce: true,
            reuseExistingChunk: true,
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
      // ✅ IMPROVED: More specific image caching
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\\.(js|css|woff2|woff|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // ✅ ADD: Preload hint for homepage
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              "</images/banner/Slide-1-mobile.jpg>; rel=preload; as=image; media=(max-width: 479px), </images/banner/Slide-1-tablet.jpg>; rel=preload; as=image; media=(min-width: 480px) and (max-width: 1023px), </images/banner/Slide-1-web.jpg>; rel=preload; as=image; media=(min-width: 1024px)",
          },
        ],
      },
      {
        source: "/(.*)",
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
      "react-icons",
      "lucide-react",
      "@react-google-maps/api",
      "swiper", // ✅ CHANGED: From react-slick to swiper
      "react-hook-form",
    ],
    scrollRestoration: true,
    webpackBuildWorker: true, // ✅ ADD: Parallel builds
    optimisticClientCache: true, // ✅ ADD: Faster navigation
  },
};

export default nextConfig;