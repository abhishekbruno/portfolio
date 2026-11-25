import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import evidenceWallWebp from '../../assets/forge/evidence-wall.webp';
import evidenceWallPng from '../../assets/forge/evidence-wall.png';

/**
 * ForgeEvidenceWall
 *
 * Seamless environmental background integration of the supplied evidence-wall
 * artwork inside "002 / THE FORGE".
 *
 * - Renders the optimized WebP asset (with PNG fallback) via a single <picture>.
 * - Uses multi-stage directional CSS gradient masks so the left charcoal void
 *   dissolves smoothly into #07080B behind the manifesto while keeping the
 *   investigation board, stages, pushpins, and crimson threads sharp on the right.
 * - Strictly non-interactive (`pointer-events: none`) with static layout sizing
 *   to avoid CLS and GPU blur overhead.
 */
export default function ForgeEvidenceWall({ className = '', variant = 'desktop' }) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.14 });

  const isVisible = shouldReduceMotion || isInView;
  const isDesktop = variant === 'desktop';

  return (
    <div
      ref={containerRef}
      className={`forge-wall-stage ${
        isDesktop ? 'forge-wall-stage--desktop' : 'forge-wall-stage--stacked'
      } ${className}`}
      aria-hidden="true"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: 14 }}
        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="forge-wall-motion-frame"
      >
        <div className="forge-wall-vfade">
          <picture className="forge-wall-picture">
            <source srcSet={evidenceWallWebp} type="image/webp" />
            <img
              src={evidenceWallPng}
              alt=""
              width={1024}
              height={576}
              loading="eager"
              decoding="async"
              draggable={false}
              className="forge-wall-img"
            />
          </picture>
        </div>

        {/* Subtle edge-matching atmospheric falloff into #07080B without dulling the board */}
        <div className="forge-wall-env-overlay" />
      </motion.div>
    </div>
  );
}
