'use client';

import { Crown, Shield, Lock, Key, Star, Zap, Award, Gem, Sword, Scroll, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function TrustedStaffPage() {
  const founders = [
    {
      id: 0,
      name: 'Shiva XD',
      role: 'The Creator',
      level: 'Mythic',
      icon: <Sparkles className="text-amber-500" />,
      privileges: ['Everything', 'Original Vision', 'Final say'],
      joinDate: 'The Beginning',
      lastActive: 'Always',
      specialBadge: 'Founder'
    },
    {
      id: 1,
      name: 'Fluxon',
      role: 'Co-Founder',
      level: 'Legendary',
      icon: <Crown className="text-purple-500" />,
      privileges: ['Core systems', 'Strategic direction', 'Architecture'],
      joinDate: 'Day One',
      lastActive: 'Daily',
      specialBadge: 'Co-Founder'
    }
  ];

  const staffMembers = [
    {
      id: 2,
      name: 'Fantom',
      role: 'Lead Admin',
      level: 'Veteran',
      icon: <Shield className="text-blue-500" />,
      privileges: ['Full moderation', 'User management', 'Content oversight'],
      joinDate: '2022-01-15',
      lastActive: 'Today',
      specialBadge: 'Security Chief'
    },
    {
      id: 3,
      name: 'SilentShadow',
      role: 'Senior Admin',
      level: 'Elite',
      icon: <Sword className="text-green-500" />,
      privileges: ['Moderation powers', 'Event coordination', 'Dispute resolution'],
      joinDate: '2022-03-22',
      lastActive: 'Today',
      specialBadge: 'Guardian'
    }
  ];

  const futureStaff = [
    {
      id: 4,
      name: '-- OPEN --',
      role: 'Trusted Staff',
      level: 'Recruit',
      icon: <Star className="text-purple-400" />,
      privileges: ['Basic moderation', 'Community support'],
      joinDate: 'Future',
      lastActive: '--',
      specialBadge: 'Your Name Here?'
    },
    {
      id: 5,
      name: '-- OPEN --',
      role: 'Trusted Staff',
      level: 'Recruit',
      icon: <Star className="text-purple-400" />,
      privileges: ['Basic moderation', 'Community support'],
      joinDate: 'Future',
      lastActive: '--',
      specialBadge: 'Your Name Here?'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-purple-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">The Inner Circle</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet the architects and guardians of our community
          </p>
        </div>

        {/* Founders Corner */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-amber-400">
            <Sparkles className="h-6 w-6" />
            Founders Corner
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {founders.map((founder) => (
              <div key={founder.id} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-amber-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-amber-500/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-amber-500 overflow-hidden">
                      <div className="text-2xl font-bold text-amber-500">
                        {founder.name.charAt(0)}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-1 bg-amber-600 rounded-full">
                      {founder.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold">
                        {founder.name}
                        <span className="ml-2 text-xs bg-amber-900/50 text-amber-300 px-2 py-1 rounded-full">
                          {founder.specialBadge}
                        </span>
                      </h2>
                    </div>
                    <div className="text-sm text-amber-300 mt-1">{founder.role}</div>
                    <div className="text-xs text-amber-500/80 mt-1">
                      Level: {founder.level} • Since: {founder.joinDate}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-amber-500/80 mb-2">DOMAIN</h3>
                  <ul className="space-y-2">
                    {founder.privileges.map((priv, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Key className="w-4 h-4 text-amber-500" />
                        <span>{priv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Staff */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-400">
            <Shield className="h-6 w-6" />
            Trusted Guardians
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staffMembers.map((member) => (
              <div key={member.id} className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-blue-500 overflow-hidden">
                      <div className="text-2xl font-bold text-blue-500">
                        {member.name.charAt(0)}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-1 bg-blue-600 rounded-full">
                      {member.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold">
                        {member.name}
                        <span className="ml-2 text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full">
                          {member.specialBadge}
                        </span>
                      </h2>
                    </div>
                    <div className="text-sm text-blue-300 mt-1">{member.role}</div>
                    <div className="text-xs text-blue-500/80 mt-1">
                      Level: {member.level} • Active: {member.lastActive}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-blue-500/80 mb-2">AUTHORITY</h3>
                  <ul className="space-y-2">
                    {member.privileges.map((priv, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Key className="w-4 h-4 text-blue-500" />
                        <span>{priv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Staff */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-purple-400">
            <Star className="h-6 w-6" />
            Future Protectors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureStaff.map((member) => (
              <div key={member.id} className="bg-gray-800/20 border border-dashed border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center border-2 border-dashed border-purple-500 overflow-hidden">
                      <div className="text-2xl font-bold text-purple-500">?</div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-1 bg-purple-600 rounded-full">
                      {member.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-purple-300">
                        {member.name}
                        <span className="ml-2 text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded-full">
                          {member.specialBadge}
                        </span>
                      </h2>
                    </div>
                    <div className="text-sm text-purple-300 mt-1">{member.role}</div>
                    <div className="text-xs text-purple-500/80 mt-1">
                      Level: {member.level} • Join Date: {member.joinDate}
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Link
                    href="/apply"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                  >
                    Claim This Position
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
