import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { 
  MailIcon, 
  HomeIcon, 
  ShoppingCartIcon, 
  Gamepad2Icon, 
  CrownIcon, 
  VideoIcon, 
  Users2Icon, 
  HelpCircleIcon, 
  SignalIcon 
} from "lucide-react";

export default function Footer() {
  // get the current time in UTC+1 time zone
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

  return (
    <footer className="w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto flex flex-col gap-4 py-6">
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" passHref>
            <Button variant="ghost" size="sm" className="gap-2">
              <HomeIcon className="h-4 w-4" />
              Home
            </Button>
          </Link>
          
          <Link href="/store" passHref>
            <Button variant="ghost" size="sm" className="gap-2">
              <ShoppingCartIcon className="h-4 w-4" />
              Store
            </Button>
          </Link>
          
          <Link href="/downloads" passHref>
            <Button variant="ghost" size="sm" className="gap-2">
              <Gamepad2Icon className="h-4 w-4" />
              Games
            </Button>
          </Link>
          
          <Link href="/membership" passHref>
            <Button variant="ghost" size="sm" className="gap-2">
              <CrownIcon className="h-4 w-4" />
              Membership
            </Button>
          </Link>
          
          <Link href="/tutorials" passHref>
            <Button variant="ghost" size="sm" className="gap-2">
              <VideoIcon className="h-4 w-4" />
              Tutorials
            </Button>
          </Link>
          
          <Link href="/community" passHref>
            <Button variant="ghost" size="sm" className="gap-2">
              <Users2Icon className="h-4 w-4" />
              Community
            </Button>
          </Link>
          
          <Link href="/support" passHref>
            <Button variant="ghost" size="sm" className="gap-2">
              <HelpCircleIcon className="h-4 w-4" />
              Support
            </Button>
          </Link>
          
          <Link href="/status" passHref>
            <Button variant="ghost" size="sm" className="gap-2">
              <SignalIcon className="h-4 w-4" />
              Status
            </Button>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-row items-center justify-between">
          <span className="flex flex-row items-center space-x-4">
            <p className="text-xs text-muted-foreground">
              Made with ❤️ by{" "}
              <Link
                href="https://www.youtube.com/@adore-py"
                target="_blank"
                passHref
                className="text-foreground transition hover:text-primary"
              >
                fluxon
              </Link>
            </p>
            <hr className="hidden h-6 border-l border-muted md:flex" />
            <span className="flex hidden flex-row items-center space-x-2 md:flex">
              <p className="text-xs text-muted-foreground">Local time:</p>
              <p className="text-sm font-semibold">{time} UTC+1</p>
            </span>
          </span>
          <Link
            href="mailto:sendsomegreens@gmail.com"
            passHref
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <Button variant={"outline"}>
              <MailIcon className="h-4 w-4 md:mr-2" />
              <span className="hidden md:flex">sendsomegreens@gmail.com</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-50" />
    </footer>
  );
}
