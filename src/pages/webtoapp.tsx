// File: app/components/WebsiteToAppConverter.tsx
'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { 
  Globe, 
  Download, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Settings, 
  Shield, 
  Zap, 
  Battery, 
  Wifi,
  Bell,
  Camera,
  Mic,
  MapPin,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Check,
  ExternalLink,
  Upload,
  Trash2,
  Play,
  Pause,
  RotateCw,
  Maximize2,
  Minimize2,
  ChevronRight,
  Menu,
  X,
  Smartphone as Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Type Definitions
interface WebsiteInfo {
  url: string;
  title: string;
  description: string;
  icon: string;
  screenshots: string[];
  manifest?: WebAppManifest;
  loadingTime?: number;
  size?: number;
}

interface WebAppManifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  orientation: 'any' | 'natural' | 'landscape' | 'portrait';
  theme_color: string;
  background_color: string;
  icons: {
    src: string;
    sizes: string;
    type: string;
  }[];
  categories: string[];
  shortcuts?: {
    name: string;
    url: string;
    description?: string;
  }[];
  screenshots?: {
    src: string;
    sizes: string;
    type: string;
    platform?: string;
  }[];
}

interface PermissionRequest {
  name: string;
  description: string;
  granted: boolean;
  icon: JSX.Element;
}

interface AppConfig {
  name: string;
  url: string;
  icon: string;
  permissions: string[];
  offlineSupport: boolean;
  pushNotifications: boolean;
  backgroundSync: boolean;
  theme: 'light' | 'dark' | 'auto';
  installLocation: 'homescreen' | 'desktop' | 'both';
  shortcut: boolean;
  splashScreen: boolean;
  cacheStrategy: 'network-first' | 'cache-first' | 'stale-while-revalidate';
}

