import React, { useEffect } from 'react';
import './hero-atmosphere.css';

/**
 * CinematicHeroLighting — "THE MIDNIGHT CONTINENTAL"
 *
 * Luxury black-marble neo-noir architectural environment for the Homepage Hero:
 * - Split cleanly into `layer="distant"` (architectural colonnade, marble veining,
 *   rear-right crimson column glow) and `layer="midground"` (vertical crimson slit,
 *   cool silver-blue specular wash around the amulet, polished dark stone floor sheen,
 *   and left-side readability vignette) so scroll parallax stays smooth.
 * - Single shared pointer listener updates GPU CSS variables on `#hero` with an
 *   idle-sleeping rAF lerp (no React state updates, no continuous animations).
 */
export default function CinematicHeroLighting({ layer = 'all' }) {
  useEffect(() => {
    if (layer === 'midground' || typeof window === 'undefined') return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const heroSection = document.getElementById('hero');
    if (!heroSection || isReduced || isTouch) return;

    const currentPos = { x: 0, y: 0 };
    const targetPos = { x: 0, y: 0 };
    let isPointerInside = false;
    let animId = 0;
    let isRunning = false;
    const LERP_FACTOR = 0.05;

    const applyVars = (x, y) => {
      heroSection.style.setProperty('--mc-px', x.toFixed(4));
      heroSection.style.setProperty('--mc-py', y.toFixed(4));
    };

    const updateMotion = () => {
      const dx = targetPos.x - currentPos.x;
      const dy = targetPos.y - currentPos.y;

      currentPos.x += dx * LERP_FACTOR;
      currentPos.y += dy * LERP_FACTOR;
      applyVars(currentPos.x, currentPos.y);

      if (!isPointerInside && Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
        currentPos.x = targetPos.x;
        currentPos.y = targetPos.y;
        applyVars(currentPos.x, currentPos.y);
        isRunning = false;
        return;
      }

      animId = requestAnimationFrame(updateMotion);
    };

    const wakeLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(updateMotion);
      }
    };

    const onPointerMove = (e) => {
      const rect = heroSection.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      targetPos.x = Math.max(-1, Math.min(1, nx));
      targetPos.y = Math.max(-1, Math.min(1, ny));
      isPointerInside = true;
      wakeLoop();
    };

    const onPointerLeave = () => {
      isPointerInside = false;
      targetPos.x = 0;
      targetPos.y = 0;
      wakeLoop();
    };

    heroSection.addEventListener('pointermove', onPointerMove, { passive: true });
    heroSection.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      heroSection.removeEventListener('pointermove', onPointerMove);
      heroSection.removeEventListener('pointerleave', onPointerLeave);
      heroSection.style.removeProperty('--mc-px');
      heroSection.style.removeProperty('--mc-py');
    };
  }, [layer]);

  if (layer === 'midground') {
    return (
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div className="mc-parallax-layer mc-parallax-midground">
          {/* Architectural vertical recessed crimson slit illumination (desktop) */}
          <div className="mc-crimson-slits hidden lg:block">
            <span className="mc-crimson-slit mc-crimson-slit--primary" />
            <span className="mc-crimson-slit mc-crimson-slit--secondary" />
          </div>

          {/* Cool silver-blue specular wash framing the right-hand amulet */}
          <div className="mc-light-silver" />

          {/* Subtle polished black-stone floor sheen & stretched column bounce */}
          <div className="mc-floor-stone">
            <div className="mc-floor-veins hidden md:block" />
          </div>
        </div>

        {/* Left typography contrast shield & outer architectural perimeter falloff */}
        <div className="mc-readability-vignette" />
      </div>
    );
  }

  return (
    <div className="mc-env-root" aria-hidden="true">
      <div className="mc-parallax-layer mc-parallax-distant">
        {/* Deep obsidian marble ambient canvas */}
        <div className="mc-base-wall" />

        {/* Black-chrome architectural colonnade pilasters */}
        <div className="mc-colonnade hidden md:block" />

        {/* Restrained rear-right crimson architectural illumination */}
        <div className="mc-light-crimson" />

        {/* Whisper-faint luxury marble veining & vertical hairline mullions (desktop) */}
        <svg
          className="mc-marble-svg hidden lg:block"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="mcLineFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#788898" stopOpacity="0" />
              <stop offset="28%" stopColor="#D9DEE5" stopOpacity="0.16" />
              <stop offset="68%" stopColor="#788898" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#788898" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="mcCrimsonFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9F1027" stopOpacity="0" />
              <stop offset="42%" stopColor="#9F1027" stopOpacity="0.24" />
              <stop offset="78%" stopColor="#490917" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#490917" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="mcVeinSilver" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D9DEE5" stopOpacity="0" />
              <stop offset="50%" stopColor="#788898" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#788898" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Architectural vertical metal mullions tapering softly top and bottom */}
          <line x1="692" y1="54" x2="692" y2="830" stroke="url(#mcLineFade)" strokeWidth="1.1" />
          <line x1="872" y1="36" x2="872" y2="855" stroke="url(#mcLineFade)" strokeWidth="1.1" />
          <line x1="1144" y1="38" x2="1144" y2="862" stroke="url(#mcCrimsonFade)" strokeWidth="1.4" />
          <line x1="1312" y1="52" x2="1312" y2="846" stroke="url(#mcLineFade)" strokeWidth="1.15" />

          {/* Restrained dark-marble diagonal veins concentrated on the right gallery wall */}
          <path
            d="M 790 880 C 895 720, 990 540, 1130 340 C 1220 210, 1320 120, 1430 40"
            stroke="url(#mcVeinSilver)"
            strokeWidth="1.35"
          />
          <path
            d="M 940 900 C 1030 760, 1125 635, 1265 480 C 1340 395, 1395 310, 1445 230"
            stroke="url(#mcVeinSilver)"
            strokeWidth="0.95"
          />
          <path
            d="M 690 790 C 810 660, 915 580, 1015 470"
            stroke="url(#mcVeinSilver)"
            strokeWidth="0.8"
          />
        </svg>

        {layer === 'all' && (
          <>
            <div className="mc-light-silver" />
            <div className="mc-floor-stone">
              <div className="mc-floor-veins hidden md:block" />
            </div>
            <div className="mc-readability-vignette" />
          </>
        )}
      </div>
    </div>
  );
}
