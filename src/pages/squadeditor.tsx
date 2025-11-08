import { useState, useRef, ChangeEvent, useEffect } from "react";
import { 
  User, 
  Flag, 
  Shirt, 
  Target, 
  Activity, 
  Zap, 
  Download, 
  Upload,
  Users,
  Gamepad2,
  Shield
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

  const fileInputRef = useRef<HTMLInputElement>(null);

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
      }
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
    if (!data.length) return;

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

  if (!isLicensed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">License Required</h2>
          <p className="text-gray-400">Please activate your license to access the Squad Editor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🏏 Cricket Squad Editor
          </h1>
          <p className="text-gray-400 text-lg">Edit and manage your cricket squad files easily</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <input 
            type="file" 
            ref={fileInputRef} 
            accept=".txt,.csv" 
            className="hidden" 
            onChange={handleFileUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Import File
          </button>
          <button 
            onClick={saveFile}
            disabled={data.length === 0}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            Save File
          </button>
        </div>

        {/* Player Selection */}
        {data.length > 0 && (
          <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-6 mb-8 backdrop-blur-sm">
            <label className="block text-cyan-400 font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              SELECT PLAYER
            </label>
            <select 
              value={selectedPlayer}
              onChange={(e) => loadPlayerData(Number(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Player Information */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
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
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">UID</label>
                  <input 
                    type="text" 
                    value={playerData.uid}
                    onChange={(e) => handleInputChange('uid', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <Flag className="w-4 h-4" />
                    NATIONALITY
                  </label>
                  <select 
                    value={playerData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    {nationalities.map(num => (
                      <option key={num} value={num.toString()}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">PLAYER CATEGORY</label>
                  <select 
                    value={playerData.playerCategory}
                    onChange={(e) => handleInputChange('playerCategory', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    {playerCategories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <Shirt className="w-4 h-4" />
                    JERSEY NUMBER
                  </label>
                  <input 
                    type="number" 
                    value={playerData.jerseyNumber}
                    onChange={(e) => handleInputChange('jerseyNumber', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Batting & Bowling Stats */}
          <div className="space-y-6">
            {/* Batting Stats */}
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Batting Stats
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BATTING HAND</label>
                  <select 
                    value={playerData.battingHand}
                    onChange={(e) => handleInputChange('battingHand', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    {battingHands.map(hand => (
                      <option key={hand.value} value={hand.value}>{hand.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BATTING TECHNIQUE</label>
                  <input 
                    type="number" 
                    value={playerData.battingTechnique}
                    onChange={(e) => handleInputChange('battingTechnique', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BATTING AGGRESSION</label>
                  <input 
                    type="number" 
                    value={playerData.battingAggression}
                    onChange={(e) => handleInputChange('battingAggression', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BATTING TIMING</label>
                  <input 
                    type="number" 
                    value={playerData.battingTiming}
                    onChange={(e) => handleInputChange('battingTiming', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BATSMAN TYPE</label>
                  <select 
                    value={playerData.batsmanType}
                    onChange={(e) => handleInputChange('batsmanType', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    {batsmanTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Bowling Stats */}
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Bowling Stats
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BOWLING HAND</label>
                  <select 
                    value={playerData.bowlingHand}
                    onChange={(e) => handleInputChange('bowlingHand', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
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
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    {bowlingTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BOWLING SKILL</label>
                  <input 
                    type="number" 
                    value={playerData.bowlingSkill}
                    onChange={(e) => handleInputChange('bowlingSkill', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BOWLING MOVEMENT</label>
                  <input 
                    type="number" 
                    value={playerData.bowlingMovement}
                    onChange={(e) => handleInputChange('bowlingMovement', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BOWLING AI</label>
                  <input 
                    type="number" 
                    value={playerData.bowlingAI}
                    onChange={(e) => handleInputChange('bowlingAI', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Nishad XD Tools
          </div>
        </div>
      </div>
    </div>
  );
}
