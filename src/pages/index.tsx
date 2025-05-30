import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Gamepad2,
  Sword,
  Sparkles,
  Download,
  Users,
  MonitorSmartphone,
  Zap,
  CheckCircle,
  Clock,
  Star,
  Award,
  Trophy,
  Shirt,
  Activity,
  Smile,
  Film
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
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
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const modStats = [
  { label: "Active Community Members", value: "1.5k+" },
  { label: "Supported Games", value: "1+" },
];

const featuredMods = [
  {
    title: "Crick Fusion X",
    description: "Enhanced version with more features and content",
    image: "assets/fusionx.png",
    href: "/downloads",
    status: "available",
    version: "V2.0"
  },
];

const modFeatures = [
  {
    feature: "Gameplay Enhancements",
    description: "Transform your games with new mechanics and systems",
    icon: Gamepad2,
    color: "text-blue-400"
  },
  {
    feature: "HD Graphics",
    description: "Stunning visual upgrades with 4K textures and effects",
    icon: Sparkles,
    color: "text-purple-400"
  },
  {
    feature: "New Content",
    description: "Additional maps, players, stadium and more",
    icon: Sword,
    color: "text-green-400"
  },
  {
    feature: "Multiplayer Support",
    description: "Mods designed for online play with friends",
    icon: Users,
    color: "text-yellow-400"
  },
  {
    feature: "Easy Installation",
    description: "One-click install for most mods with our manager",
    icon: Download,
    color: "text-cyan-400"
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Container>
        <div ref={refScrollContainer}>
          {/* Header */}
          <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Shiva X Mods
              </Link>
              <nav className="flex gap-6">
                <Link href="/store" className="hover:text-blue-400 transition">Store</Link>
                <Link href="/downloads" className="text-blue-400 font-medium">Games</Link>
              </nav>
            </div>
          </header>

          {/* Hero Section */}
          <section
            id="home"
            data-scroll-section
            className="flex min-h-[90vh] w-full flex-col items-center justify-center xl:mt-0"
          >
            <div className={cn(styles.intro, "text-center")}>
              <div className="mx-auto max-w-4xl">
                <h1
                  data-scroll
                  data-scroll-enable-touch-speed
                  data-scroll-speed=".06"
                >
                  <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                    Welcome To
                  </span>
                  <br />
                  <span className="text-6xl 2xl:text-8xl bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                    Shiva X Mods
                  </span>
                </h1>
                <p
                  data-scroll
                  data-scroll-enable-touch-speed
                  data-scroll-speed=".06"
                  className="mt-4 tracking-tight text-gray-300 2xl:text-xl"
                >
                  The destination for high-quality game modifications
                </p>
              </div>
              <div
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="flex flex-row items-center justify-center gap-3 pt-6"
              >
                <Link href="/downloads" passHref>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                    Download Mods <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/store" passHref>
                  <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700">
                    Visit Store
                  </Button>
                </Link>
              </div>

              <div
                className={cn(
                  styles.scroll,
                  isScrolled && styles["scroll--hidden"],
                )}
              >
                Scroll to explore <TriangleDownIcon className="mt-1 animate-bounce" />
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section id="stats" data-scroll-section className="py-16">
            <div
              data-scroll
              data-scroll-speed=".4"
              data-scroll-position="top"
              className="my-8 flex max-w-6xl flex-col items-center justify-center space-y-10 text-center"
            >
              <h2 className="py-8 pb-2 text-3xl font-light leading-normal tracking-tighter text-white xl:text-[40px]">
                Transforming gaming experiences through innovative mods
              </h2>
              <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
                {modStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center text-center bg-gray-800/50 p-6 rounded-xl border border-gray-700"
                  >
                    <span className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent xl:text-6xl">
                      {stat.value}
                    </span>
                    <span className="tracking-tight text-gray-300 xl:text-lg">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mods Section */}
          <section id="mods" data-scroll-section className="py-16">
            <div className="relative isolate -z-10">
              <div
                className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
                aria-hidden="true"
              >
                <div
                  className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-500 via-blue-500 to-purple-500 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                />
              </div>
            </div>
            <div data-scroll data-scroll-speed=".4" className="my-16 text-center">
              <span className="text-sm font-semibold tracking-tighter bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                🎮 Featured Mods
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Premium Game Modifications
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-gray-300 xl:text-lg">
                Enhance your gaming experience with our top-rated mods
              </p>

              {/* Carousel */}
              <div className="mt-14 flex justify-center">
                <Carousel setApi={setCarouselApi} className="w-full max-w-4xl">
                  <CarouselContent>
                    {featuredMods.map((mod) => (
                      <CarouselItem key={mod.title} className="md:basis-1/2">
                        <div className={`bg-gray-800 rounded-xl overflow-hidden border border-green-500/30 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/10`}>
                          <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-800 relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                {mod.title} {mod.version}
                              </span>
                            </div>
                            <div className="absolute top-4 right-4 bg-green-600 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                              <CheckCircle size={14} className="mr-1" /> Available Now
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-2xl font-bold">{mod.title}</h3>
                                <p className="text-gray-400">Version {mod.version}</p>
                              </div>
                            </div>
                            <p className="text-gray-300 mb-5">{mod.description}</p>
                            <Link
                              href={mod.href ?? '#'}
                              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded transition flex items-center justify-center gap-2"
                            >
                              <Download size={18} /> Download Now
                            </Link>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700" />
                  <CarouselNext className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700" />
                </Carousel>
              </div>
              <div className="py-2 text-center text-sm text-gray-300">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                featured mods
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" data-scroll-section className="py-16">
            <div
              data-scroll
              data-scroll-speed=".4"
              data-scroll-position="top"
              className="my-16 flex flex-col items-center justify-center space-y-10 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  staggerChildren: 0.5,
                }}
                viewport={{ once: true }}
                className="grid items-center gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                <div className="flex flex-col items-center py-6 xl:p-6">
                  <h2 className="text-4xl font-medium tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Why choose
                    <br />
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent tracking-normal">
                      Shiva X Mods?
                    </span>
                  </h2>
                  <p className="mt-2 tracking-tighter text-gray-300">
                    We deliver premium quality mods with regular updates and
                    community support
                  </p>
                </div>
                {modFeatures.map((feature) => (
                  <div
                    key={feature.feature}
                    className="flex flex-col items-center rounded-xl bg-gray-800/50 p-8 border border-gray-700 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg"
                  >
                    <div className="bg-gray-700/50 p-4 rounded-full mb-4">
                      <feature.icon className={`${feature.color}`} size={24} />
                    </div>
                    <span className="text-lg tracking-tight text-white">
                      {feature.feature}
                    </span>
                    <span className="mt-2 tracking-tighter text-gray-300">
                      {feature.description}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Community Section */}
          <section id="community" data-scroll-section className="py-16">
            <div className="grid gap-8 md:grid-cols-2">
              <div
                data-scroll
                data-scroll-speed=".4"
                data-scroll-position="top"
                className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-green-500/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24 border border-green-500/30"
              >
                <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Join our <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Discord</span>
                </h2>
                <p className="mt-1.5 text-base tracking-tight text-gray-300 xl:text-lg">
                  Connect with thousands of mod enthusiasts and creators
                </p>
                <Link href="https://discord.gg/nY4hxDvfAb" passHref>
                  <Button className="mt-6 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                    Join Discord
                  </Button>
                </Link>
              </div>

              <div
                data-scroll
                data-scroll-speed=".4"
                data-scroll-position="top"
                className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24 border border-blue-500/30"
              >
                <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Our <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Telegram</span>
                </h2>
                <p className="mt-1.5 text-base tracking-tight text-gray-300 xl:text-lg">
                  Get instant updates and announcements
                </p>
                <Link href="https://t.me/shivaxmods" passHref>
                  <Button className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
                    Join Telegram
                  </Button>
                </Link>
              </div>
              
              {/* WhatsApp Section */}
              <div
                data-scroll
                data-scroll-speed=".4"
                data-scroll-position="top"
                className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24 border border-emerald-500/30"
              >
                <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Our <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">WhatsApp</span>
                </h2>
                <p className="mt-1.5 text-base tracking-tight text-gray-300 xl:text-lg">
                  Chat with us directly for support
                </p>
                <Link href="https://wa.me/yourwhatsapplink" passHref>
                  <Button className="mt-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
                    Join WhatsApp
                  </Button>
                </Link>
              </div>
              
              {/* YouTube Section */}
              <div
                data-scroll
                data-scroll-speed=".4"
                data-scroll-position="top"
                className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-red-500/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24 border border-red-500/30"
              >
                <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Our <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">YouTube</span>
                </h2>
                <p className="mt-1.5 text-base tracking-tight text-gray-300 xl:text-lg">
                  Watch tutorials and mod showcases
                </p>
                <Link href="https://youtube.com/yourchannellink" passHref>
                  <Button className="mt-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                    Subscribe
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 text-center text-gray-300 border-t border-gray-800">
            <p>Kya haal hai bhai😉</p>
          </footer>
        </div>
      </Container>
    </div>
  );
}
