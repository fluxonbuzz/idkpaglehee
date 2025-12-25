'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Lock, 
  Download, 
  ArrowLeft,
  Home,
  Calendar,
  CheckCircle,
  XCircle,
  Smartphone,
  Cpu,
  Globe,
  User,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function EULA() {
  const [lastUpdated] = useState('January 2025');

  const sections = [
    {
      id: 'agreement',
      title: 'End User License Agreement',
      icon: <FileText size={20} />,
      content: `This End User License Agreement ("EULA") is a legal agreement between you (either an individual or a single entity) and Shiva X Mods for the software application(s) identified above, which includes computer software and may include associated media, printed materials, and "online" or electronic documentation ("SOFTWARE PRODUCT").`
    },
    {
      id: 'software-product',
      title: 'Software Product License',
      icon: <Lock size={20} />,
      content: `The SOFTWARE PRODUCT is protected by copyright laws and international copyright treaties, as well as other intellectual property laws and treaties. The SOFTWARE PRODUCT is licensed, not sold.

1. GRANT OF LICENSE. This EULA grants you the following rights:
   • Installation and Use. You may install and use an unlimited number of copies of the SOFTWARE PRODUCT on your personal devices.
   • Reproduction and Distribution. You may not reproduce or distribute copies of the SOFTWARE PRODUCT to third parties.

2. DESCRIPTION OF OTHER RIGHTS AND LIMITATIONS.
   • Limitations on Reverse Engineering. You may not reverse engineer, decompile, or disassemble the SOFTWARE PRODUCT.
   • Rental. You may not rent, lease, or lend the SOFTWARE PRODUCT.
   • Support Services. Shiva X Mods may provide you with support services related to the SOFTWARE PRODUCT.`
    },
    {
      id: 'copyright',
      title: 'Copyright',
      icon: <FileText size={20} />,
      content: `All title and copyrights in and to the SOFTWARE PRODUCT (including but not limited to any images, photographs, animations, video, audio, music, text, and "applets" incorporated into the SOFTWARE PRODUCT), the accompanying printed materials, and any copies of the SOFTWARE PRODUCT are owned by Shiva X Mods or its suppliers.

The SOFTWARE PRODUCT is protected by copyright laws and international treaty provisions. Therefore, you must treat the SOFTWARE PRODUCT like any other copyrighted material.`
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: <XCircle size={20} />,
      content: `Without prejudice to any other rights, Shiva X Mods may terminate this EULA if you fail to comply with the terms and conditions of this EULA. In such event, you must destroy all copies of the SOFTWARE PRODUCT and all of its component parts.`
    },
    {
      id: 'limited-warranty',
      title: 'Limited Warranty',
      icon: <AlertCircle size={20} />,
      content: `NO WARRANTIES. Shiva X Mods expressly disclaims any warranty for the SOFTWARE PRODUCT. The SOFTWARE PRODUCT and any related documentation is provided "as is" without warranty of any kind, either express or implied, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, or noninfringement.

The entire risk arising out of use or performance of the SOFTWARE PRODUCT remains with you.`
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      icon: <AlertCircle size={20} />,
      content: `NO LIABILITY FOR DAMAGES. In no event shall Shiva X Mods be liable for any damages whatsoever (including, without limitation, damages for loss of business profits, business interruption, loss of business information, or any other pecuniary loss) arising out of the use of or inability to use this SOFTWARE PRODUCT, even if Shiva X Mods has been advised of the possibility of such damages.`
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      icon: <Globe size={20} />,
      content: `This EULA shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with this EULA shall be subject to the exclusive jurisdiction of the courts of India.`
    },
    {
      id: 'complete-agreement',
      title: 'Complete Agreement',
      icon: <CheckCircle size={20} />,
      content: `This EULA constitutes the entire agreement between you and Shiva X Mods relating to the SOFTWARE PRODUCT and supersedes all prior or contemporaneous oral or written communications, proposals, and representations with respect to the SOFTWARE PRODUCT or any other subject matter covered by this EULA.`
    },
    {
      id: 'modifications',
      title: 'Modifications',
      icon: <Calendar size={20} />,
      content: `Shiva X Mods reserves the right to modify this EULA at any time. Modifications will be effective immediately upon posting on our website or within the SOFTWARE PRODUCT. Your continued use of the SOFTWARE PRODUCT following any modification constitutes your acceptance of the modified EULA.`
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
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  End User License Agreement
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
              <Lock className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium">License Agreement</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              End User License Agreement
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              This EULA governs your use of Shiva X Mods software applications.
              By installing or using our apps, you accept these terms.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm">Last Updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10">
                <AlertCircle size={16} className="text-red-400" />
                <span className="text-sm">Legal License Agreement</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* EULA Sections */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          <div className="sticky top-24 z-40 bg-gray-900/80 backdrop-blur-xl py-4 mb-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold">Complete EULA</h2>
            <p className="text-gray-400 mt-2">Scroll to read the full license agreement</p>
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
                    {section.id === 'agreement' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                        Important
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
          <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 border border-gray-800 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">License Acceptance</h3>
                <p className="text-gray-300 mb-6">
                  By installing, copying, or otherwise using the SOFTWARE PRODUCT, 
                  you agree to be bound by the terms of this EULA. If you do not agree 
                  to the terms of this EULA, do not install or use the SOFTWARE PRODUCT.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl font-medium transition-all"
                  >
                    <Home size={18} />
                    Return to App Store
                  </Link>
                  <Link
                    href="/terms"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 hover:bg-gray-800/50 rounded-xl font-medium transition-colors"
                  >
                    <FileText size={18} />
                    View Terms of Service
                  </Link>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-700">
                <div className="text-center">
                  <Lock className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-400">
                    Software License Agreement
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
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">End User License Agreement</h3>
                  <p className="text-sm text-gray-400">Shiva X Mods</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                This EULA governs the licensing and use of Shiva X Mods software applications.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Related Documents</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><FileText size={16} /> Terms of Service</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Lock size={16} /> Privacy Policy</Link></li>
                <li><Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><AlertCircle size={16} /> Disclaimer</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">EULA (Current)</span></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Shiva X Mods. All rights reserved.
              <br />
              This EULA was last updated in {lastUpdated}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
