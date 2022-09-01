/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  experimental: {
    images: {
      allowFutureImage: true,
      remotePatterns: [
        {
          protocol: '*',
          hostname: 'plugin_core_api',
        },
        {
          protocol: 'https',
          hostname: '**.amazonaws.com',
        },
      ],
    },
  },
};

module.exports = nextConfig;
