import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Gamepad2,
  Download,
  Users,
  CheckCircle,
  Crown,
  MessageSquare,
  Menu,
  X,
  Rocket,
  Zap,
  Instagram,
  Twitter,
  Youtube,
  Disc3,
  Gem,
  ScanEye,
  Code2,
  Palette,
  Network,
  ShieldCheck,
  Activity,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const modStats = [
  { label: "Active Members", value: "15K+", icon: Users, color: "text-cyan-400" },
  { label: "Mod Downloads", value: "500K+", icon: Download, color: "text-purple-400" },
  { label: "Supported Games", value: "1", icon: Gamepad2, color: "text-emerald-400" },
  { label: "Premium Mods", value: "5+", icon: Gem, color: "text-amber-400" },
];

const featuredMods = [
  {
    title: "Cricket Fusion X",
    description: "Next-gen cricket experience with enhanced physics, 4K textures, and new gameplay modes",
    version: "V2.5",
    status: "available",
    tags: ["HD Graphics", "Multiplayer", "New Teams"],
    image: "/assets/fusionx.png",
    href: "/downloads",
    accent: "bg-gradient-to-r from-cyan-500 to-blue-600"
  },
  {
    title: "Cricket Legends",
    description: "Classic cricket experience with legendary players and retro stadiums",
    version: "V1.2",
    status: "available",
    tags: ["Retro Style", "Legend Players", "Classic Stadiums"],
    image: "/assets/legends.png",
    href: "/downloads",
    accent: "bg-gradient-to-r from-amber-500 to-orange-600"
  },
  {
    title: "Future Cricket",
    description: "Sci-fi cricket experience with futuristic stadiums and gameplay",
    version: "Coming Soon",
    status: "soon",
    tags: ["Sci-Fi", "Future Tech", "VR Ready"],
    image: "/assets/future.png",
    href: "/coming-soon",
    accent: "bg-gradient-to-r from-purple-500 to-pink-600"
  }
];

