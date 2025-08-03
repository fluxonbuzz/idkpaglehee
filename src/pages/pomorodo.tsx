import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCw, Settings, X, Check, Bell, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PomodoroTimer() {
  // Load data from localStorage if available
  const loadFromLocalStorage = (key, defaultValue) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : defaultValue;
    }
    return defaultValue;
  };

  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("pomodoro"); // pomodoro, shortBreak, longBreak
  const [cycles, setCycles] = useState(loadFromLocalStorage('pomodoroCycles', 0));
  const [showSettings, setShowSettings] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [theme, setTheme] = useState(loadFromLocalStorage('pomodoroTheme', 'dark'));
  const [logs, setLogs] = useState(loadFromLocalStorage('pomodoroLogs', []));
  const [settings, setSettings] = useState(
    loadFromLocalStorage('pomodoroSettings', {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
      longBreakInterval: 4,
    })
  );
  const audioRef = useRef(null);
  const wakeLockRef = useRef(null);

  const themes = {
    light: {
      bg: "bg-gray-50",
      text: "text-gray-900",
      secondaryText: "text-gray-600",
      button: "bg-white hover:bg-gray-100 text-gray-900",
      border: "border-gray-200",
      card: "bg-white",
      progressBg: "bg-gray-200",
    },
    dark: {
      bg: "bg-gray-950",
      text: "text-gray-100",
      secondaryText: "text-gray-400",
      button: "bg-gray-900 hover:bg-gray-800 text-gray-100",
      border: "border-gray-800",
      card: "bg-gray-900",
      progressBg: "bg-gray-800",
    },
    ocean: {
      bg: "bg-slate-900",
      text: "text-blue-50",
      secondaryText: "text-blue-200",
      button: "bg-blue-900 hover:bg-blue-800 text-blue-50",
      border: "border-blue-800",
      card: "bg-slate-800",
      progressBg: "bg-slate-700",
    },
  };

  const modes = {
    pomodoro: {
      name: "Pomodoro",
      time: settings.pomodoro * 60,
      color: "bg-gradient-to-r from-emerald-500 to-cyan-600",
      themeColor: theme === 'ocean' ? "bg-emerald-600" : "bg-emerald-500",
    },
    shortBreak: {
      name: "Short Break",
      time: settings.shortBreak * 60,
      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
      themeColor: theme === 'ocean' ? "bg-blue-600" : "bg-blue-500",
    },
    longBreak: {
      name: "Long Break",
      time: settings.longBreak * 60,
      color: "bg-gradient-to-r from-purple-500 to-pink-600",
      themeColor: theme === 'ocean' ? "bg-purple-600" : "bg-purple-500",
    },
  };

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pomodoroCycles', JSON.stringify(cycles));
    localStorage.setItem('pomodoroLogs', JSON.stringify(logs));
    localStorage.setItem('pomodoroTheme', JSON.stringify(theme));
  }, [cycles, logs, theme]);

  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    setTimeLeft(modes[mode].time);
  }, [mode, settings]);

  // Add a new log entry when a pomodoro is completed
  const addLogEntry = (completedMode) => {
    const newLog = {
      id: Date.now(),
      date: new Date().toISOString(),
      mode: completedMode,
      duration: settings[completedMode === 'pomodoro' ? 'pomodoro' : 
                completedMode === 'shortBreak' ? 'shortBreak' : 'longBreak'],
    };
    setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 100)); // Keep last 100 entries
  };

  // Clear all logs
  const clearLogs = () => {
    setLogs([]);
  };

  // Screen wake lock implementation
  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        console.log('Screen Wake Lock is active');
        
        wakeLockRef.current.addEventListener('release', () => {
          console.log('Screen Wake Lock was released');
        });
      }
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
    }
  };

  const releaseWakeLock = () => {
    if (wakeLockRef.current !== null) {
      wakeLockRef.current.release();
      wakeLockRef.current = null;
    }
  };

  useEffect(() => {
    if (isActive) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }

    return () => {
      releaseWakeLock();
    };
  }, [isActive]);

  // Handle visibility change to reacquire wake lock when tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isActive) {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive]);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer completed
      clearInterval(interval);
      audioRef.current.play();
      setIsActive(false);
      
      // Add to logs
      addLogEntry(mode);
      
      // Determine next mode
      if (mode === "pomodoro") {
        const nextCycle = cycles + 1;
        setCycles(nextCycle);
        
        if (nextCycle % settings.longBreakInterval === 0) {
          setMode("longBreak");
        } else {
          setMode("shortBreak");
        }
      } else {
        setMode("pomodoro");
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, cycles, settings]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modes[mode].time);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const handleModeChange = (newMode) => {
    if (mode !== newMode) {
      setIsActive(false);
      setMode(newMode);
    }
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: parseInt(value) || 0,
    });
  };

  const saveSettings = () => {
    setShowSettings(false);
    setTimeLeft(modes[mode].time);
    if (isActive) {
      setIsActive(false);
    }
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const progress = ((modes[mode].time - timeLeft) / modes[mode].time) * 100;

  return (
    <div className={`min-h-screen ${themes[theme].bg} ${themes[theme].text} overflow-x-hidden`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl opacity-20 ${
              i % 4 === 0
                ? "bg-emerald-500/20"
                : i % 4 === 1
                ? "bg-blue-500/20"
                : i % 4 === 2
                ? "bg-purple-500/20"
                : "bg-pink-500/20"
            }`}
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <main className="relative z-10">
        {/* Timer Section */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6">
          <div className="max-w-md w-full mx-auto text-center">
            {/* Mode Selector */}
            <div className="flex justify-center gap-4 mb-8">
              {Object.keys(modes).map((key) => (
                <button
                  key={key}
                  onClick={() => handleModeChange(key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    mode === key
                      ? `${modes[key].color} text-white`
                      : `${themes[theme].button}`
                  }`}
                >
                  {modes[key].name}
                </button>
              ))}
            </div>

            {/* Timer Display */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-12"
            >
              <div className="relative w-64 h-64 mx-auto">
                {/* Progress Circle */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={themes[theme].progressBg}
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    strokeLinecap="round"
                    strokeWidth="6"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progress) / 100}
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                    transition={{ duration: 1 }}
                    className={`${
                      mode === "pomodoro"
                        ? "stroke-emerald-500"
                        : mode === "shortBreak"
                        ? "stroke-blue-500"
                        : "stroke-purple-500"
                    }`}
                  />
                </svg>

                {/* Time Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h1 className="text-6xl font-bold mb-2">{formatTime(timeLeft)}</h1>
                  <p className={`${themes[theme].secondaryText} uppercase text-sm tracking-wider`}>
                    {modes[mode].name}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mb-12">
              <Button
                onClick={toggleTimer}
                size="lg"
                className={`${
                  isActive
                    ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                    : modes[mode].color + " hover:from-emerald-600 hover:to-cyan-700"
                } font-bold`}
              >
                {isActive ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" /> Start
                  </>
                )}
              </Button>
              <Button
                onClick={resetTimer}
                size="lg"
                variant="outline"
                className={`${themes[theme].border} hover:${themes[theme].button.replace('bg-', 'bg-')}`}
              >
                <RotateCw className="h-5 w-5 mr-2" /> Reset
              </Button>
            </div>

            {/* Cycles */}
            <div className="mb-8">
              <p className={`${themes[theme].secondaryText} mb-2`}>
                Completed Pomodoros:{" "}
                <span className={`${themes[theme].text} font-medium`}>{cycles}</span>
              </p>
              <div className="flex justify-center gap-2">
                {[...Array(Math.min(cycles, settings.longBreakInterval))].map(
                  (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        (i + 1) % settings.longBreakInterval === 0
                          ? "bg-purple-500"
                          : "bg-emerald-500"
                      }`}
                    />
                  )
                )}
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setShowSettings(true)}
                variant="ghost"
                className={`${themes[theme].secondaryText} hover:${themes[theme].text}`}
              >
                <Settings className="h-5 w-5 mr-2" /> Settings
              </Button>
              <Button
                onClick={() => setShowLog(!showLog)}
                variant="ghost"
                className={`${themes[theme].secondaryText} hover:${themes[theme].text}`}
              >
                <Bell className="h-5 w-5 mr-2" /> Logs ({logs.length})
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Logs Panel */}
      <AnimatePresence>
        {showLog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowLog(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30 }}
              className={`fixed inset-y-0 right-0 z-50 w-full max-w-md ${themes[theme].card} ${themes[theme].border} border-l shadow-2xl overflow-y-auto`}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold">Timer Logs</h2>
                <div className="flex gap-2">
                  <Button
                    onClick={clearLogs}
                    size="sm"
                    variant="outline"
                    className={`${themes[theme].border}`}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Clear
                  </Button>
                  <button
                    onClick={() => setShowLog(false)}
                    className="p-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                {logs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className={`${themes[theme].secondaryText}`}>No logs yet. Complete some pomodoros to see your progress!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {logs.map((log) => (
                      <div 
                        key={log.id} 
                        className={`p-4 rounded-lg ${themes[theme].border} border`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">
                              {log.mode === 'pomodoro' ? 'Pomodoro' : 
                               log.mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
                            </h3>
                            <p className={`text-sm ${themes[theme].secondaryText}`}>
                              {formatDate(log.date)}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm ${
                            log.mode === 'pomodoro' ? 'bg-emerald-500/10 text-emerald-500' :
                            log.mode === 'shortBreak' ? 'bg-blue-500/10 text-blue-500' :
                            'bg-purple-500/10 text-purple-500'
                          }`}>
                            {log.duration} min
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className={`${themes[theme].card} border ${themes[theme].border} rounded-xl w-full max-w-md overflow-hidden shadow-2xl`}>
                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                  <h2 className="text-xl font-bold">Timer Settings</h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Durations (minutes)</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className={themes[theme].secondaryText}>Pomodoro</label>
                        <input
                          type="number"
                          name="pomodoro"
                          value={settings.pomodoro}
                          onChange={handleSettingsChange}
                          min="1"
                          max="60"
                          className={`${themes[theme].button} border ${themes[theme].border} rounded-md px-3 py-2 w-20 text-right`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className={themes[theme].secondaryText}>Short Break</label>
                        <input
                          type="number"
                          name="shortBreak"
                          value={settings.shortBreak}
                          onChange={handleSettingsChange}
                          min="1"
                          max="30"
                          className={`${themes[theme].button} border ${themes[theme].border} rounded-md px-3 py-2 w-20 text-right`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className={themes[theme].secondaryText}>Long Break</label>
                        <input
                          type="number"
                          name="longBreak"
                          value={settings.longBreak}
                          onChange={handleSettingsChange}
                          min="1"
                          max="60"
                          className={`${themes[theme].button} border ${themes[theme].border} rounded-md px-3 py-2 w-20 text-right`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className={themes[theme].secondaryText}>Long Break Interval</label>
                        <input
                          type="number"
                          name="longBreakInterval"
                          value={settings.longBreakInterval}
                          onChange={handleSettingsChange}
                          min="1"
                          max="10"
                          className={`${themes[theme].button} border ${themes[theme].border} rounded-md px-3 py-2 w-20 text-right`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Theme</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => changeTheme('light')}
                        className={`p-4 rounded-lg border ${theme === 'light' ? 'border-emerald-500' : themes[theme].border} ${themes.light.bg} flex-1`}
                      >
                        <span className="block font-medium">Light</span>
                      </button>
                      <button
                        onClick={() => changeTheme('dark')}
                        className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-emerald-500' : themes[theme].border} ${themes.dark.bg} flex-1`}
                      >
                        <span className="block font-medium">Dark</span>
                      </button>
                      <button
                        onClick={() => changeTheme('ocean')}
                        className={`p-4 rounded-lg border ${theme === 'ocean' ? 'border-emerald-500' : themes[theme].border} ${themes.ocean.bg} flex-1`}
                      >
                        <span className="block font-medium">Ocean</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-800 flex justify-end">
                  <Button
                    onClick={saveSettings}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700"
                  >
                    <Check className="h-5 w-5 mr-2" /> Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Audio element for alarm */}
      <audio ref={audioRef} src="/assets/alarm.mp3" preload="auto" />

      <footer className={`relative border-t ${themes[theme].border} ${themes[theme].card} backdrop-blur-sm`}>
        <div className="container mx-auto px-6 py-8 text-center">
          <p className={`${themes[theme].secondaryText} text-sm`}>
            © {new Date().getFullYear()} Pomodoro Timer. Stay focused!
          </p>
        </div>
      </footer>
    </div>
  );
}
