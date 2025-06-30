'use client';

import { Crown, Shield, Lock, Key, Star, Zap, Award, Gem, Sword, Scroll, Sparkles, MessageSquare, Gift, Users, BadgeCheck, Trophy, Target, BarChart2, Clock, Calendar, CheckCircle, Medal, Ribbon, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function TrustedStaffPage() {
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Badges Data with requirements
  const badgeTiers = [
    {
      id: 'founder',
      name: 'Founder',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      description: 'Original creators of the platform',
      rarity: 'Unique',
      color: 'bg-gradient-to-r from-amber-500 to-amber-700',
      requirements: [
        'Must be platform creator',
        'Minimum 2 years service',
        'Approval from all co-founders'
      ]
    },
    {
      id: 'mythic',
      name: 'Mythic',
      icon: <Gem className="w-5 h-5 text-purple-500" />,
      description: 'Highest staff achievement',
      rarity: '0.1%',
      color: 'bg-gradient-to-r from-purple-500 to-indigo-700',
      requirements: [
        '5,000+ total messages',
        '1 year+ active service',
        '95%+ activity score',
        'Founder approval required'
      ]
    },
    {
      id: 'legendary',
      name: 'Legendary',
      icon: <Crown className="w-5 h-5 text-yellow-400" />,
      description: 'Exceptional contributions',
      rarity: '1%',
      color: 'bg-gradient-to-r from-yellow-500 to-orange-600',
      requirements: [
        '3,000+ total messages',
        '6 months+ service',
        '90%+ activity score',
        'Resolved 50+ tickets'
      ]
    },
    {
      id: 'guardian',
      name: 'Guardian',
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      description: 'Dedicated community protection',
      rarity: '5%',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-600',
      requirements: [
        '1,500+ total messages',
        '3 months+ service',
        '85%+ activity score',
        'Resolved 25+ tickets'
      ]
    },
    {
      id: 'sentinel',
      name: 'Sentinel',
      icon: <Sword className="w-5 h-5 text-green-400" />,
      description: 'Active moderation duties',
      rarity: '10%',
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
      requirements: [
        '800+ total messages',
        '1 month+ service',
        '80%+ activity score',
        'Completed training'
      ]
    },
    {
      id: 'rising-star',
      name: 'Rising Star',
      icon: <Star className="w-5 h-5 text-pink-400" />,
      description: 'Promising new staff member',
      rarity: '15%',
      color: 'bg-gradient-to-r from-pink-500 to-rose-600',
      requirements: [
        '200+ total messages',
        '2 weeks+ service',
        '70%+ activity score'
      ]
    }
  ];

  // Enhanced Reward Tiers
  const rewardTiers = [
    {
      level: 'Bronze',
      requirements: [
        { target: '200 weekly messages', reward: 'Basic emoji pack' },
        { target: '1 week active', reward: 'Starter badge' }
      ],
      color: 'bg-amber-700',
      icon: <Medal className="w-5 h-5 text-amber-300" />
    },
    {
      level: 'Silver',
      requirements: [
        { target: '300 weekly messages', reward: '₹20 discount code' },
        { target: '3 resolved tickets', reward: 'Custom color' },
        { target: '1 month active', reward: 'Basic Pro membership (1 week)' }
      ],
      color: 'bg-gray-400',
      icon: <Medal className="w-5 h-5 text-gray-200" />
    },
    {
      level: 'Gold',
      requirements: [
        { target: '500 weekly messages', reward: '₹50 discount code' },
        { target: '5 event participations', reward: 'Special badge' },
        { target: '3 months active', reward: 'Premium membership (2 weeks)' }
      ],
      color: 'bg-yellow-500',
      icon: <Medal className="w-5 h-5 text-yellow-200" />
    },
    {
      level: 'Platinum',
      requirements: [
        { target: '800 weekly messages', reward: '₹70 discount code' },
        { target: '10 referrals', reward: 'Exclusive emoji pack' },
        { target: '6 months active', reward: 'Pro (1 month)' }
      ],
      color: 'bg-teal-400',
      icon: <Medal className="w-5 h-5 text-teal-200" />
    },
    {
      level: 'Diamond',
      requirements: [
        { target: '1200 weekly messages', reward: '₹100 discount code' },
        { target: '25 quality posts', reward: 'VIP status' },
        { target: '1 year active', reward: 'Legendary badge + All perks' }
      ],
      color: 'bg-blue-500',
      icon: <Medal className="w-5 h-5 text-blue-200" />
    },
    {
      level: 'Master',
      requirements: [
        { target: '1800 weekly messages', reward: '₹150 discount code' },
        { target: '50 quality posts', reward: 'Custom title' },
        { target: '2 years active', reward: 'Hall of Fame status' }
      ],
      color: 'bg-violet-600',
      icon: <Trophy className="w-5 h-5 text-violet-200" />
    },
    {
      level: 'Grandmaster',
      requirements: [
        { target: '2500 weekly messages', reward: '₹200 discount code' },
        { target: '100 quality posts', reward: 'Exclusive merch' },
        { target: '3+ years active', reward: 'Legendary status + All perks for life' }
      ],
      color: 'bg-gradient-to-r from-purple-600 to-pink-600',
      icon: <Crown className="w-5 h-5 text-white" />
    }
  ];

  // Enhanced Staff Members Data
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
        targets: 'All unlocked',
        totalMessages: 12500,
        activityScore: 100,
        ticketsResolved: 420,
        weeksActive: 156
      },
      eligibleBadges: ['founder', 'mythic', 'legendary', 'guardian', 'sentinel']
    },
    {
      id: 1,
      name: 'Fluxon',
      role: 'Co-Founder',
      level: 'Mythic',
      icon: <Crown className="text-purple-500" />,
      joinDate: 'Day One',
      badge: 'Legendary',
      progress: {
        messages: '872/500',
        activity: '98%',
        targets: 'Diamond tier',
        totalMessages: 8720,
        activityScore: 98,
        ticketsResolved: 315,
        weeksActive: 120
      },
      eligibleBadges: ['mythic', 'legendary', 'guardian', 'sentinel']
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
        messages: '140/500',
        activity: '28%',
        targets: 'Platinum tier',
        totalMessages: 6470,
        activityScore: 28,
        ticketsResolved: 240,
        weeksActive: 85
      },
      eligibleBadges: ['legendary', 'guardian', 'sentinel']
    },
    {
      id: 3,
      name: 'SilentShadow',
      role: 'Retired Admin',
      level: 'Honored',
      icon: <Ribbon className="text-gray-400" />,
      joinDate: 'Mar 2022 - Nov 2023',
      badge: 'Legendary',
      progress: {
        messages: '6,230',
        activity: 'Retired',
        targets: 'Master tier',
        totalMessages: 6230,
        activityScore: 0,
        ticketsResolved: 210,
        weeksActive: 85
      },
      eligibleBadges: ['legendary', 'guardian'],
      retired: true
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
        targets: 'Bronze tier',
        totalMessages: 0,
        activityScore: 0,
        ticketsResolved: 0,
        weeksActive: 0
      },
      eligibleBadges: ['rising-star']
    }
  ];

  const checkBadgeEligibility = (staffId, badgeId) => {
    const staff = staffMembers.find(m => m.id === staffId);
    const badge = badgeTiers.find(b => b.id === badgeId);
    
    if (!staff || !badge) return false;
    
    // Founder badge is only for founders
    if (badgeId === 'founder' && staff.role !== 'Founder') return false;
    
    // Check message requirements
    if (badgeId === 'mythic' && staff.progress.totalMessages < 5000) return false;
    if (badgeId === 'legendary' && staff.progress.totalMessages < 3000) return false;
    if (badgeId === 'guardian' && staff.progress.totalMessages < 1500) return false;
    if (badgeId === 'sentinel' && staff.progress.totalMessages < 800) return false;
    if (badgeId === 'rising-star' && staff.progress.totalMessages < 200) return false;
    
    // Check activity score
    if (badgeId === 'mythic' && staff.progress.activityScore < 95) return false;
    if (badgeId === 'legendary' && staff.progress.activityScore < 90) return false;
    if (badgeId === 'guardian' && staff.progress.activityScore < 85) return false;
    if (badgeId === 'sentinel' && staff.progress.activityScore < 80) return false;
    if (badgeId === 'rising-star' && staff.progress.activityScore < 70) return false;
    
    // Check service duration
    if (badgeId === 'mythic' && staff.progress.weeksActive < 52) return false;
    if (badgeId === 'legendary' && staff.progress.weeksActive < 26) return false;
    if (badgeId === 'guardian' && staff.progress.weeksActive < 13) return false;
    if (badgeId === 'sentinel' && staff.progress.weeksActive < 4) return false;
    if (badgeId === 'rising-star' && staff.progress.weeksActive < 2) return false;
    
    return true;
  };

  const getBadgeRecommendation = (staffId) => {
    const staff = staffMembers.find(m => m.id === staffId);
    if (!staff) return null;
    
    // Check from highest to lowest badge
    if (checkBadgeEligibility(staffId, 'mythic')) return 'mythic';
    if (checkBadgeEligibility(staffId, 'legendary')) return 'legendary';
    if (checkBadgeEligibility(staffId, 'guardian')) return 'guardian';
    if (checkBadgeEligibility(staffId, 'sentinel')) return 'sentinel';
    if (checkBadgeEligibility(staffId, 'rising-star')) return 'rising-star';
    
    return null;
  };

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
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-1">Requirements:</h4>
                    <ul className="text-xs space-y-1">
                      {badge.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewardTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`${tier.color} rounded-xl p-0.5 hover:scale-[1.02] transition-transform`}
              >
                <div className="bg-gray-900 rounded-xl p-5 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    {tier.icon}
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
              <div key={member.id} className={`bg-gray-800/50 border rounded-xl p-6 transition-all ${member.retired ? 'border-gray-600 hover:border-gray-500' : 'border-gray-700 hover:border-purple-500/50'}`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden ${member.retired ? 'bg-gradient-to-br from-gray-600 to-gray-900' : 'bg-gradient-to-br from-purple-600 to-gray-900'}`}>
                      <div className="text-2xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                    </div>
                    <div className={`absolute -bottom-2 -right-2 p-1.5 rounded-full border ${member.retired ? 'bg-gray-800 border-gray-600' : 'bg-gray-900 border-gray-700'}`}>
                      {member.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">
                      {member.name}
                      {member.retired && (
                        <span className="ml-2 text-xs bg-gray-600 text-white px-2 py-1 rounded-full">
                          Retired
                        </span>
                      )}
                      {!member.retired && (
                        <span className="ml-2 text-xs bg-white/10 text-white px-2 py-1 rounded-full">
                          {member.badge}
                        </span>
                      )}
                    </h2>
                    <div className={`text-sm mt-1 ${member.retired ? 'text-gray-500' : 'text-gray-400'}`}>
                      {member.role}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {member.joinDate}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-1">MESSAGES</h3>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${member.retired ? 'bg-gray-500' : 'bg-purple-500'}`} 
                        style={{ width: member.progress.messages === '∞/∞' ? '100%' : `${Math.min(100, member.progress.totalMessages/50)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{member.progress.totalMessages.toLocaleString()}</div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-1">ACTIVITY</h3>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${member.retired ? 'bg-gray-500' : 'bg-blue-500'}`} 
                        style={{ width: member.progress.activity === 'Retired' ? '0%' : `${member.progress.activityScore}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{member.progress.activity}</div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-1">CURRENT TIER</h3>
                    <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${member.retired ? 'bg-gray-700/50' : 'bg-white/5'}`}>
                      {member.progress.targets}
                    </div>
                  </div>

                  {/* Badge Ranking */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h3 className="text-xs font-semibold text-gray-500 mb-2">BADGE RANKING</h3>
                    <div className="space-y-3">
                      {badgeTiers.filter(badge => member.eligibleBadges.includes(badge.id)).map((badge) => (
                        <div 
                          key={badge.id}
                          className={`p-2 rounded-lg cursor-pointer ${selectedBadge === badge.id ? 'ring-2 ring-purple-500' : 'bg-gray-700'}`}
                          onClick={() => setSelectedBadge(badge.id)}
                        >
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-md bg-white/10">
                              {badge.icon}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{badge.name}</div>
                              <div className="text-xs text-gray-400">
                                {checkBadgeEligibility(member.id, badge.id) ? (
                                  <span className="text-green-400">Eligible</span>
                                ) : (
                                  <span className="text-yellow-400">Requirements not met</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedBadge && (
                      <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {badgeTiers.find(b => b.id === selectedBadge).icon}
                          <h4 className="font-medium">
                            {badgeTiers.find(b => b.id === selectedBadge).name} Badge
                          </h4>
                        </div>
                        <div className="text-xs text-gray-300 mb-2">
                          {badgeTiers.find(b => b.id === selectedBadge).description}
                        </div>
                        
                        {checkBadgeEligibility(member.id, selectedBadge) ? (
                          <div className="text-green-400 text-sm font-medium">
                            ✓ This staff member qualifies for this badge!
                          </div>
                        ) : (
                          <div>
                            <div className="text-yellow-400 text-sm font-medium mb-2">
                              ✗ Requirements not fully met
                            </div>
                            <div className="text-xs space-y-1">
                              {badgeTiers.find(b => b.id === selectedBadge).requirements.map((req, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  {req.includes('messages') && member.progress.totalMessages < parseInt(req.match(/\d+/)[0]) ? (
                                    <span className="text-red-400">✗</span>
                                  ) : req.includes('activity') && member.progress.activityScore < parseInt(req.match(/\d+/)[0]) ? (
                                    <span className="text-red-400">✗</span>
                                  ) : req.includes('year') && member.progress.weeksActive < 52 ? (
                                    <span className="text-red-400">✗</span>
                                  ) : req.includes('month') && member.progress.weeksActive < 4 ? (
                                    <span className="text-red-400">✗</span>
                                  ) : req.includes('week') && member.progress.weeksActive < parseInt(req.match(/\d+/)[0]) ? (
                                    <span className="text-red-400">✗</span>
                                  ) : (
                                    <span className="text-green-400">✓</span>
                                  )}
                                  <span>{req}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-3 text-center">
                      <button
                        onClick={() => {
                          const recommendedBadge = getBadgeRecommendation(member.id);
                          if (recommendedBadge) {
                            setSelectedBadge(recommendedBadge);
                            alert(`Recommended badge: ${badgeTiers.find(b => b.id === recommendedBadge).name}`);
                          } else {
                            alert('No badge recommendations available yet. Keep working!');
                          }
                        }}
                        className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg transition-colors"
                      >
                        Get Recommendation
                      </button>
                    </div>
                  </div>
                </div>

                {member.name === '-- OPEN --' && (
                  <div className="mt-6 text-center">
                    <a
                      href="/apply"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      Apply for Position
                    </a>
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
            <a
              href="/apply"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              <Shield className="mr-2 h-5 w-5" />
              Apply for Staff Position
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
