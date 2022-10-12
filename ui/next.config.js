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
};
