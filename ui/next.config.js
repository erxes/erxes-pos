/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: '*',
        hostname: 'plugin_core_api',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'http',
        hostname: 'plugin_core_api',
      },
      {
        protocol: 'https',
        hostname: 'test-pos.erxes.io',
      },
    ],
  },
};

module.exports = nextConfig;
