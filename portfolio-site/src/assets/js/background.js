// ============================================================
//  SPACE SCENE — Three.js
//  Elements: nebula, stars, Earth + atmosphere, spaceship, asteroids
// ============================================================

let scene, camera, renderer;
let earth, earthGroup, spaceship, spaceshipGroup;
let asteroids = [];
let mx = 0, my = 0;

function initBackground() {
    const canvas = document.getElementById('canvas');
    if (!canvas || !window.THREE) return;

    // ── Scene ──────────────────────────────────────────────
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020408);

    // ── Camera ─────────────────────────────────────────────
    camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 10000);
    camera.position.set(0, 0, 280);

    // ── Renderer ───────────────────────────────────────────
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // ── Lighting ───────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x112244, 0.8));

    const sun = new THREE.DirectionalLight(0xfff5e0, 2.5);
    sun.position.set(400, 300, 200);
    scene.add(sun);

    const teal = new THREE.PointLight(0x00c8ff, 1.0, 2000);
    teal.position.set(200, 100, 100);
    scene.add(teal);

    const purple = new THREE.PointLight(0x8844ff, 0.6, 1200);
    purple.position.set(-200, 200, -100);
    scene.add(purple);

    // ── Build scene objects ────────────────────────────────
    createNebula();
    createStars();
    createEarth();
    createSpaceship();
    createAsteroids();

    // ── Input ──────────────────────────────────────────────
    document.addEventListener('mousemove', e => {
        mx = (e.clientX / innerWidth)  * 2 - 1;
        my = -(e.clientY / innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
    });

    animate();
}

// ── NEBULA ───────────────────────────────────────────────────
function createNebula() {
    const c = document.createElement('canvas');
    c.width = c.height = 2048;
    const ctx = c.getContext('2d');

    ctx.fillStyle = '#020408';
    ctx.fillRect(0, 0, 2048, 2048);

    function radial(cx, cy, r0, r1, stops) {
        const g = ctx.createRadialGradient(cx, cy, r0, cx, cy, r1);
        stops.forEach(([t, col]) => g.addColorStop(t, col));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 2048, 2048);
    }

    radial(1350, 750,  40, 700, [[0,'rgba(0,220,255,.70)'],[.3,'rgba(0,160,240,.40)'],[.7,'rgba(0,80,180,.15)'],[1,'rgba(0,0,0,0)']]);
    radial(1050, 1300, 30, 560, [[0,'rgba(0,200,240,.45)'],[.5,'rgba(0,120,200,.20)'],[1,'rgba(0,0,0,0)']]);
    radial(1700, 650,  20, 520, [[0,'rgba(140,30,255,.50)'],[.4,'rgba(90,10,200,.25)'],[1,'rgba(0,0,0,0)']]);
    radial(1500, 1000,100,1200, [[0,'rgba(20,80,160,.28)'],[.6,'rgba(10,40,100,.10)'],[1,'rgba(0,0,0,0)']]);
    radial(1320, 720,   5,  80, [[0,'rgba(255,255,255,.90)'],[.3,'rgba(180,240,255,.40)'],[1,'rgba(0,0,0,0)']]);

    const geo = new THREE.IcosahedronGeometry(2500, 5);
    const mat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), side: THREE.BackSide, depthWrite: false });
    scene.add(new THREE.Mesh(geo, mat));
}

// ── STARS ────────────────────────────────────────────────────
function createStars() {
    function layer(count, size, color) {
        const geo = new THREE.BufferGeometry();
        const v   = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) v[i] = (Math.random() - 0.5) * 5000;
        geo.setAttribute('position', new THREE.BufferAttribute(v, 3));
        scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color, size, sizeAttenuation: true })));
    }
    layer(2500, 0.9, 0xaabbcc);
    layer(120,  2.8, 0xffffff);
    layer(40,   4.5, 0xccddff);
}

