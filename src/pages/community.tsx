import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Globe, Award, Heart, Youtube, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Community() {
  const features = [
    {
      title: "Discord Server",
      description: "Join our active Discord community with 1.5k+ members",
      icon: MessageSquare,
      href: "https://discord.gg/nY4hxDvfAb",
      stats: "1.5k+ Members"
    },
    {
      title: "Telegram Group",
      description: "Instant messaging community for quick discussions",
      icon: MessageCircle,
      href: "#",
      stats: "500+ Members"
    },
    {
      title: "WhatsApp Channel",
      description: "Connect with us",
      icon: MessageCircle,
      href: "#",
      stats: "800+ Members"
    },
    {
      title: "YouTube Channel",
      description: "Tutorials, showcases and community updates",
      icon: Youtube,
      href: "#",
      stats: "1k+ Subscribers"
    },
    {
      title: "Showcase Your Work",
      description: "Share your mods and get feedback from other creators",
      icon: Award,
      href: "#",
      stats: "100+ Creations"
    },
  ];

  const supportFeatures = [
    {
      title: "Support & Help",
      description: "Get help from experienced community members",
      icon: Heart,
      href: "#",
      stats: "24/7 Active"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Container>
        <div className="py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-4">
              Community
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join our growing community of mod enthusiasts, creators, and players
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-blue-500/20 hover:border-blue-500/40 p-6 transition-all hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 mb-4">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-300">{feature.stats}</span>
                      <Link href={feature.href}>
                        <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 hover:text-blue-100">
                          Join Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8 md:p-12 text-center mb-16">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center p-3 rounded-lg bg-blue-500/10 mb-6">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Become Part of Our Community</h2>
              <p className="text-gray-300 mb-8">
                Shiva X Mods is more than just mods - it&apos;s a community of passionate gamers and creators. 
                Join us to share your creations, get help, and connect with like-minded people.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="https://discord.gg/nY4hxDvfAb" target="_blank">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
                    Join Discord
                  </Button>
                </Link>
                <Link href="#" target="_blank">
                  <Button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700">
                    WhatsApp Group
                  </Button>
                </Link>
                <Link href="#" target="_blank">
                  <Button className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700">
                    Telegram Group
                  </Button>
                </Link>
                <Link href="/support">
                  <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 hover:text-blue-100">
                    Community Guidelines
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {supportFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-pink-500/20 hover:border-pink-500/40 p-6 transition-all hover:shadow-lg hover:shadow-pink-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-pink-500/10">
                    <feature.icon className="h-6 w-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 mb-4">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pink-300">{feature.stats}</span>
                      <Link href={feature.href}>
                        <Button variant="outline" className="border-pink-500/30 text-pink-300 hover:bg-pink-500/10 hover:text-pink-100">
                          Get Help
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
