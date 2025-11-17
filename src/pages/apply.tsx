'use client';

import { LockKeyhole, Clock, ScrollText, ShieldCheck, UserCog, AlertTriangle, CheckCircle, ArrowRight, X, Menu, Send, User, Mail, MessageSquare, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ApplyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discord: '',
    experience: '',
    motivation: '',
    availability: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Application submitted successfully! We will review your application and get back to you soon.');
  };

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
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white focus:outline-none transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-purple-500/25"
            onClick={() => setSidebarOpen(true)}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-purple-300 transition-colors transform hover:scale-105 duration-200">Home</Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-purple-300 transition-colors flex items-center transform hover:scale-105 duration-200">
                  Testimonials <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-300 transition-colors transform hover:scale-105 duration-200">Contact</Link>
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
            className="p-1 rounded-md text-gray-400 hover:text-white focus:outline-none transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-red-500/25"
            onClick={() => setSidebarOpen(false)}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link 
                href="/" 
                className="block hover:text-purple-300 transition-all duration-300 p-2 rounded hover:bg-gray-800 transform hover:translate-x-2"
                onClick={() => setSidebarOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/testimonials" 
                className="block hover:text-purple-300 transition-all duration-300 p-2 rounded hover:bg-gray-800 transform hover:translate-x-2 flex items-center"
                onClick={() => setSidebarOpen(false)}
              >
                Testimonials <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="block hover:text-purple-300 transition-all duration-300 p-2 rounded hover:bg-gray-800 transform hover:translate-x-2"
                onClick={() => setSidebarOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <div 
                className="block bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-lg border-2 border-emerald-400 cursor-pointer shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center font-bold"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.5)'
                }}
              >
                Apply Now (Open!)
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
              <div className="absolute -inset-4 bg-green-600 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gray-800 p-4 rounded-full border-2 border-green-500 shadow-2xl"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(20px)',
                  boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.4)'
                }}
              >
                <LockKeyhole className="h-12 w-12 text-green-400" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
            Applications Open!
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are now accepting applications for the Guardianship program. Apply now to join our elite team!
          </p>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-800/50 border-2 border-green-500/50 rounded-2xl p-8 shadow-2xl"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(10px)',
              boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-green-900/30 rounded-xl border border-green-500 shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(15px)'
                }}
              >
                <User className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold">Guardian Application Form</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <User className="h-4 w-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-500"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(5px)'
                    }}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-500"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(5px)'
                    }}
                    placeholder="Enter your email"
                  />
                </div>

                {/* Discord */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <MessageSquare className="h-4 w-4" />
                    Discord Username
                  </label>
                  <input
                    type="text"
                    name="discord"
                    value={formData.discord}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-500"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(5px)'
                    }}
                    placeholder="YourDiscord#1234"
                  />
                </div>

                {/* Availability */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Calendar className="h-4 w-4" />
                    Weekly Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-500"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(5px)'
                    }}
                  >
                    <option value="">Select your availability</option>
                    <option value="10-15">10-15 hours per week</option>
                    <option value="15-20">15-20 hours per week</option>
                    <option value="20-25">20-25 hours per week</option>
                    <option value="25+">25+ hours per week</option>
                  </select>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <ShieldCheck className="h-4 w-4" />
                  Previous Moderation Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-500 resize-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(5px)'
                  }}
                  placeholder="Describe your previous moderation or community management experience..."
                />
              </div>

              {/* Motivation */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <ScrollText className="h-4 w-4" />
                  Why do you want to become a Guardian?
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-500 resize-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(5px)'
                  }}
                  placeholder="Tell us why you're interested in joining our Guardianship program..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl border-2 border-emerald-400 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-emerald-500/25 flex items-center gap-3"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Program Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Requirements */}
          <div className="bg-gray-800/50 border-2 border-blue-500/30 rounded-xl p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(10px)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-900/30 rounded-lg border border-blue-500 shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(15px)'
                }}
              >
                <ScrollText className="h-6 w-6 text-blue-400" />
              </div>
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
          <div className="bg-gray-800/50 border-2 border-purple-500/30 rounded-xl p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(10px)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-900/30 rounded-lg border border-purple-500 shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(15px)'
                }}
              >
                <Clock className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold">Time Commitment</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-purple-500 shadow-lg">
                <h3 className="font-bold text-purple-300 mb-1">Minimum</h3>
                <p className="text-sm">10-15 hours per week</p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-pink-500 shadow-lg">
                <h3 className="font-bold text-pink-300 mb-1">Peak Periods</h3>
                <p className="text-sm">20+ hours during events</p>
              </div>
            </div>
          </div>

          {/* Expectations */}
          <div className="bg-gray-800/50 border-2 border-pink-500/30 rounded-xl p-6 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 transform hover:-translate-y-1"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(10px)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-pink-900/30 rounded-lg border border-pink-500 shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(15px)'
                }}
              >
                <ShieldCheck className="h-6 w-6 text-pink-400" />
              </div>
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

        {/* Application Tips */}
        <div className="my-16 bg-gradient-to-br from-blue-900/50 to-gray-800/50 p-8 rounded-2xl border-2 border-blue-500/30 shadow-2xl"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(10px)'
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="p-4 bg-blue-900/30 rounded-full border-2 border-blue-500 shadow-2xl"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(20px)'
                }}
              >
                <AlertTriangle className="h-16 w-16 text-blue-400" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Application Tips</h2>
              <p className="text-lg text-gray-300 mb-6">
                Make your application stand out with these helpful tips:
              </p>
              <div className="space-y-4 max-w-md mx-auto md:mx-0">
                <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-amber-500 shadow-lg">
                  <h3 className="font-bold text-amber-300 mb-1">Be Detailed</h3>
                  <p className="text-sm">Provide specific examples of your experience and contributions</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-green-500 shadow-lg">
                  <h3 className="font-bold text-green-300 mb-1">Show Enthusiasm</h3>
                  <p className="text-sm">Demonstrate your passion for our community</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-purple-500 shadow-lg">
                  <h3 className="font-bold text-purple-300 mb-1">Be Honest</h3>
                  <p className="text-sm">We value transparency and authenticity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                  SHIVA X MODS
                </h2>
                <p className="text-gray-500 text-sm mt-1">Community Guardianship Program</p>
              </div>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-gray-400 hover:text-purple-300 transition-colors transform hover:scale-105 duration-200">Privacy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-purple-300 transition-colors transform hover:scale-105 duration-200">Terms</Link>
                <Link href="/contact" className="text-gray-400 hover:text-purple-300 transition-colors transform hover:scale-105 duration-200">Contact</Link>
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
