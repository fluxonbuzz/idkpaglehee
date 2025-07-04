// pages/membership.tsx
import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Send, Crown, Zap, Clock, Eye, MessageSquare, Video, Gamepad } from 'lucide-react';

interface MembershipTier {
  id: string;
  name: string;
  price: number;
  duration: string;
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
    duration: 'month',
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
    price: 100,
    duration: 'month',
    features: [
      {
        text: 'Early access to Shiva X mod videos',
        icon: <Video className="w-5 h-5 text-purple-400" />
      },
      {
        text: 'Priority replies from ShivaXD',
        icon: <MessageSquare className="w-5 h-5 text-purple-400" />
      },
      {
        text: 'Premium game leaks',
        icon: <Eye className="w-5 h-5 text-purple-400" />
      },
      {
        text: 'Get games 15 min before release',
        icon: <Clock className="w-5 h-5 text-purple-400" />
      }
    ],
    popular: true,
    discount: 'Most Popular'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 250,
    duration: 'month',
    features: [
      {
        text: 'Watch Shiva X videos before upload',
        icon: <Video className="w-5 h-5 text-yellow-400" />
      },
      {
        text: 'Instant replies from ShivaXD',
        icon: <MessageSquare className="w-5 h-5 text-yellow-400" />
      },
      {
        text: 'Exclusive premium leaks',
        icon: <Eye className="w-5 h-5 text-yellow-400" />
      },
      {
        text: 'Get games 30 min before release',
        icon: <Clock className="w-5 h-5 text-yellow-400" />
      },
      {
        text: 'VIP support channel access',
        icon: <ShieldCheck className="w-5 h-5 text-yellow-400" />
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

  const generateReceipt = (tier: MembershipTier) => {
    const transactionId = `SX-MEM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const date = new Date().toLocaleString();
    
    setReceiptData({
      transactionId,
      date,
      tier: tier.name,
      price: tier.price,
      status: 'pending'
    });
    
    setSelectedTier(tier);
  };

  const copyReceiptToClipboard = () => {
    if (!selectedTier) return;
    
    const receiptText = `
      SX STORE - PREMIUM MEMBERSHIP
      ----------------------------
      Transaction ID: ${receiptData.transactionId}
      Date: ${receiptData.date}
      
      MEMBERSHIP:
      - ${selectedTier.name} Tier: ₹${selectedTier.price}/${selectedTier.duration}
      
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
            <Gamepad className="text-blue-400" /> SX Store
          </Link>
          <Link 
            href="/store" 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition flex items-center gap-2"
          >
            <Zap className="w-4 h-4" /> Back to Store
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="inline-block mb-4 bg-gradient-to-r from-purple-500 to-blue-500 p-1 rounded-full">
            <div className="bg-gray-900 rounded-full px-4 py-1 text-sm font-bold flex items-center gap-2">
              <Crown className="w-4 h-4 text-yellow-300" /> EXCLUSIVE ACCESS
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            SX Premium Content Access
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock early content, premium leaks, and direct access to ShivaXD
          </p>
        </section>

        {/* Membership Tiers */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {membershipTiers.map(tier => (
            <div 
              key={tier.id} 
              className={`relative rounded-xl overflow-hidden border-2 ${tier.popular ? 'border-purple-500' : 'border-gray-700'} bg-gray-800`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-6">
                  {tier.discount}
                </div>
              )}
              {tier.originalPrice && (
                <div className="absolute top-0 left-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 transform -translate-y-2 -translate-x-2 rotate-6">
                  {Math.round((1 - tier.price / tier.originalPrice) * 100)}% OFF
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {tier.id === 'basic' && <Zap className="text-blue-400" size={24} />}
                  {tier.id === 'pro' && <Crown className="text-purple-400" size={24} />}
                  {tier.id === 'premium' && <ShieldCheck className="text-yellow-400" size={24} />}
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">₹{tier.price}</span>
                  <span className="text-gray-400">/{tier.duration}</span>
                  {tier.originalPrice && (
                    <span className="block text-sm text-gray-400 line-through">₹{tier.originalPrice}</span>
                  )}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.icon}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => generateReceipt(tier)}
                  className={`w-full py-3 px-4 rounded-lg font-bold transition flex items-center justify-center gap-2 ${tier.popular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {tier.id === 'premium' ? <ShieldCheck size={18} /> : <Zap size={18} />}
                  Get {tier.name}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Testimonials */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <MessageSquare className="text-purple-400" /> Member Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                  <Gamepad className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Pro Gamer</h4>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <Video className="w-3 h-3" /> Pro Member
                  </p>
                </div>
              </div>
              <p className="text-gray-300">
                &quot;Getting Shiva's mod videos early gives me a huge advantage in tournaments!&quot;
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">VIP Leaker</h4>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Premium Member
                  </p>
                </div>
              </div>
              <p className="text-gray-300">
                &quot;The 30-minute early access to games is insane! I'm always first with content.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <MessageSquare className="text-blue-400" /> Common Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" /> How fast is activation?
              </h3>
              <p className="text-gray-300 pl-7">
                Memberships are activated within 1 hour during business hours (10AM-10PM IST). Night purchases may take up to 12 hours.
              </p>
            </div>
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-400" /> How early do I get videos?
              </h3>
              <p className="text-gray-300 pl-7">
                Pro members get videos 1 hour early. Premium members get them 3-6 hours early, sometimes even the raw footage!
              </p>
            </div>
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Gamepad className="w-5 h-5 text-yellow-400" /> Is game early access guaranteed?
              </h3>
              <p className="text-gray-300 pl-7">
                We guarantee at least 30 minutes early for Premium, 15 for Pro. Sometimes we get them even earlier!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Membership Purchase Modal */}
      {selectedTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelectedTier(null)}></div>
          <div className="relative bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {selectedTier.id === 'premium' ? (
                    <ShieldCheck className="text-yellow-400" />
                  ) : selectedTier.id === 'pro' ? (
                    <Crown className="text-purple-400" />
                  ) : (
                    <Zap className="text-blue-400" />
                  )}
                  {selectedTier.name} Access
                </h2>
                <p className="text-gray-400 flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4" /> ID: {receiptData.transactionId}
                </p>
              </div>
              <button 
                onClick={() => setSelectedTier(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Gamepad className="w-5 h-5" /> Tier
                </span>
                <span className="font-bold">{selectedTier.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" /> Duration
                </span>
                <span>1 {selectedTier.duration}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t border-gray-700 pt-2">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Total
                </span>
                <span>₹{selectedTier.price}</span>
              </div>
            </div>

            {receiptData.status === 'pending' ? (
              <>
                <div className="bg-gray-700/50 p-4 rounded-lg mb-6">
                  <h3 className="font-bold mb-3 text-center flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" /> Contact For Activation
                  </h3>
                  <div className="flex flex-col gap-4">
                    {sellers.map(seller => (
                      <div key={seller.id} className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden flex items-center justify-center">
                            {seller.id === 'shiva' ? (
                              <Crown className="w-5 h-5 text-yellow-400" />
                            ) : (
                              <Zap className="w-5 h-5 text-purple-400" />
                            )}
                          </div>
                          <span className={`absolute -bottom-1 -right-1 text-xs px-1 rounded-full ${seller.role === 'Owner' ? 'bg-yellow-500' : 'bg-purple-500'}`}>
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
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={18} /> Copy Receipt to Clipboard
                </button>
              </>
            ) : (
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                  <ShieldCheck size={24} />
                  <span className="font-bold">Purchase Complete!</span>
                </div>
                <p className="text-sm text-gray-300">
                  Your exclusive access will be activated shortly
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