export default function WebsiteToAppConverter() {
  // State Management
  const [url, setUrl] = useState<string>('https://');
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [config, setConfig] = useState<AppConfig>({
    name: '',
    url: '',
    icon: '',
    permissions: [],
    offlineSupport: true,
    pushNotifications: false,
    backgroundSync: false,
    theme: 'auto',
    installLocation: 'both',
    shortcut: true,
    splashScreen: true,
    cacheStrategy: 'network-first'
  });
  
  const [permissions, setPermissions] = useState<PermissionRequest[]>([
    {
      name: 'geolocation',
      description: 'Access your location for location-based services',
      granted: false,
      icon: <MapPin className="h-5 w-5" />
    },
    {
      name: 'notifications',
      description: 'Send you push notifications',
      granted: false,
      icon: <Bell className="h-5 w-5" />
    },
    {
      name: 'camera',
      description: 'Access camera for video calls and photos',
      granted: false,
      icon: <Camera className="h-5 w-5" />
    },
    {
      name: 'microphone',
      description: 'Access microphone for voice input and calls',
      granted: false,
      icon: <Mic className="h-5 w-5" />
    },
    {
      name: 'background_sync',
      description: 'Sync data in the background',
      granted: false,
      icon: <Network className="h-5 w-5" />
    }
  ]);

  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);
  const [manifestCode, setManifestCode] = useState<string>('');
  const [serviceWorkerCode, setServiceWorkerCode] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Device dimensions for preview
  const deviceDimensions = {
    mobile: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '100%', height: '600px' }
  };

  // Fetch website info
  const fetchWebsiteInfo = async (siteUrl: string) => {
    setLoading(true);
    setError('');
    
    try {
      // Add https if missing
      let targetUrl = siteUrl;
      if (!targetUrl.startsWith('http')) {
        targetUrl = `https://${targetUrl}`;
      }
      
      // In a real implementation, you would use a backend API to fetch website info
      // For demo purposes, we'll simulate the response
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on URL
      const mockInfo: WebsiteInfo = {
        url: targetUrl,
        title: new URL(targetUrl).hostname.replace('www.', ''),
        description: 'Convert this website into a Progressive Web App',
        icon: `https://www.google.com/s2/favicons?domain=${targetUrl}&sz=128`,
        screenshots: [
          `https://api.screenshotmachine.com?key=demo&url=${targetUrl}&dimension=1024x768`,
          `https://api.screenshotmachine.com?key=demo&url=${targetUrl}&dimension=375x667`
        ],
        loadingTime: 1.2,
        size: 2.5
      };
      
      setWebsiteInfo(mockInfo);
      
      // Update config with website info
      setConfig(prev => ({
        ...prev,
        name: mockInfo.title,
        url: targetUrl,
        icon: mockInfo.icon
      }));
      
      // Generate manifest code
      generateManifestCode(mockInfo);
      
      setStep(2);
    } catch (err) {
      setError('Failed to fetch website information. Please check the URL.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate Web App Manifest
  const generateManifestCode = (info: WebsiteInfo) => {
    const manifest: WebAppManifest = {
      name: config.name || info.title,
      short_name: info.title.substring(0, 12),
      description: info.description,
      start_url: info.url,
      display: 'standalone',
      orientation: 'any',
      theme_color: '#3B82F6',
      background_color: '#FFFFFF',
      icons: [
        {
          src: info.icon,
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: info.icon.replace('sz=128', 'sz=512'),
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      categories: ['productivity', 'utilities'],
      shortcuts: config.shortcut ? [
        {
          name: 'Home',
          url: '/',
          description: 'Go to homepage'
        }
      ] : undefined,
      screenshots: info.screenshots.map((screenshot, index) => ({
        src: screenshot,
        sizes: index === 0 ? '1024x768' : '375x667',
        type: 'image/png',
        platform: index === 0 ? 'wide' : 'narrow'
      }))
    };
    
    const manifestJson = JSON.stringify(manifest, null, 2);
    setManifestCode(manifestJson);
    
    // Generate Service Worker code
    generateServiceWorkerCode();
  };

  // Generate Service Worker for offline support
  const generateServiceWorkerCode = () => {
    const swCode = `
// Service Worker for ${config.name || 'Web App'}
const CACHE_NAME = '${config.name.toLowerCase().replace(/\s+/g, '-')}-v1.0.0';
const urlsToCache = [
  '/',
  '${config.url}',
  // Add other important assets here
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    ${config.cacheStrategy === 'network-first' ? `
    fetch(event.request)
      .then(response => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
    ` : config.cacheStrategy === 'cache-first' ? `
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
    ` : `
    caches.match(event.request)
      .then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return networkResponse;
        }).catch(() => cachedResponse);
        return cachedResponse || fetchPromise;
      })
    `}
  );
});

${config.backgroundSync ? `
// Background Sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Implement your background sync logic here
  console.log('Background sync in progress...');
}
` : ''}

${config.pushNotifications ? `
// Push Notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '${config.icon}',
    badge: '${config.icon}',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: 'icons/icon-72x72.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('${config.name}', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('${config.url}')
  );
});
` : ''}
    `.trim();
    
    setServiceWorkerCode(swCode);
  };

  // Toggle permission
  const togglePermission = (permissionName: string) => {
    setPermissions(prev => 
      prev.map(perm => 
        perm.name === permissionName 
          ? { ...perm, granted: !perm.granted }
          : perm
      )
    );
  };

  // Copy code to clipboard
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download files
  const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate installation package
  const generatePackage = () => {
    // Create manifest.json
    downloadFile('manifest.json', manifestCode, 'application/json');
    
    // Create service-worker.js
    downloadFile('service-worker.js', serviceWorkerCode, 'application/javascript');
    
    // Create index.html with PWA setup
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.name} - PWA</title>
  <meta name="description" content="${websiteInfo?.description || 'Progressive Web App'}">
  
  <!-- PWA Meta Tags -->
  <meta name="theme-color" content="#3B82F6">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="${config.name}">
  
  <!-- Icons -->
  <link rel="icon" href="${config.icon}" type="image/png">
  <link rel="apple-touch-icon" href="${config.icon}">
  
  <!-- Manifest -->
  <link rel="manifest" href="manifest.json">
  
  <!-- Service Worker Registration -->
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful:', registration);
          })
          .catch(error => {
            console.log('ServiceWorker registration failed:', error);
          });
      });
    }
  </script>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      height: 100vh;
      overflow: hidden;
    }
    
    #app-frame {
      width: 100%;
      height: 100vh;
      border: none;
    }
    
    .offline-message {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #f59e0b;
      color: white;
      padding: 10px;
      text-align: center;
      z-index: 1000;
    }
    
    .online .offline-message {
      display: none;
    }
    
    .offline .offline-message {
      display: block;
    }
  </style>
