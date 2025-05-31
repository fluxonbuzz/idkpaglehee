import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Video, Code2, Settings, FileText } from "lucide-react";
import Link from "next/link";

export default function Tutorials() {
  const tutorials = [
    {
      title: "Getting Started Guide",
      description: "Learn how to install and setup Shiva X Mods for the first time",
      icon: Settings,
      level: "Beginner",
      duration: "15 min",
      href: "#"
    },
    {
      title: "Mod Installation Tutorial",
      description: "Step-by-step guide to installing mods using our manager",
      icon: Download,
      level: "Beginner",
      duration: "10 min",
      href: "#"
    },
    {
      title: "Advanced Modding Techniques",
      description: "Learn how to create your own custom mods and tweaks",
      icon: Code2,
      level: "Advanced",
      duration: "45 min",
      href: "#"
    },
    {
      title: "Troubleshooting Common Issues",
      description: "Fix common problems with mod installation and gameplay",
      icon: FileText,
      level: "Intermediate",
      duration: "20 min",
      href: "#"
    },
    {
      title: "Video Tutorial Series",
      description: "Watch our comprehensive video tutorial series on YouTube",
      icon: Video,
      level: "All Levels",
      duration: "2h+",
      href: "#"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Container>
        <div className="py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
              Tutorials
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Learn how to get the most out of Shiva X Mods with our comprehensive guides and tutorials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-500/40 p-6 transition-all hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <tutorial.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 mb-2">
                      {tutorial.level} • {tutorial.duration}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
                    <p className="text-gray-400 mb-4">{tutorial.description}</p>
                    <Link href={tutorial.href}>
                      <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:text-purple-100">
                        View Tutorial
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Can't find what you're looking for?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/community">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                  Ask Our Community
                </Button>
              </Link>
              <Link href="/support">
                <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:text-purple-100">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
