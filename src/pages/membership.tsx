// src/pages/membership.tsx
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ShoppingCart, Zap, Users, AlertCircle, Star, Check, X, ArrowRight, ShieldCheck, Tag, Gift, Download, Phone, Mail } from 'lucide-react';

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

interface DiscountCode {
  code: string;
  discount: number;
  minPurchase: number;
  type: 'percentage' | 'fixed';
}

const discountCodes: DiscountCode[] = [
  { code: 'WELCOME10', discount: 10, minPurchase: 100, type: 'percentage' },
  { code: 'SX20', discount: 20, minPurchase: 50, type: 'percentage' },
  { code: 'SAVE50', discount: 50, minPurchase: 200, type: 'fixed' }
];

interface Seller {
  name: string;
  telegram: string;
  paymentMethods: string[];
  profilePic: string;
  telegramLink: string;
}

const sellers: Seller[] = [
  {
    name: 'Fluxon',
    telegram: '@Fluxon',
    paymentMethods: ['UPI'],
    profilePic: '/assets/d4vd-avatar.jpg',
    telegramLink: 'https://t.me/lyastral'
  },
  {
    name: 'Shiva XD',
    telegram: '@ShivaXD',
    paymentMethods: ['UPI'],
    profilePic: '/assets/avatar.png',
    telegramLink: 'https://t.me/shivaxmods42'
  }
];

