// src/pages/downloads.tsx
import { useState } from 'react';
import { Download, Clock, Zap, CheckCircle, ArrowRight, Star, Award, Users, Trophy, Shirt, Activity, Smile, Film, Globe, Volume2, Joystick, List, Flag, Coins, Home, ShoppingCart, AlertCircle, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Game {
  id: string;
  title: string;
  version: string;
  size: string;
  description: string;
  image: string;
  status: 'available' | 'coming-soon';
  downloadLink?: string;
  features: {
    category: string;
    items: {
      icon: React.ReactNode;
      text: string;
    }[];
  }[];
}

const gamesData: Game[] = [
  {
    id: 'cricket-fusion-x',
    title: 'Crick Fusion X',
    version: 'V2.0',
    size: '514.58 MB',
    description: 'The ultimate cricket gaming experience with groundbreaking features and complete realism',
    image: '/games/cricket-fusion-x.jpg',
    status: 'available',
    downloadLink: 'https://drive.google.com/file/d/14usS--oRdbJRBxL5JjWhZHHzuEhaZWYK/view?usp=drivesdk',
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
      },
      {
        category: 'Visual & Content',
        items: [
          { icon: <Film size={16} className="text-yellow-400" />, text: 'All new cut scenes (old ones removed)' },
          { icon: <Shirt size={16} className="text-yellow-400" />, text: 'Brand new jerseys (T20 & ODI)' },
          { icon: <Globe size={16} className="text-yellow-400" />, text: 'New Pakistan stadiums (Karachi, Lahore)' },
          { icon: <List size={16} className="text-yellow-400" />, text: 'New scorecard system' },
          { icon: <Flag size={16} className="text-yellow-400" />, text: 'New adboards and main menu design' }
        ]
      },
      {
        category: 'Economy System',
        items: [
          { icon: <Coins size={16} className="text-red-400" />, text: 'Unlimited coins/tickets' },
          { icon: <Coins size={16} className="text-red-400" />, text: '(Not everything unlocked)' }
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
      },
      {
        category: 'Mod Creator',
        items: [
          { icon: <Zap size={16} className="text-green-400" />, text: 'Advanced team customization' },
          { icon: <Film size={16} className="text-green-400" />, text: 'New scorecards for all tournaments' },
          { icon: <Volume2 size={16} className="text-green-400" />, text: 'New commentary & crowd sounds' },
          { icon: <Joystick size={16} className="text-green-400" />, text: 'Extra button in controls' }
        ]
      }
    ]
  }
];

