import { useState } from "react";

export default function GameStartMenu() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated 3D Background Elements */}
      <div className="absolute inset-0">
        {/* Floating 3D Cubes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 border-2 border-red-500/30 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `floatCube ${Math.random() * 20 + 10}s infinite linear`
            }}
          />
        ))}
        
        {/* Pulsing Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-800/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        {/* Game Title with 3D Effect */}
        <div className="text-center mb-20">
          <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tighter">
            <span className="bg-gradient-to-b from-white via-red-100 to-red-300 bg-clip-text text-transparent relative">
              CRICKET
              <div className="absolute inset-0 bg-gradient-to-b from-white via-red-100 to-red-300 bg-clip-text text-transparent blur-sm opacity-50 -z-10">
                CRICKET
              </div>
            </span>
          </h1>
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-bold text-red-400 tracking-widest uppercase">
              FUSION PRO
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </div>
        </div>

        {/* Start Button with 3D Effect */}
        <button
          className={`relative px-16 py-6 text-2xl font-bold uppercase tracking-widest transition-all duration-500 transform ${
            isHovered ? 'scale-110 -translate-y-2' : 'scale-100'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Button Background with 3D Layers */}
          <div className={`absolute inset-0 bg-gradient-to-b from-red-600 to-red-800 rounded-full transition-all duration-500 ${
            isHovered ? 'blur-md opacity-80' : 'blur-sm opacity-60'
          }`}></div>
          
          {/* Main Button */}
          <div className={`relative bg-gradient-to-b from-red-500 to-red-700 rounded-full px-16 py-6 border-2 ${
            isHovered ? 'border-red-300 shadow-2xl' : 'border-red-400 shadow-xl'
          } transition-all duration-300`}>
            <span className={`bg-gradient-to-b from-white to-red-100 bg-clip-text text-transparent ${
              isHovered ? 'drop-shadow-lg' : ''
            }`}>
              START GAME
            </span>
          </div>
          
          {/* Button Glow */}
          <div className={`absolute inset-0 rounded-full bg-red-500 blur-xl transition-all duration-500 ${
            isHovered ? 'opacity-60' : 'opacity-30'
          }`}></div>
        </button>

        {/* Social Links - Minimal */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="flex justify-center space-x-6 text-red-400/60">
            <a href="#" className="hover:text-red-300 transition-colors duration-300 text-sm uppercase tracking-widest">
              Telegram
            </a>
            <a href="#" className="hover:text-red-300 transition-colors duration-300 text-sm uppercase tracking-widest">
              YouTube
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatCube {
          0% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) rotate(180deg) scale(1.1);
            opacity: 0.4;
          }
          100% {
            transform: translateY(0px) rotate(360deg) scale(1);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
