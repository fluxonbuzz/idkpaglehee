import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { PartyPopper, Gift, Cake, Sparkles, Music } from 'lucide-react';

export default function BirthdayPage() {
  const [gifts, setGifts] = useState([
    { id: 1, name: 'Lwda', opened: false },
    { id: 2, name: 'Kothe ka access', opened: false },
    { id: 3, name: 'bday wali chummi', opened: false },
  ]);
  const [cakePieces, setCakePieces] = useState(8);
  const [isPlaying, setIsPlaying] = useState(false);

  const openGift = (id: number) => {
    setGifts(gifts.map(gift => 
      gift.id === id ? { ...gift, opened: true } : gift
    ));
  };

  const takeCakePiece = () => {
    if (cakePieces > 0) {
      setCakePieces(cakePieces - 1);
    }
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <Head>
        <title>Happy Birthday SilentShadow!</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-700 text-white overflow-hidden">
        {/* Background Animations */}
        <div className="fixed inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-pink-400 opacity-20 animate-float"
              style={{
                width: `${Math.random() * 50 + 20}px`,
                height: `${Math.random() * 50 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Music Toggle */}
        <button 
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 bg-pink-600 hover:bg-pink-700 rounded-full p-3 shadow-lg transition-all hover:scale-110"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <Music className={isPlaying ? "text-yellow-300" : "text-white"} />
          {isPlaying && (
            <div className="absolute inset-0 rounded-full border-2 border-yellow-300 animate-ping opacity-75"></div>
          )}
        </button>

        {/* Main Content */}
        <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center">
          {/* Header */}
          <header className="text-center mb-12 animate-bounce">
            <div className="inline-flex items-center gap-2 bg-pink-600/30 border border-pink-400/50 rounded-full px-6 py-2 mb-4">
              <PartyPopper className="text-yellow-300" />
              <span className="text-yellow-200 font-medium">Special Celebration</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Happy Birthday <span className="animate-pulse">SilentShadow!</span>
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Wishing you an amazing day filled with joy and happiness!
            </p>
          </header>

          {/* Profile Section */}
          <section className="relative group mb-16">
            <div className="relative w-48 h-48 rounded-full border-4 border-yellow-300 shadow-xl overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl">
              <Image 
                src="/assets/silentshadow.png" 
                alt="SilentShadow" 
                layout="fill" 
                objectFit="cover"
                className="group-hover:brightness-110 transition"
              />
            </div>
            <div className="absolute -inset-4 rounded-full border-2 border-pink-400 opacity-0 group-hover:opacity-100 animate-spin-slow transition-opacity duration-300"></div>
            <div className="absolute -inset-8 rounded-full border-2 border-purple-400 opacity-0 group-hover:opacity-50 animate-spin-slow transition-opacity duration-500 delay-100"></div>
            <Sparkles className="absolute -top-4 -right-4 text-yellow-300 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
          </section>

          {/* Cake Section */}
          <section className="bg-pink-800/50 backdrop-blur-sm rounded-2xl p-8 border border-pink-600 shadow-lg mb-16 w-full max-w-2xl">
            <div className="flex flex-col items-center">
              <div className="relative mb-8">
                <Cake className="text-yellow-300 w-32 h-32" />
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
                  </div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-yellow-300 mb-4">Birthday Cake</h2>
              <p className="text-pink-100 mb-6 text-center">
                {cakePieces > 0 
                  ? `There are ${cakePieces} pieces left! Take one!` 
                  : "The cake is all gone! 🎂"}
              </p>
              <button 
                onClick={takeCakePiece}
                disabled={cakePieces === 0}
                className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${cakePieces > 0 
                  ? 'bg-yellow-400 hover:bg-yellow-300 text-pink-900 hover:scale-105' 
                  : 'bg-gray-500 cursor-not-allowed'}`}
              >
                <Cake />
                {cakePieces > 0 ? 'Take a Piece!' : 'All Gone!'}
              </button>
            </div>
          </section>

          {/* Gifts Section */}
          <section className="w-full max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-yellow-300 mb-8">Your Birthday Gifts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gifts.map(gift => (
                <div 
                  key={gift.id}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${gift.opened 
                    ? 'bg-purple-800/50 border-purple-500' 
                    : 'bg-pink-800/50 border-pink-400 hover:border-yellow-300 hover:scale-105'}`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <Gift className={`w-12 h-12 ${gift.opened ? 'text-yellow-300' : 'text-pink-300'}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{gift.name}</h3>
                    {gift.opened ? (
                      <div className="animate-bounce-in">
                        <p className="text-yellow-200 font-medium">🎉 Unlocked! 🎉</p>
                      </div>
                    ) : (
                      <button 
                        onClick={() => openGift(gift.id)}
                        className="mt-2 px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded-full text-sm font-medium transition-all hover:scale-105"
                      >
                        Open Gift
                      </button>
                    )}
                  </div>
                  {!gift.opened && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Birthday Message */}
          <section className="mt-16 bg-gradient-to-r from-purple-700/50 to-pink-700/50 rounded-2xl p-8 border border-pink-500 w-full max-w-3xl">
            <h2 className="text-3xl font-bold text-center text-yellow-300 mb-6">Special Message</h2>
            <div className="prose prose-invert max-w-none text-center">
              <p className="text-xl mb-4">
                Dear SilentShadow,
              </p>
              <p className="mb-4">
                On this special day, we want to celebrate you and all the amazing contributions you've made to our community!
              </p>
              <p className="mb-4">
                May your birthday be filled with joy, laughter, and all the things that make you happiest. You deserve the very best today and always!
              </p>
              <p className="text-2xl text-yellow-300 font-bold mt-6">
                Happy Birthday! 🎂🎉
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-8 text-center text-pink-200">
          <p>Made with ❤️ for SilentShadow's Birthday</p>
          <p className="text-sm mt-2">© {new Date().getFullYear()} Birthday Wishes Team</p>
        </footer>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </>
  );
}
