import { useEffect, useRef, useState } from "react";
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
  Activity,
  Instagram,
  Heart,
  Star,
  Trophy,
  Clock,
  Calendar,
  Mail,
  Frown,
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const farewellMessage = {
  title: "Thank You For The Memories",
  subtitle: "A heartfelt farewell to our amazing community",
  message: `After an incredible journey filled with passion, creativity, and unforgettable moments, we've made the difficult decision to close Shiva X Mods. What started as a passion project grew into a community we could have never imagined - with over 15,000 members and half a million mod downloads.

We're forever grateful for every player who trusted us with their gaming experience, every supporter who believed in our vision, and every community member who made this journey so special.

Though Shiva X Mods is closing, the memories we've created together will remain in our hearts forever. Thank you for being part of our story.`,
  date: "2019-2023",
};

const memories = [
  {
    title: "The Beginning",
    description: "Our first mod release that started it all",
    icon: Star,
    color: "text-yellow-400",
  },
  {
    title: "Community Growth",
    description: "Watching our family grow to 15K+ members",
    icon: Users,
    color: "text-blue-400",
  },
  {
    title: "Cricket Fusion X",
    description: "Our flagship mod that changed everything",
    icon: Trophy,
    color: "text-emerald-400",
  },
  {
    title: "The Final Chapter",
    description: "With heavy hearts, we say goodbye",
    icon: Heart,
    color: "text-pink-400",
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
  {
    name: "Instagram",
    href: "https://instagram.com/shivaxmods",
    color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    icon: Instagram,
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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
              SHIVA X MODS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link href="/memories" className="text-sm font-medium hover:text-emerald-400 transition-colors">
              Memories
            </Link>
            <Link href="/legacy" className="text-sm font-medium hover:text-emerald-400 transition-colors">
              Legacy
            </Link>
            <Link href="/thank-you" className="text-sm font-medium hover:text-emerald-400 transition-colors">
              Thank You
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button className="hidden md:flex bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-sm">
              Final Message
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
                    SHIVA X MODS
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
                  href="/memories"
                  className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  Memories
                </Link>
                <Link
                  href="/legacy"
                  className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  Legacy
                </Link>
                <Link
                  href="/thank-you"
                  className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  Thank You
                </Link>
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700">
                    Final Message
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
              className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-30"
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
                <Frown className="h-4 w-4 mr-2 text-pink-400" />
                <span className="text-sm font-medium">FAREWELL MESSAGE</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  Thank You
                </span>{" "}
                <br />
                For Everything
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
              >
                <TypeWriter texts={[
                  "Our journey together has been incredible",
                  "We'll cherish these memories forever",
                  "Thank you for being part of our story",
                  "With love, The Shiva X Mods Team"
                ]} />
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link href="#message">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 font-bold"
                  >
                    Read Our Message <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#memories">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 font-bold"
                  >
                    Our Memories
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

        {/* Farewell Message Section */}
        <section id="message" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 md:p-12 relative overflow-hidden"
              >
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        {farewellMessage.title}
                      </h2>
                      <p className="text-gray-400">{farewellMessage.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {farewellMessage.date}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6 text-gray-300 leading-relaxed">
                    {farewellMessage.message.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  
                  <div className="mt-10 pt-8 border-t border-gray-800 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mr-4">
                      <Zap className="h-6 w-6 text-gray-950" />
                    </div>
                    <div>
                      <h4 className="font-semibold">The Shiva X Mods Team</h4>
                      <p className="text-gray-400 text-sm">With gratitude and love</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Memories Timeline */}
        <section id="memories" className="py-20 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-1/4 top-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute right-1/4 bottom-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
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
                Our{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  Journey
                </span>{" "}
                Together
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-gray-400"
              >
                A timeline of cherished moments we shared
              </motion.p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 h-full w-0.5 bg-gradient-to-b from-emerald-500 to-cyan-500 transform translate-x-1"></div>
                
                <div className="space-y-12">
                  {memories.map((memory, index) => (
                    <motion.div
                      key={memory.title}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="relative pl-16"
                    >
                      <div className="absolute left-0 w-10 h-10 rounded-full bg-gray-900 border-2 border-emerald-500 flex items-center justify-center">
                        <memory.icon className={`h-5 w-5 ${memory.color}`} />
                      </div>
                      
                      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-emerald-500/30 transition-all">
                        <h3 className="text-xl font-bold mb-2">{memory.title}</h3>
                        <p className="text-gray-400">{memory.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
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
                By The{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  Numbers
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-gray-400"
              >
                The incredible impact we made together
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center backdrop-blur-sm"
              >
                <Users className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  15K+
                </h3>
                <p className="text-gray-400 text-sm">Community Members</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center backdrop-blur-sm"
              >
                <Download className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  500K+
                </h3>
                <p className="text-gray-400 text-sm">Mod Downloads</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center backdrop-blur-sm"
              >
                <Gamepad2 className="h-10 w-10 text-purple-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  4
                </h3>
                <p className="text-gray-400 text-sm">Games Supported</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center backdrop-blur-sm"
              >
                <Clock className="h-10 w-10 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  4
                </h3>
                <p className="text-gray-400 text-sm">Years of Memories</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
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
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  Forever Grateful
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
              >
                From the bottom of our hearts, thank you for being part of our journey
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link href="#message">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 font-bold"
                  >
                    Our Farewell Message
                  </Button>
                </Link>
                <Link href="#memories">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 font-bold"
                  >
                    View Memories
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
                One Last{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  Connection
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-gray-400"
              >
                Stay in touch with us through our social channels
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
                    className={`${social.color} rounded-xl p-8 flex flex-col items-center text-center transition-all hover:shadow-lg`}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                      <social.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{social.name}</h3>
                    <p className="text-white/80">
                      Connect with us on {social.name.toLowerCase()}
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
                  SHIVA X MODS
                </span>
              </Link>
              <p className="text-gray-400 text-sm">
                2019-2023 • Thank you for the memories
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
                    href="/memories"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Memories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legacy"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Legacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/thank-you"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Thank You
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
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
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
                  href="https://t.me/shivanation1"
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
                <Link
                  href="https://instagram.com/shivaxmods"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Shiva X Mods. Forever in our hearts.
            </p>
            <p className="text-gray-500 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 text-pink-400 mx-1" /> for our community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
