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
  ShoppingCart, // Added shopping cart icon for store
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
  { label: "Active Community Members", value: "1k+" },
  { label: "Supported Games", value: "1+" },
];

const featuredMods = [
  {
    title: "Crick Fusion",
    description: "Complete cricket gameplay overhaul with realistic physics",
    image: "assets/fusion.png", // Replace with your image URL
    href: "/store", // Changed to point to store
  },
  {
    title: "Crick Fusion X",
    description: "Enhanced version with more features and content",
    image: "assets/fusionx.png", // Replace with your image URL
    href: "/store", // Changed to point to store
  },
];

const modFeatures = [
  {
    feature: "Gameplay Enhancements",
    description: "Transform your games with new mechanics and systems",
    icon: Gamepad2,
  },
  {
    feature: "HD Graphics",
    description: "Stunning visual upgrades with 4K textures and effects",
    icon: Sparkles,
  },
  {
    feature: "New Content",
    description: "Additional maps, players, stadidum and more",
    icon: Sword,
  },
  {
    feature: "Multiplayer Support",
    description: "Mods designed for online play with friends",
    icon: Users,
  },
  {
    feature: "Easy Installation",
    description: "One-click install for most mods with our manager",
    icon: Download,
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
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Sidebar Navigation - Simplified with only Store */}
        <nav className="fixed left-0 top-0 z-50 h-full w-16 bg-background/50 backdrop-blur">
          <div className="flex h-full flex-col items-center justify-start space-y-6 pt-6">
            {/* Store Link */}
            <Link href="/store" passHref>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          data-scroll-section
          className="flex min-h-[90vh] w-full flex-col items-center justify-center xl:mt-0"
        >
          <div className={cn(styles.intro, "text-center")}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center justify-center space-x-1.5"
            >
              <span className={styles.pill}>Mods</span>
              <span className={styles.pill}>Gaming</span>
              <span className={styles.pill}>Community</span>
            </div>
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
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Shiva X Mods
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-4 tracking-tight text-muted-foreground 2xl:text-xl"
              >
                The ultimate destination for high-quality game modifications
              </p>
            </div>
            <div
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center justify-center space-x-1.5 pt-6"
            >
              <Link href="/store" passHref>
                <Button>
                  Visit Store <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#features"))}
              >
                View Features
              </Button>
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
        <section id="stats" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-8 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <h2 className="py-8 pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              Transforming gaming experiences through innovative mods
            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {modStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mods Section */}
        <section id="mods" data-scroll-section>
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-32">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              🎮 Featured Mods
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Premium Game Modifications
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Enhance your gaming experience with our top-rated mods
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {featuredMods.map((mod) => (
                    <CarouselItem key={mod.title} className="md:basis-1/2">
                      <Card id="tilt">
                        <CardHeader className="p-0">
                          <Link href={mod.href} passHref>
                            <div className="aspect-video h-full w-full overflow-hidden rounded-t-md bg-primary">
                              <Image
                                src={mod.image}
                                alt={mod.title}
                                width={600}
                                height={300}
                                quality={100}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </Link>
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                            <h3 className="text-lg font-medium">{mod.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {mod.description}
                            </p>
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                featured mods
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-16 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Why choose
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    Shiva X Mods?
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  We deliver premium quality mods with regular updates and
                  community support
                </p>
              </div>
              {modFeatures.map((feature) => (
                <div
                  key={feature.feature}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <feature.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {feature.feature}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {feature.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" data-scroll-section className="my-32">
          <div className="grid gap-8 md:grid-cols-2">
            <div
              data-scroll
              data-scroll-speed=".4"
              data-scroll-position="top"
              className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
            >
              <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
                Join our <span className="text-gradient clash-grotesk">Discord</span>
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                Connect with thousands of mod enthusiasts and creators
              </p>
              <Link href="https://discord.gg/nY4hxDvfAb" passHref>
                <Button className="mt-6">Join Discord</Button>
              </Link>
            </div>

            <div
              data-scroll
              data-scroll-speed=".4"
              data-scroll-position="top"
              className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
            >
              <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
                Our <span className="text-gradient clash-grotesk">Telegram</span>
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                Get instant updates and announcements
              </p>
              <Link href="https://t.me/shivaxmods" passHref>
                <Button className="mt-6">
                  Join Telegram
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
          }
