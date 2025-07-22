import { useState, useEffect } from 'react';
import { 
  Home, Users, Download, ShoppingCart, Star, Play, ChevronRight, 
  Menu, X, Gamepad2, Zap, Shield, Crown, TrendingUp, Award, 
  Instagram, Youtube, MessageSquare, Send, ArrowRight, 
  CheckCircle, Globe, Heart, Code, Sparkles
} from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { label: 'Community Members', value: '15K+', icon: Users, color: 'from-cyan-500 to-blue-500' },
    { label: 'Total Downloads', value: '50K+', icon: Download, color: 'from-purple-500 to-pink-500' },
    { label: 'Premium Mods', value: '5+', icon: Crown, color: 'from-amber-500 to-orange-500' },
    { label: 'Supported Games', value: '10+', icon: Gamepad2, color: 'from-green-500 to-emerald-500' }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized mods with zero lag and maximum performance',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All mods tested and verified for complete safety',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: Crown,
      title: 'Premium Quality',
      description: '4K textures and professional-grade modifications',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connect with cricket gaming enthusiasts worldwide',
      gradient: 'from-blue-400 to-cyan-500'
    }
  ];

  const mods = [
    {
      id: 1,
      name: 'Cricket Fusion X',
      category: 'Premium',
      image: '/api/placeholder/300/200',
      downloads: '12K+',
      rating: 4.9,
      price: 'Free',
      isPremium: true,
      description: 'Revolutionary cricket gaming experience with enhanced physics'
    },
    {
      id: 2,
      name: 'Stadium Pack Pro',
      category: 'Graphics',
      image: '/api/placeholder/300/200',
      downloads: '8K+',
      rating: 4.8,
      price: '₹299',
      isPremium: true,
      description: 'Realistic stadiums from around the world'
    },
    {
      id: 3,
      name: 'Player Texture HD',
      category: 'Visual',
      image: '/api/placeholder/300/200',
      downloads: '15K+',
      rating: 4.7,
      price: 'Free',
      isPremium: false,
      description: 'Ultra-high definition player models and textures'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Shiva X Mods
                </h1>
                <p className="text-xs text-gray-400">Premium Cricket Gaming</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">Home</a>
              <a href="#mods" className="text-gray-300 hover:text-white transition-colors duration-200">Mods</a>
              <a href="#store" className="text-gray-300 hover:text-white transition-colors duration-200">Store</a>
              <a href="#community" className="text-gray-300 hover:text-white transition-colors duration-200">Community</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-2 rounded-full text-white font-medium transition-all duration-200 shadow-lg hover:shadow-cyan-500/25">
                Join Discord
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-xl border-t border-gray-700/50">
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className="block py-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200">Home</a>
              <a href="#mods" className="block py-2 text-gray-300 hover:text-white transition-colors duration-200">Mods</a>
              <a href="#store" className="block py-2 text-gray-300 hover:text-white transition-colors duration-200">Store</a>
              <a href="#community" className="block py-2 text-gray-300 hover:text-white transition-colors duration-200">Community</a>
              <a href="#contact" className="block py-2 text-gray-300 hover:text-white transition-colors duration-200">Contact</a>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-3 rounded-full text-white font-medium transition-all duration-200 shadow-lg hover:shadow-cyan-500/25">
                Join Discord
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Premium Cricket Gaming Experience
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Elevate Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Cricket Gaming
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience the most advanced cricket game modifications with stunning 4K visuals, 
            realistic gameplay mechanics, and a thriving community of 15K+ players worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full text-white font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30 transform hover:scale-105">
              <span className="flex items-center">
                Download Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </button>
            <button className="group px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 rounded-full text-white font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
              <span className="flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-200`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Why Choose Shiva X Mods?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We deliver premium cricket gaming modifications that transform your gaming experience with cutting-edge technology and unmatched quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mods Section */}
      <section id="mods" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
              <Crown className="w-4 h-4 mr-2" />
              Featured Modifications
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Premium Mod Collection
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our most popular and innovative cricket game modifications, crafted with precision and tested by thousands of players.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mods.map((mod) => (
              <div key={mod.id} className="group relative">
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
                  {/* Mod Image */}
                  <div className="relative h-48 bg-gradient-to-r from-gray-700 to-gray-600 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                    {mod.isPremium && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-xs font-medium">
                        <Crown className="w-3 h-3 inline mr-1" />
                        Premium
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white text-sm">
                      <Download className="w-4 h-4" />
                      <span>{mod.downloads}</span>
                    </div>
                  </div>

                  {/* Mod Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-medium rounded-full">
                        {mod.category}
                      </span>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-white text-sm ml-1">{mod.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{mod.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{mod.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        {mod.price}
                      </span>
                      <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 text-white font-semibold rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-105">
              View All Mods
              <ChevronRight className="w-5 h-5 inline ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Join Our Community
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with passionate cricket gamers, share your gameplay, get support, and stay updated with the latest mods and features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MessageSquare, label: 'Discord', count: '15K+ Members', color: 'from-indigo-500 to-purple-500', href: 'https://discord.gg/nY4hxDvfAb' },
              { icon: Send, label: 'Telegram', count: '8K+ Subscribers', color: 'from-cyan-500 to-blue-500', href: 'https://t.me/shivaxmods' },
              { icon: Youtube, label: 'YouTube', count: '25K+ Views', color: 'from-red-500 to-pink-500', href: 'https://youtube.com/@shivaxmods' },
              { icon: Instagram, label: 'Instagram', count: '5K+ Followers', color: 'from-pink-500 to-rose-500', href: 'https://instagram.com/shivaxmods' }
            ].map((platform, index) => (
              <a 
                key={index}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <platform.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{platform.label}</h3>
                  <p className="text-gray-300">{platform.count}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-gray-600/30 rounded-3xl p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Ready to Transform Your Game?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of players who have already enhanced their cricket gaming experience with our premium mods.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-lg rounded-full transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30 hover:scale-105">
                  Get Started Now
                </button>
                <button className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 text-white font-semibold text-lg rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-105">
                  Browse Store
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800/50 backdrop-blur-lg border-t border-gray-700/50 py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Gamepad2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Shiva X Mods
                  </h3>
                  <p className="text-gray-400">Premium Cricket Gaming</p>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Elevating cricket gaming experiences with cutting-edge modifications, stunning visuals, and an amazing community.
              </p>
              <p className="text-gray-400 text-sm">
                Created by <span className="text-cyan-400 font-medium">@Fluxon</span>
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="#home" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">Home</a></li>
                <li><a href="#mods" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">Mods</a></li>
                <li><a href="#store" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">Store</a></li>
                <li><a href="#community" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">Community</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Contact</h3>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:sendsomegreens@gmail.com" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm">
                    sendsomegreens@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://t.me/shivaxmods42" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm">
                    @shivaxmods42
                  </a>
                </li>
              </ul>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4 mt-6">
                <a href="https://discord.gg/nY4hxDvfAb" className="w-10 h-10 bg-gray-700/50 hover:bg-indigo-600/50 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <MessageSquare className="w-5 h-5 text-gray-300 hover:text-white" />
                </a>
                <a href="https://t.me/shivaxmods" className="w-10 h-10 bg-gray-700/50 hover:bg-cyan-600/50 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <Send className="w-5 h-5 text-gray-300 hover:text-white" />
                </a>
                <a href="https://youtube.com/@shivaxmods" className="w-10 h-10 bg-gray-700/50 hover:bg-red-600/50 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <Youtube className="w-5 h-5 text-gray-300 hover:text-white" />
                </a>
                <a href="https://instagram.com/shivaxmods" className="w-10 h-10 bg-gray-700/50 hover:bg-pink-600/50 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <Instagram className="w-5 h-5 text-gray-300 hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700/50 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Shiva X Mods. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 inline text-red-500" /> by the community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
