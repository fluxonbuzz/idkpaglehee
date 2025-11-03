// src/pages/games.tsx
import { useState } from 'react';
import { Download, Clock, Zap, CheckCircle, Star, Award, Users, Trophy, Shirt, Activity, Film, Globe, Volume2, Joystick, List, Flag, Coins, Home, ShoppingCart, AlertCircle, X, ChevronDown, ChevronUp, Search, Menu, Filter, Sparkles } from 'lucide-react';
import Link from 'next/link';

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

export default function GamesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedGame, setExpandedGame] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
        return 'from-gray-800 via-blue-900/20 to-gray-800 border-blue-500/30';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
      {/* Top Navigation */}
      <header className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700/60 sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SX Store
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/80 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-gray-800 transition-all shadow-lg text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-300 hover:text-purple-400 transition font-medium hover:scale-105">Home</Link>
              <Link href="/store" className="text-gray-300 hover:text-purple-400 transition font-medium hover:scale-105">Store</Link>
              <Link href="/games" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium px-4 py-2 rounded-lg transition transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                Games
              </Link>
              <Link href="/community" className="text-gray-300 hover:text-purple-400 transition font-medium hover:scale-105">Community</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-300 hover:text-purple-400 transition transform hover:scale-110"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
           onClick={() => setSidebarOpen(false)}>
        
        <div className={`fixed inset-y-0 left-0 w-80 bg-gradient-to-b from-gray-900 to-purple-900/30 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
             onClick={(e) => e.stopPropagation()}>
          
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SX Store
                </span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-purple-400 transition">
                <X size={24} />
              </button>
            </div>
            
            <nav className="space-y-3 flex-1">
              <Link href="/" className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-purple-400 shadow-lg" onClick={() => setSidebarOpen(false)}>
                <Home size={22} /> 
                <span className="font-medium">Home</span>
              </Link>
              <Link href="/store" className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-purple-400 shadow-lg" onClick={() => setSidebarOpen(false)}>
                <ShoppingCart size={22} /> 
                <span className="font-medium">Store</span>
              </Link>
              <Link href="/games" className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white transition shadow-lg" onClick={() => setSidebarOpen(false)}>
                <Zap size={22} /> 
                <span className="font-medium">Games</span>
              </Link>
              <Link href="/community" className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-purple-400 shadow-lg" onClick={() => setSidebarOpen(false)}>
                <Users size={22} /> 
                <span className="font-medium">Community</span>
              </Link>
              <Link href="/status" className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-purple-400 shadow-lg" onClick={() => setSidebarOpen(false)}>
                <AlertCircle size={22} /> 
                <span className="font-medium">Status</span>
              </Link>
            </nav>

            <div className="pt-6 border-t border-purple-700">
              <div className="text-sm text-purple-400 font-medium">
                © {new Date().getFullYear()} SX Store
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
            🎮 Premium Gaming Experience
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Discover Amazing Games
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our collection of premium cricket games with cutting-edge features and stunning visuals
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <div key={game.id} className={`bg-gradient-to-br ${getCardGradient(game.id)} rounded-3xl shadow-2xl hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden transform hover:-translate-y-2`}>
              
              {/* Game Header with Gradient */}
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
                  className="w-full flex items-center justify-center gap-3 text-gray-400 hover:text-purple-400 transition py-3 border-t border-gray-700/50"
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
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <div className="text-purple-400 mb-6">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No games found</h3>
            <p className="text-gray-400 text-lg">Try adjusting your search terms to find what you're looking for</p>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-gray-900 to-purple-900/50 border-t border-gray-800 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-2xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SX Games
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium digital products for gaming enthusiasts. Get the best accounts, tools, and services with cutting-edge features.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-purple-400 transition hover:translate-x-1 block">Home</Link></li>
                <li><Link href="/store" className="text-gray-400 hover:text-purple-400 transition hover:translate-x-1 block">Store</Link></li>
                <li><Link href="/games" className="text-gray-400 hover:text-purple-400 transition hover:translate-x-1 block">Games</Link></li>
                <li><Link href="/community" className="text-gray-400 hover:text-purple-400 transition hover:translate-x-1 block">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/terms" className="text-gray-400 hover:text-purple-400 transition hover:translate-x-1 block">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition hover:translate-x-1 block">Privacy Policy</Link></li>
                <li><Link href="/refund" className="text-gray-400 hover:text-purple-400 transition hover:translate-x-1 block">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Contact</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Sparkles size={16} className="text-purple-400" />
                  @fluxon
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles size={16} className="text-purple-400" />
                  @ShivaXD
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} SX Store. All rights reserved. Made with ❤️ for gamers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
