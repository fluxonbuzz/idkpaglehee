'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, User, Mail, MessageCircle, Send, Calendar, 
  Shield, Users, Zap, Crown, Sparkles, CheckCircle, 
  ArrowRight, Menu, X, Gamepad2, Download, Instagram, 
  Youtube, Trophy, Heart, ShoppingCart, UserPlus, LogIn,
  MessageSquare, DollarSign, FileText, Star, Users2,
  LockKeyhole, Clock, ScrollText, UserCog, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { getBrowserSupabase } from '../lib/supabase';

const socialLinks = [
  {
    name: "Telegram",
    href: "https://t.me/shivaxmods1",
    icon: Users,
    color: "bg-blue-500 hover:bg-blue-600",
    description: "Instant updates and support"
  },
  {
    name: "Discord",
    href: "https://discord.gg/nY4hxDvfAb",
    icon: MessageCircle,
    color: "bg-indigo-600 hover:bg-indigo-700",
    description: "Join our relaunched community"
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@shivaxmods",
    icon: Youtube,
    color: "bg-red-600 hover:bg-red-700",
    description: "Watch our new mod showcases"
  },
  {
    name: "Instagram",
    href: "https://instagram.com/shivaxmods",
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    description: "Behind the scenes content"
  }
];

const pageLinks = [
  { name: "Store", href: "/store", icon: ShoppingCart, color: "from-green-500 to-emerald-500", description: "Premium Mods & Products" },
  { name: "Apply", href: "/apply", icon: UserPlus, color: "from-blue-500 to-cyan-500", description: "Join Our Team" },
  { name: "Community", href: "/community", icon: Users2, color: "from-purple-500 to-pink-500", description: "Connect with Players" },
  { name: "Games", href: "/games", icon: Gamepad2, color: "from-orange-500 to-red-500", description: "Supported Games" },
  { name: "Membership", href: "/membership", icon: Crown, color: "from-yellow-500 to-amber-500", description: "Exclusive Benefits" },
  { name: "Login", href: "/login", icon: LogIn, color: "from-gray-600 to-gray-700", description: "Access Your Account" },
  { name: "Register", href: "/register", icon: UserPlus, color: "from-indigo-500 to-purple-500", description: "Create Account" },
  { name: "Support", href: "/support", icon: MessageSquare, color: "from-cyan-500 to-blue-500", description: "Get Help & Support" },
  { name: "Testimonials", href: "/testimonials", icon: Star, color: "from-amber-500 to-orange-500", description: "User Reviews" },
  { name: "Privacy", href: "/privacy", icon: ShieldCheck, color: "from-green-600 to-emerald-600", description: "Privacy Policy" },
  { name: "Terms", href: "/terms", icon: FileText, color: "from-gray-500 to-gray-600", description: "Terms of Service" },
  { name: "Refund", href: "/refund", icon: DollarSign, color: "from-red-500 to-pink-500", description: "Refund Policy" }
];

