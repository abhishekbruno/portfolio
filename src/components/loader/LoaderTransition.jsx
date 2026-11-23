import React from 'react';

/**
 * LoaderTransition
 *
 * Master split-panel shutter transition container for "THE CONTRACT".
 * Features:
 * - Phase 1: Obsidian darkness, emerging crimson lighting from left, thin silver center line
 * - Phase 5: Cinematic split reveal (upper panel slides up, lower panel slides down)
 * - Corner precision reticles (┌ ┐ └ ┘)
 * - Atmospheric smoke & subtle vignette
 * - Clean hardware-accelerated transitions
 */
export default function LoaderTransition({
  isRevealing = false,
  children
}) {
  return (
    <div
      className={`the-contract-loader ${isRevealing ? 'the-contract-loader--reveal' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="The Contract loading sequence"
    >
      {/* ─── SPLIT SHUTTER PANELS (Phase 5 Shutter Split) ─── */}
      <div className="the-contract-shutter" aria-hidden="true">
        {/* Upper Shutter Panel */}
        <div className="the-contract-panel the-contract-panel--top">
          {/* Subtle top subtle texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        </div>

        {/* Lower Shutter Panel */}
        <div className="the-contract-panel the-contract-panel--bottom">
          {/* Subtle bottom subtle texture */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ─── ATMOSPHERIC BACKGROUND LAYERS (Phases 1-4) ─── */}
      {/* 1. Emerging Left-Side Crimson Atmospheric Lighting Bleed */}
      <div className="the-contract-crimson-bleed" aria-hidden="true" />

      {/* 2. Soft Atmospheric Smoke Drift */}
      <div className="the-contract-smoke" aria-hidden="true" />

      {/* 3. Phase 1 Thin Silver Horizon Reticle Line */}
      <div className="the-contract-horizon-line" aria-hidden="true" />

      {/* 4. Deep Vignette Shadowing */}
      <div className="the-contract-vignette" aria-hidden="true" />

      {/* 5. Four Minimal Geometric Target Reticle Corners */}
      <div className="the-contract-reticle the-contract-reticle--tl" aria-hidden="true" />
      <div className="the-contract-reticle the-contract-reticle--tr" aria-hidden="true" />
      <div className="the-contract-reticle the-contract-reticle--bl" aria-hidden="true" />
      <div className="the-contract-reticle the-contract-reticle--br" aria-hidden="true" />

      {/* ─── STAGE CONTENT ─── */}
      <div className="the-contract-stage">
        {children}
      </div>
    </div>
  );
}
