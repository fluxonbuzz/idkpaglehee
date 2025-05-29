// src/pages/downloads.tsx
import { useState } from 'react';
import { Download, Clock, Zap, CheckCircle, ArrowRight, Star, Award, Users, Trophy, Shirt, Activity, Smile, Film } from 'lucide-react';
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
    icon: React.ReactNode;
    text: string;
  }[];
}

const gamesData: Game[] = [
  {
    id: 'cricket-fusion-x',
    title: 'Crick Fusion X',
    version: 'V2.0',
    size: '2.8 GB',
    description: 'The next evolution in cricket gaming with groundbreaking features',
    image: '/games/cricket-fusion-x.jpg',
    status: 'available',
    downloadLink: '/downloads/cricket-fusion-x',
    features: [
      { icon: <Zap size={16} className="text-yellow-400" />, text: '300+ new shots with realistic physics' },
      { icon: <Film size={16} className="text-blue-400" />, text: 'Cinematic commentary system' },
      { icon: <Star size={16} className="text-purple-400" />, text: 'Zero-lag optimized graphics engine' },
      { icon: <Users size={16} className="text-green-400" />, text: '10-team auction system with impact player' },
      { icon: <Activity size={16} className="text-red-400" />, text: 'Suspense gameplay (boundary results hidden)' },
      { icon: <Trophy size={16} className="text-orange-400" />, text: 'All newu tournaments: IPL 25, T20WC 24, etc.' },
      { icon: <Shirt size={16} className="text-cyan-400" />, text: 'Authentic jerseys and player likenesses' },
      { icon: <Award size={16} className="text-pink-400" />, text: 'Mod Creator with scorecard customization' }
    ]
  },
  {
    id: 'cricket-fusion',
    title: 'Cricket Fusion',
    version: 'V1.0',
    size: 'Coming Soon',
    description: 'The original revolutionary cricket experience - next generation remake',
    image: '/games/cricket-fusion.jpg',
    status: 'coming-soon',
    features: [
      { icon: <Star size={16} className="text-yellow-400" />, text: 'Completely rebuilt from ground up' },
      { icon: <Film size={16} className="text-blue-400" />, text: 'New cinematic cutscenes and animations' },
      { icon: <Trophy size={16} className="text-purple-400" />, text: 'Enhanced tournament celebrations' },
      { icon: <Smile size={16} className="text-green-400" />, text: 'Updated player faces and heights' },
      { icon: <Activity size={16} className="text-red-400" />, text: 'Realistic stats and edge probabilities' },
      { icon: <Award size={16} className="text-orange-400" />, text: 'Dynamic new UI/UX interface' },
      { icon: <Users size={16} className="text-cyan-400" />, text: 'Advanced team management systems' },
      { icon: <Shirt size={16} className="text-pink-400" />, text: 'Exclusive classic jerseys collection' }
    ]
  }
];

export default function DownloadsPage() {
  const [activeTab, setActiveTab] = useState<'available' | 'coming-soon'>('available');
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            SX Cricket Games
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
            Premium Cricket Experiences
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Download the most advanced cricket simulation games ever created
          </p>
        </section>

        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {gamesData.map(game => (
            <div key={game.id} className={`bg-gray-800 rounded-xl overflow-hidden border ${game.status === 'available' ? 'border-green-500/30 hover:border-green-500' : 'border-purple-500/30 hover:border-purple-500'} transition-all hover:shadow-lg ${game.status === 'available' ? 'hover:shadow-green-500/10' : 'hover:shadow-purple-500/10'}`}>
              <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-800 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {game.title} {game.version}
                  </span>
                </div>
                {game.status === 'coming-soon' ? (
                  <div className="absolute top-4 right-4 bg-purple-600 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <Clock size={14} className="mr-1" /> Coming Soon
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 bg-green-600 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <CheckCircle size={14} className="mr-1" /> Available Now
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{game.title}</h3>
                    <p className="text-gray-400">Version {game.version} • {game.size}</p>
                  </div>
                  <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {game.status === 'available' ? 'Download Ready' : 'In Development'}
                  </div>
                </div>
                <p className="text-gray-300 mb-5">{game.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3 flex items-center text-lg">
                    <Zap size={18} className="mr-2 text-yellow-400" /> Key Features
                  </h4>
                  <ul className="space-y-3">
                    {game.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="mt-0.5 mr-2 flex-shrink-0">
                          {feature.icon}
                        </span>
                        <span className="text-gray-300">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {game.status === 'available' ? (
                  <Link
                    href={game.downloadLink ?? '#'}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded transition flex items-center justify-center gap-2"
                  >
                    <Download size={18} /> Download Now (v{game.version})
                  </Link>
                ) : (
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition flex items-center justify-center gap-2 cursor-not-allowed opacity-80">
                    <Clock size={18} /> Coming Q4 2024
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <section className="bg-gray-800/50 rounded-xl p-8 mb-16 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">Cricket Fusion X V2 Exclusive Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                  <Activity size={20} className="text-blue-400" />
                </div>
                <h3 className="font-bold">Realistic Gameplay</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Enhanced edge probabilities, ball physics, and unpredictable outcomes that mirror real cricket.
              </p>
            </div>
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                  <Award size={20} className="text-purple-400" />
                </div>
                <h3 className="font-bold">Mod Creator</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Full customization of teams, tournaments, scorecards, and player attributes with our powerful mod tools.
              </p>
            </div>
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-green-500/20 p-2 rounded-full mr-3">
                  <Trophy size={20} className="text-green-400" />
                </div>
                <h3 className="font-bold">Complete Tournaments</h3>
              </div>
              <p className="text-gray-300 text-sm">
                All official formats including IPL 2025, T20 World Cup 2024, Champions Trophy with authentic rules.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-8 border border-purple-500/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Get Early Access to Cricket Fusion V1</h2>
            <p className="text-gray-300 mb-6">Sign up for beta testing and be the first to experience the remake of the classic</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2">
                <ArrowRight size={18} /> Join Beta List
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">We'll notify you when beta testing begins</p>
          </div>
        </section>
      </main>
    </div>
  );
}
