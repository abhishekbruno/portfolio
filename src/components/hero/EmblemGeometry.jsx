import * as THREE from 'three';

/**
 * Generates an ultra-crisp procedural canvas texture for the front coin face.
 * Features:
 * - Top circular arc text: "ABHISHEK BRUNO"
 * - Bottom circular arc text: "SOFTWARE • AI • SYSTEMS"
 * - Left & right flanking laurel wreaths
 * - Concentric circular metallic grooves & crosshair ticks
 */
function createFrontCoinTexture() {
  const size = 2048;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.45;
  const rText = size * 0.385;
  const rInner = size * 0.32;

  // 1. Dark weathered gunmetal base with radial metallic sheen
  const grad = ctx.createRadialGradient(cx, cy, size * 0.05, cx, cy, size * 0.5);
  grad.addColorStop(0, '#1c1c22');
  grad.addColorStop(0.5, '#141418');
  grad.addColorStop(0.85, '#0e0e12');
  grad.addColorStop(1, '#070709');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // 2. Subtle micro-grain / brushed metal scratches
  ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
  for (let i = 0; i < 400; i++) {
    const angle = Math.random() * Math.PI * 2;
    const len = 40 + Math.random() * 200;
    const dist = Math.random() * rOuter;
    ctx.beginPath();
    ctx.arc(cx, cy, dist, angle, angle + len / dist);
    ctx.strokeStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.04)';
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.stroke();
  }

  // 3. Concentric engraved rings with metallic depth
  const ringDistances = [rOuter, rOuter - 20, rInner + 30, rInner, rInner * 0.65];
  ringDistances.forEach((r, idx) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = idx % 2 === 0 ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.6)';
    ctx.lineWidth = idx === 0 || idx === 3 ? 5 : 2;
    ctx.stroke();
  });

  // 4. Fine crosshair reticle lines behind the monogram
  ctx.beginPath();
  ctx.moveTo(cx - rInner * 0.85, cy);
  ctx.lineTo(cx + rInner * 0.85, cy);
  ctx.moveTo(cx, cy - rInner * 0.85);
  ctx.lineTo(cx, cy + rInner * 0.85);
  ctx.strokeStyle = 'rgba(193, 18, 31, 0.45)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Fine crosshair ticks
  for (let step = -4; step <= 4; step++) {
    if (step === 0) continue;
    const offset = step * 60;
    ctx.beginPath();
    ctx.moveTo(cx + offset, cy - 8);
    ctx.lineTo(cx + offset, cy + 8);
    ctx.moveTo(cx - 8, cy + offset);
    ctx.lineTo(cx + 8, cy + offset);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // 5. Curved Circular Text Rendering
  function renderCurvedText(text, radius, startAngle, endAngle, inward = true, fontSize = 42) {
    ctx.save();
    ctx.font = `700 ${fontSize}px "Oswald", "Bebas Neue", sans-serif`;
    ctx.fillStyle = '#e4e4ea';
    ctx.shadowColor = 'rgba(0,0,0,0.85)';
    ctx.shadowBlur = 8;
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
    Math.PI * 0.65,
    Math.PI * 1.35,
    false,
    38
  );

  // 6. Laurel Wreath Sprigs flanking left and right
  function drawLaurelBranch(angleCenter, flip = false) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angleCenter);
    if (flip) ctx.scale(1, -1);

    const leaves = 8;
    for (let l = 0; l < leaves; l++) {
      const theta = (l - leaves / 2) * 0.08;
      const lr = rText;
      const lx = Math.cos(theta) * lr - lr;
      const ly = Math.sin(theta) * lr;

      ctx.save();
      ctx.translate(lx + lr, ly);
      ctx.rotate(theta + (flip ? -0.4 : 0.4));
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 6, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(210, 210, 218, 0.65)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }

  drawLaurelBranch(Math.PI, false); // Left flank
  drawLaurelBranch(0, true);        // Right flank

  // 7. Four Cardinal Sight Marker Red Bases
  const cardinals = [
    { angle: 0, x: cx + rOuter, y: cy },
    { angle: Math.PI / 2, x: cx, y: cy + rOuter },
    { angle: Math.PI, x: cx - rOuter, y: cy },
    { angle: -Math.PI / 2, x: cx, y: cy - rOuter }
  ];

  cardinals.forEach(({ x, y }) => {
    ctx.save();
    ctx.fillStyle = '#C1121F';
    ctx.shadowColor = '#C1121F';
    ctx.shadowBlur = 12;
    ctx.fillRect(x - 6, y - 6, 12, 12);
    ctx.restore();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Generates procedural canvas bump/height map for rich metallic surface relief
 */
function createFrontBumpTexture() {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.45;
  const rInner = size * 0.32;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  // Concentric grooves relief
  [rOuter, rOuter - 10, rInner + 15, rInner].forEach((r, i) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = i % 2 === 0 ? '#ffffff' : '#333333';
    ctx.lineWidth = 3;
    ctx.stroke();
  });

  // Crosshair laser lines relief
  ctx.beginPath();
  ctx.moveTo(cx - rInner * 0.8, cy);
  ctx.lineTo(cx + rInner * 0.8, cy);
  ctx.moveTo(cx, cy - rInner * 0.8);
  ctx.lineTo(cx, cy + rInner * 0.8);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

/**
 * Generates texture for the Reverse / Back face of the medallion
 */
function createBackCoinTexture() {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const cx = size / 2;
  const cy = size / 2;

  // Dark weathered metal reverse base
  const grad = ctx.createRadialGradient(cx, cy, 50, cx, cy, size * 0.5);
  grad.addColorStop(0, '#16161a');
  grad.addColorStop(0.6, '#0f0f13');
  grad.addColorStop(1, '#070709');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Concentric technical ribs
  [size * 0.44, size * 0.38, size * 0.28, size * 0.16].forEach((r, idx) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = idx === 0 ? 'rgba(193, 18, 31, 0.4)' : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 3;
    ctx.stroke();
  });

  // Technical reverse cipher text
  ctx.font = '600 24px "JetBrains Mono", monospace';
  ctx.fillStyle = '#888892';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('// VERIFIED SYSTEM CIPHER //', cx, cy - 80);
  ctx.fillText('ABHISHEK BRUNO • ARCHITECTURE', cx, cy);
  ctx.fillText('EST. 2026 // CSE PROTOCOL', cx, cy + 80);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates the true 3D extruded AB Monogram using Three.js Shape and ExtrudeGeometry
 */
function createExtrudedABMonogram() {
  const group = new THREE.Group();

  // Extrusion settings with pronounced beveled metallic chamfers
  const extrudeSettings = {
    steps: 1,
    depth: 0.18,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.04,
    bevelSegments: 3
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

  // Premium Weathered Gunmetal PBR Material
  const monogramMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8de,
    metalness: 0.95,
    roughness: 0.22,
    envMapIntensity: 1.5,
    flatShading: false
  });

  const meshA = new THREE.Mesh(geoA, monogramMat);
  meshA.position.set(-0.52, 0.05, 0.16);

  const meshB = new THREE.Mesh(geoB, monogramMat);
  meshB.position.set(0.58, 0.05, 0.16);

  group.add(meshA);
  group.add(meshB);

  // Subtle crimson accent line along the dagger blade edge of 'A'
  const bladeGlowGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-1.18, -0.65, 0.28),
    new THREE.Vector3(-1.38, -0.98, 0.28),
    new THREE.Vector3(-0.95, -0.45, 0.28)
  ]);
  const bladeGlowMat = new THREE.LineBasicMaterial({
    color: 0xC1121F,
    linewidth: 3,
    transparent: true,
    opacity: 0.85
  });
  const bladeLine = new THREE.Line(bladeGlowGeo, bladeGlowMat);
  group.add(bladeLine);

  return group;
}

