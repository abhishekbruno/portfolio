import * as THREE from 'three';

/**
 * Procedural Studio Environment Reflection Generator
 * Creates an equirectangular studio reflection map with:
 * - Overhead softbox highlight
 * - Cool metallic fill light
 * - Saturated crimson rim reflection strip (John Wick signature)
 * - Subtle floor bounce reflection
 */
export function createStudioEnvironmentMap(renderer) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // 1. Deep charcoal-black background
  const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
  baseGrad.addColorStop(0, '#12161d');
  baseGrad.addColorStop(0.5, '#090d13');
  baseGrad.addColorStop(1, '#05070b');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Primary Top-Left Overhead Studio Softbox (High-specular white-warm highlight)
  const softbox1 = ctx.createRadialGradient(280, 120, 10, 280, 120, 220);
  softbox1.addColorStop(0, 'rgba(248, 251, 255, 0.97)');
  softbox1.addColorStop(0.25, 'rgba(215, 224, 240, 0.84)');
  softbox1.addColorStop(0.6, 'rgba(158, 176, 197, 0.28)');
  softbox1.addColorStop(1, 'transparent');
  ctx.fillStyle = softbox1;
  ctx.fillRect(0, 0, width, height);

  // 3. Secondary Cool-Neutral Rim Softbox (Right/Rear fill)
  const softbox2 = ctx.createRadialGradient(780, 180, 10, 780, 180, 190);
  softbox2.addColorStop(0, 'rgba(232, 241, 255, 0.78)');
  softbox2.addColorStop(0.5, 'rgba(145, 165, 196, 0.24)');
  softbox2.addColorStop(1, 'transparent');
  ctx.fillStyle = softbox2;
  ctx.fillRect(0, 0, width, height);

  // Narrow vertical photographer's strip lights: animated by the physical rotation.
  // Unlike flat metallic paint these create moving specular bands on the coin.
  const warmStrip = ctx.createLinearGradient(480, 0, 565, 0);
  warmStrip.addColorStop(0, 'rgba(235,243,255,0)');
  warmStrip.addColorStop(0.3, 'rgba(224,234,247,0.35)');
  warmStrip.addColorStop(0.51, 'rgba(250,253,255,0.82)');
  warmStrip.addColorStop(0.73, 'rgba(201,215,232,0.3)');
  warmStrip.addColorStop(1, 'rgba(235,243,255,0)');
  ctx.fillStyle = warmStrip;
  ctx.fillRect(480, 46, 85, 255);

  // 4. John Wick Signature Crimson Reflection Strip (Grazing Rim Light from Right/Bottom)
  const redStrip = ctx.createRadialGradient(880, 340, 15, 880, 340, 240);
  redStrip.addColorStop(0, 'rgba(220, 20, 35, 0.95)');
  redStrip.addColorStop(0.35, 'rgba(185, 14, 36, 0.6)');
  redStrip.addColorStop(0.7, 'rgba(120, 0, 15, 0.2)');
  redStrip.addColorStop(1, 'transparent');
  ctx.fillStyle = redStrip;
  ctx.fillRect(0, 0, width, height);

  // 5. Subtle Bottom-Left Metallic Floor Bounce
  const floorBounce = ctx.createRadialGradient(180, 420, 10, 180, 420, 160);
  floorBounce.addColorStop(0, 'rgba(193, 18, 31, 0.35)');
  floorBounce.addColorStop(0.5, 'rgba(120, 0, 10, 0.1)');
  floorBounce.addColorStop(1, 'transparent');
  ctx.fillStyle = floorBounce;
  ctx.fillRect(0, 0, width, height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  pmremGenerator.dispose();
  texture.dispose();

  return envMap;
}

/**
 * Generates an ultra-crisp 2048x2048 procedural canvas texture for the front coin face.
 * Features:
 * - Concentric circular machining grooves with radial metallic sheen
 * - 60 fine precision clockwork radial tick marks
 * - Top circular arc text: "ABHISHEK BRUNO" in engraved metallic silver with subtle crimson reflection
 * - Bottom circular arc text: "SOFTWARE • AI • SYSTEMS"
 * - Left & right flanking laurel wreath sprigs with embossed leaves
 * - Subtle brushed metal scratches and micro-grain
 * - Crosshair reticle lines behind monogram
 */
