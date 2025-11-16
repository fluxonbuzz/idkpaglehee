import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Settings, 
  Users, 
  Trophy, 
  Star, 
  Sparkles, 
  Zap,
  Gamepad2,
  Crown,
  Shield,
  Volume2,
  Globe,
  Mail
} from 'lucide-react';

export default function GameStartMenu() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeButton, setActiveButton] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Particle Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: `hsl(${Math.random() * 30 + 350}, 70%, 60%)`,
        opacity: Math.random() * 0.4 + 0.1
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (120 - distance) / 120 * 0.1;
            ctx.lineWidth = 0.3;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated 3D Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Floating 3D Elements */}
      <div className="absolute inset-0">
        {/* Floating Cricket Balls */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 rounded-full border-2 border-red-500/30 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatBall ${Math.random() * 15 + 10}s infinite linear`
            }}
          />
        ))}
        
        {/* Pulsing Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-800/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Game Title with 3D Effect */}
        <div className="text-center mb-16 relative">
          {/* Main Title Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700 blur-2xl opacity-30 rounded-full transform scale-150"></div>
          
          <h1 className="text-8xl md:text-9xl font-black mb-6 tracking-tighter relative">
            <span className="bg-gradient-to-b from-white via-red-100 to-red-300 bg-clip-text text-transparent relative z-10">
              CRICKET
              <div className="absolute inset-0 bg-gradient-to-b from-white via-red-100 to-red-300 bg-clip-text text-transparent blur-sm opacity-50 -z-10 transform translate-y-1">
                CRICKET
              </div>
            </span>
          </h1>
          
          {/* Subtitle */}
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-red-400 tracking-widest uppercase flex items-center justify-center gap-4">
              <Sparkles className="w-8 h-8 text-red-400" />
              FUSION PRO
              <Sparkles className="w-8 h-8 text-red-400" />
            </h2>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </div>

          {/* Version Badge */}
          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-600 to-red-800 text-white text-sm font-bold px-4 py-2 rounded-full border border-red-400/30 shadow-lg">
            v2.0.1
          </div>
        </div>

        {/* Start Button with 3D Effect */}
        <div className="relative mb-16">
          <button
            className={`relative px-20 py-6 text-3xl font-bold uppercase tracking-widest transition-all duration-500 transform ${
              isHovered ? 'scale-110 -translate-y-2' : 'scale-100'
            }`}
            onMouseEnter={() => {
              setIsHovered(true);
              setActiveButton('start');
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setActiveButton('');
            }}
          >
            {/* Button Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full transition-all duration-500 ${
              isHovered ? 'blur-xl opacity-80' : 'blur-lg opacity-60'
            }`}></div>
            
            {/* Main Button 3D Layer */}
            <div className={`relative bg-gradient-to-b from-red-500 to-red-700 rounded-full px-20 py-6 border-2 ${
              isHovered ? 'border-red-300 shadow-2xl' : 'border-red-400 shadow-xl'
            } transition-all duration-300 backdrop-blur-sm`}>
              <span className={`bg-gradient-to-b from-white to-red-100 bg-clip-text text-transparent flex items-center gap-4 ${
                isHovered ? 'drop-shadow-lg scale-105' : ''
              } transition-all duration-300`}>
                <Play className="w-8 h-8" fill="currentColor" />
                START GAME
              </span>
            </div>
            
            {/* Animated Ring */}
            <div className={`absolute inset-0 rounded-full border-2 border-red-400/50 transition-all duration-1000 ${
              isHovered ? 'animate-ping opacity-20' : 'opacity-0'
            }`}></div>
          </button>

          {/* Floating Particles around button */}
          <div className="absolute -top-4 -left-4 w-4 h-4 bg-red-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-2 -right-6 w-3 h-3 bg-red-300 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute -top-6 -right-4 w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Secondary Menu Buttons */}
        <div className="flex gap-8 mb-12">
          {[
            { icon: Settings, label: 'Settings', color: 'blue' },
            { icon: Trophy, label: 'Leaderboard', color: 'yellow' },
            { icon: Users, label: 'Multiplayer', color: 'green' },
            { icon: Gamepad2, label: 'Controls', color: 'purple' }
          ].map((item, index) => (
            <button
              key={item.label}
              className={`group relative p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 transform ${
                activeButton === item.label.toLowerCase() 
                  ? 'scale-110 -translate-y-1' 
                  : 'hover:scale-105 hover:-translate-y-1'
              } ${
                item.color === 'blue' ? 'bg-blue-600/20 border-blue-500/30 hover:bg-blue-600/30' :
                item.color === 'yellow' ? 'bg-yellow-600/20 border-yellow-500/30 hover:bg-yellow-600/30' :
                item.color === 'green' ? 'bg-green-600/20 border-green-500/30 hover:bg-green-600/30' :
                'bg-purple-600/20 border-purple-500/30 hover:bg-purple-600/30'
              }`}
              onMouseEnter={() => setActiveButton(item.label.toLowerCase())}
              onMouseLeave={() => setActiveButton('')}
            >
              <item.icon className={`w-8 h-8 ${
                item.color === 'blue' ? 'text-blue-400' :
                item.color === 'yellow' ? 'text-yellow-400' :
                item.color === 'green' ? 'text-green-400' :
                'text-purple-400'
              } group-hover:scale-110 transition-transform duration-300`} />
            </button>
          ))}
        </div>

        {/* Social Links - Minimal */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="flex justify-center items-center gap-8 text-red-400/60">
            {/* Social Icons */}
            <div className="flex gap-6">
              <a href="#" className="hover:text-red-300 transition-all duration-300 transform hover:scale-110">
                <Mail className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-red-300 transition-all duration-300 transform hover:scale-110">
                <Globe className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-red-300 transition-all duration-300 transform hover:scale-110">
                <Volume2 className="w-6 h-6" />
              </a>
            </div>
            
            {/* Separator */}
            <div className="w-px h-6 bg-red-400/30"></div>
            
            {/* Text Links */}
            <div className="flex gap-6 text-sm uppercase tracking-widest">
              <a href="#" className="hover:text-red-300 transition-colors duration-300">
                Telegram
              </a>
              <a href="#" className="hover:text-red-300 transition-colors duration-300">
                YouTube
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-4 text-red-400/40 text-sm">
            © 2024 CRICKET FUSION PRO. All rights reserved.
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatBall {
          0% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-25px) rotate(180deg) scale(1.2);
            opacity: 0.4;
          }
          100% {
            transform: translateY(0px) rotate(360deg) scale(1);
            opacity: 0.2;
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
