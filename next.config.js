/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // SEO optimizations
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig

