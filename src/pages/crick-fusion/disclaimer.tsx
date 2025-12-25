'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  Scale, 
  ArrowLeft,
  Home,
  Calendar,
  XCircle,
  Shield,
  Gamepad2,
  Smartphone,
  Globe,
  ExternalLink,
  FileText  // ADD THIS IMPORT
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Disclaimer() {
  const [lastUpdated] = useState('January 2025');

  const sections = [
    {
      id: 'general-disclaimer',
      title: 'General Disclaimer',
      icon: <AlertTriangle size={20} />,
      content: `The information contained on the Shiva X Mods website and within our applications is for general information purposes only. Shiva X Mods assumes no responsibility for errors or omissions in the contents.

In no event shall Shiva X Mods be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service.`
    },
    {
      id: 'app-disclaimer',
      title: 'Application Disclaimer',
      icon: <Gamepad2 size={20} />,
      content: `All Shiva X Mods applications are provided "as is" without any warranties, expressed or implied. We do not warrant that:

• The apps will function uninterrupted, secure, or available at any particular time or location
• Any errors or defects will be corrected
• The apps are free of viruses or other harmful components
• The results of using the apps will meet your requirements

Use of our applications is at your own risk.`
    },
    {
      id: 'content-disclaimer',
      title: 'Content Disclaimer',
      icon: <Globe size={20} />,
      content: `Shiva X Mods reserves the right to make additions, deletions, or modifications to the contents on our apps at any time without prior notice.

Our applications may contain links to external websites that are not provided or maintained by or in any way affiliated with Shiva X Mods. Please note that Shiva X Mods does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.`
    },
    {
      id: 'fair-use',
      title: 'Fair Use Disclaimer',
      icon: <Scale size={20} />,
      content: `Shiva X Mods applications may include content that is not owned by Shiva X Mods. This content is provided for educational, entertainment, and informational purposes only, constituting "fair use" under applicable copyright laws.

If you wish to use copyrighted material from our applications for purposes beyond fair use, you must obtain permission from the copyright owner.`
    },
    {
      id: 'views-opinions',
      title: 'Views and Opinions',
      icon: <Smartphone size={20} />,
      content: `The views and opinions expressed in our applications are those of the developers and do not necessarily reflect the official policy or position of any other agency, organization, employer, or company.

Comments and user-generated content published in our applications are the sole responsibility of their writers, and the writers will take full responsibility, liability, and blame for any libel or litigation that results from something written in or as a direct result of something written in a comment.`
    },
    {
      id: 'no-responsibility',
      title: 'No Responsibility Disclaimer',
      icon: <XCircle size={20} />,
      content: `The information provided by Shiva X Mods is for general guidance on matters of interest only. Even if we take every precaution to ensure that the content is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules, and regulations, there may be delays, omissions, or inaccuracies in the information contained in our applications.

Shiva X Mods is not responsible for any errors or omissions, or for the results obtained from the use of this information.`
    },
    {
      id: 'use-at-your-own-risk',
      title: 'Use at Your Own Risk',
      icon: <AlertTriangle size={20} />,
      content: `All information in our applications is provided "as is", with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability, and fitness for a particular purpose.

In no event will Shiva X Mods, its related partnerships or corporations, or the partners, agents, or employees thereof be liable to you or anyone else for any decision made or action taken in reliance on the information in our applications or for any consequential, special, or similar damages, even if advised of the possibility of such damages.`
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: <Home size={20} />,
      content: `If you have any questions about this Disclaimer, please contact us at:

Email: sendsomegreens@gmail.com

We will respond to legitimate inquiries within a reasonable timeframe.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-gray-900/80 to-black/80" />
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Legal Disclaimer
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <span className="text-orange-400 font-medium">Important Notice</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Legal Disclaimer
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Important legal information regarding the use of Shiva X Mods 
              applications and services. Please read carefully.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm">Last Updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10">
                <XCircle size={16} className="text-red-400" />
                <span className="text-sm">No Warranties Provided</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10">
                <AlertTriangle size={16} className="text-yellow-400" />
                <span className="text-sm">Use at Your Own Risk</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-gradient-to-r from-red-900/30 via-orange-900/30 to-yellow-900/30 border border-red-500/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-red-500/20">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-red-300">Important Warning</h2>
                <p className="text-gray-300">
                  All Shiva X Mods applications are provided "AS IS" without any warranties. 
                  Use of our applications is at your own risk. We are not liable for any 
                  damages resulting from the use of our software. By using our applications, 
                  you acknowledge and accept these conditions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer Sections */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          <div className="sticky top-24 z-40 bg-gray-900/80 backdrop-blur-xl py-4 mb-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold">Complete Disclaimer</h2>
            <p className="text-gray-400 mt-2">Scroll to read all disclaimer information</p>
          </div>

          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 hover:border-orange-500/30 transition-colors"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-orange-500/20">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {section.title}
                    {section.id === 'use-at-your-own-risk' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                        Critical
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

        {/* Final Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-red-900/30 via-orange-900/30 to-yellow-900/30 border border-gray-800 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-red-300">Final Acknowledgement</h3>
                <p className="text-gray-300 mb-6">
                  By using any Shiva X Mods application, you acknowledge that you have read, 
                  understood, and agree to be bound by this disclaimer. If you do not agree 
                  with any part of this disclaimer, you must not use our applications.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl font-medium transition-all"
                  >
                    <Home size={18} />
                    Return to App Store
                  </Link>
                  <Link
                    href="/terms"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 hover:bg-gray-800/50 rounded-xl font-medium transition-colors"
                  >
                    <Scale size={18} />
                    View Terms of Service
                  </Link>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-700">
                <div className="text-center">
                  <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-400">
                    Use at your own risk
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
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Legal Disclaimer</h3>
                  <p className="text-sm text-gray-400">Shiva X Mods</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                This disclaimer governs the use of all Shiva X Mods applications and services.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Important Links</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Scale size={16} /> Terms of Service</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Shield size={16} /> Privacy Policy</Link></li>
                <li><Link href="/eula" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><FileText size={16} /> EULA</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal Documents</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Disclaimer (Current)</span></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/eula" className="text-gray-400 hover:text-white transition-colors">EULA</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Shiva X Mods. All rights reserved.
              <br />
              This disclaimer was last updated in {lastUpdated}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
