import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { 
  Mail, 
  Home, 
  ShoppingCart, 
  Gamepad2, 
  Crown, 
  Video, 
  Users, 
  HelpCircle, 
  Signal,
  Zap,
  MessageSquare,
  ScanEye
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      date.setHours(date.getHours());
      setTime(
        date.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  return (
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
              The ultimate cricket modification experience
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/downloads"
                  className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  <Gamepad2 className="h-4 w-4" />
                  Mods
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Store
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  <Users className="h-4 w-4" />
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/membership"
                  className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  <Crown className="h-4 w-4" />
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  <Video className="h-4 w-4" />
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  <HelpCircle className="h-4 w-4" />
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  <Signal className="h-4 w-4" />
                  Status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} p-3 rounded-full transition-all`}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-400">Local time:</p>
                <p className="text-sm font-medium">{time} UTC+1</p>
              </div>
              
              <Link
                href="mailto:sendsomegreens@gmail.com"
                className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                sendsomegreens@gmail.com
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Shiva X Mods. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Made with ❤️ by{" "}
            <Link
              href="https://www.youtube.com/@adore-py"
              target="_blank"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              fluxon
            </Link>
          </p>
        </div>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-50" />
    </footer>
  );
}
