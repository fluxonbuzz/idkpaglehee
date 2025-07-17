// src/pages/membership.tsx
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ShoppingCart, Zap, Users, AlertCircle, Star, Check, X, ArrowRight } from 'lucide-react';

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  features: string[];
  popular?: boolean;
  discountCode?: string;
  discountAmount?: string;
}

const membershipPlans: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 50,
    duration: 'Lifetime',
    features: [
      'Premium game leaks',
      'Standard support response',
      'Access to limited content'
    ],
    discountCode: 'SX20',
    discountAmount: '₹20 off'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 150,
    duration: 'Lifetime',
    features: [
      'Early access to Shiva X mod videos',
      'Priority replies from ShivaXD',
      'Premium game leaks',
      'Get games 15 min before release'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 250,
    originalPrice: 500,
    duration: 'Lifetime',
    features: [
      'Watch Shiva X videos before upload',
      'Instant replies from ShivaXD',
      'Exclusive premium leaks',
      'Get games 30 min before release',
      'VIP support channel access'
    ]
  }
];

export default function MembershipPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
           onClick={() => setSidebarOpen(false)}></div>
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800/90 backdrop-blur-lg border-r border-purple-800/30 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SX Store
            </h2>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <nav className="space-y-2">
            <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <Home size={18} /> Home
            </Link>
            <Link href="/store" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <ShoppingCart size={18} /> Store
            </Link>
            <Link href="/games" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <Zap size={18} /> Games
            </Link>
            <Link href="/community" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <Users size={18} /> Community
            </Link>
            <Link href="/status" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <AlertCircle size={18} /> Status
            </Link>
            <Link href="/membership" className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/30 hover:bg-purple-800/30 transition">
              <Star size={18} /> Membership
            </Link>
          </nav>
        </div>
      </div>

      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-40 border-b border-purple-800/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              SX Store
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="hover:text-purple-300 transition">Home</Link>
            <Link href="/store" className="hover:text-purple-300 transition">Store</Link>
            <Link href="/downloads" className="hover:text-purple-300 transition">Games</Link>
            <Link href="/community" className="hover:text-purple-300 transition">Community</Link>
            <Link href="/status" className="hover:text-purple-300 transition">Status</Link>
            <Link href="/membership" className="hover:text-purple-300 transition">Membership</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-lg">
            Exclusive Benefits
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent leading-tight">
            Membership Plans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock premium features and get exclusive access to content and support
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipPlans.map(plan => (
            <div 
              key={plan.id}
              className={`relative bg-gray-800/30 backdrop-blur-sm rounded-xl border hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 overflow-hidden ${plan.popular ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' : 'border-gray-700/50'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ₹{plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-sm line-through text-gray-400 ml-2">₹{plan.originalPrice}</span>
                  )}
                  <span className="block text-gray-300 text-sm">{plan.duration}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.discountCode && (
                  <div className="text-xs bg-gray-700/50 px-3 py-2 rounded-lg mb-4">
                    Use code <span className="font-bold">{plan.discountCode}</span> for {plan.discountAmount}
                  </div>
                )}
                
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full py-3 px-6 rounded-lg font-bold transition ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/50'}`}
                >
                  Get {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedPlan && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-purple-800/50 max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedPlan.name} Membership</h3>
                <button 
                  onClick={() => setSelectedPlan(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-bold">
                  ₹{selectedPlan.price}
                </span>
                {selectedPlan.originalPrice && (
                  <span className="text-sm line-through text-gray-400 ml-2">₹{selectedPlan.originalPrice}</span>
                )}
                <span className="block text-gray-300 text-sm">{selectedPlan.duration}</span>
              </div>
              
              <ul className="space-y-2 mb-6">
                {selectedPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={14} className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {selectedPlan.discountCode && (
                <div className="text-xs bg-gray-700/50 px-3 py-2 rounded-lg mb-4">
                  Use code <span className="font-bold">{selectedPlan.discountCode}</span> for {selectedPlan.discountAmount}
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 bg-gray-700/50 hover:bg-gray-700/70 text-white font-bold py-2 px-4 rounded-lg transition border border-gray-600/50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle purchase logic here
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900/50 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SX Store</h3>
              <p className="text-gray-400 text-sm">
                Premium digital products for gaming enthusiasts. Get the best accounts, tools, and services.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-purple-300 transition text-sm">Home</Link></li>
                <li><Link href="/store" className="text-gray-400 hover:text-purple-300 transition text-sm">Store</Link></li>
                <li><Link href="/games" className="text-gray-400 hover:text-purple-300 transition text-sm">Games</Link></li>
                <li><Link href="/membership" className="text-gray-400 hover:text-purple-300 transition text-sm">Membership</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 hover:text-purple-300 transition text-sm">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-purple-300 transition text-sm">Privacy Policy</Link></li>
                <li><Link href="/refund" className="text-gray-400 hover:text-purple-300 transition text-sm">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22-.06-.32-.13-.1-.32-.02-.45.02-.2.06-3.39 2.14-4.84 3.06-.52.33-1 .5-1.43.5-.48 0-1.4-.27-2.08-.99-.75-.79-1.4-2.25-1.4-3.43 0-1.64 1.13-2.45 2.11-2.45.53 0 .98.18 1.38.4.25.15.47.33.68.55.23.23.46.46.75.68.32.25.7.38 1.12.38.42 0 .86-.13 1.23-.4 1.37-1.04 2.14-2.6 2.14-2.6.1-.2.25-.3.45-.3.1 0 .25.02.35.1.22.15.3.45.2.75z"/>
                  </svg>
                  <a href="https://t.me/lyastral" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                    @fluxon
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22-.06-.32-.13-.1-.32-.02-.45.02-.2.06-3.39 2.14-4.84 3.06-.52.33-1 .5-1.43.5-.48 0-1.4-.27-2.08-.99-.75-.79-1.4-2.25-1.4-3.43 0-1.64 1.13-2.45 2.11-2.45.53 0 .98.18 1.38.4.25.15.47.33.68.55.23.23.46.46.75.68.32.25.7.38 1.12.38.42 0 .86-.13 1.23-.4 1.37-1.04 2.14-2.6 2.14-2.6.1-.2.25-.3.45-.3.1 0 .25.02.35.1.22.15.3.45.2.75z"/>
                  </svg>
                  <a href="https://t.me/shivaxmods42" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                    @ShivaXD
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} SX Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
