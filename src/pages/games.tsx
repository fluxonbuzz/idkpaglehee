// src/pages/games.tsx
import { useState } from 'react';
import { Download, Clock, Zap, CheckCircle, Star, Award, Users, Trophy, Shirt, Activity, Film, Globe, Volume2, Joystick, List, Flag, Coins, Home, ShoppingCart, AlertCircle, X, ChevronDown, ChevronUp, Search, Menu, Filter } from 'lucide-react';
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
          <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Available
          </div>
        );
      case 'beta':
        return (
          <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Beta
          </div>
        );
      case 'coming-soon':
        return (
          <div className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
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
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 text-sm"
          >
            <Download size={16} /> Install
          </Link>
        );
      case 'beta':
        return (
          <button className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm cursor-not-allowed">
            <Clock size={16} /> Pre-register
          </button>
        );
      case 'coming-soon':
        return (
          <button className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm cursor-not-allowed">
            <Clock size={16} /> Coming Soon
          </button>
        );
    }
  };

  const filteredGames = gamesData.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SX</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SX Store
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-purple-600 transition font-medium">Home</Link>
              <Link href="/store" className="text-gray-600 hover:text-purple-600 transition font-medium">Store</Link>
              <Link href="/games" className="text-purple-600 font-medium">Games</Link>
              <Link href="/community" className="text-gray-600 hover:text-purple-600 transition font-medium">Community</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-600 hover:text-purple-600 transition"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
           onClick={() => setSidebarOpen(false)}>
        
        <div className={`fixed inset-y-0 left-0 w-80 bg-white transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
             onClick={(e) => e.stopPropagation()}>
          
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SX</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  SX Store
                </span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <nav className="space-y-2 flex-1">
              <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700" onClick={() => setSidebarOpen(false)}>
                <Home size={20} /> Home
              </Link>
              <Link href="/store" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700" onClick={() => setSidebarOpen(false)}>
                <ShoppingCart size={20} /> Store
              </Link>
              <Link href="/games" className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 text-purple-600 transition" onClick={() => setSidebarOpen(false)}>
                <Zap size={20} /> Games
              </Link>
              <Link href="/community" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700" onClick={() => setSidebarOpen(false)}>
                <Users size={20} /> Community
              </Link>
              <Link href="/status" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700" onClick={() => setSidebarOpen(false)}>
                <AlertCircle size={20} /> Status
              </Link>
            </nav>

            <div className="pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} SX Store
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Games</h1>
          <p className="text-gray-600">Discover amazing cricket gaming experiences</p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div key={game.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
              {/* Game Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{game.title}</h3>
                      {getStatusBadge(game.status)}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{game.description}</p>
                    
                    {/* Rating and Downloads */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-400" size={16} fill="currentColor" />
                        <span>{game.rating}</span>
                      </div>
                      <span>{game.downloads} downloads</span>
                    </div>
                  </div>
                </div>

                {/* Version and Size */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>Version {game.version}</span>
                  <span>•</span>
                  <span>{game.size}</span>
                </div>

                {/* Tags */}
                {game.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.tags.map((tag, index) => (
                      <span key={index} className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
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
                  className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-purple-600 transition py-2 border-t border-gray-100"
                >
                  {expandedGame === game.id ? (
                    <>
                      <ChevronUp size={16} />
                      <span className="text-sm font-medium">Hide Features</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      <span className="text-sm font-medium">Show Features</span>
                    </>
                  )}
                </button>
              </div>

              {/* Features Slide-down */}
              <div className={`overflow-hidden transition-all duration-300 ${expandedGame === game.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="space-y-6 pt-4">
                    {game.features.map((featureCategory, catIndex) => (
                      <div key={catIndex}>
                        <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                          {featureCategory.category}
                        </h4>
                        <ul className="space-y-2">
                          {featureCategory.items.map((feature, featIndex) => (
                            <li key={featIndex} className="flex items-start gap-3 text-sm text-gray-600">
                              <span className="mt-0.5 flex-shrink-0">
                                {feature.icon}
                              </span>
                              <span>{feature.text}</span>
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
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No games found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">SX Games</h3>
              <p className="text-gray-600 text-sm">
                Premium digital products for gaming enthusiasts. Get the best accounts, tools, and services.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-600 hover:text-purple-600 transition text-sm">Home</Link></li>
                <li><Link href="/store" className="text-gray-600 hover:text-purple-600 transition text-sm">Store</Link></li>
                <li><Link href="/games" className="text-gray-600 hover:text-purple-600 transition text-sm">Games</Link></li>
                <li><Link href="/community" className="text-gray-600 hover:text-purple-600 transition text-sm">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-600 hover:text-purple-600 transition text-sm">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-purple-600 transition text-sm">Privacy Policy</Link></li>
                <li><Link href="/refund" className="text-gray-600 hover:text-purple-600 transition text-sm">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>@fluxon</li>
                <li>@ShivaXD</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} SX Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
