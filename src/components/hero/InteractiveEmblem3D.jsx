import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Compass } from 'lucide-react';
import { createEmblemGroup } from './EmblemGeometry';
import { setupEmblemLighting } from './EmblemLighting';
import { createEmblemControls } from './EmblemControls';
import EmblemFallback from './EmblemFallback';

/**
 * InteractiveEmblem3D
 *
 * Fully integrated 3D Neo-Noir Medallion centerpiece.
 * Replaces the wireframe sphere with true 3D physical geometry:
 * - Thick cylindrical coin body with front, side knurling, and reverse face
 * - Extruded and beveled 3D 'AB' Monogram with chamfers
 * - 4 Cardinal Crimson Sight Notches
 * - Concentric engraved bands and curved typography
 * - Full 3-Axis (XYZ) Free Rotation with physics inertia and idle breathing drift
 * - Seamless environmental background integration with floating embers
 */
export default function InteractiveEmblem3D() {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const [zAxisActive, setZAxisActive] = useState(false);
  const [hasWebGL] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const testCanvas = document.createElement('canvas');
      return Boolean(testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Sync Z-Axis mode toggle with controls
  const toggleZAxis = () => {
    setZAxisActive((prev) => {
      const next = !prev;
      if (controlsRef.current) {
        controlsRef.current.setShiftActive(next);
      }
      return next;
    });
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.resetToCanonical();
    }
  };

  useEffect(() => {
    if (reducedMotion || !hasWebGL) return;

    const currentMount = mountRef.current;
    if (!currentMount) return;

    let animationFrameId;
    let width = currentMount.clientWidth || window.innerWidth;
    let height = currentMount.clientHeight || window.innerHeight;

    // 1. Scene, Camera & High-Performance Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    currentMount.appendChild(renderer.domElement);

    // 2. Master Environmental Positioning Group
    const positionGroup = new THREE.Group();
    scene.add(positionGroup);

    // 3. Construct the 3D AB Medallion Geometry & Materials
    const emblemGroup = createEmblemGroup();
    positionGroup.add(emblemGroup);

    // 4. Responsive Positioning & Scaling
    const updateEmblemLayout = (w, h) => {
      const isDesktop = w >= 1024;
      const isTablet = w >= 640 && w < 1024;

      if (isDesktop) {
        const aspect = w / h;
        const offsetX = Math.min(2.7, aspect * 1.35);
        positionGroup.position.set(offsetX, -0.05, 0);
        positionGroup.scale.set(1.32, 1.32, 1.32);
      } else if (isTablet) {
        positionGroup.position.set(1.35, 0.15, -1.0);
        positionGroup.scale.set(1.1, 1.1, 1.1);
      } else {
        // Mobile: Centered background centerpiece
        positionGroup.position.set(0, 0.65, -1.4);
        positionGroup.scale.set(0.92, 0.92, 0.92);
      }
    };

    updateEmblemLayout(width, height);

    // 5. Cinematic Lighting System
    const lighting = setupEmblemLighting(scene);

    // 6. Interactive 3-Axis Trackball & Inertia Controls
    const controls = createEmblemControls(emblemGroup, renderer.domElement);
    controlsRef.current = controls;

    // 7. Ambient Neo-Noir Floating Embers & Particle Field
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const crimsonColor = new THREE.Color(0xC1121F);
    const ashColor = new THREE.Color(0x555555);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 20;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const clr = Math.random() > 0.45 ? crimsonColor : ashColor;
      particleColors[i * 3] = clr.r;
      particleColors[i * 3 + 1] = clr.g;
      particleColors[i * 3 + 2] = clr.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Background Architectural Orbit Hairline Ring
    const ambientRingGeo = new THREE.TorusGeometry(5.2, 0.005, 16, 160);
    const ambientRingMat = new THREE.MeshBasicMaterial({
      color: 0xC1121F,
      transparent: true,
      opacity: 0.15
    });
    const ambientRing = new THREE.Mesh(ambientRingGeo, ambientRingMat);
    ambientRing.position.set(positionGroup.position.x, positionGroup.position.y, -2.5);
    ambientRing.rotation.x = Math.PI / 3;
    scene.add(ambientRing);

    // 9. Resize Handling with ResizeObserver
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth || window.innerWidth;
      const newHeight = currentMount.clientHeight || window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      updateEmblemLayout(newWidth, newHeight);
      ambientRing.position.set(positionGroup.position.x, positionGroup.position.y, -2.5);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Controls update (handles inertia and idle drift)
      controls.update(elapsedTime);

      // Lighting update (subtle rim breathing)
      lighting.update(elapsedTime);

      // Slow particle float
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime * 0.4 + i) * 0.0015;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Subtle ambient ring drift
      ambientRing.rotation.z = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      controls.dispose();
      lighting.dispose();

      // Deep disposal of scene objects
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => {
              if (mat.map) mat.map.dispose();
              if (mat.bumpMap) mat.bumpMap.dispose();
              mat.dispose();
            });
          } else {
            if (obj.material.map) obj.material.map.dispose();
            if (obj.material.bumpMap) obj.material.bumpMap.dispose();
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion, hasWebGL]);

  if (reducedMotion || !hasWebGL) {
    return <EmblemFallback />;
  }

  return (
    <div className="relative w-full h-full select-none">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
        aria-label="Interactive 3D AB Medallion - Drag to rotate freely in 3D"
        role="img"
      />

      {/* Floating Tactical Telemetry & Mode Controls */}
      <div className="absolute bottom-8 right-6 sm:right-10 flex flex-col items-end gap-2.5 z-30 pointer-events-auto select-none">
        <div className="flex items-center gap-2 bg-[#0c0c0e]/85 backdrop-blur-md border border-[#292929] px-3 py-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 bg-[#C1121F] rounded-full animate-pulse shadow-[0_0_6px_#C1121F]" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#A1A1A1] uppercase">
            3D ARTIFACT // {zAxisActive ? 'ROLL [Z-AXIS]' : 'ORBIT [X, Y]'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Z-Axis Roll Toggle Button */}
          <button
            type="button"
            onClick={toggleZAxis}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase border transition-all ${
              zAxisActive
                ? 'border-[#C1121F] bg-[#C1121F]/20 text-[#F5F5F5] shadow-[0_0_10px_rgba(193,18,31,0.3)]'
                : 'border-[#292929] bg-[#111114]/80 text-[#888888] hover:border-[#444] hover:text-[#CCC]'
            }`}
            title="Toggle Z-Axis In-Plane Rotation (or hold Shift while dragging)"
          >
            <Compass className={`w-3.5 h-3.5 ${zAxisActive ? 'text-[#C1121F]' : 'text-[#888888]'}`} />
            <span>Z-ROLL</span>
          </button>

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
          DRAG TO ROTATE • SHIFT+DRAG FOR ROLL • DBL-CLICK TO RESET
        </div>
      </div>
    </div>
  );
}
