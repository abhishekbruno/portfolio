import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw } from 'lucide-react';
import { createEmblemGroup, createStudioEnvironmentMap } from './EmblemGeometry';
import { setupEmblemLighting } from './EmblemLighting';
import { createEmblemControls } from './EmblemControls';
import EmblemFallback from './EmblemFallback';
import { RevealPhase } from './revealPhases';

/**
 * InteractiveEmblem3D — "THE REVEAL: ONE OBJECT, ONE CONTINUOUS SCENE"
 *
 * Single persistent Three.js WebGL centerpiece powering both the cinematic
 * introductory camera sequence and the permanent interactive homepage hero visual:
 *
 * State Machine:
 * 1. INITIALIZING: Shaders, geometries, PBR textures & environment map prepared.
 * 2. INTRO (0.0s – 2.0s):
 *    - Phase 1 (0.0s – 0.8s): Darkness & Macro View — Camera in extreme close-up (z=2.70),
 *      narrow specular grazing light sweeps across the polished silver chamfers of the 'AB' monogram.
 *    - Phase 2 (0.8s – 2.0s): The Discovery / Camera Pullback — Camera smoothly pulls backward (z: 2.70 -> 6.20),
 *      outer engraved rings and knurled gunmetal rim emerge from darkness with a subtle, heavy 3D orientation tilt.
 * 3. CAMERA_TRANSITION (2.0s – 3.2s):
 *    - Phase 3: The Transformation — Camera settles to z=7.80. The coin smoothly glides from viewport center (0, 0)
 *      to the right-side hero resting position (~76% across usable viewport, x=2.65 on desktop), orientation slerps
 *      to canonical resting angle, and hero atmospheric lighting reveals around it.
 * 4. HERO_INTERACTIVE (3.2s – 4.5s+):
 *    - Phase 4: Homepage & Typography Reveal — Left-aligned typography emerges via masked vertical lines.
 *      The medallion seamlessly engages 3-axis trackball controls, pointer tracking, inertia, and idle breathing drift.
 *    - Sequence reaches complete at 4.5s.
 *
 * Zero duplicate scenes, zero falling coins, zero fake collision physics, zero blank rendering frames.
 */
