// pages/status.tsx
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Clock, Youtube, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';

export default function StatusPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isLaunched, setIsLaunched] = useState(false);

  // Memoize the launch date to prevent unnecessary recreations
  const getLaunchDate = useCallback(() => new Date('2025-06-07T14:00:00').getTime(), []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = getLaunchDate() - now;

      if (distance < 0) {
        setIsLaunched(true);
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [getLaunchDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Shiva X Status
          </Link>
          <Link 
            href="/" 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition flex items-center gap-1"
          >
            <ChevronRight size={16} /> Back Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1 bg-gray-800 rounded-full mb-4 border border-gray-700 text-sm flex items-center gap-1">
            {isLaunched ? (
              <>
                <CheckCircle className="text-green-400" size={16} />
                <span>Video Launched!</span>
              </>
            ) : (
              <>
                <AlertTriangle className="text-yellow-400" size={16} />
                <span>Coming Soon</span>
              </>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Crick Fusion Official Video
          </h1>
          <p className="text-xl text-gray-300">
            {isLaunched ? 'Watch our brand new video now!' : 'Launching soon - stay tuned!'}
          </p>
        </section>

        {/* Countdown or Video Section */}
        <section className="max-w-2xl mx-auto mb-16">
          <div className={`rounded-xl overflow-hidden border-2 ${isLaunched ? 'border-green-500/30' : 'border-orange-500/30'} bg-gradient-to-br ${isLaunched ? 'from-gray-800 to-gray-900' : 'from-orange-900/20 to-red-900/20'}`}>
            <div className="p-8 text-center">
              {isLaunched ? (
                <>
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Youtube size={36} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Video is Live!</h3>
                    <p className="text-gray-400">Published on June 7, 2025</p>
                  </div>
                  
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition"
                  >
                    <Youtube size={20} /> Watch on YouTube
                  </a>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock size={36} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Launching Soon</h3>
                    <p className="text-gray-400">June 7, 2025 at 2:00 PM IST</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <div className="text-3xl font-bold">{timeLeft.hours}</div>
                      <div className="text-sm text-gray-400">Hours</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                      <div className="text-sm text-gray-400">Minutes</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                      <div className="text-sm text-gray-400">Seconds</div>
                    </div>
                  </div>
                  
                  <button 
                    disabled
                    className="inline-flex items-center justify-center gap-2 bg-gray-700 text-gray-400 font-bold py-3 px-6 rounded-lg transition cursor-not-allowed"
                  >
                    <Clock size={20} /> Video Not Available Yet
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">About Crick Fusion</h2>
            <p className="text-gray-300 mb-4">
              Experience cricket like never before with our revolutionary new video that blends cutting-edge technology with the passion of the game. Crick Fusion brings you closer to the action than ever before.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-red-500/10 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">4K Ultra HD</h3>
                  <p className="text-sm text-gray-400">Crystal clear footage in stunning 4K resolution</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-500/10 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">New Edit</h3>
                  <p className="text-sm text-gray-400">Interactive editing and thumbnail work</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notify Me Section */}
        {!isLaunched && (
          <section className="max-w-md mx-auto">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-center">
              <h3 className="text-xl font-bold mb-3">Get Notified When We Launch</h3>
              <p className="text-gray-400 mb-4">We&apos;ll send you a reminder when the video goes live</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-lg transition">
                  Notify Me
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Shiva X Mods. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
