// pages/membership.tsx
import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Send, Crown, Zap, Clock, Eye, MessageSquare, Video, Gamepad, Info, Check, X, ArrowRight, ShoppingCart } from 'lucide-react';

interface MembershipTier {
  id: string;
  name: string;
  price: number;
  features: {
    text: string;
    icon: React.ReactNode;
  }[];
  popular?: boolean;
  discount?: string;
  originalPrice?: number;
}

interface Seller {
  id: string;
  name: string;
  role: string;
  avatar: string;
  telegram: string;
}

const membershipTiers: MembershipTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 50,
    features: [
      {
        text: 'Premium game leaks',
        icon: <Eye className="w-5 h-5 text-blue-400" />
      },
      {
        text: 'Standard support response',
        icon: <MessageSquare className="w-5 h-5 text-blue-400" />
      },
      {
        text: 'Access to limited content',
        icon: <Gamepad className="w-5 h-5 text-blue-400" />
      }
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 150,
    features: [
      {
        text: 'Early access to Shiva X mod videos',
        icon: <Video className="w-5 h-5 text-teal-400" />
      },
      {
        text: 'Priority replies from ShivaXD',
        icon: <MessageSquare className="w-5 h-5 text-teal-400" />
      },
      {
        text: 'Premium game leaks',
        icon: <Eye className="w-5 h-5 text-teal-400" />
      },
      {
        text: 'Get games 15 min before release',
        icon: <Clock className="w-5 h-5 text-teal-400" />
      }
    ],
    popular: true,
    discount: 'Most Popular'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 250,
    features: [
      {
        text: 'Watch Shiva X videos before upload',
        icon: <Video className="w-5 h-5 text-emerald-400" />
      },
      {
        text: 'Instant replies from ShivaXD',
        icon: <MessageSquare className="w-5 h-5 text-emerald-400" />
      },
      {
        text: 'Exclusive premium leaks',
        icon: <Eye className="w-5 h-5 text-emerald-400" />
      },
      {
        text: 'Get games 30 min before release',
        icon: <Clock className="w-5 h-5 text-emerald-400" />
      },
      {
        text: 'VIP support channel access',
        icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
      }
    ],
    originalPrice: 500,
    discount: 'VIP Access'
  }
];

