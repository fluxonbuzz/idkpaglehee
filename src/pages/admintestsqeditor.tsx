import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload, Users, Zap, Gamepad2 } from "lucide-react";

interface PlayerData {
  [key: string]: string;
}

interface InputFields {
  uid: string;
  playerName: string;
  nationality: string;
  playerCategory: string;
  battingHand: string;
  battingTechnique: string;
  battingTiming: string;
  battingAggression: string;
  batsmanType: string;
  bowlingHand: string;
  bowlingType: string;
  bowlingSkill: string;
  bowlingMovement: string;
  bowlingAI: string;
  jerseyNumber: string;
}

export default function SquadEditor() {
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<string[][]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [inputs, setInputs] = useState<InputFields>({
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

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;

      const lines = text.trim().split(/\r?\n/);
      const firstLine = lines[0].split(",");
      
      const likelyHeader = firstLine.some(v => isNaN(parseFloat(v)));
      let newHeaders: string[];
      let newData: string[][];

      if (likelyHeader) {
        newHeaders = firstLine.map(h => h.trim());
        newData = lines.slice(1);
      } else {
        const colCount = firstLine.length;
        newHeaders = Array.from({ length: colCount }, (_, i) => `Column${i + 1}`);
        newData = lines;
      }

      const colCount = newHeaders.length;
      const processedData = newData.map(line => {
        let row = line.split(",").map(v => v.trim());
        if (row.length < colCount) {
          row = [...row, ...Array(colCount - row.length).fill("")];
        } else if (row.length > colCount) {
          row = row.slice(0, colCount);
        }
        return row;
      });

      setHeaders(newHeaders);
      setData(processedData);
      if (processedData.length > 0) {
        loadPlayerData(0, processedData);
      }
    };
    reader.readAsText(file);
  };

  const loadPlayerData = (index: number, playerData?: string[][]) => {
    const currentData = playerData || data;
    const row = currentData[index];
    if (!row) return;

    setInputs({
      uid: row[0] || "",
      playerName: row[1] || "",
      nationality: row[2] || "1",
      playerCategory: row[3] || "1",
      battingHand: row[4] || "1",
      battingTechnique: row[5] || "",
      battingAggression: row[7] || "",
      battingTiming: row[6] || "",
      batsmanType: row[8] || "1",
      bowlingHand: row[10] || "0",
      bowlingType: row[11] || "0",
      bowlingSkill: row[12] || "",
      bowlingMovement: row[13] || "",
      bowlingAI: row[14] || "",
      jerseyNumber: row[16] || ""
    });
    setSelectedPlayer(index);
  };

  const handleInputChange = (field: keyof InputFields, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveFile = () => {
    if (data.length === 0) return;

    const row = [...data[selectedPlayer]];
    const updates = Array(17).fill("");
    
    updates[0] = inputs.uid;
    updates[1] = inputs.playerName;
    updates[2] = inputs.nationality;
    updates[3] = inputs.playerCategory;
    updates[4] = inputs.battingHand;
    updates[5] = inputs.battingTechnique;
    updates[6] = inputs.battingTiming;
    updates[7] = inputs.battingAggression;
    updates[8] = inputs.batsmanType;
    updates[9] = row[9] || "";
    updates[10] = inputs.bowlingHand;
    updates[11] = inputs.bowlingType;
    updates[12] = inputs.bowlingSkill;
    updates[13] = inputs.bowlingMovement;
    updates[14] = inputs.bowlingAI;
    updates[15] = row[15] || "";
    updates[16] = inputs.jerseyNumber;

    const newData = [...data];
    newData[selectedPlayer] = updates;
    setData(newData);

    const csvContent = [headers.join(","), ...newData.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "updated_squad.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🏏 Cricket Squad Editor
          </h1>
          <p className="text-gray-400 text-lg">Edit and manage your cricket squad files with ease</p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".txt,.csv"
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import File
          </Button>
          <Button
            onClick={saveFile}
            className="bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Save File
          </Button>
        </div>

        {data.length > 0 && (
          <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-6 mb-8 backdrop-blur-sm">
            <label className="block text-cyan-400 font-semibold mb-3">SELECT PLAYER</label>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Player Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">PLAYER NAME</label>
                  <input
                    type="text"
                    value={inputs.playerName}
                    onChange={(e) => handleInputChange('playerName', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">UID</label>
                  <input
                    type="text"
                    value={inputs.uid}
                    onChange={(e) => handleInputChange('uid', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">NATIONALITY</label>
                  <select
                    value={inputs.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">PLAYER CATEGORY</label>
                  <select
                    value={inputs.playerCategory}
                    onChange={(e) => handleInputChange('playerCategory', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  >
                    <option value="1">Batsman</option>
                    <option value="2">All-Rounder</option>
                    <option value="3">Keeper</option>
                    <option value="4">Bowler</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">JERSEY NUMBER</label>
                  <input
                    type="number"
                    value={inputs.jerseyNumber}
                    onChange={(e) => handleInputChange('jerseyNumber', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center">
                <Gamepad2 className="w-5 h-5 mr-2" />
                Batting Stats
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BATTING HAND</label>
                  <select
                    value={inputs.battingHand}
                    onChange={(e) => handleInputChange('battingHand', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  >
                    <option value="1">Right Hand</option>
                    <option value="2">Left Hand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BATTING TECHNIQUE</label>
                  <input
                    type="number"
                    value={inputs.battingTechnique}
                    onChange={(e) => handleInputChange('battingTechnique', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BATTING AGGRESSION</label>
                  <input
                    type="number"
                    value={inputs.battingAggression}
                    onChange={(e) => handleInputChange('battingAggression', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BATTING TIMING</label>
                  <input
                    type="number"
                    value={inputs.battingTiming}
                    onChange={(e) => handleInputChange('battingTiming', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BATSMAN TYPE</label>
                  <select
                    value={inputs.batsmanType}
                    onChange={(e) => handleInputChange('batsmanType', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  >
                    <option value="1">Defensive</option>
                    <option value="2">Balanced</option>
                    <option value="3">Radical</option>
                    <option value="4">Brute</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Bowling Stats
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BOWLING HAND</label>
                  <select
                    value={inputs.bowlingHand}
                    onChange={(e) => handleInputChange('bowlingHand', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  >
                    <option value="0">None</option>
                    <option value="1">Right Arm</option>
                    <option value="2">Left Arm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BOWLING TYPE</label>
                  <select
                    value={inputs.bowlingType}
                    onChange={(e) => handleInputChange('bowlingType', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  >
                    <option value="0">None</option>
                    <option value="1">Fast</option>
                    <option value="2">Medium</option>
                    <option value="3">Off Spin</option>
                    <option value="4">Leg Spin</option>
                    <option value="5">Chinaman</option>
                    <option value="6">Swing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BOWLING SKILL</label>
                  <input
                    type="number"
                    value={inputs.bowlingSkill}
                    onChange={(e) => handleInputChange('bowlingSkill', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BOWLING MOVEMENT</label>
                  <input
                    type="number"
                    value={inputs.bowlingMovement}
                    onChange={(e) => handleInputChange('bowlingMovement', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">BOWLING AI</label>
                  <input
                    type="number"
                    value={inputs.bowlingAI}
                    onChange={(e) => handleInputChange('bowlingAI', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Shiva X Tools
          </div>
        </div>
      </div>
    </div>
  );
}
