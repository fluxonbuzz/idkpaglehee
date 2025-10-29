/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Enhanced PWA Configuration
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/',
    sw: 'service-worker.js',
    dynamicStartUrl: false,
    reloadOnOnline: false,
    buildExcludes: [
      /middleware-manifest\.json$/,
      /_middleware\.js$/,
      /_buildManifest\.js$/,
      /312-.*\.js$/
    ],
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200
          }
        }
      }
    ]
  },

  // Environment Variables
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },

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

// Environment validation
async function setup() {
  if (!process.env.SKIP_ENV_VALIDATION) {
    await import('./src/env.js');
    
    if (!process.env.NEXTAUTH_SECRET) {
      console.warn('Warning: NEXTAUTH_SECRET is not set. This is required for authentication.');
    }
    if (!process.env.NEXTAUTH_URL) {
      console.warn('Warning: NEXTAUTH_URL is not set. This may cause authentication issues.');
    }
  }
  return nextConfig;
}

// ES Module export
export default setup();
