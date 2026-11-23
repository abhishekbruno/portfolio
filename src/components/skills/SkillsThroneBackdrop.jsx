import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import LivingThroneCharacter from '../character/LivingThroneCharacter';

/**
 * Photorealistic Living Character Throne Centerpiece.
 * Replaces whole-image CSS scaling with an independent anatomical character rig:
 * - Stationary throne backdrop (with seamless inpainting)
 * - Independent thoracic respiration (12–18 BPM, asymmetric expansion + vertical lift)
 * - Physiological blinking (irregular 3–7s, double blinks, authentic eyelid skin/lash textures)
 * - Gaze micro-saccades within physical ocular constraints
 * - Spring-damped loose hair fringe breeze dynamics
 * - Armrest-grounded resting hands with occasional posture settling
 * - Automatic visibility-based frame suspension (0% idle battery drain when off-screen)
 */
export default function SkillsThroneBackdrop() {
  const sceneRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start']
  });
  const drift = useTransform(scrollYProgress, [0, 1], [10, -18]);
  const depthScale = useTransform(scrollYProgress, [0, 1], [0.995, 1.015]);

  return (
    <div className="skills-throne-backdrop" ref={sceneRef} aria-hidden="true">
      {/* Soft crimson ambient halo behind throne crown */}
      <div className="skills-throne-halo" />
      <motion.div
        className="skills-throne-parallax"
        style={reducedMotion ? undefined : { y: drift, scale: depthScale }}
      >
        <LivingThroneCharacter />
      </motion.div>
    </div>
  );
}
