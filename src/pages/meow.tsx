'use client';

import { useState } from 'react';
import { 
  Trophy, 
  Users, 
  Settings, 
  Star,
  Crown,
  Gift,
  Sword,
  BookOpen,
  User,
  Target,
  Sparkles,
  Coins,
  Shield,
  Zap,
  Clock,
  Award,
  TrendingUp,
  Search,
  Book,
  HelpCircle,
  UserCheck,
  Home,
  ShoppingBag,
  Gamepad2
} from 'lucide-react';

export default function CricketFusionHome() {
  const [activeTab, setActiveTab] = useState('quests');
  const [activeNav, setActiveNav] = useState('home');

  const mainPanels = [
    {
      title: 'Tournament Factory',
      subtitle: 'Create & Join',
      icon: Trophy,
      gradient: 'from-red-600 to-rose-700',
      border: 'border-rose-500',
      glow: 'shadow-rose-500/25',
      badge: 'NEW'
    },
    {
      title: 'Quick Match',
      subtitle: 'Instant Action',
      icon: Zap,
      gradient: 'from-crimson-600 to-red-700',
      border: 'border-crimson-500',
      glow: 'shadow-crimson-500/25',
      badge: 'HOT'
    },
    {
      title: 'Test Match',
      subtitle: 'Classic Format',
      icon: Clock,
      gradient: 'from-red-700 to-rose-800',
      border: 'border-red-600',
      glow: 'shadow-red-500/25',
      badge: 'PRO'
    },
    {
      title: 'Ongoing Tournament',
      subtitle: 'Champions Cup',
      icon: Crown,
      gradient: 'from-rose-700 to-red-800',
      border: 'border-rose-600',
      glow: 'shadow-rose-600/25',
      badge: 'LIVE'
    }
  ];

  const sidebarButtons = [
    { icon: Gift, label: 'Daily Rewards', badge: '3' },
    { icon: Star, label: 'Subscription', premium: true },
    { icon: Sparkles, label: 'Super Offers', badge: '!' },
    { icon: Coins, label: 'Currency Discount', discount: '50%' },
    { icon: Trophy, label: 'Tournament Discount', discount: '30%' },
    { icon: Users, label: 'Update Squad', badge: 'NEW' }
  ];

  const menuTabs = [
    { name: 'Quests', icon: Target },
    { name: 'Missions', icon: Award },
    { name: 'Profile', icon: UserCheck },
    { name: 'Tips', icon: HelpCircle },
    { name: 'Settings', icon: Settings }
  ];

  const bottomNavItems = [
    { icon: Home, label: 'Home' },
    { icon: Gamepad2, label: 'Modes' },
    { icon: ShoppingBag, label: 'Store' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/50 to-black text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-rose-700/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-crimson-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header with Logo */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl rotate-45 flex items-center justify-center">
              <Sword className="w-6 h-6 text-white -rotate-45" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">
              CRICK FUSION
            </h1>
            <div className="w-12 h-12 bg-gradient-to-r from-rose-700 to-red-600 rounded-2xl -rotate-45 flex items-center justify-center">
              <Target className="w-6 h-6 text-white rotate-45" />
            </div>
          </div>
          <p className="text-red-300 text-sm font-light tracking-widest">
            THE ULTIMATE CRICKET EXPERIENCE
          </p>
        </header>

        {/* Menu Tabs with Icons */}
        <nav className="mb-8">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide justify-center">
            {menuTabs.map((tab) => (
              <button
                key={tab.name}
                className={`flex items-center gap-2 flex-shrink-0 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.name.toLowerCase()
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-lg shadow-red-500/25'
                    : 'bg-red-900/50 text-red-200 hover:bg-red-800/50 hover:text-white'
                }`}
                onClick={() => setActiveTab(tab.name.toLowerCase())}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {/* Left Side - Main Panels */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {mainPanels.map((panel, index) => (
              <div
                key={panel.title}
                className={`bg-gradient-to-br ${panel.gradient} rounded-2xl p-4 border-2 ${panel.border} shadow-2xl ${panel.glow} transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group relative overflow-hidden`}
              >
                {/* Badge */}
                {panel.badge && (
                  <div className="absolute top-3 right-3 bg-white text-red-700 px-2 py-1 rounded-full text-xs font-bold z-10">
                    {panel.badge}
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                  <panel.icon className="w-8 h-8 text-white mb-2" />
                  <h3 className="text-xl font-bold text-white mb-1">{panel.title}</h3>
                  <p className="text-red-100 text-sm">{panel.subtitle}</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-30 transition-opacity">
                  <panel.icon className="w-16 h-16 text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Cricket Player & Sidebar */}
          <div className="space-y-4">
            {/* Cricket Player Display */}
            <div className="bg-gradient-to-br from-red-800 to-rose-900 rounded-2xl p-6 border-2 border-rose-600 shadow-2xl shadow-rose-500/25 relative overflow-hidden min-h-64 flex items-center justify-center">
              {/* Player Silhouette with Red Highlights */}
              <div className="relative">
                <div className="w-32 h-40 bg-gradient-to-b from-red-600 to-rose-700 rounded-full opacity-20 absolute inset-0 blur-xl"></div>
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-white to-red-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl shadow-red-500/50">
                    <div className="w-4 h-12 bg-red-800 rounded-full rotate-45 transform origin-bottom"></div>
                  </div>
                  <div className="text-white font-bold text-lg">BATSMAN</div>
                  <div className="text-red-200 text-sm">READY TO STRIKE</div>
                </div>
              </div>

              {/* Dynamic Elements */}
              <div className="absolute bottom-4 left-4 bg-red-700/80 rounded-lg px-3 py-1 text-xs font-semibold">
                ENERGY: 100%
              </div>
              <div className="absolute top-4 right-4 bg-rose-600/80 rounded-lg px-3 py-1 text-xs font-semibold">
                LEVEL 25
              </div>
            </div>

            {/* Sidebar Buttons */}
            <div className="space-y-3">
              {sidebarButtons.map((button, index) => (
                <button
                  key={button.label}
                  className={`w-full bg-gradient-to-r from-red-700 to-rose-800 hover:from-red-600 hover:to-rose-700 rounded-xl p-3 border-2 border-rose-600 shadow-lg shadow-rose-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden flex items-center justify-between ${
                    button.premium ? 'border-yellow-400 shadow-yellow-500/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button.icon className={`w-5 h-5 ${
                      button.premium ? 'text-yellow-400' : 'text-white'
                    }`} />
                    <span className={`font-semibold ${
                      button.premium ? 'text-yellow-400' : 'text-white'
                    }`}>
                      {button.label}
                    </span>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    {button.discount && (
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                        {button.discount}
                      </span>
                    )}
                    {button.badge && (
                      <span className="bg-white text-red-700 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                        {button.badge}
                      </span>
                    )}
                    {button.premium && (
                      <Crown className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Home, Modes, Store */}
        <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-900/90 backdrop-blur-xl rounded-2xl border-2 border-rose-600 shadow-2xl shadow-rose-500/25 px-6 py-3 z-50">
          <div className="flex items-center gap-8">
            {bottomNavItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label.toLowerCase())}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  activeNav === item.label.toLowerCase()
                    ? 'text-white scale-110'
                    : 'text-red-300 hover:text-white'
                }`}
              >
                <div className={`p-3 rounded-xl transition-all duration-300 ${
                  activeNav === item.label.toLowerCase()
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 shadow-lg shadow-red-500/25'
                    : 'bg-red-800/50'
                }`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Status Bar */}
        <div className="fixed top-4 right-4 bg-red-900/90 backdrop-blur-xl rounded-xl border-2 border-rose-600 shadow-lg shadow-rose-500/25 px-4 py-2 z-50">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="font-bold">12,450</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-blue-400" />
              <span className="font-bold">850</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="font-bold">PRO</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="fixed top-4 left-4 bg-red-900/90 backdrop-blur-xl rounded-xl border-2 border-rose-600 shadow-lg shadow-rose-500/25 px-4 py-2 z-50">
          <div className="flex items-center gap-3">
            <button className="p-2 bg-red-700 rounded-lg hover:bg-red-600 transition-colors">
              <BookOpen className="w-5 h-5" />
            </button>
            <button className="p-2 bg-red-700 rounded-lg hover:bg-red-600 transition-colors">
              <TrendingUp className="w-5 h-5" />
            </button>
            <button className="p-2 bg-red-700 rounded-lg hover:bg-red-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(244, 63, 94, 0.3); }
          50% { box-shadow: 0 0 30px rgba(244, 63, 94, 0.6); }
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
