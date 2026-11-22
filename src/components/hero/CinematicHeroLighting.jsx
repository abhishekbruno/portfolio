import React, { useEffect, useRef } from 'react';

/**
 * CinematicHeroLighting
 *
 * Implements neo-noir atmospheric lighting for the Hero section:
 * 1. Upper-Left Directional Crimson Source:
 *    - Soft diagonal crimson glow spreading toward the center and typography.
 *    - Layered multi-stop radial & conic CSS gradients for organic light falloff.
 * 2. Bottom-Left Reflection:
 *    - Soft floor bounce reflection balancing the lower editorial content.
 * 3. Dynamic Smooth Mouse Tracking:
 *    - Physics lerp with 1.5s smoothing window.
 *    - Smoothly returns to neutral idle coordinates when pointer exits.
 * 4. Breathing Illumination:
 *    - Slow, non-aggressive fluctuation (8s period).
 * 5. Performance & Mobile Adaptability:
 *    - Disables mouse tracking on touch devices.
 *    - Respects prefers-reduced-motion.
 */
export default function CinematicHeroLighting() {
  const containerRef = useRef(null);
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const isPointerInside = useRef(false);

  useEffect(() => {
    // Respect prefers-reduced-motion & touch devices
    if (typeof window === 'undefined') return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (isReduced || isTouch) return;

    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    let animId;

    const handlePointerMove = (e) => {
      const rect = heroSection.getBoundingClientRect();
      if (rect.height === 0 || rect.width === 0) return;

      // Normalized coordinates from center (-1 to 1)
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      targetPos.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny))
      };
      isPointerInside.current = true;
    };

    const handlePointerLeave = () => {
      isPointerInside.current = false;
      targetPos.current = { x: 0, y: 0 };
    };

    heroSection.addEventListener('pointermove', handlePointerMove, { passive: true });
    heroSection.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Smooth lerp animation loop (1.5s smoothing time-constant)
    const LERP_FACTOR = 0.04;
    const updateMotion = () => {
      animId = requestAnimationFrame(updateMotion);

      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * LERP_FACTOR;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * LERP_FACTOR;

      if (containerRef.current) {
        const moveX = currentPos.current.x * 32;
        const moveY = currentPos.current.y * 24;
        containerRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }
    };

    animId = requestAnimationFrame(updateMotion);

    return () => {
      cancelAnimationFrame(animId);
      heroSection.removeEventListener('pointermove', handlePointerMove);
      heroSection.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 transition-opacity duration-700"
      aria-hidden="true"
    >
      {/* ─── 1. Upper-Left Directional Crimson Glow ─── */}
      <div
        className="absolute -top-[12%] -left-[10%] sm:-left-[5%] w-[580px] sm:w-[820px] h-[580px] sm:h-[820px] rounded-full animate-crimson-breathe"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 28% 28%, rgba(193, 18, 31, 0.18) 0%, rgba(120, 0, 0, 0.08) 38%, rgba(20, 5, 8, 0.02) 68%, transparent 82%)'
        }}
      />

      {/* ─── 2. Soft Diagonal Conic Sheen (Spreading diagonally toward center) ─── */}
      <div
        className="absolute top-0 left-0 w-[650px] sm:w-[950px] h-[650px] sm:h-[950px] opacity-75"
        style={{
          background:
            'conic-gradient(from 120deg at 12% 16%, rgba(193, 18, 31, 0.12) 0deg, rgba(120, 0, 0, 0.05) 30deg, transparent 65deg, transparent 360deg)'
        }}
      />

      {/* ─── 3. Soft Bottom-Left Reflection ─── */}
      <div
        className="absolute bottom-[-5%] left-[-5%] w-[420px] sm:w-[560px] h-[420px] sm:h-[560px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 25% 75%, rgba(193, 18, 31, 0.09) 0%, rgba(120, 0, 0, 0.03) 45%, transparent 75%)'
        }}
      />

      {/* ─── 4. Center-Left Ambient Transition Wash ─── */}
      <div
        className="absolute top-1/3 -left-[15%] w-[600px] h-[450px] rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(193, 18, 31, 0.06) 0%, rgba(120, 0, 0, 0.02) 50%, transparent 80%)'
        }}
      />

      {/* ─── 5. Deep Shadow Boundary (Vignette to ensure dramatic falloff into near-black) ─── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 18% 25%, transparent 20%, rgba(8, 8, 8, 0.4) 60%, rgba(8, 8, 8, 0.85) 95%)'
        }}
      />
    </div>
  );
}
