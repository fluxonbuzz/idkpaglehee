'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Download, Star, Trophy, Users, Gamepad2, Search, Filter,
  ChevronRight, ChevronLeft, Share2, Heart, Clock, Zap,
  Shield, Cpu, Smartphone, Monitor, Globe, Volume2, Award,
  Sparkles, Flame, Rocket, TrendingUp, Crown, Home, Grid,
  Layout, BookOpen, ExternalLink, Eye, DownloadCloud, Bell,
  Target, Medal, Battery, HardDrive, Wifi, ArrowRight, Gift,
  Sparkle, AlertTriangle, CheckCircle, Menu, X, Play, Image,
  Settings, Calendar, Cloud, ShieldCheck, Refresh, Coins,
  FileText, DollarSign, User, Flag, Activity, Film, Shirt,
  List, Joystick, MousePointer
} from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Folder structure:
// public/
// ├── assets/
// │   ├── game-icons/
// │   │   ├── cricket-fusion-wc19.png
// │   │   ├── cricket-fusion-x.png
// │   │   ├── cricket-fusion.png
// │   │   └── cricket-fusion-pro.png
// │   └── screenshots/
// │       ├── cricket-fusion-wc19/
// │       │   ├── 1.jpg
// │       │   ├── 2.jpg
// │       │   ├── 3.jpg
// │       │   └── 4.jpg
// │       ├── cricket-fusion-x/
// │       │   ├── 1.jpg
// │       │   ├── 2.jpg
// │       │   ├── 3.jpg
// │       │   ├── 4.jpg
// │       │   └── 5.jpg
// │       ├── cricket-fusion/
// │       │   ├── 1.jpg
// │       │   ├── 2.jpg
// │       │   ├── 3.jpg
// │       │   └── 4.jpg
// │       └── cricket-fusion-pro/
// │           ├── 1.jpg
// │           ├── 2.jpg
// │           ├── 3.jpg
// │           └── 4.jpg

interface Game {
  id: string;
  title: string;
  version: string;
  size: string;
  description: string;
  shortDescription: string;
  icon: string;
  screenshots: string[];
  status: 'available' | 'coming-soon' | 'beta';
  downloadLink?: string;
  rating: number;
  downloads: string;
  category: string;
  ageRating: string;
  developer: string;
  lastUpdated: string;
  features: string[];
  tags?: string[];
  whatsNew?: string[];
  compatibility?: string[];
  requirements?: {
    os: string;
    processor: string;
    memory: string;
    storage: string;
  };
  progress?: number;
}

