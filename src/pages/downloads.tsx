// src/pages/downloads.tsx
import { useState } from 'react';
import { Download, Clock, Zap, CheckCircle, ArrowRight } from 'lucide-react';
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
  features: string[];
}

const gamesData: Game[] = [
  {
    id: 'cricket-fusion',
    title: 'Cricket Fusion',
    version: '2.5.3',
    size: '1.2 GB',
    description: 'The ultimate cricket experience with realistic gameplay and stunning graphics',
    image: '/games/cricket-fusion.jpg',
    status: 'available',
    downloadLink: '/downloads/cricket-fusion',
    features: [
      'Realistic physics engine',
      '100+ licensed players',
      'Multiplayer mode',
      'Custom tournaments'
    ]
  },
  {
    id: 'cricket-fusion-x',
    title: 'Cricket Fusion X',
    version: 'Coming Soon',
    size: 'TBA',
    description: 'Next-gen cricket simulation with enhanced AI and VR support',
    image: '/games/cricket-fusion-x.jpg',
    status: 'coming-soon',
    features: [
      'VR compatibility',
      'Advanced AI opponents',
      'Dynamic weather system',
      '4K HDR graphics'
    ]
  }
];

export default function DownloadsPage() {
  const [activeTab, setActiveTab] = useState<'available' | 'coming-soon'>('available');

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
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            Game Downloads
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get the latest versions of our premium cricket games
          </p>
        </section>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-6 py-3 font-medium ${activeTab === 'available' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            Available Now
          </button>
          <button
            onClick={() => setActiveTab('coming-soon')}
            className={`px-6 py-3 font-medium ${activeTab === 'coming-soon' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            Coming Soon
          </button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {gamesData
            .filter(game => game.status === activeTab)
            .map(game => (
              <div key={game.id} className={`bg-gray-800 rounded-xl overflow-hidden border ${game.status === 'available' ? 'border-green-500/30 hover:border-green-500' : 'border-purple-500/30 hover:border-purple-500'} transition-all hover:shadow-lg ${game.status === 'available' ? 'hover:shadow-green-500/10' : 'hover:shadow-purple-500/10'}`}>
                <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-800 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-xl font-bold">{game.title}</span>
                  </div>
                  {game.status === 'coming-soon' && (
                    <div className="absolute top-4 right-4 bg-purple-600 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                      <Clock size={14} className="mr-1" /> Coming Soon
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{game.title}</h3>
                      <p className="text-gray-400">{game.version} • {game.size}</p>
                    </div>
                    {game.status === 'available' && (
                      <span className="flex items-center bg-green-500/20 text-green-400 text-sm px-3 py-1 rounded-full">
                        <CheckCircle size={14} className="mr-1" /> Available
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-5">{game.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3 flex items-center">
                      <Zap size={18} className="mr-2 text-yellow-400" /> Key Features
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {game.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {game.status === 'available' ? (
                    <Link
                      href={game.downloadLink || '#'}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded transition flex items-center justify-center gap-2"
                    >
                      <Download size={18} /> Download Now
                    </Link>
                  ) : (
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition flex items-center justify-center gap-2 cursor-not-allowed opacity-80">
                      <Clock size={18} /> Notify Me When Available
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Newsletter */}
        <section className="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Get Early Access</h2>
            <p className="text-gray-300 mb-6">Be the first to know when Cricket Fusion X launches and get exclusive beta access</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2">
                <ArrowRight size={18} /> Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
