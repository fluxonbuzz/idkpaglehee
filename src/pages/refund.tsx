import Link from 'next/link';
import { AlertTriangle, ShieldOff, Clock, HelpCircle, ShoppingCart } from 'lucide-react';

export default function RefundPage() {
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
          <div className="inline-flex items-center gap-3 bg-red-900/30 border border-red-700/50 rounded-full px-6 py-2 mb-4">
            <AlertTriangle className="text-red-400" size={20} />
            <span className="text-red-300">Important Policy Notice</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            Refund Policy
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            All sales are final - please review carefully before purchasing
          </p>
        </section>

        {/* Warning Banner */}
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 mb-8 flex items-start gap-4">
          <AlertTriangle className="text-red-400 mt-1 flex-shrink-0" size={24} />
          <div>
            <h2 className="text-xl font-bold text-red-300 mb-2">No Refunds Policy</h2>
            <p className="text-gray-300">
              Due to the digital nature of our products, <strong className="text-red-300">all sales are final</strong>. 
              We do not offer refunds or exchanges once a purchase is completed.
            </p>
          </div>
        </div>

        {/* Policy Content */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Section 1 */}
          <section className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <ShieldOff className="text-red-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-red-300">Digital Product Policy</h2>
                <p className="text-gray-300 mb-4">
                  Our products are digital goods delivered instantly or within 24-48 hours. 
                  By purchasing from SX Store, you acknowledge:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    <strong>No refunds</strong> will be issued for any reason after purchase
                  </li>
                  <li>
                    <strong>No cancellations</strong> once payment is processed
                  </li>
                  <li>
                    <strong>No returns</strong> or exchanges for digital products
                  </li>
                  <li>
                    You are responsible for <strong>verifying system requirements</strong> before purchase
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Clock className="text-orange-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-orange-300">Delivery Timeline</h2>
                <p className="text-gray-300 mb-4">
                  Please understand our delivery process before purchasing:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    <strong>Instant Delivery</strong> products are available immediately after purchase
                  </li>
                  <li>
                    <strong>Manual Delivery</strong> products require 24-48 hours processing time
                  </li>
                  <li>
                    In rare cases, delivery may take up to <strong>1 week</strong> during high demand
                  </li>
                  <li>
                    <strong>No refunds</strong> will be issued for delivery delays
                  </li>
                </ul>
                <p className="text-gray-400 text-sm mt-4">
                  Note: Repeated messages about delivery status may result in slower response times.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <HelpCircle className="text-orange-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-orange-300">Before You Purchase</h2>
                <p className="text-gray-300 mb-4">
                  To ensure complete satisfaction with your purchase:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    <strong>Read descriptions carefully</strong> - Verify the product meets your needs
                  </li>
                  <li>
                    <strong>Check compatibility</strong> - Ensure the product works with your system
                  </li>
                  <li>
                    <strong>Review screenshots/previews</strong> - Understand exactly what you're buying
                  </li>
                  <li>
                    <strong>Contact support</strong> with any pre-purchase questions
                  </li>
                </ul>
                <div className="bg-gray-700/50 p-4 rounded-lg mt-4 border-l-4 border-red-500">
                  <p className="text-red-300 font-medium">
                    By completing a purchase, you confirm you have read and agreed to this no-refund policy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <ShoppingCart className="text-red-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-red-300">Exceptions & Support</h2>
                <p className="text-gray-300 mb-4">
                  While we maintain a strict no-refund policy, we will provide support for:
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    <strong>Technical issues</strong> - We'll help resolve any product functionality problems
                  </li>
                  <li>
                    <strong>Delivery problems</strong> - If you don't receive your product, we'll investigate
                  </li>
                  <li>
                    <strong>Account issues</strong> - Problems with access or authentication
                  </li>
                </ul>
                <p className="text-gray-400 text-sm mt-4">
                  Note: Support does not constitute a refund. We'll work to resolve issues but won't issue refunds.
                </p>
              </div>
            </div>
          </section>

          {/* Final Confirmation */}
          <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-800 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-3 text-red-300">Purchase Confirmation</h3>
            <p className="text-gray-300 mb-4">
              By proceeding with any purchase from SX Store, you acknowledge and agree to all terms of this refund policy.
            </p>
            <Link 
              href="/store"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              <ShoppingCart size={18} />
              I Understand - Continue to Store
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-700 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/terms" className="text-gray-400 hover:text-orange-400 transition">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition">
              Privacy Policy
            </Link>
            <Link href="/refunds" className="text-orange-400 font-medium">
              Refund Policy
            </Link>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SX Store. All sales are final.
          </p>
        </div>
      </footer>
    </div>
  );
}
