import Link from 'next/link';
import { BookText, Shield, Lock, AlertTriangle, Scale, Clock, Languages } from 'lucide-react';
import { useState } from 'react';

export default function TermsPage() {
  const [isHindi, setIsHindi] = useState(false);

  const toggleLanguage = () => {
    setIsHindi(!isHindi);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            SX Store
          </Link>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              <Languages size={18} />
              {isHindi ? 'English' : 'हिंदी'}
            </button>
            <Link 
              href="/store"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              {isHindi ? 'स्टोर पर वापस जाएं' : 'Back to Store'}
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
            <span className="text-blue-300">{isHindi ? 'कानूनी समझौता' : 'Legal Agreement'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {isHindi ? 'नियम और शर्तें' : 'Terms & Conditions'}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {isHindi ? 'अंतिम अपडेट: 20 जून, 2025' : 'Last Updated: June 20, 2025'}
          </p>
        </section>

        {/* Warning Banner */}
        <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-6 mb-8 flex items-start gap-4">
          <AlertTriangle className="text-blue-400 mt-1 flex-shrink-0" size={24} />
          <div>
            <h2 className="text-xl font-bold text-blue-300 mb-2">
              {isHindi ? 'महत्वपूर्ण सूचना' : 'Important Notice'}
            </h2>
            <p className="text-gray-300">
              {isHindi ? (
                <>
                  हमारी सेवाओं का उपयोग करके, आप इन नियमों से बंधने के लिए सहमत होते हैं।
                  <span className="text-blue-300 font-semibold"> कृपया ध्यान से पढ़ें।</span>
                </>
              ) : (
                <>
                  By accessing or using our services, you agree to be bound by these terms. 
                  <span className="text-blue-300 font-semibold"> Please read them carefully.</span>
                </>
              )}
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
                <h2 className="text-2xl font-bold mb-3 text-blue-300">
                  {isHindi ? '1. सामान्य नियम' : '1. General Terms'}
                </h2>
                <p className="text-gray-300 mb-4">
                  {isHindi ? (
                    'ये सेवा की शर्तें ("नियम") SX Store की वेबसाइट, उत्पादों और सेवाओं के उपयोग को नियंत्रित करती हैं।'
                  ) : (
                    'These Terms of Service ("Terms") govern your access to and use of SX Store\'s website, products, and services.'
                  )}
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    {isHindi ? (
                      'हमारी सेवाओं का उपयोग करने के लिए आपकी आयु कम से कम 13 वर्ष होनी चाहिए'
                    ) : (
                      'You must be at least 13 years old to use our services'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'आप अपने खाते के तहत सभी गतिविधियों के लिए जिम्मेदार हैं'
                    ) : (
                      'You are responsible for all activities under your account'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'हम किसी भी समय सेवाओं को संशोधित या समाप्त करने का अधिकार सुरक्षित रखते हैं'
                    ) : (
                      'We reserve the right to modify or terminate services at any time'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'निषिद्ध गतिविधियों में धोखाधड़ी, उत्पीड़न और अवैध सामग्री वितरण शामिल है'
                    ) : (
                      'Prohibited activities include fraud, harassment, and illegal content distribution'
                    )}
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
                <h2 className="text-2xl font-bold mb-3 text-purple-300">
                  {isHindi ? '2. खाता जिम्मेदारियां' : '2. Account Responsibilities'}
                </h2>
                <p className="text-gray-300 mb-4">
                  {isHindi ? 'SX Store के साथ खाता बनाते समय:' : 'When creating an account with SX Store:'}
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    {isHindi ? (
                      'आपको सटीक और पूर्ण जानकारी प्रदान करनी होगी'
                    ) : (
                      'You must provide accurate and complete information'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'आप अपनी साख की गोपनीयता बनाए रखने के लिए जिम्मेदार हैं'
                    ) : (
                      'You are responsible for maintaining confidentiality of your credentials'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'आपको किसी भी अनधिकृत पहुंच के बारे में हमें तुरंत सूचित करना होगा'
                    ) : (
                      'You must notify us immediately of any unauthorized access'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'हम इन नियमों का उल्लंघन करने वाले खातों को निलंबित या समाप्त कर सकते हैं'
                    ) : (
                      'We may suspend or terminate accounts violating these terms'
                    )}
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
                <h2 className="text-2xl font-bold mb-3 text-orange-300">
                  {isHindi ? '3. उत्पाद वितरण' : '3. Product Delivery'}
                </h2>
                <p className="text-gray-300 mb-4">
                  {isHindi ? 'उत्पाद वितरण और उपलब्धता के संबंध में:' : 'Regarding product delivery and availability:'}
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    {isHindi ? (
                      'वितरण तिथियां निश्चित नहीं हैं और स्टॉक की उपलब्धता के आधार पर भिन्न हो सकती हैं'
                    ) : (
                      'Delivery dates are not fixed and may vary depending on stock availability'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'हम वितरण अनुमान उत्पादों के स्टॉक में होने पर प्रदान करेंगे'
                    ) : (
                      'We will provide delivery estimates when items are in stock'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'प्री-ऑर्डर आइटम उपलब्ध होने पर भेज दिए जाएंगे'
                    ) : (
                      'Pre-order items will be shipped once they become available'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'हमारे पास आउट-ऑफ-स्टॉक आइटम के लिए आदेश रद्द करने का अधिकार है'
                    ) : (
                      'We reserve the right to cancel orders for out-of-stock items'
                    )}
                  </li>
                </ul>
                <div className="bg-gray-700/50 p-4 rounded-lg mt-4 border-l-4 border-orange-500">
                  <p className="text-orange-300 font-medium">
                    {isHindi ? 'वितरण समय केवल अनुमान हैं और गारंटीकृत नहीं हैं।' : 'Delivery times are estimates only and not guaranteed.'}
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
                <h2 className="text-2xl font-bold mb-3 text-green-300">
                  {isHindi ? '4. भुगतान प्रसंस्करण नियम' : '4. Payment Processing Terms'}
                </h2>
                <p className="text-gray-300 mb-4">
                  {isHindi ? 'भुगतान प्रसंस्करण और भुगतान के संबंध में विशिष्ट शर्तें:' : 'Specific conditions regarding payment processing and payouts:'}
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    {isHindi ? (
                      'कुछ व्यवहारों के लिए भुगतान में देरी लागू की जा सकती है'
                    ) : (
                      'Payment delays may be applied for certain behaviors'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'भुगतान स्थिति के बारे में हमारी टीम को सीधा संदेश (DM) भेजने से आपके भुगतान प्रसंस्करण में 5 घंटे की देरी होगी'
                    ) : (
                      'Sending a direct message (DM) to our team regarding payment status will result in a 5-hour delay of your payment processing'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'ग्रुप चैट (GC) में भुगतान स्थिति के बारे में पिंग करने से आपके भुगतान प्रसंस्करण में 24 घंटे की देरी होगी'
                    ) : (
                      'Pinging in group chats (GC) about payment status will result in a 24-hour delay of your payment processing'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'बार-बार पूछताछ करने से अतिरिक्त देरी या खाता समीक्षा हो सकती है'
                    ) : (
                      'Repeated inquiries may result in additional delays or account review'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'सभी भुगतान प्राप्त होने के क्रम में संसाधित किए जाते हैं, किसी भी लागू देरी को घटाकर'
                    ) : (
                      'All payments are processed in the order they are received, minus any applicable delays'
                    )}
                  </li>
                </ul>
                <div className="bg-gray-700/50 p-4 rounded-lg mt-4 border-l-4 border-green-500">
                  <p className="text-green-300 font-medium">
                    {isHindi ? 'कृपया भुगतान स्थिति के बारे में पूछताछ करने से पहले मानक प्रसंस्करण समय की अनुमति दें।' : 'Please allow standard processing times before inquiring about payment status.'}
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
                <h2 className="text-2xl font-bold mb-3 text-purple-300">
                  {isHindi ? '5. बौद्धिक संपदा' : '5. Intellectual Property'}
                </h2>
                <p className="text-gray-300 mb-4">
                  {isHindi ? 'SX Store के माध्यम से उपलब्ध सभी सामग्री और सामग्री:' : 'All content and materials available through SX Store:'}
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    {isHindi ? (
                      'कॉपीराइट और अन्य बौद्धिक संपदा कानूनों द्वारा संरक्षित हैं'
                    ) : (
                      'Are protected by copyright and other intellectual property laws'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'बिना अनुमति के कॉपी, वितरित या पुनर्विक्रय नहीं किया जा सकता'
                    ) : (
                      'May not be copied, distributed, or resold without permission'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'जब तक अन्यथा निर्दिष्ट न हो, व्यक्तिगत, गैर-वाणिज्यिक उपयोग के लिए लाइसेंस प्राप्त हैं'
                    ) : (
                      'Are licensed for personal, non-commercial use unless specified otherwise'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'किसी भी उत्पाद का रिवर्स इंजीनियरिंग सख्त वर्जित है'
                    ) : (
                      'Reverse engineering of any products is strictly prohibited'
                    )}
                  </li>
                </ul>
                <div className="bg-gray-700/50 p-4 rounded-lg mt-4 border-l-4 border-blue-500">
                  <p className="text-blue-300 font-medium">
                    {isHindi ? 'बौद्धिक संपदा अधिकारों का उल्लंघन कानूनी कार्रवाई का कारण बन सकता है।' : 'Violations of intellectual property rights may result in legal action.'}
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
                <h2 className="text-2xl font-bold mb-3 text-red-300">
                  {isHindi ? '6. देयता की सीमाएं' : '6. Limitations of Liability'}
                </h2>
                <p className="text-gray-300 mb-4">
                  {isHindi ? 'SX Store जिम्मेदार नहीं होगा:' : 'SX Store shall not be liable for:'}
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    {isHindi ? (
                      'किसी भी प्रत्यक्ष, अप्रत्यक्ष, या परिणामी क्षति'
                    ) : (
                      'Any direct, indirect, or consequential damages'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'सेवा उपयोग के परिणामस्वरूप डेटा या मुनाफे की हानि'
                    ) : (
                      'Loss of data or profits resulting from service use'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'हमारे प्लेटफॉर्म से जुड़ी किसी भी तृतीय-पक्ष सामग्री या सेवाएं'
                    ) : (
                      'Any third-party content or services linked from our platform'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'साख की सुरक्षा करने में आपकी विफलता के कारण अनधिकृत पहुंच'
                    ) : (
                      'Unauthorized access due to your failure to protect credentials'
                    )}
                  </li>
                </ul>
                <p className="text-gray-400 text-sm mt-4">
                  {isHindi ? 'कुछ क्षेत्राधिकार देयता पर सीमाओं की अनुमति नहीं देते हैं, इसलिए ये आप पर लागू नहीं हो सकते हैं।' : 'Some jurisdictions do not allow limitations on liability, so these may not apply to you.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="changes-to-terms" className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <Scale className="text-blue-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-blue-300">
                  {isHindi ? '7. नियमों में परिवर्तन' : '7. Changes to Terms'}
                </h2>
                <p className="text-gray-300 mb-4">
                  {isHindi ? 'हम समय-समय पर इन नियमों को अपडेट कर सकते हैं:' : 'We may update these Terms from time to time:'}
                </p>
                <ul className="space-y-3 text-gray-300 pl-5 list-disc">
                  <li>
                    {isHindi ? (
                      'हम उपयोगकर्ताओं को महत्वपूर्ण परिवर्तनों के बारे में सूचित करेंगे'
                    ) : (
                      'We will notify users of significant changes'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'सेवा का निरंतर उपयोग नए नियमों की स्वीकृति को दर्शाता है'
                    ) : (
                      'Your continued use constitutes acceptance of new terms'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'शीर्ष पर "अंतिम अपडेट" तिथि परिवर्तनों को दर्शाएगी'
                    ) : (
                      'The "Last Updated" date at the top will reflect changes'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'आपको अपडेट के लिए समय-समय पर समीक्षा करनी चाहिए'
                    ) : (
                      'You should review periodically for updates'
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Final Confirmation */}
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-3 text-blue-300">
              {isHindi ? 'समझौता पुष्टिकरण' : 'Agreement Confirmation'}
            </h3>
            <p className="text-gray-300 mb-4">
              {isHindi ? (
                'SX Store सेवाओं का उपयोग करके, आप स्वीकार करते हैं कि आपने इन नियमों को पढ़, समझ लिया है और इनसे बंधने के लिए सहमत हैं।'
              ) : (
                'By using SX Store services, you acknowledge you have read, understood, and agree to be bound by these Terms.'
              )}
            </p>
            <Link 
              href="/store"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              <BookText size={18} />
              {isHindi ? 'मैं सहमत हूं - स्टोर पर जाएं' : 'I Agree - Continue to Store'}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-700 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/terms#general-terms" className="text-blue-400 font-medium">
              {isHindi ? 'सेवा की शर्तें' : 'Terms of Service'}
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition">
              {isHindi ? 'गोपनीयता नीति' : 'Privacy Policy'}
            </Link>
            <Link href="/refund" className="text-gray-400 hover:text-orange-400 transition">
              {isHindi ? 'धनवापसी नीति' : 'Refund Policy'}
            </Link>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SX Store. {isHindi ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