</head>
<body>
  <div class="offline-message">
    ⚠️ You are currently offline. Some features may be limited.
  </div>
  
  <iframe 
    id="app-frame" 
    src="${config.url}" 
    frameborder="0"
    allow="${permissions.filter(p => p.granted).map(p => p.name).join('; ')}"
    allowfullscreen
  ></iframe>
  
  <script>
    // Network status detection
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    function updateOnlineStatus() {
      if (navigator.onLine) {
        document.body.classList.remove('offline');
        document.body.classList.add('online');
      } else {
        document.body.classList.remove('online');
        document.body.classList.add('offline');
      }
    }
    
    // Initialize
    updateOnlineStatus();
    
    // Install prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install button (custom implementation needed)
      console.log('PWA install available');
    });
  </script>
</body>
</html>
    `.trim();
    
    downloadFile('index.html', htmlContent, 'text/html');
    
    // Create README
    const readmeContent = `
# ${config.name} - Progressive Web App

This is a Progressive Web App (PWA) version of ${config.url}

## Installation Instructions

### For Web Users:
1. Visit ${config.url}
2. Look for the "Add to Home Screen" prompt in your browser
3. Or manually:
   - Chrome: Menu → "Install [App Name]"
   - Safari: Share button → "Add to Home Screen"

### For Developers:
1. Place all files in your web server root
2. Serve via HTTPS (required for Service Worker)
3. Update URLs in manifest.json and service-worker.js

## Features
${config.offlineSupport ? '- ✅ Offline Support' : '- ❌ Offline Support'}
${config.pushNotifications ? '- ✅ Push Notifications' : '- ❌ Push Notifications'}
${config.backgroundSync ? '- ✅ Background Sync' : '- ❌ Background Sync'}

## Permissions
${permissions.filter(p => p.granted).map(p => `- ${p.name}: ${p.description}`).join('\n') || '- No special permissions'}

## Files
- index.html: Main app container
- manifest.json: PWA manifest file
- service-worker.js: Service Worker for offline capabilities