// ── EARTH ────────────────────────────────────────────────────
function createEarth() {
    earthGroup = new THREE.Group();
    earthGroup.position.set(220, -180, -120);

    // ── Earth texture (canvas-drawn) ──────────────────────
    const c   = document.createElement('canvas');
    c.width   = 2048;
    c.height  = 1024;
    const ctx = c.getContext('2d');

    // Ocean base
    const oceanGrad = ctx.createLinearGradient(0, 0, 2048, 1024);
    oceanGrad.addColorStop(0,   '#061e3c');
    oceanGrad.addColorStop(0.4, '#0a3a6e');
    oceanGrad.addColorStop(0.7, '#0d4a8a');
    oceanGrad.addColorStop(1,   '#061e3c');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Shallow seas
    ctx.fillStyle = 'rgba(20,100,160,0.4)';
    ctx.beginPath(); ctx.ellipse(820, 480, 180, 100, 0.2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(1500, 520, 140, 80, -0.1, 0, Math.PI*2); ctx.fill();

    // Draw continents
    function blob(x, y, rx, ry, rot, col, alpha=1) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = col;
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
    }

    const land   = '#2a5c18';
    const land2  = '#347020';
    const desert = '#8a6a22';
    const ice    = '#d8eef8';

    // North America
    blob(380, 280, 140, 180, -0.3, land);
    blob(340, 200, 80,  60, -0.2, land2);
    blob(480, 380, 60,  90,  0.4, land);
    blob(380, 420, 50,  40,  0.1, desert, 0.7);

    // South America
    blob(430, 580, 70, 160,  0.2, land);
    blob(410, 650, 50, 100,  0.1, land2);

    // Europe
    blob(960, 240, 90,  70, -0.1, land2);
    blob(1020,200, 60,  40,  0.3, land);

    // Africa
    blob(980, 480, 110, 200,  0.05, land);
    blob(980, 480, 110, 200,  0.05, desert, 0.4);
    blob(960, 360, 70,   60,  0.1, land2);

    // Asia
    blob(1350, 260, 320, 180, -0.1, land);
    blob(1250, 200, 140,  90, -0.2, land2);
    blob(1500, 300, 160, 120,  0.1, land);
    blob(1380, 320, 120,  80,  0.0, desert, 0.5);
    blob(1600, 220,  80,  50,  0.2, land2);

    // India
    blob(1250, 420,  60, 100,  0.1, land);

    // SE Asia / Indonesia (dots)
    [1480,1520,1560,1600].forEach((x,i) => blob(x, 480+i*10, 25, 18, 0, land));

    // Australia
    blob(1660, 650, 110,  80,  0.1, desert);
    blob(1620, 620,  80,  60,  0.1, land, 0.6);

    // Greenland
    blob(580, 160, 70, 50, -0.2, ice, 0.8);

    // Antarctica
    ctx.fillStyle = ice;
    ctx.fillRect(0, 940, 2048, 84);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = ice;
    ctx.fillRect(0, 920, 2048, 40);
    ctx.globalAlpha = 1;

    // North pole ice
    ctx.fillStyle = ice;
    ctx.fillRect(0, 0, 2048, 35);
    ctx.globalAlpha = 0.6;
    ctx.fillRect(0, 0, 2048, 60);
    ctx.globalAlpha = 1;

    // Clouds
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    function cloud(cx, cy, w, h) {
        ctx.beginPath(); ctx.ellipse(cx, cy, w, h, Math.random()*0.5, 0, Math.PI*2); ctx.fill();
    }
    cloud(300, 350, 200, 25); cloud(700, 280, 250, 20); cloud(1100, 400, 180, 22);
    cloud(600,  600, 220, 18); cloud(1400, 500, 200, 24); cloud(1700, 300, 160, 20);
    cloud(200,  500, 150, 16); cloud(900,  700, 190, 22); cloud(1550, 650, 140, 18);

    // Ocean glint
    const glint = ctx.createRadialGradient(700, 400, 0, 700, 400, 400);
    glint.addColorStop(0, 'rgba(100,180,255,0.12)');
    glint.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glint;
    ctx.fillRect(0, 0, 2048, 1024);

    // ── Sphere ────────────────────────────────────────────
    const earthGeo = new THREE.SphereGeometry(110, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
        map:           new THREE.CanvasTexture(c),
        roughness:     0.65,
        metalness:     0.05,
    });
    earth = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earth);

    // ── Atmosphere (outer glow) ───────────────────────────
    const atmGeo = new THREE.SphereGeometry(116, 64, 64);
    const atmMat = new THREE.MeshLambertMaterial({
        color:       0x4499ff,
        transparent: true,
        opacity:     0.12,
        side:        THREE.FrontSide,
        depthWrite:  false,
    });
    earthGroup.add(new THREE.Mesh(atmGeo, atmMat));

    // ── Outer atmosphere halo ─────────────────────────────
    const haloGeo = new THREE.SphereGeometry(125, 32, 32);
    const haloMat = new THREE.MeshLambertMaterial({
        color:       0x2266cc,
        transparent: true,
        opacity:     0.06,
        side:        THREE.BackSide,
        depthWrite:  false,
    });
    earthGroup.add(new THREE.Mesh(haloGeo, haloMat));

    // ── Cloud layer ───────────────────────────────────────
    const cloudC   = document.createElement('canvas');
    cloudC.width   = 2048;
    cloudC.height  = 1024;
    const cctx     = cloudC.getContext('2d');
    cctx.fillStyle = 'transparent';
    cctx.clearRect(0, 0, 2048, 1024);
    cctx.fillStyle = 'rgba(255,255,255,0.55)';
    function cloudPatch(x, y, w, h) {
        cctx.beginPath(); cctx.ellipse(x,y,w,h,Math.random()*0.8,0,Math.PI*2); cctx.fill();
    }
    cloudPatch(200,300,180,22); cloudPatch(600,250,240,18); cloudPatch(1000,380,200,20);
    cloudPatch(500,600,210,16); cloudPatch(1300,480,180,22); cloudPatch(1700,280,150,18);
    cloudPatch(350,500,160,14); cloudPatch(850,700,200,20);  cloudPatch(1550,620,170,16);
    cloudPatch(1850,500,200,20); cloudPatch(100,700,140,15);

    const cloudGeo = new THREE.SphereGeometry(112, 48, 48);
    const cloudMat = new THREE.MeshLambertMaterial({
        map:          new THREE.CanvasTexture(cloudC),
        transparent:  true,
        opacity:      0.55,
        depthWrite:   false,
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    clouds.userData.isCloud = true;
    earthGroup.add(clouds);

    scene.add(earthGroup);
}

// ── SPACESHIP ────────────────────────────────────────────────
function createSpaceship() {
    spaceshipGroup = new THREE.Group();
    spaceshipGroup.position.set(-200, 130, -60);
    spaceshipGroup.rotation.y = 0.4;
    spaceshipGroup.rotation.z = 0.08;

    const metal = new THREE.MeshStandardMaterial({ color: 0x8899aa, roughness: 0.25, metalness: 0.85 });
    const dark  = new THREE.MeshStandardMaterial({ color: 0x445566, roughness: 0.4,  metalness: 0.7  });
    const glass = new THREE.MeshStandardMaterial({ color: 0x88bbdd, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.75 });
    const glow  = new THREE.MeshStandardMaterial({ color: 0x00aaff, emissive: 0x0044aa, emissiveIntensity: 1.5, roughness: 0.2, metalness: 0.8 });

    // Main fuselage (horizontal cylinder)
    const hull = new THREE.Mesh(new THREE.CylinderGeometry(5, 7, 55, 12), metal);
    hull.rotation.z = Math.PI / 2;
    spaceshipGroup.add(hull);

    // Nose cone
    const nose = new THREE.Mesh(new THREE.ConeGeometry(5, 20, 12), metal);
    nose.rotation.z = -Math.PI / 2;
    nose.position.x = 37;
    spaceshipGroup.add(nose);

    // Cockpit dome
    const cockpit = new THREE.Mesh(new THREE.SphereGeometry(6, 16, 16, 0, Math.PI*2, 0, Math.PI/2), glass);
    cockpit.rotation.z = -Math.PI / 2;
    cockpit.position.x = 22;
    cockpit.position.y = 4;
    spaceshipGroup.add(cockpit);

    // Wings
    function wing(x, y, z, rx) {
        const geo = new THREE.BoxGeometry(28, 1.5, 16);
        const w   = new THREE.Mesh(geo, dark);
        w.position.set(x, y, z);
        w.rotation.x = rx;
        spaceshipGroup.add(w);
    }
    wing(-5,  -4,  16,  0.15);
    wing(-5,  -4, -16, -0.15);

    // Wing tips
    function wingtip(z) {
        const t = new THREE.Mesh(new THREE.BoxGeometry(12, 0.8, 4), metal);
        t.position.set(-16, -3.5, z);
        spaceshipGroup.add(t);
    }
    wingtip( 22); wingtip(-22);

    // Engine nacelles
    function nacelle(z) {
        const body = new THREE.Mesh(new THREE.CylinderGeometry(3, 3.5, 20, 10), dark);
        body.rotation.z = Math.PI / 2;
        body.position.set(-22, -5, z);
        spaceshipGroup.add(body);

        const bell = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 5, 6, 10), metal);
        bell.rotation.z = Math.PI / 2;
        bell.position.set(-32, -5, z);
        spaceshipGroup.add(bell);

        const flame = new THREE.Mesh(new THREE.ConeGeometry(3, 12, 10), glow);
        flame.rotation.z = Math.PI / 2;
        flame.position.set(-40, -5, z);
        spaceshipGroup.add(flame);

        const light = new THREE.PointLight(0x00aaff, 1.5, 60);
        light.position.set(-42, -5, z);
        spaceshipGroup.add(light);
    }
    nacelle( 12);
    nacelle(-12);

    // Antenna
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 14, 6), metal);
    antenna.position.set(10, 11, 0);
    spaceshipGroup.add(antenna);

    const dish = new THREE.Mesh(new THREE.SphereGeometry(2.5, 10, 10, 0, Math.PI*2, 0, Math.PI/2), metal);
    dish.position.set(10, 18, 0);
    spaceshipGroup.add(dish);

    // Panels (solar)
    function panel(x, z) {
        const p = new THREE.Mesh(new THREE.BoxGeometry(18, 0.4, 7), new THREE.MeshStandardMaterial({
            color: 0x223355, roughness: 0.3, metalness: 0.6
        }));
        p.position.set(x, 0, z);
        spaceshipGroup.add(p);
    }
    panel(2,  25);
    panel(2, -25);

    scene.add(spaceshipGroup);
}

