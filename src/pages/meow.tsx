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
  BookOpen,
  Menu,
  User,
  Bell,
  ChevronRight
} from 'lucide-react';

export default function CricketFusionHome() {
  const [activeNav, setActiveNav] = useState('home');

  const mainMenuOptions = [
    {
      title: 'Quick Match',
      icon: Zap,
      gradient: 'from-blue-600 to-cyan-500',
      border: 'border-cyan-400'
    },
    {
      title: 'Mod Creator',
      icon: Wand2,
      gradient: 'from-indigo-600 to-purple-500',
      border: 'border-purple-400'
    },
    {
      title: 'World Cup',
      icon: Trophy,
      gradient: 'from-blue-700 to-blue-500',
      border: 'border-blue-400'
    }
  ];

  const rightSideNav = [
    { icon: Info, label: 'Info', color: 'text-blue-400' },
    { icon: Award, label: 'Awards', color: 'text-yellow-400' },
    { icon: Gift, label: 'Gifts', color: 'text-green-400' }
  ];

  const bottomNavItems = [
    { icon: Home, label: 'Home' },
    { icon: Gamepad2, label: 'Modes' },
    { icon: Trophy, label: 'Tourney' },
    { icon: Store, label: 'Store' },
    { icon: Settings, label: 'Settings' }
  ];

  const quickActions = [
    { icon: Search, label: 'Search' },
    { icon: TrendingUp, label: 'Stats' },
    { icon: BookOpen, label: 'Guide' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Simple Header */}
      <header className="border-b border-blue-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl font-bold text-cyan-400">FUSION</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-blue-300" />
              <User className="w-5 h-5 text-blue-300" />
              <Menu className="w-5 h-5 text-blue-300" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-6">
        {/* Main Menu Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {mainMenuOptions.map((option) => (
            <button
              key={option.title}
              className={`bg-gradient-to-r ${option.gradient} rounded-xl p-6 border ${option.border} hover:opacity-90 transition-all text-left relative group`}
            >
              <option.icon className="w-8 h-8 text-white mb-3" />
              <h3 className="text-xl font-bold text-white">{option.title}</h3>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-800">
              <h3 className="text-lg font-semibold text-blue-200 mb-4">Quick</h3>
              <div className="flex gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className="flex-1 bg-blue-800/50 hover:bg-blue-700/50 rounded-lg p-4 border border-blue-700 transition-colors flex flex-col items-center gap-2"
                  >
                    <action.icon className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm font-medium text-blue-100">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Player Stats */}
            <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-blue-200">Stats</h3>
                <div className="flex items-center gap-2 bg-blue-800 px-3 py-1 rounded-full">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-bold">PRO</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-700">
                  <Coins className="w-4 h-4 text-yellow-400 mb-2" />
                  <div className="text-lg font-bold">12K</div>
                </div>
                <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-700">
                  <Star className="w-4 h-4 text-cyan-400 mb-2" />
                  <div className="text-lg font-bold">8K</div>
                </div>
                <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-700">
                  <Trophy className="w-4 h-4 text-yellow-500 mb-2" />
                  <div className="text-lg font-bold">147</div>
                </div>
                <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-700">
                  <Users className="w-4 h-4 text-purple-400 mb-2" />
                  <div className="text-lg font-bold">289</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            {/* Navigation */}
            <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-800">
              <h3 className="text-lg font-semibold text-blue-200 mb-4">Menu</h3>
              <div className="space-y-2">
                {rightSideNav.map((item) => (
                  <button
                    key={item.label}
                    className="w-full bg-blue-800/30 hover:bg-blue-700/30 rounded-lg p-4 border border-blue-700 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <span className="font-medium text-white">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Featured */}
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 border border-purple-500 hover:opacity-90 transition-opacity text-left">
              <Crown className="w-6 h-6 text-yellow-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Global Cup</h3>
              <span className="text-sm text-purple-200">Join now</span>
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-900/90 backdrop-blur rounded-full border border-blue-700 px-4 py-2">
          <div className="flex items-center gap-2">
            {bottomNavItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label.toLowerCase())}
                className={`p-3 rounded-full transition-colors ${
                  activeNav === item.label.toLowerCase()
                    ? 'bg-cyan-500 text-white'
                    : 'text-blue-300 hover:bg-blue-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </nav>

        {/* Status */}
        <div className="fixed top-4 right-4 bg-blue-900/90 backdrop-blur rounded-full border border-blue-700 px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs font-medium text-green-400">Live</span>
            </div>
            <Globe className="w-4 h-4 text-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
