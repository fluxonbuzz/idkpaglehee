import Link from 'next/link';
import { BookText, Shield, Lock, AlertTriangle, Scale, Clock, Mail } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
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
          <div className="inline-flex items-center gap-3 bg-blue-900/30 border border-blue-700/50 rounded-full px-6 py-2 mb-4">
            <Scale className="text-blue-400" size={20} />
            <span className="text-blue-300">Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Last Updated: June 20, 2025
          </p>
        </section>

        {/* Warning Banner */}
        <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-6 mb-8 flex items-start gap-4">
          <AlertTriangle className="text-blue-400 mt-1 flex-shrink-0" size={24} />
          <div>
            <h2 className="text-xl font-bold text-blue-300 mb-2">Important Notice</h2>
            <p className="text-gray-300">
              By accessing or using our services, you agree to be bound by these terms. 
              <strong className="text-blue-300"> Please read them carefully.</strong>
            </p>
          </div>
        </div>

        {/* Policy Content */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Section 1 */}
          <section id="general-terms" className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <BookText className="text-blue-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-blue-300">1. General Terms</h2>
                <p className="text-gray-300 mb-4">
                  These Terms of Service ("Terms") govern your access to and use of SX Store's website, products, and services.
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    You must be <strong>at least 13 years old</strong> to use our services
                  </li>
                  <li>
                    You are responsible for <strong>all activities</strong> under your account
                  </li>
                  <li>
                    We reserve the right to <strong>modify or terminate</strong> services at any time
                  </li>
                  <li>
                    <strong>Prohibited activities</strong> include fraud, harassment, and illegal content distribution
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="account-responsibilities" className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="text-purple-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-purple-300">2. Account Responsibilities</h2>
                <p className="text-gray-300 mb-4">
                  When creating an account with SX Store:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    You must provide <strong>accurate and complete</strong> information
                  </li>
                  <li>
                    You are responsible for <strong>maintaining confidentiality</strong> of your credentials
                  </li>
                  <li>
                    You must <strong>notify us immediately</strong> of any unauthorized access
                  </li>
                  <li>
                    We may <strong>suspend or terminate</strong> accounts violating these terms
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="delivery-terms" className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="text-orange-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-orange-300">3. Product Delivery</h2>
                <p className="text-gray-300 mb-4">
                  Regarding product delivery and availability:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    Delivery dates <strong>are not fixed</strong> and may vary depending on stock availability
                  </li>
                  <li>
                    We will provide delivery estimates <strong>when items are in stock</strong>
                  </li>
                  <li>
                    <strong>Pre-order items</strong> will be shipped once they become available
                  </li>
                  <li>
                    We reserve the right to <strong>cancel orders</strong> for out-of-stock items
                  </li>
                </ul>
                <div className="bg-gray-700/50 p-4 rounded-lg mt-4 border-l-4 border-orange-500">
                  <p className="text-orange-300 font-medium">
                    Delivery times are estimates only and not guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="payment-terms" className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Clock className="text-green-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-green-300">4. Payment Processing Terms</h2>
                <p className="text-gray-300 mb-4">
                  Specific conditions regarding payment processing and payouts:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    <strong>Payment delays</strong> may be applied for certain behaviors
                  </li>
                  <li>
                    Sending a direct message (DM) to our team regarding payment status will result in a <strong>5-hour delay</strong> of your payment processing
                  </li>
                  <li>
                    Pinging in group chats (GC) about payment status will result in a <strong>24-hour delay</strong> of your payment processing
                  </li>
                  <li>
                    Repeated inquiries may result in <strong>additional delays</strong> or account review
                  </li>
                  <li>
                    All payments are processed in the order they are received, minus any applicable delays
                  </li>
                </ul>
                <div className="bg-gray-700/50 p-4 rounded-lg mt-4 border-l-4 border-green-500">
                  <p className="text-green-300 font-medium">
                    Please allow standard processing times before inquiring about payment status.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="intellectual-property" className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Lock className="text-purple-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-purple-300">5. Intellectual Property</h2>
                <p className="text-gray-300 mb-4">
                  All content and materials available through SX Store:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    Are <strong>protected by copyright</strong> and other intellectual property laws
                  </li>
                  <li>
                    May not be <strong>copied, distributed, or resold</strong> without permission
                  </li>
                  <li>
                    Are licensed for <strong>personal, non-commercial</strong> use unless specified otherwise
                  </li>
                  <li>
                    <strong>Reverse engineering</strong> of any products is strictly prohibited
                  </li>
                </ul>
                <div className="bg-gray-700/50 p-4 rounded-lg mt-4 border-l-4 border-blue-500">
                  <p className="text-blue-300 font-medium">
                    Violations of intellectual property rights may result in legal action.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="liability" className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="text-red-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-red-300">6. Limitations of Liability</h2>
                <p className="text-gray-300 mb-4">
                  SX Store shall not be liable for:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    Any <strong>direct, indirect, or consequential</strong> damages
                  </li>
                  <li>
                    <strong>Loss of data</strong> or profits resulting from service use
                  </li>
                  <li>
                    Any <strong>third-party content</strong> or services linked from our platform
                  </li>
                  <li>
                    <strong>Unauthorized access</strong> due to your failure to protect credentials
                  </li>
                </ul>
                <p className="text-gray-400 text-sm mt-4">
                  Some jurisdictions do not allow limitations on liability, so these may not apply to you.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="changes-to-terms" className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Scale className="text-blue-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-blue-300">7. Changes to Terms</h2>
                <p className="text-gray-300 mb-4">
                  We may update these Terms from time to time:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    We will <strong>notify users</strong> of significant changes
                  </li>
                  <li>
                    Your <strong>continued use</strong> constitutes acceptance of new terms
                  </li>
                  <li>
                    The <strong>"Last Updated"</strong> date at the top will reflect changes
                  </li>
                  <li>
                    You should <strong>review periodically</strong> for updates
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Final Confirmation */}
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-3 text-blue-300">Agreement Confirmation</h3>
            <p className="text-gray-300 mb-4">
              By using SX Store services, you acknowledge you have read, understood, and agree to be bound by these Terms.
            </p>
            <Link 
              href="/store"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              <BookText size={18} />
              I Agree - Continue to Store
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-700 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/terms#general-terms" className="text-blue-400 font-medium">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition">
              Privacy Policy
            </Link>
            <Link href="/refund" className="text-gray-400 hover:text-orange-400 transition">
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
