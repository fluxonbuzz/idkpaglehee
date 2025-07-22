import { AlertTriangle, ShieldOff, Clock, HelpCircle, ShoppingCart, Scale, MapPin, Store, Download, Activity, Crown } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            SX Store
          </a>
          <div className="flex items-center gap-4">
            <a 
              href="/store"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              <Store size={16} />
              Store
            </a>
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

        {/* Legal Compliance Notice - NEW */}
        <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Scale className="text-blue-400 mt-1 flex-shrink-0" size={24} />
            <div>
              <h2 className="text-xl font-bold text-blue-300 mb-3">Legal Compliance & Consumer Rights</h2>
              <p className="text-gray-300 mb-4">
                This policy is designed to comply with applicable digital goods regulations. However, under certain consumer protection laws, including the Consumer Protection Act, 2019 (India), buyers may be eligible for a refund in the following circumstances:
              </p>
              <ul className="space-y-2 text-gray-300 pl-5 list-disc">
                <li>Product is not delivered within the specified timeframe</li>
                <li>Product is defective or does not function as described</li>
                <li>Product does not match the description provided at time of purchase</li>
                <li>Unfair trade practices or misleading advertisements</li>
              </ul>
              <div className="bg-blue-800/30 p-4 rounded-lg mt-4">
                <p className="text-blue-200 text-sm">
                  <strong>Consumer Rights:</strong> If you believe you have been provided with defective goods or services that do not match their description, you may file a complaint with the appropriate consumer forum under the Consumer Protection Act, 2019.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 mb-8 flex items-start gap-4">
          <AlertTriangle className="text-red-400 mt-1 flex-shrink-0" size={24} />
          <div>
            <h2 className="text-xl font-bold text-red-300 mb-2">No Refunds Policy</h2>
            <p className="text-gray-300">
              Due to the digital nature of our products, <strong className="text-red-300">all sales are final</strong>. 
              We do not offer refunds or exchanges once a purchase is completed, except as required by applicable law.
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
                    <strong>No refunds</strong> will be issued for any reason after purchase (subject to applicable consumer protection laws)
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
                <h2 className="text-2xl font-bold mb-3 text-orange-300">Delivery Timeline & Guarantees</h2>
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
                    In rare cases, delivery may take up to <strong>weeks</strong> during high demand
                  </li>
                  <li>
                    <strong>Delivery Guarantee:</strong> If we fail to deliver within 30 days without valid reason, you may be entitled to a refund under applicable consumer protection laws
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
                    By completing a purchase, you confirm you have read and agreed to this no-refund policy, subject to your statutory consumer rights.
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
                  <li>
                    <strong>Product defects</strong> - If the product doesn't work as advertised, we'll provide technical support or replacement when possible
                  </li>
                </ul>
                <p className="text-gray-400 text-sm mt-4">
                  Note: Support does not automatically constitute a refund, but we are committed to resolving legitimate issues.
                </p>
              </div>
            </div>
          </section>

          {/* Legal Information Section - NEW */}
          <section className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <MapPin className="text-green-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-green-300">Legal Information & Contact</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-bold text-green-200 mb-2">Governing Law & Jurisdiction</h3>
                    <p className="text-sm">
                      This refund policy and all disputes arising from it shall be governed by the laws of India. 
                      Any legal proceedings shall be subject to the exclusive jurisdiction of courts in [Your City/State].
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-green-200 mb-2">Consumer Complaint Process</h3>
                    <p className="text-sm mb-2">
                      If you believe your consumer rights have been violated, you may:
                    </p>
                    <ul className="text-sm space-y-1 pl-5 list-disc">
                      <li>Contact our support team first for resolution</li>
                      <li>File a complaint with the District Consumer Disputes Redressal Commission</li>
                      <li>Use the National Consumer Helpline: 1800-11-4000</li>
                      <li>Visit the official consumer portal at consumerhelpline.gov.in</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-green-200 mb-2">Contact Information</h3>
                    <p className="text-sm">
                      Email: support@sxstore.com<br/>
                      Response Time: 24-48 hours<br/>
                      Business Hours: 9:00 AM - 6:00 PM IST (Monday-Friday)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final Confirmation */}
          <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-800 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-3 text-red-300">Purchase Confirmation</h3>
            <p className="text-gray-300 mb-4">
              By proceeding with any purchase from SX Store, you acknowledge and agree to all terms of this refund policy, 
              while retaining your statutory consumer rights under applicable law.
            </p>
            <a 
              href="/store"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              <ShoppingCart size={18} />
              I Understand - Continue to Store
            </a>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-md border-t border-gray-700 z-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-center gap-8">
            <a 
              href="/store"
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-400 transition group"
            >
              <div className="p-2 rounded-lg group-hover:bg-gray-700 transition">
                <Store size={20} />
              </div>
              <span className="text-xs">Store</span>
            </a>
            <a 
              href="/downloads"
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-400 transition group"
            >
              <div className="p-2 rounded-lg group-hover:bg-gray-700 transition">
                <Download size={20} />
              </div>
              <span className="text-xs">Downloads</span>
            </a>
            <a 
              href="/status"
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-400 transition group"
            >
              <div className="p-2 rounded-lg group-hover:bg-gray-700 transition">
                <Activity size={20} />
              </div>
              <span className="text-xs">Status</span>
            </a>
            <a 
              href="/membership"
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-400 transition group"
            >
              <div className="p-2 rounded-lg group-hover:bg-gray-700 transition">
                <Crown size={20} />
              </div>
              <span className="text-xs">Membership</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-700 py-8 mt-12 mb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/terms" className="text-gray-400 hover:text-orange-400 transition">
              Terms of Service
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-orange-400 transition">
              Privacy Policy
            </a>
            <a href="/refunds" className="text-orange-400 font-medium">
              Refund Policy
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SX Store. All sales are final, subject to applicable consumer protection laws.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            This policy complies with the Consumer Protection Act, 2019 (India) and applicable digital goods regulations.
          </p>
        </div>
      </footer>
    </div>
  );
}
