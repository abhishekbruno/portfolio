import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { BreathingController } from './BreathingController';
import { HeadMotionController } from './HeadMotionController';
import { HairDynamics } from './HairDynamics';
import { PostureController } from './PostureController';
import { CharacterMotionConfig } from './CharacterMotionConfig';

// Layered asset representations extracted from the original portrait
import throneBase from '../../assets/throne/living/throne_base.webp';
import characterFull from '../../assets/throne/living/character_full.webp';
import characterChest from '../../assets/throne/living/character_chest.webp';
import characterHead from '../../assets/throne/living/character_head.webp';
import characterHair from '../../assets/throne/living/character_hair.webp';

import './living-character.css';

/**
 * LivingThroneCharacter — Rebuilt Layered Anatomical Rig
 *
 * Transforms the static seated portrait into a believable, living cinematic character:
 * 1. Stationary Throne: Inpainted throne backdrop remains 100% stable (Layer 0).
 * 2. Grounded Seated Posture: Hands firmly planted on wooden armrests with zero sliding (Layer 1).
 * 3. Perceptible Thoracic Respiration: Independent sternum elevation (3.2px) & ribcage lateral expansion (2.0%)
 *    with realistic lapel and necktie response (Layer 2).
 * 4. Anatomical Head & Neck Kinematics: Cervical pivot (50% 95%) allows subtle contemplative horizontal rotation (1.6°)
 *    and forward tilt (0.9°), seamlessly connected to the suit collar with zero detached-photo effect (Layer 3).
 * 5. Dynamic Spring Hair Physics: Hairline root is strictly anchored to the forehead (50% 0%), while loose fringe tips
 *    sway with visible spring dynamics and damping in response to ambient indoor breezes and head inertia (Layer 3b).
 * 6. Authentic Facial Fidelity: Retains photographic sharpness of the gaze, eyebrows, and facial structure without
 *    unrealistic warping or pixelated sticker overlays.
 * 7. High-Performance Execution: 60 FPS direct DOM matrix transforms; zero React frame re-renders;
 *    automatic frame suspension when scrolled off-screen via IntersectionObserver.
 */
export default function LivingThroneCharacter() {
  const stageRef = useRef(null);
  const baseBodyRef = useRef(null);
  const chestRef = useRef(null);
  const headRef = useRef(null);
  const hairRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const stageEl = stageRef.current;
    if (!stageEl) return;

    // Instantiate biomechanical kinematic controllers
    const breathing = new BreathingController(CharacterMotionConfig.respiration);
    const headMotion = new HeadMotionController(CharacterMotionConfig.head);
    const hair = new HairDynamics(CharacterMotionConfig.hair);
    const posture = new PostureController(CharacterMotionConfig.posture);

    let animationFrameId;
    let isVisible = true;
    let parallaxX = 0;
    let parallaxY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let lastYaw = 0;

    // ─── 1. VISIBILITY-BASED FRAME SUSPENSION ───
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: '100px 0px', threshold: 0 }
    );
    observer.observe(stageEl);

    // ─── 2. SUBTLE UNIFIED MOUSE PARALLAX TRACKING ───
    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      targetParallaxX = nx * CharacterMotionConfig.parallax.maxShiftX;
      targetParallaxY = ny * CharacterMotionConfig.parallax.maxShiftY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // ─── 3. HIGH-PERFORMANCE 60FPS DIRECT TRANSFORMS LOOP ───
    const animate = (currentTimeMs) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const t = currentTimeMs * 0.001;

      // Update biomechanical controllers
      const breathState = breathing.update(t);
      const headState = headMotion.update(t);
      const headDeltaYaw = headState.yawDeg - lastYaw;
      lastYaw = headState.yawDeg;

      const hairState = hair.update(t, headDeltaYaw);
      posture.update(t);

      // Smooth parallax interpolation with unified tracking to prevent layer shearing
      parallaxX += (targetParallaxX - parallaxX) * CharacterMotionConfig.parallax.smoothing;
      parallaxY += (targetParallaxY - parallaxY) * CharacterMotionConfig.parallax.smoothing;
      const px = (parallaxX * 0.35).toFixed(2);
      const py = (parallaxY * 0.25).toFixed(2);

      // 1. Base Seated Body: firmly grounded on armrests and throne
      if (baseBodyRef.current) {
        baseBodyRef.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      }

      // 2. Chest: perceptible resting respiration (3.2px sternum lift, 2.0% lateral expansion)
      if (chestRef.current) {
        const liftY = (-breathState.chestLift + Number(py)).toFixed(2);
        const scaleX = breathState.chestScaleX.toFixed(4);
        const scaleY = breathState.chestScaleY.toFixed(4);
        chestRef.current.style.transform = `translate3d(${px}px, ${liftY}px, 0) scale(${scaleX}, ${scaleY})`;
      }

      // 3. Head & Neck: cervical pivot rotation (yaw/pitch) + breath coupling
      if (headRef.current) {
        const headLiftY = (-breathState.headLift + Number(py)).toFixed(2);
        const yaw = headState.yawDeg.toFixed(2);
        const pitch = headState.pitchDeg.toFixed(2);
        headRef.current.style.transform = `translate3d(${px}px, ${headLiftY}px, 0) rotate(${yaw}deg) rotateX(${pitch}deg)`;
      }

      // 4. Hair Fringe: hairline anchored to forehead; tip compliance to breeze & inertia
      if (hairRef.current) {
        const tipRot = hairState.tipAngle.toFixed(2);
        const tipSkew = hairState.tipSkew.toFixed(2);
        hairRef.current.style.transform = `rotate(${tipRot}deg) skewX(${tipSkew}deg)`;
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={stageRef}
      className="living-character-stage"
      aria-label="Cinematic Living Throne Character"
      role="img"
    >
      {/* Layer 0: Stationary Throne Backdrop (Completely Solid & Stationary) */}
      <img
        src={throneBase}
        alt=""
        className="living-character-throne"
        draggable={false}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />

      {/* Layer 1: Base Seated Body (Grounded Hands on Armrests & Crossed Legs) */}
      <img
        ref={baseBodyRef}
        src={characterFull}
        alt=""
        className="living-character-base-body"
        draggable={false}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />

      {/* Layer 2: Deformable Chest, Lapels, Shirt & Tie (Thoracic Respiration) */}
      <div ref={chestRef} className="living-character-chest-wrap" aria-hidden="true">
        <img
          src={characterChest}
          alt=""
          className="living-character-chest-img"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Layer 3: Head, Neck, Face & Hair (Unified Anatomical Skull) */}
      <div ref={headRef} className="living-character-head-wrap" aria-hidden="true">
        <img
          src={characterHead}
          alt=""
          className="living-character-head-img"
          draggable={false}
          loading="lazy"
          decoding="async"
        />

        {/* Layer 3b: Loose Hair Fringe (Child of Head, Hairline Root Pinned) */}
        <div ref={hairRef} className="living-character-hair-wrap" aria-hidden="true">
          <img
            src={characterHair}
            alt=""
            className="living-character-hair-img"
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Layer 4: Atmospheric Rim Illumination Integration */}
      <div className="living-character-rim-light" aria-hidden="true" />
    </div>
  );
}
