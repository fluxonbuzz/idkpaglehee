import { useEffect, useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  X,
  Heart,
  Zap,
  Feather,
  Waves,
  Moon,
  Leaf,
  Target,
  Sparkles
} from 'lucide-react';

interface BreathingSession {
  id: string;
  name: string;
  duration: number;
  description: string;
  pattern: number[];
  color: string;
  lightColor: string;
  icon: JSX.Element;
  gradient: string;
}

export default function BreathingApp() {
  const [sessions, setSessions] = useState<BreathingSession[]>([]);
  const [activeSession, setActiveSession] = useState<BreathingSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [breathScale, setBreathScale] = useState(1);
  const [pulse, setPulse] = useState(1);
  const [ripples, setRipples] = useState<Array<{id: number; size: number; opacity: number}>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const breathingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number>(0);
  const rippleIdRef = useRef(0);

  // Initialize breathing sessions
  useEffect(() => {
    const initialSessions: BreathingSession[] = [
      {
        id: '1',
        name: 'Calm',
        duration: 120,
        description: 'Find your center',
        pattern: [4, 4, 4, 4],
        color: 'from-blue-400 to-cyan-300',
        lightColor: 'rgba(56, 189, 248, 0.3)',
        icon: <Feather className="h-6 w-6" />,
        gradient: 'linear-gradient(135deg, #60a5fa, #22d3ee)'
      },
      {
        id: '2',
        name: 'Energy',
        duration: 120,
        description: 'Revitalize your spirit',
        pattern: [4, 0, 4, 0],
        color: 'from-orange-400 to-amber-300',
        lightColor: 'rgba(251, 146, 60, 0.3)',
        icon: <Zap className="h-6 w-6" />,
        gradient: 'linear-gradient(135deg, #fb923c, #fbbf24)'
      },
      {
        id: '3',
        name: 'Balance',
        duration: 180,
        description: 'Harmony in motion',
        pattern: [4, 7, 8, 0],
        color: 'from-purple-400 to-pink-300',
        lightColor: 'rgba(192, 132, 252, 0.3)',
        icon: <Waves className="h-6 w-6" />,
        gradient: 'linear-gradient(135deg, #c084fc, #f472b6)'
      },
      {
        id: '4',
        name: 'Sleep',
        duration: 240,
        description: 'Gentle wind down',
        pattern: [4, 4, 6, 2],
        color: 'from-indigo-400 to-blue-300',
        lightColor: 'rgba(129, 140, 248, 0.3)',
        icon: <Moon className="h-6 w-6" />,
        gradient: 'linear-gradient(135deg, #818cf8, #60a5fa)'
      },
      {
        id: '5',
        name: 'Focus',
        duration: 180,
        description: 'Clear your mind',
        pattern: [3, 3, 3, 3],
        color: 'from-green-400 to-emerald-300',
        lightColor: 'rgba(52, 211, 153, 0.3)',
        icon: <Leaf className="h-6 w-6" />,
        gradient: 'linear-gradient(135deg, #34d399, #10b981)'
      },
      {
        id: '6',
        name: 'Box',
        duration: 180,
        description: 'Professional technique',
        pattern: [4, 4, 4, 4],
        color: 'from-cyan-400 to-blue-300',
        lightColor: 'rgba(34, 211, 238, 0.3)',
        icon: <Target className="h-6 w-6" />,
        gradient: 'linear-gradient(135deg, #22d3ee, #3b82f6)'
      }
    ];
    setSessions(initialSessions);
  }, []);

  // Floating particles animation
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
      wobble: number;
      wobbleSpeed: number;
    }> = [];

    const sessionColor = activeSession?.lightColor || 'rgba(56, 189, 248, 0.2)';

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        color: sessionColor,
        opacity: Math.random() * 0.1 + 0.05,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.01
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update wobble
        particle.wobble += particle.wobbleSpeed;
        
        // Gentle floating movement with wobble
        particle.x += particle.speedX + Math.sin(particle.wobble) * 0.1;
        particle.y += particle.speedY + Math.cos(particle.wobble) * 0.1;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Create glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Subtle connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (120 - distance) / 120 * 0.05;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [activeSession]);

  // Breathing animation and timer
  useEffect(() => {
    if (!isPlaying || !activeSession || sessionComplete) return;

    const pattern = activeSession.pattern;
    let currentPhaseIndex = 0;
    let currentTimeLeft = pattern[0];

    // Start continuous pulse animation
    const pulseAnimation = () => {
      setPulse(prev => prev === 1 ? 1.02 : 1);
    };
    const pulseInterval = setInterval(pulseAnimation, 2000);

    // Add ripple effect periodically
    const rippleInterval = setInterval(() => {
      if (isPlaying) {
        rippleIdRef.current += 1;
        setRipples(prev => [...prev, { 
          id: rippleIdRef.current, 
          size: 0, 
          opacity: 0.4 
        }]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== rippleIdRef.current));
        }, 3000);
      }
    }, 4000);

    breathingTimerRef.current = setInterval(() => {
      // Update breathing scale based on phase
      if (currentPhaseIndex === 0) { // Inhale
        const progress = 1 - (currentTimeLeft / pattern[0]);
        setBreathScale(0.7 + progress * 0.3);
      } else if (currentPhaseIndex === 2) { // Exhale
        const progress = 1 - (currentTimeLeft / pattern[2]);
        setBreathScale(1 - progress * 0.3);
      }

      currentTimeLeft--;
      setTimeLeft(currentTimeLeft);

      if (currentTimeLeft <= 0) {
        currentPhaseIndex = (currentPhaseIndex + 1) % pattern.length;
        currentTimeLeft = pattern[currentPhaseIndex];
        setCurrentPhase(currentPhaseIndex);
        setTimeLeft(currentTimeLeft);
      }

      setSessionTime(prev => {
        const newTime = prev + 1;
        if (newTime >= activeSession.duration) {
          completeSession();
          return activeSession.duration;
        }
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(breathingTimerRef.current!);
      clearInterval(pulseInterval);
      clearInterval(rippleInterval);
    };
  }, [isPlaying, activeSession, sessionComplete]);

  const startSession = (session: BreathingSession) => {
    setActiveSession(session);
    setIsPlaying(true);
    setSessionComplete(false);
    setCurrentPhase(0);
    setTimeLeft(session.pattern[0]);
    setSessionTime(0);
    setBreathScale(1);
    setRipples([]);
  };

  const completeSession = () => {
    stopSession();
    setSessionComplete(true);
    setBreathScale(1);
  };

  const stopSession = () => {
    setIsPlaying(false);
    if (breathingTimerRef.current) {
      clearInterval(breathingTimerRef.current);
      breathingTimerRef.current = null;
    }
  };

  const togglePlayPause = () => {
    if (sessionComplete) return;
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    stopSession();
    setSessionComplete(false);
    if (activeSession) {
      startSession(activeSession);
    }
  };

  const getPhaseInstruction = () => {
    if (!activeSession) return '';
    const phases = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'];
    return phases[currentPhase];
  };

  const getProgress = () => {
    if (!activeSession) return 0;
    return (sessionTime / activeSession.duration) * 100;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Update ripples for animation
  useEffect(() => {
    if (ripples.length === 0) return;

    const interval = setInterval(() => {
      setRipples(prev => 
        prev.map(ripple => ({
          ...ripple,
          size: ripple.size + 1,
          opacity: Math.max(0, ripple.opacity - 0.01)
        })).filter(ripple => ripple.opacity > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [ripples.length]);

  // Get background style for canvas
  const getCanvasBackground = () => {
    if (!activeSession?.lightColor) return 'none';
    return `radial-gradient(circle at 30% 20%, ${activeSession.lightColor}20 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${activeSession.lightColor}15 0%, transparent 50%)`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: getCanvasBackground()
        }}
      />
      
      {/* Ambient Light Effect */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: activeSession ? `radial-gradient(ellipse at center, ${activeSession.lightColor}05 0%, transparent 70%)` : 'transparent'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-8 pb-4">
          <div className="max-w-md mx-auto px-6 text-center">
            <h1 className="text-4xl font-light text-white mb-2 tracking-tight">
              Breath
            </h1>
            <p className="text-slate-400 text-sm font-light tracking-wide">
              MINDFUL BREATHING
            </p>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center pb-20 px-4">
          {activeSession && (isPlaying || sessionComplete) ? (
            /* Active Session View - iOS Style */
            <div className="w-full max-w-md">
              {/* Breathing Circle */}
              <div className="relative mb-12">
                {/* Ripple Effects */}
                {ripples.map((ripple) => (
                  <div
                    key={ripple.id}
                    className="absolute inset-0 rounded-full border-2 transition-all duration-300 ease-out"
                    style={{
                      transform: `scale(${ripple.size})`,
                      opacity: ripple.opacity,
                      borderColor: activeSession.lightColor,
                      top: '50%',
                      left: '50%',
                      width: '100px',
                      height: '100px',
                      marginTop: '-50px',
                      marginLeft: '-50px'
                    }}
                  />
                ))}

                {/* Main Breathing Circle */}
                <div 
                  className="mx-auto rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-1000 ease-in-out"
                  style={{
                    transform: `scale(${breathScale}) rotate(${(pulse - 1) * 2}deg)`,
                    width: '280px',
                    height: '280px',
                    background: activeSession.gradient ? 
                      `radial-gradient(circle at 30% 30%, ${activeSession.lightColor}15, transparent 50%), ${activeSession.gradient}20` : 
                      'radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.1), transparent 50%)'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div 
                        className="text-5xl font-light text-white mb-4 transition-all duration-500"
                        style={{ opacity: breathScale }}
                      >
                        {sessionComplete ? '🎉' : getPhaseInstruction()}
                      </div>
                      {!sessionComplete && (
                        <div 
                          className="text-3xl font-light text-white/80 transition-all duration-300"
                          style={{ opacity: timeLeft > 0 ? 1 : 0 }}
                        >
                          {timeLeft}s
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Floating particles around circle */}
                <div className="absolute inset-0">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
                    <div
                      key={index}
                      className="absolute rounded-full animate-float transition-all duration-1000"
                      style={{
                        width: '4px',
                        height: '4px',
                        background: activeSession.lightColor,
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${angle}deg) translateX(160px)`,
                        animationDelay: `${index * 0.5}s`,
                        opacity: isPlaying ? 0.6 : 0
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Session Info */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-white mb-2">
                  {activeSession.name}
                </h2>
                <p className="text-slate-400 text-sm font-light">
                  {sessionComplete ? 'Session Complete' : activeSession.description}
                </p>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>{formatTime(sessionTime)}</span>
                  <span>{formatTime(activeSession.duration)}</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${getProgress()}%`,
                      background: activeSession.gradient
                    }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-8">
                {sessionComplete ? (
                  <button
                    onClick={resetSession}
                    className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/10"
                  >
                    Start Again
                  </button>
                ) : (
                  <>
                    <button
                      onClick={stopSession}
                      className="p-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/10"
                    >
                      <X className="h-6 w-6" />
                    </button>
                    
                    <button
                      onClick={togglePlayPause}
                      className="p-4 bg-white/20 backdrop-blur-xl text-white rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/20 transform hover:scale-105"
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8" />
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* Sessions Grid - iOS Style */
            <div className="w-full max-w-2xl">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => startSession(session)}
                    className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-left transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105 active:scale-95"
                  >
                    {/* Background Glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${session.lightColor}20, transparent 70%)`
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div 
                        className={`p-3 rounded-2xl bg-gradient-to-r ${session.color} w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {session.icon}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {session.name}
                      </h3>
                      <p className="text-slate-400 text-sm mb-3">
                        {session.description}
                      </p>
                      
                      <div className="flex items-center text-slate-500 text-xs">
                        <span>{formatTime(session.duration)}</span>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-all duration-500" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Credits */}
        <footer className="relative z-10 pb-8">
          <div className="max-w-md mx-auto px-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-slate-500 text-sm">
              <Heart className="h-4 w-4" />
              <span>Designed by</span>
              <span className="text-slate-400">Fluxon</span>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
