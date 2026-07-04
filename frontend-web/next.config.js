// Next.js config

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['fa', 'en'],
    defaultLocale: 'fa',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media-cdn.ir',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = nextConfig;
