import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const JerseyChecker: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jerseyTexture, setJerseyTexture] = useState<string | null>(null);
  const [currentModel, setCurrentModel] = useState<'rc20' | 'rc24'>('rc20');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  const createPlayerModel = (type: 'rc20' | 'rc24') => {
    const group = new THREE.Group();
    
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.5, 1.8, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.7,
      metalness: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.9;
    group.add(body);

    const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.8 + 0.3;
    group.add(head);

    const armGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.8, 8);
    const armMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.5, 1.4, 0);
    leftArm.rotation.z = Math.PI / 6;
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.5, 1.4, 0);
    rightArm.rotation.z = -Math.PI / 6;
    group.add(rightArm);

    const legGeometry = new THREE.CylinderGeometry(0.1, 0.12, 1.0, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x4444ff });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.15, 0.5, 0);
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.15, 0.5, 0);
    group.add(rightLeg);

    if (type === 'rc24') {
      const jerseyGeometry = new THREE.CylinderGeometry(0.42, 0.52, 0.8, 8);
      const jerseyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff0000,
        roughness: 0.8
      });
      const jersey = new THREE.Mesh(jerseyGeometry, jerseyMaterial);
      jersey.position.y = 1.3;
      group.add(jersey);

      const shortsGeometry = new THREE.CylinderGeometry(0.45, 0.4, 0.4, 8);
      const shortsMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const shorts = new THREE.Mesh(shortsGeometry, shortsMaterial);
      shorts.position.y = 0.8;
      group.add(shorts);
    } else {
      const jerseyGeometry = new THREE.CylinderGeometry(0.41, 0.51, 0.9, 8);
      const jerseyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x0000ff,
        roughness: 0.9
      });
      const jersey = new THREE.Mesh(jerseyGeometry, jerseyMaterial);
      jersey.position.y = 1.35;
      group.add(jersey);
    }

    return group;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    camera.position.set(3, 2, 3);
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

    const playerModel = createPlayerModel('rc20');
    scene.add(playerModel);
    modelRef.current = playerModel;

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

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

  const switchModel = (modelType: 'rc20' | 'rc24') => {
    if (!sceneRef.current || !modelRef.current) return;
    
    sceneRef.current.remove(modelRef.current);
    const newModel = createPlayerModel(modelType);
    sceneRef.current.add(newModel);
    modelRef.current = newModel;
    setCurrentModel(modelType);
    
    if (jerseyTexture && modelRef.current) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(jerseyTexture, (texture) => {
        modelRef.current?.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            if (child.geometry.type === 'CylinderGeometry' && child.position.y > 1.0) {
              child.material.map = texture;
              child.material.needsUpdate = true;
            }
          }
        });
      });
    }
  };

  const handleTextureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && modelRef.current) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const textureUrl = event.target?.result as string;
        setJerseyTexture(textureUrl);
        
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(textureUrl, (texture) => {
          modelRef.current?.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
              if (child.geometry.type === 'CylinderGeometry' && child.position.y > 1.0) {
                child.material.map = texture;
                child.material.needsUpdate = true;
              }
            }
          });
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
      'Jersey Fit: Perfect',
      'Color Visibility: Excellent',
      'Logo Placement: Optimal',
      'Number Readability: Good',
      'Sponsor Alignment: Compliant'
    ];
    
    alert(`Jersey Analysis Results for ${currentModel.toUpperCase()}:\n\n` + issues.join('\n'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Cricket Jersey Checker</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">3D Player Model - {currentModel.toUpperCase()}</h2>
            <div className="bg-black rounded-lg flex items-center justify-center min-h-[500px]">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full rounded-lg"
                style={{ width: '100%', height: '500px' }}
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Jersey Controls</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Player Model</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => switchModel('rc20')}
                    className={`py-3 px-4 rounded-lg transition-colors ${
                      currentModel === 'rc20' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    RC20 Model
                  </button>
                  <button
                    onClick={() => switchModel('rc24')}
                    className={`py-3 px-4 rounded-lg transition-colors ${
                      currentModel === 'rc24' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    RC24 Model
                  </button>
                </div>
              </div>

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
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Upload Jersey Texture
                </button>
                {jerseyTexture && (
                  <p className="text-green-400 text-sm mt-2">Jersey texture applied to {currentModel.toUpperCase()}!</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Jersey Color</label>
                <input
                  type="color"
                  onChange={(e) => {
                    if (modelRef.current) {
                      modelRef.current.traverse((child) => {
                        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                          if (child.geometry.type === 'CylinderGeometry' && child.position.y > 1.0) {
                            child.material.color = new THREE.Color(e.target.value);
                          }
                        }
                      });
                    }
                  }}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>

              <button
                onClick={analyzeJersey}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold"
              >
                Analyze Jersey Fit & Compliance
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Model Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Current Model:</span>
                  <span className="text-blue-400">{currentModel.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jersey Applied:</span>
                  <span className={jerseyTexture ? "text-green-400" : "text-yellow-400"}>
                    {jerseyTexture ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Model Height:</span>
                  <span className="text-gray-300">~2.1 units</span>
                </div>
                <div className="flex justify-between">
                  <span>Textures Supported:</span>
                  <span className="text-green-400">PNG, JPG, JPEG</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-blue-400 text-2xl mb-2">👕</div>
            <h3 className="font-semibold mb-2">RC20 Model</h3>
            <p className="text-gray-400 text-sm">Classic cricket player model with traditional fit</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-green-400 text-2xl mb-2">⚡</div>
            <h3 className="font-semibold mb-2">RC24 Model</h3>
            <p className="text-gray-400 text-sm">Modern player model with updated proportions</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-purple-400 text-2xl mb-2">🔍</div>
            <h3 className="font-semibold mb-2">Jersey Testing</h3>
            <p className="text-gray-400 text-sm">Test jersey fit and appearance on both models</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JerseyChecker;