/**
 * Constructs the Complete 3D Medallion Artifact:
 * - Coin body with front, side and rear geometry
 * - Outer beveled collar and raised rings
 * - 4 Cardinal Crimson Sight Markers (12, 3, 6, 9 o'clock)
 * - 3D Extruded Central AB Monogram
 */
export function createEmblemGroup() {
  const masterGroup = new THREE.Group();

  // Textures
  const frontTexture = createFrontCoinTexture();
  const frontBump = createFrontBumpTexture();
  const backTexture = createBackCoinTexture();

  // Materials
  const rimMetalMat = new THREE.MeshStandardMaterial({
    color: 0x222226,
    metalness: 0.92,
    roughness: 0.28,
    envMapIntensity: 1.2
  });

  const frontFaceMat = new THREE.MeshStandardMaterial({
    map: frontTexture,
    bumpMap: frontBump,
    bumpScale: 0.06,
    metalness: 0.88,
    roughness: 0.32,
    envMapIntensity: 1.0
  });

  const backFaceMat = new THREE.MeshStandardMaterial({
    map: backTexture,
    metalness: 0.90,
    roughness: 0.35,
    envMapIntensity: 0.9
  });

  const edgeKnurlMat = new THREE.MeshStandardMaterial({
    color: 0x18181c,
    metalness: 0.95,
    roughness: 0.45
  });

  // 1. Thick Medallion Core Cylinder
  // Multi-material: [side, top (front), bottom (back)]
  const coinRadius = 2.4;
  const coinThickness = 0.34;
  const coinGeo = new THREE.CylinderGeometry(coinRadius, coinRadius, coinThickness, 80);
  const coinMaterials = [edgeKnurlMat, frontFaceMat, backFaceMat];
  const coinMesh = new THREE.Mesh(coinGeo, coinMaterials);
  coinMesh.rotation.x = Math.PI / 2; // Orient circular face forward (Z+)
  masterGroup.add(coinMesh);

  // 2. Raised Outer Beveled Metallic Rim (Front)
  const outerRimGeo = new THREE.TorusGeometry(coinRadius - 0.04, 0.08, 16, 80);
  const outerRimMesh = new THREE.Mesh(outerRimGeo, rimMetalMat);
  outerRimMesh.position.z = coinThickness / 2 + 0.03;
  masterGroup.add(outerRimMesh);

  // 3. Inner Stepped Concentric Ring (Front)
  const innerRimGeo = new THREE.TorusGeometry(1.72, 0.04, 16, 80);
  const innerRimMesh = new THREE.Mesh(innerRimGeo, rimMetalMat);
  innerRimMesh.position.z = coinThickness / 2 + 0.02;
  masterGroup.add(innerRimMesh);

  // 4. Reverse / Back Face Raised Rim
  const backRimGeo = new THREE.TorusGeometry(coinRadius - 0.04, 0.08, 16, 80);
  const backRimMesh = new THREE.Mesh(backRimGeo, rimMetalMat);
  backRimMesh.position.z = -coinThickness / 2 - 0.03;
  masterGroup.add(backRimMesh);

  // 5. Four Cardinal Crimson Sight Markers (Crosshair Notches at 12, 3, 6, 9 o'clock)
  const markerAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
  const markerGeo = new THREE.BoxGeometry(0.12, 0.32, 0.16);
  const markerRedMat = new THREE.MeshStandardMaterial({
    color: 0xC1121F,
    emissive: 0xC1121F,
    emissiveIntensity: 0.9,
    metalness: 0.4,
    roughness: 0.2
  });

  markerAngles.forEach((ang) => {
    const notchGroup = new THREE.Group();
    const markerMesh = new THREE.Mesh(markerGeo, markerRedMat);
    markerMesh.position.set(0, coinRadius - 0.02, coinThickness / 2 + 0.04);
    notchGroup.rotation.z = ang;
    notchGroup.add(markerMesh);
    masterGroup.add(notchGroup);
  });

  // 6. Central 3D Extruded AB Monogram
  const abMonogramGroup = createExtrudedABMonogram();
  abMonogramGroup.position.z = coinThickness / 2 + 0.02;
  masterGroup.add(abMonogramGroup);

  return masterGroup;
}
