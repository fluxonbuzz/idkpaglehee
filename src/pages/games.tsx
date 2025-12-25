'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Download, Clock, Zap, CheckCircle, Star, Award, Users, Trophy, 
  Shirt, Activity, Film, Globe, Volume2, Joystick, List, Flag, 
  Coins, Home, ShoppingCart, AlertCircle, X, ChevronDown, ChevronUp, 
  Search, Menu, Filter, Sparkles, Gamepad2, Crown, Heart,
  Shield, FileText, DollarSign, User, ChevronLeft, ChevronRight,
  Play, Image, Smartphone, Monitor, Settings, Grid, Layout, BookOpen,
  Share2, ExternalLink, Eye, MousePointer, DownloadCloud, Calendar,
  Bell, TrendingUp, Medal, Target, Refresh, Cloud, ShieldCheck,
  Battery, Cpu, HardDrive, Wifi, ArrowRight, Gift, Sparkle,
  Flame, AlertTriangle, Rocket
} from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

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
  features: {
    category: string;
    items: {
      icon: React.ReactNode;
      text: string;
    }[];
  }[];
  tags?: string[];
  whatsNew?: string[];
  compatibility?: string[];
  requirements?: {
    os: string;
    processor: string;
    memory: string;
    storage: string;
  };
}

