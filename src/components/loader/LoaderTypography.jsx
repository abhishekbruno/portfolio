import React from 'react';
import { motion } from 'framer-motion';

/**
 * LoaderTypography
 *
 * Neo-Noir editorial typography for "THE CONTRACT".
 * Features:
 * - Masked vertical line reveals for "ABHISHEK" and "BRUNO"
 * - Condensed display typography ('Bebas Neue' / 'Oswald')
 * - Restrained subtitle: "SYSTEM ARCHITECT"
 * - Environmental status flag: "INITIALIZING DIGITAL ENVIRONMENT"
 * - Zero fictional diagnostic gibberish
 */
export default function LoaderTypography({
  isReducedMotion = false,
  isExiting = false,
  statusText = 'INITIALIZING DIGITAL ENVIRONMENT'
}) {
  const lineVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (custom) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: isReducedMotion ? 0.01 : 0.65,
        delay: isReducedMotion ? 0 : 0.2 + custom * 0.12,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.28, ease: 'easeOut' }
    }
  };

  const labelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isReducedMotion ? 0.01 : 0.5,
        delay: isReducedMotion ? 0 : 0.55,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  return (
    <div className="flex flex-col items-center text-center select-none">
      {/* Title with Masked Line Reveals */}
      <h1 className="the-contract-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.06em] flex flex-col items-center m-0">
        <span className="the-contract-line-mask py-0.5">
          <motion.span
            className="block"
            custom={0}
            variants={lineVariants}
            initial="hidden"
            animate={isExiting ? 'exit' : 'visible'}
          >
            ABHISHEK
          </motion.span>
        </span>
        <span className="the-contract-line-mask py-0.5">
          <motion.span
            className="block text-[#e2e8f0]"
            custom={1}
            variants={lineVariants}
            initial="hidden"
            animate={isExiting ? 'exit' : 'visible'}
          >
            BRUNO
          </motion.span>
        </span>
      </h1>

      {/* Subtitle: SYSTEM ARCHITECT */}
      <div className="the-contract-line-mask mt-2 sm:mt-3">
        <motion.p
          custom={2}
          variants={lineVariants}
          initial="hidden"
          animate={isExiting ? 'exit' : 'visible'}
          className="the-contract-subtitle text-xs sm:text-sm font-semibold tracking-[0.34em] text-[#94a3b8] m-0"
        >
          SYSTEM ARCHITECT
        </motion.p>
      </div>

      {/* Small Secondary Environmental Status Flag */}
      <motion.div
        variants={labelVariants}
        initial="hidden"
        animate={isExiting ? 'exit' : 'visible'}
        className="mt-5 sm:mt-6 inline-flex items-center gap-2 px-3 py-1 border border-[#1e2530] bg-[#090c11]/85 backdrop-blur-xs"
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#c1121f] shadow-[0_0_8px_#c1121f]"
          aria-hidden="true"
        />
        <span className="the-contract-label text-[9px] sm:text-[10px] tracking-[0.24em] text-[#cbd5e1]">
          {statusText}
        </span>
      </motion.div>
    </div>
  );
}
