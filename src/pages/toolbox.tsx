import { useState, useRef, ChangeEvent, useEffect } from "react";
import type { GetServerSideProps } from 'next';
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
  Key,
  Sparkles,
  AlertTriangle
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

type ToolboxProps = { isLicensed: boolean };

export default function RC20Crypter({ isLicensed }: ToolboxProps) {
  const [crypterMode, setCrypterMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [crypterStatus, setCrypterStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [crypterMessage, setCrypterMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLicenseValid, setIsLicenseValid] = useState(isLicensed);
  const [animatedBg, setAnimatedBg] = useState(true);
  const [permanentlyLocked] = useState(false);
  const [timeLeft] = useState(60_000);
  const [licenseKey, setLicenseKey] = useState('');
  const [deviceId, setDeviceId] = useState('');

  

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AesEncryptor.initialize();
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
        setDeviceId((h >>> 0).toString(16));
      } catch {}
    }
  }, []);

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleCrypterFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setCrypterStatus('processing');
    try {
      const buf = await readFileAsArrayBuffer(file);
      const out = crypterMode === 'encrypt' ? await AesEncryptor.encryptBuffer(buf) : await AesEncryptor.decryptBuffer(buf);
      const blob = new Blob([out]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${crypterMode === 'encrypt' ? 'encrypted_' : 'decrypted_'}${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
      setCrypterMessage(crypterMode === 'encrypt' ? '✅ File encrypted successfully' : '✅ File decrypted successfully');
      setCrypterStatus('success');
    } catch (err) {
      setCrypterMessage('❌ Operation failed. Please check the file.');
      setCrypterStatus('error');
    }
  };

  const handleLicenseSubmit = async () => {
    try {
      const res = await fetch('/api/license/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: licenseKey, deviceId: deviceId || undefined })
      });
      if (!res.ok) throw new Error('Invalid');
      setIsLicenseValid(true);
    } catch {
      alert('❌ Invalid or expired license key');
    }
  };

  if (permanentlyLocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-red-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen relative z-10">
          <div className="bg-gray-800/90 border border-red-500/50 rounded-2xl p-8 max-w-md w-full backdrop-blur-sm">
            <div className="text-center mb-6">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Access Permanently Revoked</h2>
              <p className="text-gray-400 mb-4">You failed to enter the valid license key within the time limit.</p>
            </div>
          </div>
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
              <input type="text" value={licenseKey} onChange={(e: ChangeEvent<HTMLInputElement>) => setLicenseKey(e.target.value)} placeholder="Enter license key" className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all" />
              <div className="text-xs text-gray-400">Device ID: {deviceId || 'detecting...'}</div>
              <button onClick={handleLicenseSubmit} className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all">Activate License</button>
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
      <div className="absolute top-4 right-4 z-10">
        <button onClick={() => setAnimatedBg(!animatedBg)} className="bg-gray-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-gray-700/80 transition-all">
          <Sparkles className="w-4 h-4" />{animatedBg ? 'Disable Effects' : 'Enable Effects'}
        </button>
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-cyan-400 mr-4" />
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">RC 20 CRYPTER</h1>
          </div>
          <p className="text-xl text-gray-400 mb-2">AES-Powered Secure File Encryption</p>
        </header>
        
        {
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">Secure File Encryption</h2>
                <p className="text-gray-400">Protect your files with AES-128-CBC encryption</p>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 mb-6">
                  <button onClick={() => setCrypterMode('encrypt')} className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${crypterMode === 'encrypt' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-400 hover:text-white'}`}>
                    <Lock className="w-5 h-5" /> Encrypt
                  </button>
                  <button onClick={() => setCrypterMode('decrypt')} className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${crypterMode === 'decrypt' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' : 'bg-gray-700/50 text-gray-400 hover:text-white'}`}>
                    <Unlock className="w-5 h-5" /> Decrypt
                  </button>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleCrypterFileUpload} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} disabled={crypterStatus === 'processing'} className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2">
                  {crypterStatus === 'processing' ? (<><div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>Processing...</>) : (<><Upload className="w-5 h-5" /> Select File to {crypterMode === 'encrypt' ? 'Encrypt' : 'Decrypt'}</>)}
                </button>
                {crypterStatus !== 'idle' && (<div className={`p-4 rounded-xl text-center font-semibold ${crypterStatus === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/40' : crypterStatus === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'}`}>{crypterMessage}</div>)}
              </div>
            </div>
          </div>
        }
        

        <footer className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-cyan-500/10">
              <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-cyan-400 font-bold text-lg mb-2">Secure Encryption</h3>
              <p className="text-gray-400">AES-128-CBC military-grade encryption</p>
            </div>
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-cyan-500/10">
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-cyan-400 font-bold text-lg mb-2">License Admin</h3>
              <p className="text-gray-400">Generate and manage device-bound keys</p>
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

export const getServerSideProps: GetServerSideProps<ToolboxProps> = async (ctx) => {
  const token = ctx.req.cookies?.['license_session'];
  const sessionKey = process.env.LICENSE_SESSION_KEY;
  let isLicensed = false;
  if (token && sessionKey) {
    const { verifySessionCookie } = await import('@/lib/license');
    const result = verifySessionCookie(token, sessionKey);
    isLicensed = result.valid === true;
  }
  return { props: { isLicensed } };
};
