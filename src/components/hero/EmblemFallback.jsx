import React from 'react';

export default function EmblemFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center lg:justify-end pr-0 lg:pr-24 pointer-events-none select-none z-10"
      aria-hidden="true"
    >
      <div className="relative w-72 sm:w-96 aspect-square rounded-full border-2 border-[#292929] bg-gradient-to-br from-[#1c1c20] via-[#111114] to-[#0a0a0c] shadow-[0_0_80px_rgba(193,18,31,0.25)] flex items-center justify-center p-4">
        {/* Outer Circular Ring with Crimson Ticks */}
        <div className="absolute inset-2 rounded-full border border-[#38383e] flex items-center justify-center">
          <div className="absolute inset-3 rounded-full border border-[#222226]" />
        </div>

        {/* Four Cardinal Sight Markers */}
        <div className="absolute -top-1 w-2.5 h-5 bg-[#C1121F] shadow-[0_0_10px_#C1121F]" />
        <div className="absolute -bottom-1 w-2.5 h-5 bg-[#C1121F] shadow-[0_0_10px_#C1121F]" />
        <div className="absolute -left-1 h-2.5 w-5 bg-[#C1121F] shadow-[0_0_10px_#C1121F]" />
        <div className="absolute -right-1 h-2.5 w-5 bg-[#C1121F] shadow-[0_0_10px_#C1121F]" />

        {/* Central Stylized AB Monogram Vector */}
        <svg
          viewBox="0 0 200 200"
          className="w-48 sm:w-64 h-48 sm:h-64 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Reticle Lines */}
          <line x1="100" y1="20" x2="100" y2="180" stroke="#C1121F" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="#C1121F" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="100" cy="100" r="65" stroke="#333333" strokeWidth="1" strokeDasharray="3 3" />

          {/* Letter A */}
          <path
            d="M92 40 L40 160 L62 160 L78 122 L98 122 L98 106 L84 106 L92 84 L96 96 L104 96 L92 40 Z"
            fill="url(#goldSilverGrad)"
            stroke="#111111"
            strokeWidth="1.5"
          />

          {/* Letter B */}
          <path
            d="M106 46 L144 46 C158 46 166 54 166 68 C166 78 158 86 148 90 C162 94 170 104 170 118 C170 136 156 154 136 154 L106 154 Z M124 64 L124 90 L140 90 C146 90 150 86 150 78 C150 70 146 64 140 64 Z M124 108 L124 136 L142 136 C148 136 154 130 154 122 C154 114 148 108 142 108 Z"
            fill="url(#goldSilverGrad)"
            stroke="#111111"
            strokeWidth="1.5"
          />

          <defs>
            <linearGradient id="goldSilverGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d1d1d6" />
              <stop offset="50%" stopColor="#8a8a92" />
              <stop offset="100%" stopColor="#55555c" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient Crimson Rim Glow */}
        <div className="absolute inset-0 rounded-full border border-[#C1121F]/20 pointer-events-none" />
      </div>
    </div>
  );
}
