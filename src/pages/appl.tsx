'use client';

import { LockKeyhole, Clock, ScrollText, ShieldCheck, UserCog, AlertTriangle, CheckCircle, ArrowRight, X, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ApplyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [eligibilityAnswers, setEligibilityAnswers] = useState<boolean[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    "Have you been a member for at least 3 months?",
    "Do you have at least 10 hours weekly to dedicate?",
    "Are you comfortable with conflict resolution?",
    "Do you have no active warnings on your account?"
  ];

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...eligibilityAnswers];
    newAnswers[currentQuestion] = answer;
    setEligibilityAnswers(newAnswers);

    if (!answer) {
      // Redirect to home page if any answer is no
      window.location.href = '/';
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const resetEligibilityCheck = () => {
    setEligibilityAnswers([]);
    setCurrentQuestion(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            SHIVA X MODS
          </h1>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-purple-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-purple-300 transition-colors flex items-center">
                  Testimonials <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-300 transition-colors">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-gray-900 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Menu</h2>
          <button 
            className="p-1 rounded-md text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link 
                href="/" 
                className="block hover:text-purple-300 transition-colors p-2 rounded hover:bg-gray-800"
                onClick={() => setSidebarOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/testimonials" 
                className="block hover:text-purple-300 transition-colors p-2 rounded hover:bg-gray-800 flex items-center"
                onClick={() => setSidebarOpen(false)}
              >
                Testimonials <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="block hover:text-purple-300 transition-colors p-2 rounded hover:bg-gray-800"
                onClick={() => setSidebarOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                href="/apply" 
                className="block bg-purple-900/50 text-purple-300 p-2 rounded border border-purple-700"
                onClick={() => setSidebarOpen(false)}
              >
                Apply Now
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

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

        {/* Eligibility Checker */}
        <div className="my-16 bg-gray-800/50 p-8 rounded-xl border border-blue-500/30">
          <h2 className="text-3xl font-bold text-center mb-8">Am I Eligible?</h2>
          <div className="max-w-md mx-auto">
            {eligibilityAnswers.length < questions.length ? (
              <div className="space-y-6">
                <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm text-gray-400 mb-1">Question {currentQuestion + 1} of {questions.length}</p>
                  <h3 className="font-medium">{questions[currentQuestion]}</h3>
                </div>
                
                <div className="flex justify-center space-x-4 pt-4">
                  <button 
                    onClick={() => handleAnswer(true)}
                    className="px-6 py-2 rounded-lg bg-green-900/50 hover:bg-green-800 border border-green-700 flex items-center"
                  >
                    <CheckCircle className="mr-2 h-5 w-5" /> Yes
                  </button>
                  <button 
                    onClick={() => handleAnswer(false)}
                    className="px-6 py-2 rounded-lg bg-red-900/50 hover:bg-red-800 border border-red-700 flex items-center"
                  >
                    <X className="mr-2 h-5 w-5" /> No
                  </button>
                </div>
                
                {/* Progress indicator */}
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-6">
                  <div 
                    className="bg-purple-500 h-2.5 rounded-full" 
                    style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-4">You're Eligible!</h3>
                <p className="text-gray-400 mb-6">Based on your answers, you meet our basic requirements.</p>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={resetEligibilityCheck}
                    className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600"
                  >
                    Retake Check
                  </button>
                  <Link 
                    href="#application-form" 
                    className="px-4 py-2 rounded-lg bg-purple-900/50 hover:bg-purple-800 border border-purple-700"
                  >
                    Continue to Application
                  </Link>
                </div>
                <Link href="/testimonials" className="mt-6 inline-flex items-center text-purple-400 hover:underline">
                  Hear from current Guardians <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Rest of the content remains the same */}
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

        {/* Role-Specific Information */}
        <div className="my-16">
          <h2 className="text-3xl font-bold text-center mb-12">Guardian Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Community Guardians",
                description: "Moderate discussions, welcome new members, and foster positive engagement.",
                perks: ["Frontline experience", "Daily interaction", "Culture shaping"]
              },
              {
                title: "Safety Guardians",
                description: "Handle reports, investigate issues, and enforce community standards.",
                perks: ["Advanced training", "Conflict resolution", "Policy input"]
              },
              {
                title: "Event Guardians",
                description: "Organize and oversee community events and special programs.",
                perks: ["Creative freedom", "Leadership opportunities", "Event planning"]
              },
              {
                title: "Mentor Guardians",
                description: "Train new Guardians and provide ongoing support to the team.",
                perks: ["Teaching experience", "Strategic influence", "Team leadership"]
              }
            ].map((role, i) => (
              <div key={i} className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all">
                <h3 className="text-xl font-bold text-purple-300 mb-2">{role.title}</h3>
                <p className="text-gray-400 mb-4">{role.description}</p>
                <div className="space-y-2">
                  {role.perks.map((perk, j) => (
                    <div key={j} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      <span className="text-sm">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats/Impact Section */}
        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Guardians Make a Difference</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "98%", label: "Member Satisfaction" },
              { value: "24/7", label: "Coverage" },
              { value: "500+", label: "Issues Resolved Monthly" },
              { value: "4.8★", label: "Team Rating" }
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Tips */}
        <div className="my-16 bg-gray-800/50 p-8 rounded-xl border border-pink-500/30">
          <h2 className="text-3xl font-bold text-center mb-8">Application Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold text-pink-300 mb-4 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" /> Do's
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Be authentic and personal in your responses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Highlight specific contributions you've made</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Demonstrate understanding of our values</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" /> Don'ts
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Don't give one-word or generic answers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Avoid criticizing current moderation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Don't exaggerate your availability</span>
                </li>
              </ul>
            </div>
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
        <div id="application-form" className="bg-gray-800/50 border border-purple-500 rounded-xl p-8 mb-16">
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

        {/* FAQ Section */}
        <div className="my-16 bg-gray-800/30 p-8 rounded-xl border border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                question: "Can I apply if I've had warnings in the past?",
                answer: "Minor infractions more than 3 months old may be forgiven, but serious violations typically disqualify applicants."
              },
              {
                question: "Is there training provided?",
                answer: "Yes, all new Guardians go through a comprehensive training program with ongoing support."
              },
              {
                question: "Can I take breaks during my service?",
                answer: "We allow temporary leaves of absence with proper notice and coverage arrangements."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-purple-300 mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
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

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                SHIVA X MODS
              </h2>
              <p className="text-gray-500 text-sm mt-1">Community Guardianship Program</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-purple-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-purple-300 transition-colors">Terms</Link>
              <Link href="/contact" className="text-gray-400 hover:text-purple-300 transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} SHIVA X MODS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
