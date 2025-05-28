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
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import dynamic from 'next/dynamic';
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

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-900/10 animate-pulse rounded-lg"></div>
});

const modStats = [
  { label: "Active Community Members", value: "1k+" },
  { label: "Supported Games", value: "1+" },
];

const featuredMods = [
  {
    title: "Crick Fusion Ultra",
    description: "Complete cricket gameplay overhaul with realistic physics",
    image: "/assets/crick-fusion.webm",
    href: "/mods/crick-fusion",
  },
  {
    title: "Shiva X Graphics Pack",
    description: "4K textures and ray tracing for enhanced visuals",
    image: "/assets/shiva-graphics.webm",
    href: "/mods/shiva-graphics",
  },
  {
    title: "Crick fusion X",
    description: "Advanced cricket simulation with new stadiums",
    image: "/assets/battlefield-mod.webm",
    href: "/mods/battlefield",
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
    description: "Additional maps, characters, weapons and more",
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

        {/* Hero Section */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>mods</span>
              <span className={styles.pill}>gaming</span>
              <span className={styles.pill}>community</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Welcome To
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Shiva X Mods
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                The ultimate destination for high-quality game modifications
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="/downloads" passHref>
                <Button>
                  Download Mods <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#features"))}
              >
                View Features
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to explore <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          
          {/* 3D Spline Component - Updated with proper styling */}
          <div
            data-scroll
            data-scroll-speed="-.01"
            className="mt-14 w-full h-[400px] xl:h-[600px] xl:w-[600px] relative"
          >
            <Spline 
              scene="https://prod.spline.design/Br2ec3WjQ8WjEmEb/scene.splinecode"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            />
          </div>
        </section>

        {/* Rest of your sections remain exactly the same */}
        {/* Stats Section */}
        <section id="stats" data-scroll-section>
          {/* ... existing stats section code ... */}
        </section>

        {/* Mods Section */}
        <section id="mods" data-scroll-section>
          {/* ... existing mods section code ... */}
        </section>

        {/* Features Section */}
        <section id="features" data-scroll-section>
          {/* ... existing features section code ... */}
        </section>

        {/* Community Section */}
        <section id="community" data-scroll-section className="my-64">
          {/* ... existing community section code ... */}
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
