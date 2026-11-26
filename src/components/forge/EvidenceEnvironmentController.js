/**
 * EvidenceEnvironmentController (V3)
 *
 * Coordinated physical environment simulation for "002 / THE FORGE"
 * investigation board:
 * - Continuous multi-octave prevailing draft + irregular gust envelopes
 * - 18-segment flexible sheet deformation for the tall hanging left blueprint
 *   (pinned top, moderate center bend, delayed bottom curl/flutter + curved shadow)
 * - Damped spring aerodynamics for secondary loose papers (cube, chart, right)
 * - Damped crimson thread catenaries synced to the same airflow
 * - 3-depth atmospheric dust (background, midground, foreground) + drifting dusty haze
 * - Rare overhead tungsten lamp electrical flickers synced to dust, papers & pin glints
 * - Zero per-frame React state updates; suspends offscreen, tab-hidden, or reduced-motion
 */

export const WALL_DIMENSIONS = { width: 1024, height: 576 };

// Bounding box of paper-left inside 1024x576: [453, 196, 531, 332] -> 78x136
// Padded canvas slot around it so bending/curling bottom never clips: [425, 190, 565, 355] -> 140x165
export const LEFT_BLUEPRINT_CANVAS_SPEC = {
  slotStyle: { left: '41.504%', top: '32.986%', width: '13.672%', height: '28.646%' },
  canvasW: 210,
  canvasH: 248,
  // Paper rect inside the 210x248 canvas (1.5x scale of 140x165)
  paperX: (453 - 425) * 1.5, // 42
  paperY: (196 - 190) * 1.5, // 9
  paperW: 78 * 1.5,          // 117
  paperH: 136 * 1.5,         // 204
};

export const PAPER_LAYER_SPECS = [
  {
    id: 'cube',
    key: 'paper_cube_card',
    alt: '',
    // [795, 99, 892, 177]
    style: { left: '77.637%', top: '17.188%', width: '9.473%', height: '13.542%' },
    pivotOrigin: '45.36% 7.69%',
    mass: 2.5,
    phase: 1.4,
    windGain: 0.36,
    maxRotZ: 0.48,
    maxRotX: 1.05,
    maxRotY: 0.52,
    parallaxPx: 0.65,
  },
  {
    id: 'chart',
    key: 'paper_chart_pinned',
    alt: '',
    // [844, 243, 932, 308]
    style: { left: '82.422%', top: '42.188%', width: '8.594%', height: '11.285%' },
    pivotOrigin: '50.0% 3.08%',
    mass: 1.15,
    phase: 2.35,
    windGain: 0.92,
    maxRotZ: 1.25,
    maxRotX: 2.85,
    maxRotY: 1.4,
    parallaxPx: 1.15,
  },
  {
    id: 'right',
    key: 'paper_far_right',
    alt: '',
    // [958, 191, 1011, 289]
    style: { left: '93.555%', top: '33.160%', width: '5.176%', height: '17.014%' },
    pivotOrigin: '47.17% 3.06%',
    mass: 1.08,
    phase: 3.1,
    windGain: 0.96,
    maxRotZ: 1.35,
    maxRotX: 2.45,
    maxRotY: 1.45,
    parallaxPx: 1.25,
  },
];

// Crimson threads anchored strictly at fixed pin/plaque coordinates in 1024x576 viewBox
export const THREAD_DEFS = [
  { id: 't1', p0: [659, 165], c0: [728, 199], p1: [818, 200], phase: 0.0, sagScale: 2.8, delay: 0.14 },
  { id: 't2', p0: [781, 230], c0: [708, 266], p1: [630, 290], phase: 0.9, sagScale: 2.3, delay: 0.22 },
  { id: 't3a', p0: [701, 306], c0: [726, 301], p1: [749, 304], phase: 1.7, sagScale: 1.1, delay: 0.28 },
  { id: 't3b', p0: [755, 305], c0: [788, 313], p1: [809, 336], phase: 2.1, sagScale: 1.3, delay: 0.34 },
  { id: 't4a', p0: [778, 362], c0: [735, 369], p1: [694, 366], phase: 2.9, sagScale: 1.6, delay: 0.26 },
  { id: 't4b', p0: [688, 365], c0: [652, 355], p1: [652, 321], phase: 3.5, sagScale: 1.5, delay: 0.31 },
  { id: 't5', p0: [795, 368], c0: [748, 400], p1: [728, 449], phase: 4.2, sagScale: 2.4, delay: 0.19 },
];

