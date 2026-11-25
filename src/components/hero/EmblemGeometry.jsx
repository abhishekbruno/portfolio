import * as THREE from 'three';

/**
 * EmblemGeometry.jsx — Engraved Ceremonial AB Amulet
 *
 * Thick solid-metal ceremonial medallion featuring:
 * - Watertight multi-material Lathe blank (core thickness ~9.58% of diameter)
 *   with outer 45° silver chamfers, raised outer rims, concentric V-grooves,
 *   and deep recessed central cavities on both Front and Back faces.
 * - Physically carved 3D AB monogram cut straight INTO the aged black titanium
 *   front faceplate (true recessed cavity depth 0.088u, polished 45° silver
 *   inner letter bevels, darkened rougher cavity floors, seamless brushed islands).
 * - Distinct right-reading reverse face featuring a smaller physically carved
 *   AB crest framed by an antique-gold octagonal wire inlay, a 3D sculpted
 *   ceremonial laurel wreath, cardinal compass emblem, and reverse guilloché.
 * - Continuous precision-machined 180-reeded coin edge framed by smooth shoulders.
 */

const COIN_RADIUS = 2.40;
const FRONT_CAVITY_Z = 0.145;
const FRONT_PLATE_TOP_Z = 0.232;
const BACK_CAVITY_Z = 0.155;
const BACK_PLATE_TOP_Z = 0.231;

/**
 * Procedural Studio Environment Reflection Map
 * Dark velvet-case interior with cool silver photographer softbox strips
 * and restrained deep crimson environmental edge bounce.
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

  // Deep obsidian void backdrop
  const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
  baseGrad.addColorStop(0, '#0f131a');
  baseGrad.addColorStop(0.5, '#07090d');
  baseGrad.addColorStop(1, '#040507');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // Overhead cool neutral softbox (reveals horizontal/angled inner letter chamfers)
  const overheadBox = ctx.createRadialGradient(280, 115, 12, 280, 115, 215);
  overheadBox.addColorStop(0, 'rgba(246, 250, 255, 0.96)');
  overheadBox.addColorStop(0.28, 'rgba(208, 220, 238, 0.78)');
  overheadBox.addColorStop(0.65, 'rgba(130, 148, 174, 0.22)');
  overheadBox.addColorStop(1, 'transparent');
  ctx.fillStyle = overheadBox;
  ctx.fillRect(0, 0, width, height);

  // Crisp vertical silver photographer strip light (animates across bevels when turning)
  const silverStrip = ctx.createLinearGradient(475, 0, 560, 0);
  silverStrip.addColorStop(0, 'rgba(230,240,255,0)');
  silverStrip.addColorStop(0.32, 'rgba(220,232,248,0.34)');
  silverStrip.addColorStop(0.50, 'rgba(252,254,255,0.88)');
  silverStrip.addColorStop(0.70, 'rgba(195,212,232,0.30)');
  silverStrip.addColorStop(1, 'rgba(230,240,255,0)');
  ctx.fillStyle = silverStrip;
  ctx.fillRect(475, 38, 85, 280);

  // Secondary cool fill softbox (rear / right edge definition)
  const coolFill = ctx.createRadialGradient(780, 165, 12, 780, 165, 185);
  coolFill.addColorStop(0, 'rgba(222, 234, 252, 0.72)');
  coolFill.addColorStop(0.55, 'rgba(130, 152, 184, 0.20)');
  coolFill.addColorStop(1, 'transparent');
  ctx.fillStyle = coolFill;
  ctx.fillRect(0, 0, width, height);

  // Restrained crimson environmental edge reflection strip (subtle moody bounce only)
  const crimsonEnv = ctx.createRadialGradient(890, 355, 14, 890, 355, 220);
  crimsonEnv.addColorStop(0, 'rgba(182, 14, 34, 0.72)');
  crimsonEnv.addColorStop(0.38, 'rgba(130, 8, 24, 0.36)');
  crimsonEnv.addColorStop(0.75, 'rgba(72, 2, 12, 0.12)');
  crimsonEnv.addColorStop(1, 'transparent');
  ctx.fillStyle = crimsonEnv;
  ctx.fillRect(0, 0, width, height);

  // Faint lower edge crimson reflection
  const floorBounce = ctx.createRadialGradient(170, 435, 8, 170, 435, 145);
  floorBounce.addColorStop(0, 'rgba(145, 10, 26, 0.24)');
  floorBounce.addColorStop(0.55, 'rgba(80, 4, 12, 0.08)');
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
 * Generates high-resolution microscopic surface finishing textures ONLY:
 * - Fine concentric lathe brushed titanium roughness & natural edge wear
 * - Microscopic rose-engine guilloché interference waves on bumpMap
 * Zero painted lettering or fake carved graphics.
 */
