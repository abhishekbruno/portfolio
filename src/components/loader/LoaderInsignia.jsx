import React from 'react';

/**
 * LoaderInsignia
 *
 * Lightweight, high-precision SVG representation of the iconic AB Medallion.
 * Features:
 * - Concentric brushed-metal machining grooves
 * - 60 precision radial ticks
 * - 4 Cardinal crimson sight markers
 * - Engraved circular text: ABHISHEK BRUNO • SYSTEM ARCHITECT
 * - Dual-tone brushed silver monogram (A and B)
 * - Moving specular metallic gleam
 * - Restrained crimson edge reflections
 * - ZERO secondary WebGL context — pure CSS & SVG hardware acceleration
 */
export default function LoaderInsignia({ isReady = false, isReducedMotion = false }) {
  // Generate 60 radial ticks around the outer perimeter
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const angle = (i * 360) / 60;
    const isMajor = i % 5 === 0;
    const length = isMajor ? 5 : 2.5;
    const strokeWidth = isMajor ? 1.2 : 0.6;
    const strokeColor = isMajor ? '#94a3b8' : '#475569';
    return (
      <line
        key={i}
        x1="100"
        y1={12}
        x2="100"
        y2={12 + length}
        transform={`rotate(${angle} 100 100)`}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    );
  });

  return (
    <div
      className={`the-contract-insignia-wrap ${isReady ? 'the-contract-insignia--ready-flash' : ''}`}
      aria-label="Abhishek Bruno Silver Emblem"
      role="img"
    >
      {/* Outer Crimson Atmospheric Rim Glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(193, 18, 31, 0.18) 0%, rgba(120, 0, 0, 0.08) 50%, transparent 72%)',
          filter: 'blur(8px)',
          transform: 'scale(1.2)'
        }}
        aria-hidden="true"
      />

      <div className="the-contract-insignia-inner">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Multi-stop Brushed Silver Linear Gradient */}
            <linearGradient id="contractSilverGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="22%" stopColor="#dbeafe" />
              <stop offset="48%" stopColor="#94a3b8" />
              <stop offset="78%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            {/* Dark Gunmetal Coin Base Radial Gradient */}
            <radialGradient id="coinBaseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#171c24" />
              <stop offset="65%" stopColor="#0d1117" />
              <stop offset="88%" stopColor="#080a0f" />
              <stop offset="100%" stopColor="#040507" />
            </radialGradient>

            {/* Crimson Subtle Edge Lighting Filter */}
            <radialGradient id="crimsonRimReflect" cx="25%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="45%" stopColor="rgba(193,18,31,0.12)" />
              <stop offset="75%" stopColor="rgba(120,0,0,0.22)" />
              <stop offset="100%" stopColor="rgba(10,12,16,0.9)" />
            </radialGradient>

            {/* Crimson Sight Glow */}
            <filter id="crimsonLaserGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Monogram Drop Shadow */}
            <filter id="monogramDepth" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.85" />
            </filter>

            {/* Circular Path for Engraved Typography */}
            <path
              id="topArcPath"
              d="M 28,100 A 72,72 0 1,1 172,100"
              fill="none"
            />
            <path
              id="bottomArcPath"
              d="M 172,100 A 72,72 0 1,1 28,100"
              fill="none"
            />
          </defs>

          {/* 1. Coin Body Base */}
          <circle cx="100" cy="100" r="92" fill="url(#coinBaseGrad)" stroke="#27313f" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="92" fill="url(#crimsonRimReflect)" />

          {/* 2. Outer Beveled Silver Rim */}
          <circle cx="100" cy="100" r="88" stroke="#475569" strokeWidth="1" strokeDasharray="6 3" />
          <circle cx="100" cy="100" r="84" stroke="#1e293b" strokeWidth="1.5" />

          {/* 3. 60 Precision Clockwork Ticks */}
          <g opacity="0.85">{ticks}</g>

          {/* 4. Engraved Text Ring Tracks */}
          <circle cx="100" cy="100" r="77" stroke="#334155" strokeWidth="0.75" />
          <circle cx="100" cy="100" r="67" stroke="#334155" strokeWidth="0.75" />

          {/* 5. Circular Engraved Text */}
          <text fontSize="6.5" fill="#94a3b8" letterSpacing="0.32em" fontWeight="600" opacity="0.9">
            <textPath href="#topArcPath" startOffset="50%" textAnchor="middle">
              ABHISHEK BRUNO
            </textPath>
          </text>
          <text fontSize="5.5" fill="#64748b" letterSpacing="0.28em" fontWeight="500" opacity="0.85">
            <textPath href="#bottomArcPath" startOffset="50%" textAnchor="middle">
              SYSTEM ARCHITECT • PRECISION
            </textPath>
          </text>

          {/* 6. Inner Machined Concentric Grooves */}
          <circle cx="100" cy="100" r="62" stroke="#1e2530" strokeWidth="1" />
          <circle cx="100" cy="100" r="54" stroke="#252d3a" strokeWidth="0.5" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="46" stroke="#18202a" strokeWidth="0.75" />

          {/* 7. Fine Reticle Crosshairs */}
          <line x1="100" y1="28" x2="100" y2="172" stroke="#c1121f" strokeWidth="0.75" strokeOpacity="0.4" />
          <line x1="28" y1="100" x2="172" y2="100" stroke="#c1121f" strokeWidth="0.75" strokeOpacity="0.4" />
          <circle cx="100" cy="100" r="38" stroke="#334155" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.5" />

          {/* 8. Four Cardinal Crimson Sight Notches */}
          {/* Top Notch (12 o'clock) */}
          <rect x="98" y="7" width="4" height="7" rx="0.5" fill="#c1121f" filter="url(#crimsonLaserGlow)" />
          {/* Bottom Notch (6 o'clock) */}
          <rect x="98" y="186" width="4" height="7" rx="0.5" fill="#c1121f" filter="url(#crimsonLaserGlow)" />
          {/* Left Notch (9 o'clock) */}
          <rect x="7" y="98" width="7" height="4" rx="0.5" fill="#c1121f" filter="url(#crimsonLaserGlow)" />
          {/* Right Notch (3 o'clock) */}
          <rect x="186" y="98" width="7" height="4" rx="0.5" fill="#c1121f" filter="url(#crimsonLaserGlow)" />

          {/* 9. Heavy 3D 'AB' Monogram */}
          {/* Depth Extrusion Underlay */}
          <g filter="url(#monogramDepth)">
            {/* Letter A Underlayer */}
            <path
              d="M93 42 L41 162 L63 162 L79 124 L99 124 L99 108 L85 108 L93 86 L97 98 L105 98 L93 42 Z"
              fill="#090c10"
              opacity="0.8"
            />
            {/* Letter B Underlayer */}
            <path
              d="M107 48 L145 48 C159 48 167 56 167 70 C167 80 159 88 149 92 C163 96 171 106 171 120 C171 138 157 156 137 156 L107 156 Z"
              fill="#090c10"
              opacity="0.8"
            />
          </g>

          {/* Letter A (Brushed Silver Face) */}
          <path
            d="M92 40 L40 160 L62 160 L78 122 L98 122 L98 106 L84 106 L92 84 L96 96 L104 96 L92 40 Z"
            fill="url(#contractSilverGrad)"
            stroke="#12161f"
            strokeWidth="1.2"
          />

          {/* Letter B (Brushed Silver Face) */}
          <path
            d="M106 46 L144 46 C158 46 166 54 166 68 C166 78 158 86 148 90 C162 94 170 104 170 118 C170 136 156 154 136 154 L106 154 Z M124 64 L124 90 L140 90 C146 90 150 86 150 78 C150 70 146 64 140 64 Z M124 108 L124 136 L142 136 C148 136 154 130 154 122 C154 114 148 108 142 108 Z"
            fill="url(#contractSilverGrad)"
            stroke="#12161f"
            strokeWidth="1.2"
          />

          {/* Fine Crimson Core Highlight Ticks inside the letters */}
          <line x1="78" y1="122" x2="98" y2="122" stroke="#c1121f" strokeWidth="1" strokeOpacity="0.75" />
          <circle cx="100" cy="100" r="1.5" fill="#c1121f" />
        </svg>

        {/* Moving Specular Sheen Overlay */}
        {!isReducedMotion && <div className="the-contract-metallic-sheen" aria-hidden="true" />}
      </div>
    </div>
  );
}
