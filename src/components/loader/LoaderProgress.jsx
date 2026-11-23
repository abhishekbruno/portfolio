import React from 'react';

/**
 * LoaderProgress
 *
 * Minimal horizontal crimson progress indicator for "THE CONTRACT".
 * Features:
 * - Reflects genuine application readiness rather than fabricated random percentages
 * - Dynamic width tracking: mount -> fonts -> webgl context -> first 3D frame
 * - Indeterminate sweep beam active while waiting for 3D first render frame
 * - Precision metallic border framing
 * - Completes with brushed silver-crimson flash when critical resources ready
 */
export default function LoaderProgress({
  progress = 0,
  isReady = false,
  isReducedMotion = false
}) {
  return (
    <div
      className="mt-6 sm:mt-8 flex flex-col items-center gap-2"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Application initialization readiness"
    >
      {/* Precision Reticle Track */}
      <div className="the-contract-progress-track">
        {/* Fill Indicator */}
        <div
          className="the-contract-progress-fill"
          style={{
            width: `${Math.min(100, Math.max(progress, 8))}%`,
            transition: isReducedMotion ? 'none' : 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />

        {/* Indeterminate Ambient Beam while awaiting final 3D frame */}
        {!isReady && !isReducedMotion && (
          <div className="the-contract-progress-sweep" aria-hidden="true" />
        )}
      </div>

      {/* Subtle Hairline Frame Coordinates */}
      <div className="flex items-center justify-between w-full max-w-[300px] px-0.5 pointer-events-none select-none text-[8px] font-mono tracking-[0.22em] text-[#475569]">
        <span>SPEC // 001</span>
        <span className="text-[#c1121f]/90">
          {isReady ? 'RENDERED • READY' : 'INITIALIZING'}
        </span>
        <span>LAT // 28.61</span>
      </div>
    </div>
  );
}
