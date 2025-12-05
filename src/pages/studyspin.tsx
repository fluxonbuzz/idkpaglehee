import { useState, useEffect, useRef } from 'react';
import { 
  Home, User, PlusCircle, Target, TrendingUp, Settings, 
  X, ChevronLeft, Play, Pause, RotateCcw, CheckCircle, 
  Clock, Zap, Award, Brain, BookOpen, BarChart3, Edit2, 
  Trash2, Sparkles, Volume2, VolumeX, Share2, Moon, Sun,
  Download, Upload, Bell, HelpCircle, LogOut, Palette,
  BrainCircuit, Atom, HeartPulse, Syringe, Calculator,
  Star, Trophy, Target as TargetIcon, Coffee, Timer
} from 'lucide-react';

// 🎯 StudySpin - NEET Preparation App
// Designed by Fluxon

// Types
interface WheelItem {
  id: string;
  label: string;
  color: string;
  emoji: string;
  weight: number;
  subtopics?: string[];
}

interface Wheel {
  id: string;
  name: string;
  items: WheelItem[];
  createdAt: Date;
  lastSpun: Date | null;
  spinDuration: number;
  soundEnabled: boolean;
  confettiEnabled: boolean;
}

interface StudySession {
  id: string;
  topic: string;
  startTime: Date;
  duration: number;
  completed: boolean;
  notes: string;
  checklist: string[];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt: Date | null;
}

// Logo Component
const StudySpinLogo = ({ size = 32 }: { size?: number }) => (
  <div className="relative">
    <div className="relative w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl rotate-12 flex items-center justify-center">
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-500 blur-xl opacity-30 rounded-full"></div>
      <Brain size={size * 0.6} className="text-white" />
    </div>
    <div className="absolute -right-1 -bottom-1 w-4 h-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full border-2 border-gray-900"></div>
  </div>
);

