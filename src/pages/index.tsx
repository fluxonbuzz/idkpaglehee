import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Gamepad2,
  Sword,
  Sparkles,
  Download,
  Users,
  Zap,
  Trophy,
  Shirt,
  Award,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

const modStats = [
  { label: "Active Community Members", value: "1K+" },
  { label: "Total Mod Downloads", value: "60K+" },
];

const featuredMods = [
  {
    title: "Crick Fusion",
    description: "Complete cricket gameplay overhaul with realistic physics",
    image: "/games/cricket-fusion.jpg",
    href: "/downloads",
  },
  {
    title: "Crick Fusion X",
    description: "Enhanced version with more features and content",
    image: "/games/cricket-fusion.jpg",
    href: "/downloads",
  },
];

const modFeatures = [
  {
    feature: "Gameplay Enhancements",
    description: "Transform your games with new mechanics and systems",
    icon: <Gamepad2 size={20} className="text-blue-400" />,
  },
  {
    feature: "HD Graphics",
    description: "Stunning visual upgrades with 4K textures and effects",
    icon: <Sparkles size={20} className="text-purple-400" />,
  },
  {
    feature: "New Content",
    description: "Additional maps, players, stadium and more",
    icon: <Sword size={20} className="text-green-400" />,
  },
  {
    feature: "Multiplayer Support",
    description: "Mods designed for online play with friends",
    icon: <Users size={20} className="text-yellow-400" />,
  },
  {
    feature: "Easy Installation",
    description: "One-click install for most mods with our manager",
    icon: <Download size={20} className="text-red-400" />,
  },
];

export default function Home() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <Container>
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Shiva X Mods
            </Link>
            <nav className="flex gap-6">
              <Link href="/store" className="hover:text-blue-400 transition">Store</Link>
              <Link href="/downloads" className="text-blue-400 font-medium">Downloads</Link>
            </nav>
          </div>
        </Container>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900 z-0" />
          <div className="absolute inset-0 bg-[url('/games/cricket-fusion.jpg')] bg-cover bg-center opacity-20 z-0" />
          
          <Container className="relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                  Mods
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">
                  Gaming
                </span>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                  Community
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Premium Game Mods
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Transform your gaming experience with our high-quality modifications
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/downloads">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 gap-2">
                    Download Mods <ChevronRight size={18} />
                  </Button>
                </Link>
                <Link href="/store">
                  <Button variant="secondary" className="gap-2">
                    Visit Store
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Transforming gaming experiences through <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">innovative mods</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {modStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Featured Mods */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Featured</span> Mods
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Our most popular and high-quality game modifications
              </p>
            </div>
            
            <Carousel setApi={setCarouselApi} className="w-full">
              <CarouselContent>
                {featuredMods.map((mod) => (
                  <CarouselItem key={mod.title} className="md:basis-1/2">
                    <Card className="border-gray-700 bg-gray-800/50 hover:border-green-500/50 transition-all">
                      <CardHeader className="p-0">
                        <Link href={mod.href}>
                          <div className="aspect-video relative overflow-hidden rounded-t-lg">
                            <Image
                              src={mod.image}
                              alt={mod.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          </div>
                        </Link>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="text-xl mb-2">{mod.title}</CardTitle>
                        <p className="text-gray-300">{mod.description}</p>
                        <Link href={mod.href}>
                          <Button className="mt-4 w-full" variant="outline">
                            Download Now
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            
            <div className="text-center mt-4 text-gray-400">
              Slide {current} of {count}
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why choose <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Shiva X Mods?</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We deliver premium quality mods with regular updates and community support
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modFeatures.map((feature, index) => (
                <motion.div
                  key={feature.feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-700/50 p-2 rounded-lg mr-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium">{feature.feature}</h3>
                  </div>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Community Section */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-900/30 to-gray-800/50 p-8 rounded-xl border border-gray-700">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Join our <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Discord</span>
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Connect with thousands of mod enthusiasts and creators
                  </p>
                  <Link href="https://discord.gg/nY4hxDvfAb">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                      Join Discord
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-900/30 to-gray-800/50 p-8 rounded-xl border border-gray-700">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Our <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Telegram</span>
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Get instant updates and announcements
                  </p>
                  <Link href="https://t.me/shivaxmods">
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                      Join Telegram
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
