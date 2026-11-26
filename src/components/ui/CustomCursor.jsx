import React, { useEffect, useRef } from 'react';
import './crimson-sight.css';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], .interactive-target, .skills-playing-card, .skills-index-item';
const TEXT_INPUT_SELECTOR = 'input, textarea, select, [contenteditable="true"]';
const DISABLED_SELECTOR = '[disabled], [aria-disabled="true"]';
const INSPECT_3D_SELECTOR = '[aria-label*="AB Medallion"] canvas, #hero canvas';

/**
 * THE CRIMSON SIGHT — Lightweight Luxury Neo-Noir Custom Cursor
 *
 * - Element A (.cs-core): 6px deep crimson metallic diamond following pointer immediately.
 * - Element B (.cs-ring): 34px brushed-silver/gunmetal segmented ring with frame-rate-independent
 *   exponential damping (1 - exp(-28 * dt) -> ~75ms settling across 60/120/144Hz).
 * - Zero per-frame React state updates, zero continuous blur/shadow animations, auto-sleeps rAF
 *   when settled/hidden, and preserves native cursors on touch, reduced-motion, and text inputs.
 */
export default function CustomCursor() {
  const coreRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || isReducedMotion) return;

    const coreEl = coreRef.current;
    const ringEl = ringRef.current;
    if (!coreEl || !ringEl) return;

    const state = {
      targetX: -100,
      targetY: -100,
      ringX: -100,
      ringY: -100,
      visible: false,
      pressed: false,
      mode: 'default', // 'default' | 'hover' | 'inspect' | 'text' | 'disabled'
      rafId: 0,
      lastMs: 0,
      initialized: false
    };

    const applyVisualState = () => {
      if (state.mode === 'text') {
        coreEl.style.opacity = '0';
        ringEl.style.opacity = '0';
        return;
      }
      const op = state.visible ? '1' : '0';
      coreEl.style.opacity = op;
      ringEl.style.opacity = op;

      const resolved = state.pressed && state.mode !== 'disabled' ? 'active' : state.mode;
      coreEl.dataset.state = resolved;
      ringEl.dataset.state = resolved;
    };

    const resolveTargetMode = (target) => {
      if (!(target instanceof Element)) return 'default';
      if (target.closest(TEXT_INPUT_SELECTOR)) return 'text';
      if (target.closest(DISABLED_SELECTOR)) return 'disabled';
      if (target.closest(INSPECT_3D_SELECTOR)) return 'inspect';
      if (target.closest(INTERACTIVE_SELECTOR)) return 'hover';
      return 'default';
    };

    const tick = (nowMs) => {
      if (!state.visible || document.hidden) {
        state.rafId = 0;
        return;
      }

      const dt = Math.min(0.05, Math.max(0.001, (nowMs - state.lastMs) * 0.001));
      state.lastMs = nowMs;

      // Frame-rate-independent exponential damping (~75ms perceived settling)
      const alpha = 1 - Math.exp(-28.0 * dt);
      const dx = state.targetX - state.ringX;
      const dy = state.targetY - state.ringY;

      state.ringX += dx * alpha;
      state.ringY += dy * alpha;

      coreEl.style.transform = `translate3d(${(state.targetX - 3).toFixed(1)}px, ${(state.targetY - 3).toFixed(1)}px, 0)`;
      ringEl.style.transform = `translate3d(${(state.ringX - 17).toFixed(1)}px, ${(state.ringY - 17).toFixed(1)}px, 0)`;

      if (Math.abs(dx) < 0.12 && Math.abs(dy) < 0.12) {
        state.ringX = state.targetX;
        state.ringY = state.targetY;
        ringEl.style.transform = `translate3d(${(state.ringX - 17).toFixed(1)}px, ${(state.ringY - 17).toFixed(1)}px, 0)`;
        state.rafId = 0;
        return;
      }

      state.rafId = requestAnimationFrame(tick);
    };

    const wakeLoop = () => {
      if (!state.rafId && state.visible && !document.hidden) {
        state.lastMs = performance.now();
        state.rafId = requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      state.targetX = e.clientX;
      state.targetY = e.clientY;

      if (!state.initialized) {
        state.initialized = true;
        document.documentElement.classList.add('cs-cursor-ready');
      }

      if (!state.visible) {
        state.ringX = state.targetX;
        state.ringY = state.targetY;
        state.visible = true;
        applyVisualState();
      }
      wakeLoop();
    };

    const onPointerOver = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      const nextMode = resolveTargetMode(e.target);
      if (nextMode !== state.mode) {
        state.mode = nextMode;
        applyVisualState();
      }
    };

    const onPointerDown = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      state.pressed = true;
      applyVisualState();
    };

    const onPointerUp = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      state.pressed = false;
      applyVisualState();
    };

    const onMouseLeave = () => {
      state.visible = false;
      state.pressed = false;
      applyVisualState();
      if (state.rafId) {
        cancelAnimationFrame(state.rafId);
        state.rafId = 0;
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden && state.rafId) {
        cancelAnimationFrame(state.rafId);
        state.rafId = 0;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      document.documentElement.classList.remove('cs-cursor-ready');
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* Element A: Crimson Precision Core */}
      <div
        ref={coreRef}
        className="cs-core"
        data-state="default"
        aria-hidden="true"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="cs-core-diamond" />
      </div>

      {/* Element B: Floating Brushed-Silver & Gunmetal Segmented Ring */}
      <div
        ref={ringRef}
        className="cs-ring"
        data-state="default"
        aria-hidden="true"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <svg className="cs-ring-svg" viewBox="0 0 34 34" fill="none">
          {/* Dark gunmetal structural base ring */}
          <circle cx="17" cy="17" r="15.2" stroke="#343B45" strokeWidth="1" strokeOpacity="0.85" />
          {/* Brushed-silver upper & lower architectural arcs */}
          <path
            d="M 5.2 9.5 A 15.2 15.2 0 0 1 28.8 9.5"
            stroke="#B5BBC4"
            strokeWidth="1.05"
            strokeLinecap="round"
            strokeOpacity="0.82"
          />
          <path
            d="M 28.8 24.5 A 15.2 15.2 0 0 1 5.2 24.5"
            stroke="#B5BBC4"
            strokeWidth="0.95"
            strokeLinecap="round"
            strokeOpacity="0.58"
          />
          {/* Small crimson accent segment (east & west micro-ticks) */}
          <path
            className="cs-ring-accent"
            d="M 31.4 12.6 A 15.2 15.2 0 0 1 31.4 21.4"
            stroke="#B91F38"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <line x1="17" y1="0.8" x2="17" y2="3.4" stroke="#B5BBC4" strokeWidth="0.9" strokeOpacity="0.65" />
          <line x1="17" y1="30.6" x2="17" y2="33.2" stroke="#B5BBC4" strokeWidth="0.9" strokeOpacity="0.65" />
        </svg>
      </div>
    </>
  );
}