const gamesData: Game[] = [
  {
    id: 'cricket-fusion-wc19',
    title: 'Cricket Fusion WC19',
    version: 'Beta 1.0.0',
    size: '514 MB',
    description: 'Experience the thrill of World Cup 2019 with enhanced graphics, realistic gameplay, and immersive commentary. The ultimate cricket simulation with 200+ new shots and dynamic physics.',
    shortDescription: 'World Cup 2019 Edition - Beta Release',
    icon: '/assets/game-icons/cricket-fusion-wc19.png',
    screenshots: [
      '/assets/screenshots/cricket-fusion-wc19/1.jpg',
      '/assets/screenshots/cricket-fusion-wc19/2.jpg',
      '/assets/screenshots/cricket-fusion-wc19/3.jpg',
      '/assets/screenshots/cricket-fusion-wc19/4.jpg',
    ],
    status: 'beta',
    downloadLink: 'https://linksgo.in/bQAu',
    rating: 4.9,
    downloads: 'Pre-release',
    category: 'Sports',
    ageRating: '4+',
    developer: 'Shiva X Mods',
    lastUpdated: 'Today',
    features: [
      'World Cup 2019 Scorecards & Main Menu',
      'New Hindi and English commentary',
      '200+ new shots with enhanced physics',
      'All England stadiums included',
      'New trophy celebration scenes',
      'Remastered sound effects'
    ],
    tags: ['BETA', 'HOT RELEASE', 'NEW', 'TRENDING'],
    whatsNew: ['Beta launch', 'Enhanced physics engine', 'New commentary system'],
    compatibility: ['iOS 15+', 'Android 9+', 'Windows 10+'],
    requirements: {
      os: 'Android 9.0 or later',
      processor: 'Snapdragon 660 or equivalent',
      memory: '4GB RAM',
      storage: '1.5GB free space'
    },
    progress: 95
  },
  {
    id: 'cricket-fusion-x',
    title: 'Cricket Fusion X',
    version: '2.1.0',
    size: '1.2 GB',
    description: 'Premium cricket experience with professional commentary, real-time multiplayer, and 4K graphics. Featuring updated IPL 2024 fixtures and enhanced gameplay mechanics.',
    shortDescription: 'Next-gen cricket with real commentary',
    icon: '/assets/game-icons/cricket-fusion-x.png',
    screenshots: [
      '/assets/screenshots/cricket-fusion-x/1.jpg',
      '/assets/screenshots/cricket-fusion-x/2.jpg',
      '/assets/screenshots/cricket-fusion-x/3.jpg',
      '/assets/screenshots/cricket-fusion-x/4.jpg',
      '/assets/screenshots/cricket-fusion-x/5.jpg',
    ],
    status: 'available',
    downloadLink: 'https://linksgo.in/bQAu',
    rating: 4.8,
    downloads: '50K+',
    category: 'Sports',
    ageRating: '4+',
    developer: 'Shiva X Mods',
    lastUpdated: '2 days ago',
    features: [
      'Professional commentary system',
      'Real-time multiplayer mode',
      '4K Ultra HD graphics',
      'IPL 2024 fixtures included',
      'Enhanced physics engine',
      'Cloud save support'
    ],
    tags: ['PREMIUM', 'MULTIPLAYER', '4K'],
    compatibility: ['iOS 14+', 'Android 8+', 'Windows 10+'],
    requirements: {
      os: 'Android 8.0 or later',
      processor: 'Snapdragon 845 or equivalent',
      memory: '6GB RAM',
      storage: '3GB free space'
    }
  },
  {
    id: 'cricket-fusion-pro',
    title: 'Cricket Fusion Pro',
    version: '3.0.0',
    size: '2.1 GB',
    description: 'The ultimate professional cricket simulation with advanced AI, career mode, and comprehensive tournament systems. Experience cricket like never before.',
    shortDescription: 'Professional cricket simulation',
    icon: '/assets/game-icons/cricket-fusion-pro.png',
    screenshots: [
      '/assets/screenshots/cricket-fusion-pro/1.jpg',
      '/assets/screenshots/cricket-fusion-pro/2.jpg',
      '/assets/screenshots/cricket-fusion-pro/3.jpg',
      '/assets/screenshots/cricket-fusion-pro/4.jpg',
    ],
    status: 'available',
    downloadLink: 'https://linksgo.in/bQAu',
    rating: 4.9,
    downloads: '25K+',
    category: 'Sports',
    ageRating: '4+',
    developer: 'Shiva X Mods',
    lastUpdated: '1 week ago',
    features: [
      'Advanced AI opponents',
      'Complete career mode',
      'All major tournaments',
      'Player customization',
      'Real-time statistics',
      'Esports ready'
    ],
    tags: ['PRO', 'CAREER MODE', 'ESPORTS'],
    compatibility: ['iOS 16+', 'Android 10+', 'Windows 11+'],
    requirements: {
      os: 'Android 10.0 or later',
      processor: 'Snapdragon 865 or equivalent',
      memory: '8GB RAM',
      storage: '5GB free space'
    }
  },
  {
    id: 'cricket-fusion-lite',
    title: 'Cricket Fusion Lite',
    version: '1.5.3',
    size: '280 MB',
    description: 'Lightweight version with essential features. Perfect for low-end devices while maintaining core gameplay experience.',
    shortDescription: 'Lightweight cricket experience',
    icon: '/assets/game-icons/cricket-fusion.png',
    screenshots: [
      '/assets/screenshots/cricket-fusion/1.jpg',
      '/assets/screenshots/cricket-fusion/2.jpg',
      '/assets/screenshots/cricket-fusion/3.jpg',
      '/assets/screenshots/cricket-fusion/4.jpg',
    ],
    status: 'available',
    downloadLink: 'https://linksgo.in/bQAu',
    rating: 4.6,
    downloads: '100K+',
    category: 'Sports',
    ageRating: '4+',
    developer: 'Shiva X Mods',
    lastUpdated: '3 days ago',
    features: [
      'Optimized for low-end devices',
      'Core gameplay intact',
      'Small download size',
      'Basic tournaments',
      'Smooth performance',
      'Battery efficient'
    ],
    tags: ['LITE', 'OPTIMIZED', 'LOW-END'],
    compatibility: ['iOS 12+', 'Android 6+', 'Windows 7+'],
    requirements: {
      os: 'Android 6.0 or later',
      processor: 'Snapdragon 425 or equivalent',
      memory: '2GB RAM',
      storage: '500MB free space'
    }
  },
  {
    id: 'cricket-fusion-arcade',
    title: 'Cricket Fusion Arcade',
    version: '1.2.0',
    size: '890 MB',
    description: 'Fast-paced arcade cricket with power-ups, special abilities, and exciting game modes. Perfect for quick gaming sessions.',
    shortDescription: 'Arcade-style cricket action',
    icon: '/assets/game-icons/cricket-fusion-x.png',
    screenshots: [
      '/assets/screenshots/cricket-fusion-x/1.jpg',
      '/assets/screenshots/cricket-fusion-x/2.jpg',
    ],
    status: 'coming-soon',
    downloadLink: '#',
    rating: 4.7,
    downloads: 'Coming Soon',
    category: 'Arcade',
    ageRating: '7+',
    developer: 'Shiva X Mods',
    lastUpdated: 'Coming Soon',
    features: [
      'Power-ups and abilities',
      'Fast-paced gameplay',
      'Special game modes',
      'Colorful graphics',
      'Quick matches',
      'Global leaderboards'
    ],
    tags: ['ARCADE', 'COMING SOON', 'ACTION'],
    compatibility: ['iOS 15+', 'Android 9+'],
    progress: 65
  }
];