const modFeatures = [
  {
    feature: "Cutting-Edge Tech",
    description: "Mods built with latest game engine modifications",
    icon: Code2,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10"
  },
  {
    feature: "Visual Mastery",
    description: "Stunning 4K textures and custom shaders",
    icon: Palette,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    feature: "Network Optimized",
    description: "Low-latency multiplayer enhancements",
    icon: Network,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    feature: "Secure Mods",
    description: "Built-in protection for fair gameplay",
    icon: ShieldCheck,
    color: "text-amber-400",
    bg: "bg-amber-400/10"
  },
  {
    feature: "One-Click Install",
    description: "Automated mod management system",
    icon: Rocket,
    color: "text-pink-400",
    bg: "bg-pink-400/10"
  },
  {
    feature: "Regular Updates",
    description: "Continuous improvements and new content",
    icon: Zap,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
];

const socialLinks = [
  {
    name: "Discord",
    href: "https://discord.gg/nY4hxDvfAb",
    icon: Disc3,
    color: "hover:text-indigo-400"
  },
  {
    name: "Twitter",
    href: "https://twitter.com/shivaxmods",
    icon: Twitter,
    color: "hover:text-blue-400"
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@shivaxmods",
    icon: Youtube,
    color: "hover:text-red-400"
  },
  {
    name: "Instagram",
    href: "https://instagram.com/shivaxmods",
    icon: Instagram,
    color: "hover:text-pink-400"
  },
];

const TypeWriter = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState(texts[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    setCurrentText(texts[currentIndex]);
  }, [currentIndex, texts]);

  return <span>{currentText}</span>;
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("featured");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5"></div>
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-[url('/assets/hexagon-pattern.svg')] opacity-10"
          style={{ y }}
        />
      </div>

      {/* Header */}
      <header className="fixed w-full z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <Zap className="h-5 w-5 text-gray-950" />
              </div>
              <div className="absolute -inset-1 rounded-lg bg-cyan-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              SHIVA X MODS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/downloads" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Mods
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/store" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Store
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/community" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Community
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button className="hidden md:flex bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-sm shadow-lg shadow-cyan-500/20">
              Join Discord
            </Button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-300" />
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
              className="fixed inset-y-0 right-0 z-50 w-80 bg-gray-900 border-l border-gray-800 shadow-2xl"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-gray-950" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    SHIVA X MODS
                  </span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-300" />
                </button>
              </div>
              <nav className="flex flex-col p-6 space-y-4">
                <Link
                  href="/"
                  className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-gray-300 hover:text-cyan-400"
                  onClick={() => setSidebarOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/downloads"
                  className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-gray-300 hover:text-cyan-400"
                  onClick={() => setSidebarOpen(false)}
                >
                  Mods
                </Link>
                <Link
                  href="/store"
                  className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-gray-300 hover:text-cyan-400"
                  onClick={() => setSidebarOpen(false)}
                >
                  Store
                </Link>
                <Link
                  href="/community"
                  className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-gray-300 hover:text-cyan-400"
                  onClick={() => setSidebarOpen(false)}
                >
                  Community
                </Link>
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/20">
                    Join Discord
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/assets/dot-pattern.svg')] opacity-10"></div>
            <motion.div
              style={{ y }}
              className="absolute inset-0 bg-[url('/assets/circuit-pattern.svg')] opacity-5 bg-cover"
            />
          </div>

          <div className="container mx-auto px-6 z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 border border-gray-700 mb-6"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-gray-300">MODDING REIMAGINED</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Next-Gen
                </span>{" "}
                <br />
                Cricket Experience
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
              >
                <TypeWriter texts={[
                  "Redefining cricket gaming",
                  "Ultra HD textures & effects",
                  "Advanced gameplay mechanics",
                  "Exclusive premium content"
                ]} />
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link href="/downloads">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-bold shadow-lg shadow-cyan-500/30"
                  >
                    Explore Mods <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/store">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:text-white font-bold"
                  >
                    Premium Store
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-sm text-gray-500 mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-1 h-2 bg-cyan-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {modStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${stat.color.replace('text', 'bg')}/10`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    {stat.value}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Mods Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Featured Mods
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-gray-400"
              >
                Experience cricket like never before with our premium modifications
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMods.map((mod, index) => (
                <motion.div
                  key={mod.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10 transition-all group"
                >
                  <div className={`h-2 w-full ${mod.accent}`}></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">{mod.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${mod.status === 'available' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {mod.status === 'available' ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1 inline" /> Available
                          </>
                        ) : (
                          'Coming Soon'
                        )}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-5">{mod.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {mod.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-800/50 px-2 py-1 rounded text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={mod.href}>
                      <Button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 group-hover:border-cyan-500/50 transition-all">
                        {mod.status === 'available' ? 'Download Now' : 'Learn More'}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[url('/assets/dot-pattern.svg')] opacity-5"></div>
          </div>

          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Why Choose{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Shiva X Mods?
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-gray-400"
              >
                Premium quality modifications designed for the ultimate gaming experience
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modFeatures.map((feature, index) => (
                <motion.div
                  key={feature.feature}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${feature.bg} border border-gray-800 rounded-xl p-8 hover:border-cyan-500/30 transition-all group`}
                >
                  <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-6 group-hover:bg-opacity-30 transition-all`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.feature}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6 relative z-10"
              >
                Ready to{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Transform
                </span>{" "}
                Your Game?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 relative z-10"
              >
                Join thousands of players who have already enhanced their cricket experience
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row justify-center gap-4 relative z-10"
              >
                <Link href="/downloads">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-bold shadow-lg shadow-cyan-500/30"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/community">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:text-white font-bold"
                  >
                    Join Community
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Join Our{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Community
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-gray-400"
              >
                Connect with other players, get support, and stay updated
              </motion.p>
            </div>

            <div className="flex justify-center gap-6 max-w-2xl mx-auto">
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
                    className={`text-gray-400 ${social.color} transition-colors p-4 rounded-full bg-gray-900 border border-gray-800 hover:border-cyan-500/30`}
                  >
                    <social.icon className="h-6 w-6" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                    <Zap className="h-5 w-5 text-gray-950" />
                  </div>
                  <div className="absolute -inset-1 rounded-lg bg-cyan-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  SHIVA X MODS
                </span>
              </Link>
              <p className="text-gray-400 text-sm">
                The ultimate cricket modification experience
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/downloads"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    Mods
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guidelines"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors`}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Shiva X Mods. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made with ❤️ for cricket fans
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
