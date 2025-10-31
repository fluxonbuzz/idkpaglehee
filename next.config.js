/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
import './src/env.js';

const nextConfig = {
  reactStrictMode: true,
  
  // Security Headers
  async headers() {
    const securityHeaders = [
      // X-Frame-Options removed for Replit iframe compatibility
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      }
    ];

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/api/auth/:path*',
        headers: [
          ...securityHeaders,
          { 
            key: 'Access-Control-Allow-Credentials', 
            value: 'true' 
          },
          { 
            key: 'Access-Control-Allow-Origin', 
            value: process.env.NEXTAUTH_URL || '*' 
          },
          { 
            key: 'Access-Control-Allow-Methods', 
            value: 'GET,POST,PUT,DELETE,OPTIONS' 
          },
          { 
            key: 'Access-Control-Allow-Headers', 
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' 
          }
        ]
      }
    ];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  }
};

const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/',
  sw: 'service-worker.js',
};

// ES Module export
export default withPWA(pwaConfig)(nextConfig);
