import { useState, useRef, ChangeEvent, useEffect } from "react";
import type { GetServerSideProps } from 'next';
import { 
  User, 
  Flag, 
  Shirt, 
  Target, 
  Activity, 
  Download, 
  Upload,
  Users,
  Shield,
  Sparkles,
  Zap,
  Gamepad2,
  Settings,
  Code,
  Lock,
  Unlock
} from "lucide-react";

interface PlayerData {
  uid: string;
  playerName: string;
  nationality: string;
  playerCategory: string;
  battingHand: string;
  battingTechnique: string;
  battingAggression: string;
  battingTiming: string;
  batsmanType: string;
  bowlingHand: string;
  bowlingType: string;
  bowlingSkill: string;
  bowlingMovement: string;
  bowlingAI: string;
  jerseyNumber: string;
}

export const getServerSideProps: GetServerSideProps<SquadEditorProps> = async (ctx) => {
  const token = ctx.req.cookies?.['license_session'];
  const sessionKey = process.env.LICENSE_SESSION_KEY;
  let isLicensed = false;
  if (token && sessionKey) {
    const { verifySessionCookie } = await import('@/lib/license');
    const result = verifySessionCookie(token, sessionKey);
    const plan = result.claims?.plan || null;
    isLicensed = result.valid === true && (!plan || plan === 'all' || plan === 'squadeditor');
  }
  return { props: { isLicensed } };
};

interface SquadEditorProps {
  isLicensed?: boolean;
}

