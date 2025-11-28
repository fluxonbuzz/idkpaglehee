import { useEffect, useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Moon,
  Clock,
  Settings,
  X,
  Heart,
  Zap,
  Feather,
  Waves,
  Leaf,
  Sparkles,
  Target,
  RotateCcw
} from 'lucide-react';

interface BreathingSession {
  id: string;
  name: string;
  duration: number;
  description: string;
  pattern: number[];
  color: string;
  icon: JSX.Element;
}

export default function BreathingApp() {
  const [sessions, setSessions] = useState<BreathingSession[]>([]);
  const [activeSession, setActiveSession] = useState<BreathingSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const breathingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize breathing sessions
  useEffect(() => {
    const initialSessions: BreathingSession[] = [
      {
        id: '1',
        name: 'Calm Focus',
        duration: 300,
        description: 'Perfect for stress relief and mental clarity',
        pattern: [4, 4, 4, 4],
        color: 'from-blue-500 to-teal-400',
        icon: <Feather className="h-6 w-6" />
      },
      {
        id: '2',
        name: 'Energy Boost',
        duration: 180,
        description: 'Quick energizing session for midday slumps',
        pattern: [4, 0, 4, 0],
        color: 'from-orange-500 to-yellow-400',
        icon: <Zap className="h-6 w-6" />
      },
      {
        id: '3',
        name: 'Deep Relaxation',
        duration: 420,
        description: 'Extended session for deep relaxation',
        pattern: [4, 7, 8, 0],
        color: 'from-purple-500 to-pink-400',
        icon: <Waves className="h-6 w-6" />
      },
      {
        id: '4',
        name: 'Sleep Prep',
        duration: 600,
        description: 'Wind down before sleep with this gentle pattern',
        pattern: [4, 4, 6, 2],
        color: 'from-indigo-500 to-blue-400',
        icon: <Moon className="h-6 w-6" />
      },
      {
        id: '5',
        name: 'Mindful Moment',
        duration: 120,
        description: 'Quick mindfulness break anytime, anywhere',
        pattern: [3, 3, 3, 3],
        color: 'from-green-500 to-emerald-400',
        icon: <Leaf className="h-6 w-6" />
      },
      {
        id: '6',
        name: 'Box Breathing',
        duration: 240,
        description: 'Classic technique used by professionals',
        pattern: [4, 4, 4, 4],
        color: 'from-cyan-500 to-blue-400',
        icon: <Target className="h-6 w-6" />
      }
    ];
    setSessions(initialSessions);
  }, []);

  // Animated background
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

    const colors = ['#0ea5e9', '#06b6d4', '#8b5cf6', '#6366f1', '#10b981'];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.2 + 0.05
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (100 - distance) / 100 * 0.1;
            ctx.lineWidth = 0.2;
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

  // Clean up timers
  useEffect(() => {
    return () => {
      if (breathingTimerRef.current) {
        clearInterval(breathingTimerRef.current);
      }
    };
  }, []);

  const startSession = (session: BreathingSession) => {
    setActiveSession(session);
    setIsPlaying(true);
    setSessionComplete(false);
    setCurrentPhase(0);
    setTimeLeft(session.pattern[0]);
    setSessionTime(0);

    // Clear any existing timer
    if (breathingTimerRef.current) {
      clearInterval(breathingTimerRef.current);
    }

    // Start breathing timer
    breathingTimerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = prevTime - 1;
        
        if (newTime <= 0) {
          // Move to next phase
          setCurrentPhase(prevPhase => {
            const nextPhase = (prevPhase + 1) % session.pattern.length;
            const nextTime = session.pattern[nextPhase];
            setTimeLeft(nextTime);
            return nextPhase;
          });
        }
        
        return newTime;
      });

      // Update session time
      setSessionTime(prev => {
        const newTime = prev + 1;
        if (newTime >= session.duration) {
          completeSession();
          return session.duration;
        }
        return newTime;
      });
    }, 1000);
  };

  const completeSession = () => {
    stopSession();
    setSessionComplete(true);
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
    
    if (isPlaying) {
      // Pause
      if (breathingTimerRef.current) {
        clearInterval(breathingTimerRef.current);
        breathingTimerRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Resume - restart the timer
      if (activeSession) {
        breathingTimerRef.current = setInterval(() => {
          setTimeLeft(prevTime => {
            const newTime = prevTime - 1;
            
            if (newTime <= 0) {
              setCurrentPhase(prevPhase => {
                const nextPhase = (prevPhase + 1) % activeSession.pattern.length;
                const nextTime = activeSession.pattern[nextPhase];
                setTimeLeft(nextTime);
                return nextPhase;
              });
            }
            
            return newTime;
          });

          setSessionTime(prev => {
            const newTime = prev + 1;
            if (newTime >= activeSession.duration) {
              completeSession();
              return activeSession.duration;
            }
            return newTime;
          });
        }, 1000);
        setIsPlaying(true);
      }
    }
  };

  const resetSession = () => {
    stopSession();
    setSessionComplete(false);
    if (activeSession) {
      startSession(activeSession);
    }
  };

  const skipSession = () => {
    completeSession();
  };

  const getPhaseInstruction = () => {
    if (!activeSession) return '';
    const phases = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'];
    return phases[currentPhase];
  };

  const getCircleSize = () => {
    if (!activeSession) return 30;
    const pattern = activeSession.pattern;
    const currentPhaseTime = pattern[currentPhase];
    const baseSize = 30;
    const maxSize = 80;
    
    if (currentPhase === 0) { // Breathe In - expand
      return baseSize + (maxSize - baseSize) * (1 - timeLeft / currentPhaseTime);
    } else if (currentPhase === 2) { // Breathe Out - contract
      return baseSize + (maxSize - baseSize) * (timeLeft / currentPhaseTime);
    } else { // Hold phases - maintain size
      return currentPhase === 1 ? maxSize : baseSize;
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-xl border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-2xl border border-cyan-400/30">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                    BREATH FLOW
                  </h1>
                  <p className="text-slate-300 text-sm mt-1">Mindful Breathing Sessions</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 pb-20">
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Active Session View */}
            {activeSession && (isPlaying || sessionComplete) ? (
              <div className="bg-slate-800/20 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-8 shadow-2xl mb-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">{activeSession.name}</h2>
                  <p className="text-slate-300 mb-8">{activeSession.description}</p>
                  
                  {/* Session Timer */}
                  <div className="flex justify-center mb-8">
                    <div className="bg-slate-700/50 rounded-2xl px-6 py-3 border border-slate-600/30">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-cyan-400" />
                        <span className="text-2xl font-mono font-bold text-white">
                          {formatTime(sessionTime)}
                        </span>
                        <span className="text-slate-400 text-sm">
                          / {formatTime(activeSession.duration)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Breathing Animation */}
                  <div className="flex justify-center items-center mb-8">
                    <div className="relative">
                      <div 
                        className="rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/30 transition-all duration-1000 ease-in-out"
                        style={{
                          width: `${getCircleSize()}vw`,
                          height: `${getCircleSize()}vw`,
                          maxWidth: '400px',
                          maxHeight: '400px'
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-4xl font-bold text-white block mb-2">
                            {sessionComplete ? 'Complete!' : getPhaseInstruction()}
                          </span>
                          {!sessionComplete && (
                            <span className="text-2xl text-cyan-300 font-mono">
                              {timeLeft}s
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="max-w-md mx-auto mb-8">
                    <div className="bg-slate-700/30 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(getProgress(), 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex justify-center space-x-6">
                    {sessionComplete ? (
                      <button
                        onClick={resetSession}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
                      >
                        <RotateCcw className="h-6 w-6 inline mr-2" />
                        Start Again
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={stopSession}
                          className="p-4 bg-red-500/20 text-red-400 rounded-2xl hover:bg-red-500/30 transition-colors"
                          title="Stop Session"
                        >
                          <X className="h-8 w-8" />
                        </button>
                        
                        <button
                          onClick={togglePlayPause}
                          className="p-4 bg-cyan-500/20 text-cyan-400 rounded-2xl hover:bg-cyan-500/30 transition-colors"
                          title={isPlaying ? 'Pause' : 'Resume'}
                        >
                          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                        </button>
                        
                        <button
                          onClick={skipSession}
                          className="p-4 bg-blue-500/20 text-blue-400 rounded-2xl hover:bg-blue-500/30 transition-colors"
                          title="Skip to End"
                        >
                          <SkipForward className="h-8 w-8" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Sessions Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-slate-800/20 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6 transition-all hover:border-slate-600/50 hover:transform hover:scale-105 cursor-pointer group"
                    onClick={() => startSession(session)}
                  >
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${session.color} w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {session.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{session.name}</h3>
                    <p className="text-slate-300 text-sm mb-4">{session.description}</p>
                    
                    <div className="flex items-center justify-between text-slate-400 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTime(session.duration)}
                      </div>
                      <div className="flex items-center space-x-1">
                        {session.pattern.map((time, index) => (
                          <span key={index} className="text-xs bg-slate-700/50 px-2 py-1 rounded">
                            {time}s
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer with Credits */}
        <footer className="relative z-10 bg-slate-900/50 backdrop-blur-xl border-t border-slate-700/30 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-400 mb-4 md:mb-0">
                <Heart className="h-4 w-4 text-cyan-400" />
                <span>Made with mindfulness by</span>
                <span className="text-cyan-300 font-semibold">Fluxon</span>
              </div>
              
              <div className="text-slate-500 text-sm">
                Breathe. Focus. Flow. © 2024 Breath Flow App
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