const programBenefits = [
  {
    title: "Exclusive Access",
    description: "Get early access to new features and mods",
    icon: Crown,
    color: "text-yellow-400"
  },
  {
    title: "Community Respect",
    description: "Become a trusted member of our community",
    icon: Trophy,
    color: "text-purple-400"
  },
  {
    title: "Priority Support",
    description: "Receive dedicated support from our team",
    icon: Zap,
    color: "text-cyan-400"
  },
  {
    title: "Leadership Skills",
    description: "Develop moderation and leadership abilities",
    icon: Users,
    color: "text-green-400"
  }
];

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const supabase = getBrowserSupabase();

      const { error } = await supabase
        .from('guardian_applications')
        .insert({
          name: formData.name,
          email: formData.email,
          contact: formData.discord,
          experience: formData.experience,
          motivation: formData.motivation,
          availability: formData.availability,
          platform: activeTab,
          created_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        discord: '',
        experience: '',
        motivation: '',
        availability: '',
      });
    } catch (err) {
      console.error('Application submit failed:', err);
      setSubmitError('Something went wrong while submitting your application. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Success Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7, rotateX: -30, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              className="relative w-full max-w-md px-8 py-10 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-600/20 to-gray-900 border border-cyan-400/40 shadow-[0_40px_120px_rgba(34,211,238,0.45)] transform perspective-[1200px]"
            >
              <div className="absolute -top-32 -left-16 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -right-10 w-64 h-64 bg-purple-500/25 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <motion.div
                  initial={{ scale: 0.8, rotate: -8 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.05 }}
                  className="w-24 h-24 rounded-3xl bg-gray-950/80 border border-cyan-400/80 shadow-[0_20px_60px_rgba(56,189,248,0.65)] flex items-center justify-center"
                >
                  <CheckCircle className="w-14 h-14 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-200 via-white to-purple-200 bg-clip-text text-transparent">
                  Application Received
                </h2>
                <p className="text-sm md:text-base text-gray-300/90 max-w-sm">
                  Your guardianship application has been saved securely. Our team will review your details and get back to you soon.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05, translateY: -1 }}
                  whileTap={{ scale: 0.96, translateY: 0 }}
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm md:text-base shadow-[0_14px_40px_rgba(59,130,246,0.65)] border border-cyan-300/70"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black"></div>
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] opacity-40"
        />
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-cyan-500/20 rounded-lg"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="fixed w-full z-50 bg-gray-950/90 backdrop-blur-md border-b border-cyan-500/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <Zap className="h-6 w-6 text-gray-950 font-bold" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                SHIVA X
              </span>
              <span className="text-xs text-cyan-400 font-medium">REBORN 2025</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link href="/store" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              Store
            </Link>
            <Link href="/community" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              Community
            </Link>
            <Link href="/testimonials" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              Testimonials
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="#community">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105">
                Join Telegram
              </button>
            </Link>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-y-0 right-0 z-50 w-80 bg-gray-900 border-l border-cyan-500/20 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-gray-950" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      SHIVA XD
                    </span>
                    <span className="text-xs text-cyan-400">REBORN 2025</span>
                  </div>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col p-6 space-y-2">
                {pageLinks.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium border border-transparent hover:border-cyan-500/20"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <page.icon className="h-5 w-5 mr-3" />
                    {page.name}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300">
                    Join Our Telegram
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-6 z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
              >
                <ShieldCheck className="h-4 w-4 mr-2 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">GUARDIANSHIP PROGRAM • OPEN APPLICATIONS</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-black tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  BECOME A
                </span>
                <br />
                <span className="text-3xl md:text-5xl text-gray-300">GUARDIAN</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                Join our elite team of moderators and help protect our communities on Discord and Telegram
              </motion.p>
            </div>
          </div>
        </section>

        {/* Platform Selection */}
        <section className="py-10 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 border border-cyan-500/20 rounded-2xl p-2 mb-8 backdrop-blur-sm"
              >
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveTab('discord')}
                    className={`p-4 rounded-xl transition-all duration-300 transform ${
                      activeTab === 'discord'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 scale-105 shadow-2xl'
                        : 'bg-gray-800/50 hover:bg-gray-700/50 hover:scale-102'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <MessageCircle className={`w-6 h-6 ${
                        activeTab === 'discord' ? 'text-white' : 'text-cyan-400'
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
                    className={`p-4 rounded-xl transition-all duration-300 transform ${
                      activeTab === 'telegram'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 scale-105 shadow-2xl'
                        : 'bg-gray-800/50 hover:bg-gray-700/50 hover:scale-102'
                    }`}
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
              </motion.div>

              {/* Platform Info */}
              {activeTab === 'discord' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-2xl p-8 mb-8 border border-cyan-500/30 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-cyan-600 rounded-2xl">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">Discord Guardians</h2>
                      <p className="text-cyan-200">Moderate our vibrant Discord community</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { icon: Users, text: '10K+ Members', color: 'text-green-400' },
                      { icon: Zap, text: 'Active Community', color: 'text-yellow-400' },
                      { icon: Crown, text: 'Elite Team', color: 'text-purple-400' }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-2xl p-4 text-center border border-gray-700/50">
                        <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                        <p className="text-sm text-gray-300">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'telegram' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 mb-8 border border-blue-500/30 backdrop-blur-sm"
                >
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
                      { icon: Users, text: 'Bot Management', color: 'text-blue-400' },
                      { icon: Shield, text: 'Multiple Groups', color: 'text-cyan-400' },
                      { icon: Zap, text: 'Security Focus', color: 'text-green-400' }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-2xl p-4 text-center border border-gray-700/50">
                        <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                        <p className="text-sm text-gray-300">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Application Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-cyan-900/30 rounded-2xl border border-cyan-500">
                    <User className="h-8 w-8 text-cyan-400" />
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
                        className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-300"
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
                        className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-300"
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
                        className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-300"
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
                        className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-300 resize-none"
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
                      className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-300 resize-none"
                      placeholder={`Tell us why you're interested in joining our ${activeTab} Guardianship program...`}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col items-center pt-6 gap-3">
                    {submitError && (
                      <p className="text-sm text-red-400 text-center max-w-md">
                        {submitError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl border-2 border-cyan-400 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-cyan-500/25 flex items-center gap-3"
                    >
                      <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      {isSubmitting
                        ? 'Submitting...'
                        : `Submit ${activeTab === 'discord' ? 'Discord' : 'Telegram'} Application`}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Guardian <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Benefits</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Join our elite team and enjoy exclusive perks and recognition
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {programBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/40 border border-cyan-500/20 rounded-xl p-6 text-center backdrop-blur-sm hover:border-cyan-500/40 transition-all group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-200">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 border border-cyan-500/20 rounded-2xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6 text-gray-950" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Program Requirements
                      </h2>
                      <div className="flex items-center text-cyan-400">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        What we're looking for in candidates
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-cyan-400">Essential Requirements</h3>
                      <ul className="space-y-3">
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
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-purple-400">Time Commitment</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-cyan-500">
                          <h4 className="font-bold text-cyan-300 mb-1">Minimum</h4>
                          <p className="text-sm">10-15 hours per week</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-purple-500">
                          <h4 className="font-bold text-purple-300 mb-1">Peak Periods</h4>
                          <p className="text-sm">20+ hours during events</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-20 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-1/4 top-0 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
            <div className="absolute right-1/4 bottom-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Join Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Community</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-gray-400"
              >
                Connect with us on our social platforms
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} rounded-xl p-6 flex flex-col items-center text-center transition-all hover:shadow-lg hover:shadow-cyan-500/10 border border-transparent hover:border-cyan-500/20 h-full`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                      <social.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{social.name}</h3>
                    <p className="text-white/80 text-sm flex-grow">{social.description}</p>
                    <div className="mt-4 text-xs text-white/60">Click to join</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-cyan-500/20 bg-gray-900/60 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-all">
                  <Zap className="h-6 w-6 text-gray-950" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    SHIVA X
                  </span>
                  <span className="text-xs text-cyan-400 font-medium">REBORN 2025</span>
                </div>
              </Link>
              <p className="text-gray-400 text-sm">
                Back in action and better than ever before
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/store" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Store
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Apply
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/updates" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Latest Updates
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Stay Connected</h4>
              <div className="flex items-center gap-4 mb-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors p-2 hover:bg-cyan-500/10 rounded-lg"
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                We're excited to have you back!
              </p>
            </div>
          </div>

          <div className="border-t border-cyan-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Shiva X Mods. We're back and here to stay.
            </p>
            <p className="text-gray-500 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 text-cyan-400 mx-1" /> by fluxon.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </div>
  );
}
