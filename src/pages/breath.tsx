import { useEffect, useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Moon, 
  Calendar,
  Clock,
  Target,
  BarChart3,
  Settings,
  X,
  Heart,
  Zap,
  Feather,
  Waves,
  Leaf,
  Sparkles,
  Crown,
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

interface BreathingState {
  phase: number;
  timeLeft: number;
  cycleCount: number;
  totalElapsed: number;
}

export default function BreathingApp() {
  const [sessions, setSessions] = useState<BreathingSession[]>([]);
  const [activeSession, setActiveSession] = useState<BreathingSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathingState, setBreathingState] = useState<BreathingState>({
    phase: 0,
    timeLeft: 0,
    cycleCount: 0,
    totalElapsed: 0
  });
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<{date: string; session: string; duration: number}[]>([]);
  const [activeTab, setActiveTab] = useState<'sessions' | 'planner' | 'stats'>('sessions');
  const [showSettings, setShowSettings] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const breathingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize breathing sessions
  useEffect(() => {
    const initialSessions: BreathingSession[] = [
      {
        id: '1',
        name: 'Calm Focus',
        duration: 300, // 5 minutes
        description: 'Perfect for stress relief and mental clarity',
        pattern: [4, 4, 4, 4], // In, Hold, Out, Hold
        color: 'from-blue-500 to-teal-400',
        icon: <Feather className="h-6 w-6" />
      },
      {
        id: '2',
        name: 'Energy Boost',
        duration: 180, // 3 minutes
        description: 'Quick energizing session for midday slumps',
        pattern: [4, 0, 4, 0], // In, Out (no holds)
        color: 'from-orange-500 to-yellow-400',
        icon: <Zap className="h-6 w-6" />
      },
      {
        id: '3',
        name: 'Deep Relaxation',
        duration: 420, // 7 minutes
        description: 'Extended session for deep relaxation',
        pattern: [4, 7, 8, 0], // In, Hold, Out
        color: 'from-purple-500 to-pink-400',
        icon: <Waves className="h-6 w-6" />
      },
      {
        id: '4',
        name: 'Sleep Prep',
        duration: 600, // 10 minutes
        description: 'Wind down before sleep with this gentle pattern',
        pattern: [4, 4, 6, 2], // In, Hold, Out, Hold
        color: 'from-indigo-500 to-blue-400',
        icon: <Moon className="h-6 w-6" />
      },
      {
        id: '5',
        name: 'Mindful Moment',
        duration: 120, // 2 minutes
        description: 'Quick mindfulness break anytime, anywhere',
        pattern: [3, 3, 3, 3], // In, Hold, Out, Hold
        color: 'from-green-500 to-emerald-400',
        icon: <Leaf className="h-6 w-6" />
      },
      {
        id: '6',
        name: 'Box Breathing',
        duration: 240, // 4 minutes
        description: 'Classic technique used by professionals',
        pattern: [4, 4, 4, 4], // In, Hold, Out, Hold
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

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      stopAllTimers();
    };
  }, []);

  const stopAllTimers = () => {
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
    if (breathingTimerRef.current) {
      clearInterval(breathingTimerRef.current);
      breathingTimerRef.current = null;
    }
  };

  const startSession = (session: BreathingSession) => {
    setActiveSession(session);
    setIsPlaying(true);
    setSessionComplete(false);
    setSessionTime(0);

    // Initialize breathing state
    const initialPhase = 0;
    const initialTimeLeft = session.pattern[initialPhase];
    
    setBreathingState({
      phase: initialPhase,
      timeLeft: initialTimeLeft,
      cycleCount: 0,
      totalElapsed: 0
    });

    // Start session timer (stopwatch)
    stopAllTimers();
    sessionTimerRef.current = setInterval(() => {
      setSessionTime(prev => {
        const newTime = prev + 1;
        
        // Check if session duration is complete
        if (newTime >= session.duration) {
          completeSession();
          return session.duration;
        }
        
        return newTime;
      });
    }, 1000);

    // Start breathing pattern timer
    startBreathingTimer(session);
  };

  const startBreathingTimer = (session: BreathingSession) => {
    if (breathingTimerRef.current) {
      clearInterval(breathingTimerRef.current);
    }

    breathingTimerRef.current = setInterval(() => {
      if (!isPlaying) return;

      setBreathingState(prev => {
        const pattern = session.pattern;
        let { phase, timeLeft, cycleCount, totalElapsed } = prev;

        // Decrement time for current phase
        timeLeft--;

        // If current phase time is up, move to next phase
        if (timeLeft <= 0) {
          phase = (phase + 1) % pattern.length;
          timeLeft = pattern[phase];
          
          // If we completed a full cycle (returned to phase 0)
          if (phase === 0) {
            cycleCount++;
          }
        }

        totalElapsed++;

        return { phase, timeLeft, cycleCount, totalElapsed };
      });
    }, 1000);
  };

  const completeSession = () => {
    stopAllTimers();
    setIsPlaying(false);
    setSessionComplete(true);
    
    // Add to history
    if (activeSession) {
      setSessionHistory(prev => [...prev, {
        date: new Date().toISOString(),
        session: activeSession.name,
        duration: sessionTime
      }]);
    }
  };

  const stopSession = () => {
    stopAllTimers();
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (!activeSession) return;

    if (isPlaying) {
      // Pause
      stopAllTimers();
      setIsPlaying(false);
    } else {
      // Resume
      setIsPlaying(true);
      
      // Restart session timer
      sessionTimerRef.current = setInterval(() => {
        setSessionTime(prev => {
          const newTime = prev + 1;
          
          if (newTime >= activeSession.duration) {
            completeSession();
            return activeSession.duration;
          }
          
          return newTime;
        });
      }, 1000);

      // Restart breathing timer
      startBreathingTimer(activeSession);
    }
  };

  const resetSession = () => {
    stopAllTimers();
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
    return phases[breathingState.phase];
  };

  const getCircleSize = () => {
    if (!activeSession) return 30;
    const pattern = activeSession.pattern;
    const currentPhase = breathingState.phase;
    const phaseTime = pattern[currentPhase];
    const timeLeft = breathingState.timeLeft;
    
    const baseSize = 30;
    const maxSize = 80;
    
    if (currentPhase === 0) { // Breathe In - expand
      return baseSize + (maxSize - baseSize) * (1 - timeLeft / phaseTime);
    } else if (currentPhase === 2) { // Breathe Out - contract
      return baseSize + (maxSize - baseSize) * (timeLeft / phaseTime);
    } else { // Hold phases - maintain size
      return currentPhase === 1 ? maxSize : baseSize; // Hold after inhale = max, Hold after exhale = min
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
                  <p className="text-slate-300 text-sm mt-1">Mindful Breathing & Daily Practice</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowSettings(true)}
                className="p-3 bg-slate-700/50 backdrop-blur-xl border border-slate-600/30 rounded-2xl text-slate-300 hover:text-white hover:border-slate-500/50 transition-all"
              >
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto w-full px-4 py-6">
          <div className="flex space-x-1 bg-slate-800/30 backdrop-blur-xl rounded-2xl p-2 mb-8 border border-slate-700/50">
            <button
              onClick={() => setActiveTab('sessions')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'sessions'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Play className="h-4 w-4 inline mr-2" />
              Breathing Sessions
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'planner'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Daily Planner
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'stats'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BarChart3 className="h-4 w-4 inline mr-2" />
              Progress Stats
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 pb-20">
          {activeTab === 'sessions' && (
            <div className="max-w-6xl mx-auto px-4">
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
                                {breathingState.timeLeft}s
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
          )}

          {/* Rest of the code remains the same for planner and stats tabs */}
          {activeTab === 'planner' && (
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-slate-800/20 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Daily Breathing Planner</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4">Today's Schedule</h3>
                    
                    {['Morning Calm', 'Midday Focus', 'Evening Wind Down'].map((session, index) => (
                      <div key={index} className="bg-slate-700/30 rounded-2xl p-4 border border-slate-600/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-white">{session}</h4>
                            <p className="text-slate-400 text-sm">10:00 AM</p>
                          </div>
                          <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors text-sm">
                            Start
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4">Weekly Goals</h3>
                    
                    <div className="bg-slate-700/30 rounded-2xl p-4 border border-slate-600/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white">Sessions Completed</span>
                        <span className="text-cyan-400 font-bold">3/7</span>
                      </div>
                      <div className="w-full bg-slate-600/30 rounded-full h-2">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '42%' }} />
                      </div>
                    </div>
                    
                    <div className="bg-slate-700/30 rounded-2xl p-4 border border-slate-600/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white">Total Minutes</span>
                        <span className="text-green-400 font-bold">15/30min</span>
                      </div>
                      <div className="w-full bg-slate-600/30 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '50%' }} />
                      </div>
                    </div>
                    
                    <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all">
                      Set New Goals
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-slate-800/20 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Your Breathing Journey</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-700/30 rounded-2xl p-6 text-center border border-slate-600/30">
                    <div className="bg-cyan-500/20 p-3 rounded-xl inline-flex mb-3">
                      <Play className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h3 className="text-cyan-100 font-semibold">Total Sessions</h3>
                    <p className="text-2xl font-bold text-cyan-300 mt-2">{sessionHistory.length}</p>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-2xl p-6 text-center border border-slate-600/30">
                    <div className="bg-blue-500/20 p-3 rounded-xl inline-flex mb-3">
                      <Clock className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-blue-100 font-semibold">Total Time</h3>
                    <p className="text-2xl font-bold text-blue-300 mt-2">
                      {formatTime(sessionHistory.reduce((total, session) => total + session.duration, 0))}
                    </p>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-2xl p-6 text-center border border-slate-600/30">
                    <div className="bg-purple-500/20 p-3 rounded-xl inline-flex mb-3">
                      <Crown className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-purple-100 font-semibold">Favorite</h3>
                    <p className="text-lg font-bold text-purple-300 mt-2">
                      {sessionHistory.length > 0 
                        ? sessionHistory.reduce((a, b) => 
                            sessionHistory.filter(s => s.session === a.session).length > 
                            sessionHistory.filter(s => s.session === b.session).length ? a : b
                          ).session
                        : 'N/A'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Sessions</h3>
                  <div className="space-y-3">
                    {sessionHistory.slice(-5).reverse().map((session, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-slate-600/30 last:border-b-0">
                        <div>
                          <span className="text-white">{session.session}</span>
                          <span className="text-slate-400 text-sm ml-2">
                            {new Date(session.date).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="text-cyan-400">{formatTime(session.duration)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
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

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Breathing Sounds
                </label>
                <select className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option>Ocean Waves</option>
                  <option>Forest Rain</option>
                  <option>Gentle Wind</option>
                  <option>None</option>
                </select>
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Vibration Feedback
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="vibration" className="mr-2 text-cyan-500" defaultChecked />
                    <span className="text-slate-300">On</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="vibration" className="mr-2 text-cyan-500" />
                    <span className="text-slate-300">Off</span>
                  </label>
                </div>
              </div>
              
              <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all mt-6">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
