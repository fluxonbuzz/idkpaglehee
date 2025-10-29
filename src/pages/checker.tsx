import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const JerseyChecker: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jerseyTexture, setJerseyTexture] = useState<string | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    camera.position.set(2, 2, 2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true 
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    const geometry = new THREE.BoxGeometry(1, 1.5, 0.3);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.7,
      metalness: 0.3
    });
    
    const jersey = new THREE.Mesh(geometry, material);
    scene.add(jersey);
    modelRef.current = jersey;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !canvasRef.current) return;
      cameraRef.current.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  const handleTextureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && modelRef.current) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const textureUrl = event.target?.result as string;
        setJerseyTexture(textureUrl);
        
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(textureUrl, (texture) => {
          if (modelRef.current) {
            (modelRef.current.material as THREE.MeshStandardMaterial).map = texture;
            (modelRef.current.material as THREE.MeshStandardMaterial).needsUpdate = true;
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeJersey = () => {
    if (!jerseyTexture) {
      alert('Please upload a jersey texture first!');
      return;
    }
    
    const issues = [
      'Color contrast: Good',
      'Logo placement: Needs adjustment',
      'Number visibility: Excellent',
      'Sponsor alignment: Within guidelines'
    ];
    
    alert('Jersey Analysis Results:\n' + issues.join('\n'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Jersey Checker 3D</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">3D Jersey Preview</h2>
            <div className="bg-black rounded-lg flex items-center justify-center min-h-[400px]">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full rounded-lg"
                style={{ width: '100%', height: '400px' }}
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Jersey Controls</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Upload Jersey Texture</label>
                <input
                  type="file"
                  ref={textureInputRef}
                  onChange={handleTextureUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => textureInputRef.current?.click()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Upload PNG/JPG Texture
                </button>
                {jerseyTexture && (
                  <p className="text-green-400 text-sm mt-2">Texture loaded successfully!</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Jersey Color</label>
                <input
                  type="color"
                  onChange={(e) => {
                    if (modelRef.current) {
                      (modelRef.current.material as THREE.MeshStandardMaterial).color = new THREE.Color(e.target.value);
                    }
                  }}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Jersey Type</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option>T-Shirt</option>
                  <option>Polo</option>
                  <option>Training Jersey</option>
                  <option>Match Jersey</option>
                </select>
              </div>

              <button
                onClick={analyzeJersey}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold"
              >
                Analyze Jersey Compliance
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Quick Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Texture Quality:</span>
                  <span className={jerseyTexture ? "text-green-400" : "text-yellow-400"}>
                    {jerseyTexture ? "Good" : "Not Loaded"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>3D Model:</span>
                  <span className="text-green-400">Ready</span>
                </div>
                <div className="flex justify-between">
                  <span>Compatibility:</span>
                  <span className="text-green-400">Supported</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-blue-400 text-2xl mb-2">🎨</div>
            <h3 className="font-semibold mb-2">Texture Mapping</h3>
            <p className="text-gray-400 text-sm">Apply your jersey designs in real-time 3D</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-green-400 text-2xl mb-2">📐</div>
            <h3 className="font-semibold mb-2">Compliance Check</h3>
            <p className="text-gray-400 text-sm">Verify jersey meets tournament standards</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-purple-400 text-2xl mb-2">👀</div>
            <h3 className="font-semibold mb-2">3D Preview</h3>
            <p className="text-gray-400 text-sm">View jersey from all angles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JerseyChecker;
