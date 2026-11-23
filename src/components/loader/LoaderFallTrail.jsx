import React from 'react';
import { motion } from 'framer-motion';

/**
 * LoaderFallTrail
 *
 * Cinematic crimson laser trajectory tracing the vertical fall of the coin.
 * Features:
 * - High-speed vertical laser streak centered on the fall path
 * - Intense glowing particle head and fading tail
 * - Restrained atmospheric flare
 */
export default function LoaderFallTrail({ isActive = false, isReducedMotion = false }) {
  if (!isActive || isReducedMotion) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-30 flex justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* Central Vertical Laser Streak */}
      <motion.div
        initial={{ y: '-20%', scaleY: 0, opacity: 0 }}
        animate={{ y: '120%', scaleY: [0, 1.8, 0.4], opacity: [0, 1, 0] }}
        transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
        className="w-[2px] h-[350px] bg-gradient-to-b from-transparent via-[#c1121f] to-white shadow-[0_0_24px_#c1121f,0_0_48px_rgba(255,255,255,0.8)]"
      />

      {/* Trailing Ambient Laser Flare */}
      <motion.div
        initial={{ y: '0%', opacity: 0 }}
        animate={{ y: '100%', opacity: [0, 0.7, 0] }}
        transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
        className="w-[120px] h-[300px] bg-gradient-to-b from-transparent via-red-900/30 to-transparent blur-md"
      />
    </div>
  );
}
