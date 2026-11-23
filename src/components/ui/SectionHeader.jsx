import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * SectionHeader
 *
 * Cinematic Section Header with:
 * - Chapter indicator & horizontal laser line expansion
 * - Title revealed through an overflow-hidden vertical clipping mask
 * - Thin crimson accent stripe expanding from 0 to 100% width
 * - Editorial subtitle fading in with restrained easing
 * - Full prefers-reduced-motion compliance
 */
export default function SectionHeader({
  chapter = '01',
  category = 'INITIATIVE',
  title,
  subtitle,
  align = 'left',
  className = ''
}) {
  const shouldReduceMotion = useReducedMotion();
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  const transitionSettings = {
    duration: shouldReduceMotion ? 0.01 : 0.7,
    ease: [0.16, 1, 0.3, 1]
  };

  return (
    <div className={`flex flex-col mb-12 md:mb-16 ${alignClass} ${className}`}>
      {/* Chapter Metadata Indicator */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-3"
      >
        <span className="font-mono text-xs font-semibold text-[#C1121F] tracking-widest uppercase">
          // {chapter}
        </span>
        <motion.span
          initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-8 h-[1px] bg-[#C1121F]/60"
        />
        <span className="font-mono text-xs text-[#A1A1A1] tracking-[0.2em] uppercase">
          {category}
        </span>
      </motion.div>

      {/* Monumental Cinematic Title in an Overflow-Hidden Mask */}
      <div className="overflow-hidden">
        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={transitionSettings}
          className="font-title text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-[#F5F5F5] leading-none"
        >
          {title}
        </motion.h2>
      </div>

      {/* Thin Red Accent Stripe Animating Horizontally */}
      <motion.div
        initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="w-16 h-[2px] bg-[#C1121F] mt-4 mb-4 shadow-[0_0_8px_rgba(193,18,31,0.5)]"
      />

      {/* Readable Editorial Subtitle */}
      {subtitle && (
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-sm sm:text-base text-[#A1A1A1] max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
