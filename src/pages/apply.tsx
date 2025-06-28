'use client';

import { LockKeyhole, Clock, ScrollText, ShieldCheck, UserCog, AlertTriangle, CheckCircle, ArrowRight, X, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ApplyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            SHIVA X MODS
          </h1>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-purple-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-purple-300 transition-colors flex items-center">
                  Testimonials <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-300 transition-colors">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-gray-900 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Menu</h2>
          <button 
            className="p-1 rounded-md text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link 
                href="/" 
                className="block hover:text-purple-300 transition-colors p-2 rounded hover:bg-gray-800"
                onClick={() => setSidebarOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/testimonials" 
                className="block hover:text-purple-300 transition-colors p-2 rounded hover:bg-gray-800 flex items-center"
                onClick={() => setSidebarOpen(false)}
              >
                Testimonials <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="block hover:text-purple-300 transition-colors p-2 rounded hover:bg-gray-800"
                onClick={() => setSidebarOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <div 
                className="block bg-gray-700 text-gray-500 p-2 rounded border border-gray-600 cursor-not-allowed"
              >
                Apply Now (Closed)
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-red-600 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gray-800 p-4 rounded-full border-2 border-red-500">
                <LockKeyhole className="h-12 w-12 text-red-400" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-300">
            Applications Closed
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are not currently accepting new applications for the Guardianship program
          </p>
        </div>

        {/* Closed Notice */}
        <div className="my-16 bg-gradient-to-br from-red-900/50 to-gray-800/50 p-8 rounded-xl border border-red-500/30">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="p-4 bg-red-900/30 rounded-full border border-red-500">
                <LockKeyhole className="h-16 w-16 text-red-400" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Thank You for Your Interest</h2>
              <p className="text-lg text-gray-300 mb-6">
                Our Guardianship program is currently at capacity and we are not accepting new applications at this time.
              </p>
              <div className="space-y-4 max-w-md mx-auto md:mx-0">
                <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-bold text-amber-300 mb-1">Want to be notified when applications reopen?</h3>
                  <p className="text-sm">Join our announcement channel to stay updated</p>
                </div>
                <Link 
                  href="/contact" 
                  className="inline-block px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium border border-gray-600 transition-colors"
                >
                  Contact Us for Information
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Program Information (Kept for reference) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Requirements */}
          <div className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <ScrollText className="h-8 w-8 text-blue-400" />
              <h2 className="text-2xl font-bold">Requirements</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>Minimum 3 months active membership</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>Clean disciplinary record</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>Consistent positive community contributions</span>
              </li>
            </ul>
          </div>

          {/* Time Commitment */}
          <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-8 w-8 text-purple-400" />
              <h2 className="text-2xl font-bold">Time Commitment</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-bold text-purple-300 mb-1">Minimum</h3>
                <p className="text-sm">10-15 hours per week</p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-pink-500">
                <h3 className="font-bold text-pink-300 mb-1">Peak Periods</h3>
                <p className="text-sm">20+ hours during events</p>
              </div>
            </div>
          </div>

          {/* Expectations */}
          <div className="bg-gray-800/50 border border-pink-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-pink-500/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="h-8 w-8 text-pink-400" />
              <h2 className="text-2xl font-bold">Expectations</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <UserCog className="flex-shrink-0 h-5 w-5 text-pink-400 mt-0.5" />
                <span>Professional conduct at all times</span>
              </li>
              <li className="flex items-start gap-3">
                <UserCog className="flex-shrink-0 h-5 w-5 text-pink-400 mt-0.5" />
                <span>Active participation</span>
              </li>
              <li className="flex items-start gap-3">
                <UserCog className="flex-shrink-0 h-5 w-5 text-pink-400 mt-0.5" />
                <span>Confidentiality of sensitive information</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Current Guardians Info */}
        <div className="my-16 bg-gray-800/30 p-8 rounded-xl border border-green-500/30">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="p-4 bg-green-900/30 rounded-full border border-green-500">
                <ShieldCheck className="h-16 w-16 text-green-400" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Our Current Guardians</h2>
              <p className="text-lg text-gray-300 mb-6">
                While applications are closed, our dedicated team continues to maintain and protect our community.
              </p>
              <div className="space-y-4 max-w-md mx-auto md:mx-0">
                <Link 
                  href="/testimonials" 
                  className="inline-block px-6 py-3 bg-green-900/50 hover:bg-green-800 rounded-lg font-medium border border-green-700 transition-colors flex items-center justify-center"
                >
                  Meet Our Guardians <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Reopening Timeline */}
        <div className="my-16 bg-gray-800/50 p-8 rounded-xl border border-purple-500/30">
          <h2 className="text-3xl font-bold text-center mb-8">When Will Applications Reopen?</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-4 h-full w-0.5 bg-purple-500/50 top-0"></div>
              
              {/* Timeline Items */}
              <div className="space-y-8 pl-12">
                {[
                  {
                    date: "Current Status",
                    title: "Applications Closed",
                    description: "We are not currently reviewing new applications",
                    icon: <LockKeyhole className="h-6 w-6 text-red-400" />
                  },
                  {
                    date: "Next Review",
                    title: "Quarterly Evaluation",
                    description: "We reassess our staffing needs every 3 months",
                    icon: <Clock className="h-6 w-6 text-amber-400" />
                  },
                  {
                    date: "Potential Reopening",
                    title: "Limited Positions",
                    description: "When we reopen, we typically accept 2-4 new Guardians",
                    icon: <UserCog className="h-6 w-6 text-blue-400" />
                  }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 border-2 border-purple-500">
                      {item.icon}
                    </div>
                    <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors">
                      <p className="text-sm text-purple-300 mb-1">{item.date}</p>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                  SHIVA X MODS
                </h2>
                <p className="text-gray-500 text-sm mt-1">Community Guardianship Program</p>
              </div>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-gray-400 hover:text-purple-300 transition-colors">Privacy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-purple-300 transition-colors">Terms</Link>
                <Link href="/contact" className="text-gray-400 hover:text-purple-300 transition-colors">Contact</Link>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} SHIVA X MODS. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
