/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'placeholder.com', 
      'images.unsplash.com',
      'blog.cavemotions.com',
      'cavemotions.com',
      'secure.gravatar.com',
      'i0.wp.com',
      'i1.wp.com',
      'i2.wp.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.cavemotions.com',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: '*.gravatar.com',
        pathname: '/avatar/**',
      }
    ],
  },
  // Ensure proper static generation and WordPress compatibility
  experimental: {
    optimizePackageImports: ['@/data/blog-posts'],
  },
  // Add environment variable handling for WordPress
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
    NEXT_PUBLIC_WORDPRESS_API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
  },
  // Add webpack configuration for better module resolution
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

export default nextConfig
