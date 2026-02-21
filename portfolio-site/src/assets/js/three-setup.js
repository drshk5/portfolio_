// ============================================
// THREE.JS 3D SCENE SETUP - SPACE WITH ASTEROIDS
// ============================================

let scene, camera, renderer, asteroids = [];

function initThreeJS() {
    // Scene Setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // Camera Setup
    const canvas = document.getElementById('canvas-3d');
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );
    camera.position.z = 100;

    // Renderer Setup
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add Nebula/Space Background
    addNebula();

    // Add Stars
    addStars();

    // Add Asteroids
    createAsteroids();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4488ff, 1);
    pointLight.position.set(100, 100, 100);
    scene.add(pointLight);

    // Mouse Interaction
    setupMouseInteraction();

    // Handle Window Resize
    window.addEventListener('resize', onWindowResize);

    // Start Animation Loop
    animate();
}

function addNebula() {
    // Create nebula background texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Create gradient nebula
    const gradient = ctx.createRadialGradient(512, 512, 100, 512, 512, 800);
    gradient.addColorStop(0, 'rgba(100, 150, 255, 0.3)');
    gradient.addColorStop(0.5, 'rgba(75, 0, 150, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 50, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);

    // Add noise
    const imageData = ctx.getImageData(0, 0, 1024, 1024);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 30;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise * 1.5;
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    const geometry = new THREE.SphereGeometry(1000, 64, 64);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide
    });
    const nebula = new THREE.Mesh(geometry, material);
    scene.add(nebula);
}

function addStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.7,
        sizeAttenuation: true
    });

    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(starsVertices), 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

function createAsteroids() {
    const asteroidCount = 6;
    const positions = [
        { x: -150, y: 80, z: -50 },
        { x: 150, y: -100, z: -40 },
        { x: -100, y: -150, z: 30 },
        { x: 120, y: 120, z: 20 },
        { x: -120, y: 60, z: 60 },
        { x: 100, y: -80, z: -60 }
    ];

    for (let i = 0; i < asteroidCount; i++) {
        const asteroid = createAsteroid(positions[i]);
        asteroids.push(asteroid);
        scene.add(asteroid);
    }
}

function createAsteroid(position) {
    // Create irregular asteroid shape
    const geometry = new THREE.IcosahedronGeometry(
        Math.random() * 15 + 10,
        Math.floor(Math.random() * 2 + 3)
    );

    // Displace vertices for irregular shape
    const positionAttribute = geometry.getAttribute('position');
    for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = positionAttribute.getZ(i);

        positionAttribute.setXYZ(
            i,
            x * (0.8 + Math.random() * 0.4),
            y * (0.8 + Math.random() * 0.4),
            z * (0.8 + Math.random() * 0.4)
        );
    }
    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();

    // Material
    const material = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.8,
        metalness: 0.2,
        emissive: 0x111111
    });

    const asteroid = new THREE.Mesh(geometry, material);
    asteroid.position.set(position.x, position.y, position.z);
    asteroid.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );

    // Store rotation speeds
    asteroid.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
    };

    // Orbit data
    asteroid.orbitRadius = Math.sqrt(
        position.x * position.x + position.y * position.y
    );
    asteroid.orbitSpeed = Math.random() * 0.0005 + 0.0002;
    asteroid.orbitAngle = Math.atan2(position.y, position.x);

    return asteroid;
}

function setupMouseInteraction() {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Subtle camera movement
        camera.position.x = mouseX * 10;
        camera.position.y = mouseY * 10;
        camera.lookAt(0, 0, 0);
    });
}

function animate() {
    requestAnimationFrame(animate);

    // Animate asteroids
    asteroids.forEach((asteroid) => {
        // Rotate
        asteroid.rotation.x += asteroid.rotationSpeed.x;
        asteroid.rotation.y += asteroid.rotationSpeed.y;
        asteroid.rotation.z += asteroid.rotationSpeed.z;

        // Orbit
        asteroid.orbitAngle += asteroid.orbitSpeed;
        asteroid.position.x = Math.cos(asteroid.orbitAngle) * asteroid.orbitRadius;
        asteroid.position.y = Math.sin(asteroid.orbitAngle) * (asteroid.orbitRadius * 0.6);
    });

    renderer.render(scene, camera);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeJS);
} else {
    initThreeJS();
}
