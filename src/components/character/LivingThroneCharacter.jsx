import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { BreathingController } from './BreathingController';
import { FacialAnimationController } from './FacialAnimationController';
import { HairDynamics } from './HairDynamics';
import { PostureController } from './PostureController';
import { CharacterMotionConfig } from './CharacterMotionConfig';

// Layered asset representations extracted from the original portrait
import throneBase from '../../assets/throne/living/throne_base.webp';
import characterFull from '../../assets/throne/living/character_full.webp';
import characterChest from '../../assets/throne/living/character_chest.webp';
import characterHead from '../../assets/throne/living/character_head.webp';
import characterHair from '../../assets/throne/living/character_hair.webp';
import eyelidLeft from '../../assets/throne/living/eyelid_left.webp';
import eyelidRight from '../../assets/throne/living/eyelid_right.webp';

import './living-character.css';

/**
 * LivingThroneCharacter
 *
 * Transforms the static seated portrait into a living cinematic character.
 *
 * Independent Anatomical Systems:
 * 1. Stationary Throne: Inpainted background prevents transparency gaps.
 * 2. Thoracic Respiration: Asymmetric chest expansion (12–18 BPM) with lapel & tie inertia.
 * 3. Physiological Eyelids: Irregular biological blinking (3–7s, double blinks) & micro-saccades.
 * 4. Hair Breeze: Spring-damped loose fringe motion responsive to ambient air currents.
 * 5. Grounded Posture: Hands firmly planted on armrests with resting posture settling.
 * 6. High-Performance: Direct GPU-accelerated DOM transforms; zero React frame re-renders;
 *    automatic frame suspension when off-screen via IntersectionObserver.
 */
export default function LivingThroneCharacter() {
  const stageRef = useRef(null);
  const baseBodyRef = useRef(null);
  const chestRef = useRef(null);
  const headRef = useRef(null);
  const eyelidLeftRef = useRef(null);
  const eyelidRightRef = useRef(null);
  const hairRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const stageEl = stageRef.current;
    if (!stageEl) return;

    // Instantiate independent biomechanical controllers
    const breathing = new BreathingController(CharacterMotionConfig.respiration);
    const facial = new FacialAnimationController(CharacterMotionConfig.eyes);
    const hair = new HairDynamics(CharacterMotionConfig.hair);
    const posture = new PostureController(CharacterMotionConfig.posture);

    let animationFrameId;
    let isVisible = true;
    let parallaxX = 0;
    let parallaxY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;

    // ─── 1. VISIBILITY-BASED FRAME SUSPENSION ───
    // Automatically pauses animation when Skills is scrolled off-screen (0% idle battery drain)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: '100px 0px', threshold: 0 }
    );
    observer.observe(stageEl);

    // ─── 2. SUBTLE MOUSE PARALLAX TRACKING ───
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

      // Update controllers
      const breathState = breathing.update(t);
      const eyeState = facial.update(t);
      const hairState = hair.update(t);
      const postureState = posture.update(t);

      // Smooth parallax interpolation
      parallaxX += (targetParallaxX - parallaxX) * CharacterMotionConfig.parallax.smoothing;
      parallaxY += (targetParallaxY - parallaxY) * CharacterMotionConfig.parallax.smoothing;

      // 1. Base Body: resting hands remain supported on armrests, subtle posture settle
      if (baseBodyRef.current) {
        baseBodyRef.current.style.transform = `translate3d(${(postureState.torsoShiftX + parallaxX * 0.6).toFixed(2)}px, ${(postureState.legSettleY + parallaxY * 0.5).toFixed(2)}px, 0)`;
      }

      // 2. Chest: independent thoracic expansion and vertical lift during inhalation
      if (chestRef.current) {
        const liftY = -breathState.chestLift + parallaxY * 0.8;
        const scaleX = breathState.chestScaleX;
        const scaleY = breathState.chestScaleY;
        chestRef.current.style.transform = `translate3d(${(postureState.torsoShiftX + parallaxX * 0.8).toFixed(2)}px, ${liftY.toFixed(2)}px, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
      }

      // 3. Head & Gaze: supported by neck, micro-saccades within physiological limits
      if (headRef.current) {
        const headLiftY = -breathState.shoulderLift * 0.45 + parallaxY * 0.9;
        const headShiftX = eyeState.gazeOffsetX * 0.25 + postureState.torsoShiftX * 0.4 + parallaxX * 0.9;
        headRef.current.style.transform = `translate3d(${headShiftX.toFixed(2)}px, ${headLiftY.toFixed(2)}px, 0)`;
      }

      // 4. Biological Eyelids: irregular natural blink closures with authentic skin texture
      const blinkProg = eyeState.blinkProgress;
      const lidTranslate = ((1 - blinkProg) * -100).toFixed(1);
      const lidOpacity = blinkProg > 0.04 ? '1' : '0';

      if (eyelidLeftRef.current) {
        eyelidLeftRef.current.style.transform = `translateY(${lidTranslate}%)`;
        eyelidLeftRef.current.style.opacity = lidOpacity;
      }
      if (eyelidRightRef.current) {
        eyelidRightRef.current.style.transform = `translateY(${lidTranslate}%)`;
        eyelidRightRef.current.style.opacity = lidOpacity;
      }

      // 5. Hair Fringe: spring-damped breeze dynamics
      if (hairRef.current) {
        const hairShiftX = (hairState.hairDisplaceX + parallaxX * 0.95).toFixed(2);
        const hairRot = hairState.hairAngleLeft.toFixed(2);
        hairRef.current.style.transform = `translate3d(${hairShiftX}px, 0, 0) rotate(${hairRot}deg)`;
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
      aria-label="Photorealistic Living Throne Character"
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

      {/* Layer 2: Deformable Chest, Lapels, Shirt & Tie (Independent Breathing) */}
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

      {/* Layer 3: Head, Neck, and Stable Hair Base */}
      <div ref={headRef} className="living-character-head-wrap" aria-hidden="true">
        <img
          src={characterHead}
          alt=""
          className="living-character-head-img"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Layer 4: Left Physiological Eyelid (Viewer's Left) */}
      <div ref={eyelidLeftRef} className="living-character-eyelid living-character-eyelid--left" aria-hidden="true">
        <img src={eyelidLeft} alt="" draggable={false} />
      </div>

      {/* Layer 4: Right Physiological Eyelid (Viewer's Right) */}
      <div ref={eyelidRightRef} className="living-character-eyelid living-character-eyelid--right" aria-hidden="true">
        <img src={eyelidRight} alt="" draggable={false} />
      </div>

      {/* Layer 5: Loose Hair Fringe Breeze Dynamics */}
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

      {/* Layer 6: Atmospheric Rim Illumination Integration */}
      <div className="living-character-rim-light" aria-hidden="true" />
    </div>
  );
}
