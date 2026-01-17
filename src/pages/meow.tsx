'use client';

import { useState } from 'react';
import { 
  Zap,
  Wand2,
  Trophy,
  Home,
  Gamepad2,
  Settings,
  Store,
  Info,
  Award,
  Gift,
  Globe,
  Target,
  Sparkles,
  Search,
  TrendingUp,
  Coins,
  Shield,
  Star,
  Crown,
  Users,
  BookOpen
} from 'lucide-react';

export default function CricketFusionHome() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeNav, setActiveNav] = useState('home');

  const mainMenuOptions = [
    {
      title: 'Quick Match',
      subtitle: 'Instant Action',
      icon: Zap,
      gradient: 'from-blue-600 to-cyan-500',
      border: 'border-cyan-400',
      glow: 'shadow-blue-500/30',
      badge: 'HOT'
    },
    {
      title: 'Mod Creator',
      subtitle: 'Beta Access',
      icon: Wand2,
      gradient: 'from-indigo-600 to-purple-500',
      border: 'border-purple-400',
      glow: 'shadow-purple-500/30',
      badge: 'BETA'
    },
    {
      title: 'World Cup 2019',
      subtitle: 'Relive Classic',
      icon: Trophy,
      gradient: 'from-blue-700 to-blue-500',
      border: 'border-blue-400',
      glow: 'shadow-blue-600/30',
      badge: 'CLASSIC'
    }
  ];

  const rightSideNav = [
    { icon: Info, label: 'Game Info', color: 'text-blue-400' },
    { icon: Award, label: 'Achivements', badge: '5', color: 'text-yellow-400' },
    { icon: Gift, label: 'Reward', badge: 'NEW', color: 'text-green-400' }
  ];

  const bottomNavItems = [
    { icon: Home, label: 'Home' },
    { icon: Gamepad2, label: 'Modes' },
    { icon: Trophy, label: 'Tournament' },
    { icon: Store, label: 'Store' },
    { icon: Settings, label: 'Settings' }
  ];

  const quickActions = [
    { icon: Search, label: 'Search' },
    { icon: TrendingUp, label: 'Stats' },
    { icon: BookOpen, label: 'Guide' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/30 to-black text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-700/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-indigo-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header with Logo */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl rotate-45 flex items-center justify-center">
              <Target className="w-6 h-6 text-white -rotate-45" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              CRICKET FUSION
            </h1>
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl -rotate-45 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white rotate-45" />
            </div>
          </div>
          <p className="text-cyan-300 text-sm font-light tracking-widest">
            NEXT GEN CRICKET EXPERIENCE
          </p>
        </header>

        {/* Main Menu Options */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-200 mb-4 text-center">MAIN MENU</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mainMenuOptions.map((option) => (
              <div
                key={option.title}
                className={`bg-gradient-to-br ${option.gradient} rounded-2xl p-5 border-2 ${option.border} shadow-2xl ${option.glow} transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group relative overflow-hidden`}
              >
                {/* Badge */}
                {option.badge && (
                  <div className="absolute top-3 right-3 bg-white text-blue-700 px-2 py-1 rounded-full text-xs font-bold z-10">
                    {option.badge}
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                  <option.icon className="w-10 h-10 text-white mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-1">{option.title}</h3>
                  <p className="text-blue-100 text-sm">{option.subtitle}</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-30 transition-opacity">
                  <option.icon className="w-16 h-16 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {/* Left Side - Quick Actions & Player Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-800/50 to-cyan-800/30 rounded-2xl p-5 border-2 border-blue-600/50 shadow-xl shadow-blue-500/10">
              <h3 className="text-lg font-bold text-blue-200 mb-4">QUICK ACTIONS</h3>
              <div className="flex gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className="flex-1 bg-gradient-to-r from-blue-700 to-cyan-800 hover:from-blue-600 hover:to-cyan-700 rounded-xl p-4 border-2 border-cyan-500/30 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 group flex flex-col items-center gap-2"
                  >
                    <action.icon className="w-6 h-6 text-cyan-300 group-hover:text-white" />
                    <span className="text-sm font-semibold text-blue-100 group-hover:text-white">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Player Stats */}
            <div className="bg-gradient-to-br from-blue-900 to-cyan-900/50 rounded-2xl p-6 border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">PLAYER STATS</h3>
                  <p className="text-cyan-300 text-sm">Level 25 | Pro Player</p>
                </div>
                <div className="flex items-center gap-2 bg-blue-800/50 px-3 py-1 rounded-full">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-bold">PRO</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-800/30 rounded-xl p-4 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm text-blue-200">Coins</span>
                  </div>
                  <div className="text-2xl font-bold">12,450</div>
                </div>
                <div className="bg-blue-800/30 rounded-xl p-4 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm text-blue-200">XP</span>
                  </div>
                  <div className="text-2xl font-bold">8,240</div>
                </div>
                <div className="bg-blue-800/30 rounded-xl p-4 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-blue-200">Wins</span>
                  </div>
                  <div className="text-2xl font-bold">147</div>
                </div>
                <div className="bg-blue-800/30 rounded-xl p-4 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-blue-200">Matches</span>
                  </div>
                  <div className="text-2xl font-bold">289</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Navigation */}
          <div className="space-y-4">
            {/* Right Side Navigation */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900/50 rounded-2xl p-5 border-2 border-blue-600/50 shadow-xl shadow-blue-500/10">
              <h3 className="text-lg font-bold text-blue-200 mb-4">NAVIGATION</h3>
              <div className="space-y-3">
                {rightSideNav.map((item) => (
                  <button
                    key={item.label}
                    className="w-full bg-gradient-to-r from-blue-800/80 to-cyan-900/80 hover:from-blue-700 hover:to-cyan-800 rounded-xl p-4 border-2 border-blue-600/50 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 group relative overflow-hidden flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-blue-900/50 ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-white">
                        {item.label}
                      </span>
                    </div>
                    
                    {/* Badges */}
                    {item.badge && (
                      <span className="bg-white text-blue-700 text-xs w-7 h-7 rounded-full flex items-center justify-center font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Event */}
            <div className="bg-gradient-to-br from-indigo-700 to-purple-600 rounded-2xl p-5 border-2 border-purple-400/50 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <Crown className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-2">FEATURED EVENT</h3>
                <p className="text-purple-200 text-sm mb-3">Global Championship 2024</p>
                <button className="w-full bg-white text-indigo-700 hover:bg-gray-100 rounded-xl py-2 font-bold transition-colors duration-300">
                  JOIN NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-900/90 backdrop-blur-xl rounded-2xl border-2 border-cyan-500/50 shadow-2xl shadow-blue-500/25 px-6 py-3 z-50">
          <div className="flex items-center gap-6">
            {bottomNavItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label.toLowerCase())}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  activeNav === item.label.toLowerCase()
                    ? 'text-white scale-110'
                    : 'text-blue-300 hover:text-white'
                }`}
              >
                <div className={`p-3 rounded-xl transition-all duration-300 ${
                  activeNav === item.label.toLowerCase()
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-cyan-500/25'
                    : 'bg-blue-800/50'
                }`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Status Bar */}
        <div className="fixed top-4 right-4 bg-blue-900/90 backdrop-blur-xl rounded-xl border-2 border-cyan-500/50 shadow-lg shadow-blue-500/25 px-4 py-2 z-50">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-bold text-green-400">ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="font-bold">Global</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