function createFrontCoinTexture(quality = 1536) {
  const size = quality;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.45;
  const rText = size * 0.382;
  const rInner = size * 0.315;

  // 1. Dark weathered gunmetal base with radial brushed metallic sheen
  const grad = ctx.createRadialGradient(cx, cy, size * 0.04, cx, cy, size * 0.48);
  grad.addColorStop(0, '#59616c');
  grad.addColorStop(0.35, '#454e5b');
  grad.addColorStop(0.7, '#333b46');
  grad.addColorStop(0.92, '#252b35');
  grad.addColorStop(1, '#11161e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // 2. Micro-grain / radial brushed metal scratches
  ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
  for (let i = 0; i < 600; i++) {
    const angle = Math.random() * Math.PI * 2;
    const len = 40 + Math.random() * 260;
    const dist = 20 + Math.random() * (rOuter - 20);
    ctx.beginPath();
    ctx.arc(cx, cy, dist, angle, angle + len / dist);
    ctx.strokeStyle = Math.random() > 0.45 ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.stroke();
  }

  // 3. Concentric engraved rings with metallic depth
  const ringDistances = [
    rOuter,
    rOuter - 16,
    rOuter - 38,
    rInner + 42,
    rInner + 18,
    rInner,
    rInner * 0.72
  ];

  ringDistances.forEach((r, idx) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = idx % 2 === 0 ? 'rgba(188, 204, 224, 0.34)' : 'rgba(0, 0, 0, 0.7)';
    ctx.lineWidth = idx === 0 || idx === 5 ? 5 : 2.5;
    ctx.stroke();
  });

  // 4. 60 Precision Clockwork / Dial Radial Ticks around the outer track
  for (let t = 0; t < 60; t++) {
    const angle = (t / 60) * Math.PI * 2;
    const isMajor = t % 5 === 0;
    const innerDist = isMajor ? rOuter - 32 : rOuter - 22;
    const outerDist = rOuter - 8;

    const x1 = cx + Math.cos(angle) * innerDist;
    const y1 = cy + Math.sin(angle) * innerDist;
    const x2 = cx + Math.cos(angle) * outerDist;
    const y2 = cy + Math.sin(angle) * outerDist;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = isMajor ? 'rgba(217, 227, 241, 0.64)' : 'rgba(162, 179, 204, 0.35)';
    ctx.lineWidth = isMajor ? 3 : 1.5;
    ctx.stroke();
  }

  // 5. Fine crosshair reticle lines behind the monogram
  ctx.beginPath();
  ctx.moveTo(cx - rInner * 0.9, cy);
  ctx.lineTo(cx + rInner * 0.9, cy);
  ctx.moveTo(cx, cy - rInner * 0.9);
  ctx.lineTo(cx, cy + rInner * 0.9);
  ctx.strokeStyle = 'rgba(193, 18, 31, 0.55)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Crosshair precision tick marks
  for (let step = -5; step <= 5; step++) {
    if (step === 0) continue;
    const offset = step * 55;
    ctx.beginPath();
    ctx.moveTo(cx + offset, cy - 9);
    ctx.lineTo(cx + offset, cy + 9);
    ctx.moveTo(cx - 9, cy + offset);
    ctx.lineTo(cx + 9, cy + offset);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // 6. Curved Circular Text Rendering
  function renderCurvedText(text, radius, startAngle, endAngle, inward = true, fontSize = 44) {
    ctx.save();
    ctx.font = `700 ${fontSize}px "Oswald", "Bebas Neue", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const chars = text.split('');
    const totalAngle = endAngle - startAngle;
    const angleStep = totalAngle / (chars.length - 1 || 1);

    chars.forEach((char, i) => {
      const charAngle = startAngle + i * angleStep;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(charAngle);
      ctx.translate(0, inward ? -radius : radius);
      if (!inward) {
        ctx.rotate(Math.PI);
      }

      // Drop shadow for engraved depth
      ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
      ctx.fillText(char, 1, 2);

      // Subdued metallic silver lettering with slight crimson reflection
      const charGrad = ctx.createLinearGradient(-15, -15, 15, 15);
      charGrad.addColorStop(0, '#edf1f7');
      charGrad.addColorStop(0.5, '#b7c1cf');
      charGrad.addColorStop(1, '#738091');
      ctx.fillStyle = charGrad;
      ctx.fillText(char, 0, 0);

      ctx.restore();
    });
    ctx.restore();
  }

  // Top Arc: "A B H I S H E K   B R U N O"
  renderCurvedText(
    "A B H I S H E K   B R U N O",
    rText,
    -Math.PI * 0.38,
    Math.PI * 0.38,
    true,
    44
  );

  // Bottom Arc: "SOFTWARE • AI • SYSTEMS"
  renderCurvedText(
    "S O F T W A R E   •   A I   •   S Y S T E M S",
    rText,
    Math.PI * 0.64,
    Math.PI * 1.36,
    false,
    38
  );

  // 7. Laurel Wreath Sprigs flanking left and right
  function drawLaurelBranch(angleCenter, flip = false) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angleCenter);
    if (flip) ctx.scale(1, -1);

    const leaves = 9;
    for (let l = 0; l < leaves; l++) {
      const theta = (l - leaves / 2) * 0.075;
      const lr = rText;
      const lx = Math.cos(theta) * lr - lr;
      const ly = Math.sin(theta) * lr;

      ctx.save();
      ctx.translate(lx + lr, ly);
      ctx.rotate(theta + (flip ? -0.42 : 0.42));
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 7, 0.38, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(170, 183, 202, 0.73)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }

  drawLaurelBranch(Math.PI, false); // Left flank
  drawLaurelBranch(0, true);        // Right flank

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Generates procedural canvas bump/height map for rich metallic surface relief
 */
function createFrontBumpTexture(quality = 768) {
  const size = quality;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.45;
  const rInner = size * 0.315;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  // Concentric grooves relief
  [rOuter, rOuter - 10, rOuter - 20, rInner + 20, rInner].forEach((r, i) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = i % 2 === 0 ? '#ffffff' : '#222222';
    ctx.lineWidth = 3.5;
    ctx.stroke();
  });

  // Crosshair laser lines relief
  ctx.beginPath();
  ctx.moveTo(cx - rInner * 0.85, cy);
  ctx.lineTo(cx + rInner * 0.85, cy);
  ctx.moveTo(cx, cy - rInner * 0.85);
  ctx.lineTo(cx, cy + rInner * 0.85);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

/**
 * Generates texture for the Reverse / Back face of the medallion
 * Features:
 * - Central recessed technical AB monogram vector cipher
 * - Concentric circular machining marks and radial sunburst brushed metal
 * - Technical inscribed typography: "// VERIFIED UNDERWORLD ARCHITECTURE //"
 */
function createBackCoinTexture(quality = 768) {
  const size = quality;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const cx = size / 2;
  const cy = size / 2;

  // Dark weathered metal reverse base with subtle radial brushed sheen
  const grad = ctx.createRadialGradient(cx, cy, 30, cx, cy, size * 0.5);
  grad.addColorStop(0, '#454e5b');
  grad.addColorStop(0.4, '#303944');
  grad.addColorStop(0.8, '#1c232d');
  grad.addColorStop(1, '#0f141b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Radial brushed lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 300; i++) {
    const angle = (i / 300) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * (size * 0.45), cy + Math.sin(angle) * (size * 0.45));
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Concentric technical ribs
  [size * 0.44, size * 0.38, size * 0.30, size * 0.20, size * 0.12].forEach((r, idx) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = idx === 0 ? 'rgba(210, 222, 238, 0.60)' : 'rgba(188, 204, 224, 0.34)';
    ctx.lineWidth = idx === 0 ? 4 : 2;
    ctx.stroke();
  });

  // Central Reverse AB Monogram Silhouette
  ctx.font = '700 80px "Oswald", "Bebas Neue", sans-serif';
  ctx.fillStyle = 'rgba(203, 214, 229, 0.85)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('AB', cx, cy - 10);

  // Technical reverse cipher text
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillStyle = '#bdc7d5';
  ctx.fillText('// VERIFIED UNDERWORLD CIPHER //', cx, cy - 130);
  ctx.fillText('ABHISHEK BRUNO • SYSTEMS', cx, cy + 110);
  ctx.fillText('EST. 2026 // CSE ARCHITECTURE', cx, cy + 140);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Subtle micro-finish variation. Roughness, bump and the high-contrast
 * environment contribute independently to realistic brushed-steel and black-chrome surfaces.
 */
function createBrushedMetalRoughnessTexture(quality = 512) {
  const size = quality;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#e6e6e6';
  ctx.fillRect(0, 0, size, size);
  let seed = 2026;
  const rnd = () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const cx = size / 2;
  const cy = size / 2;
  for (let i = 0; i < 1750; i++) {
    const a = rnd() * Math.PI * 2;
    const r = (0.08 + rnd() * 0.43) * size;
    const sweep = 0.003 + rnd() * 0.11;
    const v = Math.floor(174 + rnd() * 75);
    ctx.beginPath();
    ctx.arc(cx, cy, r, a, a + sweep);
    ctx.strokeStyle = `rgba(${v},${v},${v},${0.09 + rnd() * 0.22})`;
    ctx.lineWidth = 0.4 + rnd() * 0.8;
    ctx.stroke();
  }
  const map = new THREE.CanvasTexture(canvas);
  map.anisotropy = 4;
  return map;
}

/**
 * Creates the true 3D extruded AB Monogram using Three.js Shape and ExtrudeGeometry
 * Upgraded with:
 * - Multi-material support:
 *   • Material 0 (Front/Back faces): Brushed metallic gunmetal with high reflectivity (#929299),
 *     smooth specular highlights, and anisotropic sheen.
 *   • Material 1 (Sidewalls/Bevels): Deep dark gunmetal (#18181C) with clean chamfers.
 * - Crimson blade highlight line along the stiletto dagger leg (#B90E24).
 * - Sharp, aggressive angular geometry with counter holes.
 */
function createExtrudedABMonogram() {
  const group = new THREE.Group();

  // Extrusion settings with pronounced beveled metallic chamfers
  const extrudeSettings = {
    steps: 1,
    depth: 0.19,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.038,
    bevelSegments: 4
  };

  // ── Letter 'A' Shape ──
  const shapeA = new THREE.Shape();
  // Start from apex
  shapeA.moveTo(-0.08, 1.25);
  // Upper diagonal cut bordering 'B'
  shapeA.lineTo(-0.02, 1.25);
  shapeA.lineTo(0.04, -0.15);
  // Crossbar cut
  shapeA.lineTo(-0.12, -0.15);
  shapeA.lineTo(-0.04, -0.92); // Base of right leg
  shapeA.lineTo(-0.35, -0.92);
  shapeA.lineTo(-0.30, -0.45);
  shapeA.lineTo(-0.85, -0.45);
  // Stiletto blade left leg extending down-left to sharp dagger point
  shapeA.lineTo(-1.38, -0.98);
  shapeA.lineTo(-1.18, -0.65);
  shapeA.lineTo(-0.76, 0.35);
  shapeA.lineTo(-0.08, 1.25);

  // Inner counter triangle of 'A'
  const holeA = new THREE.Path();
  holeA.moveTo(-0.18, 0.72);
  holeA.lineTo(-0.25, 0.05);
  holeA.lineTo(-0.62, 0.05);
  holeA.lineTo(-0.18, 0.72);
  shapeA.holes.push(holeA);

  const geoA = new THREE.ExtrudeGeometry(shapeA, extrudeSettings);
  geoA.center();

  // ── Letter 'B' Shape ──
  const shapeB = new THREE.Shape();
  // Start at upper-left spine next to diagonal channel
  shapeB.moveTo(0.12, 1.15);
  shapeB.lineTo(0.72, 1.15);
  shapeB.lineTo(1.15, 0.85);
  shapeB.lineTo(1.15, 0.38);
  shapeB.lineTo(0.78, 0.12); // Waist
  shapeB.lineTo(1.22, -0.15);
  shapeB.lineTo(1.22, -0.68);
  shapeB.lineTo(0.85, -0.92);
  shapeB.lineTo(0.12, -0.92);
  shapeB.lineTo(0.12, 1.15);

  // Top hole of 'B'
  const holeB1 = new THREE.Path();
  holeB1.moveTo(0.42, 0.90);
  holeB1.lineTo(0.70, 0.90);
  holeB1.lineTo(0.86, 0.72);
  holeB1.lineTo(0.86, 0.45);
  holeB1.lineTo(0.42, 0.35);
  holeB1.lineTo(0.42, 0.90);
  shapeB.holes.push(holeB1);

  // Bottom hole of 'B'
  const holeB2 = new THREE.Path();
  holeB2.moveTo(0.42, 0.12);
  holeB2.lineTo(0.75, -0.05);
  holeB2.lineTo(0.92, -0.32);
  holeB2.lineTo(0.92, -0.62);
  holeB2.lineTo(0.70, -0.72);
  holeB2.lineTo(0.42, -0.72);
  holeB2.lineTo(0.42, 0.12);
  shapeB.holes.push(holeB2);

  const geoB = new THREE.ExtrudeGeometry(shapeB, extrudeSettings);
  geoB.center();

  // ── Multi-Material for the Monogram ──
  // Material 0: Front face - Brushed silver with vivid highlight (#929299)
  const faceMat = new THREE.MeshStandardMaterial({
    color: 0xa7adb6,
    metalness: 1.0,
    roughness: 0.32,
    envMapIntensity: 1.9
  });

  // Material 1: Bevel & Sidewalls - Dark structural gunmetal (#18181C)
  const sideMat = new THREE.MeshStandardMaterial({
    color: 0x333a46,
    metalness: 1.0,
    roughness: 0.27,
    envMapIntensity: 1.6
  });

  const monogramMaterials = [faceMat, sideMat];

  const meshA = new THREE.Mesh(geoA, monogramMaterials);
  meshA.position.set(-0.52, 0.05, 0.18);

  const meshB = new THREE.Mesh(geoB, monogramMaterials);
  meshB.position.set(0.58, 0.05, 0.18);

  group.add(meshA);
  group.add(meshB);

  // Subtle crimson accent line along the dagger blade edge of 'A' (#B90E24)
  const bladeGlowGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-1.18, -0.65, 0.30),
    new THREE.Vector3(-1.38, -0.98, 0.30),
    new THREE.Vector3(-0.95, -0.45, 0.30)
  ]);
  const bladeGlowMat = new THREE.LineBasicMaterial({
    color: 0xB90E24,
    linewidth: 3,
    transparent: true,
    opacity: 0.9
  });
  const bladeLine = new THREE.Line(bladeGlowGeo, bladeGlowMat);
  group.add(bladeLine);

  return group;
}

/**
 * Constructs the Complete 3D Medallion Artifact:
 * - Layer 1: Thick cylindrical coin core with front, knurled sidewalls, and modeled reverse face
 * - Layer 2: Outer mechanical ring with concentric stepped collars and 12 precision rivets
 * - Layer 3: Inner decorative collar and recessed center disc
 * - Layer 4: Four embedded, sleek recessed crimson illuminated sight inserts
 * - Layer 5: High-contrast, extruded and beveled 'AB' Monogram
 */
export function createEmblemGroup({ textureQuality = 'desktop' } = {}) {
  const masterGroup = new THREE.Group();

  // Textures
  const desktop = textureQuality === 'desktop';
  const frontTexture = createFrontCoinTexture(desktop ? 1536 : 768);
  const frontBump = createFrontBumpTexture(desktop ? 768 : 384);
  const backTexture = createBackCoinTexture(desktop ? 768 : 384);
  const brushedRoughness = createBrushedMetalRoughnessTexture(desktop ? 512 : 256);

  // Materials
  const rimMetalMat = new THREE.MeshStandardMaterial({
    color: 0xb8bec7,
    metalness: 1.0,
    roughness: 0.20,
    envMapIntensity: 1.95
  });

  const frontFaceMat = new THREE.MeshStandardMaterial({
    map: frontTexture,
    bumpMap: frontBump,
    bumpScale: 0.036,
    roughnessMap: brushedRoughness,
    color: 0xffffff,
    metalness: 1.0,
    roughness: 0.29,
    envMapIntensity: 1.95
  });

  const backFaceMat = new THREE.MeshStandardMaterial({
    map: backTexture,
    roughnessMap: brushedRoughness,
    color: 0xffffff,
    metalness: 0.92,
    roughness: 0.36,
    envMapIntensity: 1.9
  });

  const edgeKnurlMat = new THREE.MeshStandardMaterial({
    color: 0x303741,
    metalness: 1.0,
    roughness: 0.29,
    envMapIntensity: 1.80
  });

  // ─── 1. Thick Medallion Core Cylinder ───
  // Multi-material: [side (knurled edge), top (front face), bottom (back face)]
  const coinRadius = 2.4;
  const coinThickness = 0.34;
  const coinGeo = new THREE.CylinderGeometry(coinRadius, coinRadius, coinThickness, 96);
  const coinMaterials = [edgeKnurlMat, frontFaceMat, backFaceMat];
  const coinMesh = new THREE.Mesh(coinGeo, coinMaterials);
  coinMesh.rotation.x = Math.PI / 2; // Orient circular face forward (Z+)
  masterGroup.add(coinMesh);

  // ─── 2. Outer Mechanical Stepped Collars (Front) ───
  // Outer Beveled Rim
  const outerRimGeo = new THREE.TorusGeometry(coinRadius - 0.03, 0.07, 20, 96);
  const outerRimMesh = new THREE.Mesh(outerRimGeo, rimMetalMat);
  outerRimMesh.position.z = coinThickness / 2 + 0.03;
  masterGroup.add(outerRimMesh);

  // Stepped Middle Ridge
  const midRimGeo = new THREE.TorusGeometry(coinRadius - 0.16, 0.035, 16, 96);
  const midRimMesh = new THREE.Mesh(midRimGeo, rimMetalMat);
  midRimMesh.position.z = coinThickness / 2 + 0.025;
  masterGroup.add(midRimMesh);

  // Precision-machined polished-steel and black-titanium trim rings.
  const polishedSteelMat = new THREE.MeshStandardMaterial({
    color: 0xdce2ea, metalness: 1, roughness: 0.19, envMapIntensity: 2.0
  });
  const darkTitaniumMat = new THREE.MeshStandardMaterial({
    color: 0x444e5b, metalness: 1, roughness: 0.42, envMapIntensity: 1.5
  });
  [
    { r: 2.31, tube: 0.011, mat: polishedSteelMat },
    { r: 2.15, tube: 0.013, mat: darkTitaniumMat },
    { r: 1.79, tube: 0.011, mat: polishedSteelMat },
    { r: 1.60, tube: 0.010, mat: darkTitaniumMat }
  ].forEach(({ r, tube, mat }) => {
    const geometry = new THREE.TorusGeometry(r, tube, 8, 128);
    const front = new THREE.Mesh(geometry, mat);
    front.position.z = coinThickness / 2 + 0.018;
    const back = new THREE.Mesh(geometry, mat);
    back.position.z = -coinThickness / 2 - 0.018;
    masterGroup.add(front, back);
  });

  // 168 fine flutes are physical steel ridges on the coin edge. Instanced
  // geometry provides convincing three-quarter views without 168 draw calls.
  const fluteCount = 168;
  const fluteGeo = new THREE.BoxGeometry(0.017, 0.016, 0.285);
  const edgeFlutes = new THREE.InstancedMesh(fluteGeo, polishedSteelMat, fluteCount);
  const fluteTransform = new THREE.Object3D();
  for (let i = 0; i < fluteCount; i++) {
    const a = i / fluteCount * Math.PI * 2;
    fluteTransform.position.set(
      Math.cos(a) * (coinRadius + 0.006),
      Math.sin(a) * (coinRadius + 0.006),
      0
    );
    fluteTransform.rotation.z = a;
    fluteTransform.updateMatrix();
    edgeFlutes.setMatrixAt(i, fluteTransform.matrix);
  }
  edgeFlutes.instanceMatrix.needsUpdate = true;
  masterGroup.add(edgeFlutes);

  // ─── 3. Precision Machined Screws/Rivets around Outer Track (Front) ───
  const rivetGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.045, 12);
  const rivetMat = new THREE.MeshStandardMaterial({
    color: 0xbcc6d2,
    metalness: 0.96,
    roughness: 0.27,
    envMapIntensity: 2.4
  });

  for (let r = 0; r < 12; r++) {
    const angle = (r / 12) * Math.PI * 2;
    const rivetMesh = new THREE.Mesh(rivetGeo, rivetMat);
    const rDist = coinRadius - 0.10;
    rivetMesh.position.set(Math.cos(angle) * rDist, Math.sin(angle) * rDist, coinThickness / 2 + 0.04);
    rivetMesh.rotation.x = Math.PI / 2;
    masterGroup.add(rivetMesh);
  }

  // ─── 4. Inner Decorative Collar Surrounding the Monogram ───
  const innerRimGeo = new THREE.TorusGeometry(1.68, 0.042, 16, 96);
  const innerRimMesh = new THREE.Mesh(innerRimGeo, rimMetalMat);
  innerRimMesh.position.z = coinThickness / 2 + 0.02;
  masterGroup.add(innerRimMesh);

  // ─── 5. Reverse / Back Face Raised Collar & Rivets ───
  const backRimGeo = new THREE.TorusGeometry(coinRadius - 0.03, 0.07, 20, 96);
  const backRimMesh = new THREE.Mesh(backRimGeo, rimMetalMat);
  backRimMesh.position.z = -coinThickness / 2 - 0.03;
  masterGroup.add(backRimMesh);

  for (let r = 0; r < 12; r++) {
    const angle = (r / 12) * Math.PI * 2;
    const backRivetMesh = new THREE.Mesh(rivetGeo, rivetMat);
    const rDist = coinRadius - 0.10;
    backRivetMesh.position.set(Math.cos(angle) * rDist, Math.sin(angle) * rDist, -coinThickness / 2 - 0.04);
    backRivetMesh.rotation.x = Math.PI / 2;
    masterGroup.add(backRivetMesh);
  }

  // ─── 6. Four Embedded, Sleek Recessed Crimson Illuminated Inserts ───
  // Replaced bulky external cubes with sleek, embedded rectangular tritium-style inserts
  const markerAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
  const markerInsertGeo = new THREE.BoxGeometry(0.065, 0.22, 0.08);
  const markerRedMat = new THREE.MeshStandardMaterial({
    color: 0xB90E24,
    emissive: 0xB90E24,
    emissiveIntensity: 1.2,
    metalness: 0.3,
    roughness: 0.15
  });

  markerAngles.forEach((ang) => {
    const notchGroup = new THREE.Group();
    const markerMesh = new THREE.Mesh(markerInsertGeo, markerRedMat);
    // Embedded flush into the outer rim collar
    markerMesh.position.set(0, coinRadius - 0.08, coinThickness / 2 + 0.035);
    notchGroup.rotation.z = ang;
    notchGroup.add(markerMesh);
    masterGroup.add(notchGroup);
  });

  // ─── 7. Central High-Contrast 3D Extruded AB Monogram ───
  const abMonogramGroup = createExtrudedABMonogram();
  abMonogramGroup.position.z = coinThickness / 2 + 0.03;
  masterGroup.add(abMonogramGroup);

  return masterGroup;
}