function createCeremonialSurfaceMaps(size = 1024, variant = 'front') {
  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = roughCanvas.height = size;
  const rCtx = roughCanvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d');

  const cx = size / 2;
  const cy = size / 2;

  // Base metallic roughness variation
  rCtx.fillStyle = '#cfcfcf';
  rCtx.fillRect(0, 0, size, size);

  // Neutral bump baseline
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, size, size);

  let seed = variant === 'front' ? 4019 : 7391;
  const rnd = () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  // Subtle radial brushed titanium micro-scratches & machining tool arcs
  const scratchCount = Math.floor(size * 1.55);
  for (let i = 0; i < scratchCount; i++) {
    const angle = rnd() * Math.PI * 2;
    const radius = (0.04 + rnd() * 0.45) * size;
    const sweep = 0.015 + rnd() * 0.18;
    const shade = Math.floor(155 + rnd() * 95);

    rCtx.beginPath();
    rCtx.arc(cx, cy, radius, angle, angle + sweep);
    rCtx.strokeStyle = `rgba(${shade},${shade},${shade},${0.11 + rnd() * 0.22})`;
    rCtx.lineWidth = Math.max(0.6, size * 0.0008 + rnd() * (size * 0.0012));
    rCtx.stroke();

    const bVal = rnd() > 0.5 ? 162 : 96;
    bCtx.beginPath();
    bCtx.arc(cx, cy, radius, angle, angle + sweep);
    bCtx.strokeStyle = `rgba(${bVal},${bVal},${bVal},0.22)`;
    bCtx.lineWidth = Math.max(0.6, size * 0.0008);
    bCtx.stroke();
  }

  // Microscopic rose-engine guilloché wave lines
  const waves = variant === 'front' ? 30 : 38;
  const lobes = variant === 'front' ? 18 : 24;
  for (let w = 0; w < waves; w++) {
    const rBase =
      variant === 'front'
        ? size * (0.35 + (w / waves) * 0.095)
        : size * (0.24 + (w / waves) * 0.195);
    bCtx.beginPath();
    const steps = 180;
    for (let s = 0; s <= steps; s++) {
      const th = (s / steps) * Math.PI * 2;
      const amp = size * (variant === 'front' ? 0.0026 : 0.0032);
      const r = rBase + Math.sin(th * lobes + w * 0.55) * amp;
      const px = cx + Math.cos(th) * r;
      const py = cy + Math.sin(th) * r;
      if (s === 0) bCtx.moveTo(px, py);
      else bCtx.lineTo(px, py);
    }
    bCtx.strokeStyle = w % 2 === 0 ? 'rgba(198, 198, 198, 0.30)' : 'rgba(60, 60, 60, 0.30)';
    bCtx.lineWidth = Math.max(0.8, size * 0.0012);
    bCtx.stroke();
  }

  // Subtle outer-rim burnished wear (darker pixels polish raised outer rim)
  const edgeWear = rCtx.createRadialGradient(cx, cy, size * 0.42, cx, cy, size * 0.5);
  edgeWear.addColorStop(0, 'rgba(0,0,0,0)');
  edgeWear.addColorStop(0.55, 'rgba(90,90,90,0.18)');
  edgeWear.addColorStop(1, 'rgba(65,65,65,0.35)');
  rCtx.fillStyle = edgeWear;
  rCtx.fillRect(0, 0, size, size);

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.anisotropy = 4;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.anisotropy = 4;

  return { roughnessMap, bumpMap };
}

/**
 * Centered Planar + Sidewall UV Generator for ExtrudeGeometry plates & counter islands.
 */
function createCircularPlateUVGenerator(radius = COIN_RADIUS) {
  const invDiameter = 1 / (radius * 2);
  return {
    generateTopUV: (_geo, verts, idxA, idxB, idxC) => {
      const ax = verts[idxA * 3];
      const ay = verts[idxA * 3 + 1];
      const bx = verts[idxB * 3];
      const by = verts[idxB * 3 + 1];
      const cx = verts[idxC * 3];
      const cy = verts[idxC * 3 + 1];
      return [
        new THREE.Vector2(ax * invDiameter + 0.5, ay * invDiameter + 0.5),
        new THREE.Vector2(bx * invDiameter + 0.5, by * invDiameter + 0.5),
        new THREE.Vector2(cx * invDiameter + 0.5, cy * invDiameter + 0.5)
      ];
    },
    generateSideWallUV: (_geo, verts, idxA, idxB, idxC, idxD) => {
      const ax = verts[idxA * 3];
      const ay = verts[idxA * 3 + 1];
      const az = verts[idxA * 3 + 2];
      const bx = verts[idxB * 3];
      const by = verts[idxB * 3 + 1];
      const bz = verts[idxB * 3 + 2];
      const cx = verts[idxC * 3];
      const cy = verts[idxC * 3 + 1];
      const cz = verts[idxC * 3 + 2];
      const dx = verts[idxD * 3];
      const dy = verts[idxD * 3 + 1];
      const dz = verts[idxD * 3 + 2];
      return [
        new THREE.Vector2(ax + ay, az * 6),
        new THREE.Vector2(bx + by, bz * 6),
        new THREE.Vector2(cx + cy, cz * 6),
        new THREE.Vector2(dx + dy, dz * 6)
      ];
    }
  };
}