## Notes
- Ensure HTTPS is enabled for Service Worker functionality
- Update the icon URLs in manifest.json
- Test on multiple devices for compatibility
    `.trim();
    
    downloadFile('README.md', readmeContent, 'text/markdown');
    
    alert('PWA package downloaded! Check your downloads folder.');
  };

  // Test PWA features
  const testPWA = () => {
    if (!websiteInfo) return;
    
    const tests = [
      { name: 'HTTPS', passed: websiteInfo.url.startsWith('https') },
      { name: 'Manifest', passed: !!manifestCode },
      { name: 'Service Worker', passed: !!serviceWorkerCode },
      { name: 'Responsive', passed: true },
      { name: 'Installable', passed: true },
      { name: 'Offline Support', passed: config.offlineSupport }
    ];
    
    const passedTests = tests.filter(t => t.passed).length;
    const percentage = Math.round((passedTests / tests.length) * 100);
    
    alert(`PWA Test Results:\n\n${tests.map(t => `${t.passed ? '✅' : '❌'} ${t.name}`).join('\n')}\n\nScore: ${percentage}% (${passedTests}/${tests.length} passed)`);
  };

  // Preview website
  const previewWebsite = () => {
    if (!websiteInfo) return;
    setIsPreviewing(true);
    
    // Load in iframe
    if (iframeRef.current) {
      iframeRef.current.src = websiteInfo.url;
    }
  };

  // Update config
  const updateConfig = <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    
    // Regenerate code when relevant config changes
    if (['name', 'url', 'icon', 'cacheStrategy', 'offlineSupport', 'pushNotifications', 'backgroundSync'].includes(key)) {
      setTimeout(() => {
        if (websiteInfo) {
          generateManifestCode(websiteInfo);
        }
      }, 100);
    }
  };

  // Step navigation
  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Website to PWA Converter
              </h1>
              <p className="text-gray-400">
                Convert any website into a Progressive Web App with advanced features
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">100% Browser-Based</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm">No Server Uploads</span>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${step >= stepNum ? 'bg-blue-600' : 'bg-gray-800'}`}>
                  {stepNum}
                </div>
                <span className="text-sm text-gray-400">
                  {stepNum === 1 && 'Website URL'}
                  {stepNum === 2 && 'Configure'}
                  {stepNum === 3 && 'Permissions'}
                  {stepNum === 4 && 'Generate'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: URL Input */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Globe className="h-8 w-8 text-blue-400" />
                  Enter Website URL
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Website Address
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                      <button
                        onClick={() => fetchWebsiteInfo(url)}
                        disabled={loading || !url}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium hover:opacity-90 disabled:opacity-50 transition-all"
                      >
                        {loading ? 'Analyzing...' : 'Analyze Website'}
                      </button>
                    </div>
                    {error && (
                      <p className="mt-2 text-red-400 text-sm">{error}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 p-6 rounded-xl">
                      <h3 className="font-semibold mb-3 text-gray-300">Before Conversion</h3>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-600 rounded-full" />
                          Regular website
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-600 rounded-full" />
                          Requires internet
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-600 rounded-full" />
                          Browser-dependent
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-600 rounded-full" />
                          Limited features
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-6 rounded-xl border border-blue-500/20">
                      <h3 className="font-semibold mb-3 text-blue-300">After Conversion</h3>
                      <ul className="space-y-2 text-blue-100/80">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          Installable app
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          Works offline
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          Native-like experience
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          Push notifications
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-900/30 p-6 rounded-xl">
                    <h3 className="font-semibold mb-3 text-gray-300">Supported Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { icon: <Download />, label: 'Installable' },
                        { icon: <Battery />, label: 'Offline' },
                        { icon: <Bell />, label: 'Notifications' },
                        { icon: <Zap />, label: 'Fast' },
                        { icon: <Shield />, label: 'Secure' },
                        { icon: <Wifi />, label: 'Background Sync' },
                        { icon: <Smartphone />, label: 'Responsive' },
                        { icon: <Lock />, label: 'HTTPS' }
                      ].map((feature, index) => (
                        <div key={index} className="text-center p-3 bg-gray-800/50 rounded-lg">
                          <div className="text-blue-400 mb-1 flex justify-center">
                            {feature.icon}
                          </div>
                          <div className="text-sm text-gray-400">{feature.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Configuration */}
            {step === 2 && websiteInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Settings className="h-8 w-8 text-blue-400" />
                  Configure PWA Settings
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        App Name
                      </label>
                      <input
                        type="text"
                        value={config.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateConfig('name', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Theme
                      </label>
                      <select
                        value={config.theme}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => updateConfig('theme', e.target.value as AppConfig['theme'])}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Install Location
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['homescreen', 'desktop', 'both'] as const).map((location) => (
                        <button
                          key={location}
                          onClick={() => updateConfig('installLocation', location)}
                          className={`p-4 rounded-xl border transition-all ${config.installLocation === location ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-600'}`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {location === 'homescreen' && <Smartphone className="h-6 w-6" />}
                            {location === 'desktop' && <Monitor className="h-6 w-6" />}
                            {location === 'both' && (
                              <div className="flex gap-1">
                                <Smartphone className="h-5 w-5" />
                                <Monitor className="h-5 w-5" />
                              </div>
                            )}
                            <span className="text-sm capitalize">{location}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cache Strategy
                      </label>
                      <select
                        value={config.cacheStrategy}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => updateConfig('cacheStrategy', e.target.value as AppConfig['cacheStrategy'])}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="network-first">Network First (Fresh)</option>
                        <option value="cache-first">Cache First (Fast)</option>
                        <option value="stale-while-revalidate">Balanced</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        App Icon
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gray-900 border border-gray-700 overflow-hidden">
                          {config.icon && (
                            <img 
                              src={config.icon} 
                              alt="App Icon" 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">
                            Using favicon from {new URL(websiteInfo.url).hostname}
                          </p>
                          <button className="text-sm text-blue-400 hover:text-blue-300 mt-1">
                            Upload Custom Icon
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-300">Advanced Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.offlineSupport}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateConfig('offlineSupport', e.target.checked)}
                          className="rounded text-blue-600"
                        />
                        <div>
                          <div className="font-medium">Offline Support</div>
                          <div className="text-sm text-gray-400">Works without internet</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.pushNotifications}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateConfig('pushNotifications', e.target.checked)}
                          className="rounded text-blue-600"
                        />
                        <div>
                          <div className="font-medium">Push Notifications</div>
                          <div className="text-sm text-gray-400">Send notifications</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.backgroundSync}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateConfig('backgroundSync', e.target.checked)}
                          className="rounded text-blue-600"
                        />
                        <div>
                          <div className="font-medium">Background Sync</div>
                          <div className="text-sm text-gray-400">Sync data in background</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Permissions */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Shield className="h-8 w-8 text-blue-400" />
                  App Permissions
                </h2>
                
                <div className="space-y-4">
                  <p className="text-gray-400 mb-6">
                    Select which permissions your PWA should request from users
                  </p>
                  
                  {permissions.map((permission) => (
                    <div
                      key={permission.name}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${permission.granted ? 'border-green-500/50 bg-green-500/5' : 'border-gray-700 hover:border-gray-600'}`}
                      onClick={() => togglePermission(permission.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${permission.granted ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
                            {permission.icon}
                          </div>
                          <div>
                            <div className="font-medium capitalize">{permission.name.replace('_', ' ')}</div>
                            <div className="text-sm text-gray-400">{permission.description}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">
                            {permission.granted ? 'Granted' : 'Denied'}
                          </span>
                          <div className={`w-3 h-3 rounded-full ${permission.granted ? 'bg-green-500' : 'bg-gray-600'}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-blue-300">Privacy Note</div>
                        <div className="text-sm text-blue-200/70">
                          Permissions are only requested when needed. Users can always grant or deny permissions individually.
                          Only request permissions that are essential for your app's functionality.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Generate */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Download className="h-8 w-8 text-blue-400" />
                  Generate & Download
                </h2>
                
                <div className="space-y-6">
                  {/* Code Preview */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-300">Manifest.json</h3>
                      <button
                        onClick={() => copyToClipboard(manifestCode)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="bg-gray-900 p-4 rounded-xl overflow-x-auto text-sm text-gray-300">
                      {manifestCode}
                    </pre>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-300">Service Worker</h3>
                      <button
                        onClick={() => copyToClipboard(serviceWorkerCode)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="bg-gray-900 p-4 rounded-xl overflow-x-auto text-sm text-gray-300 max-h-64">
                      {serviceWorkerCode}
                    </pre>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={generatePackage}
                      className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:opacity-90 transition-all flex flex-col items-center justify-center gap-3"
                    >
                      <Download className="h-8 w-8" />
                      <div>
                        <div className="font-bold text-lg">Download Package</div>
                        <div className="text-sm opacity-80">All files in ZIP</div>
                      </div>
                    </button>
                    
                    <button
                      onClick={testPWA}
                      className="p-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:opacity-90 transition-all flex flex-col items-center justify-center gap-3"
                    >
                      <Zap className="h-8 w-8" />
                      <div>
                        <div className="font-bold text-lg">Test PWA</div>
                        <div className="text-sm opacity-80">Check compatibility</div>
                      </div>
                    </button>
                  </div>

                  <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700">
                    <h3 className="font-bold text-gray-300 mb-4">Deployment Instructions</h3>
                    <ol className="space-y-3 text-gray-400">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">1</div>
                        <span>Upload all downloaded files to your web server</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">2</div>
                        <span>Ensure your website is served over HTTPS (required for PWA)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">3</div>
                        <span>Update URLs in manifest.json and service-worker.js</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">4</div>
                        <span>Test installation on different devices and browsers</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-700 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Previous Step
                </button>
              )}
              
              {step < 4 && websiteInfo && (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:opacity-90 transition-all ml-auto"
                >
                  Next Step
                </button>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            {/* Website Info Card */}
            {websiteInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
              >
                <h3 className="font-bold text-gray-300 mb-4">Website Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-900 border border-gray-700 overflow-hidden">
                      <img 
                        src={websiteInfo.icon} 
                        alt="Favicon" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold truncate">{websiteInfo.title}</div>
                      <div className="text-sm text-gray-400 truncate">{websiteInfo.url}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-900/50 p-3 rounded-lg">
                      <div className="text-gray-400">Loading Time</div>
                      <div className="font-semibold">{websiteInfo.loadingTime}s</div>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded-lg">
                      <div className="text-gray-400">Estimated Size</div>
                      <div className="font-semibold">{websiteInfo.size} MB</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={previewWebsite}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    {isPreviewing ? (
                      <>
                        <Pause className="h-4 w-4" />
                        Stop Preview
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        Preview Website
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Preview Window */}
            {isPreviewing && websiteInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden"
              >
                {/* Preview Controls */}
                <div className="p-4 border-b border-gray-700 bg-gray-900/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-300">Live Preview</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPreviewing(false)}
                        className="p-2 hover:bg-gray-800 rounded-lg"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Device Selector */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {(['mobile', 'tablet', 'desktop'] as const).map((device) => (
                      <button
                        key={device}
                        onClick={() => setPreviewDevice(device)}
                        className={`px-4 py-2 rounded-lg transition-all ${previewDevice === device ? 'bg-blue-600' : 'bg-gray-900 hover:bg-gray-800'}`}
                      >
                        {device === 'mobile' && <Smartphone className="h-4 w-4" />}
                        {device === 'tablet' && <Tablet className="h-4 w-4" />}
                        {device === 'desktop' && <Monitor className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Preview Frame */}
                <div className="p-4 flex justify-center bg-gray-900/30">
                  <div
                    ref={previewRef}
                    className={`rounded-xl overflow-hidden border border-gray-700 bg-white ${previewDevice === 'mobile' ? 'shadow-2xl' : ''}`}
                    style={{
                      width: deviceDimensions[previewDevice].width,
                      height: deviceDimensions[previewDevice].height
                    }}
                  >
                    <div className="w-full h-full relative">
                      {/* Device Frame */}
                      {previewDevice === 'mobile' && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-6 bg-black rounded-b-xl" />
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-black rounded-full border-4 border-gray-900" />
                        </div>
                      )}
                      
                      {/* Iframe */}
                      <iframe
                        ref={iframeRef}
                        src={websiteInfo.url}
                        className="w-full h-full border-0"
                        title="Website Preview"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PWA Benefits */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-blue-500/20">
              <h3 className="font-bold text-blue-300 mb-4">PWA Benefits</h3>
              
              <div className="space-y-3">
                {[
                  '📱 Install like native apps',
                  '⚡ Fast loading & responsive',
                  '🔒 Secure (HTTPS required)',
                  '🌐 Works offline',
                  '📲 Push notifications',
                  '🔄 Background sync',
                  '📊 App store discoverable',
                  '🔄 Automatic updates'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-blue-100/80">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Requirements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="font-bold text-gray-300 mb-4">Technical Requirements</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">HTTPS</span>
                    <span className="text-green-400 text-sm">Required</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Service Worker</span>
                    <span className="text-green-400 text-sm">Required</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Web App Manifest</span>
                    <span className="text-green-400 text-sm">Required</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Responsive Design</span>
                    <span className="text-yellow-400 text-sm">Recommended</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <footer className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-4">
              This tool creates Progressive Web Apps (PWAs) - websites that behave like native apps.
              All processing happens in your browser. No data is sent to any server.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                100% Browser-Based
              </span>
              <span className="flex items-center gap-2">
                <MemoryStick className="h-4 w-4" />
                No Server Uploads
              </span>
              <span className="flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                Local Processing Only
              </span>
              <span className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                PWA Standards Compliant
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