// ── ASTEROIDS ─────────────────────────────────────────────────
function createAsteroids() {
    const positions = [
        { x: -310, y:  210, z: -100 },
        { x:  280, y:  160, z:  -80 },
        { x: -200, y: -140, z:   60 },
        { x:  240, y: -100, z: -120 },
        { x: -250, y:   80, z:  100 },
        { x:  190, y:  -80, z: -140 },
    ];
    positions.forEach(pos => {
        const a = makeAsteroid(pos);
        asteroids.push(a);
        scene.add(a);
    });
}

function makeAsteroid(position) {
    const size = 28 + Math.random() * 40;
    const geo  = new THREE.IcosahedronGeometry(size, 3);
    const attr = geo.getAttribute('position');
    for (let i = 0; i < attr.count; i++) {
        const s = 0.65 + Math.random() * 0.55;
        attr.setXYZ(i, attr.getX(i)*s, attr.getY(i)*s, attr.getZ(i)*s);
    }
    attr.needsUpdate = true;
    geo.computeVertexNormals();

    const col = new THREE.Color().setHSL(0.06 + Math.random()*0.05, 0.08, 0.14 + Math.random()*0.08);
    const mat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.96, metalness: 0.04 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(position.x, position.y, position.z);
    mesh.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
    mesh.castShadow = true;
    mesh.rotationSpeed = {
        x: (Math.random()-0.5)*0.0025,
        y: (Math.random()-0.5)*0.0025,
        z: (Math.random()-0.5)*0.0025
    };
    mesh.orbitRadius = Math.sqrt(position.x**2 + position.y**2);
    mesh.orbitSpeed  = 0.00002 + Math.random()*0.00005;
    mesh.orbitAngle  = Math.atan2(position.y, position.x);
    return mesh;
}

