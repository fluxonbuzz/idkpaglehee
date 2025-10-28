import { useState, useRef, ChangeEvent } from "react";
import { 
  FileText, 
  Shield, 
  Download, 
  Upload, 
  Users, 
  Zap, 
  Gamepad2, 
  Lock, 
  Unlock,
  User,
  Flag,
  Award,
  Target,
  Activity,
  Clock,
  Shirt,
  Code,
  Settings,
  Key
} from "lucide-react";

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

class AesEncryptor {
  private static key: Uint8Array | null = null;
  private static readonly keyString = "realnauticrick20";
  private static readonly encoder = new TextEncoder();
  private static readonly decoder = new TextDecoder();

  static initialize() {
    if (typeof window !== 'undefined') {
      const keyBytes = this.encoder.encode(this.keyString);
      this.key = keyBytes.slice(0, 16);
    }
  }

  static async decryptBuffer(encryptedBuffer: ArrayBuffer): Promise<ArrayBuffer> {
    if (typeof window === 'undefined' || !this.key) {
      throw new Error('Client side only');
    }

    try {
      const encrypted = new Uint8Array(encryptedBuffer);
      const iv = encrypted.slice(0, 16);
      const data = encrypted.slice(16);
      
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        this.key,
        { name: 'AES-CBC' },
        false,
        ['decrypt']
      );
      
      const decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-CBC',
          iv: iv
        },
        cryptoKey,
        data
      );
      
      return decrypted;
    } catch (error) {
      throw new Error(`Decryption failed: ${error}`);
    }
  }

  static async encryptBuffer(buffer: ArrayBuffer): Promise<ArrayBuffer> {
    if (typeof window === 'undefined' || !this.key) {
      throw new Error('Client side only');
    }

    try {
      const iv = crypto.getRandomValues(new Uint8Array(16));
      
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        this.key,
        { name: 'AES-CBC' },
        false,
        ['encrypt']
      );
      
      const encrypted = await crypto.subtle.encrypt(
        {
          name: 'AES-CBC',
          iv: iv
        },
        cryptoKey,
        buffer
      );
      
      const result = new Uint8Array(iv.length + encrypted.byteLength);
      result.set(iv);
      result.set(new Uint8Array(encrypted), iv.length);
      
      return result;
    } catch (error) {
      throw new Error(`Encryption failed: ${error}`);
    }
  }

  static async decryptString(encryptedBase64: string): Promise<string> {
    if (typeof window === 'undefined' || !this.key) {
      throw new Error('Client side only');
    }

    try {
      const binaryString = atob(encryptedBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const decrypted = await this.decryptBuffer(bytes.buffer);
      return this.decoder.decode(decrypted);
    } catch (error) {
      throw new Error(`String decryption failed: ${error}`);
    }
  }

  static async encryptString(text: string): Promise<string> {
    if (typeof window === 'undefined' || !this.key) {
      throw new Error('Client side only');
    }

    try {
      const buffer = this.encoder.encode(text);
      const encrypted = await this.encryptBuffer(buffer);
      
      const bytes = new Uint8Array(encrypted);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    } catch (error) {
      throw new Error(`String encryption failed: ${error}`);
    }
  }

  static isLikelyEncrypted(base64String: string): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const binary = atob(base64String);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      
      return bytes.length >= 32;
    } catch {
      return false;
    }
  }
}