export default function MembershipPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [discountError, setDiscountError] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showSellers, setShowSellers] = useState(false);

  const applyDiscount = () => {
    const code = discountCodes.find(dc => dc.code === discountCode.toUpperCase());
    if (!code) {
      setDiscountError('Invalid discount code');
      return;
    }

    if (selectedPlan && selectedPlan.price < code.minPurchase) {
      setDiscountError(`Minimum purchase of ₹${code.minPurchase} required`);
      return;
    }

    setAppliedDiscount(code);
    setDiscountError('');
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
  };

  const calculateTotal = () => {
    if (!selectedPlan) return { subtotal: 0, discount: 0, total: 0 };
    
    const subtotal = selectedPlan.price;
    let discount = 0;
    
    if (appliedDiscount) {
      if (appliedDiscount.type === 'percentage') {
        discount = subtotal * (appliedDiscount.discount / 100);
      } else {
        discount = appliedDiscount.discount;
      }
    }

    const total = subtotal - discount;
    return { subtotal, discount, total };
  };

  const generateTransactionId = () => {
    return 'SX-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + 
           Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  const generateReceipt = () => {
    if (!agreeToTerms) {
      setDiscountError('You must agree to the terms and conditions');
      return;
    }

    if (!selectedPlan) return;

    const { subtotal, discount, total } = calculateTotal();
    const now = new Date();
    const transactionId = generateTransactionId();
    
    let receipt = `📃 SX MEMBERSHIP RECEIPT\n`;
    receipt += `===================\n`;
    receipt += `MEMBERSHIP PLAN:\n`;
    receipt += `• ${selectedPlan.name} Membership - ₹${selectedPlan.price}\n`;
    
    if (selectedPlan.originalPrice) {
      receipt += `Original Price: ₹${selectedPlan.originalPrice}\n`;
    }
    
    receipt += `====================\n`;
    receipt += `PURCHASE TIME: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}\n`;
    receipt += `TRANSACTION ID: ${transactionId}\n`;
    
    if (discount > 0) {
      receipt += `DISCOUNT USED: ${appliedDiscount?.code} (-₹${discount.toFixed(2)})\n`;
    }
    
    receipt += `====================\n`;
    receipt += `FEATURES INCLUDED:\n`;
    selectedPlan.features.forEach(feature => {
      receipt += `• ${feature}\n`;
    });
    
    receipt += `====================\n`;
    receipt += `⚠ PLEASE READ TERMS, REFUND & PRIVACY POLICIES BEFORE THE PAYMENT.\n`;
    receipt += `====================\n`;
    receipt += `SUBTOTAL: ₹${subtotal.toFixed(2)}\n`;
    receipt += `TOTAL: ₹${total.toFixed(2)}\n`;
    receipt += `====================\n`;
    receipt += `THANKS FOR PURCHASING\n`;
    receipt += `Contact: @Fluxon or @ShivaXD\n`;
    
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SX_Membership_Receipt_${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowSellers(true);
  };

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
                  onClick={() => {
                    setSelectedPlan(plan);
                    setShowPayment(true);
                  }}
                  className={`w-full py-3 px-6 rounded-lg font-bold transition ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/50'}`}
                >
                  Get {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedPlan && showPayment && !showSellers && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-purple-800/50 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedPlan.name} Membership</h3>
                <button 
                  onClick={() => {
                    setSelectedPlan(null);
                    setShowPayment(false);
                  }}
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
              
              <div className="mb-6">
                <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
                  <Tag size={16} /> Discount Code
                </h3>
                {appliedDiscount ? (
                  <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <span className="font-bold">{appliedDiscount.code}</span>
                      <span className="text-sm text-gray-300 ml-2">
                        ({appliedDiscount.discount}{appliedDiscount.type === 'percentage' ? '% off' : '₹ off'})
                      </span>
                    </div>
                    <button 
                      onClick={removeDiscount}
                      className="text-gray-300 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                    <button
                      onClick={applyDiscount}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {discountError && (
                  <p className="text-red-400 text-sm mt-2">{discountError}</p>
                )}
              </div>
              
              <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 mb-6">
                <h3 className="font-bold mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal</span>
                    <span>₹{calculateTotal().subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Discount</span>
                      <span className="text-green-400">
                        -₹{calculateTotal().discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-600/30 mt-2">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-lg">
                      ₹{calculateTotal().total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={() => setAgreeToTerms(!agreeToTerms)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the <Link href="/terms" className="text-purple-400 hover:underline">Terms of Service</Link>, 
                    <Link href="/privacy" className="text-purple-400 hover:underline"> Privacy Policy</Link>, and 
                    <Link href="/refund" className="text-purple-400 hover:underline"> Refund Policy</Link>. 
                    I understand that memberships are non-refundable after activation.
                  </span>
                </label>
              </div>
              
              <button
                onClick={generateReceipt}
                disabled={!agreeToTerms}
                className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition ${!agreeToTerms ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {showSellers && selectedPlan && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-purple-800/50 max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Payment Instructions</h2>
                <button 
                  onClick={() => {
                    setShowSellers(false);
                    setShowPayment(true);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <p className="text-gray-300">
                  Please contact one of our sellers to complete your payment for the <span className="font-bold">{selectedPlan.name}</span> membership.
                  Share your receipt with them after payment.
                </p>
                
                {sellers.map((seller, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image 
                          src={seller.profilePic} 
                          alt={seller.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{seller.name}</h4>
                        <a 
                          href={seller.telegramLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-purple-300 hover:underline flex items-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22-.06-.32-.13-.1-.32-.02-.45.02-.2.06-3.39 2.14-4.84 3.06-.52.33-1 .5-1.43.5-.48 0-1.4-.27-2.08-.99-.75-.79-1.4-2.25-1.4-3.43 0-1.64 1.13-2.45 2.11-2.45.53 0 .98.18 1.38.4.25.15.47.33.68.55.23.23.46.46.75.68.32.25.7.38 1.12.38.42 0 .86-.13 1.23-.4 1.37-1.04 2.14-2.6 2.14-2.6.1-.2.25-.3.45-.3.1 0 .25.02.35.1.22.15.3.45.2.75z"/>
                          </svg>
                          {seller.telegram}
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {seller.paymentMethods.map((method, i) => (
                        <span key={i} className="text-xs bg-gray-600/50 px-2 py-1 rounded-full">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => {
                  setShowSellers(false);
                  setShowPayment(false);
                  setSelectedPlan(null);
                }}
                className="w-full bg-gray-700/50 hover:bg-gray-700/70 text-white font-bold py-3 px-4 rounded-lg transition border border-gray-600/50"
              >
                Close
              </button>
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
