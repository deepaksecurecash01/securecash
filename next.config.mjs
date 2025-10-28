/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow external image domains
    domains: ["www.securecash.com.au", "i.vimeocdn.com"],

    // Enable modern image formats (WebP and AVIF)
    formats: ['image/avif', 'image/webp'],

    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],

    // Image sizes for smaller images (icons, thumbnails, etc.)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Minimum cache time (in seconds) for optimized images
    minimumCacheTTL: 60,

    // Enable dangerous use of SVG (only if you trust your SVG sources)
    dangerouslyAllowSVG: false,

    // Content security policy for SVGs
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable compression
  compress: true,

  // Optimize production builds
  swcMinify: true,

  // Strict mode for better error catching
  reactStrictMode: true,

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;