// ── ANIMATION LOOP ────────────────────────────────────────────
let t = 0;
function animate() {
    requestAnimationFrame(animate);
    t += 0.005;

    const scrollProg = window.scrollProgress || 0;

    // Camera parallax
    camera.position.x += (mx*25 - camera.position.x) * 0.04;
    camera.position.y += (my*15 - scrollProg*80 - camera.position.y) * 0.04;
    camera.position.z += (280 - scrollProg*30 - camera.position.z) * 0.04;

    // Earth rotation
    if (earth) {
        earth.rotation.y += 0.0015;
        earthGroup.children.forEach(child => {
            if (child.userData.isCloud) child.rotation.y += 0.0018; // clouds drift faster
        });
        // Gentle float
        earthGroup.position.y = -180 + Math.sin(t * 0.3) * 4;
    }

    // Spaceship movement
    if (spaceshipGroup) {
        spaceshipGroup.position.y = 130 + Math.sin(t * 0.4) * 8;
        spaceshipGroup.position.x = -200 + Math.cos(t * 0.15) * 12;
        spaceshipGroup.rotation.z = 0.08 + Math.sin(t * 0.4) * 0.03;
    }

    // Asteroids
    asteroids.forEach(a => {
        a.rotation.x += a.rotationSpeed.x;
        a.rotation.y += a.rotationSpeed.y;
        a.rotation.z += a.rotationSpeed.z;
        a.orbitAngle += a.orbitSpeed;
        a.position.x = Math.cos(a.orbitAngle) * a.orbitRadius;
        a.position.y = Math.sin(a.orbitAngle) * (a.orbitRadius * 0.45) - scrollProg * 60;
    });

    renderer.render(scene, camera);
}

// ── INIT ──────────────────────────────────────────────────────
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackground);
} else {
    initBackground();
}
