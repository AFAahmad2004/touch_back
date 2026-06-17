/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'placehold.co',
    ],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],

    unoptimized: true,
  },

  i18n: {
    locales: ['ar'],
    defaultLocale: 'ar',
    localeDetection: false,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Accept-CH',
            value: 'Sec-CH-UA-Platform-Version',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;