/**
 * Architectural AB Monogram Coordinates preserving user AB identity.
 */
function getABContourPoints(scale = 1.0) {
  const sc = (pts) => pts.map(([x, y]) => [x * scale, y * scale]);

  // Angular 'A' with subtle extended blade foot on left leg
  const ptsA = sc([
    [-0.44, 0.86],
    [-0.14, 0.86],
    [0.06, -0.82],
    [-0.24, -0.82],
    [-0.28, -0.36],
    [-0.74, -0.36],
    [-0.86, -0.82],
    [-1.24, -0.82],
    [-0.44, 0.86]
  ]);

  // Inner counter island inside 'A'
  const ptsIslandA = sc([
    [-0.31, 0.44],
    [-0.27, -0.06],
    [-0.60, -0.06],
    [-0.31, 0.44]
  ]);

  // Architectural angular 'B'
  const ptsB = sc([
    [0.24, 0.86],
    [0.88, 0.86],
    [1.16, 0.60],
    [1.16, 0.22],
    [0.95, 0.04],
    [1.22, -0.18],
    [1.22, -0.58],
    [0.92, -0.82],
    [0.24, -0.82],
    [0.24, 0.86]
  ]);

  // Upper counter island inside 'B'
  const ptsIslandB1 = sc([
    [0.52, 0.58],
    [0.81, 0.58],
    [0.90, 0.48],
    [0.90, 0.28],
    [0.80, 0.18],
    [0.52, 0.18],
    [0.52, 0.58]
  ]);

  // Lower counter island inside 'B'
  const ptsIslandB2 = sc([
    [0.52, -0.08],
    [0.83, -0.08],
    [0.95, -0.20],
    [0.95, -0.46],
    [0.84, -0.56],
    [0.52, -0.56],
    [0.52, -0.08]
  ]);

  return { ptsA, ptsIslandA, ptsB, ptsIslandB1, ptsIslandB2 };
}

function pointsToPath(pts, isShape = false) {
  const path = isShape ? new THREE.Shape() : new THREE.Path();
  path.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) {
    path.lineTo(pts[i][0], pts[i][1]);
  }
  return path;
}

/**
 * Builds a physically carved recessed faceplate with hollowed-out AB letter cuts,
 * polished metallic 45° bevel lips, and seamless flush counter islands inside A and B.
 */
function createCarvedABFaceplate({
  plateRadius,
  abScale,
  depth,
  bevelThickness,
  bevelSize,
  plateTopZ,
  faceMat,
  bevelMat,
  uvGen
}) {
  const group = new THREE.Group();
  const { ptsA, ptsIslandA, ptsB, ptsIslandB1, ptsIslandB2 } = getABContourPoints(abScale);

  const plateShape = new THREE.Shape();
  plateShape.absarc(0, 0, plateRadius, 0, Math.PI * 2, false);
  plateShape.holes.push(pointsToPath(ptsA, false));
  plateShape.holes.push(pointsToPath(ptsB, false));

  const extrudeCfg = {
    depth,
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelSegments: 3,
    curveSegments: 48,
    UVGenerator: uvGen
  };

  const materials = [faceMat, bevelMat];

  const plateMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(plateShape, extrudeCfg), materials);
  const islandAMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(pointsToPath(ptsIslandA, true), extrudeCfg), materials);
  const islandB1Mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(pointsToPath(ptsIslandB1, true), extrudeCfg), materials);
  const islandB2Mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(pointsToPath(ptsIslandB2, true), extrudeCfg), materials);

  group.add(plateMesh, islandAMesh, islandB1Mesh, islandB2Mesh);
  group.position.z = plateTopZ - (depth + bevelThickness);

  return group;
}

/**
 * Builds the watertight solid medallion blank using LatheGeometry with sharp
 * mechanical creases between segments and cleanly grouped PBR material zones.
 */