export default function SquadEditor({ isLicensed = true }: SquadEditorProps) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<string[][]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const [playerData, setPlayerData] = useState<PlayerData>({
    uid: "",
    playerName: "",
    nationality: "1",
    playerCategory: "1",
    battingHand: "1",
    battingTechnique: "",
    battingAggression: "",
    battingTiming: "",
    batsmanType: "1",
    bowlingHand: "0",
    bowlingType: "0",
    bowlingSkill: "",
    bowlingMovement: "",
    bowlingAI: "",
    jerseyNumber: ""
  });
  const [animatedBg, setAnimatedBg] = useState(true);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isLicenseValid, setIsLicenseValid] = useState<boolean>(!!isLicensed);
  const [licenseKey, setLicenseKey] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [isCheckingLicense, setIsCheckingLicense] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // License boot: generate deviceId, check stored license, validate and set session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const nav = window.navigator;
      const screenInfo = window.screen;
      const raw = [
        nav.userAgent,
        nav.language,
        String(screenInfo.width),
        String(screenInfo.height),
        String(screenInfo.colorDepth)
      ].join('|');
      let h = 2166136261;
      for (let i = 0; i < raw.length; i++) {
        h ^= raw.charCodeAt(i);
        h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
      }
      const generatedDeviceId = (h >>> 0).toString(16);
      setDeviceId(generatedDeviceId);

      // If SSR says licensed we still mark check complete
      const storedLicense = localStorage.getItem('se_license');
      const storedDeviceId = localStorage.getItem('se_deviceId');
      if (storedLicense && storedDeviceId === generatedDeviceId) {
        // Validate and set session
        validateStoredLicense(storedLicense, generatedDeviceId);
      } else {
        setIsCheckingLicense(false);
        if (storedLicense) {
          localStorage.removeItem('se_license');
          localStorage.removeItem('se_deviceId');
        }
      }
    } catch {
      setIsCheckingLicense(false);
    }
  }, []);

  const validateStoredLicense = async (storedLicense: string, devId: string) => {
    try {
      const res = await fetch('/api/license/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: storedLicense, deviceId: devId })
      });
      if (res.ok) {
        setIsLicenseValid(true);
        await fetch('/api/license/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ licenseKey: storedLicense, deviceId: devId })
        });
      } else {
        localStorage.removeItem('se_license');
        localStorage.removeItem('se_deviceId');
      }
    } catch {
      // offline mode: allow if stored
      setIsLicenseValid(!!storedLicense);
    } finally {
      setIsCheckingLicense(false);
    }
  };

  const handleLicenseSubmit = async () => {
    try {
      const res = await fetch('/api/license/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: licenseKey, deviceId: deviceId || undefined })
      });
      if (!res.ok) throw new Error('Invalid license key');
      localStorage.setItem('se_license', licenseKey);
      localStorage.setItem('se_deviceId', deviceId);
      await fetch('/api/license/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey, deviceId })
      });
      setIsLicenseValid(true);
    } catch {
      alert('❌ Invalid or expired license key');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('se_license');
    localStorage.removeItem('se_deviceId');
    setIsLicenseValid(false);
    setLicenseKey('');
    fetch('/api/license/logout', { method: 'POST' });
  };

  const decryptAES = (content: string): string => {
    try {
      // Simple fallback for demo - in real implementation, use proper crypto
      if (content.includes("encrypted")) {
        return content.replace("encrypted_", "");
      }
      return content;
    } catch (e) {
      return content;
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus('processing');
    setMessage('Processing file...');

    const reader = new FileReader();
    reader.onload = (e) => {
      let text = e.target?.result as string;
      if (!text) return;

      text = text.trim();
      text = decryptAES(text);
      
      const lines = text.split(/\r?\n/);
      const fileHeaders = lines[0].split(",");
      const fileData = lines.slice(1).map(line => line.split(","));
      
      setHeaders(fileHeaders);
      setData(fileData);
      
      if (fileData.length > 0) {
        loadPlayerData(0, fileData);
        setStatus('success');
        setMessage('✅ File imported successfully!');
      } else {
        setStatus('error');
        setMessage('❌ No data found in file');
      }
    };

    reader.onerror = () => {
      setStatus('error');
      setMessage('❌ Error reading file');
    };

    reader.readAsText(file);
  };

  const loadPlayerData = (index: number, playerDataArray?: string[][]) => {
    const dataArray = playerDataArray || data;
    if (index < 0 || index >= dataArray.length) return;

    const row = dataArray[index];
    setSelectedPlayer(index);
    
    setPlayerData({
      uid: row[0] || "",
      playerName: row[1] || "",
      nationality: row[2] || "1",
      playerCategory: row[3] || "1",
      battingHand: row[4] || "1",
      battingTechnique: row[5] || "",
      battingAggression: row[6] || "",
      battingTiming: row[7] || "",
      batsmanType: row[8] || "1",
      bowlingHand: row[9] || "0",
      bowlingType: row[10] || "0",
      bowlingSkill: row[11] || "",
      bowlingMovement: row[12] || "",
      bowlingAI: row[13] || "",
      jerseyNumber: row[14] || ""
    });
  };

  const handleInputChange = (field: keyof PlayerData, value: string) => {
    setPlayerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveFile = () => {
    if (!data.length) {
      setStatus('error');
      setMessage('❌ No data to save');
      return;
    }

    setStatus('processing');
    setMessage('Saving file...');

    const updatedData = [...data];
    const playerArray = [
      playerData.uid,
      playerData.playerName,
      playerData.nationality,
      playerData.playerCategory,
      playerData.battingHand,
      playerData.battingTechnique,
      playerData.battingAggression,
      playerData.battingTiming,
      playerData.batsmanType,
      playerData.bowlingHand,
      playerData.bowlingType,
      playerData.bowlingSkill,
      playerData.bowlingMovement,
      playerData.bowlingAI,
      playerData.jerseyNumber
    ];

    updatedData[selectedPlayer] = playerArray;
    
    const csvContent = [headers.join(","), ...updatedData.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "updated_squad.csv";
    a.click();
    URL.revokeObjectURL(url);

    setStatus('success');
    setMessage('✅ File saved successfully!');
  };

  const nationalities = Array.from({ length: 10 }, (_, i) => i + 1);
  const playerCategories = [
    { value: "1", label: "Batsman" },
    { value: "2", label: "All-Rounder" },
    { value: "3", label: "Keeper" },
    { value: "4", label: "Bowler" }
  ];
  const battingHands = [
    { value: "1", label: "Right Hand" },
    { value: "2", label: "Left Hand" }
  ];
  const batsmanTypes = [
    { value: "1", label: "Defensive" },
    { value: "2", label: "Balanced" },
    { value: "3", label: "Radical" },
    { value: "4", label: "Brute" }
  ];
  const bowlingHands = [
    { value: "0", label: "None" },
    { value: "1", label: "Right Arm" },
    { value: "2", label: "Left Arm" }
  ];
  const bowlingTypes = [
    { value: "0", label: "None" },
    { value: "1", label: "Fast" },
    { value: "2", label: "Medium" },
    { value: "3", label: "Off Spin" },
    { value: "4", label: "Leg Spin" },
    { value: "5", label: "Chinaman" },
    { value: "6", label: "Swing" }
  ];

  if (isCheckingLicense) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">Checking license...</p>
        </div>
      </div>
    );
  }

  if (!isLicenseValid) {
    return (
      <div className={`min-h-screen text-white relative overflow-hidden ${animatedBg ? 'animated-bg' : 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'}`}>
        <div className="absolute top-4 right-4 z-10">
          <button onClick={() => setAnimatedBg(!animatedBg)} className="bg-gray-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-gray-700/80 transition-all">
            <Sparkles className="w-4 h-4" />
            {animatedBg ? 'Disable Effects' : 'Enable Effects'}
          </button>
        </div>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <div className="bg-gray-800/80 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full backdrop-blur-sm">
            <div className="text-center mb-6">
              <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">License Required</h2>
            </div>
            <div className="space-y-4">
              <input 
                type="text" 
                value={licenseKey} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setLicenseKey(e.target.value)} 
                placeholder="Enter license key" 
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all" 
              />
              <div className="text-xs text-gray-400">Device ID: {deviceId || 'detecting...'}</div>
              <button 
                onClick={handleLicenseSubmit} 
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all"
              >
                Activate License
              </button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .animated-bg { background: linear-gradient(-45deg, #1a202c, #2d3748, #1a202c, #2d3748); background-size: 400% 400%; animation: gradient 15s ease infinite; }
          @keyframes gradient { 0% {background-position: 0% 50%;} 50% {background-position: 100% 50%;} 100% {background-position: 0% 50%;} }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`min-h-screen text-white relative overflow-hidden ${animatedBg ? 'animated-bg' : 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'}`}>
      {/* Background Effects Toggle + Logout */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button onClick={handleLogout} className="bg-gray-800/80 backdrop-blur-sm border border-red-500/30 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-gray-700/80 transition-all">
          <Lock className="w-4 h-4" /> Logout
        </button>
        <button 
          onClick={() => setAnimatedBg(!animatedBg)} 
          className="bg-gray-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-gray-700/80 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          {animatedBg ? 'Disable Effects' : 'Enable Effects'}
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gamepad2 className="w-12 h-12 text-cyan-400 mr-4" />
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              SQUAD EDITOR
            </h1>
          </div>
          <p className="text-xl text-gray-400 mb-2">Advanced Cricket Squad Management</p>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Action Buttons */}
          <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">Squad Management</h2>
              <p className="text-gray-400">Import and edit your cricket squad files</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input 
                type="file" 
                ref={fileInputRef} 
                accept=".txt,.csv" 
                className="hidden" 
                onChange={handleFileUpload}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Import Squad File
              </button>
              <button 
                onClick={saveFile}
                disabled={data.length === 0}
                className="flex-1 bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Save Changes
              </button>
            </div>

            {/* Status Message */}
            {status !== 'idle' && (
              <div className={`p-4 rounded-xl text-center font-semibold ${
                status === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 
                status === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 
                'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* Player Selection */}
          {data.length > 0 && (
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-6 mb-8 backdrop-blur-sm">
              <label className="block text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                SELECT PLAYER
              </label>
              <select 
                value={selectedPlayer}
                onChange={(e) => loadPlayerData(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
              >
                {data.map((row, index) => (
                  <option key={index} value={index}>
                    {row[1] || `Player ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Editor Grid */}
          {data.length > 0 && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Left Column - Player Info */}
              <div className="space-y-6">
                {/* Player Information */}
                <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Player Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">PLAYER NAME</label>
                      <input 
                        type="text" 
                        value={playerData.playerName}
                        onChange={(e) => handleInputChange('playerName', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">UID</label>
                      <input 
                        type="text" 
                        value={playerData.uid}
                        onChange={(e) => handleInputChange('uid', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">NATIONALITY</label>
                        <select 
                          value={playerData.nationality}
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        >
                          {nationalities.map(num => (
                            <option key={num} value={num.toString()}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">JERSEY NUMBER</label>
                        <input 
                          type="number" 
                          value={playerData.jerseyNumber}
                          onChange={(e) => handleInputChange('jerseyNumber', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">PLAYER CATEGORY</label>
                      <select 
                        value={playerData.playerCategory}
                        onChange={(e) => handleInputChange('playerCategory', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      >
                        {playerCategories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Stats */}
              <div className="space-y-6">
                {/* Batting Stats */}
                <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Batting Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">BATTING HAND</label>
                        <select 
                          value={playerData.battingHand}
                          onChange={(e) => handleInputChange('battingHand', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        >
                          {battingHands.map(hand => (
                            <option key={hand.value} value={hand.value}>{hand.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">BATSMAN TYPE</label>
                        <select 
                          value={playerData.batsmanType}
                          onChange={(e) => handleInputChange('batsmanType', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        >
                          {batsmanTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">TECHNIQUE</label>
                        <input 
                          type="number" 
                          value={playerData.battingTechnique}
                          onChange={(e) => handleInputChange('battingTechnique', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">AGGRESSION</label>
                        <input 
                          type="number" 
                          value={playerData.battingAggression}
                          onChange={(e) => handleInputChange('battingAggression', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">TIMING</label>
                        <input 
                          type="number" 
                          value={playerData.battingTiming}
                          onChange={(e) => handleInputChange('battingTiming', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bowling Stats */}
                <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Bowling Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">BOWLING HAND</label>
                        <select 
                          value={playerData.bowlingHand}
                          onChange={(e) => handleInputChange('bowlingHand', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        >
                          {bowlingHands.map(hand => (
                            <option key={hand.value} value={hand.value}>{hand.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">BOWLING TYPE</label>
                        <select 
                          value={playerData.bowlingType}
                          onChange={(e) => handleInputChange('bowlingType', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        >
                          {bowlingTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">SKILL</label>
                        <input 
                          type="number" 
                          value={playerData.bowlingSkill}
                          onChange={(e) => handleInputChange('bowlingSkill', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">MOVEMENT</label>
                        <input 
                          type="number" 
                          value={playerData.bowlingMovement}
                          onChange={(e) => handleInputChange('bowlingMovement', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">AI</label>
                        <input 
                          type="number" 
                          value={playerData.bowlingAI}
                          onChange={(e) => handleInputChange('bowlingAI', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-cyan-500/10">
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-cyan-400 font-bold text-lg mb-2">Player Management</h3>
              <p className="text-gray-400">Edit and customize player attributes</p>
            </div>
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-cyan-500/10">
              <Target className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-cyan-400 font-bold text-lg mb-2">Stats Editor</h3>
              <p className="text-gray-400">Modify batting and bowling statistics</p>
            </div>
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-cyan-500/10">
              <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-cyan-400 font-bold text-lg mb-2">Quick Editing</h3>
              <p className="text-gray-400">Fast and efficient squad management</p>
            </div>
          </div>
          
          <div className="text-gray-500 text-sm">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-2">
              <span className="flex items-center gap-1"><Code className="w-4 h-4" /> Shiva</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Settings className="w-4 h-4" /> Nishad & Fluxon </span>
            </div>
            <p>SQUAD EDITOR • Professional Edition</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .animated-bg {
          background: linear-gradient(-45deg, #1a202c, #2d3748, #1a202c, #2d3748);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animated-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(192, 132, 252, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
