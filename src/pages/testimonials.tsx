'use client';

import { Crown, Shield, Lock, Key, Star, Zap, Award, Gem, Sword, Scroll, Sparkles, MessageSquare, Gift, Users, BadgeCheck, Trophy, Target, BarChart2, Clock, Calendar, CheckCircle, Medal, Ribbon } from 'lucide-react';
import Link from 'next/link';

export default function TrustedStaffPage() {
  // Badges Data
  const badgeTiers = [
    {
      name: 'Founder',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      description: 'Original creators of the platform',
      rarity: 'Unique',
      color: 'bg-gradient-to-r from-amber-500 to-amber-700'
    },
    {
      name: 'Mythic',
      icon: <Gem className="w-5 h-5 text-purple-500" />,
      description: 'Highest staff achievement',
      rarity: '0.1%',
      color: 'bg-gradient-to-r from-purple-500 to-indigo-700'
    },
    {
      name: 'Legendary',
      icon: <Crown className="w-5 h-5 text-yellow-400" />,
      description: 'Exceptional contributions',
      rarity: '1%',
      color: 'bg-gradient-to-r from-yellow-500 to-orange-600'
    },
    {
      name: 'Guardian',
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      description: 'Dedicated community protection',
      rarity: '5%',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-600'
    },
    {
      name: 'Sentinel',
      icon: <Sword className="w-5 h-5 text-green-400" />,
      description: 'Active moderation duties',
      rarity: '10%',
      color: 'bg-gradient-to-r from-green-500 to-emerald-600'
    },
    {
      name: 'Rising Star',
      icon: <Star className="w-5 h-5 text-pink-400" />,
      description: 'Promising new staff member',
      rarity: '15%',
      color: 'bg-gradient-to-r from-pink-500 to-rose-600'
    }
  ];

  // Targets & Rewards
  const rewardTiers = [
    {
      level: 'Bronze',
      requirements: [
        { target: '200 weekly messages', reward: 'Basic emoji pack' },
        { target: '1 week active', reward: 'Starter badge' }
      ],
      color: 'bg-amber-700'
    },
    {
      level: 'Silver',
      requirements: [
        { target: '300 weekly messages', reward: '₹20 discount code' },
        { target: '3 resolved tickets', reward: 'Custom color' },
        { target: '1 month active', reward: 'Basic Pro membership (1 week)' }
      ],
      color: 'bg-gray-400'
    },
    {
      level: 'Gold',
      requirements: [
        { target: '500 weekly messages', reward: '₹50 discount code' },
        { target: '5 event participations', reward: 'Special badge' },
        { target: '3 months active', reward: 'Premium membership (2 weeks)' }
      ],
      color: 'bg-yellow-500'
    },
    {
      level: 'Platinum',
      requirements: [
        { target: '800 weekly messages', reward: '₹70 discount code' },
        { target: '10 referrals', reward: 'Exclusive emoji pack' },
        { target: '6 months active', reward: 'Pro (1 month)' }
      ],
      color: 'bg-teal-400'
    },
    {
      level: 'Diamond',
      requirements: [
        { target: '1200 weekly messages', reward: '₹100 discount code' },
        { target: '25 quality posts', reward: 'VIP status' },
        { target: '1 year active', reward: 'Legendary badge + All perks' }
      ],
      color: 'bg-blue-500'
    }
  ];

  // Staff Members
  const staffMembers = [
    {
      id: 0,
      name: 'Shiva XD',
      role: 'Founder',
      level: 'Mythic',
      icon: <Sparkles className="text-amber-500" />,
      joinDate: 'The Beginning',
      badge: 'Founder',
      progress: {
        messages: '∞/∞',
        activity: '100%',
        targets: 'All unlocked'
      }
    },
    {
      id: 1,
      name: 'Fluxon',
      role: 'Co-Founder',
      level: 'Legendary',
      icon: <Crown className="text-purple-500" />,
      joinDate: 'Day One',
      badge: 'Legendary',
      progress: {
        messages: '872/500',
        activity: '98%',
        targets: 'Diamond tier'
      }
    },
    {
      id: 2,
      name: 'Fantom',
      role: 'Lead Admin',
      level: 'Veteran',
      icon: <Shield className="text-blue-500" />,
      joinDate: 'Jan 2022',
      badge: 'Guardian',
      progress: {
        messages: '647/500',
        activity: '95%',
        targets: 'Platinum tier'
      }
    },
    {
      id: 3,
      name: 'SilentShadow',
      role: 'Senior Admin',
      level: 'Elite',
      icon: <Sword className="text-green-500" />,
      joinDate: 'Mar 2022',
      badge: 'Sentinel',
      progress: {
        messages: '423/300',
        activity: '92%',
        targets: 'Gold tier'
      }
    },
    {
      id: 4,
      name: '-- OPEN --',
      role: 'Future Staff',
      level: 'Recruit',
      icon: <Star className="text-purple-400" />,
      joinDate: 'You?',
      badge: 'Rising Star',
      progress: {
        messages: '0/50',
        activity: '0%',
        targets: 'Bronze tier'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Shield className="h-12 w-12 text-purple-500" />
              <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-amber-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-amber-400">
            Community Guardians
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet our dedicated team and discover how you can join our ranks
          </p>
        </div>

        {/* Badges Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3">
            <Medal className="h-8 w-8 text-amber-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-400">
              Exclusive Badges
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {badgeTiers.map((badge, index) => (
              <div 
                key={index} 
                className={`${badge.color} p-0.5 rounded-xl hover:shadow-lg hover:shadow-white/10 transition-all`}
              >
                <div className="bg-gray-900 rounded-xl p-5 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                      {badge.icon}
                    </div>
                    <h3 className="text-xl font-bold">{badge.name}</h3>
                  </div>
                  <p className="text-gray-300 mb-3">{badge.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-1 bg-black/30 rounded-full">
                      Rarity: {badge.rarity}
                    </span>
                    <span className="text-xs font-mono">#{String(index+1).padStart(2,'0')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Targets & Rewards */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3">
            <Target className="h-8 w-8 text-blue-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
              Achievement Tiers
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {rewardTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`${tier.color} rounded-xl p-0.5 hover:scale-105 transition-transform`}
              >
                <div className="bg-gray-900 rounded-xl p-5 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="h-5 w-5" />
                    <h3 className="text-lg font-bold">{tier.level} Tier</h3>
                  </div>
                  <ul className="space-y-3">
                    {tier.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium">{req.target}</div>
                          <div className="text-xs text-gray-300">{req.reward}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Members */}
        <div>
          <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3">
            <Users className="h-8 w-8 text-purple-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Current Guardians
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffMembers.map((member) => (
              <div key={member.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-gray-900 flex items-center justify-center overflow-hidden">
                      <div className="text-2xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-1.5 bg-gray-900 rounded-full border border-gray-700">
                      {member.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">
                      {member.name}
                      <span className="ml-2 text-xs bg-white/10 text-white px-2 py-1 rounded-full">
                        {member.badge}
                      </span>
                    </h2>
                    <div className="text-sm text-gray-400 mt-1">{member.role}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Since {member.joinDate}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-1">MESSAGES</h3>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: member.progress.messages === '∞/∞' ? '100%' : `${Math.min(100, parseInt(member.progress.messages.split('/')[0])/5)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{member.progress.messages}</div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-1">ACTIVITY</h3>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: member.progress.activity }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{member.progress.activity}</div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-1">CURRENT TIER</h3>
                    <div className="px-3 py-1.5 bg-white/5 rounded-lg text-sm font-medium">
                      {member.progress.targets}
                    </div>
                  </div>
                </div>

                {member.name === '-- OPEN --' && (
                  <div className="mt-6 text-center">
                    <Link
                      href="/apply"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      Apply for Position
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-3">Ready to Join Our Team?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Help shape our community while earning exclusive rewards and recognition
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              <Shield className="mr-2 h-5 w-5" />
              Apply for Staff Position
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