const HAS_WEBGL = typeof window !== 'undefined' ? (() => {
  try {
    const testCanvas = document.createElement('canvas');
    return Boolean(testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
})() : true;

export { RevealPhase };

export default function InteractiveEmblem3D({
  onReady,
  onPhaseChange,
  onComplete,
  isSkipped = false
}) {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [isSequenceComplete, setIsSequenceComplete] = useState(() => reducedMotion || !HAS_WEBGL);
  const [isInteractive, setIsInteractive] = useState(() => reducedMotion || !HAS_WEBGL);

  // Track prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || !HAS_WEBGL) {
      onReady?.();
      onPhaseChange?.(RevealPhase.HERO_INTERACTIVE);
      onComplete?.();
    }
  }, [reducedMotion, onReady, onPhaseChange, onComplete]);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.resetToCanonical();
    }
  };

  // Skip handling ref
  const isSkippedRef = useRef(isSkipped);
  useEffect(() => {
    isSkippedRef.current = isSkipped;
  }, [isSkipped]);

  useEffect(() => {
    if (reducedMotion || !HAS_WEBGL) return;

    const currentMount = mountRef.current;
    if (!currentMount) return;

    let animationFrameId;
    let inView = true;
    let pageVisible = !document.hidden;
    let didSignalReady = false;

    let width = currentMount.clientWidth || window.innerWidth;
    let height = currentMount.clientHeight || window.innerHeight;

    // ─── 1. SCENE, CAMERA & HIGH-PERFORMANCE RENDERER ───
    const scene = new THREE.Scene();
    scene.background = null; // Transparent to blend seamlessly with noir background

    // Camera starts in extreme macro close-up (z=2.70)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 2.70);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width >= 1024 ? 1.3 : 1.0));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    currentMount.appendChild(renderer.domElement);

    // ─── 2. HIGH-FIDELITY STUDIO ENVIRONMENT MAP ───
    const studioEnvMap = createStudioEnvironmentMap(renderer);
    scene.environment = studioEnvMap;

    // ─── 3. TRANSFORMATION HIERARCHY (Unified Center Pivot) ───
    // Scene
    // └── masterGroup (Fixed hero position & scale — ZERO orbital revolution)
    //     └── emblemGroup (Centered at (0,0,0), pure X/Y quaternion orientation)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const emblemGroup = createEmblemGroup({ textureQuality: width >= 1024 ? 'desktop' : 'mobile' });
    masterGroup.add(emblemGroup);

    // Initial dramatic macro X/Y angle for Phase 1 & canonical Hero resting angle
    const initialQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.14, -0.26, 0));
    const heroStartQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.06, -0.15, 0));

    emblemGroup.quaternion.copy(initialQuat);

    // ─── 4. CINEMATIC LIGHTING SYSTEM ───
    const lighting = setupEmblemLighting(scene);

    // Dedicated specular sweep light for Phase 1 (Darkness & moving reflection)
    const sweepLight = new THREE.SpotLight(0xf2f7ff, 0, 15, Math.PI / 7, 0.5, 1.2);
    sweepLight.position.set(-2.5, 1.2, 3.4);
    scene.add(sweepLight);
    scene.add(sweepLight.target);

    const onPointerEnter = () => lighting.setHover(true);
    const onPointerLeave = () => lighting.setHover(false);
    currentMount.addEventListener('pointerenter', onPointerEnter);
    currentMount.addEventListener('pointerleave', onPointerLeave);

    // ─── 5. INTERACTIVE X/Y CONTROLS (Initially disabled during intro) ───
    const controls = createEmblemControls(emblemGroup, renderer.domElement);
    controls.setBaseQuaternion(heroStartQuat);
    controls.setEnabled(false);
    controlsRef.current = controls;

    // ─── 6. RESPONSIVE GEOMETRY & TARGET CONFIGURATION ───
    let heroTarget = { x: 2.40, y: -0.02, z: 0, scale: 0.82 };

    const updateDimensions = (w, h) => {
      const isDesktop = w >= 1024;
      const isTablet = w >= 640 && w < 1024;
      const aspect = w / h;

      if (isDesktop) {
        // Positioned at ~75% of usable viewport width, ~65% height — clear of Hero typography
        const offsetX = Math.min(2.65, Math.max(1.9, aspect * 1.50));
        heroTarget = { x: offsetX, y: -0.02, z: 0, scale: 0.82 };
      } else if (isTablet) {
        heroTarget = { x: 1.15, y: 0.10, z: -0.4, scale: 0.68 };
      } else {
        heroTarget = { x: 0, y: 0.65, z: -0.8, scale: 0.58 };
      }
    };

    updateDimensions(width, height);

    // ─── 7.5. PRE-WARM SHADERS & GPU PIPELINE (Zero-Hitch Startup) ───
    // Compile all WebGL programs and prime GPU textures/buffers synchronously
    renderer.compile(scene, camera);
    renderer.render(scene, camera);

    // ─── 8. CINEMATIC 4.5-SECOND TIMELINE ENGINE ───
    const clock = new THREE.Clock();
    let timelineTime = 0;
    const phaseNotified = {
      intro: false,
      transition: false,
      interactive: false,
      complete: false
    };

    // Smooth cubic bezier ease-in-out S-curve with continuous 1st derivative
    const easeInOutCubic = (t) => {
      const p = Math.max(0, Math.min(1, t));
      return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    };

    // ─── 9. ANIMATION LOOP (Delta-time safe 60 FPS) ───
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!inView || !pageVisible) return;

      const delta = Math.min(clock.getDelta(), 0.08); // Bound delta to prevent jumps

      // Fast-forward on Skip Intro
      if (isSkippedRef.current && timelineTime < 3.2) {
        timelineTime = 3.2;
      }

      timelineTime += delta;
      if (typeof window !== 'undefined') {
        window.__timelineTime = timelineTime;
      }

      // Initial frame ready signal
      if (!didSignalReady) {
        didSignalReady = true;
        onReady?.();
      }

      // ─── TIMELINE EXECUTION (One unbroken, continuous cinematic shot) ───

      // Phase triggers & notifications
      if (timelineTime >= 0 && !phaseNotified.intro) {
        phaseNotified.intro = true;
        onPhaseChange?.(RevealPhase.INTRO);
      }
      if (timelineTime >= 1.8 && !phaseNotified.transition) {
        phaseNotified.transition = true;
        onPhaseChange?.(RevealPhase.CAMERA_TRANSITION);
      }
      if (timelineTime >= 3.2 && !phaseNotified.interactive) {
        phaseNotified.interactive = true;
        emblemGroup.quaternion.copy(heroStartQuat);
        controls.setEnabled(true);
        controls.syncAfterHandoff();
        setIsInteractive(true);
        onPhaseChange?.(RevealPhase.HERO_INTERACTIVE);
      }
      if (timelineTime >= 4.5 && !phaseNotified.complete) {
        phaseNotified.complete = true;
        setIsSequenceComplete(true);
        onComplete?.();
      }

      // Movement & lighting choreography
      if (timelineTime < 0.8) {
        // ── PHASE 1: DARKNESS & MACRO VIEW (0.0s – 0.8s) ──
        const p = timelineTime / 0.8;
        const u = p * p; // Soft quadratic acceleration

        camera.position.set(0, 0, 2.70);
        masterGroup.position.set(0, 0, 0);
        masterGroup.scale.setScalar(1.0);
        emblemGroup.quaternion.copy(initialQuat);

        // Specular sweep light sweeps across the carved silver AB bevels
        const sweepX = THREE.MathUtils.lerp(-2.8, 2.8, u);
        sweepLight.position.set(sweepX, 1.2, 3.4);
        sweepLight.intensity = Math.sin(p * Math.PI) * 4.2;
      } else if (timelineTime < 3.2) {
        // ── PHASES 2 & 3: CONTINUOUS PULLBACK & MEDALLION GLIDE (0.8s – 3.2s) ──
        const pPullback = (timelineTime - 0.8) / 2.4;
        const uCam = easeInOutCubic(pPullback);

        // Continuous camera pullback: 2.70 -> 8.20 with zero mid-flight hitch
        const camZ = THREE.MathUtils.lerp(2.70, 8.20, uCam);
        camera.position.set(0, 0, camZ);

        // Continuous X/Y orientation slerp into canonical Hero resting angle
        emblemGroup.quaternion.slerpQuaternions(initialQuat, heroStartQuat, uCam);

        // Medallion glides cleanly to stationary hero resting position (1.6s to 3.2s)
        if (timelineTime >= 1.6) {
          const pGlide = (timelineTime - 1.6) / 1.6;
          const uGlide = easeInOutCubic(pGlide);
          const targetX = THREE.MathUtils.lerp(0, heroTarget.x, uGlide);
          const targetY = THREE.MathUtils.lerp(0, heroTarget.y, uGlide);
          const targetScale = THREE.MathUtils.lerp(1.0, heroTarget.scale, uGlide);

          masterGroup.position.set(targetX, targetY, heroTarget.z);
          masterGroup.scale.setScalar(targetScale);
        } else {
          masterGroup.position.set(0, 0, 0);
          masterGroup.scale.setScalar(1.0);
        }

        // Specular sweep light smoothly fades to 0
        if (timelineTime < 1.6) {
          sweepLight.intensity = Math.max(0, 4.2 * (1 - (timelineTime - 0.8) / 0.8));
        } else {
          sweepLight.intensity = 0;
        }
      } else {
        // ── PHASE 4: HOMEPAGE REVEAL & FIXED-PIVOT INTERACTIVE HERO (3.2s+) ──
        // Medallion stays strictly locked at heroTarget position (zero orbital revolution)
        camera.position.set(0, 0, 8.20);
        masterGroup.position.set(heroTarget.x, heroTarget.y, heroTarget.z);
        masterGroup.scale.setScalar(heroTarget.scale);

        // Delta-time safe pure X/Y rotation & inertia
        controls.update(delta);
        lighting.update(timelineTime);
      }

      renderer.render(scene, camera);
    };

    // ─── 10. OBSERVERS & RESIZE ───
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth || window.innerWidth;
      const newHeight = currentMount.clientHeight || window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, newWidth >= 1024 ? 1.3 : 1.0));
      renderer.setSize(newWidth, newHeight);

      updateDimensions(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { rootMargin: '80px 0px', threshold: 0 }
    );
    observer.observe(currentMount);

    const visibilityChange = () => {
      pageVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', visibilityChange);

    animate();

    // ─── 11. DISPOSAL & CLEANUP ───
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibilityChange);
      window.removeEventListener('resize', handleResize);

      currentMount.removeEventListener('pointerenter', onPointerEnter);
      currentMount.removeEventListener('pointerleave', onPointerLeave);

      controls.dispose();
      lighting.dispose();
      if (studioEnvMap) studioEnvMap.dispose();

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => {
              if (mat.map) mat.map.dispose();
              if (mat.bumpMap) mat.bumpMap.dispose();
              if (mat.roughnessMap) mat.roughnessMap.dispose();
              mat.dispose();
            });
          } else {
            if (obj.material.map) obj.material.map.dispose();
            if (obj.material.bumpMap) obj.material.bumpMap.dispose();
            if (obj.material.roughnessMap) obj.material.roughnessMap.dispose();
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      if (typeof window !== 'undefined') {
        delete window.__timelineTime;
      }
    };
  }, [reducedMotion, onReady, onPhaseChange, onComplete]);

  if (reducedMotion || !HAS_WEBGL) {
    return <EmblemFallback />;
  }

  const isInteractiveUI = isInteractive || isSequenceComplete;

  return (
    <div className="relative w-full h-full select-none">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className={`w-full h-full ${isInteractiveUI ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'} outline-none`}
        aria-label="The Reveal — Continuous 3D AB Medallion Artifact"
        role="img"
      />

      {/* Floating Tactical Telemetry & Reset Control */}
      <div
        className={`absolute bottom-8 right-6 sm:right-10 flex flex-col items-end gap-2.5 z-30 pointer-events-auto select-none transition-opacity duration-700 ${
          isInteractiveUI ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 bg-[#0c0c0e]/85 backdrop-blur-md border border-[#292929] px-3 py-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 bg-[#C1121F] rounded-full animate-pulse shadow-[0_0_6px_#C1121F]" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#A1A1A1] uppercase">
            3D ARTIFACT // AXIS [X, Y]
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Reset Canonical View Button */}
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase border border-[#292929] bg-[#111114]/80 text-[#888888] hover:border-[#C1121F] hover:text-[#F5F5F5] transition-all"
            title="Reset to canonical front-facing orientation (or double click)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C1121F]" />
            <span>RESET</span>
          </button>
        </div>

        <div className="font-mono text-[8px] text-[#555555] tracking-widest uppercase hidden sm:block">
          DRAG TO ROTATE [X, Y] • DBL-CLICK TO RESET
        </div>
      </div>
    </div>
  );
}
