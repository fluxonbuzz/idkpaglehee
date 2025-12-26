// types/pwa.ts
export interface WebsiteInfo {
  url: string;
  title: string;
  description: string;
  icon: string;
  screenshots: string[];
  manifest?: WebAppManifest;
  loadingTime?: number;
  size?: number;
  technologies?: string[];
}

export interface WebAppManifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  orientation: 'any' | 'natural' | 'landscape' | 'portrait';
  theme_color: string;
  background_color: string;
  icons: AppIcon[];
  categories: string[];
  shortcuts?: AppShortcut[];
  screenshots?: AppScreenshot[];
}

export interface AppIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: 'any' | 'maskable' | 'monochrome';
}

export interface AppShortcut {
  name: string;
  url: string;
  description?: string;
  icons?: AppIcon[];
}

export interface AppScreenshot {
  src: string;
  sizes: string;
  type: string;
  platform?: 'wide' | 'narrow' | 'android' | 'ios';
}

export interface PermissionRequest {
  name: string;
  description: string;
  granted: boolean;
  icon: JSX.Element;
  required?: boolean;
}

export interface AppConfig {
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
  scope?: string;
  lang?: string;
  dir?: 'ltr' | 'rtl';
}

export interface PWAScore {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
}

export interface DevicePreview {
  type: 'mobile' | 'tablet' | 'desktop';
  width: number;
  height: number;
  scale: number;
}