// Confetti Component
const Confetti = ({ active }: { active: boolean }) => {
  if (!active) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            background: `hsl(${Math.random() * 360}, 100%, 60%)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            top: '-10px',
          }}
        />
      ))}
    </div>
  );
};

// Wheel Component
const WheelComponent = ({ 
  items, 
  spinning, 
  resultIndex,
  onSpinComplete 
}: { 
  items: WheelItem[];
  spinning: boolean;
  resultIndex: number | null;
  onSpinComplete: (index: number) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const spinRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Calculate total weight
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

    // Draw wheel
    let startAngle = 0;
    items.forEach((item, index) => {
      const sliceAngle = (item.weight / totalWeight) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      // Draw border
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Inter';
      ctx.fillText(item.emoji, radius - 20, 5);
      
      ctx.font = '12px Inter';
      ctx.fillText(item.label.substring(0, 10), radius - 40, 20);
      ctx.restore();

      startAngle = endAngle;
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#4f46e5';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX, 10);
    ctx.lineTo(centerX - 15, 50);
    ctx.lineTo(centerX + 15, 50);
    ctx.closePath();
    ctx.fillStyle = '#ec4899';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [items]);

  const spin = () => {
    if (spinning || items.length === 0) return;
    
    const spinDuration = 3000; // 3 seconds
    const spins = 5 + Math.random() * 3; // 5-8 full rotations
    const totalRotation = spins * 360 + (resultIndex || 0) * (360 / items.length);
    
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const easeOut = 1 - Math.pow(1 - progress / spinDuration, 3);
      
      setRotation(easeOut * totalRotation);
      
      if (progress < spinDuration) {
        spinRef.current = requestAnimationFrame(animate);
      } else {
        setRotation(totalRotation % 360);
        if (resultIndex !== null) {
          setTimeout(() => onSpinComplete(resultIndex), 500);
        }
      }
    };
    
    spinRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (spinning) {
      spin();
    }
    return () => {
      if (spinRef.current) {
        cancelAnimationFrame(spinRef.current);
      }
    };
  }, [spinning]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="w-full max-w-md h-auto transition-transform duration-1000 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
};

// Main App Component
export default function StudySpinApp() {
  const [activeScreen, setActiveScreen] = useState<'home' | 'create' | 'spin' | 'study' | 'progress' | 'settings'>('home');
  const [currentWheel, setCurrentWheel] = useState<Wheel | null>(null);
  const [wheels, setWheels] = useState<Wheel[]>([
    {
      id: '1',
      name: 'NEET Physics Topics',
      items: [
        { id: '1', label: 'Mechanics', color: '#8b5cf6', emoji: '⚙️', weight: 30 },
        { id: '2', label: 'Thermodynamics', color: '#3b82f6', emoji: '🌡️', weight: 25 },
        { id: '3', label: 'Optics', color: '#06b6d4', emoji: '🔬', weight: 20 },
        { id: '4', label: 'Electromagnetism', color: '#10b981', emoji: '🧲', weight: 25 },
      ],
      createdAt: new Date(),
      lastSpun: null,
      spinDuration: 3,
      soundEnabled: true,
      confettiEnabled: true,
    },
    {
      id: '2',
      name: 'Chemistry Chapters',
      items: [
        { id: '1', label: 'Organic', color: '#f59e0b', emoji: '🧪', weight: 35 },
        { id: '2', label: 'Physical', color: '#ef4444', emoji: '⚛️', weight: 30 },
        { id: '3', label: 'Inorganic', color: '#84cc16', emoji: '🔬', weight: 35 },
      ],
      createdAt: new Date(),
      lastSpun: null,
      spinDuration: 3,
      soundEnabled: true,
      confettiEnabled: true,
    },
  ]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [studyTimer, setStudyTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  const [darkMode, setDarkMode] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(3);
  const [totalStudyTime, setTotalStudyTime] = useState(12560); // in minutes

  // Pomodoro timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && studyTimer > 0) {
      interval = setInterval(() => {
        setStudyTimer((prev) => prev - 1);
      }, 1000);
    } else if (studyTimer === 0) {
      setIsTimerRunning(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, studyTimer]);

  const handleSpin = () => {
    if (!currentWheel || currentWheel.items.length === 0 || isSpinning) return;
    
    setIsSpinning(true);
    setSpinResult(null);
    setShowResult(false);
    
    // Calculate weighted random result
    const totalWeight = currentWheel.items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    let selectedIndex = 0;
    for (let i = 0; i < currentWheel.items.length; i++) {
      random -= currentWheel.items[i].weight;
      if (random <= 0) {
        selectedIndex = i;
        break;
      }
    }
    
    setTimeout(() => {
      setSpinResult(selectedIndex);
      setIsSpinning(false);
      setShowResult(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 3500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startStudySession = (duration: number) => {
    setStudyTimer(duration * 60);
    setIsTimerRunning(true);
    setActiveScreen('study');
  };

  // Home Screen
  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <Confetti active={showConfetti} />
      
      {/* Top Bar */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <StudySpinLogo size={40} />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                StudySpin
              </h1>
              <p className="text-sm text-gray-400">NEET Preparation</p>
            </div>
          </div>
          <button className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition">
            <User size={24} />
          </button>
        </div>

        {/* Continue Studying Card */}
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 mb-8 border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Play size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold">Continue Studying</h3>
                <p className="text-sm text-gray-300">Organic Chemistry - Isomerism</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">18:42</div>
              <div className="text-xs text-gray-400">remaining</div>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95">
            Resume Timer
          </button>
        </div>

        {/* Streak & Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-2xl p-4 text-center border border-gray-700/50">
            <div className="text-2xl font-bold text-yellow-400">{streak} 🔥</div>
            <div className="text-xs text-gray-400">Day Streak</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4 text-center border border-gray-700/50">
            <div className="text-2xl font-bold text-blue-400">
              {Math.floor(totalStudyTime / 60)}h
            </div>
            <div className="text-xs text-gray-400">Total Study</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4 text-center border border-gray-700/50">
            <div className="text-2xl font-bold text-green-400">4</div>
            <div className="text-xs text-gray-400">Wheels</div>
          </div>
        </div>

        {/* Your Wheels Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target size={20} className="text-purple-400" />
              Your Wheels
            </h2>
            <button 
              onClick={() => setActiveScreen('create')}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-sm font-medium transition-all active:scale-95"
            >
              <PlusCircle size={16} className="inline mr-2" />
              Create New
            </button>
          </div>
          
          <div className="space-y-3">
            {wheels.map((wheel) => (
              <div 
                key={wheel.id} 
                className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/30 hover:border-purple-500/30 transition cursor-pointer"
                onClick={() => {
                  setCurrentWheel(wheel);
                  setActiveScreen('spin');
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                      <Brain size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">{wheel.name}</h3>
                      <p className="text-sm text-gray-400">
                        {wheel.items.length} topics • {wheel.lastSpun ? 'Spun today' : 'Never spun'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-blue-600/30 transition">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-red-600/30 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl p-4 border border-blue-500/20 hover:border-blue-500/40 transition">
            <div className="flex items-center gap-3">
              <TargetIcon size={20} className="text-blue-400" />
              <div className="text-left">
                <div className="font-bold">Daily Routine</div>
                <div className="text-sm text-gray-400">Today's plan</div>
              </div>
            </div>
          </button>
          <button 
            onClick={() => setActiveScreen('progress')}
            className="bg-gradient-to-r from-pink-900/30 to-rose-900/30 rounded-2xl p-4 border border-pink-500/20 hover:border-pink-500/40 transition"
          >
            <div className="flex items-center gap-3">
              <TrendingUp size={20} className="text-pink-400" />
              <div className="text-left">
                <div className="font-bold">Stats</div>
                <div className="text-sm text-gray-400">View progress</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  // Create Wheel Screen
  const CreateWheelScreen = () => {
    const [wheelName, setWheelName] = useState('');
    const [items, setItems] = useState<WheelItem[]>([
      { id: '1', label: 'Topic 1', color: '#8b5cf6', emoji: '📚', weight: 25 },
      { id: '2', label: 'Topic 2', color: '#3b82f6', emoji: '📖', weight: 25 },
      { id: '3', label: 'Topic 3', color: '#06b6d4', emoji: '🔬', weight: 25 },
      { id: '4', label: 'Topic 4', color: '#10b981', emoji: '🧪', weight: 25 },
    ]);

    const addItem = () => {
      const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
      const emojis = ['📚', '📖', '🔬', '🧪', '🧮', '🔭', '🧲', '⚛️'];
      
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          label: `Topic ${items.length + 1}`,
          color: colors[items.length % colors.length],
          emoji: emojis[items.length % emojis.length],
          weight: 25,
        },
      ]);
    };

    const updateItem = (id: string, field: keyof WheelItem, value: any) => {
      setItems(items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ));
    };

    const removeItem = (id: string) => {
      setItems(items.filter(item => item.id !== id));
    };

    const saveWheel = () => {
      const newWheel: Wheel = {
        id: Date.now().toString(),
        name: wheelName || 'New Study Wheel',
        items,
        createdAt: new Date(),
        lastSpun: null,
        spinDuration: 3,
        soundEnabled: true,
        confettiEnabled: true,
      };
      
      setWheels([...wheels, newWheel]);
      setCurrentWheel(newWheel);
      setActiveScreen('spin');
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-6">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setActiveScreen('home')}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Create Wheel</h1>
          <div className="w-10"></div>
        </div>

        {/* Wheel Preview */}
        <div className="mb-8">
          <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/30">
            <WheelComponent 
              items={items}
              spinning={false}
              resultIndex={null}
              onSpinComplete={() => {}}
            />
          </div>
        </div>

        {/* Wheel Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Wheel Name
          </label>
          <input
            type="text"
            value={wheelName}
            onChange={(e) => setWheelName(e.target.value)}
            placeholder="e.g., NEET Physics Topics"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Items List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Wheel Items ({items.length})
            </label>
            <button
              onClick={addItem}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-sm font-medium transition-all active:scale-95"
            >
              + Add Item
            </button>
          </div>
          
          <div className="space-y-3">
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl cursor-move"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.emoji}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateItem(item.id, 'label', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Weight:</span>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={item.weight}
                          onChange={(e) => updateItem(item.id, 'weight', parseInt(e.target.value))}
                          className="w-32"
                        />
                        <span className="text-sm font-medium">{item.weight}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 rounded-lg bg-gray-700/50 hover:bg-red-600/30 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-300 mb-4">Advanced Options</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 size={20} className="text-gray-400" />
                <span>Sound Effects</span>
              </div>
              <div className="w-12 h-6 bg-gray-700 rounded-full relative">
                <div className="w-6 h-6 bg-purple-500 rounded-full absolute top-0 left-0"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles size={20} className="text-gray-400" />
                <span>Confetti Animation</span>
              </div>
              <div className="w-12 h-6 bg-gray-700 rounded-full relative">
                <div className="w-6 h-6 bg-purple-500 rounded-full absolute top-0 left-0"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={saveWheel}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-2xl text-lg transition-all active:scale-95 shadow-lg shadow-purple-500/25"
        >
          SAVE WHEEL
        </button>
      </div>
    );
  };

  // Spin Screen
  const SpinScreen = () => {
    if (!currentWheel) return null;

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-6">
        <Confetti active={showConfetti} />
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setActiveScreen('home')}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold">{currentWheel.name}</h1>
            <p className="text-sm text-gray-400">Tap spin to decide what to study</p>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Wheel */}
        <div className="mb-8">
          <div className="relative">
            <WheelComponent 
              items={currentWheel.items}
              spinning={isSpinning}
              resultIndex={spinResult}
              onSpinComplete={(index) => {
                // Handle spin completion
              }}
            />
          </div>
        </div>

        {/* Spin Button */}
        <div className="mb-8">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`w-full py-4 rounded-2xl text-lg font-bold transition-all ${
              isSpinning 
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:scale-95'
            }`}
          >
            {isSpinning ? 'Spinning...' : 'SPIN WHEEL'}
          </button>
        </div>

        {/* Result Popup */}
        {showResult && spinResult !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowResult(false)}></div>
            <div className="relative bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 max-w-sm w-full border border-purple-500/30">
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                  style={{ backgroundColor: currentWheel.items[spinResult].color }}
                >
                  {currentWheel.items[spinResult].emoji}
                </div>
                <h3 className="text-2xl font-bold mb-2">{currentWheel.items[spinResult].label}</h3>
                <p className="text-gray-300 mb-6">Selected for your study session!</p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      startStudySession(25);
                      setShowResult(false);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
                  >
                    Start 25 min Pomodoro
                  </button>
                  <button
                    onClick={() => {
                      startStudySession(45);
                      setShowResult(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
                  >
                    Start 45 min Deep Focus
                  </button>
                  <button
                    onClick={() => setShowResult(false)}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
                  >
                    Custom Duration
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
            <div className="flex items-center gap-3">
              <Zap size={20} className="text-yellow-400" />
              <div>
                <div className="font-medium">Auto-Select Study Mode</div>
                <div className="text-sm text-gray-400">Start timer immediately</div>
              </div>
            </div>
            <div className="w-12 h-6 bg-gray-700 rounded-full relative">
              <div className="w-6 h-6 bg-purple-500 rounded-full absolute top-0 left-0"></div>
            </div>
          </div>
          
          <button className="w-full p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-purple-500/30 transition flex items-center justify-center gap-3">
            <Brain size={20} className="text-purple-400" />
            <span>Explain Topic with AI</span>
          </button>
        </div>
      </div>
    );
  };

  // Study Mode Screen
  const StudyModeScreen = () => {
    const [checklist, setChecklist] = useState([
      { id: '1', text: 'Understand basic concepts', completed: true },
      { id: '2', text: 'Solve 10 practice questions', completed: true },
      { id: '3', text: 'Review important formulas', completed: false },
      { id: '4', text: 'Take mini quiz', completed: false },
    ]);

    const toggleChecklist = (id: string) => {
      setChecklist(checklist.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ));
    };

    const progress = (checklist.filter(item => item.completed).length / checklist.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-6">
        {/* Timer Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-48 h-48 rounded-full border-8 border-purple-500/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{formatTime(studyTimer)}</div>
                <div className="text-sm text-gray-400">
                  {timerMode === 'pomodoro' ? 'Focus Time' : 
                   timerMode === 'shortBreak' ? 'Short Break' : 'Long Break'}
                </div>
              </div>
            </div>
            <div 
              className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-purple-500 border-r-pink-500"
              style={{ transform: `rotate(${((25*60 - studyTimer) / (25*60)) * 360}deg)` }}
            ></div>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold transition-all active:scale-95"
            >
              {isTimerRunning ? (
                <>
                  <Pause size={20} className="inline mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play size={20} className="inline mr-2" />
                  Resume
                </>
              )}
            </button>
            <button
              onClick={() => setStudyTimer(25 * 60)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition-all active:scale-95"
            >
              <RotateCcw size={20} className="inline mr-2" />
              Reset
            </button>
          </div>
        </div>

        {/* Topic Info */}
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 mb-8 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-2xl">
              🧪
            </div>
            <div>
              <h3 className="font-bold text-lg">Organic Chemistry</h3>
              <p className="text-gray-300">Isomerism & Reaction Mechanisms</p>
            </div>
          </div>
          <div className="text-sm text-gray-300 space-y-2">
            <p>• Isomers: Structural, Stereoisomers, Optical isomers</p>
            <p>• Reaction mechanisms: SN1, SN2, E1, E2</p>
            <p>• Named reactions: Wurtz, Friedel-Crafts, etc.</p>
          </div>
        </div>

        {/* Checklist */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Study Checklist</h3>
            <div className="text-sm text-gray-400">
              {Math.round(progress)}% complete
            </div>
          </div>
          
          <div className="space-y-3">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  item.completed 
                    ? 'bg-green-900/20 border-green-700/30' 
                    : 'bg-gray-800/30 border-gray-700/30 hover:border-purple-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    item.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {item.completed && <CheckCircle size={16} />}
                  </div>
                  <span className={item.completed ? 'line-through text-gray-400' : ''}>
                    {item.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full p-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-bold transition-all active:scale-95">
            <Brain size={20} className="inline mr-2" />
            Ask AI for Doubt Solving
          </button>
          
          <button 
            onClick={() => {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 2000);
            }}
            className="w-full p-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-bold transition-all active:scale-95"
          >
            <Trophy size={20} className="inline mr-2" />
            Mark Session Complete
          </button>
        </div>
      </div>
    );
  };

  // Progress & Analytics Screen
  const ProgressScreen = () => {
    const studyData = [
      { day: 'Mon', hours: 3 },
      { day: 'Tue', hours: 4 },
      { day: 'Wed', hours: 2.5 },
      { day: 'Thu', hours: 5 },
      { day: 'Fri', hours: 3.5 },
      { day: 'Sat', hours: 4.5 },
      { day: 'Sun', hours: 3 },
    ];

    const subjectData = [
      { subject: 'Physics', percentage: 65, color: '#8b5cf6' },
      { subject: 'Chemistry', percentage: 80, color: '#3b82f6' },
      { subject: 'Biology', percentage: 75, color: '#10b981' },
      { subject: 'GK & Others', percentage: 45, color: '#f59e0b' },
    ];

    const badges: Badge[] = [
      { id: '1', name: '3-Day Streak', description: 'Study for 3 consecutive days', icon: '🔥', unlocked: true, unlockedAt: new Date('2024-01-15') },
      { id: '2', name: 'Master Spinner', description: 'Spin wheel 50 times', icon: '🎡', unlocked: true, unlockedAt: new Date('2024-01-18') },
      { id: '3', name: 'Pomodoro Pro', description: 'Complete 10 pomodoros', icon: '⏰', unlocked: false, unlockedAt: null },
      { id: '4', name: 'Night Owl', description: 'Study past midnight', icon: '🦉', unlocked: false, unlockedAt: null },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-6">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setActiveScreen('home')}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Progress & Analytics</h1>
          <div className="w-10"></div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-500/10 rounded-2xl p-4 border border-purple-500/20">
            <div className="text-2xl font-bold">{Math.floor(totalStudyTime / 60)}h</div>
            <div className="text-sm text-gray-400">Total Study</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-500/10 rounded-2xl p-4 border border-blue-500/20">
            <div className="text-2xl font-bold">{streak} 🔥</div>
            <div className="text-sm text-gray-400">Current Streak</div>
          </div>
          <div className="bg-gradient-to-br from-pink-900/30 to-pink-500/10 rounded-2xl p-4 border border-pink-500/20">
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-gray-400">Pomodoros</div>
          </div>
          <div className="bg-gradient-to-br from-green-900/30 to-green-500/10 rounded-2xl p-4 border border-green-500/20">
            <div className="text-2xl font-bold">{wheels.length}</div>
            <div className="text-sm text-gray-400">Active Wheels</div>
          </div>
        </div>

        {/* Weekly Study Graph */}
        <div className="bg-gray-800/30 rounded-2xl p-6 mb-8 border border-gray-700/30">
          <h3 className="font-bold mb-4">Weekly Study Hours</h3>
          <div className="flex items-end h-40 gap-2">
            {studyData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${(item.hours / 6) * 100}%` }}
                />
                <div className="text-xs text-gray-400 mt-2">{item.day}</div>
                <div className="text-xs font-medium">{item.hours}h</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Progress */}
        <div className="bg-gray-800/30 rounded-2xl p-6 mb-8 border border-gray-700/30">
          <h3 className="font-bold mb-4">Subject Progress</h3>
          <div className="space-y-4">
            {subjectData.map((subject) => (
              <div key={subject.subject}>
                <div className="flex justify-between text-sm mb-2">
                  <span>{subject.subject}</span>
                  <span>{subject.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${subject.percentage}%`,
                      background: `linear-gradient(to right, ${subject.color}, ${subject.color}88)`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 mb-8 border border-purple-500/20">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Brain size={20} className="text-purple-400" />
            AI Insights
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <div className="text-sm text-gray-300">🎯 <strong>Focus Area:</strong> Increase Physics problem practice</div>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <div className="text-sm text-gray-300">📊 <strong>Pattern:</strong> You study most effectively between 8-11 PM</div>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <div className="text-sm text-gray-300">⚡ <strong>Tip:</strong> Try spaced repetition for Organic Chemistry</div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/30">
          <h3 className="font-bold mb-4">Badges & Achievements</h3>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id}
                className={`p-4 rounded-xl text-center ${
                  badge.unlocked 
                    ? 'bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border border-yellow-500/30' 
                    : 'bg-gray-800/50 border border-gray-700/30 opacity-50'
                }`}
              >
                <div className="text-2xl mb-2">{badge.icon}</div>
                <div className="font-medium text-sm mb-1">{badge.name}</div>
                <div className="text-xs text-gray-400">{badge.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Settings Screen
  const SettingsScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-6">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => setActiveScreen('home')}
          className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
        <div className="w-10"></div>
      </div>

      {/* Profile Section */}
      <div className="bg-gray-800/30 rounded-2xl p-6 mb-8 border border-gray-700/30">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-2xl">
            👨‍⚕️
          </div>
          <div>
            <h3 className="font-bold text-lg">NEET Aspirant</h3>
            <p className="text-gray-400">Target: 600+ in NEET 2024</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-800/50 rounded-xl">
            <div className="text-lg font-bold">Day 87</div>
            <div className="text-xs text-gray-400">Study Days</div>
          </div>
          <div className="text-center p-3 bg-gray-800/50 rounded-xl">
            <div className="text-lg font-bold">94%</div>
            <div className="text-xs text-gray-400">Completion</div>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-2">
        <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:bg-gray-700/30 transition cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-gray-400" />
              <span>Notifications</span>
            </div>
            <ChevronLeft size={20} className="text-gray-400 rotate-180" />
          </div>
        </div>
        
        <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:bg-gray-700/30 transition cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon size={20} className="text-gray-400" /> : <Sun size={20} className="text-gray-400" />}
              <span>Dark Mode</span>
            </div>
            <div 
              onClick={() => setDarkMode(!darkMode)}
              className="w-12 h-6 bg-gray-700 rounded-full relative cursor-pointer"
            >
              <div className={`w-6 h-6 bg-purple-500 rounded-full absolute top-0 transition-all ${
                darkMode ? 'left-6' : 'left-0'
              }`}></div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:bg-gray-700/30 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <Palette size={20} className="text-gray-400" />
            <span>App Theme</span>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:bg-gray-700/30 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <Volume2 size={20} className="text-gray-400" />
            <span>Sounds & Haptics</span>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:bg-gray-700/30 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <Share2 size={20} className="text-gray-400" />
            <span>Share App</span>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:bg-gray-700/30 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <HelpCircle size={20} className="text-gray-400" />
            <span>Help & Support</span>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button className="w-full mt-8 p-4 bg-gradient-to-r from-red-900/30 to-rose-900/30 rounded-xl border border-red-700/30 hover:border-red-500/30 transition flex items-center justify-center gap-3">
        <LogOut size={20} className="text-red-400" />
        <span className="text-red-400 font-medium">Logout</span>
      </button>

      {/* Footer */}
      <div className="text-center mt-8 pt-8 border-t border-gray-800">
        <p className="text-sm text-gray-400">
          StudySpin v1.0 • Designed by <span className="text-purple-400">Fluxon</span>
        </p>
        <p className="text-xs text-gray-500 mt-2">NEET Preparation Assistant</p>
      </div>
    </div>
  );

  // Bottom Navigation
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-lg border-t border-gray-700/50 z-40">
      <div className="flex justify-around items-center p-3">
        {[
          { id: 'home', icon: Home, label: 'Home', screen: 'home' },
          { id: 'spin', icon: Target, label: 'Spin', screen: 'spin' },
          { id: 'study', icon: Clock, label: 'Study', screen: 'study' },
          { id: 'progress', icon: TrendingUp, label: 'Stats', screen: 'progress' },
          { id: 'settings', icon: Settings, label: 'Settings', screen: 'settings' },
        ].map(({ id, icon: Icon, label, screen }) => (
          <button
            key={id}
            onClick={() => setActiveScreen(screen as any)}
            className={`flex flex-col items-center p-2 rounded-2xl transition-all flex-1 mx-1 ${
              activeScreen === screen 
                ? 'text-purple-400 bg-purple-600/20' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Render active screen
  const renderScreen = () => {
    switch (activeScreen) {
      case 'create': return <CreateWheelScreen />;
      case 'spin': return <SpinScreen />;
      case 'study': return <StudyModeScreen />;
      case 'progress': return <ProgressScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white pb-16">
      {renderScreen()}
      {activeScreen !== 'create' && <BottomNav />}
      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        .animate-confetti {
          animation: confetti 3s linear forwards;
        }
        .glow {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }
      `}</style>
    </div>
  );
}
