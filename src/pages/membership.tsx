// pages/membership.tsx
import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Send, Star, Zap, Crown, Gift } from 'lucide-react';

interface MembershipTier {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
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
      '5% discount on all products',
      'Basic support',
      'Access to limited content',
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 100,
    duration: 'month',
    features: [
      '20% discount on all products',
      'Priority support',
      'Access to all content',
      'Daily tips and tricks',
      'Early access to new products'
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
      '30% discount on all products',
      '24/7 VIP support',
      'All Pro features',
      'Exclusive items',
      'Personal account manager',
      'Monthly free product'
    ],
    originalPrice: 300,
    discount: 'Best Value'
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
      SX STORE - MEMBERSHIP PURCHASE
      -----------------------------
      Transaction ID: ${receiptData.transactionId}
      Date: ${receiptData.date}
      
      MEMBERSHIP:
      - ${selectedTier.name} Tier: ₹${selectedTier.price}/${selectedTier.duration}
      
      FEATURES:
      ${selectedTier.features.map(feature => `      • ${feature}`).join('\n')}
      
      CONTACT SELLERS:
      - d4vd (Co-Owner): https://t.me/d4vdprofile
      - Shiva (Owner): https://t.me/shivaprofile
      
      DIGITALLY SIGNED:
      ${new Date().toISOString()}
      🚀 SX Store - Premium Gaming Marketplace
    `;

    navigator.clipboard.writeText(receiptText)
      .then(() => alert('Receipt copied to clipboard! Share it with the seller.'))
      .catch(() => alert('Failed to copy receipt. Please manually copy the transaction ID.'));
    
    // Update receipt status to completed
    setReceiptData({ ...receiptData, status: 'completed' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            SX Store
          </Link>
          <Link 
            href="/store" 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            Back to Store
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            SX Premium Memberships
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock exclusive benefits, discounts, and content with our membership tiers
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
                  {tier.id === 'basic' && <Star className="text-blue-400" size={24} />}
                  {tier.id === 'pro' && <Zap className="text-purple-400" size={24} />}
                  {tier.id === 'premium' && <Crown className="text-yellow-400" size={24} />}
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">₹{tier.price}</span>
                  <span className="text-gray-400">/{tier.duration}</span>
                  {tier.originalPrice && (
                    <span className="block text-sm text-gray-400 line-through">₹{tier.originalPrice}</span>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => generateReceipt(tier)}
                  className={`w-full py-3 px-4 rounded-lg font-bold transition ${tier.popular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  Get {tier.name}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Testimonials */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold">
                  A
                </div>
                <div>
                  <h4 className="font-bold">Aarav</h4>
                  <p className="text-sm text-gray-400">Pro Member</p>
                </div>
              </div>
              <p className="text-gray-300">
                &quot;The 20% discount pays for itself in just a few purchases. The priority support is amazing too!&quot;
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                  P
                </div>
                <div>
                  <h4 className="font-bold">Priya</h4>
                  <p className="text-sm text-gray-400">Premium Member</p>
                </div>
              </div>
              <p className="text-gray-300">
                &quot;The exclusive items and personal account manager make the Premium tier totally worth it!&quot;
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <h3 className="font-bold mb-2">How do I activate my membership?</h3>
              <p className="text-gray-300">
                After purchasing, share your receipt with one of our sellers. They will activate your membership within 24 hours.
              </p>
            </div>
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <h3 className="font-bold mb-2">Can I upgrade my membership?</h3>
              <p className="text-gray-300">
                Yes! Contact any seller to upgrade. You&apos;ll only pay the difference between your current and new membership.
              </p>
            </div>
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <h3 className="font-bold mb-2">Is there a yearly payment option?</h3>
              <p className="text-gray-300">
                Currently we only offer monthly memberships. Yearly plans with additional discounts are coming soon!
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
                <h2 className="text-2xl font-bold">{selectedTier.name} Membership</h2>
                <p className="text-gray-400">Transaction ID: {receiptData.transactionId}</p>
              </div>
              <button 
                onClick={() => setSelectedTier(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Membership Tier</span>
                <span className="font-bold">{selectedTier.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>1 {selectedTier.duration}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-2">
                <span>Total</span>
                <span>₹{selectedTier.price}</span>
              </div>
            </div>

            {receiptData.status === 'pending' ? (
              <>
                <div className="bg-gray-700/50 p-4 rounded-lg mb-6">
                  <h3 className="font-bold mb-3 text-center">Contact Sellers</h3>
                  <div className="flex flex-col gap-4">
                    {sellers.map(seller => (
                      <div key={seller.id} className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              {seller.name.charAt(0)}
                            </div>
                          </div>
                          <span className="absolute -bottom-1 -right-1 bg-purple-500 text-xs px-1 rounded-full">
                            {seller.role}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{seller.name}</h4>
                          <p className="text-xs text-gray-400">{seller.role} of SX Store</p>
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
                  Your membership will be activated within 24 hours after verification
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
