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
                  <strong className="text-blue-300"> कृपया ध्यान से पढ़ें।</strong>
                </>
              ) : (
                <>
                  By accessing or using our services, you agree to be bound by these terms. 
                  <strong className="text-blue-300"> Please read them carefully.</strong>
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
                      'हमारी सेवाओं का उपयोग करने के लिए आपकी आयु <strong>कम से कम 13 वर्ष</strong> होनी चाहिए'
                    ) : (
                      'You must be <strong>at least 13 years old</strong> to use our services'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'आप अपने खाते के तहत <strong>सभी गतिविधियों</strong> के लिए जिम्मेदार हैं'
                    ) : (
                      'You are responsible for <strong>all activities</strong> under your account'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'हम किसी भी समय सेवाओं को <strong>संशोधित या समाप्त</strong> करने का अधिकार सुरक्षित रखते हैं'
                    ) : (
                      'We reserve the right to <strong>modify or terminate</strong> services at any time'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      '<strong>निषिद्ध गतिविधियों</strong> में धोखाधड़ी, उत्पीड़न और अवैध सामग्री वितरण शामिल है'
                    ) : (
                      '<strong>Prohibited activities</strong> include fraud, harassment, and illegal content distribution'
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
                      'आपको <strong>सटीक और पूर्ण</strong> जानकारी प्रदान करनी होगी'
                    ) : (
                      'You must provide <strong>accurate and complete</strong> information'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'आप अपनी साख की <strong>गोपनीयता बनाए रखने</strong> के लिए जिम्मेदार हैं'
                    ) : (
                      'You are responsible for <strong>maintaining confidentiality</strong> of your credentials'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'आपको किसी भी अनधिकृत पहुंच के बारे में <strong>हमें तुरंत सूचित</strong> करना होगा'
                    ) : (
                      'You must <strong>notify us immediately</strong> of any unauthorized access'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'हम इन नियमों का उल्लंघन करने वाले खातों को <strong>निलंबित या समाप्त</strong> कर सकते हैं'
                    ) : (
                      'We may <strong>suspend or terminate</strong> accounts violating these terms'
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
                      'वितरण तिथियां <strong>निश्चित नहीं हैं</strong> और स्टॉक की उपलब्धता के आधार पर भिन्न हो सकती हैं'
                    ) : (
                      'Delivery dates <strong>are not fixed</strong> and may vary depending on stock availability'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'हम वितरण अनुमान <strong>उत्पादों के स्टॉक में होने पर</strong> प्रदान करेंगे'
                    ) : (
                      'We will provide delivery estimates <strong>when items are in stock</strong>'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      '<strong>प्री-ऑर्डर आइटम</strong> उपलब्ध होने पर भेज दिए जाएंगे'
                    ) : (
                      '<strong>Pre-order items</strong> will be shipped once they become available'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'हमारे पास आउट-ऑफ-स्टॉक आइटम के लिए <strong>आदेश रद्द</strong> करने का अधिकार है'
                    ) : (
                      'We reserve the right to <strong>cancel orders</strong> for out-of-stock items'
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
                      'कुछ व्यवहारों के लिए <strong>भुगतान में देरी</strong> लागू की जा सकती है'
                    ) : (
                      '<strong>Payment delays</strong> may be applied for certain behaviors'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'भुगतान स्थिति के बारे में हमारी टीम को सीधा संदेश (DM) भेजने से आपके भुगतान प्रसंस्करण में <strong>5 घंटे की देरी</strong> होगी'
                    ) : (
                      'Sending a direct message (DM) to our team regarding payment status will result in a <strong>5-hour delay</strong> of your payment processing'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'ग्रुप चैट (GC) में भुगतान स्थिति के बारे में पिंग करने से आपके भुगतान प्रसंस्करण में <strong>24 घंटे की देरी</strong> होगी'
                    ) : (
                      'Pinging in group chats (GC) about payment status will result in a <strong>24-hour delay</strong> of your payment processing'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'बार-बार पूछताछ करने से <strong>अतिरिक्त देरी</strong> या खाता समीक्षा हो सकती है'
                    ) : (
                      'Repeated inquiries may result in <strong>additional delays</strong> or account review'
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
                      '<strong>कॉपीराइट</strong> और अन्य बौद्धिक संपदा कानूनों द्वारा संरक्षित हैं'
                    ) : (
                      'Are <strong>protected by copyright</strong> and other intellectual property laws'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'बिना अनुमति के <strong>कॉपी, वितरित या पुनर्विक्रय</strong> नहीं किया जा सकता'
                    ) : (
                      'May not be <strong>copied, distributed, or resold</strong> without permission'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'जब तक अन्यथा निर्दिष्ट न हो, <strong>व्यक्तिगत, गैर-वाणिज्यिक</strong> उपयोग के लिए लाइसेंस प्राप्त हैं'
                    ) : (
                      'Are licensed for <strong>personal, non-commercial</strong> use unless specified otherwise'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'किसी भी उत्पाद का <strong>रिवर्स इंजीनियरिंग</strong> सख्त वर्जित है'
                    ) : (
                      '<strong>Reverse engineering</strong> of any products is strictly prohibited'
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
                      'किसी भी <strong>प्रत्यक्ष, अप्रत्यक्ष, या परिणामी</strong> क्षति'
                    ) : (
                      'Any <strong>direct, indirect, or consequential</strong> damages'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'सेवा उपयोग के परिणामस्वरूप <strong>डेटा या मुनाफे</strong> की हानि'
                    ) : (
                      '<strong>Loss of data</strong> or profits resulting from service use'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'हमारे प्लेटफॉर्म से जुड़ी किसी भी <strong>तृतीय-पक्ष सामग्री</strong> या सेवाएं'
                    ) : (
                      'Any <strong>third-party content</strong> or services linked from our platform'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'साख की सुरक्षा करने में आपकी विफलता के कारण <strong>अनधिकृत पहुंच</strong>'
                    ) : (
                      '<strong>Unauthorized access</strong> due to your failure to protect credentials'
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
                      'हम <strong>उपयोगकर्ताओं को</strong> महत्वपूर्ण परिवर्तनों के बारे में सूचित करेंगे'
                    ) : (
                      'We will <strong>notify users</strong> of significant changes'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'सेवा का <strong>निरंतर उपयोग</strong> नए नियमों की स्वीकृति को दर्शाता है'
                    ) : (
                      'Your <strong>continued use</strong> constitutes acceptance of new terms'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'शीर्ष पर <strong>"अंतिम अपडेट"</strong> तिथि परिवर्तनों को दर्शाएगी'
                    ) : (
                      'The <strong>"Last Updated"</strong> date at the top will reflect changes'
                    )}
                  </li>
                  <li>
                    {isHindi ? (
                      'आपको अपडेट के लिए <strong>समय-समय पर समीक्षा</strong> करनी चाहिए'
                    ) : (
                      'You should <strong>review periodically</strong> for updates'
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
