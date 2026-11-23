import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * ChapterTransition
 *
 * Placed at the entry point of each section to create the feel of a filmic chapter transition:
 * 1. Thin crimson separator reveals from 0% to 100% width as the section approaches the viewport.
 * 2. Restrained ambient crimson illumination subtly lights the chapter background.
 * 3. Native page scrolling remains 100% untouched.
 */
export default function ChapterTransition() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Top Chapter Crimson Separator Laser */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden pointer-events-none z-10" aria-hidden="true">
        <motion.div
          initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full bg-gradient-to-r from-transparent via-[#C1121F]/80 to-transparent shadow-[0_0_8px_#C1121F]"
        />
      </div>

      {/* Restrained Chapter Ambient Glow */}
      <div
        className="absolute top-0 right-[15%] w-[450px] h-[350px] rounded-full pointer-events-none z-0 select-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(193, 18, 31, 0.06) 0%, rgba(120, 0, 0, 0.02) 40%, transparent 70%)'
        }}
        aria-hidden="true"
      />
    </>
  );
}