function createMedallionBlankMesh(materials, radialSegs = 128) {
  // Material slots:
  // 0 = frontTitaniumMat, 1 = polishedSilverBevel, 2 = darkCavity, 3 = darkGunmetal, 4 = backTitaniumMat
  const segs = [
    // ── BACK FACE (-Z) ──
    [0.001, -BACK_CAVITY_Z, 1.062, -BACK_CAVITY_Z, 2],
    [1.062, -BACK_CAVITY_Z, 1.062, -0.228, 2],
    [1.062, -0.228, 1.102, -0.238, 1],
    [1.102, -0.238, 1.132, -0.226, 1],
    [1.132, -0.226, 1.505, -0.226, 4],
    [1.505, -0.226, 1.525, -0.198, 2],
    [1.525, -0.198, 1.545, -0.226, 1],
    [1.545, -0.226, 2.025, -0.226, 4],
    [2.025, -0.226, 2.045, -0.198, 2],
    [2.045, -0.198, 2.065, -0.226, 1],
    [2.065, -0.226, 2.135, -0.226, 4],
    [2.135, -0.226, 2.185, -0.252, 1],
    [2.185, -0.252, 2.332, -0.252, 4],
    [2.332, -0.252, COIN_RADIUS, -0.196, 1],

    // ── OUTER COIN EDGE BARREL (Total thickness ~0.46u = 9.58% of 4.80u diameter) ──
    [COIN_RADIUS, -0.196, COIN_RADIUS, -0.172, 3],
    [COIN_RADIUS, -0.172, 2.384, -0.168, 1],
    [2.384, -0.168, 2.384, 0.168, 3],
    [2.384, 0.168, COIN_RADIUS, 0.172, 1],
    [COIN_RADIUS, 0.172, COIN_RADIUS, 0.196, 3],

    // ── FRONT FACE (+Z) ──
    [COIN_RADIUS, 0.196, 2.332, 0.252, 1],
    [2.332, 0.252, 2.185, 0.252, 0],
    [2.185, 0.252, 2.135, 0.228, 1],
    [2.135, 0.228, 2.072, 0.228, 0],
    [2.072, 0.228, 2.052, 0.200, 1],
    [2.052, 0.200, 2.032, 0.228, 2],
    [2.032, 0.228, 1.782, 0.228, 0],
    [1.782, 0.228, 1.762, 0.202, 1],
    [1.762, 0.202, 1.742, 0.228, 2],
    [1.742, 0.228, 1.662, 0.240, 1],
    [1.662, 0.240, 1.622, 0.232, 1],
    [1.622, 0.232, 1.622, FRONT_CAVITY_Z, 2],
    [1.622, FRONT_CAVITY_Z, 0.001, FRONT_CAVITY_Z, 2]
  ];

  const pts = [];
  segs.forEach(([r0, z0, r1, z1]) => {
    pts.push(new THREE.Vector2(r0, z0));
    pts.push(new THREE.Vector2(r1, z1));
  });

  const geo = new THREE.LatheGeometry(pts, radialSegs);
  geo.computeVertexNormals();

  const posAttr = geo.attributes.position;
  const uvAttr = geo.attributes.uv;
  const invDiameter = 1 / (COIN_RADIUS * 2);

  for (let i = 0; i < posAttr.count; i++) {
    const lx = posAttr.getX(i);
    const ly = posAttr.getY(i);
    const lz = posAttr.getZ(i);
    const rad = Math.hypot(lx, lz);
    if (rad < 2.382 || Math.abs(ly) > 0.197) {
      uvAttr.setXY(i, lx * invDiameter + 0.5, -lz * invDiameter + 0.5);
    }
  }
  uvAttr.needsUpdate = true;

  const srcIndex = geo.index;
  const rowsPerPhi = pts.length - 1;
  const buckets = materials.map(() => []);

  for (let phi = 0; phi < radialSegs; phi++) {
    for (let s = 0; s < segs.length; s++) {
      const rowIdx = s * 2;
      const quadBase = (phi * rowsPerPhi + rowIdx) * 6;
      const matIdx = segs[s][4];
      const bucket = buckets[matIdx];
      for (let k = 0; k < 6; k++) {
        bucket.push(srcIndex.getX(quadBase + k));
      }
    }
  }

  const finalIndices = [];
  geo.clearGroups();
  buckets.forEach((bucket, matIdx) => {
    if (bucket.length === 0) return;
    geo.addGroup(finalIndices.length, bucket.length, matIdx);
    for (let i = 0; i < bucket.length; i++) {
      finalIndices.push(bucket[i]);
    }
  });
  geo.setIndex(finalIndices);

  const blankMesh = new THREE.Mesh(geo, materials);
  blankMesh.rotation.x = Math.PI / 2;
  return blankMesh;
}

