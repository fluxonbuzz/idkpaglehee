/** @type {import('next').NextConfig} */

// Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
// This is especially useful for Docker builds.
await import('./src/env.js');

import WithPWA from 'next-pwa';

const withPWA = WithPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/',
  sw: 'service-worker.js',
});

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  // If you are using `appDir` then you must comment the below `i18n` config out.
  // @see https://github.com/vercel/next.js/issues/41980
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

export default withPWA(nextConfig);