const sellers: Seller[] = [
  {
    id: 'd4vd',
    name: 'd4vd',
    role: 'Co-Owner',
    avatar: '/store/d4vd-avatar.jpg',
    telegram: 'https://t.me/lyastral'
  },
  {
    id: 'shiva',
    name: 'Shiva',
    role: 'Owner',
    avatar: '/store/shiva-avatar.jpg',
    telegram: 'https://t.me/shivaxd42'
  }
];

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(null);
  const [receiptData, setReceiptData] = useState({
    transactionId: '',
    date: '',
    tier: '',
    price: 0,
    status: 'pending'
  });
  const [discountCode, setDiscountCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);

  const applyDiscount = () => {
    if (discountCode.toUpperCase() === 'SX20' && selectedTier?.id === 'basic') {
      setReceiptData(prev => ({
        ...prev,
        price: Math.max(0, selectedTier.price - 20)
      }));
      setDiscountApplied(true);
      alert('Discount of ₹20 applied to Basic membership!');
    } else {
      alert('Invalid discount code or not applicable to this tier');
    }
  };

  const generateReceipt = (tier: MembershipTier) => {
    const transactionId = `SX-MEM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const date = new Date().toLocaleString();
    
    setReceiptData({
      transactionId,
      date,
      tier: tier.name,
      price: discountApplied && tier.id === 'basic' ? tier.price - 20 : tier.price,
      status: 'pending'
    });
    
    setSelectedTier(tier);
    setShowTermsError(false);
  };

  const copyReceiptToClipboard = () => {
    if (!selectedTier) return;
    
    if (!agreedToTerms) {
      setShowTermsError(true);
      return;
    }

    const receiptText = `
      SX STORE - PREMIUM MEMBERSHIP
      ----------------------------
      Transaction ID: ${receiptData.transactionId}
      Date: ${receiptData.date}
      
      MEMBERSHIP:
      - ${selectedTier.name} Tier: ₹${receiptData.price} (PERMANENT ACCESS)
      ${discountApplied ? '      - Discount Applied: ₹20 (SX20 code)\n' : ''}
      
      EXCLUSIVE BENEFITS:
      ${selectedTier.features.map(feature => `      • ${feature.text}`).join('\n')}
      
      CONTACT SELLERS:
      - d4vd (Co-Owner): https://t.me/lyastral
      - Shiva (Owner): https://t.me/shivaxd42
      
      🚀 SX Store - Premium Gaming Content
    `;

    navigator.clipboard.writeText(receiptText)
      .then(() => alert('Receipt copied to clipboard! Share it with the seller.'))
      .catch(() => alert('Failed to copy receipt. Please manually copy the transaction ID.'));
    
    setReceiptData({ ...receiptData, status: 'completed' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-40 border-b border-blue-800/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              SX Memberships
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="hover:text-blue-300 transition">Home</Link>
            <Link href="/store" className="hover:text-blue-300 transition">Store</Link>
            <Link href="/games" className="hover:text-blue-300 transition">Games</Link>
            <Link href="/community" className="hover:text-blue-300 transition">Community</Link>
            <Link href="/status" className="hover:text-blue-300 transition">Status</Link>
            <Link href="/membership" className="text-blue-300 font-medium transition">Membership</Link>
          </nav>
          <Link 
            href="/store" 
            className="px-4 py-2 bg-blue-700/50 hover:bg-blue-600/50 rounded-lg transition flex items-center gap-2"
          >
            <ShoppingCart size={18} /> Store
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Announcement Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 mb-12 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Crown className="text-yellow-300" /> 
                SPECIAL OFFER: PERMANENT ACCESS
              </h3>
              <p className="text-gray-200">One-time payment for lifetime membership benefits</p>
            </div>
            <Link 
              href="#pro" 
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-6 rounded-lg transition flex items-center gap-2 shadow-lg hover:shadow-blue-500/20"
            >
              View Plans <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-lg">
            Premium Content Access
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-teal-400 bg-clip-text text-transparent leading-tight">
            Unlock Exclusive Gaming Benefits
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get permanent access to premium content and direct support from our team
          </p>
        </section>

        {/* Membership Tiers */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ShieldCheck className="text-blue-400" />
            Membership Plans
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipTiers.map(tier => (
              <div 
                key={tier.id} 
                id={tier.id}
                className={`bg-gray-800/30 backdrop-blur-sm rounded-xl border ${tier.popular ? 'border-teal-500/50' : 'border-gray-700/50'} hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden`}
              >
                {tier.popular && (
                  <div className="bg-teal-500 text-white text-xs font-bold px-3 py-1 text-center">
                    {tier.discount}
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {tier.id === 'basic' && <Zap className="text-blue-400" />}
                      {tier.id === 'pro' && <Crown className="text-teal-400" />}
                      {tier.id === 'premium' && <ShieldCheck className="text-emerald-400" />}
                      {tier.name}
                    </h3>
                    {tier.originalPrice && (
                      <span className="text-xs line-through text-gray-400">₹{tier.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                      ₹{tier.price}
                    </span>
                    <span className="text-sm text-gray-400 ml-2">(Lifetime)</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={14} className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex justify-between items-center">
                    {tier.id === 'basic' && (
                      <span className="text-xs text-blue-400 flex items-center gap-1">
                        <Info size={14} /> Use code SX20 for ₹20 off
                      </span>
                    )}
                    <button
                      onClick={() => generateReceipt(tier)}
                      className={`bg-gradient-to-r ${tier.popular ? 'from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600' : 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} text-white font-bold py-2 px-4 rounded-lg transition text-sm`}
                    >
                      Get {tier.name}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="text-teal-400" /> Member Experiences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Gamepad className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold">Pro Gamer</h4>
                  <p className="text-xs text-gray-400">Pro Member</p>
                </div>
              </div>
              <p className="text-gray-300">
                "Getting Shiva's mod videos early gives me a huge advantage in tournaments!"
              </p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h4 className="font-bold">VIP Leaker</h4>
                  <p className="text-xs text-gray-400">Premium Member</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The permanent access is worth every rupee! I'm always first with content."
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Info className="text-blue-400" /> Common Questions
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" /> Is access really permanent?
              </h3>
              <p className="text-gray-300 pl-7">
                Yes! All memberships now provide lifetime access with a single payment. No renewals needed.
              </p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Video className="w-5 h-5 text-teal-400" /> How does the discount work?
              </h3>
              <p className="text-gray-300 pl-7">
                Use code <span className="font-mono bg-gray-700/50 px-2 py-1 rounded text-sm">SX20</span> during Basic membership purchase to get ₹20 off (limited time offer).
              </p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Gamepad className="w-5 h-5 text-emerald-400" /> What if I want to upgrade later?
              </h3>
              <p className="text-gray-300 pl-7">
                You can upgrade anytime by paying the difference between your current membership and the new one.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Membership Purchase Modal */}
      {selectedTier && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => {
            setSelectedTier(null);
            setDiscountApplied(false);
          }}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-800/80 backdrop-blur-lg border-l border-blue-800/30 shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {selectedTier.id === 'premium' ? (
                    <ShieldCheck className="text-emerald-400" />
                  ) : selectedTier.id === 'pro' ? (
                    <Crown className="text-teal-400" />
                  ) : (
                    <Zap className="text-blue-400" />
                  )}
                  {selectedTier.name} Membership
                </h2>
                <button 
                  onClick={() => {
                    setSelectedTier(null);
                    setDiscountApplied(false);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Membership Tier</span>
                  <span className="font-medium">{selectedTier.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Duration</span>
                  <span>Lifetime Access</span>
                </div>
                {selectedTier.id === 'basic' && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Discount code (SX20)"
                      className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button
                      onClick={applyDiscount}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {discountApplied && (
                  <div className="flex justify-between items-center text-green-400">
                    <span className="flex items-center gap-2">
                      <Check className="w-5 h-5" /> Discount Applied
                    </span>
                    <span>-₹20</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-bold pt-4 border-t border-gray-700/50">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Total
                  </span>
                  <span>₹{receiptData.price}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the <Link href="/terms" className="text-blue-400 hover:underline">Terms of Service</Link>, 
                    <Link href="/privacy" className="text-blue-400 hover:underline"> Privacy Policy</Link>, and 
                    <Link href="/refund" className="text-blue-400 hover:underline"> Refund Policy</Link>. 
                    I understand this is a non-refundable purchase.
                  </span>
                </label>
                {showTermsError && !agreedToTerms && (
                  <p className="text-red-400 text-sm mt-2">You must agree to the terms before proceeding</p>
                )}
              </div>

              {receiptData.status === 'pending' ? (
                <>
                  <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 mb-6">
                    <h3 className="font-bold mb-3 text-center flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" /> Contact For Activation
                    </h3>
                    <div className="space-y-4">
                      {sellers.map(seller => (
                        <div key={seller.id} className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden flex items-center justify-center">
                              {seller.id === 'shiva' ? (
                                <Crown className="w-5 h-5 text-teal-400" />
                              ) : (
                                <Zap className="w-5 h-5 text-blue-400" />
                              )}
                            </div>
                            <span className={`absolute -bottom-1 -right-1 text-xs px-1 rounded-full ${seller.role === 'Owner' ? 'bg-teal-500' : 'bg-blue-500'}`}>
                              {seller.role}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{seller.name}</h4>
                            <p className="text-xs text-gray-400">@{seller.telegram.split('/').pop()}</p>
                          </div>
                          <a
                            href={seller.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                          >
                            <Send size={18} />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={copyReceiptToClipboard}
                    className={`w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-lg transition ${!agreedToTerms ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <ShieldCheck size={18} className="mr-2" /> Copy Receipt to Clipboard
                  </button>
                </>
              ) : (
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                    <ShieldCheck size={24} />
                    <span className="font-bold">Purchase Complete!</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Your permanent access will be activated shortly
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900/50 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SX Memberships</h3>
              <p className="text-gray-400 text-sm">
                Premium permanent access to exclusive gaming content and benefits.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-blue-300 transition text-sm">Home</Link></li>
                <li><Link href="/store" className="text-gray-400 hover:text-blue-300 transition text-sm">Store</Link></li>
                <li><Link href="/games" className="text-gray-400 hover:text-blue-300 transition text-sm">Games</Link></li>
                <li><Link href="/membership" className="text-gray-400 hover:text-blue-300 transition text-sm">Membership</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 hover:text-blue-300 transition text-sm">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-blue-300 transition text-sm">Privacy Policy</Link></li>
                <li><Link href="/refund" className="text-gray-400 hover:text-blue-300 transition text-sm">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22-.06-.32-.13-.1-.32-.02-.45.02-.2.06-3.39 2.14-4.84 3.06-.52.33-1 .5-1.43.5-.48 0-1.4-.27-2.08-.99-.75-.79-1.4-2.25-1.4-3.43 0-1.64 1.13-2.45 2.11-2.45.53 0 .98.18 1.38.4.25.15.47.33.68.55.23.23.46.46.75.68.32.25.7.38 1.12.38.42 0 .86-.13 1.23-.4 1.37-1.04 2.14-2.6 2.14-2.6.1-.2.25-.3.45-.3.1 0 .25.02.35.1.22.15.3.45.2.75z"/>
                  </svg>
                  <a href="https://t.me/lyastral" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                    @fluxon
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22-.06-.32-.13-.1-.32-.02-.45.02-.2.06-3.39 2.14-4.84 3.06-.52.33-1 .5-1.43.5-.48 0-1.4-.27-2.08-.99-.75-.79-1.4-2.25-1.4-3.43 0-1.64 1.13-2.45 2.11-2.45.53 0 .98.18 1.38.4.25.15.47.33.68.55.23.23.46.46.75.68.32.25.7.38 1.12.38.42 0 .86-.13 1.23-.4 1.37-1.04 2.14-2.6 2.14-2.6.1-.2.25-.3.45-.3.1 0 .25.02.35.1.22.15.3.45.2.75z"/>
                  </svg>
                  <a href="https://t.me/shivaxd42" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
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
