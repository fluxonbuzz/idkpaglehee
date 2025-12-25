'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Scale, 
  AlertTriangle, 
  ArrowLeft,
  Home,
  Calendar,
  CheckCircle,
  XCircle,
  Shield,
  ExternalLink,
  User,
  Smartphone,
  Globe,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  const [lastUpdated] = useState('January 2025');

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <CheckCircle size={20} />,
      content: `By downloading, installing, or using any application developed by Shiva X Mods ("our apps"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our applications.`
    },
    {
      id: 'license',
      title: 'License Grant',
      icon: <FileText size={20} />,
      content: `Shiva X Mods grants you a limited, non-exclusive, non-transferable, revocable license to:
      
      1. Download and install our applications on personal devices
      2. Use our applications for personal, non-commercial purposes
      3. Access and use the content and services provided within the apps
      
      This license does not permit you to:
      • Modify, reverse engineer, or decompile the apps
      • Distribute or sell copies of the apps
      • Use the apps for commercial purposes
      • Remove any copyright or proprietary notices`
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: <User size={20} />,
      content: `As a user of our applications, you agree to:
      
      • Use the apps only for lawful purposes
      • Not attempt to hack, cheat, or exploit bugs in the apps
      • Not use automated systems to access our services
      • Not harass other users in multiplayer features
      • Respect intellectual property rights
      
      Violation of these responsibilities may result in termination of your access.`
    },
    {
      id: 'content',
      title: 'User-Generated Content',
      icon: <Globe size={20} />,
      content: `Some of our applications may allow user-generated content. By submitting content, you:
      
      • Grant us a worldwide license to use, modify, and display your content
      • Warrant that you own or have rights to the content
      • Agree that content does not violate any laws or third-party rights
      
      We reserve the right to remove any user-generated content at our discretion.`
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer of Warranties',
      icon: <AlertTriangle size={20} />,
      content: `OUR APPLICATIONS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
      
      • WARRANTIES OF MERCHANTABILITY
      • FITNESS FOR A PARTICULAR PURPOSE
      • NON-INFRINGEMENT
      
      We do not guarantee that:
      • The apps will meet your requirements
      • The apps will be uninterrupted or error-free
      • Defects will be corrected
      • The apps are free of viruses or other harmful components`
    },
    {
      id: 'limitation',
      title: 'Limitation of Liability',
      icon: <Scale size={20} />,
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, SHIVA X MODS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
      
      • LOSS OF PROFITS
      • LOSS OF DATA
      • BUSINESS INTERRUPTION
      • DEVICE DAMAGE
      
      Our total liability shall not exceed the amount you paid for the app, or if free, $0.00.`
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: <XCircle size={20} />,
      content: `We may terminate or suspend your access to our applications immediately, without prior notice, for:
      
      • Violation of these Terms of Service
      • Illegal or fraudulent activity
      • Harmful behavior towards other users
      • Any other reason at our sole discretion
      
      Upon termination, your right to use the apps will cease immediately.`
    },
    {
      id: 'modifications',
      title: 'Modifications to Terms',
      icon: <Calendar size={20} />,
      content: `We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes by:
      
      • Updating the "Last Updated" date
      • Posting notice within the applications
      • Publishing updates on our website
      
      Your continued use of our applications after changes constitutes acceptance of the modified terms.`
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      icon: <Scale size={20} />,
      content: `These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
      
      Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in India.`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: <User size={20} />,
      content: `For questions about these Terms of Service, please contact us at:
      
      Email: sendsomegreens@gmail.com
      
      We aim to respond to all legitimate inquiries within 7 business days.`
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
                <Scale className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Terms of Service
                </h1>
                <p className="text-xs text-gray-400">Shiva X Mods</p>
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
              <Scale className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Legal Terms</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Please read these terms carefully before using Shiva X Mods applications.
              By using our apps, you agree to be bound by these terms.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm">Last Updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10">
                <AlertTriangle size={16} className="text-yellow-400" />
                <span className="text-sm">Legal Agreement</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-sm">Required Reading</span>
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
              <div className="p-3 rounded-xl bg-yellow-500/20">
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Important Points</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-400 mt-1" />
                    <span>Personal, non-commercial use only</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-400 mt-1" />
                    <span>No modification or redistribution allowed</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle size={18} className="text-red-400 mt-1" />
                    <span>Apps provided "as is" without warranties</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle size={18} className="text-red-400 mt-1" />
                    <span>Limited liability for any damages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          <div className="sticky top-24 z-40 bg-gray-900/80 backdrop-blur-xl py-4 mb-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold">Complete Terms</h2>
            <p className="text-gray-400 mt-2">Scroll to read all terms and conditions</p>
          </div>

          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 hover:border-yellow-500/30 transition-colors"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-yellow-500/20">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {section.title}
                    {section.id === 'acceptance' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                        Required
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

        {/* Acceptance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-yellow-900/30 via-orange-900/30 to-red-900/30 border border-gray-800 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Acceptance of Terms</h3>
                <p className="text-gray-300 mb-6">
                  By downloading or using any Shiva X Mods application, you acknowledge that 
                  you have read, understood, and agree to be bound by these Terms of Service.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-xl font-medium transition-all"
                  >
                    <Home size={18} />
                    Return to App Store
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 hover:bg-gray-800/50 rounded-xl font-medium transition-colors"
                  >
                    <Shield size={18} />
                    View Privacy Policy
                  </Link>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-700">
                <div className="text-center">
                  <Scale className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-400">
                    Legal agreement between you and Shiva X Mods
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
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Scale className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Terms of Service</h3>
                  <p className="text-sm text-gray-400">Shiva X Mods</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                These terms govern your use of all Shiva X Mods applications and services.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Home size={16} /> Home</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Shield size={16} /> Privacy Policy</Link></li>
                <li><Link href="/eula" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><FileText size={16} /> EULA</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal Documents</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Terms of Service (Current)</span></li>
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/eula" className="text-gray-400 hover:text-white transition-colors">EULA</Link></li>
                <li><Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Shiva X Mods. All rights reserved.
              <br />
              These terms were last updated in {lastUpdated}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
