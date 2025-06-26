'use client';

import { Crown, Shield, Lock, Key, Star, Zap, Award, Gem, Sword, Scroll } from 'lucide-react';
import Link from 'next/link';

export default function TrustedStaffPage() {
  const staffMembers = [
    {
      id: 1,
      name: 'Fantom',
      role: 'Lead Admin',
      level: 'Legendary',
      icon: <Crown className="text-yellow-500" />,
      privileges: ['Full system access', 'User management', 'Content oversight'],
      joinDate: '2022-01-15',
      lastActive: 'Today',
      specialBadge: 'Founder'
    },
    {
      id: 2,
      name: 'SilentShadow',
      role: 'Senior Admin',
      level: 'Elite',
      icon: <Shield className="text-blue-500" />,
      privileges: ['Moderation powers', 'Event coordination', 'Security oversight'],
      joinDate: '2022-03-22',
      lastActive: 'Today',
      specialBadge: 'Security Expert'
    },
    {
      id: 3,
      name: '-- OPEN --',
      role: 'Trusted Staff',
      level: 'Recruit',
      icon: <Star className="text-purple-500" />,
      privileges: ['Basic moderation', 'Community support'],
      joinDate: 'Future',
      lastActive: '--',
      specialBadge: 'Your Name Here?'
    },
    {
      id: 4,
      name: '-- OPEN --',
      role: 'Trusted Staff',
      level: 'Recruit',
      icon: <Star className="text-purple-500" />,
      privileges: ['Basic moderation', 'Community support'],
      joinDate: 'Future',
      lastActive: '--',
      specialBadge: 'Your Name Here?'
    }
  ];

  const upcomingFeatures = [
    'Staff achievement system',
    'Moderation leaderboard',
    'Trust score progression',
    'Exclusive staff channels',
    'Special event privileges'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-purple-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Trusted Staff Portal</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our elite team maintaining security and quality across the platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {staffMembers.map((member) => (
            <div 
              key={member.id} 
              className={`bg-gray-800/50 border rounded-xl p-6 hover:shadow-lg transition-all ${
                member.name.includes('OPEN') 
                  ? 'border-dashed border-purple-500/30 hover:border-purple-500/50' 
                  : 'border-gray-700 hover:border-purple-500/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  {member.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">
                      {member.name}
                      {member.specialBadge && (
                        <span className="ml-2 text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded-full">
                          {member.specialBadge}
                        </span>
                      )}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {member.role}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {member.level}
                    </span>
                  </div>
                </div>
              </div>

              {!member.name.includes('OPEN') ? (
                <>
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">PRIVILEGES</h3>
                    <ul className="space-y-2">
                      {member.privileges.map((priv, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Key className="w-4 h-4 text-purple-500" />
                          <span>{priv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-between text-xs text-gray-500">
                    <span>Joined: {member.joinDate}</span>
                    <span>Active: {member.lastActive}</span>
                  </div>
                </>
              ) : (
                <div className="mt-6 text-center py-8">
                  <p className="text-gray-400 mb-4">This position could be yours!</p>
                  <Link
                    href="/apply"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                  >
                    Apply to Join
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Gem className="text-purple-500" />
            Staff Perks & Upcoming
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Current Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Exclusive staff badge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Special channel access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Early feature previews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>VIP event invitations</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Coming Soon</h3>
              <ul className="space-y-3">
                {upcomingFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-500">⌛</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Scroll className="text-purple-500" />
              Staff Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Activity</h4>
                <p>Minimum 10h/week</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Reputation</h4>
                <p>Clean record</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Knowledge</h4>
                <p>Platform expertise</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
