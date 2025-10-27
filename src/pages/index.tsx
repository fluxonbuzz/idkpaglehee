import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Gamepad2, 
  Users, 
  Download, 
  Zap, 
  ArrowRight,
  Calendar,
  Shield,
  Sparkles,
  MessageCircle,
  Instagram,
  Youtube,
  Menu,
  X,
  Crown,
  Star,
  Trophy,
  Heart
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const comebackData = {
  date: "October 20, 2025",
  title: "The Comeback You Waited For",
  subtitle: "After everything, we're back and better than ever",
  story: `Some months ago we said goodbye, but the community never let us go. Your messages, your memories, and your passion kept the spirit of Shiva XD alive.
  
  Now, with renewed energy and a clear vision, we're returning to deliver the modding experience you deserve. Better performance, more features, and a community that's stronger than ever.
  
  This isn't just a return - it's a rebirth. Welcome back to Shiva X Mods.`,
};

const newFeatures = [
  {
    title: "Crick Fusion",
    description: "Completely rebuilt from the ground up for smoother gameplay",
    icon: Zap,
    color: "text-cyan-400"
  },
  {
    title: "Enhanced Security",
    description: "Advanced protection to keep your gaming safe and secure",
    icon: Shield,
    color: "text-emerald-400"
  },
  {
    title: "Fresh Designs",
    description: "Completely new UI and visual enhancements",
    icon: Sparkles,
    color: "text-purple-400"
  },
  {
    title: "Active Community",
    description: "Reloaded Discord and social channels with daily engagement",
    icon: Users,
    color: "text-amber-400"
  }
];

const socialLinks = [
  {
    name: "Discord",
    href: "https://discord.gg/nY4hxDvfAb",
    icon: MessageCircle,
    color: "bg-indigo-600 hover:bg-indigo-700",
    description: "Join our relaunched community"
  },
  {
    name: "Telegram",
    href: "https://t.me/shivaxmods1",
    icon: Users,
    color: "bg-blue-500 hover:bg-blue-600",
    description: "Instant updates and support"
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

const TypeWriter = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState(texts[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    setCurrentText(texts[currentIndex]);
  }, [currentIndex, texts]);

  return (
    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
      {currentText}
    </span>
  );
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Animated Cyber Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black"></div>
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
            <Link href="#comeback" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              Our Story
            </Link>
            <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              What's New
            </Link>
            <Link href="#community" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              Join Us
            </Link>
            <Link href="#mods" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              Get Mods
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="#community">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-sm font-medium">
                Join Discord
              </Button>
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
              className="fixed inset-y-0 right-0 z-50 w-80 bg-gray-900 border-l border-cyan-500/20 shadow-2xl"
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
              <nav className="flex flex-col p-6 space-y-3">
                <Link href="#comeback" className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium border border-transparent hover:border-cyan-500/20">
                  Our Comeback Story
                </Link>
                <Link href="#features" className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium border border-transparent hover:border-cyan-500/20">
                  What's New
                </Link>
                <Link href="#community" className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium border border-transparent hover:border-cyan-500/20">
                  Join Community
                </Link>
                <Link href="#mods" className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium border border-transparent hover:border-cyan-500/20">
                  Download Mods
                </Link>
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 font-medium">
                    Join Our Discord
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.div
              style={{ y }}
              className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] opacity-40"
            />
          </div>

          <div className="container mx-auto px-6 z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
              >
                <Zap className="h-4 w-4 mr-2 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">WE'RE BACK • OCT 20, 2025</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl font-black tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  SHIVA XD
                </span>
                <br />
                <span className="text-4xl md:text-6xl text-gray-300">IS BACK</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
              >
                <TypeWriter texts={[
                  "Better mods. Stronger community. Same passion.",
                  "The comeback you've been waiting for is here.",
                  "Reloaded and ready for 2025 and beyond.",
                  "Your favorite modding community is back in action."
                ]} />
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
              >
                <Link href="#mods">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 font-bold text-lg px-8 py-6"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Get Latest Mods
                  </Button>
                </Link>
                <Link href="#community">
                  <Button
                    size="lg"
                    className="bg-gray-800 hover:bg-gray-700 border border-cyan-500/20 font-bold text-lg px-8 py-6"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Join Community
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">15K+</div>
                  <div className="text-sm text-gray-400">Community</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">500K+</div>
                  <div className="text-sm text-gray-400">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">2025</div>
                  <div className="text-sm text-gray-400">Reborn</div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <div className="w-6 h-10 border-2 border-cyan-500/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </section>

        {/* Comeback Story Section */}
        <section id="comeback" className="py-20 relative">
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
                      <Zap className="h-6 w-6 text-gray-950" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Our Comeback Story
                      </h2>
                      <div className="flex items-center text-cyan-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        {comebackData.date}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                    {comebackData.story.split('\n\n').map((paragraph, index) => (
                      <p key={index} className={index === 0 ? "text-cyan-100 font-medium" : ""}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  <div className="mt-10 pt-8 border-t border-cyan-500/20 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mr-4">
                        <Heart className="h-5 w-5 text-gray-950" />
                      </div>
                      <div>
                        <h4 className="font-semibold">The Shiva XD Team</h4>
                        <p className="text-cyan-400 text-sm">Back and better than ever</p>
                      </div>
                    </div>
                    <Link href="#community">
                      <Button className="bg-cyan-500 hover:bg-cyan-600">
                        Join Us <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* New Features */}
        <section id="features" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                What's <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">New</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                We spent our time away building something truly special for you
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {newFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/40 border border-cyan-500/20 rounded-xl p-6 text-center backdrop-blur-sm hover:border-cyan-500/40 transition-all group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-200">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Relaunch */}
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
                Join The <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Reloaded</span> Community
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-gray-400"
              >
                Our Discord and social channels are live and waiting for you
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

        {/* Final CTA */}
        <section id="mods" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-br from-gray-900/60 to-cyan-900/20 border border-cyan-500/30 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-10"></div>
              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  Ready to Experience the New Shiva X?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
                >
                  Download our latest mods and join thousands of players who are already back in the game
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row justify-center gap-4"
                >
                  <Link href="#mods">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 font-bold text-lg px-8"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Mods
                    </Button>
                  </Link>
                  <Link href="#community">
                    <Button
                      size="lg"
                      className="bg-gray-800 hover:bg-gray-700 border border-cyan-500/20 font-bold text-lg px-8"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Join Discord
                    </Button>
                  </Link>
                </motion.div>
              </div>
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
                  <Link href="#comeback" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Our Comeback
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    What's New
                  </Link>
                </li>
                <li>
                  <Link href="#community" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Join Community
                  </Link>
                </li>
                <li>
                  <Link href="#mods" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    Download Mods
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
    </div>
  );
}
