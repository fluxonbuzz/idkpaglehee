'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Download, Clock, Zap, CheckCircle, Star, Award, Users, Trophy, 
  Shirt, Activity, Film, Globe, Volume2, Joystick, List, Flag, 
  Coins, Home, ShoppingCart, AlertCircle, X, ChevronDown, ChevronUp, 
  Search, Menu, Filter, Sparkles, Gamepad2, Crown, Heart
} from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface Game {
  id: string;
  title: string;
  version: string;
  size: string;
  description: string;
  image: string;
  status: 'available' | 'coming-soon' | 'beta';
  downloadLink?: string;
  rating: number;
  downloads: string;
  category: string;
  features: {
    category: string;
    items: {
      icon: React.ReactNode;
      text: string;
    }[];
  }[];
  tags?: string[];
}

const gamesData: Game[] = [
  {
    id: 'cricket-fusion-x',
    title: 'Crick Fusion X',
    version: 'V2.0',
    size: '514.58 MB',
    description: 'The ultimate cricket gaming experience with groundbreaking features',
    image: '/games/cricket-fusion-x.jpg',
    status: 'available',
    downloadLink: 'https://drive.google.com/file/d/14usS--oRdbJRBxL5JjWhZHHzuEhaZWYK/view?usp=drivesdk',
    rating: 4.8,
    downloads: '10K+',
    category: 'Cricket',
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
    id: 'cricket-fusion-wc19',
    title: 'Crick Fusion WC19',
    version: 'Beta Edition',
    size: 'Coming Soon',
    description: 'World Cup 2019 Edition - Compact version with stunning new features',
    image: '/games/cricket-fusion-wc19.jpg',
    status: 'beta',
    rating: 4.9,
    downloads: 'Pre-release',
    category: 'Cricket',
    tags: ['BETA', 'NOVEMBER RELEASE'],
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
    id: 'cricket-fusion',
    title: 'Crick Fusion',
    version: 'V1.0',
    size: 'Coming Soon',
    description: 'The legendary cricket experience - completely rebuilt with next-gen features',
    image: '/games/cricket-fusion.jpg',
    status: 'coming-soon',
    rating: 4.7,
    downloads: '50K+',
    category: 'Cricket',
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
    name: "Discord",
    href: "https://discord.gg/nY4hxDvfAb",
    icon: Gamepad2,
    color: "bg-indigo-600 hover:bg-indigo-700",
    description: "Join our relaunched community"
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

const pageLinks = [
  { name: "Store", href: "/store", icon: ShoppingCart, color: "from-green-500 to-emerald-500", description: "Premium Mods & Products" },
  { name: "Apply", href: "/apply", icon: Users, color: "from-blue-500 to-cyan-500", description: "Join Our Team" },
  { name: "Community", href: "/community", icon: Users, color: "from-purple-500 to-pink-500", description: "Connect with Players" },
  { name: "Games", href: "/games", icon: Gamepad2, color: "from-orange-500 to-red-500", description: "Supported Games" },
  { name: "Membership", href: "/membership", icon: Crown, color: "from-yellow-500 to-amber-500", description: "Exclusive Benefits" },
  { name: "Login", href: "/login", icon: LogIn, color: "from-gray-600 to-gray-700", description: "Access Your Account" },
  { name: "Register", href: "/register", icon: User, color: "from-indigo-500 to-purple-500", description: "Create Account" },
  { name: "Support", href: "/support", icon: AlertCircle, color: "from-cyan-500 to-blue-500", description: "Get Help & Support" },
  { name: "Testimonials", href: "/testimonials", icon: Star, color: "from-amber-500 to-orange-500", description: "User Reviews" },
  { name: "Privacy", href: "/privacy", icon: Shield, color: "from-green-600 to-emerald-600", description: "Privacy Policy" },
  { name: "Terms", href: "/terms", icon: FileText, color: "from-gray-500 to-gray-600", description: "Terms of Service" },
  { name: "Refund", href: "/refund", icon: DollarSign, color: "from-red-500 to-pink-500", description: "Refund Policy" }
];

export default function GamesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedGame, setExpandedGame] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const toggleFeatures = (gameId: string) => {
    setExpandedGame(expandedGame === gameId ? null : gameId);
  };

  const getStatusBadge = (status: Game['status']) => {
    switch (status) {
      case 'available':
        return (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            <CheckCircle size={12} className="inline mr-1" />
            Available
          </div>
        );
      case 'beta':
        return (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            <Sparkles size={12} className="inline mr-1" />
            Beta
          </div>
        );
      case 'coming-soon':
        return (
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            <Clock size={12} className="inline mr-1" />
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
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Download size={18} /> Install Now
          </Link>
        );
      case 'beta':
        return (
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg cursor-not-allowed opacity-90">
            <Clock size={18} /> Pre-register
          </button>
        );
      case 'coming-soon':
        return (
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg cursor-not-allowed opacity-90">
            <Clock size={18} /> Coming Soon
          </button>
        );
    }
  };

  const getCardGradient = (gameId: string) => {
    switch (gameId) {
      case 'cricket-fusion-x':
        return 'from-gray-800 via-cyan-900/20 to-gray-800 border-cyan-500/30';
      case 'cricket-fusion-wc19':
        return 'from-gray-800 via-orange-900/20 to-gray-800 border-orange-500/30';
      case 'cricket-fusion':
        return 'from-gray-800 via-purple-900/20 to-gray-800 border-purple-500/30';
      default:
        return 'from-gray-800 to-gray-900 border-gray-700';
    }
  };

  const filteredGames = gamesData.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black"></div>
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] opacity-40"
        />
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-cyan-500/20 rounded-lg"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="fixed w-full z-50 bg-gray-950/90 backdrop-blur-md border-b border-cyan-500/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <Zap className="h-6 w-6 text-gray-950 font-bold" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                SHIVA X
              </span>
              <span className="text-xs text-cyan-400 font-medium">REBORN 2025</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link href="/store" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              Store
            </Link>
            <Link href="/games" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              Games
            </Link>
            <Link href="/community" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="#community">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105">
                Join Telegram
              </button>
            </Link>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-y-0 right-0 z-50 w-80 bg-gray-900 border-l border-cyan-500/20 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-gray-950" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      SHIVA XD
                    </span>
                    <span className="text-xs text-cyan-400">REBORN 2025</span>
                  </div>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col p-6 space-y-2">
                {pageLinks.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium border border-transparent hover:border-cyan-500/20"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <page.icon className="h-5 w-5 mr-3" />
                    {page.name}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300">
                    Join Our Telegram
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-6 z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
              >
                <Gamepad2 className="h-4 w-4 mr-2 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">PREMIUM GAMING EXPERIENCE</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-black tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  OUR GAMES
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                Discover our collection of premium cricket games with cutting-edge features and stunning visuals
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-md mx-auto"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/80 border border-cyan-500/30 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-gray-800 transition-all shadow-lg text-white placeholder-gray-400"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Games Grid */}
        <section className="py-10 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br ${getCardGradient(game.id)} rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden transform hover:-translate-y-2 backdrop-blur-sm`}
                >
                  
                  {/* Game Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold text-white">{game.title}</h3>
                          {getStatusBadge(game.status)}
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">{game.description}</p>
                        
                        {/* Rating and Downloads */}
                        <div className="flex items-center gap-6 text-sm mb-4">
                          <div className="flex items-center gap-2 bg-gray-700/80 px-3 py-1 rounded-full shadow-lg">
                            <Star className="text-yellow-400" size={16} fill="currentColor" />
                            <span className="font-semibold text-white">{game.rating}</span>
                          </div>
                          <div className="bg-gray-700/80 px-3 py-1 rounded-full shadow-lg">
                            <span className="font-semibold text-white">{game.downloads}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Version and Size */}
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <span className="bg-gray-700/80 px-3 py-1 rounded-full text-gray-200">v{game.version}</span>
                      <span className="bg-gray-700/80 px-3 py-1 rounded-full text-gray-200">{game.size}</span>
                    </div>

                    {/* Tags */}
                    {game.tags && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {game.tags.map((tag, index) => (
                          <span key={index} className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Install Button */}
                    <div className="mb-4">
                      {getStatusButton(game)}
                    </div>

                    {/* Features Toggle */}
                    <button
                      onClick={() => toggleFeatures(game.id)}
                      className="w-full flex items-center justify-center gap-3 text-gray-400 hover:text-cyan-400 transition py-3 border-t border-gray-700/50"
                    >
                      {expandedGame === game.id ? (
                        <>
                          <ChevronUp size={18} />
                          <span className="font-semibold">Hide Features</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown size={18} />
                          <span className="font-semibold">Show Features</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Features Slide-down */}
                  <div className={`overflow-hidden transition-all duration-500 ${expandedGame === game.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6 border-t border-gray-700/50">
                      <div className="space-y-6 pt-4">
                        {game.features.map((featureCategory, catIndex) => (
                          <div key={catIndex}>
                            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider bg-gray-700/50 px-3 py-2 rounded-lg">
                              {featureCategory.category}
                            </h4>
                            <ul className="space-y-3">
                              {featureCategory.items.map((feature, featIndex) => (
                                <li key={featIndex} className="flex items-start gap-3 text-sm text-gray-200 bg-gray-700/70 p-3 rounded-xl shadow-lg">
                                  <span className="mt-0.5 flex-shrink-0">
                                    {feature.icon}
                                  </span>
                                  <span className="font-medium">{feature.text}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
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
                <p className="text-gray-400 text-lg">Try adjusting your search terms to find what you're looking for</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-20 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-1/4 top-0 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
            <div className="absolute right-1/4 bottom-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Join Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Community</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-gray-400"
              >
                Connect with us on our social platforms for updates and support
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} rounded-xl p-6 flex flex-col items-center text-center transition-all hover:shadow-lg hover:shadow-cyan-500/10 border border-transparent hover:border-cyan-500/20 h-full`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                      <social.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{social.name}</h3>
                    <p className="text-white/80 text-sm flex-grow">{social.description}</p>
                    <div className="mt-4 text-xs text-white/60">Click to join</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-cyan-500/20 bg-gray-900/60 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-all">
                  <Zap className="h-6 w-6 text-gray-950" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    SHIVA X
                  </span>
                  <span className="text-xs text-cyan-400 font-medium">REBORN 2025</span>
                </div>
              </Link>
              <p className="text-gray-400 text-sm">
                Premium gaming experiences with cutting-edge features
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/store" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Store
                  </Link>
                </li>
                <li>
                  <Link href="/games" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Games
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/updates" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Latest Updates
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Stay Connected</h4>
              <div className="flex items-center gap-4 mb-4">
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
              <p className="text-gray-500 text-sm">
                We're excited to have you back!
              </p>
            </div>
          </div>

          <div className="border-t border-cyan-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Shiva X Mods. We're back and here to stay.
            </p>
            <p className="text-gray-500 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 text-cyan-400 mx-1" /> by fluxon.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </div>
  );
}