const gamesData: Game[] = [
  {
    id: 'cricket-fusion-wc19',
    title: 'Cricket Fusion Beta',
    version: '1.0.0',
    size: '514 MB',
    description: 'World Cup 2019 Edition - Compact version with stunning new features. Relive the epic moments with enhanced gameplay!',
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
    lastUpdated: 'Just Now',
    tags: ['BETA', 'HOT RELEASE', 'NEW'],
    compatibility: ['iOS 15+', 'Android 9+'],
    features: [
      {
        category: 'World Cup 2019 Experience',
        items: [
          { icon: <Trophy size={16} className="text-yellow-400" />, text: 'World Cup 2019 Scorecards & Main Menu' },
          { icon: <Film size={16} className="text-yellow-400" />, text: 'Match intro with WC19 graphics' },
          { icon: <Award size={16} className="text-yellow-400" />, text: 'New trophy celebration scenes' },
          { icon: <Globe size={16} className="text-yellow-400" />, text: 'All England stadiums (not from RC20)' }
        ]
      },
      {
        category: 'Audio & Commentary',
        items: [
          { icon: <Volume2 size={16} className="text-blue-400" />, text: 'New Hindi and English commentary' },
          { icon: <Volume2 size={16} className="text-blue-400" />, text: 'Completely new sound effects' },
          { icon: <Volume2 size={16} className="text-blue-400" />, text: 'Removed all old sound effects' }
        ]
      },
      {
        category: 'Gameplay & Controls',
        items: [
          { icon: <Zap size={16} className="text-green-400" />, text: '200+ new shots with enhanced physics' },
          { icon: <Joystick size={16} className="text-green-400" />, text: 'New joystick and control system' },
          { icon: <Activity size={16} className="text-green-400" />, text: 'New QTE System in bowling' },
          { icon: <Star size={16} className="text-green-400" />, text: 'New celebrations (century, wicket, etc.)' }
        ]
      }
    ]
  },
  {
    id: 'cricket-fusion-x',
    title: 'Cricket Fusion X',
    version: '2.0.1',
    size: '514.58 MB',
    description: 'The ultimate cricket gaming experience with groundbreaking features and stunning visuals',
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
    downloads: '10K+',
    category: 'Sports',
    ageRating: '4+',
    developer: 'Shiva X Mods',
    lastUpdated: '2 days ago',
    whatsNew: [
      'New commentary system with Aakash & Siddhu',
      'Updated IPL 2024 fixtures',
      'Improved gameplay physics',
      'Bug fixes and performance improvements'
    ],
    compatibility: ['iOS 14+', 'Android 8+', 'Windows 10+'],
    requirements: {
      os: 'Android 8.0 or later',
      processor: 'Snapdragon 660 or equivalent',
      memory: '4GB RAM',
      storage: '2GB free space'
    },
    features: [
      {
        category: 'Commentary & Audio',
        items: [
          { icon: <Volume2 size={16} className="text-blue-400" />, text: 'Brand new commentary (Aakash & Siddhu)' },
          { icon: <Volume2 size={16} className="text-blue-400" />, text: 'New crowd sounds and BGM' },
          { icon: <Volume2 size={16} className="text-blue-400" />, text: 'No low volume issues' }
        ]
      },
      {
        category: 'Tournaments & Teams',
        items: [
          { icon: <Trophy size={16} className="text-purple-400" />, text: 'Champions Trophy 2025 (real fixtures)' },
          { icon: <Trophy size={16} className="text-purple-400" />, text: 'Updated IPL 2024 fixtures' },
          { icon: <Users size={16} className="text-purple-400" />, text: 'Champions Trophy new squads' },
          { icon: <Award size={16} className="text-purple-400" />, text: 'Improved IPL auction system' }
        ]
      },
      {
        category: 'Gameplay Features',
        items: [
          { icon: <Zap size={16} className="text-green-400" />, text: '80+ new shots with enhanced physics' },
          { icon: <Activity size={16} className="text-green-400" />, text: 'New bowling actions' },
          { icon: <Activity size={16} className="text-green-400" />, text: 'Super smooth gameplay' },
          { icon: <Star size={16} className="text-green-400" />, text: 'Improved AI for realistic matches' }
        ]
      }
    ]
  },
  {
    id: 'cricket-fusion',
    title: 'Cricket Fusion',
    version: '1.5.3',
    size: '512 MB',
    description: 'The legendary cricket experience - completely rebuilt with next-gen features',
    shortDescription: 'Classic cricket, modern features',
    icon: '/assets/game-icons/cricket-fusion.png',
    screenshots: [
      '/assets/screenshots/cricket-fusion/1.jpg',
      '/assets/screenshots/cricket-fusion/2.jpg',
      '/assets/screenshots/cricket-fusion/3.jpg',
      '/assets/screenshots/cricket-fusion/4.jpg',
    ],
    status: 'available',
    downloadLink: 'https://linksgo.in/bQAu',
    rating: 4.7,
    downloads: '50K+',
    category: 'Sports',
    ageRating: '4+',
    developer: 'Shiva X Mods',
    lastUpdated: '1 week ago',
    compatibility: ['iOS 13+', 'Android 7+', 'Windows 8+'],
    features: [
      {
        category: 'Core Features',
        items: [
          { icon: <List size={16} className="text-blue-400" />, text: 'Completely redesigned main menu' },
          { icon: <Users size={16} className="text-blue-400" />, text: 'Impact Player rule implementation' },
          { icon: <Award size={16} className="text-blue-400" />, text: '10 teams in auction system' },
          { icon: <Shirt size={16} className="text-blue-400" />, text: 'Jersey selector for T20/ODI formats' }
        ]
      },
      {
        category: 'Tournaments',
        items: [
          { icon: <Trophy size={16} className="text-purple-400" />, text: 'Champions Trophy 2025' },
          { icon: <Globe size={16} className="text-purple-400" />, text: 'IPL 2025 with PSL draft system' },
          { icon: <Activity size={16} className="text-purple-400" />, text: 'T20 World Cup 2024' },
          { icon: <Star size={16} className="text-purple-400" />, text: 'ICC World Cup 2023' }
        ]
      }
    ]
  },
  {
    id: 'cricket-fusion-pro',
    title: 'Cricket Fusion Pro',
    version: '3.0.0',
    size: '1.2 GB',
    description: 'Premium cricket simulation with professional features',
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
    downloads: '5K+',
    category: 'Sports',
    ageRating: '4+',
    developer: 'Shiva X Mods',
    lastUpdated: '1 week ago',
    tags: ['PREMIUM', 'EXCLUSIVE'],
    compatibility: ['iOS 16+', 'Android 10+', 'Windows 11+'],
    features: [
      {
        category: 'Professional Features',
        items: [
          { icon: <Monitor size={16} className="text-blue-400" />, text: '4K Ultra HD graphics' },
          { icon: <Cpu size={16} className="text-blue-400" />, text: 'Enhanced physics engine' },
          { icon: <Users size={16} className="text-blue-400" />, text: 'Online multiplayer' },
          { icon: <Cloud size={16} className="text-blue-400" />, text: 'Cloud save support' }
        ]
      }
    ]
  }
];

