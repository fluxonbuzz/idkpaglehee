'use client';

import { LockKeyhole, Clock, ScrollText, ShieldCheck, UserCog, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gray-800 p-4 rounded-full border-2 border-purple-500">
                <LockKeyhole className="h-12 w-12 text-purple-400" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Guardianship Application
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join our trusted circle and help shape the future of our community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Requirements */}
          <div className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <ScrollText className="h-8 w-8 text-blue-400" />
              <h2 className="text-2xl font-bold">Requirements</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>Minimum 3 months active membership</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>Clean disciplinary record</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>Consistent positive community contributions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>Minimum age of 16 years</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>Availability for weekly meetings</span>
              </li>
            </ul>
          </div>

          {/* Time Commitment */}
          <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-8 w-8 text-purple-400" />
              <h2 className="text-2xl font-bold">Time Commitment</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-bold text-purple-300 mb-1">Minimum</h3>
                <p className="text-sm">10-15 hours per week</p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-pink-500">
                <h3 className="font-bold text-pink-300 mb-1">Peak Periods</h3>
                <p className="text-sm">20+ hours during events/launches</p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-300 mb-1">Trial Period</h3>
                <p className="text-sm">4-6 weeks of evaluation</p>
              </div>
            </div>
          </div>

          {/* Expectations */}
          <div className="bg-gray-800/50 border border-pink-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-pink-500/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="h-8 w-8 text-pink-400" />
              <h2 className="text-2xl font-bold">Expectations</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <UserCog className="flex-shrink-0 h-5 w-5 text-pink-400 mt-0.5" />
                <span>Professional conduct at all times</span>
              </li>
              <li className="flex items-start gap-3">
                <UserCog className="flex-shrink-0 h-5 w-5 text-pink-400 mt-0.5" />
                <span>Active participation in discussions</span>
              </li>
              <li className="flex items-start gap-3">
                <UserCog className="flex-shrink-0 h-5 w-5 text-pink-400 mt-0.5" />
                <span>Continuous learning and improvement</span>
              </li>
              <li className="flex items-start gap-3">
                <UserCog className="flex-shrink-0 h-5 w-5 text-pink-400 mt-0.5" />
                <span>Confidentiality of sensitive information</span>
              </li>
              <li className="flex items-start gap-3">
                <UserCog className="flex-shrink-0 h-5 w-5 text-pink-400 mt-0.5" />
                <span>Constructive feedback acceptance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Warning Notice */}
        <div className="bg-gradient-to-r from-red-900/50 to-amber-900/50 border border-amber-500/30 rounded-xl p-6 mb-16">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-amber-400 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-amber-300 mb-2">Important Notice</h2>
              <p className="mb-3">
                Staff positions are voluntary and unpaid. This is a significant commitment that requires maturity, 
                responsibility, and thick skin. You will deal with complex situations and occasionally unhappy members.
              </p>
              <p>
                <span className="font-bold">Before applying,</span> please ensure you have the time, temperament, and 
                dedication required for this role.
              </p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-gray-800/50 border border-purple-500 rounded-xl p-8 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2 text-purple-300">Application Form</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Please complete all sections thoroughly. Incomplete applications will be rejected automatically.
            </p>
          </div>
          
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLS.../viewform?embedded=true" 
              className="w-full h-[800px] rounded-lg border border-gray-700 bg-gray-900"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Loading...
            </iframe>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">What Happens Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <div className="text-purple-400 text-2xl font-bold mb-2">1</div>
              <h3 className="font-bold mb-1">Application Review</h3>
              <p className="text-sm text-gray-400">Within 7-10 days</p>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <div className="text-purple-400 text-2xl font-bold mb-2">2</div>
              <h3 className="font-bold mb-1">Initial Interview</h3>
              <p className="text-sm text-gray-400">Discord voice call</p>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <div className="text-purple-400 text-2xl font-bold mb-2">3</div>
              <h3 className="font-bold mb-1">Trial Period</h3>
              <p className="text-sm text-gray-400">4-6 weeks</p>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <div className="text-purple-400 text-2xl font-bold mb-2">4</div>
              <h3 className="font-bold mb-1">Final Decision</h3>
              <p className="text-sm text-gray-400">Team consensus</p>
            </div>
          </div>

          <div className="mt-16 text-gray-400">
            <p>Have questions? <Link href="/contact" className="text-purple-400 hover:underline">Contact us</Link> before applying</p>
            <p className="mt-2 text-sm">We receive many applications - only the most exceptional candidates will be contacted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
