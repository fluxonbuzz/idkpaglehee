import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, HelpCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function Support() {
  const supportOptions = [
    {
      title: "Email Support",
      description: "Send us a direct message and we'll respond within 24 hours",
      icon: Mail,
      href: "mailto:support@shivaxmods.com",
      type: "Direct Help"
    },
    {
      title: "FAQs",
      description: "Find answers to frequently asked questions",
      icon: HelpCircle,
      href: "#faqs",
      type: "Self-Help"
    },
    {
      title: "Community Help",
      description: "Get help from our active community members",
      icon: MessageSquare,
      href: "/community",
      type: "Community"
    },
    {
      title: "Documentation",
      description: "Browse our comprehensive guides and tutorials",
      icon: FileText,
      href: "/tutorials",
      type: "Guides"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Container>
        <div className="py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4">
              Support
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We&apos;re here to help you with any issues or questions you might have
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/20 hover:border-green-500/40 p-6 transition-all hover:shadow-lg hover:shadow-green-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <option.icon className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-300 mb-2">
                      {option.type}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                    <p className="text-gray-400 mb-4">{option.description}</p>
                    <Link href={option.href}>
                      <Button variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/10 hover:text-green-100">
                        {option.type === "Direct Help" ? "Contact Us" : "View Details"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Need Immediate Help?</h2>
              <p className="text-gray-300 mb-6">
                Our average response time is under 6 hours for premium members. Consider upgrading for priority support.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="mailto:support@shivaxmods.com">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                    Email Support
                  </Button>
                </Link>
                <Link href="/membership">
                  <Button variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/10 hover:text-green-100">
                    Upgrade Membership
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