const socialLinks = [
  {
    name: "Telegram",
    href: "https://t.me/shivaxmods1",
    icon: Users,
    color: "bg-blue-500 hover:bg-blue-600",
    description: "Instant updates and support"
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@shivaxmods",
    icon: Film,
    color: "bg-red-600 hover:bg-red-700",
    description: "Watch our new mod showcases"
  },
  {
    name: "Instagram",
    href: "https://instagram.com/shivaxmods",
    icon: Sparkles,
    color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    description: "Behind the scenes content"
  }
];

const categories = [
  { id: 'all', name: 'All Games', icon: <Grid size={20} /> },
  { id: 'sports', name: 'Sports', icon: <Trophy size={20} /> },
  { id: 'featured', name: 'Featured', icon: <Star size={20} /> },
  { id: 'new', name: 'New Releases', icon: <Sparkle size={20} /> },
  { id: 'popular', name: 'Popular', icon: <TrendingUp size={20} /> }
];

export default function GamesPage() {
  const [expandedGame, setExpandedGame] = useState<string | null>('cricket-fusion-wc19');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGame, setSelectedGame] = useState<Game>(gamesData[0]);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <CheckCircle size={12} />
            Available
          </div>
        );
      case 'beta':
        return (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
            <Flame size={12} />
            BETA LAUNCHED
          </div>
        );
      case 'coming-soon':
        return (
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Clock size={12} />
            Coming Soon
          </div>
        );
    }
  };

  const getStatusButton = (game: Game) => {
    switch (game.status) {
      case 'available':
        return (
          <Link
            href={game.downloadLink ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full"
          >
            <DownloadCloud size={18} /> Download Now
          </Link>
        );
      case 'beta':
        return (
          <Link
            href={game.downloadLink ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full animate-pulse"
          >
            <Rocket size={18} /> Download Beta
          </Link>
        );
      case 'coming-soon':
        return (
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg cursor-not-allowed opacity-90 w-full">
            <Bell size={18} /> Notify Me
          </button>
        );
    }
  };

  const filteredGames = gamesData.filter(game => {
    const matchesSearch = 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'sports') return matchesSearch && game.category === 'Sports';
    if (selectedCategory === 'featured') return matchesSearch && game.rating >= 4.8;
    if (selectedCategory === 'new') return matchesSearch && (game.status === 'beta' || game.tags?.includes('NEW'));
    if (selectedCategory === 'popular') return matchesSearch && game.downloads.includes('K+');
    
    return matchesSearch;
  });

  // Auto-scroll screenshots
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedGame?.screenshots) {
        nextScreenshot();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedGame]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black"></div>
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] opacity-40"
        />
      </div>

      {/* Header */}
      <header className="fixed w-full z-50 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="h-4 w-4 text-gray-950" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                SX Games
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-cyan-400 transition-colors">
                Home
              </Link>
              <Link href="/games" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
                Games
              </Link>
              <Link href="/apps" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
                Apps
              </Link>
              <Link href="/search" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
                Search
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="https://t.me/shivaxmods1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg transition-all"
              >
                Join Telegram
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Beta Launch Announcement */}
      <section className="pt-16">
        <div className="container mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-red-600/20 via-red-700/20 to-orange-600/20 border border-red-500/30 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-red-600 p-3 rounded-xl">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <span className="text-red-400">🔥 CRICKET FUSION BETA LAUNCHED!</span>
                    </h2>
                    <p className="text-gray-300 mt-1">World Cup 2019 Edition with 200+ new shots & enhanced physics</p>
                  </div>
                </div>
                <Link
                  href="https://linksgo.in/bQAu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <DownloadCloud size={20} /> Download Beta Now
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main>
        {/* Search Bar */}
        <div className="sticky top-16 z-40 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search Games"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-gray-800 transition-all shadow-lg text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${selectedCategory === category.id ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'}`}
              >
                {category.icon}
                <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Game Details Section */}
        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Game Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Section */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-8 border border-gray-800">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Game Icon */}
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 p-1">
                      <div className="w-full h-full rounded-2xl bg-gray-900 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center">
                          <Trophy className="h-16 w-16 text-red-400" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      BETA RELEASE
                    </div>
                  </div>

                  {/* Game Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-4xl font-bold text-white mb-2">{selectedGame.title}</h1>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < Math.floor(selectedGame.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                              />
                            ))}
                            <span className="text-sm text-gray-400 ml-2">{selectedGame.rating}</span>
                          </div>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-400">{selectedGame.ageRating}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-400">{selectedGame.size}</span>
                        </div>
                      </div>
                      {getStatusBadge(selectedGame.status)}
                    </div>

                    <p className="text-gray-300 mb-6">{selectedGame.description}</p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {getStatusButton(selectedGame)}
                      <div className="flex items-center gap-2">
                        <button className="p-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors">
                          <Share2 className="h-5 w-5" />
                        </button>
                        <button className="p-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors">
                          <Heart className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screenshots Carousel */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-8 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Preview</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevScreenshot}
                      className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextScreenshot}
                      className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl">
                  <motion.div
                    key={currentScreenshotIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-video bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-2xl overflow-hidden"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Smartphone className="h-32 w-32 text-gray-700" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Image className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                          <span className="text-gray-500">Game Screenshot {currentScreenshotIndex + 1}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Screenshot Thumbnails */}
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {selectedGame.screenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentScreenshotIndex(index)}
                        className={`flex-shrink-0 w-20 h-12 rounded-lg transition-all ${currentScreenshotIndex === index ? 'ring-2 ring-cyan-500' : 'opacity-50 hover:opacity-100'}`}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-400">{index + 1}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features & Details */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">Features & Details</h2>
                <div className="space-y-6">
                  {selectedGame.features.map((featureCategory, catIndex) => (
                    <div key={catIndex}>
                      <h4 className="font-bold text-white mb-4 text-lg">{featureCategory.category}</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {featureCategory.items.map((feature, featIndex) => (
                          <div
                            key={featIndex}
                            className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-gray-700/50">
                                {feature.icon}
                              </div>
                              <span className="font-medium text-gray-200">{feature.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Game List */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-6 border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-4">More Games</h2>
                <div className="space-y-4">
                  {gamesData.map((game) => (
                    <motion.div
                      key={game.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => {
                          setSelectedGame(game);
                          setCurrentScreenshotIndex(0);
                          setExpandedGame(game.id);
                        }}
                        className={`w-full p-4 rounded-2xl transition-all text-left ${selectedGame.id === game.id ? 'bg-gray-800/50 border border-cyan-500/30' : 'bg-gray-800/30 border border-transparent hover:border-gray-700'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-1">
                            <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                              <Trophy className="h-8 w-8 text-cyan-400" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-white">{game.title}</h3>
                              {getStatusBadge(game.status)}
                            </div>
                            <p className="text-sm text-gray-400 mb-2">{game.shortDescription}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span>{game.category}</span>
                              <span>•</span>
                              <span>{game.size}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Star size={12} className="text-yellow-400" />
                                <span>{game.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-6 border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-4">Information</h2>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Developer</h4>
                    <p className="text-white font-medium">{selectedGame.developer}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Age</h4>
                    <p className="text-white font-medium">{selectedGame.ageRating}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Category</h4>
                    <p className="text-white font-medium">{selectedGame.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Updated</h4>
                    <p className="text-white font-medium">{selectedGame.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <section className="py-10 relative">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">All Games</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <Filter className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <Layout className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 overflow-hidden group hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="p-6">
                    {/* Game Icon and Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-1 flex-shrink-0">
                        <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                          <Trophy className="h-8 w-8 text-cyan-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-bold text-white text-lg">{game.title}</h3>
                          {getStatusBadge(game.status)}
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{game.shortDescription}</p>
                      </div>
                    </div>

                    {/* Rating and Downloads */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                          <span className="font-semibold text-white">{game.rating}</span>
                        </div>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-400">{game.downloads}</span>
                      </div>
                      <span className="text-sm text-gray-400">{game.size}</span>
                    </div>

                    {/* Install Button */}
                    <div className="mt-4">
                      {getStatusButton(game)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredGames.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-cyan-400 mb-6">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No games found</h3>
                <p className="text-gray-400 text-lg">Try adjusting your search terms or filters</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/60 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="h-4 w-4 text-gray-950" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                SX Games
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Premium gaming experiences with cutting-edge features
            </p>
            <div className="flex items-center justify-center gap-6 mb-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors p-2 hover:bg-cyan-500/10 rounded-lg"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © 2025 Shiva X Mods. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
