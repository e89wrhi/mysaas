import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';
import createNextIntlPlugin from 'next-intl/plugin';
import './env.mjs';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  serverExternalPackages: ['@prisma/client'],
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/i18n/requests.ts',
});
export default withNextIntl(withContentlayer(nextConfig));
