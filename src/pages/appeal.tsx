'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  LockKeyhole, Clock, ScrollText, ShieldCheck, UserCog, AlertTriangle, 
  CheckCircle, ArrowRight, X, Menu, Send, User, Mail, MessageSquare, 
  Calendar, MessageCircle, Shield, FileText, CheckCircle2, AlertCircle,
  ExternalLink, RotateCw, Sparkles, Bot, Zap, Users, Star, Crown
} from 'lucide-react';
import Link from 'next/link';

export default function ApplyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('discord');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discord: '',
    experience: '',
    motivation: '',
    availability: ''
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (100 - distance) / 100 * 0.2;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Application submitted successfully! We will review your application and get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Floating Icons */}
      <div className="absolute top-10 left-10 animate-float">
        <Shield className="w-8 h-8 text-purple-400/30" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <MessageCircle className="w-6 h-6 text-blue-400/30" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <User className="w-7 h-7 text-green-400/30" />
      </div>
      <div className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: '1.5s' }}>
        <Crown className="w-8 h-8 text-pink-400/30" />
      </div>

      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-xl border-b border-purple-500/30 relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            SHIVA X MODS
          </h1>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white focus:outline-none transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-purple-500/25"
            onClick={() => setSidebarOpen(true)}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-purple-300 transition-colors transform hover:scale-105 duration-200">Home</Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-purple-300 transition-colors flex items-center transform hover:scale-105 duration-200">
                  Testimonials <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-300 transition-colors transform hover:scale-105 duration-200">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-gray-900/95 backdrop-blur-xl shadow-lg transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
          <h2 className="text-xl font-bold">Menu</h2>
          <button 
            className="p-1 rounded-md text-gray-400 hover:text-white focus:outline-none transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-red-500/25"
            onClick={() => setSidebarOpen(false)}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link 
                href="/" 
                className="block hover:text-purple-300 transition-all duration-300 p-2 rounded hover:bg-purple-500/10 transform hover:translate-x-2"
                onClick={() => setSidebarOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/testimonials" 
                className="block hover:text-purple-300 transition-all duration-300 p-2 rounded hover:bg-purple-500/10 transform hover:translate-x-2 flex items-center"
                onClick={() => setSidebarOpen(false)}
              >
                Testimonials <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="block hover:text-purple-300 transition-all duration-300 p-2 rounded hover:bg-purple-500/10 transform hover:translate-x-2"
                onClick={() => setSidebarOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <div 
                className="block bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-2xl border-2 border-emerald-400 cursor-pointer shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center font-bold"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.5)'
                }}
              >
                Apply Now (Open!)
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-green-600 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-xl p-6 rounded-full border-2 border-green-500 shadow-2xl"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(20px)',
                  boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.4)'
                }}
              >
                <ShieldCheck className="h-16 w-16 text-green-400" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
            Guardianship Program
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our elite team of moderators and help protect our communities on Discord and Telegram
          </p>
        </div>

        {/* Platform Selection */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border-2 border-purple-500/30 p-2 mb-8">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab('discord')}
                className={`p-4 rounded-2xl transition-all duration-300 transform ${
                  activeTab === 'discord'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 scale-105 shadow-2xl'
                    : 'bg-gray-700/50 hover:bg-gray-600/50 hover:scale-102'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <MessageCircle className={`w-6 h-6 ${
                    activeTab === 'discord' ? 'text-white' : 'text-purple-400'
                  }`} />
                  <span className={`font-bold ${
                    activeTab === 'discord' ? 'text-white' : 'text-gray-300'
                  }`}>
                    Discord Guardians
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('telegram')}
                className={`p-4 rounded-2xl transition-all duration-300 transform ${
                  activeTab === 'telegram'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 scale-105 shadow-2xl'
                    : 'bg-gray-700/50 hover:bg-gray-600/50 hover:scale-102'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Send className={`w-6 h-6 ${
                    activeTab === 'telegram' ? 'text-white' : 'text-blue-400'
                  }`} />
                  <span className={`font-bold ${
                    activeTab === 'telegram' ? 'text-white' : 'text-gray-300'
                  }`}>
                    Telegram Guardians
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Platform-specific Content */}
          {activeTab === 'discord' && (
            <div className="animate-fadeIn">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-8 mb-8 border border-purple-500/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-purple-600 rounded-2xl">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Discord Guardians</h2>
                    <p className="text-purple-200">Moderate our vibrant Discord community</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: Users, text: '10K+ Members', color: 'text-green-400' },
                    { icon: Zap, text: 'Active Community', color: 'text-yellow-400' },
                    { icon: Star, text: 'Elite Team', color: 'text-purple-400' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-2xl p-4 text-center border border-gray-700/50">
                      <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                      <p className="text-sm text-gray-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'telegram' && (
            <div className="animate-fadeIn">
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl p-8 mb-8 border border-blue-500/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-600 rounded-2xl">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Telegram Guardians</h2>
                    <p className="text-blue-200">Protect our Telegram networks</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: Bot, text: 'Bot Management', color: 'text-blue-400' },
                    { icon: Users, text: 'Multiple Groups', color: 'text-cyan-400' },
                    { icon: Shield, text: 'Security Focus', color: 'text-green-400' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-2xl p-4 text-center border border-gray-700/50">
                      <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                      <p className="text-sm text-gray-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Application Form */}
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl border-2 border-green-500/50 p-8 shadow-2xl"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(10px)',
              boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-green-900/30 rounded-2xl border border-green-500 shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(15px)'
                }}
              >
                <User className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold">
                {activeTab === 'discord' ? 'Discord' : 'Telegram'} Guardian Application
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <User className="h-4 w-4" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-2xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-500 backdrop-blur-sm"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(5px)'
                    }}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-2xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-500 backdrop-blur-sm"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(5px)'
                    }}
                    placeholder="Enter your email"
                  />
                </div>

                {/* Discord/Telegram */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    {activeTab === 'discord' ? <MessageCircle className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                    {activeTab === 'discord' ? 'Discord Username *' : 'Telegram Username *'}
                  </label>
                  <input
                    type="text"
                    name="discord"
                    value={formData.discord}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-2xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-500 backdrop-blur-sm"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(5px)'
                    }}
                    placeholder={activeTab === 'discord' ? 'YourDiscord#1234' : '@yourtelegram'}
                  />
                </div>

                {/* Availability */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Calendar className="h-4 w-4" />
                    Weekly Availability *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-2xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-500 backdrop-blur-sm"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(5px)'
                    }}
                  >
                    <option value="">Select your availability</option>
                    <option value="10-15">10-15 hours per week</option>
                    <option value="15-20">15-20 hours per week</option>
                    <option value="20-25">20-25 hours per week</option>
                    <option value="25+">25+ hours per week</option>
                  </select>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <ShieldCheck className="h-4 w-4" />
                  Previous Moderation Experience *
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-2xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-500 resize-none backdrop-blur-sm"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(5px)'
                  }}
                  placeholder={`Describe your previous ${activeTab} moderation or community management experience...`}
                />
              </div>

              {/* Motivation */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <ScrollText className="h-4 w-4" />
                  Why do you want to become a {activeTab === 'discord' ? 'Discord' : 'Telegram'} Guardian? *
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-2xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-500 resize-none backdrop-blur-sm"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(5px)'
                  }}
                  placeholder={`Tell us why you're interested in joining our ${activeTab} Guardianship program...`}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl border-2 border-emerald-400 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-emerald-500/25 flex items-center gap-3"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Submit {activeTab === 'discord' ? 'Discord' : 'Telegram'} Application
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Program Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Requirements */}
          <div className="bg-gray-800/50 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(10px)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-900/30 rounded-lg border border-blue-500 shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(15px)'
                }}
              >
                <ScrollText className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">Requirements</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>Minimum 3 months active membership</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>Clean disciplinary record</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>Consistent positive community contributions</span>
              </li>
            </ul>
          </div>

          {/* Time Commitment */}
          <div className="bg-gray-800/50 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(10px)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-900/30 rounded-lg border border-purple-500 shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(15px)'
                }}
              >
                <Clock className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold">Time Commitment</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-purple-500 shadow-lg">
                <h3 className="font-bold text-purple-300 mb-1">Minimum</h3>
                <p className="text-sm">10-15 hours per week</p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-pink-500 shadow-lg">
                <h3 className="font-bold text-pink-300 mb-1">Peak Periods</h3>
                <p className="text-sm">20+ hours during events</p>
              </div>
            </div>
          </div>

          {/* Expectations */}
          <div className="bg-gray-800/50 backdrop-blur-xl border-2 border-pink-500/30 rounded-2xl p-6 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 transform hover:-translate-y-1"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(10px)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-pink-900/30 rounded-lg border border-pink-500 shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(15px)'
                }}
              >
                <ShieldCheck className="h-6 w-6 text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold">Expectations</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <UserCog className="flex-shrink-0 h-5 w-5 text-pink-400 mt-0.5" />
                <span>Professional conduct at all times</span>
              </li>
              <li className="flex items-start gap-3">
                <UserCog className="flex-shrink-0 h-5 w-5 text-pink-400 mt-0.5" />
                <span>Active participation</span>
              </li>
              <li className="flex items-start gap-3">
                <UserCog className="flex-shrink-0 h-5 w-5 text-pink-400 mt-0.5" />
                <span>Confidentiality of sensitive information</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Application Tips */}
        <div className="my-16 bg-gradient-to-br from-blue-900/50 to-gray-800/50 backdrop-blur-xl p-8 rounded-3xl border-2 border-blue-500/30 shadow-2xl"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(10px)'
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="p-4 bg-blue-900/30 rounded-full border-2 border-blue-500 shadow-2xl"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(20px)'
                }}
              >
                <Sparkles className="h-16 w-16 text-blue-400" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Application Tips</h2>
              <p className="text-lg text-gray-300 mb-6">
                Make your application stand out with these helpful tips:
              </p>
              <div className="space-y-4 max-w-md mx-auto md:mx-0">
                <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-amber-500 shadow-lg">
                  <h3 className="font-bold text-amber-300 mb-1">Be Detailed</h3>
                  <p className="text-sm">Provide specific examples of your experience and contributions</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-green-500 shadow-lg">
                  <h3 className="font-bold text-green-300 mb-1">Show Enthusiasm</h3>
                  <p className="text-sm">Demonstrate your passion for our community</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-purple-500 shadow-lg">
                  <h3 className="font-bold text-purple-300 mb-1">Be Honest</h3>
                  <p className="text-sm">We value transparency and authenticity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900/80 backdrop-blur-xl border-t border-purple-500/30 py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                  SHIVA X MODS
                </h2>
                <p className="text-gray-500 text-sm mt-1">Community Guardianship Program</p>
              </div>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-gray-400 hover:text-purple-300 transition-colors transform hover:scale-105 duration-200">Privacy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-purple-300 transition-colors transform hover:scale-105 duration-200">Terms</Link>
                <Link href="/contact" className="text-gray-400 hover:text-purple-300 transition-colors transform hover:scale-105 duration-200">Contact</Link>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700/50 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} SHIVA X MODS. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
