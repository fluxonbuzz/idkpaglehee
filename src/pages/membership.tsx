// pages/membership.tsx
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShieldCheck, Send, Star, Zap, Crown, Gift, CheckCircle, Key, Lock } from 'lucide-react';
import fs from 'fs';
import path from 'path';

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

interface MembershipData {
  keys: {
    [key: string]: {
      tier: string;
      used: boolean;
      generatedBy: string;
      generatedAt: string;
      ip?: string;
    };
  };
  members: {
    [ip: string]: {
      tier: string;
      activatedAt: string;
      expiresAt: string;
      keyUsed: string;
    };
  };
  settings: {
    adminPassword: string;
  };
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
  const [membershipKey, setMembershipKey] = useState('');
  const [activeMembership, setActiveMembership] = useState<any>(null);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [keyTier, setKeyTier] = useState('pro');
  const [userIP, setUserIP] = useState('');
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Load membership data and user IP
  useEffect(() => {
    // In a real app, you'd get the IP from an API or server-side
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setUserIP(data.ip))
      .catch(() => setUserIP('unknown'));

    // Load membership data
    loadMembershipData();
  }, []);

  // Keyboard shortcut for admin mode (Ctrl+*)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '*') {
        setAdminMode(true);
        setTimeout(() => {
          if (passwordInputRef.current) {
            passwordInputRef.current.focus();
          }
        }, 100);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const loadMembershipData = () => {
    // In a real app, you'd load this from your JSON file
    // This is a mock implementation
    const mockData: MembershipData = {
      keys: {
        "ABC123": {
          tier: "pro",
          used: false,
          generatedBy: "admin",
          generatedAt: new Date().toISOString()
        }
      },
      members: {
        "192.168.1.1": {
          tier: "pro",
          activatedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          keyUsed: "ABC123"
        }
      },
      settings: {
        adminPassword: "1234"
      }
    };

    // Check if current IP has an active membership
    if (userIP && mockData.members[userIP]) {
      setActiveMembership(mockData.members[userIP]);
    }
  };

  const activateMembership = () => {
    if (!membershipKey || !selectedTier) return;

    // In a real app, you'd validate against your JSON file
    // This is a mock implementation
    const isValidKey = membershipKey === "ABC123" && selectedTier.id === "pro";

    if (isValidKey) {
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);

      const newMembership = {
        tier: selectedTier.id,
        activatedAt: new Date().toISOString(),
        expiresAt: expiryDate.toISOString(),
        keyUsed: membershipKey
      };

      // In a real app, you'd save this to your JSON file
      setActiveMembership(newMembership);
      alert("Membership activated successfully!");
    } else {
      alert("Invalid membership key or key doesn't match selected tier");
    }
  };

  const generateKey = () => {
    if (adminPassword !== "1234") {
      alert("Invalid admin password");
      return;
    }

    const newKey = `SX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setGeneratedKey(newKey);

    // In a real app, you'd save this to your JSON file
    // With the IP restriction if needed
    alert(`Key generated: ${newKey}\nFor tier: ${keyTier}`);
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

      {/* Admin Panel Modal */}
      {adminMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-purple-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Admin Panel</h2>
              <button 
                onClick={() => {
                  setAdminMode(false);
                  setAdminPassword('');
                  setGeneratedKey('');
                }}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            {!generatedKey ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Admin Password</label>
                  <input
                    type="password"
                    ref={passwordInputRef}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                    placeholder="Enter admin password"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Select Tier</label>
                  <select
                    value={keyTier}
                    onChange={(e) => setKeyTier(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                  >
                    {membershipTiers.map(tier => (
                      <option key={tier.id} value={tier.id}>{tier.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={generateKey}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  Generate Key
                </button>
              </>
            ) : (
              <div className="text-center">
                <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Key className="text-yellow-400" />
                    <span className="font-mono font-bold">{generatedKey}</span>
                  </div>
                  <p className="text-sm">For {keyTier} tier</p>
                </div>
                <p className="text-sm text-gray-400 mb-4">Share this key with the user. It can only be used once.</p>
                <button
                  onClick={() => {
                    setGeneratedKey('');
                    setAdminPassword('');
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Generate Another
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Active Membership Banner */}
        {activeMembership && (
          <div className="mb-8 p-4 rounded-lg bg-green-900/50 border border-green-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" />
              <div>
                <h3 className="font-bold">Active Membership</h3>
                <p className="text-sm">
                  {activeMembership.tier} Tier • Expires: {new Date(activeMembership.expiresAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            SX Premium Memberships
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock exclusive benefits with membership keys provided by admins
          </p>
        </section>

        {/* Membership Activation Section */}
        <section className="max-w-lg mx-auto mb-16 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-purple-400" size={24} />
            <h2 className="text-2xl font-bold">Activate Membership</h2>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select Tier</label>
            <select
              value={selectedTier?.id || ''}
              onChange={(e) => {
                const tier = membershipTiers.find(t => t.id === e.target.value);
                setSelectedTier(tier || null);
              }}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 mb-3"
            >
              <option value="">Select a tier</option>
              {membershipTiers.map(tier => (
                <option key={tier.id} value={tier.id}>{tier.name}</option>
              ))}
            </select>
          </div>

          {selectedTier && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Membership Key</label>
                <input
                  type="text"
                  value={membershipKey}
                  onChange={(e) => setMembershipKey(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                  placeholder="Enter your membership key"
                />
              </div>

              <button
                onClick={activateMembership}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition flex items-center justify-center gap-2"
              >
                <ShieldCheck size={18} /> Activate Membership
              </button>
            </>
          )}
        </section>

        {/* Membership Tiers */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {membershipTiers.map(tier => (
            <div 
              key={tier.id} 
              className={`relative rounded-xl overflow-hidden border-2 ${tier.popular ? 'border-purple-500' : 'border-gray-700'} bg-gray-800 ${activeMembership?.tier === tier.id ? 'ring-2 ring-purple-400' : ''}`}
            >
              {activeMembership?.tier === tier.id && (
                <div className="absolute top-0 left-0 bg-purple-500 text-white text-xs font-bold px-3 py-1">
                  YOUR PLAN
                </div>
              )}
              {tier.popular && !activeMembership && (
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
                  onClick={() => setSelectedTier(tier)}
                  className={`w-full py-3 px-4 rounded-lg font-bold transition ${tier.popular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {activeMembership?.tier === tier.id ? 'Current Plan' : 'Select Tier'}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Rest of your content... */}
      </main>
    </div>
  );
}