const categories = [
  { id: 'all', name: 'All Games', icon: <Grid size={20} />, count: 5 },
  { id: 'sports', name: 'Sports', icon: <Trophy size={20} />, count: 4 },
  { id: 'arcade', name: 'Arcade', icon: <Gamepad2 size={20} />, count: 1 },
  { id: 'trending', name: 'Trending', icon: <TrendingUp size={20} />, count: 3 },
  { id: 'new', name: 'New', icon: <Sparkle size={20} />, count: 2 },
  { id: 'popular', name: 'Popular', icon: <Crown size={20} />, count: 3 }
];

const platforms = [
  { id: 'android', name: 'Android', icon: <Smartphone size={18} /> },
  { id: 'ios', name: 'iOS', icon: <Smartphone size={18} /> },
  { id: 'windows', name: 'Windows', icon: <Monitor size={18} /> }
];

const filters = [
  { id: 'all', name: 'All Status' },
  { id: 'available', name: 'Available' },
  { id: 'beta', name: 'Beta' },
  { id: 'coming-soon', name: 'Coming Soon' }
];

export default function ModernAppStore() {
  const [selectedGame, setSelectedGame] = useState<Game>(gamesData[0]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('android');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  const filteredGames = gamesData.filter(game => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'sports' && game.category === 'Sports') ||
      (selectedCategory === 'arcade' && game.category === 'Arcade') ||
      (selectedCategory === 'trending' && game.tags?.includes('TRENDING')) ||
      (selectedCategory === 'new' && game.tags?.includes('NEW')) ||
      (selectedCategory === 'popular' && game.downloads.includes('K+'));
    
    const matchesStatus = selectedStatus === 'all' || game.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const nextScreenshot = () => {
    setCurrentScreenshotIndex(prev => 
      prev === selectedGame.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevScreenshot = () => {
    setCurrentScreenshotIndex(prev => 
      prev === 0 ? selectedGame.screenshots.length - 1 : prev - 1
    );
  };

  const getStatusBadge = (status: Game['status']) => {
    switch (status) {
      case 'available':
        return (
          <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle size={12} />
            Available
          </span>
        );
      case 'beta':
        return (
          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
            <Flame size={12} />
            Beta
          </span>
        );
      case 'coming-soon':
        return (
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Clock size={12} />
            Coming Soon
          </span>
        );
    }
  };

  const getDownloadButton = (game: Game) => {
    switch (game.status) {
      case 'available':
        return (
          <Link
            href={game.downloadLink || '#'}
            target="_blank"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <DownloadCloud size={20} />
            Download
          </Link>
        );
      case 'beta':
        return (
          <Link
            href={game.downloadLink || '#'}
            target="_blank"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 animate-pulse"
          >
            <Rocket size={20} />
            Download Beta
          </Link>
        );
      case 'coming-soon':
        return (
          <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-not-allowed">
            <Bell size={20} />
            Coming Soon
          </button>
        );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedGame?.screenshots) {
        nextScreenshot();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedGame]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-gray-900/80 to-black/80" />
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-800"
              >
                <Menu size={24} />
              </button>
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Gamepad2 className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    SX GameStore
                  </h1>
                  <p className="text-xs text-gray-400">Premium Gaming Experience</p>
                </div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-6">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search games, apps, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all backdrop-blur-sm"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <Bell size={22} />
              </button>
              <Link
                href="https://t.me/shivaxmods1"
                target="_blank"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <Users size={20} />
                Join Community
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex relative">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 z-40 w-72 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 lg:hidden"
            >
              <div className="p-6">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-800"
                >
                  <X size={24} />
                </button>
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-gray-300 mb-4">Categories</h2>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center justify-between w-full p-3 rounded-xl transition-all ${selectedCategory === category.id ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'hover:bg-gray-800/50 text-gray-400'}`}
                      >
                        <div className="flex items-center gap-3">
                          {category.icon}
                          <span>{category.name}</span>
                        </div>
                        <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 bg-transparent p-6 sticky top-20 h-[calc(100vh-80px)]">
          <div className="space-y-8">
            {/* Categories */}
            <div>
              <h2 className="text-lg font-bold text-gray-300 mb-4 flex items-center gap-2">
                <Grid size={20} />
                Categories
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center justify-between w-full p-3 rounded-xl transition-all ${selectedCategory === category.id ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'hover:bg-gray-800/50 text-gray-400'}`}
                  >
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <span>{category.name}</span>
                    </div>
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div>
              <h2 className="text-lg font-bold text-gray-300 mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filters
              </h2>
              <div className="space-y-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedStatus(filter.id)}
                    className={`flex items-center justify-between w-full p-3 rounded-xl transition-all ${selectedStatus === filter.id ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'hover:bg-gray-800/50 text-gray-400'}`}
                  >
                    <span>{filter.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div>
              <h2 className="text-lg font-bold text-gray-300 mb-4">Platforms</h2>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedPlatform === platform.id ? 'bg-gray-800 text-white border border-gray-700' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'}`}
                  >
                    {platform.icon}
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 container mx-auto px-4 py-6">
          {/* Hero Banner */}
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 border border-gray-800 p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <div className="bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1">
                        <span className="text-red-400 font-semibold text-sm flex items-center gap-1">
                          <Flame size={16} />
                          HOT RELEASE
                        </span>
                      </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4">
                      Cricket Fusion WC19 <span className="text-blue-400">Beta</span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-6">
                      Experience the World Cup 2019 like never before. Enhanced graphics, realistic gameplay, and immersive commentary.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="https://linksgo.in/bQAu"
                        target="_blank"
                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <Rocket size={20} />
                        Download Beta
                      </Link>
                      <button className="px-6 py-3 border border-gray-700 rounded-xl hover:bg-gray-800/50 transition-colors flex items-center gap-2">
                        <Play size={20} />
                        Watch Trailer
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 p-2">
                      <div className="w-full h-full rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 flex items-center justify-center">
                        <Trophy className="h-24 w-24 text-red-400" />
                      </div>
                    </div>
                    <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                      BETA
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Game Section */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Game Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Screenshots */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Preview</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      {currentScreenshotIndex + 1} / {selectedGame.screenshots.length}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={prevScreenshot}
                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextScreenshot}
                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  <motion.div
                    key={currentScreenshotIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <Image className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500">Game Screenshot Preview</p>
                    </div>
                  </motion.div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {selectedGame.screenshots.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentScreenshotIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentScreenshotIndex ? 'bg-white' : 'bg-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
                <h3 className="text-xl font-bold mb-6">Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedGame.features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                          <Zap size={18} className="text-blue-400" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Game Info Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Game Info</h3>
                  {getStatusBadge(selectedGame.status)}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Developer</span>
                    <span className="font-medium">{selectedGame.developer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Version</span>
                    <span className="font-medium">{selectedGame.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Size</span>
                    <span className="font-medium">{selectedGame.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Updated</span>
                    <span className="font-medium">{selectedGame.lastUpdated}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{selectedGame.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Downloads</span>
                    <span className="font-medium">{selectedGame.downloads}</span>
                  </div>
                </div>
                <div className="mt-6">
                  {getDownloadButton(selectedGame)}
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 p-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                      <Heart size={20} />
                      Like
                    </button>
                    <button className="flex-1 p-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                      <Share2 size={20} />
                      Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              {selectedGame.requirements && (
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-4">Requirements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Cpu size={18} className="text-gray-400" />
                      <span className="text-sm">{selectedGame.requirements.processor}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <HardDrive size={18} className="text-gray-400" />
                      <span className="text-sm">{selectedGame.requirements.storage}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Battery size={18} className="text-gray-400" />
                      <span className="text-sm">{selectedGame.requirements.memory}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Smartphone size={18} className="text-gray-400" />
                      <span className="text-sm">{selectedGame.requirements.os}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Games Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">All Games</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{filteredGames.length} games</span>
                <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sort by: Popular</option>
                  <option>Sort by: Newest</option>
                  <option>Sort by: Rating</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="p-6">
                    {/* Game Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                          <div className="w-full h-full rounded-lg bg-gray-900 flex items-center justify-center">
                            <Trophy className="h-7 w-7 text-blue-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{game.title}</h3>
                          <p className="text-sm text-gray-400">{game.shortDescription}</p>
                        </div>
                      </div>
                      {getStatusBadge(game.status)}
                    </div>

                    {/* Progress Bar (for beta/coming soon) */}
                    {game.progress && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-400">Development Progress</span>
                          <span className="font-medium">{game.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${game.progress}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                          />
                        </div>
                      </div>
                    )}

                    {/* Game Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Category</span>
                        <span className="font-medium">{game.category}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Size</span>
                        <span className="font-medium">{game.size}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{game.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {game.tags && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {game.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => setSelectedGame(game)}
                        className="w-full py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={18} />
                        View Details
                      </button>
                      {getDownloadButton(game)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">No games found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Gamepad2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">SX GameStore</h3>
                  <p className="text-sm text-gray-400">Premium Gaming</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Download the best games and apps, optimized for performance and experience.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/games" className="text-gray-400 hover:text-white transition-colors">Games</Link></li>
                <li><Link href="/apps" className="text-gray-400 hover:text-white transition-colors">Apps</Link></li>
                <li><Link href="/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/community" className="text-gray-400 hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex gap-3">
                <Link
                  href="https://t.me/shivaxmods1"
                  target="_blank"
                  className="p-2 rounded-lg bg-gray-800 hover:bg-blue-500 transition-colors"
                >
                  <Users size={20} />
                </Link>
                <Link
                  href="https://youtube.com/@shivaxmods"
                  target="_blank"
                  className="p-2 rounded-lg bg-gray-800 hover:bg-red-500 transition-colors"
                >
                  <Film size={20} />
                </Link>
                <Link
                  href="https://instagram.com/shivaxmods"
                  target="_blank"
                  className="p-2 rounded-lg bg-gray-800 hover:bg-pink-500 transition-colors"
                >
                  <Sparkles size={20} />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Shiva X Mods. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
