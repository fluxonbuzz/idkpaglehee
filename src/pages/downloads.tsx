// src/pages/downloads.tsx
import { useState } from 'react';
import { Download, Clock, Zap, CheckCircle, ArrowRight, Star, Award, Users, Trophy, Shirt, Activity, Smile, Film, Globe, Volume2, Joystick, List, Flag, Coins, Cricket } from 'lucide-react';
import Link from 'next/link';

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
          { icon: <Cricket size={16} className="text-green-400" />, text: 'New bowling actions' },
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
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            SX Games
          </Link>
          <nav className="flex gap-6">
            <Link href="/store" className="hover:text-blue-400 transition">Store</Link>
            <Link href="/downloads" className="text-blue-400 font-medium">Downloads</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="inline-block bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
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

        {/* Feature Highlights */}
        <section className="mb-20 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Why Choose Crick Fusion X?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                  <Volume2 size={20} className="text-blue-400" />
                </div>
                <h3 className="font-bold text-lg">Immersive Audio</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Brand new commentary from Aakash and Siddhu with perfect volume balance, plus enhanced crowd sounds and stadium atmosphere.
              </p>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                  <Cricket size={20} className="text-purple-400" />
                </div>
                <h3 className="font-bold text-lg">Enhanced Gameplay</h3>
              </div>
              <p className="text-gray-300 text-sm">
                80+ new shots, realistic bowling actions, and super smooth gameplay mechanics for the most authentic cricket experience.
              </p>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-green-500/20 p-2 rounded-full mr-3">
                  <Trophy size={20} className="text-green-400" />
                </div>
                <h3 className="font-bold text-lg">Updated Tournaments</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Complete Champions Trophy 2025 with real fixtures, updated IPL 2024, and all new squads for authentic team lineups.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gradient-to-br from-purple-900/50 via-gray-800 to-blue-900/50 rounded-2xl p-8 border border-purple-500/30">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Stay Updated
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Get Notified About New Releases</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our mailing list to be the first to know about updates, new features, and upcoming versions
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2">
                <ArrowRight size={18} /> Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">We'll never spam you. Unsubscribe anytime.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} SX Games. All rights reserved.</p>
          <p className="mt-2">The most advanced cricket gaming experiences on mobile</p>
        </div>
      </footer>
    </div>
  );
}
