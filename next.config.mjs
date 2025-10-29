/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.securecash.com.au", "i.vimeocdn.com"],
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

  // ✅ ADDED: Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // ✅ ADDED: Optimize bundle splitting for better caching
  webpack: (config, { isServer, dev }) =>
  {
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,

          // React and ReactDOM in separate chunk
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 40,
            enforce: true,
          },

          // Heavy libraries (maps, calendly, etc)
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module)
            {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1];
              return packageName ? `npm.${packageName.replace('@', '')}` : 'lib';
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },

          // Common code used across pages
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },

          // CSS files
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
            priority: 50,
          },
        },
      };
    }
    return config;
  },

  // ✅ ADDED: Experimental optimizations
  experimental: {
    // Optimize imports for better tree-shaking
    optimizePackageImports: [
      'react-icons',
      'lucide-react',
      '@react-google-maps/api',
      'react-slick',
      'react-hook-form',
    ],
  },
};

export default nextConfig;