export const BOARD_PIN_GLINTS = [
  [821, 199, 4.8],
  [627, 290, 4.8],
  [752, 304, 5.2],
  [810, 336, 5.0],
  [691, 365, 5.0],
  [728, 451, 5.2],
  [888, 245, 4.4],
  [635, 134, 4.4],
  [611, 376, 4.2],
  [555, 70, 3.6],
  [944, 68, 3.6],
  [555, 519, 3.6],
  [945, 519, 3.6],
];

function createRng(seed = 1337) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export class EvidenceEnvironmentController {
  constructor({
    tier = 'desktop',
    paperEls = {},
    paperShadowEls = {},
    leftPaperCanvasEl = null,
    leftPaperSrc = null,
    lampGlowEl = null,
    shadowVeilEl = null,
    pinGlintGroupEl = null,
    fxCanvasEl = null,
  }) {
    this.tier = tier;
    this.paperEls = paperEls;
    this.paperShadowEls = paperShadowEls;
    this.leftPaperCanvasEl = leftPaperCanvasEl;
    this.leftPaperCtx = leftPaperCanvasEl ? leftPaperCanvasEl.getContext('2d') : null;
    this.leftPaperImg = null;
    this.leftPaperReady = false;

    if (leftPaperSrc && typeof Image !== 'undefined') {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        this.leftPaperReady = true;
        this.renderLeftBlueprintSheet(true);
      };
      img.src = leftPaperSrc;
      this.leftPaperImg = img;
      if (img.complete && img.naturalWidth > 0) {
        this.leftPaperReady = true;
      }
    }

    this.lampGlowEl = lampGlowEl;
    this.shadowVeilEl = shadowVeilEl;
    this.pinGlintGroupEl = pinGlintGroupEl;
    this.fxCanvasEl = fxCanvasEl;
    this.fxCtx = fxCanvasEl ? fxCanvasEl.getContext('2d') : null;

    this.rng = createRng(9127);
    this.isInView = false;
    this.isPageVisible = typeof document !== 'undefined' ? !document.hidden : true;
    this.rafId = 0;
    this.lastFrameMs = 0;
    this.simTime = 0;

    // Continuous Wind & Gust State (prevailing room draft + organic gusts)
    this.nextGustTime = 1.4;
    this.gustStart = 0;
    this.gustDuration = 0;
    this.gustPeak = 0;
    this.gustAngle = 0.14;
    this.windX = 0.14;
    this.windY = 0.02;

    // Left Hanging Blueprint Flexible Spring State
    this.leftSpring = { pos: 0.12, vel: 0, curl: 0, curlVel: 0, flutter: 0 };

    // Secondary Paper Damped Spring States
    this.paperSprings = {};
    PAPER_LAYER_SPECS.forEach((spec) => {
      this.paperSprings[spec.id] = { pos: 0, vel: 0, flutter: 0, lastRotX: 99, lastRotY: 99, lastRotZ: 99, lastPx: 99, lastLamp: -1 };
    });

    // Thread Damped Oscillation States
    this.threadSprings = {};
    THREAD_DEFS.forEach((th) => {
      this.threadSprings[th.id] = { pos: 0, vel: 0, cx: th.c0[0], cy: th.c0[1] };
    });

    // Overhead Industrial Lamp Flicker State
    this.lampIntensity = 1.0;
    this.nextFlickerTime = 4.2;
    this.flickerEvents = [];
    this.prevLampOut = -1;

    // Pointer Depth Parallax State (desktop only)
    this.pointerTarget = { x: 0, y: 0 };
    this.pointerCurrent = { x: 0, y: 0 };
    this.dustGroupOffsetX = 0;
    this.dustGroupOffsetY = 0;

    // Pre-rendered soft sprites for foreground dust & drifting dusty haze
    this.dustGlowSprite = this.createSoftSprite(32, 'rgba(255, 224, 186, 0.85)', 'rgba(255, 200, 145, 0.25)');
    this.hazeSprite = this.createSoftSprite(128, 'rgba(255, 212, 165, 0.14)', 'rgba(215, 168, 122, 0.05)');

    // 3-Depth Dust Particle Field + Drifting Dusty Haze Clouds
    this.particles = this.initParticles();
    this.hazeClouds = this.initHazeClouds();

    // Render initial pose immediately
    this.applyUpdates(0.016, true);
  }

  createSoftSprite(size, innerColor, midColor) {
    if (typeof document === 'undefined') return null;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const gctx = c.getContext('2d');
    if (!gctx) return null;
    const half = size * 0.5;
    const grad = gctx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, innerColor);
    grad.addColorStop(0.42, midColor);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, size, size);
    return c;
  }

  initParticles() {
    if (this.tier === 'reduced') return [];
    const bgCount = this.tier === 'desktop' ? 12 : this.tier === 'tablet' ? 6 : 3;
    const midCount = this.tier === 'desktop' ? 16 : this.tier === 'tablet' ? 8 : 4;
    const fgCount = this.tier === 'desktop' ? 4 : this.tier === 'tablet' ? 2 : 0;

    const list = [];
    const spawn = (layer, depthMin, depthMax, rMin, rMax, alphaMin, alphaMax, speedMult) => {
      const depth = depthMin + this.rng() * (depthMax - depthMin);
      list.push({
        layer,
        x: 340 + this.rng() * 660,
        y: 35 + this.rng() * 485,
        depth,
        vx: (2.2 + this.rng() * 4.5) * speedMult,
        vy: (-1.4 + (this.rng() - 0.5) * 3.2) * speedMult,
        radius: rMin + this.rng() * (rMax - rMin),
        baseAlpha: alphaMin + this.rng() * (alphaMax - alphaMin),
        curveFreq: 0.45 + this.rng() * 0.85,
        curveAmp: 3.0 + this.rng() * 6.0,
        twinklePhase: this.rng() * Math.PI * 2,
        twinkleSpeed: 0.6 + this.rng() * 1.1,
      });
    };

    for (let i = 0; i < bgCount; i++) spawn('bg', 0.25, 0.42, 0.55, 0.85, 0.14, 0.28, 0.65);
    for (let i = 0; i < midCount; i++) spawn('mid', 0.55, 0.85, 0.75, 1.2, 0.25, 0.52, 1.0);
    for (let i = 0; i < fgCount; i++) spawn('fg', 1.05, 1.35, 2.2, 3.6, 0.22, 0.42, 1.35);

    return list;
  }

  initHazeClouds() {
    if (this.tier === 'reduced' || this.tier === 'mobile') return [];
    const count = this.tier === 'desktop' ? 3 : 2;
    return Array.from({ length: count }, (_, i) => ({
      x: 420 + i * 210,
      y: 150 + i * 95,
      w: 280 + i * 45,
      h: 170 + i * 25,
      speed: 5.5 + i * 1.8,
      phase: i * 2.1,
      baseAlpha: 0.28 + i * 0.06,
    }));
  }

  setTier(tier) {
    if (this.tier === tier) return;
    this.tier = tier;
    this.particles = this.initParticles();
    this.hazeClouds = this.initHazeClouds();
    if (tier === 'reduced') {
      this.stop();
      this.resetRestPose();
    } else {
      this.syncLoop();
    }
  }

  setInView(visible) {
    this.isInView = visible;
    this.syncLoop();
  }

  setPageVisible(visible) {
    this.isPageVisible = visible;
    this.syncLoop();
  }

  setPointerNormalized(nx, ny) {
    if (this.tier !== 'desktop') return;
    this.pointerTarget.x = Math.max(-1, Math.min(1, nx));
    this.pointerTarget.y = Math.max(-1, Math.min(1, ny));
  }

  resetPointer() {
    this.pointerTarget.x = 0;
    this.pointerTarget.y = 0;
  }

  resetRestPose() {
    this.windX = 0;
    this.windY = 0;
    this.lampIntensity = 1.0;
    this.pointerCurrent.x = 0;
    this.pointerCurrent.y = 0;
    this.leftSpring = { pos: 0, vel: 0, curl: 0, curlVel: 0, flutter: 0 };
    PAPER_LAYER_SPECS.forEach((spec) => {
      const s = this.paperSprings[spec.id];
      s.pos = 0;
      s.vel = 0;
      s.flutter = 0;
      s.lastRotX = 99;
      s.lastRotY = 99;
      s.lastRotZ = 99;
      s.lastPx = 99;
      s.lastLamp = -1;
      const el = this.paperEls[spec.id];
      if (el) el.style.transform = 'none';
      const sh = this.paperShadowEls[spec.id];
      if (sh) {
        sh.style.transform = 'none';
        sh.style.opacity = '0.35';
      }
    });
    THREAD_DEFS.forEach((th) => {
      const s = this.threadSprings[th.id];
      s.pos = 0;
      s.vel = 0;
      s.cx = th.c0[0];
      s.cy = th.c0[1];
    });
    this.prevLampOut = -1;
    this.applyUpdates(0.016, true);
  }

  syncLoop() {
    const shouldRun = this.isInView && this.isPageVisible && this.tier !== 'reduced';
    if (shouldRun && !this.rafId) {
      this.lastFrameMs = performance.now();
      this.rafId = requestAnimationFrame(this.tick);
    } else if (!shouldRun && this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
  }

  tick = (nowMs) => {
    if (!this.isInView || !this.isPageVisible || this.tier === 'reduced') {
      this.rafId = 0;
      return;
    }
    this.rafId = requestAnimationFrame(this.tick);

    const dt = Math.min(0.05, Math.max(0.001, (nowMs - this.lastFrameMs) * 0.001));
    this.lastFrameMs = nowMs;
    this.simTime += dt;

    this.stepWind(dt);
    this.stepLampFlicker();
    this.stepPointer(dt);
    this.stepPaperPhysics(dt);
    this.stepThreadPhysics(dt);
    this.applyUpdates(dt, false);
  };

  stepWind(dt) {
    const t = this.simTime;
    // Schedule non-repeating irregular room gusts (3.5–8.5s intervals)
    if (t >= this.nextGustTime) {
      this.gustStart = t;
      this.gustDuration = 2.4 + this.rng() * 2.4;
      this.gustPeak = 0.36 + this.rng() * 0.54;
      this.gustAngle = -0.26 + this.rng() * 0.52;
      this.nextGustTime = t + this.gustDuration + 3.2 + this.rng() * 5.2;
    }

    let gustEnv = 0;
    if (t >= this.gustStart && t <= this.gustStart + this.gustDuration) {
      const p = (t - this.gustStart) / this.gustDuration;
      const rise = p < 0.28 ? Math.sin((p / 0.28) * (Math.PI * 0.5)) : Math.cos(((p - 0.28) / 0.72) * (Math.PI * 0.5));
      const turbulence = 0.78 + 0.22 * Math.sin(t * 3.7 + 0.8) + 0.14 * Math.sin(t * 7.9);
      gustEnv = Math.max(0, rise * rise * this.gustPeak * turbulence);
    }

    // Continuous prevailing room draft (multi-octave smooth noise, never completely still)
    const prevailing = 0.17;
    const noise1 = 0.08 * Math.sin(t * 0.43 + 0.3);
    const noise2 = 0.045 * Math.sin(t * 0.97 + 1.7);
    const noise3 = 0.025 * Math.sin(t * 2.13 + 2.9);
    const totalStrength = prevailing + noise1 + noise2 + noise3 + gustEnv;

    const targetX = Math.cos(this.gustAngle) * totalStrength;
    const targetY = Math.sin(this.gustAngle) * totalStrength * 0.42 + 0.02 * Math.sin(t * 0.71);

    const alpha = 1 - Math.exp(-3.6 * dt);
    this.windX += (targetX - this.windX) * alpha;
    this.windY += (targetY - this.windY) * alpha;
  }

  stepLampFlicker() {
    const t = this.simTime;
    if (t >= this.nextFlickerTime) {
      const count = 2 + Math.floor(this.rng() * 3);
      let cursor = t;
      this.flickerEvents = [];
      for (let i = 0; i < count; i++) {
        const dur = 0.045 + this.rng() * 0.075;
        const dip = 0.48 + this.rng() * 0.32;
        this.flickerEvents.push({ start: cursor, end: cursor + dur, target: dip });
        cursor += dur + 0.03 + this.rng() * 0.09;
      }
      this.nextFlickerTime = cursor + 9.0 + this.rng() * 10.0;
    }

    let lamp = 1.0 - 0.012 * (0.5 + 0.5 * Math.sin(t * 1.9));
    for (let i = 0; i < this.flickerEvents.length; i++) {
      const ev = this.flickerEvents[i];
      if (t >= ev.start && t <= ev.end) {
        const u = (t - ev.start) / (ev.end - ev.start);
        const drop = Math.sin(u * Math.PI);
        lamp = 1.0 - (1.0 - ev.target) * drop;
        break;
      }
    }
    this.lampIntensity = Math.max(0.44, Math.min(1.0, lamp));
  }

  stepPointer(dt) {
    const alpha = 1 - Math.exp(-6.0 * dt);
    this.pointerCurrent.x += (this.pointerTarget.x - this.pointerCurrent.x) * alpha;
    this.pointerCurrent.y += (this.pointerTarget.y - this.pointerCurrent.y) * alpha;
    this.dustGroupOffsetX = this.pointerCurrent.x * 3.4;
    this.dustGroupOffsetY = this.pointerCurrent.y * 2.2;
  }

  stepPaperPhysics(dt) {
    const t = this.simTime;
    const tierScale = this.tier === 'desktop' ? 1.0 : this.tier === 'tablet' ? 0.65 : 0.45;

    // 1. Primary Hanging Blueprint Sheet (flexible spring + curl/twist + bottom flutter)
    const ls = this.leftSpring;
    const primaryForce = (this.windX * (0.85 + 0.25 * Math.sin(t * 1.6)) + 0.05 * Math.sin(t * 2.4)) * tierScale;
    const accL = (primaryForce - ls.pos) * 14.5 - ls.vel * 4.2;
    ls.vel += accL * dt;
    ls.pos += ls.vel * dt;

    const curlTarget = (this.windX * 0.72 + Math.abs(ls.vel) * 0.28 * Math.sin(t * 3.4)) * tierScale;
    const accCurl = (curlTarget - ls.curl) * 18.0 - ls.curlVel * 4.8;
    ls.curlVel += accCurl * dt;
    ls.curl += ls.curlVel * dt;
    ls.flutter = (0.28 + Math.min(0.85, Math.abs(this.windX) * 0.95)) * tierScale;

    // 2. Secondary Papers (reacting with heavier mass & delayed timing)
    for (let i = 0; i < PAPER_LAYER_SPECS.length; i++) {
      const spec = PAPER_LAYER_SPECS[i];
      const sp = this.paperSprings[spec.id];
      const force =
        (this.windX * spec.windGain * (0.75 + 0.25 * Math.sin(t * 1.4 + spec.phase)) +
          Math.sin(t * 2.1 + spec.phase) * 0.04) *
        tierScale;
      const stiffness = 14.0 / spec.mass;
      const damping = 5.2 / Math.sqrt(spec.mass);
      const acc = (force - sp.pos) * stiffness - sp.vel * damping;
      sp.vel += acc * dt;
      sp.pos += sp.vel * dt;
      sp.flutter = Math.sin(t * 6.8 + spec.phase * 1.7) * Math.min(0.65, Math.abs(this.windX) * 0.72) * spec.windGain * tierScale;
    }
  }

  stepThreadPhysics(dt) {
    const t = this.simTime;
    const scale = this.tier === 'desktop' ? 1.0 : this.tier === 'tablet' ? 0.6 : 0.4;
    for (let i = 0; i < THREAD_DEFS.length; i++) {
      const th = THREAD_DEFS[i];
      const sp = this.threadSprings[th.id];
      const delayedWind = this.windX * 0.85 + Math.sin(t * 2.6 - th.delay * 5.0 + th.phase) * Math.abs(this.windX) * 0.45;
      const target = delayedWind * scale;
      const acc = (target - sp.pos) * 26.0 - sp.vel * 4.1;
      sp.vel += acc * dt;
      sp.pos += sp.vel * dt;
    }
  }

  renderLeftBlueprintSheet(isRest = false) {
    const ctx = this.leftPaperCtx;
    const canvas = this.leftPaperCanvasEl;
    if (!ctx || !canvas || !this.leftPaperReady || !this.leftPaperImg) return;

    const { canvasW, canvasH, paperX, paperY, paperW, paperH } = LEFT_BLUEPRINT_CANVAS_SPEC;
    ctx.clearRect(0, 0, canvasW, canvasH);

    const img = this.leftPaperImg;
    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    if (!imgW || !imgH) return;

    const STRIPS = 18;
    const srcStripH = imgH / STRIPS;
    const dstStripH = paperH / STRIPS;
    const ls = this.leftSpring;
    const t = this.simTime;
    const px = this.pointerCurrent.x * 1.4;
    const py = this.pointerCurrent.y * 0.9;

    // 1. Curved soft cast shadow behind the bent paper strips
    if (!isRest) {
      ctx.fillStyle = `rgba(3, 2, 3, ${(0.28 + 0.1 * this.lampIntensity).toFixed(3)})`;
      for (let i = 0; i < STRIPS; i++) {
        const u = (i + 0.5) / STRIPS;
        const flex = Math.pow(u, 1.55);
        const wave = Math.sin(t * 3.1 - u * 2.5) * ls.flutter * 2.4;
        const bendX = (ls.pos * 9.5 + ls.curl * 4.0 + wave) * flex;
        const lift = Math.abs(ls.curl) * 4.2 * Math.pow(u, 1.7);
        const sx = paperX + px + bendX + 2.5 + lift * 0.9;
        const sy = paperY + py + i * dstStripH + 2.5 + lift * 1.1;
        const sw = paperW * (1 - Math.min(0.07, Math.abs(ls.curl) * 0.04 * flex));
        ctx.fillRect(sx, sy, sw, dstStripH + 1.2);
      }
    }

    // 2. Render 18 flexible horizontal paper strips (top u=0 pinned, bottom u=1 bends & curls)
    for (let i = 0; i < STRIPS; i++) {
      const u = i / (STRIPS - 1);
      const flex = Math.pow(u, 1.6);
      const wave = isRest ? 0 : Math.sin(t * 3.1 - u * 2.5) * ls.flutter * 2.6 + Math.sin(t * 6.4 - u * 4.0) * ls.flutter * 0.9;
      const dx = isRest ? 0 : (ls.pos * 10.5 + ls.curl * 4.4 + wave) * flex;
      const liftY = isRest ? 0 : -Math.abs(ls.pos * 2.2 + ls.curl * 1.6) * Math.pow(u, 1.85);
      const twistScale = isRest ? 1 : 1 - Math.min(0.08, Math.abs(ls.curl * 0.045 + wave * 0.005) * flex);

      const drawW = paperW * twistScale;
      const drawX = paperX + px + dx + (paperW - drawW) * 0.5;
      const drawY = paperY + py + i * dstStripH + liftY;

      ctx.drawImage(
        img,
        0,
        i * srcStripH,
        imgW,
        srcStripH + 0.6,
        drawX,
        drawY,
        drawW,
        dstStripH + 0.9
      );
    }
  }

  applyUpdates(dt, force = false) {
    // 1. Render 18-segment flexible left hanging blueprint sheet
    this.renderLeftBlueprintSheet(this.tier === 'reduced');

    // 2. Apply Quantized Transforms & Shadows to secondary loose papers
    for (let i = 0; i < PAPER_LAYER_SPECS.length; i++) {
      const spec = PAPER_LAYER_SPECS[i];
      const sp = this.paperSprings[spec.id];
      const el = this.paperEls[spec.id];
      const shEl = this.paperShadowEls[spec.id];
      const px = this.pointerCurrent.x * spec.parallaxPx;
      const py = this.pointerCurrent.y * spec.parallaxPx * 0.65;

      const rotZ = sp.pos * spec.maxRotZ + sp.flutter * 0.35;
      const rotX = Math.max(-0.4, sp.pos) * spec.maxRotX + Math.abs(sp.flutter) * 0.85;
      const rotY = sp.pos * spec.maxRotY + this.windY * 1.2;

      const changed =
        force ||
        Math.abs(rotZ - sp.lastRotZ) >= 0.04 ||
        Math.abs(rotX - sp.lastRotX) >= 0.05 ||
        Math.abs(rotY - sp.lastRotY) >= 0.05 ||
        Math.abs(px - sp.lastPx) >= 0.06 ||
        Math.abs(this.lampIntensity - sp.lastLamp) >= 0.02;

      if (changed) {
        sp.lastRotZ = rotZ;
        sp.lastRotX = rotX;
        sp.lastRotY = rotY;
        sp.lastPx = px;
        sp.lastLamp = this.lampIntensity;

        if (el) {
          el.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0) perspective(440px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`;
        }
        if (shEl) {
          const lift = Math.max(0, rotX) * 0.42;
          shEl.style.transform = `translate3d(${(px + lift * 1.1).toFixed(2)}px, ${(py + lift * 1.6 + 1.5).toFixed(2)}px, 0) rotateZ(${(rotZ * 0.85).toFixed(2)}deg)`;
          const shOp = (0.38 - Math.min(0.18, lift * 0.08)) * (0.65 + 0.35 * this.lampIntensity);
          shEl.style.opacity = shOp.toFixed(3);
        }
      }
    }

    // 3. Compute Catenary Crimson Thread Midpoints
    for (let i = 0; i < THREAD_DEFS.length; i++) {
      const th = THREAD_DEFS[i];
      const sp = this.threadSprings[th.id];
      const dx = sp.pos * th.sagScale + this.pointerCurrent.x * 0.45;
      const dy = Math.abs(sp.pos) * th.sagScale * 0.42 + this.windY * th.sagScale * 0.5;
      sp.cx = th.c0[0] + dx;
      sp.cy = th.c0[1] + dy;
    }

    // 4. Apply Local Lamp Electrical Flicker Across Illumination, Shadows & Pin Glints
    const lampQuant = Number(this.lampIntensity.toFixed(3));
    if (force || Math.abs(lampQuant - this.prevLampOut) >= 0.01) {
      this.prevLampOut = lampQuant;
      if (this.lampGlowEl) {
        this.lampGlowEl.style.opacity = lampQuant.toFixed(3);
      }
      if (this.shadowVeilEl) {
        this.shadowVeilEl.style.opacity = Math.max(0, (1.0 - lampQuant) * 0.72).toFixed(3);
      }
      if (this.pinGlintGroupEl) {
        this.pinGlintGroupEl.style.opacity = (0.16 + 0.84 * lampQuant).toFixed(3);
      }
    }

    // 5. Unified Canvas 2D Render Pass: Crimson Threads + Dusty Haze + 3-Depth Dust
    this.renderFxCanvas(dt);
  }

  renderFxCanvas(dt) {
    if (!this.fxCtx || !this.fxCanvasEl) return;
    const ctx = this.fxCtx;
    const cw = this.fxCanvasEl.width;
    const ch = this.fxCanvasEl.height;
    const sx = cw / WALL_DIMENSIONS.width;
    const sy = ch / WALL_DIMENSIONS.height;

    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.scale(sx, sy);
    ctx.lineCap = 'round';

    // A) Crimson thread shadows -> bodies -> lamp-modulated filament sheens
    ctx.strokeStyle = 'rgba(4, 2, 2, 0.72)';
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    for (let i = 0; i < THREAD_DEFS.length; i++) {
      const th = THREAD_DEFS[i];
      const sp = this.threadSprings[th.id];
      const dx = sp.cx - th.c0[0];
      const dy = sp.cy - th.c0[1];
      ctx.moveTo(th.p0[0] + 0.8, th.p0[1] + 1.6);
      ctx.quadraticCurveTo(th.c0[0] + dx * 1.25 + 1.6, th.c0[1] + dy * 1.25 + 2.6, th.p1[0] + 0.8, th.p1[1] + 1.6);
    }
    ctx.stroke();

    ctx.strokeStyle = '#9E1120';
    ctx.lineWidth = 2.35;
    ctx.beginPath();
    for (let i = 0; i < THREAD_DEFS.length; i++) {
      const th = THREAD_DEFS[i];
      const sp = this.threadSprings[th.id];
      ctx.moveTo(th.p0[0], th.p0[1]);
      ctx.quadraticCurveTo(sp.cx, sp.cy, th.p1[0], th.p1[1]);
    }
    ctx.stroke();

    const sheenAlpha = 0.22 + 0.44 * this.lampIntensity;
    ctx.strokeStyle = `rgba(232, 62, 79, ${sheenAlpha.toFixed(3)})`;
    ctx.lineWidth = 0.95;
    ctx.beginPath();
    for (let i = 0; i < THREAD_DEFS.length; i++) {
      const th = THREAD_DEFS[i];
      const sp = this.threadSprings[th.id];
      ctx.moveTo(th.p0[0], th.p0[1] - 0.35);
      ctx.quadraticCurveTo(sp.cx, sp.cy - 0.35, th.p1[0], th.p1[1] - 0.35);
    }
    ctx.stroke();

    const t = this.simTime;

    // B) Faint Drifting Dusty Haze (slowly crosses board & brightens under lamp)
    if (this.hazeClouds.length > 0 && this.hazeSprite) {
      const hazeWind = this.windX * 14.0;
      for (let i = 0; i < this.hazeClouds.length; i++) {
        const h = this.hazeClouds[i];
        h.x += (h.speed + hazeWind) * dt;
        if (h.x - h.w * 0.5 > 1060) h.x = 340 - h.w * 0.5;
        const dx = h.x - 755;
        const coneProx = Math.max(0.15, 1 - Math.abs(dx) / 380);
        const alpha = h.baseAlpha * coneProx * (0.25 + 0.75 * this.lampIntensity) * (0.8 + 0.2 * Math.sin(t * 0.35 + h.phase));
        ctx.globalAlpha = Math.min(0.45, alpha);
        ctx.drawImage(this.hazeSprite, h.x - h.w * 0.5, h.y - h.h * 0.5, h.w, h.h);
      }
      ctx.globalAlpha = 1;
    }

    // C) 3-Depth Atmospheric Dust (background, midground, foreground)
    if (this.particles.length > 0) {
      const driftX = this.windX * 28.0;
      const driftY = this.windY * 14.0;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const curveY = Math.sin(t * p.curveFreq + p.twinklePhase) * p.curveAmp * dt;
        p.x += (p.vx + driftX * p.depth) * dt;
        p.y += (p.vy + driftY * p.depth) * dt + curveY;

        if (p.x > 1010) p.x = 345;
        else if (p.x < 340) p.x = 1005;
        if (p.y < 28) p.y = 515;
        else if (p.y > 520) p.y = 32;

        // Illumination inside overhead lamp cone (755, 48) + gentle entry/exit fade
        const dx = p.x - 755;
        const dy = p.y - 48;
        const distY = Math.max(20, dy);
        const coneHalfWidth = 115 + distY * 0.64;
        const radialFactor = Math.max(0, 1 - Math.abs(dx) / coneHalfWidth);
        const verticalFactor = Math.max(0, 1 - Math.max(0, dy - 28) / 450);
        const coneIllum = radialFactor * verticalFactor;

        // Foreground particles remain faintly visible slightly outside the main cone
        const minAmbient = p.layer === 'fg' ? 0.18 : p.layer === 'mid' ? 0.04 : 0.02;
        const illum = Math.max(minAmbient, coneIllum);
        if (illum <= 0.02) continue;

        const twinkle = 0.68 + 0.32 * Math.sin(t * p.twinkleSpeed + p.twinklePhase);
        const alpha = p.baseAlpha * illum * twinkle * (0.18 + 0.82 * this.lampIntensity);
        if (alpha <= 0.015) continue;

        const drawX = p.x + this.dustGroupOffsetX * p.depth;
        const drawY = p.y + this.dustGroupOffsetY * p.depth;

        if (p.layer === 'fg' && this.dustGlowSprite) {
          ctx.globalAlpha = Math.min(0.65, alpha);
          const s = p.radius * 3.4;
          ctx.drawImage(this.dustGlowSprite, drawX - s * 0.5, drawY - s * 0.5, s, s);
          ctx.globalAlpha = 1;
        } else {
          ctx.fillStyle = `rgba(255, 224, 188, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.restore();
  }
}
