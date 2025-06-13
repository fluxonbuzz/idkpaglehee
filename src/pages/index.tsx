import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  Gamepad2,
  Sparkles,
  Download,
  Users,
  CheckCircle,
  Crown,
  BookOpen,
  MessageSquare,
  Menu,
  X,
  Server,
  ChevronRight,
  ScanEye,
  Code2,
  Palette,
  Network,
  ShieldCheck,
  Rocket,
  Gem,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const modStats = [
  { label: "Active Members", value: "15K+", icon: Users },
  { label: "Mod Downloads", value: "500K+", icon: Download },
  { label: "Supported Games", value: "10+", icon: Gamepad2 },
  { label: "Premium Mods", value: "50+", icon: Gem },
];

const featuredMods = [
  {
    title: "Crick Fusion X",
    description: "Next-gen cricket experience with enhanced physics, 4K textures, and new gameplay modes",
    version: "V2.5",
    status: "available",
    tags: ["HD Graphics", "Multiplayer", "New Teams"],
    image: "/assets/fusionx.png",
    href: "/downloads",
  },
  {/*
    title: "Neon Overdrive",
    description: "Cyberpunk-themed visual overhaul with neon lighting and futuristic UI",
    version: "V1.2",
    status: "beta",
    tags: ["Visual Mod", "UI Redesign", "Custom Shaders"],
    image: "/assets/neon-overdrive.png",
    href: "/downloads",
  },
  {
    title: "Ultra Physics",
    description: "Advanced physics engine for realistic ball dynamics and player movements",
    version: "V3.1",
    status: "available",
    tags: ["Gameplay", "Physics", "Realism"],
    image: "/assets/physics-mod.png",
    href: "/downloads",
  */},
];

const modFeatures = [
  {
    feature: "Cutting-Edge Tech",
    description: "Mods built with latest game engine modifications",
    icon: Code2,
    color: "text-cyan-400",
  },
  {
    feature: "Visual Mastery",
    description: "Stunning 4K textures, ray tracing, and custom shaders",
    icon: Palette,
    color: "text-purple-400",
  },
  {
    feature: "Network Optimized",
    description: "Low-latency multiplayer enhancements",
    icon: Network,
    color: "text-green-400",
  },
  {
    feature: "Anti-Cheat",
    description: "Built-in protection for fair gameplay",
    icon: ShieldCheck,
    color: "text-yellow-400",
  },
  {
    feature: "One-Click Install",
    description: "Automated mod management system",
    icon: Rocket,
    color: "text-pink-400",
  },
  {
    feature: "Regular Updates",
    description: "Continuous improvements and new content",
    icon: Zap,
    color: "text-blue-400",
  },
];

const socialLinks = [
  {
    name: "Discord",
    href: "https://discord.gg/nY4hxDvfAb",
    color: "bg-indigo-600 hover:bg-indigo-700",
    icon: Users,
  },
  {
    name: "Telegram",
    href: "https://t.me/shivaxmods",
    color: "bg-blue-500 hover:bg-blue-600",
    icon: MessageSquare,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@shivaxmods",
    color: "bg-red-600 hover:bg-red-700",
    icon: ScanEye,
  },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("featured");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Glow effect colors
  const glows = [
    "bg-emerald-500/20",
    "bg-purple-500/20",
    "bg-cyan-500/20",
    "bg-pink-500/20",
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl opacity-20 ${glows[i % glows.length]}`}
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="fixed w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-md flex items-center justify-center">
              <Zap className="h-5 w-5 text-gray-950" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              SHIVA X
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link href="/mods" className="text-sm font-medium hover:text-emerald-400 transition-colors">
              Mods
            </Link>
            <Link href="/store" className="text-sm font-medium hover:text-emerald-400 transition-colors">
              Store
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-emerald-400 transition-colors">
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button className="hidden md:flex bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-sm">
              Join Discord
            </Button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              <Menu className="h-6 w-6" />
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
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-md flex items-center justify-center">
                    <Zap className="h-5 w-5 text-gray-950" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                    SHIVA X
                  </span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col p-6 space-y-4">
                <Link
                  href="/"
                  className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/mods"
                  className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  Mods
                </Link>
                <Link
                  href="/store"
                  className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  Store
                </Link>
                <Link
                  href="/community"
                  className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  Community
                </Link>
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700">
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
          <div className="absolute inset-0 z-0">
            <motion.div
              style={{ y }}
              className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
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
                <span className="h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                <span className="text-sm font-medium">MODDING EVOLVED</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  Next-Level
                </span>{" "}
                <br />
                Game Modifications
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
              >
                <TypeAnimation
                  sequence={[
                    "Enhance your gaming experience",
                    1500,
                    "Ultra HD textures & effects",
                    1500,
                    "Advanced gameplay mechanics",
                    1500,
                    "Exclusive premium content",
                    1500,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 font-bold"
                >
                  Explore Mods <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 hover:bg-gray-900 font-bold"
                >
                  Join Community
                </Button>
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
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-1 h-2 bg-gray-400 rounded-full mt-2"
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
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gray-800">
                      <stat.icon className={`h-5 w-5 ${index === 0 ? 'text-emerald-400' : index === 1 ? 'text-cyan-400' : index === 2 ? 'text-purple-400' : 'text-pink-400'}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Mods Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-1/4 top-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute right-1/4 bottom-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  Featured
                </span>{" "}
                Mods
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-gray-400"
              >
                Our most popular and innovative game modifications
              </motion.p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-900 rounded-lg p-1 border border-gray-800">
                {["featured", "popular", "new"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMods.map((mod, index) => (
                <motion.div
                  key={mod.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all group"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/assets/mod-pattern.svg')] opacity-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Gamepad2 className="h-10 w-10 text-emerald-400" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center ${mod.status === 'available' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {mod.status === 'available' ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" /> Available
                          </>
                        ) : (
                          'Coming Soon'
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">{mod.title}</h3>
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">
                        {mod.version}
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
                      <Button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 group-hover:border-emerald-500/50 transition-all">
                        Download Now
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/mods">
                <Button variant="outline" className="border-gray-700 hover:bg-gray-900">
                  View All Mods <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
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
                Why Choose{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
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
                We combine cutting-edge technology with creative vision to deliver
                unparalleled modding experiences
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modFeatures.map((feature, index) => (
                <motion.div
                  key={feature.feature}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.feature}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>
          </div>

          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8 md:p-16 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Ready to{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  Transform
                </span>{" "}
                Your Gaming Experience?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
              >
                Join thousands of players who have already enhanced their games
                with our premium modifications
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 font-bold"
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 hover:bg-gray-900 font-bold"
                >
                  Learn More
                </Button>
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
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
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
                Connect with modders, get support, and stay updated on new releases
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
                    className={`${social.color} rounded-xl p-8 flex flex-col items-center text-center transition-all hover:shadow-lg`}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                      <social.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{social.name}</h3>
                    <p className="text-white/80">
                      Join our {social.name.toLowerCase()} community
                    </p>
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
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-md flex items-center justify-center">
                  <Zap className="h-5 w-5 text-gray-950" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  SHIVA X
                </span>
              </Link>
              <p className="text-gray-400 text-sm">
                Pushing the boundaries of game modification with innovative
                technology and creative vision.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Navigation</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mods"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Mods
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/tutorials"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dmca"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    DMCA
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Shiva X Mods. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://discord.gg/nY4hxDvfAb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Users className="h-5 w-5" />
              </Link>
              <Link
                href="https://t.me/shivaxmods"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com/@shivaxmods"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <ScanEye className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