export default function DownloadsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
           onClick={() => setSidebarOpen(false)}></div>
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800/90 backdrop-blur-lg border-r border-purple-800/30 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SX Store
            </h2>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <nav className="space-y-2">
            <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <Home size={18} /> Home
            </Link>
            <Link href="/store" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <ShoppingCart size={18} /> Store
            </Link>
            <Link href="/downloads" className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/30 hover:bg-purple-800/30 transition">
              <Zap size={18} /> Games
            </Link>
            <Link href="/community" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <Users size={18} /> Community
            </Link>
            <Link href="/status" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <AlertCircle size={18} /> Status
            </Link>
            <Link href="/membership" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <Star size={18} /> Membership
            </Link>
          </nav>
        </div>
      </div>

      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-40 border-b border-purple-800/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              SX Store
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="hover:text-purple-300 transition">Home</Link>
            <Link href="/store" className="hover:text-purple-300 transition">Store</Link>
            <Link href="/downloads" className="hover:text-purple-300 transition">Games</Link>
            <Link href="/community" className="hover:text-purple-300 transition">Community</Link>
            <Link href="/status" className="hover:text-purple-300 transition">Status</Link>
            <Link href="/membership" className="hover:text-purple-300 transition">Membership</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-lg">
            Premium Cricket Experiences
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent leading-tight">
            The Ultimate Cricket Simulation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience professional cricket with advanced features, stunning visuals, and complete customization
          </p>
        </section>

        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {gamesData.map(game => (
            <div key={game.id} className={`relative overflow-hidden rounded-2xl border ${game.status === 'available' ? 'border-green-500/30 hover:border-green-500' : 'border-purple-500/30 hover:border-purple-500'} transition-all hover:shadow-lg ${game.status === 'available' ? 'hover:shadow-green-500/20' : 'hover:shadow-purple-500/20'}`}>
              {/* Game Header */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 border-b border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">{game.title}</h2>
                    <div className="flex items-center mt-2 gap-4">
                      <span className="text-gray-400">Version {game.version}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{game.size}</span>
                    </div>
                  </div>
                  {game.status === 'coming-soon' ? (
                    <div className="bg-purple-600/80 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                      <Clock size={14} className="mr-1" /> Coming Soon
                    </div>
                  ) : (
                    <div className="bg-green-600/80 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                      <CheckCircle size={14} className="mr-1" /> Available
                    </div>
                  )}
                </div>
                <p className="mt-4 text-gray-300">{game.description}</p>
              </div>

              {/* Game Features */}
              <div className="p-6 bg-gray-800/50">
                <div className="space-y-8">
                  {game.features.map((featureCategory, catIndex) => (
                    <div key={catIndex}>
                      <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 flex items-center">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                          {featureCategory.category}
                        </span>
                      </h3>
                      <ul className="grid grid-cols-1 gap-3">
                        {featureCategory.items.map((feature, featIndex) => (
                          <li key={featIndex} className="flex items-start bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                            <span className="mt-0.5 mr-2 flex-shrink-0">
                              {feature.icon}
                            </span>
                            <span className="text-gray-300 text-sm">{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Download Button */}
                <div className="mt-8">
                  {game.status === 'available' ? (
                    <Link
                      href={game.downloadLink ?? '#'}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/20"
                    >
                      <Download size={18} /> Download Now (v{game.version})
                    </Link>
                  ) : (
                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 cursor-not-allowed opacity-80">
                      <Clock size={18} /> Coming Soon
                    </button>
                  )}
                </div>
              </div>

              {/* Ribbon for best version */}
              {game.id === 'cricket-fusion-x' && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs font-bold px-4 py-1 transform rotate-45 translate-x-12 -translate-y-1 shadow-md">
                  MOST POPULAR
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900/50 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SX Store</h3>
              <p className="text-gray-400 text-sm">
                Premium digital products for gaming enthusiasts. Get the best accounts, tools, and services.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-purple-300 transition text-sm">Home</Link></li>
                <li><Link href="/store" className="text-gray-400 hover:text-purple-300 transition text-sm">Store</Link></li>
                <li><Link href="/downloads" className="text-gray-400 hover:text-purple-300 transition text-sm">Games</Link></li>
                <li><Link href="/membership" className="text-gray-400 hover:text-purple-300 transition text-sm">Membership</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 hover:text-purple-300 transition text-sm">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-purple-300 transition text-sm">Privacy Policy</Link></li>
                <li><Link href="/refund" className="text-gray-400 hover:text-purple-300 transition text-sm">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22-.06-.32-.13-.1-.32-.02-.45.02-.2.06-3.39 2.14-4.84 3.06-.52.33-1 .5-1.43.5-.48 0-1.4-.27-2.08-.99-.75-.79-1.4-2.25-1.4-3.43 0-1.64 1.13-2.45 2.11-2.45.53 0 .98.18 1.38.4.25.15.47.33.68.55.23.23.46.46.75.68.32.25.7.38 1.12.38.42 0 .86-.13 1.23-.4 1.37-1.04 2.14-2.6 2.14-2.6.1-.2.25-.3.45-.3.1 0 .25.02.35.1.22.15.3.45.2.75z"/>
                  </svg>
                  <a href="https://t.me/lyastral" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                    @fluxon
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22-.06-.32-.13-.1-.32-.02-.45.02-.2.06-3.39 2.14-4.84 3.06-.52.33-1 .5-1.43.5-.48 0-1.4-.27-2.08-.99-.75-.79-1.4-2.25-1.4-3.43 0-1.64 1.13-2.45 2.11-2.45.53 0 .98.18 1.38.4.25.15.47.33.68.55.23.23.46.46.75.68.32.25.7.38 1.12.38.42 0 .86-.13 1.23-.4 1.37-1.04 2.14-2.6 2.14-2.6.1-.2.25-.3.45-.3.1 0 .25.02.35.1.22.15.3.45.2.75z"/>
                  </svg>
                  <a href="https://t.me/shivaxmods42" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                    @ShivaXD
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} SX Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
