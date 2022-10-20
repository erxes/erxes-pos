/** @type {import('next').NextConfig} */

module.exports = {
  swcMinify: true,

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
};
