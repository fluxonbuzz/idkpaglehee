import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Download, Star, Users, ShieldCheck, ArrowRight, ChevronRight, Twitter, Instagram, Youtube, Mail, Menu, X } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('mods');
  const [stats, setStats] = useState({
    members: 15000,
    downloads: 50000,
    mods: 50
  });

  // Animation for counting up stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        members: prev.members < 15000 ? prev.members + 100 : prev.members,
        downloads: prev.downloads < 50000 ? prev.downloads + 500 : prev.downloads,
        mods: prev.mods < 50 ? prev.mods + 1 : prev.mods
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="text-cyan-400" size={24} />,
      title: "High-Quality Mods",
      description: "Experience enhanced gameplay with our professionally crafted modifications"
    },
    {
      icon: <Download className="text-purple-400" size={24} />,
      title: "Regular Updates",
      description: "Our mods receive frequent updates to ensure compatibility and add new features"
    },
    {
      icon: <Star className="text-yellow-400" size={24} />,
      title: "Exclusive Content",
      description: "Premium members get access to exclusive mods and early releases"
    },
    {
      icon: <Users className="text-pink-400" size={24} />,
      title: "Active Community",
      description: "Join thousands of cricket gaming enthusiasts in our community"
    }
  ];

  const modShowcase = {
    mods: [
      {
        name: "Cricket Fusion X",
        description: "Flagship mod with enhanced physics, 4K textures and realistic player models",
        image: "/cricket-fusion.jpg",
        tags: ["Popular", "4K Textures", "Physics"]
      },
      {
        name: "Stadium Pack Pro",
        description: "Add 25+ authentic international stadiums to your game",
        image: "/stadium-pack.jpg",
        tags: ["Stadiums", "HD"]
      },
      {
        name: "Player Editor",
        description: "Customize player appearances, skills and attributes",
        image: "/player-editor.jpg",
        tags: ["Customization", "Tool"]
      }
    ],
    tools: [
      {
        name: "Texture Converter",
        description: "Easily convert and import custom textures into the game",
        image: "/texture-tool.jpg",
        tags: ["Utility", "PC"]
      },
      {
        name: "Tournament Creator",
        description: "Design and play custom tournaments with your rules",
        image: "/tournament-tool.jpg",
        tags: ["Custom", "Events"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Shiva X Mods | Premium Cricket Gaming Modifications</title>
        <meta name="description" content="Enhance your cricket gaming experience with high-quality mods, textures, and gameplay improvements from Shiva X Mods" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <header className="bg-gray-800/80 backdrop-blur-md border-b border-cyan-900/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <Image src="/logo.png" alt="Shiva X Mods Logo" layout="fill" objectFit="contain" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Shiva X Mods</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-cyan-300 transition">Home</Link>
            <Link href="/mods" className="hover:text-cyan-300 transition">Mods</Link>
            <Link href="/downloads" className="hover:text-cyan-300 transition">Downloads</Link>
            <Link href="/community" className="hover:text-cyan-300 transition">Community</Link>
            <Link href="/premium" className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
              Premium
            </Link>
          </nav>

          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 relative">
                  <Image src="/logo.png" alt="Shiva X Mods Logo" layout="fill" objectFit="contain" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Shiva X Mods</span>
              </Link>
              <button 
                className="text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-lg">
              <Link href="/" className="hover:text-cyan-300 transition" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/mods" className="hover:text-cyan-300 transition" onClick={() => setMobileMenuOpen(false)}>Mods</Link>
              <Link href="/downloads" className="hover:text-cyan-300 transition" onClick={() => setMobileMenuOpen(false)}>Downloads</Link>
              <Link href="/community" className="hover:text-cyan-300 transition" onClick={() => setMobileMenuOpen(false)}>Community</Link>
              <Link 
                href="/premium" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 rounded-lg font-medium hover:opacity-90 transition text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Premium Membership
              </Link>
            </nav>

            <div className="flex justify-center gap-6 mt-12">
              <a href="https://discord.gg/nY4hxDvfAb" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 127.14 96.36" fill="currentColor">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
              </a>
              <a href="https://t.me/shivaxmods" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22-.06-.32-.13-.1-.32-.02-.45.02-.2.06-3.39 2.14-4.84 3.06-.52.33-1 .5-1.43.5-.48 0-1.4-.27-2.08-.99-.75-.79-1.4-2.25-1.4-3.43 0-1.64 1.13-2.45 2.11-2.45.53 0 .98.18 1.38.4.25.15.47.33.68.55.23.23.46.46.75.68.32.25.7.38 1.12.38.42 0 .86-.13 1.23-.4 1.37-1.04 2.14-2.6 2.14-2.6.1-.2.25-.3.45-.3.1 0 .25.02.35.1.22.15.3.45.2.75z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@shivaxmods" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                <Youtube size={24} />
              </a>
              <a href="https://instagram.com/shivaxmods" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hexagon-pattern.svg')] bg-[length:100px] opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900"></div>
          
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-lg">
                Premium Cricket Mods
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Enhance Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Cricket Gaming</span> Experience
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                High-quality mods, textures, and gameplay improvements for your favorite cricket games. 
                Join our community of 15,000+ passionate gamers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/downloads" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center gap-2"
                >
                  Get Mods <ArrowRight size={18} />
                </Link>
                <Link 
                  href="/premium" 
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition border border-gray-700 flex items-center gap-2"
                >
                  <Star size={18} className="text-yellow-400" /> Go Premium
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-800/50 border-y border-gray-700/50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  {stats.members.toLocaleString()}+
                </div>
                <div className="text-gray-400">Community Members</div>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  {stats.downloads.toLocaleString()}+
                </div>
                <div className="text-gray-400">Total Downloads</div>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  {stats.mods}+
                </div>
                <div className="text-gray-400">Premium Mods</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Shiva X Mods?</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                We provide the highest quality cricket gaming modifications with regular updates and premium support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 hover:border-cyan-500/30 transition group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center mb-4 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mod Showcase Section */}
        <section className="py-16 bg-gray-800/20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Mods</h2>
              <div className="flex gap-2 bg-gray-800 rounded-lg p-1">
                <button 
                  onClick={() => setActiveTab('mods')}
                  className={`px-4 py-2 rounded-md transition ${activeTab === 'mods' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Mods
                </button>
                <button 
                  onClick={() => setActiveTab('tools')}
                  className={`px-4 py-2 rounded-md transition ${activeTab === 'tools' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Tools
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modShowcase[activeTab].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/30 hover:border-cyan-500/30 transition group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-cyan-900/30 text-cyan-300 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href="/downloads" 
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition font-medium"
                    >
                      Download Now <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/mods" 
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition border border-gray-700"
              >
                View All Mods <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-cyan-900/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-lg">
                Premium Membership
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Unlock Exclusive Content</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get access to premium mods, early releases, and priority support with our membership program
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/30">
                  <h3 className="text-xl font-bold mb-2">Early Access</h3>
                  <p className="text-gray-400">Get mods before public release</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/30">
                  <h3 className="text-xl font-bold mb-2">Exclusive Mods</h3>
                  <p className="text-gray-400">Content only for premium members</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/30">
                  <h3 className="text-xl font-bold mb-2">Priority Support</h3>
                  <p className="text-gray-400">Fast responses to your queries</p>
                </div>
              </div>
              <Link 
                href="/premium" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition text-lg"
              >
                <Star size={20} /> Join Premium
              </Link>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
                <p className="text-gray-300 mb-6">
                  Connect with thousands of cricket gaming enthusiasts, get mod support, share your creations, 
                  and participate in exclusive events and giveaways.
                </p>
                <div className="space-y-4">
                  <a 
                    href="https://discord.gg/nY4hxDvfAb" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-indigo-900/30 hover:bg-indigo-900/50 p-4 rounded-lg border border-indigo-800/50 transition"
                  >
                    <div className="bg-indigo-800/50 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 127.14 96.36" fill="currentColor">
                        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Discord</h3>
                      <p className="text-sm text-gray-400">15,000+ members</p>
                    </div>
                    <ChevronRight className="ml-auto text-gray-400" size={20} />
                  </a>
                  <a 
                    href="https://t.me/shivaxmods" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-blue-900/30 hover:bg-blue-900/50 p-4 rounded-lg border border-blue-800/50 transition"
                  >
                    <div className="bg-blue-800/50 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22-.06-.32-.13-.1-.32-.02-.45.02-.2.06-3.39 2.14-4.84 3.06-.52.33-1 .5-1.43.5-.48 0-1.4-.27-2.08-.99-.75-.79-1.4-2.25-1.4-3.43 0-1.64 1.13-2.45 2.11-2.45.53 0 .98.18 1.38.4.25.15.47.33.68.55.23.23.46.46.75.68.32.25.7.38 1.12.38.42 0 .86-.13 1.23-.4 1.37-1.04 2.14-2.6 2.14-2.6.1-.2.25-.3.45-.3.1 0 .25.02.35.1.22.15.3.45.2.75z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Telegram</h3>
                      <p className="text-sm text-gray-400">Official announcements</p>
                    </div>
                    <ChevronRight className="ml-auto text-gray-400" size={20} />
                  </a>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/30">
                  <div className="p-6 border-b border-gray-700/30">
                    <h3 className="font-bold">Latest Community Highlights</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-900/30 flex items-center justify-center">
                        <Users size={20} className="text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Modding Competition</h4>
                        <p className="text-sm text-gray-400">Join our monthly modding competition with cash prizes</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-900/30 flex items-center justify-center">
                        <Download size={20} className="text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">New Mod Release</h4>
                        <p className="text-sm text-gray-400">Cricket Fusion X v2.5 now available for download</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-yellow-900/30 flex items-center justify-center">
                        <Star size={20} className="text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Premium Giveaway</h4>
                        <p className="text-sm text-gray-400">Win 1-year premium membership in our Discord</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-800/30 border-t border-gray-700/30 text-center">
                    <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition">View all announcements</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-700/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 relative">
                  <Image src="/logo.png" alt="Shiva X Mods Logo" layout="fill" objectFit="contain" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Shiva X Mods</span>
              </div>
              <p className="text-gray-400 text-sm">
                Enhancing your cricket gaming experience with high-quality mods, textures, and gameplay improvements.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-cyan-300 transition text-sm">Home</Link></li>
                <li><Link href="/mods" className="text-gray-400 hover:text-cyan-300 transition text-sm">Mods</Link></li>
                <li><Link href="/downloads" className="text-gray-400 hover:text-cyan-300 transition text-sm">Downloads</Link></li>
                <li><Link href="/premium" className="text-gray-400 hover:text-cyan-300 transition text-sm">Premium</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-gray-400 hover:text-cyan-300 transition text-sm">FAQ</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-cyan-300 transition text-sm">Contact Us</Link></li>
                <li><Link href="/tutorials" className="text-gray-400 hover:text-cyan-300 transition text-sm">Tutorials</Link></li>
                <li><Link href="/status" className="text-gray-400 hover:text-cyan-300 transition text-sm">Service Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect With Us</h3>
              <div className="flex gap-4 mb-4">
                <a href="https://discord.gg/nY4hxDvfAb" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                  </svg>
                </a>
                <a href="https://t.me/shivaxmods" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22-.06-.32-.13-.1-.32-.02-.45.02-.2.06-3.39 2.14-4.84 3.06-.52.33-1 .5-1.43.5-.48 0-1.4-.27-2.08-.99-.75-.79-1.4-2.25-1.4-3.43 0-1.64 1.13-2.45 2.11-2.45.53 0 .98.18 1.38.4.25.15.47.33.68.55.23.23.46.46.75.68.32.25.7.38 1.12.38.42 0 .86-.13 1.23-.4 1.37-1.04 2.14-2.6 2.14-2.6.1-.2.25-.3.45-.3.1 0 .25.02.35.1.22.15.3.45.2.75z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/@shivaxmods" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                  <Youtube size={20} />
                </a>
                <a href="https://instagram.com/shivaxmods" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                  <Instagram size={20} />
                </a>
                <a href="mailto:sendsomegreens@gmail.com" className="text-gray-400 hover:text-cyan-400 transition">
                  <Mail size={20} />
                </a>
              </div>
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Shiva X Mods. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
