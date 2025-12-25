'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Send, 
  ArrowLeft,
  Home,
  Users,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Phone,
  Globe,
  ExternalLink,
  Clock,
  MapPin,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      title: 'Email Support',
      description: 'For general inquiries and support',
      icon: <Mail size={24} />,
      value: 'sendsomegreens@gmail.com',
      link: 'mailto:sendsomegreens@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Telegram Community',
      description: 'Join our community for updates',
      icon: <Users size={24} />,
      value: '@shivaxmods1',
      link: 'https://t.me/shivaxmods1',
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Response Time',
      description: 'We aim to respond quickly',
      icon: <Clock size={24} />,
      value: '24-48 hours',
      link: null,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const faqs = [
    {
      question: 'How do I report a bug?',
      answer: 'Please email us with details about the bug, including your device model, app version, and steps to reproduce the issue.'
    },
    {
      question: 'Can I request a feature?',
      answer: 'Yes! We welcome feature suggestions. Please share your ideas through our contact form or community channels.'
    },
    {
      question: 'Do you provide app support?',
      answer: 'We provide basic support for all our applications. For complex issues, we may request additional information.'
    },
    {
      question: 'How can I join your team?',
      answer: 'We occasionally look for talented developers and designers. Send your portfolio to our email for consideration.'
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
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Contact Us
                </h1>
                <p className="text-xs text-gray-400">Shiva X Mods Support</p>
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
        <div className="max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Shiva X Mods
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Have questions, feedback, or need support? We're here to help. 
              Reach out to us through any of the channels below.
            </p>
          </motion.div>
        </div>

        {/* Contact Methods */}
        <div className="max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Contact Methods</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className={`bg-gradient-to-br ${method.color} rounded-2xl p-6 border border-gray-800`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-white/10">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{method.title}</h3>
                      <p className="text-sm text-gray-200">{method.description}</p>
                    </div>
                  </div>
                  {method.link ? (
                    <a
                      href={method.link}
                      target={method.link.startsWith('http') ? '_blank' : '_self'}
                      className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{method.value}</span>
                        <ExternalLink size={18} className="text-gray-300" />
                      </div>
                    </a>
                  ) : (
                    <div className="p-3 rounded-xl bg-white/5">
                      <span className="font-medium">{method.value}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact Form & FAQ Grid */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="font-medium text-green-400">Message Sent Successfully!</p>
                    <p className="text-sm text-green-300">We'll get back to you soon.</p>
                  </div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="support">Technical Support</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="business">Business Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-blue-500/30 transition-colors"
                  >
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <MessageSquare size={16} className="text-blue-400" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-300 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Links */}
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
              <p className="text-gray-300 mb-6">
                Connect with other users, get updates, and share your experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://t.me/shivaxmods1"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors"
                >
                  <Users size={18} />
                  Telegram
                </a>
                <a
                  href="https://youtube.com/@shivaxmods"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-xl transition-colors"
                >
                  <ExternalLink size={18} />
                  YouTube
                </a>
                <a
                  href="https://instagram.com/shivaxmods"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-pink-500 hover:bg-pink-600 rounded-xl transition-colors"
                >
                  <ExternalLink size={18} />
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Response Time Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Our Support Promise</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Clock className="h-6 w-6 text-green-400 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Quick Response</h4>
                      <p className="text-sm text-gray-400">We aim to respond within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Quality Support</h4>
                      <p className="text-sm text-gray-400">Detailed and helpful responses</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-purple-400 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Privacy Protected</h4>
                      <p className="text-sm text-gray-400">Your information is safe with us</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-orange-400 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Community Driven</h4>
                      <p className="text-sm text-gray-400">Feedback shapes our updates</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-gray-700">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-300">
                    We're here to help you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Contact Shiva X Mods</h3>
                  <p className="text-sm text-gray-400">Support & Inquiries</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                We value your feedback and are committed to providing excellent support 
                for all our applications.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Home size={16} /> Home</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Shield size={16} /> Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><FileText size={16} /> Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support Hours</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Monday - Friday: 9 AM - 6 PM IST</li>
                <li className="text-gray-400">Saturday: 10 AM - 2 PM IST</li>
                <li className="text-gray-400">Sunday: Closed</li>
                <li className="text-gray-400 mt-4">Emergency: sendsomegreens@gmail.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Shiva X Mods. All rights reserved.
              <br />
              Contact support available in English and Hindi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
