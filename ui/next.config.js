/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
});
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    runtimeCaching,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.erxes.io',
      },
      {
        protocol: 'https',
        hostname: '**.jurur.mn',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },

  webpack: (config) => {
    config.optimization.splitChunks.cacheGroups = {
      ...config.optimization.splitChunks.cacheGroups,
      '@sentry': {
        test: /[\\/]node_modules[\\/](@sentry)[\\/]/,
        name: '@sentry',
        priority: 10,
        reuseExistingChunk: false,
      },
    };
    return config;
  },
});
