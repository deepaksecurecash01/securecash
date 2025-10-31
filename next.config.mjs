/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.securecash.com.au", "i.vimeocdn.com"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year for static image caching
    dangerouslyAllowSVG: false,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },

  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  // ✅ Remove console logs in production
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // ✅ Optimize bundle splitting for better caching
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

  // ✅ Add Cache-Control headers for static assets
  async headers()
  {
    return [
      {
        source: "/(.*).(js|css|woff2|png|jpg|jpeg|svg|avif|webp)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
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

  // ✅ Experimental optimizations + Modern Browser Targets
  experimental: {
    optimizeCss: true, // eliminates render-blocking CSS
    optimizePackageImports: [
      "react-icons",
      "lucide-react",
      "@react-google-maps/api",
      "react-slick",
      "react-hook-form",
    ],
    modern: true,
    scrollRestoration: true,
  },
};

export default nextConfig;
