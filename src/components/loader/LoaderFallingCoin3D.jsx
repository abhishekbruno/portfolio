import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createEmblemGroup, createStudioEnvironmentMap } from '../hero/EmblemGeometry';

/**
 * LoaderFallingCoin3D
 *
 * Photorealistic 3D AB Medallion Loading Sequence:
 * THE COIN ROTATES → REVOLVES → FALLS → THE WEBSITE OPENS.
 *
 * Transformation Hierarchy:
 * Scene
 * └── OrbitPivot (THREE.Group)
 *     └── CoinPosition (THREE.Group)
 *         └── CoinRotation (THREE.Group)
 *             └── MedallionGeometry (THREE.Group)
 *
 * Physics & Motion:
 * - 3-Axis continuous quaternion rotation (X tumble, Y spin, Z face roll)
 * - Elliptical orbital revolution with depth perspective scaling
 * - Gravitational acceleration fall: y = y0 + v0*t - 0.5*g*t^2
 * - Complete WebGL context disposal on transition to eliminate GPU contention
 */
export default function LoaderFallingCoin3D({
  state = 'ORBITING', // 'INITIALIZING' | 'REVEALING' | 'ORBITING' | 'DECELERATING' | 'SUSPENDED' | 'FALLING' | 'TRANSITIONING' | 'COMPLETE'
  onFallComplete,
  isReducedMotion = false
}) {
  const mountRef = useRef(null);
  const [webGLFailed] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const testCanvas = document.createElement('canvas');
      return !(testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'));
    } catch {
      return true;
    }
  });
  const stateRef = useRef(state);
  const onFallCompleteRef = useRef(onFallComplete);

  // Keep refs in sync with props
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    onFallCompleteRef.current = onFallComplete;
  }, [onFallComplete]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || isReducedMotion || webGLFailed) return;

    let isDisposed = false;
    let animationFrameId = null;

    // ─── 2. THREE.JS SCENE SETUP ───
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = null; // Transparent background over obsidian loader overlay

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 9.2);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLFailed(true);
      return;
    }

    // ─── 3. CINEMATIC LIGHTING ───
    // Neutral key light (Overhead Softbox)
    const keyLight = new THREE.DirectionalLight(0xf8fafc, 2.4);
    keyLight.position.set(2.5, 4.0, 5.0);
    scene.add(keyLight);

    // Cool metallic rim light (Right/Rear)
    const rimLight = new THREE.DirectionalLight(0xb0c4de, 1.8);
    rimLight.position.set(4.5, 1.5, -3.0);
    scene.add(rimLight);

    // Signature John Wick Crimson grazing rim light (Bottom-Left)
    const crimsonLight = new THREE.DirectionalLight(0xc1121f, 3.2);
    crimsonLight.position.set(-3.5, -2.5, 2.0);
    scene.add(crimsonLight);

    // Deep ambient baseline
    const ambientLight = new THREE.AmbientLight(0x10141d, 0.7);
    scene.add(ambientLight);

    // Procedural Studio HDR Environment Map for physically based reflections
    let envMap = null;
    try {
      envMap = createStudioEnvironmentMap(renderer);
      scene.environment = envMap;
    } catch {
      // Fallback gracefully without custom envMap
    }

    // ─── 4. TRANSFORMATION HIERARCHY ───
    // Scene -> OrbitPivot -> CoinPosition -> CoinRotation -> MedallionGeometry
    const orbitPivot = new THREE.Group();
    scene.add(orbitPivot);

    const coinPosition = new THREE.Group();
    orbitPivot.add(coinPosition);

    const coinRotation = new THREE.Group();
    coinPosition.add(coinRotation);

    const isMobile = width < 768;
    const medallionGroup = createEmblemGroup({
      textureQuality: isMobile ? 'mobile' : 'desktop'
    });

    // Scale coin appropriately for loading viewport
    const coinBaseScale = isMobile ? 0.52 : 0.68;
    medallionGroup.scale.setScalar(coinBaseScale);
    coinRotation.add(medallionGroup);

    // ─── 5. PHYSICAL MOTION & ORBIT PARAMETERS ───
    // Elliptical Orbit radii
    const orbitRadiusX = isMobile ? 0.85 : 1.55;
    const orbitRadiusY = isMobile ? 0.32 : 0.52;
    const orbitRadiusZ = isMobile ? 0.75 : 1.15; // Depth variation with perspective scaling

    let orbitAngle = 0;
    let orbitAngularVelocity = 1.15; // rad/s
    const targetOrbitVelocity = 1.15;

    // Continuous 3-Axis Angular Velocities (local radians/second)
    const angularVelocity = new THREE.Vector3(
      0.78, // X: Forward/backward tumble
      1.42, // Y: Left/right spin exposing front & back
      0.48  // Z: Rotation around face normal
    );

    // Gravity-driven fall physics variables
    let fallElapsed = 0;
    const gravity = 32.0; // scene units / s^2
    const initialFallVelocity = 1.4; // slight upward pop before plunge
    const startFallY = 0.25;
    let hasTriggeredFallExit = false;

    // Deceleration & Centering interpolation
    let decelProgress = 0; // 0 to 1
    let decelStartPos = new THREE.Vector3();
    const targetCenterPos = new THREE.Vector3(0, 0.25, 0);

    // Suspended moment timer
    let suspendedTimer = 0;

    // Initial orientation
    const localQuat = new THREE.Quaternion();
    coinRotation.quaternion.copy(localQuat);

    // Delta time clock
    const clock = new THREE.Clock();

    // ─── 6. RENDER & ANIMATION LOOP ───
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const dt = Math.min(clock.getDelta(), 0.05); // Cap dt to avoid teleports
      const currentState = stateRef.current;

      // ── A. LOCAL 3-AXIS QUATERNION ROTATION ──
      // Calculate delta rotation quaternion around local axes
      const rotDelta = new THREE.Euler(
        angularVelocity.x * dt,
        angularVelocity.y * dt,
        angularVelocity.z * dt,
        'XYZ'
      );
      const qDelta = new THREE.Quaternion().setFromEuler(rotDelta);
      coinRotation.quaternion.multiply(qDelta);
      coinRotation.quaternion.normalize();

      // ── B. STATE-DRIVEN MOTION CONTROLLER ──
      if (currentState === 'INITIALIZING' || currentState === 'REVEALING' || currentState === 'ORBITING') {
        // Continuous Elliptical Orbit
        orbitAngle += orbitAngularVelocity * dt;
        if (orbitAngle > Math.PI * 2) orbitAngle -= Math.PI * 2;

        const ox = orbitRadiusX * Math.cos(orbitAngle);
        const oy = orbitRadiusY * Math.sin(orbitAngle);
        const oz = orbitRadiusZ * Math.sin(orbitAngle);

        coinPosition.position.set(ox, oy, oz);

        // Smooth velocity ramp
        if (orbitAngularVelocity < targetOrbitVelocity) {
          orbitAngularVelocity = Math.min(targetOrbitVelocity, orbitAngularVelocity + dt * 1.5);
        }
      } else if (currentState === 'DECELERATING') {
        // Orbit Deceleration: capture start pos on transition, smoothly interpolate to center
        if (decelProgress === 0) {
          decelStartPos.copy(coinPosition.position);
        }

        decelProgress = Math.min(1.0, decelProgress + dt * 1.6);
        // Ease-out cubic
        const t = 1 - Math.pow(1 - decelProgress, 3);
        coinPosition.position.lerpVectors(decelStartPos, targetCenterPos, t);

        // Slow angular velocity slightly for deliberate feel
        angularVelocity.x = THREE.MathUtils.lerp(angularVelocity.x, 0.5, dt * 2.0);
        angularVelocity.y = THREE.MathUtils.lerp(angularVelocity.y, 0.8, dt * 2.0);
        angularVelocity.z = THREE.MathUtils.lerp(angularVelocity.z, 0.3, dt * 2.0);
      } else if (currentState === 'SUSPENDED') {
        // Suspended Moment: coin stays at center, silver reflection gleams
        coinPosition.position.copy(targetCenterPos);
        suspendedTimer += dt;

        // Specular gleam across the AB lettering: temporarily boost key light
        keyLight.intensity = 2.4 + Math.sin(suspendedTimer * Math.PI / 0.4) * 1.6;
        crimsonLight.intensity = THREE.MathUtils.lerp(crimsonLight.intensity, 1.5, dt * 3.0);
      } else if (currentState === 'FALLING') {
        // Stage C: Gravity-driven downward acceleration
        // y = y0 + v0*t - 0.5*g*t^2
        fallElapsed += dt;
        const currentY = startFallY + (initialFallVelocity * fallElapsed) - (0.5 * gravity * fallElapsed * fallElapsed);
        coinPosition.position.y = currentY;

        // Angular momentum continues spinning the coin as it plunges
        angularVelocity.x += 0.8 * dt; // slight tumbling kick
        angularVelocity.y += 1.2 * dt;

        // Trigger completion callback when coin drops well beneath viewport (y < -6.8)
        if (currentY < -6.8 && !hasTriggeredFallExit) {
          hasTriggeredFallExit = true;
          onFallCompleteRef.current?.();
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // ─── 7. RESIZE LISTENER ───
    const handleResize = () => {
      if (isDisposed || !container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ─── 8. CLEANUP & WEBGL CONTEXT DISPOSAL ───
    return () => {
      isDisposed = true;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', handleResize);

      // Deep disposal of Three.js resources
      scene.traverse((obj) => {
        if (obj.isMesh || obj.isLine || obj.isInstancedMesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => {
                if (m.map) m.map.dispose();
                if (m.bumpMap) m.bumpMap.dispose();
                if (m.roughnessMap) m.roughnessMap.dispose();
                m.dispose();
              });
            } else {
              if (obj.material.map) obj.material.map.dispose();
              if (obj.material.bumpMap) obj.material.bumpMap.dispose();
              if (obj.material.roughnessMap) obj.material.roughnessMap.dispose();
              obj.material.dispose();
            }
          }
        }
      });

      if (envMap) envMap.dispose();

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, [isReducedMotion, webGLFailed]);

  if (webGLFailed || isReducedMotion) {
    return (
      <div className="the-contract-fallback-wrap flex items-center justify-center w-full h-[320px]">
        <div className="w-48 h-48 rounded-full border border-[#cbd5e1]/30 bg-[#0c1017] flex items-center justify-center shadow-[0_0_50px_rgba(193,18,31,0.2)]">
          <span className="font-title text-4xl text-[#f1f5f9] tracking-widest font-bold">AB</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="the-contract-3d-coin-stage w-full h-[380px] sm:h-[460px] md:h-[520px] relative pointer-events-none"
      aria-label="3D Rotating and Revolving AB Medallion"
    />
  );
}