/**
 * Adds 3D ceremonial front ornamentation inside r = 1.66..2.13 without overcrowding.
 */
function addFrontCeremonialOrnamentation(group, { silverMat, cavityMat, antiqueGoldMat, gunmetalMat }) {
  // 1. Engraved Ornamental Inner Border: 72 fluted precision silver beads at r = 1.696
  const beadCount = 72;
  const beadGeo = new THREE.CylinderGeometry(0.013, 0.017, 0.022, 8);
  const beads = new THREE.InstancedMesh(beadGeo, silverMat, beadCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < beadCount; i++) {
    const a = (i / beadCount) * Math.PI * 2;
    dummy.position.set(Math.cos(a) * 1.696, Math.sin(a) * 1.696, 0.233);
    dummy.rotation.set(Math.PI / 2, a, 0);
    dummy.updateMatrix();
    beads.setMatrixAt(i, dummy.matrix);
  }
  beads.instanceMatrix.needsUpdate = true;
  group.add(beads);

  // 2. Subtle Radial Recessed Separators around orbital plateau (r = 1.908, excluding cardinals)
  const sepShape = new THREE.Shape();
  sepShape.moveTo(-0.011, -0.085);
  sepShape.lineTo(0.011, -0.085);
  sepShape.lineTo(0.011, 0.085);
  sepShape.lineTo(-0.011, 0.085);
  sepShape.closePath();

  const sepGeo = new THREE.ExtrudeGeometry(sepShape, {
    depth: 0.010,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.004,
    bevelSegments: 2
  });

  const sepAngles = [];
  for (let i = 0; i < 32; i++) {
    if (i % 4 !== 0) {
      sepAngles.push((i / 32) * Math.PI * 2);
    }
  }
  const sepMesh = new THREE.InstancedMesh(sepGeo, gunmetalMat, sepAngles.length);
  sepAngles.forEach((a, idx) => {
    dummy.position.set(Math.cos(a) * 1.908, Math.sin(a) * 1.908, 0.225);
    dummy.rotation.set(0, 0, a - Math.PI / 2);
    dummy.updateMatrix();
    sepMesh.setMatrixAt(idx, dummy.matrix);
  });
  sepMesh.instanceMatrix.needsUpdate = true;
  group.add(sepMesh);

  // 3. Cardinal Ceremonial Lozenge Separators (0°, 90°, 180°, 270° with antique-gold accent cores)
  const diamondSocketShape = new THREE.Shape();
  diamondSocketShape.moveTo(0, 0.115);
  diamondSocketShape.lineTo(0.052, 0);
  diamondSocketShape.lineTo(0, -0.115);
  diamondSocketShape.lineTo(-0.052, 0);
  diamondSocketShape.closePath();
  const socketGeo = new THREE.ExtrudeGeometry(diamondSocketShape, {
    depth: 0.012,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2
  });

  const goldInlayShape = new THREE.Shape();
  goldInlayShape.moveTo(0, 0.078);
  goldInlayShape.lineTo(0.028, 0);
  goldInlayShape.lineTo(0, -0.078);
  goldInlayShape.lineTo(-0.028, 0);
  goldInlayShape.closePath();
  const goldInlayGeo = new THREE.ExtrudeGeometry(goldInlayShape, {
    depth: 0.012,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.005,
    bevelSegments: 2
  });

  [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((a) => {
    const dGroup = new THREE.Group();
    const socket = new THREE.Mesh(socketGeo, [cavityMat, silverMat]);
    const inlay = new THREE.Mesh(goldInlayGeo, antiqueGoldMat);
    inlay.position.z = 0.008;
    dGroup.add(socket, inlay);
    dGroup.position.set(Math.cos(a) * 1.908, Math.sin(a) * 1.908, 0.223);
    dGroup.rotation.z = a - Math.PI / 2;
    group.add(dGroup);
  });

  // 4. Intercardinal Geometric Split Notch Bars (45°, 135°, 225°, 315°)
  const chevronBarGeo = new THREE.BoxGeometry(0.018, 0.16, 0.014);
  [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].forEach((a) => {
    const cGroup = new THREE.Group();
    const b1 = new THREE.Mesh(chevronBarGeo, silverMat);
    const b2 = new THREE.Mesh(chevronBarGeo, silverMat);
    b1.position.x = -0.022;
    b2.position.x = 0.022;
    cGroup.add(b1, b2);
    cGroup.position.set(Math.cos(a) * 1.908, Math.sin(a) * 1.908, 0.230);
    cGroup.rotation.z = a - Math.PI / 2;
    group.add(cGroup);
  });
}

/**
 * Adds distinct reverse ceremonial design inside backGroup (oriented so rotating 180° around Y
 * makes reverse lettering upright & left-to-right readable).
 */
function addReverseCeremonialOrnamentation(
  backGroup,
  { wreathLeafMat, silverMat, antiqueGoldMat, gunmetalMat }
) {
  // 1. Octagonal Antique-Gold Inlaid Shield Wire Framing the Recessed Reverse AB Crest
  const octPoints = [];
  const octRadius = 1.24;
  for (let s = 0; s < 8; s++) {
    const a = (s / 8) * Math.PI * 2 + Math.PI / 8;
    octPoints.push(new THREE.Vector3(Math.cos(a) * octRadius, Math.sin(a) * octRadius, 0.232));
  }
  const octCurve = new THREE.CatmullRomCurve3(octPoints, true, 'catmullrom', 0.02);
  const octGeo = new THREE.TubeGeometry(octCurve, 64, 0.013, 8, true);
  backGroup.add(new THREE.Mesh(octGeo, antiqueGoldMat));

  // Inner Octagonal Gunmetal Geometric Step Collar
  const octInnerPoints = [];
  const octInnerR = 1.38;
  for (let s = 0; s < 8; s++) {
    const a = (s / 8) * Math.PI * 2 + Math.PI / 8;
    octInnerPoints.push(new THREE.Vector3(Math.cos(a) * octInnerR, Math.sin(a) * octInnerR, 0.228));
  }
  const octInnerCurve = new THREE.CatmullRomCurve3(octInnerPoints, true, 'catmullrom', 0.02);
  const octInnerGeo = new THREE.TubeGeometry(octInnerCurve, 64, 0.011, 8, true);
  backGroup.add(new THREE.Mesh(octInnerGeo, silverMat));

  // 2. Sculpted Symmetrical Ceremonial Laurel Wreath Relief (Left & Right Sweeping Arcs)
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -0.095);
  leafShape.quadraticCurveTo(0.058, -0.015, 0, 0.115);
  leafShape.quadraticCurveTo(-0.058, -0.015, 0, -0.095);
  const leafGeo = new THREE.ExtrudeGeometry(leafShape, {
    depth: 0.012,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });

  const stemVeinGeo = new THREE.BoxGeometry(0.008, 0.125, 0.010);

  const leavesPerSide = 11;
  const totalLeaves = leavesPerSide * 4;
  const leafInstanced = new THREE.InstancedMesh(leafGeo, [wreathLeafMat, silverMat], totalLeaves);
  const veinInstanced = new THREE.InstancedMesh(stemVeinGeo, antiqueGoldMat, totalLeaves);

  const dummy = new THREE.Object3D();
  let leafIdx = 0;

  [-1, 1].forEach((side) => {
    for (let i = 0; i < leavesPerSide; i++) {
      const t = i / (leavesPerSide - 1);
      const baseTheta = (-0.38 + t * 0.76) * Math.PI;
      const worldAngle = side === 1 ? baseTheta : Math.PI - baseTheta;

      // Outer leaf pair
      const rOuter = 1.86;
      const tiltOut = side * (-0.48 + t * 0.12);
      dummy.position.set(Math.cos(worldAngle) * rOuter, Math.sin(worldAngle) * rOuter, 0.228);
      dummy.rotation.set(0, 0, worldAngle - Math.PI / 2 + tiltOut);
      dummy.scale.setScalar(1.0 - Math.abs(t - 0.5) * 0.25);
      dummy.updateMatrix();
      leafInstanced.setMatrixAt(leafIdx, dummy.matrix);

      dummy.position.z = 0.237;
      dummy.updateMatrix();
      veinInstanced.setMatrixAt(leafIdx, dummy.matrix);
      leafIdx++;

      // Inner leaf pair
      const rInner = 1.70;
      const tiltIn = side * (0.42 - t * 0.10);
      dummy.position.set(
        Math.cos(worldAngle + side * 0.055) * rInner,
        Math.sin(worldAngle + side * 0.055) * rInner,
        0.228
      );
      dummy.rotation.set(0, 0, worldAngle - Math.PI / 2 + tiltIn);
      dummy.scale.setScalar(0.86 - Math.abs(t - 0.5) * 0.20);
      dummy.updateMatrix();
      leafInstanced.setMatrixAt(leafIdx, dummy.matrix);

      dummy.position.z = 0.237;
      dummy.updateMatrix();
      veinInstanced.setMatrixAt(leafIdx, dummy.matrix);
      leafIdx++;
    }
  });
  leafInstanced.instanceMatrix.needsUpdate = true;
  veinInstanced.instanceMatrix.needsUpdate = true;
  backGroup.add(leafInstanced, veinInstanced);

  // 3. Top Cardinal Keystone Compass Star (12 o'clock)
  const starShape = new THREE.Shape();
  for (let p = 0; p < 8; p++) {
    const a = (p / 8) * Math.PI * 2;
    const r = p % 2 === 0 ? 0.135 : 0.044;
    if (p === 0) starShape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else starShape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  starShape.closePath();
  const starGeo = new THREE.ExtrudeGeometry(starShape, {
    depth: 0.015,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.007,
    bevelSegments: 2
  });
  const topStar = new THREE.Mesh(starGeo, [silverMat, antiqueGoldMat]);
  topStar.position.set(0, 1.78, 0.228);
  backGroup.add(topStar);

  // 4. Bottom Cardinal Architectural Shield Clasp (6 o'clock)
  const claspShape = new THREE.Shape();
  claspShape.moveTo(0, -0.13);
  claspShape.lineTo(0.11, 0.02);
  claspShape.lineTo(0.06, 0.11);
  claspShape.lineTo(-0.06, 0.11);
  claspShape.lineTo(-0.11, 0.02);
  claspShape.closePath();
  const claspGeo = new THREE.ExtrudeGeometry(claspShape, {
    depth: 0.015,
    bevelEnabled: true,
    bevelThickness: 0.007,
    bevelSize: 0.007,
    bevelSegments: 2
  });
  const bottomClasp = new THREE.Mesh(claspGeo, [gunmetalMat, silverMat]);
  bottomClasp.position.set(0, -1.78, 0.228);
  backGroup.add(bottomClasp);

  // 5. Perimeter 72 Precision Micro-Degree Ticks inside Back Rim Channel (r = 2.10)
  const tickCount = 72;
  const tickGeo = new THREE.BoxGeometry(0.011, 0.052, 0.014);
  const ticks = new THREE.InstancedMesh(tickGeo, silverMat, tickCount);
  for (let i = 0; i < tickCount; i++) {
    const a = (i / tickCount) * Math.PI * 2;
    const isMajor = i % 6 === 0;
    dummy.position.set(Math.cos(a) * 2.10, Math.sin(a) * 2.10, 0.230);
    dummy.rotation.set(0, 0, a - Math.PI / 2);
    dummy.scale.set(isMajor ? 1.45 : 1.0, isMajor ? 1.35 : 1.0, 1.0);
    dummy.updateMatrix();
    ticks.setMatrixAt(i, dummy.matrix);
  }
  ticks.instanceMatrix.needsUpdate = true;
  backGroup.add(ticks);
}

/**
 * Constructs the Complete Physically Engraved Ceremonial AB Amulet
 */
export function createEmblemGroup({ textureQuality = 'desktop' } = {}) {
  const masterGroup = new THREE.Group();
  const texSize = textureQuality === 'desktop' ? 1280 : 640;

  // Microscopic surface finishing maps ONLY (radial brushing & rose-engine guilloché)
  const frontMaps = createCeremonialSurfaceMaps(texSize, 'front');
  const backMaps = createCeremonialSurfaceMaps(texSize, 'back');

  // ─── PBR MATERIALS ───

  // Aged Black Titanium (Front body & faceplate surface)
  const frontTitaniumMat = new THREE.MeshStandardMaterial({
    color: 0x454c57,
    metalness: 0.94,
    roughness: 0.31,
    roughnessMap: frontMaps.roughnessMap,
    bumpMap: frontMaps.bumpMap,
    bumpScale: 0.018,
    envMapIntensity: 1.82
  });

  // Back Aged Black Titanium (Distinct reverse sunburst micro-finishing)
  const backTitaniumMat = new THREE.MeshStandardMaterial({
    color: 0x414852,
    metalness: 0.94,
    roughness: 0.32,
    roughnessMap: backMaps.roughnessMap,
    bumpMap: backMaps.bumpMap,
    bumpScale: 0.018,
    envMapIntensity: 1.82
  });

  // Sculpted Wreath Brushed Pewter-Silver (High contrast relief against titanium reverse)
  const wreathLeafMat = new THREE.MeshStandardMaterial({
    color: 0x7b8594,
    metalness: 0.96,
    roughness: 0.26,
    envMapIntensity: 1.95
  });

  // Polished Silver Bevels & Inner Letter Chamfers (Crisp specular edge highlights)
  const polishedSilverBevelMat = new THREE.MeshStandardMaterial({
    color: 0xd0d7e2,
    metalness: 1.0,
    roughness: 0.18,
    envMapIntensity: 2.2
  });

  // Darkened Rougher Cavity Floors (True recessed AB & sunken groove beds)
  const darkCavityMat = new THREE.MeshStandardMaterial({
    color: 0x111318,
    metalness: 0.78,
    roughness: 0.65,
    envMapIntensity: 0.8
  });

  // Dark Gunmetal (Machined edge flutes & subtle separators)
  const darkGunmetalMat = new THREE.MeshStandardMaterial({
    color: 0x565e6b,
    metalness: 0.96,
    roughness: 0.25,
    envMapIntensity: 1.85
  });

  // Subdued Antique Gold (Ultra-restrained ceremonial inlaid highlights only)
  const antiqueGoldMat = new THREE.MeshStandardMaterial({
    color: 0x9c7e47,
    metalness: 0.92,
    roughness: 0.33,
    envMapIntensity: 1.55
  });

  // ─── 1. SOLID WATER-TIGHT LATHE MEDALLION BLANK ───
  const latheMaterials = [
    frontTitaniumMat,       // 0: Aged black titanium front rims & plateaus
    polishedSilverBevelMat, // 1: 45° outer chamfers & groove rims
    darkCavityMat,          // 2: Recessed front/back cavity wells & groove bottoms
    darkGunmetalMat,        // 3: Edge shoulders & reed channel core
    backTitaniumMat         // 4: Aged black titanium back rims & plateaus
  ];
  const blankMesh = createMedallionBlankMesh(latheMaterials, 128);
  masterGroup.add(blankMesh);

  // ─── 2. FINELY REEDED EDGE SIDEWALL (180 Machined Flutes) ───
  const fluteCount = 180;
  const fluteGeo = new THREE.BoxGeometry(0.018, 0.015, 0.336);
  const edgeFlutes = new THREE.InstancedMesh(fluteGeo, darkGunmetalMat, fluteCount);
  const fluteDummy = new THREE.Object3D();
  for (let i = 0; i < fluteCount; i++) {
    const a = (i / fluteCount) * Math.PI * 2;
    fluteDummy.position.set(
      Math.cos(a) * (COIN_RADIUS - 0.004),
      Math.sin(a) * (COIN_RADIUS - 0.004),
      0
    );
    fluteDummy.rotation.z = a;
    fluteDummy.updateMatrix();
    edgeFlutes.setMatrixAt(i, fluteDummy.matrix);
  }
  edgeFlutes.instanceMatrix.needsUpdate = true;
  masterGroup.add(edgeFlutes);

  // ─── 3. FRONT FACE (+Z) — PHYSICALLY CARVED AB + ORNAMENTATION ───
  const frontUVGen = createCircularPlateUVGenerator(COIN_RADIUS);
  const frontABPlate = createCarvedABFaceplate({
    plateRadius: 1.622,
    abScale: 0.92,
    depth: 0.068,
    bevelThickness: 0.020,
    bevelSize: 0.018,
    plateTopZ: FRONT_PLATE_TOP_Z,
    faceMat: frontTitaniumMat,
    bevelMat: polishedSilverBevelMat,
    uvGen: frontUVGen
  });
  masterGroup.add(frontABPlate);

  addFrontCeremonialOrnamentation(masterGroup, {
    silverMat: polishedSilverBevelMat,
    cavityMat: darkCavityMat,
    antiqueGoldMat,
    gunmetalMat: darkGunmetalMat
  });

  // ─── 4. BACK FACE (-Z) — DISTINCT CEREMONIAL REVERSE DESIGN ───
  // Rotated PI around Y so flipping horizontally reveals right-reading, upright lettering
  const backGroup = new THREE.Group();
  backGroup.rotation.y = Math.PI;

  const backUVGen = createCircularPlateUVGenerator(COIN_RADIUS);
  const backABPlate = createCarvedABFaceplate({
    plateRadius: 1.062,
    abScale: 0.56,
    depth: 0.060,
    bevelThickness: 0.016,
    bevelSize: 0.013,
    plateTopZ: BACK_PLATE_TOP_Z,
    faceMat: backTitaniumMat,
    bevelMat: polishedSilverBevelMat,
    uvGen: backUVGen
  });
  backGroup.add(backABPlate);

  addReverseCeremonialOrnamentation(backGroup, {
    wreathLeafMat,
    silverMat: polishedSilverBevelMat,
    antiqueGoldMat,
    gunmetalMat: darkGunmetalMat
  });

  masterGroup.add(backGroup);

  return masterGroup;
}
