/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // PWA Configuration
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/',
    sw: 'service-worker.js',
  },

  // Environment Variables
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },

  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/api/auth/:path*',
        headers: [
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
    ]
  },

  // Build Configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Internationalization
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

// Environment validation (run before config)
async function setup() {
  if (!process.env.SKIP_ENV_VALIDATION) {
    await import('./src/env.js');
  }
  return nextConfig;
}

export default setup();
