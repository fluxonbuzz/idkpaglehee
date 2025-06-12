import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, Key, Mail } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
            SX Store
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/store"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 bg-emerald-900/30 border border-emerald-700/50 rounded-full px-6 py-2 mb-4">
            <ShieldCheck className="text-emerald-400" size={20} />
            <span className="text-emerald-300">Privacy & Security</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your data security and privacy is our top priority
          </p>
        </section>

        {/* Last Updated */}
        <div className="bg-emerald-900/10 border border-emerald-800 rounded-xl p-6 mb-8 text-center">
          <p className="text-emerald-300">
            <strong>Last Updated:</strong> June 12, 2024
          </p>
        </div>

        {/* Privacy Content */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Section 1 */}
          <section className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Lock className="text-emerald-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-emerald-300">Information We Collect</h2>
                <p className="text-gray-300 mb-4">
                  When you use our store, we may collect certain information to provide and improve our services:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    <strong>Transaction Data:</strong> Purchase details including products, prices, and timestamps
                  </li>
                  <li>
                    <strong>Contact Information:</strong> Telegram username when you contact our support team
                  </li>
                  <li>
                    <strong>Device Information:</strong> Basic device data for security and analytics
                  </li>
                  <li>
                    <strong>Local Storage:</strong> Cart contents and purchase history stored locally in your browser
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <EyeOff className="text-emerald-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-emerald-300">How We Use Your Information</h2>
                <p className="text-gray-300 mb-4">
                  The information we collect is used solely for the following purposes:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>To process and fulfill your orders</li>
                  <li>To provide customer support and respond to inquiries</li>
                  <li>To improve our store and service offerings</li>
                  <li>To prevent fraud and ensure transaction security</li>
                  <li>To comply with legal obligations when required</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Server className="text-emerald-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-emerald-300">Data Storage & Security</h2>
                <p className="text-gray-300 mb-4">
                  We implement robust security measures to protect your information:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    <strong>Local Storage:</strong> Your cart and purchase history are stored only in your browser's localStorage
                  </li>
                  <li>
                    <strong>No Server Storage:</strong> We don't store your transaction data on our servers
                  </li>
                  <li>
                    <strong>Encryption:</strong> All communications are encrypted using modern protocols
                  </li>
                  <li>
                    <strong>Minimal Data:</strong> We only collect what's necessary for transactions
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Key className="text-emerald-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-emerald-300">Your Rights & Choices</h2>
                <p className="text-gray-300 mb-4">
                  You have certain rights regarding your personal information:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    <strong>Access:</strong> You can request details of information we have about you
                  </li>
                  <li>
                    <strong>Deletion:</strong> You can clear your local storage data at any time
                  </li>
                  <li>
                    <strong>Correction:</strong> You can update your information by contacting us
                  </li>
                  <li>
                    <strong>Opt-out:</strong> You can choose not to provide certain information
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Mail className="text-emerald-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-emerald-300">Contact Us</h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions about this privacy policy or your data:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    <strong>Telegram:</strong> Contact our support team @SXStoreSupport
                  </li>
                  <li>
                    <strong>Email:</strong> privacy@sxstore.example.com (monitored weekly)
                  </li>
                </ul>
                <p className="text-gray-400 text-sm mt-4">
                  Note: We may update this policy occasionally. Significant changes will be announced through our Telegram channel.
                </p>
              </div>
            </div>
          </section>

          {/* Policy Acceptance */}
          <div className="bg-emerald-900/10 border border-emerald-800 rounded-xl p-6 text-center">
            <p className="text-emerald-300">
              By using our store, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-700 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/terms" className="text-gray-400 hover:text-emerald-400 transition">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-emerald-400 font-medium">
              Privacy Policy
            </Link>
            <Link href="/refunds" className="text-gray-400 hover:text-emerald-400 transition">
              Refund Policy
            </Link>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SX Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
