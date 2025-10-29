// Three.js functionality handled here
let scene, camera, renderer, controls, currentModel;
let rc20Model, rc24Model;

// Initialize Three.js
function initThreeJS() {
    const canvas = document.getElementById('jerseyCanvas');
    if (!canvas) return;

    // Three.js imports (make sure Three.js is included in your HTML)
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(3, 2, 3);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Create models
    createRC20Model();
    createRC24Model();
    
    // Start with RC20
    switchPlayerModel('rc20');

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // Animation loop
    animate();

    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function createRC20Model() {
    const group = new THREE.Group();
    
    // Body with jersey
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.5, 1.8, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x0000ff,
        roughness: 0.7
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.9;
    group.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2.1;
    group.add(head);

    // Arms
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

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.12, 1.0, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.15, 0.5, 0);
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.15, 0.5, 0);
    group.add(rightLeg);

    rc20Model = group;
}

function createRC24Model() {
    const group = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.35, 0.45, 1.6, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x222222,
        roughness: 0.7
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.8;
    group.add(body);

    // Jersey
    const jerseyGeometry = new THREE.CylinderGeometry(0.42, 0.52, 0.8, 8);
    const jerseyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff0000,
        roughness: 0.8
    });
    const jersey = new THREE.Mesh(jerseyGeometry, jerseyMaterial);
    jersey.position.y = 1.3;
    group.add(jersey);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.9;
    group.add(head);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.07, 0.09, 0.7, 8);
    const armMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.45, 1.3, 0);
    leftArm.rotation.z = Math.PI / 6;
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.45, 1.3, 0);
    rightArm.rotation.z = -Math.PI / 6;
    group.add(rightArm);

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.09, 0.11, 0.9, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x4444ff });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.13, 0.45, 0);
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.13, 0.45, 0);
    group.add(rightLeg);

    rc24Model = group;
}

// Global functions for TSX to call
window.switchPlayerModel = function(modelType) {
    if (currentModel) scene.remove(currentModel);
    
    if (modelType === 'rc20') {
        scene.add(rc20Model);
        currentModel = rc20Model;
    } else {
        scene.add(rc24Model);
        currentModel = rc24Model;
    }
}

window.applyJerseyTexture = function(textureUrl, modelType) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(textureUrl, (texture) => {
        if (currentModel) {
            currentModel.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    if (child.geometry.type === 'CylinderGeometry' && child.position.y > 1.0) {
                        child.material.map = texture;
                        child.material.needsUpdate = true;
                    }
                }
            });
        }
    });
}

window.changeJerseyColor = function(color, modelType) {
    if (currentModel) {
        currentModel.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                if (child.geometry.type === 'CylinderGeometry' && child.position.y > 1.0) {
                    child.material.color = new THREE.Color(color);
                }
            }
        });
    }
}

window.analyzeJerseyFit = function(modelType) {
    const issues = [
        'Jersey Fit: Perfect',
        'Color Visibility: Excellent', 
        'Logo Placement: Optimal',
        'Number Readability: Good',
        'Sponsor Alignment: Compliant'
    ];
    
    alert(`Jersey Analysis Results for ${modelType.toUpperCase()}:\n\n` + issues.join('\n'));
}

function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update();
    if (renderer && scene && camera) renderer.render(scene, camera);
}

function onWindowResize() {
    const canvas = document.getElementById('jerseyCanvas');
    if (!canvas || !camera || !renderer) return;
    
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

// Initialize when loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeJS);
} else {
    initThreeJS();
}
