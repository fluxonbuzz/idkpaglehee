import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Home, 
  FolderOpen, 
  Save,
  Shirt,
  Upload,
  Download,
  Users,
  Zap,
  Target,
  Award,
  User,
  Flag,
  Gamepad2,
  Settings,
  Sparkles
} from 'lucide-react';

const CricketModelViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('main');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentModelRef = useRef<THREE.Group | null>(null);
  const currentTextureRef = useRef<THREE.Texture | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      controlsRef.current?.update();
      rendererRef.current?.render(scene, camera);
    };
    animate();

    setIsLoading(false);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const loadModel = (modelData: string) => {
    if (!sceneRef.current || !currentModelRef.current) return;
    
    sceneRef.current.remove(currentModelRef.current);
    
    const loader = new GLTFLoader();
    try {
      const gltf = loader.parse(JSON.parse(modelData), '');
      const model = gltf.scene;
      sceneRef.current.add(model);
      currentModelRef.current = model;
    } catch (error) {
      console.error('Error loading model:', error);
    }
  };

  const applyTexture = (file: File) => {
    if (!currentModelRef.current) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const texture = new THREE.TextureLoader().load(e.target?.result as string);
      if (currentTextureRef.current) {
        currentTextureRef.current.dispose();
      }
      currentTextureRef.current = texture;

      currentModelRef.current?.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const handleTextureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) applyTexture(file);
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
                <canvas ref={canvasRef} className="w-full h-64 rounded-lg" />
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
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2">
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

      <style jsx>{`
        .top-buttons i {
          font-size: 30px;
          cursor: pointer;
          color: white;
          transition: color 0.3s ease, transform 0.2s ease;
        }

        .top-buttons i:hover {
          color: #ff4444;
          transform: scale(1.1);
        }

        .editor-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;
          gap: 30px;
          background-color: #2a2a2a;
          padding: 30px 40px;
          border-radius: 14px;
          box-shadow: 0 0 18px #000;
          width: 95%;
          max-width: 1700px;
          margin: 0 auto;
        }

        .column {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 280px;
        }

        .row {
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 13px;
          color: #ff6b6b;
          margin-bottom: 4px;
        }

        select, input {
          width: 100%;
          padding: 8px 12px;
          font-size: 13px;
          background: linear-gradient(to bottom, #c0c0c0, #8f8f8f);
          border: none;
          border-radius: 6px;
          color: #000;
        }

        .footer {
          margin-top: 25px;
          font-weight: bold;
          font-size: 18px;
          color: white;
          text-align: center;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .editor-container {
            flex-direction: column;
            align-items: center;
          }
          
          .action-buttons {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};

export default CricketModelViewer;
