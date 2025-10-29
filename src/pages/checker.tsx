import React, { useEffect, useRef, useState } from 'react';

const CricketModelViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('main');

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleTextureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Texture file selected:', file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-red-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10">
        <div className="top-buttons flex justify-center items-center gap-6 mb-6 pt-4">
          <button className="text-white hover:text-red-400 transition-all duration-300 transform hover:scale-110">
            <Home size={28} />
          </button>
          <button className="text-white hover:text-red-400 transition-all duration-300 transform hover:scale-110">
            <FolderOpen size={28} />
          </button>
          <button className="text-white hover:text-red-400 transition-all duration-300 transform hover:scale-110">
            <Save size={28} />
          </button>
        </div>

        <div className="editor-container flex flex-col lg:flex-row justify-center items-start gap-6 bg-gray-800/80 backdrop-blur-sm p-6 mx-4 rounded-2xl border border-red-500/30">
          <div className="flex-1 max-w-4xl">
            <div className="bg-gray-900/80 rounded-xl p-4 border border-red-500/20">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                </div>
              ) : (
                <div className="w-full h-64 rounded-lg bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400">3D Model Viewer Area</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="column space-y-3">
              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Select Player</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none">
                  <option>Player 1</option>
                  <option>Player 2</option>
                  <option>Player 3</option>
                </select>
              </div>

              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Player Name</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                  placeholder="Enter player name"
                />
              </div>

              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Nationality</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none">
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Batting Hand</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none">
                  <option>Right Hand</option>
                  <option>Left Hand</option>
                </select>
              </div>

              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Batsman Type</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none">
                  <option>Defensive</option>
                  <option>Balanced</option>
                  <option>Radical</option>
                  <option>Brute</option>
                </select>
              </div>
            </div>

            <div className="column space-y-3">
              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Bowling Hand</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none">
                  <option>Right Hand</option>
                  <option>Left Hand</option>
                </select>
              </div>

              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Bowling Type</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none">
                  <option value="0">None</option>
                  <option value="1">Fast</option>
                  <option value="2">Medium</option>
                  <option value="3">Off Spin</option>
                  <option value="4">Leg Spin</option>
                  <option value="5">Chinaman</option>
                  <option value="6">Swing</option>
                </select>
              </div>

              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Batting Technique</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>

              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Batting Timing</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>

              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Batting Aggression</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>
            </div>

            <div className="column space-y-3">
              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Jersey No</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>

              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Keeping Skill</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>

              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">Test Position</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>

              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">ODI Position</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>

              <div className="row">
                <label className="block text-red-300 text-sm font-medium mb-1">T20 Position</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons flex justify-center gap-4 mt-6">
          <button 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
            onClick={() => textureInputRef.current?.click()}
          >
            <Upload size={20} />
            Import Texture
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2">
            <Shirt size={20} />
            Change Cap
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2">
            <Users size={20} />
            Accessories
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2">
            <Award size={20} />
            Collar
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2">
            <Target size={20} />
            Positions
          </button>
        </div>

        <input
          type="file"
          ref={textureInputRef}
          onChange={handleTextureUpload}
          accept="image/png"
          className="hidden"
        />

        <div className="footer text-center mt-8 pb-4">
          <p className="text-xl font-bold text-white">YOUR SUPPORT MEANS A LOT :)</p>
        </div>
      </div>
    </div>
  );
};

const Home = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const FolderOpen = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 14 1.5-2.9A2 2 0 0 1 9.2 10H19a2 2 0 0 1 1.8 2.9L18 20H6Z"/>
    <path d="M4 20h16"/>
    <path d="M2 10h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"/>
  </svg>
);

const Save = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

const Shirt = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
  </svg>
);

const Upload = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const Download = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const Users = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Zap = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const Target = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const Award = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const User = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const Flag = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
    <line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);

const Gamepad2 = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12"/>
    <line x1="8" y1="10" x2="8" y2="14"/>
    <line x1="15" y1="13" x2="15" y2="13"/>
    <line x1="18" y1="11" x2="18" y2="11"/>
    <rect x="2" y="6" width="20" height="12" rx="2"/>
  </svg>
);

const Settings = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const Sparkles = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/>
  </svg>
);

export default CricketModelViewer;
