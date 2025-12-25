'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Globe, 
  Mail, 
  Calendar,
  ExternalLink,
  ArrowLeft,
  Home,
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  Database,
  Shield,
  Cpu,
  Smartphone
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  const [lastUpdated] = useState('December 2025');

  const sections = [
    {
      id: 'information-collection',
      title: 'Information Collection',
      icon: <Database size={20} />,
      content: `Crick Fusion does NOT collect, store, or share any personal information from users. We do not require account creation, login credentials, or any personally identifiable information to use our applications.`
    },
    {
      id: 'third-party-ads',
      title: 'Third-Party Advertising',
      icon: <Globe size={20} />,
      content: `The app may display advertisements provided by third-party services (such as Google AdMob). These services may collect anonymous data for:
      
      • Ad personalization and targeting
      • Analytics and performance metrics
      • Ad impression tracking
      
      We do not have access to or control over the data collected by these third-party providers. We recommend reviewing their respective privacy policies:
      
      • Google AdMob: https://policies.google.com/privacy
      • Unity Ads: https://unity3d.com/legal/privacy-policy
      • Other ad networks as applicable`
    },
    {
      id: 'app-permissions',
      title: 'App Permissions',
      icon: <Shield size={20} />,
      content: `Crick Fusion requests only essential permissions for normal app functionality:
      
      • Internet Access: Required for downloading game assets and displaying ads
      • Storage Access: Required for saving game data and updates locally
      • Network State: Required to optimize app behavior based on connectivity
      
      No sensitive permissions (contacts, location, camera, microphone) are requested or required.`
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <Lock size={20} />,
      content: `We implement reasonable security measures to protect any information processed by our apps. However, no method of transmission over the Internet or electronic storage is 100% secure.`
    },
    {
      id: 'children-privacy',
      title: "Children's Privacy",
      icon: <Users size={20} />,
      content: `Our applications are suitable for users of all ages. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.`
    },
    {
      id: 'device-information',
      title: 'Device Information',
      icon: <Smartphone size={20} />,
      content: `For app functionality and optimization, we may collect anonymous, non-personal device information such as:
      
      • Device type and model
      • Operating system version
      • App version and usage statistics
      • Crash reports and error logs
      
      This information is used solely for:
      • Improving app performance
      • Fixing bugs and crashes
      • Understanding usage patterns
      • Optimizing for different devices`
    },
    {
      id: 'updates-changes',
      title: 'Updates to This Policy',
      icon: <Calendar size={20} />,
      content: `We may update this Privacy Policy from time to time. We will notify users of any material changes by:
      
      • Posting the new Privacy Policy on this page
      • Updating the "Last Updated" date
      • In-app notifications for major changes
      
      You are advised to review this Privacy Policy periodically for any changes.`
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: <Mail size={20} />,
      content: `If you have any questions or concerns about this Privacy Policy, please contact us at:
      
      Email: sendsomegreens@gmail.com
      
      We will make our best effort to respond to all legitimate inquiries within a reasonable timeframe.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-gray-900/80 to-black/80" />
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Shiva X Mods
                </h1>
                <p className="text-xs text-gray-400">Privacy & Security</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Store
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Privacy First</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains what information we collect, 
              how we use it, and your rights regarding your personal data.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm">Last Updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-sm">No Personal Data Collected</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <AlertCircle className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">At a Glance</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <CheckCircle size={18} className="text-green-400" />
                    </div>
                    <span>No account registration required</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <CheckCircle size={18} className="text-green-400" />
                    </div>
                    <span>No personal data collection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/20">
                      <Eye size={18} className="text-yellow-400" />
                    </div>
                    <span>Third-party ads may collect anonymous data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <CheckCircle size={18} className="text-green-400" />
                    </div>
                    <span>All data stored locally on device</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Policy Sections */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          <div className="sticky top-24 z-40 bg-gray-900/80 backdrop-blur-xl py-4 mb-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold">Detailed Policy</h2>
            <p className="text-gray-400 mt-2">Scroll to read our complete privacy policy</p>
          </div>

          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 hover:border-blue-500/30 transition-colors"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {section.title}
                    {section.id === 'information-collection' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                        Most Important
                      </span>
                    )}
                  </h3>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 border border-gray-800 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Need More Information?</h3>
                <p className="text-gray-300 mb-6">
                  If you have specific questions about how your data is handled 
                  or want to learn more about our privacy practices, we're here to help.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:sendsomegreens@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl font-medium transition-all"
                  >
                    <Mail size={18} />
                    Email Us
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 hover:bg-gray-800/50 rounded-xl font-medium transition-colors"
                  >
                    <Home size={18} />
                    Return Home
                  </Link>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-700">
                <div className="text-center">
                  <ShieldCheck className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-400">
                    Committed to protecting your privacy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Top */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-700 hover:bg-gray-800/50 transition-colors"
          >
            <ArrowLeft className="rotate-90" size={18} />
            Back to Top
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Shiva X Mods</h3>
                  <p className="text-sm text-gray-400">Privacy Policy</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                This privacy policy applies to all Shiva X Mods applications, 
                including Crick Fusion and related games.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Home size={16} /> Home</Link></li>
                <li><Link href="/games" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><FileText size={16} /> All Games</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Mail size={16} /> Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Privacy Policy (Current)</span></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/eula" className="text-gray-400 hover:text-white transition-colors">EULA</Link></li>
                <li><Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Shiva X Mods. All rights reserved.
              <br />
              This privacy policy was last updated in {lastUpdated}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
