/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Disable server-side features for static export
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