export default function RC20Crypter() {
  const [activeTab, setActiveTab] = useState<'crypter' | 'editor'>('crypter');
  const [crypterMode, setCrypterMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [crypterStatus, setCrypterStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [crypterMessage, setCrypterMessage] = useState('');
  
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<string[][]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const crypterFileInputRef = useRef<HTMLInputElement>(null);
  const editorFileInputRef = useRef<HTMLInputElement>(null);
  const binaryFileInputRef = useRef<HTMLInputElement>(null);

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

  if (typeof window !== 'undefined') {
    AesEncryptor.initialize();
  }

  const handleCrypterFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCrypterStatus('processing');
    
    try {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      let result: ArrayBuffer;
      
      if (crypterMode === 'encrypt') {
        result = await AesEncryptor.encryptBuffer(arrayBuffer);
        setCrypterMessage('✅ File encrypted successfully');
        setCrypterStatus('success');
      } else {
        result = await AesEncryptor.decryptBuffer(arrayBuffer);
        setCrypterMessage('✅ File decrypted successfully');
        setCrypterStatus('success');
      }

      const blob = new Blob([result]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${crypterMode === 'encrypt' ? 'encrypted_' : 'decrypted_'}${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      setCrypterMessage('❌ Operation failed. Please check the file.');
      setCrypterStatus('error');
    }
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleEditorFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    
    try {
      const fileContent = await readFileAsText(file);
      
      if (AesEncryptor.isLikelyEncrypted(fileContent)) {
        try {
          const decryptedContent = await AesEncryptor.decryptString(fileContent);
          processFileContent(decryptedContent);
          setIsEncrypted(true);
        } catch (decryptError) {
          processFileContent(fileContent);
          setIsEncrypted(false);
        }
      } else {
        processFileContent(fileContent);
        setIsEncrypted(false);
      }
    } catch (error) {
      console.error('File processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const processFileContent = (content: string) => {
    const lines = content.trim().split(/\r?\n/);
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

  const saveFile = async () => {
    if (data.length === 0) return;

    setIsProcessing(true);
    
    try {
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
      
      let fileContent: string | ArrayBuffer;
      let fileName: string;
      let mimeType: string;

      if (isEncrypted) {
        const encryptedContent = await AesEncryptor.encryptString(csvContent);
        fileContent = encryptedContent;
        fileName = "encrypted_squad.dat";
        mimeType = "application/octet-stream";
      } else {
        fileContent = csvContent;
        fileName = "updated_squad.csv";
        mimeType = "text/csv";
      }

      const blob = new Blob([fileContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBinaryFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    
    try {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      const decrypted = await AesEncryptor.decryptBuffer(arrayBuffer);
      const decryptedText = new TextDecoder().decode(decrypted);
      processFileContent(decryptedText);
      setIsEncrypted(true);
    } catch (error) {
      console.error('Binary file processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-cyan-400 mr-4" />
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              RC 20 CRYPTER
            </h1>
          </div>
          <p className="text-xl text-gray-400 mb-2">
            AES-Powered Secure File Encryption & Squad Editor
          </p>
          <div className="flex justify-center gap-6 text-cyan-300 text-sm">
            <span className="flex items-center gap-1"><Code className="w-4 h-4" /> Shiva Fluxon</span>
            <span className="flex items-center gap-1"><Settings className="w-4 h-4" /> Nishad</span>
          </div>
        </header>

        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/50 rounded-xl p-2 flex gap-2 border border-cyan-500/20">
            <button
              onClick={() => setActiveTab('crypter')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'crypter' 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="w-5 h-5" />
              File Crypter
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'editor' 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              Squad Editor
            </button>
          </div>
        </div>

        {activeTab === 'crypter' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">Secure File Encryption</h2>
                <p className="text-gray-400">Protect your files with AES-128-CBC encryption</p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setCrypterMode('encrypt')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      crypterMode === 'encrypt' 
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' 
                        : 'bg-gray-700/50 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                    Encrypt
                  </button>
                  <button
                    onClick={() => setCrypterMode('decrypt')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      crypterMode === 'decrypt' 
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' 
                        : 'bg-gray-700/50 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Unlock className="w-5 h-5" />
                    Decrypt
                  </button>
                </div>

                <input
                  type="file"
                  ref={crypterFileInputRef}
                  onChange={handleCrypterFileUpload}
                  className="hidden"
                />
                
                <button
                  onClick={() => crypterFileInputRef.current?.click()}
                  disabled={crypterStatus === 'processing'}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {crypterStatus === 'processing' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Select File to {crypterMode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
                    </>
                  )}
                </button>

                {crypterStatus !== 'idle' && (
                  <div className={`p-4 rounded-xl text-center font-semibold ${
                    crypterStatus === 'success' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/40' 
                      : crypterStatus === 'error'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  }`}>
                    {crypterMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="space-y-8">
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="file"
                  ref={editorFileInputRef}
                  onChange={handleEditorFileUpload}
                  accept=".txt,.csv,.dat"
                  className="hidden"
                />
                <button
                  onClick={() => editorFileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Upload className="w-5 h-5" />
                  {isProcessing ? "Processing..." : "Import Squad File"}
                </button>
                
                <input
                  type="file"
                  ref={binaryFileInputRef}
                  onChange={handleBinaryFileUpload}
                  accept=".dat,.bin,.enc"
                  className="hidden"
                />
                <button
                  onClick={() => binaryFileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Lock className="w-5 h-5" />
                  Import Encrypted File
                </button>

                <button
                  onClick={saveFile}
                  disabled={isProcessing || data.length === 0}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isEncrypted ? <Lock className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                  {isProcessing ? "Saving..." : isEncrypted ? "Save Encrypted" : "Save File"}
                </button>
              </div>

              {isEncrypted && (
                <div className="mt-4 bg-green-500/20 border border-green-500/40 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center text-green-400 gap-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">Secure Mode Active - AES-128-CBC Encryption</span>
                  </div>
                </div>
              )}
            </div>

            {data.length > 0 && (
              <>
                <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                  <label className="block text-cyan-400 font-semibold mb-3 text-lg">SELECT PLAYER</label>
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

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-cyan-400 font-bold text-xl mb-6 flex items-center gap-2">
                      <User className="w-6 h-6" />
                      Player Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          PLAYER NAME
                        </label>
                        <input
                          type="text"
                          value={inputs.playerName}
                          onChange={(e) => handleInputChange('playerName', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <Key className="w-4 h-4" />
                          UID
                        </label>
                        <input
                          type="text"
                          value={inputs.uid}
                          onChange={(e) => handleInputChange('uid', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <Flag className="w-4 h-4" />
                          NATIONALITY
                        </label>
                        <select
                          value={inputs.nationality}
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        >
                          {Array.from({ length: 10 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          PLAYER CATEGORY
                        </label>
                        <select
                          value={inputs.playerCategory}
                          onChange={(e) => handleInputChange('playerCategory', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        >
                          <option value="1">Batsman</option>
                          <option value="2">All-Rounder</option>
                          <option value="3">Keeper</option>
                          <option value="4">Bowler</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <Shirt className="w-4 h-4" />
                          JERSEY NUMBER
                        </label>
                        <input
                          type="number"
                          value={inputs.jerseyNumber}
                          onChange={(e) => handleInputChange('jerseyNumber', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-cyan-400 font-bold text-xl mb-6 flex items-center gap-2">
                      <Gamepad2 className="w-6 h-6" />
                      Batting Stats
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          BATTING HAND
                        </label>
                        <select
                          value={inputs.battingHand}
                          onChange={(e) => handleInputChange('battingHand', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        >
                          <option value="1">Right Hand</option>
                          <option value="2">Left Hand</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          BATTING TECHNIQUE
                        </label>
                        <input
                          type="number"
                          value={inputs.battingTechnique}
                          onChange={(e) => handleInputChange('battingTechnique', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          BATTING AGGRESSION
                        </label>
                        <input
                          type="number"
                          value={inputs.battingAggression}
                          onChange={(e) => handleInputChange('battingAggression', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          BATTING TIMING
                        </label>
                        <input
                          type="number"
                          value={inputs.battingTiming}
                          onChange={(e) => handleInputChange('battingTiming', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          BATSMAN TYPE
                        </label>
                        <select
                          value={inputs.batsmanType}
                          onChange={(e) => handleInputChange('batsmanType', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        >
                          <option value="1">Defensive</option>
                          <option value="2">Balanced</option>
                          <option value="3">Radical</option>
                          <option value="4">Brute</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-cyan-400 font-bold text-xl mb-6 flex items-center gap-2">
                      <Target className="w-6 h-6" />
                      Bowling Stats
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          BOWLING HAND
                        </label>
                        <select
                          value={inputs.bowlingHand}
                          onChange={(e) => handleInputChange('bowlingHand', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        >
                          <option value="0">None</option>
                          <option value="1">Right Arm</option>
                          <option value="2">Left Arm</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          BOWLING TYPE
                        </label>
                        <select
                          value={inputs.bowlingType}
                          onChange={(e) => handleInputChange('bowlingType', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
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
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          BOWLING SKILL
                        </label>
                        <input
                          type="number"
                          value={inputs.bowlingSkill}
                          onChange={(e) => handleInputChange('bowlingSkill', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          BOWLING MOVEMENT
                        </label>
                        <input
                          type="number"
                          value={inputs.bowlingMovement}
                          onChange={(e) => handleInputChange('bowlingMovement', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                          <Gamepad2 className="w-4 h-4" />
                          BOWLING AI
                        </label>
                        <input
                          type="number"
                          value={inputs.bowlingAI}
                          onChange={(e) => handleInputChange('bowlingAI', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <footer className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-cyan-500/10">
              <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-cyan-400 font-bold text-lg mb-2">Secure Encryption</h3>
              <p className="text-gray-400">AES-128-CBC military-grade encryption</p>
            </div>
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-cyan-500/10">
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-cyan-400 font-bold text-lg mb-2">Squad Management</h3>
              <p className="text-gray-400">Advanced cricket player editing</p>
            </div>
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-cyan-500/10">
              <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-cyan-400 font-bold text-lg mb-2">Fast Processing</h3>
              <p className="text-gray-400">Quick file operations</p>
            </div>
          </div>
          
          <div className="text-gray-500 text-sm">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-2">
              <span className="flex items-center gap-1"><Code className="w-4 h-4" /> Shiva</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Settings className="w-4 h-4" /> Nishad & Fluxon </span>
            </div>
            <p>RC 20 CRYPTER • Secure Edition</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
