import React, { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import wallBaseWebp from '../../assets/forge/wall-base.webp';
import wallAnchorsWebp from '../../assets/forge/wall-anchors.webp';
import paperLeftWebp from '../../assets/forge/paper-left.webp';
import paperCubeWebp from '../../assets/forge/paper-cube.webp';
import paperChartWebp from '../../assets/forge/paper-chart.webp';
import paperRightWebp from '../../assets/forge/paper-right.webp';
import {
  BOARD_PIN_GLINTS,
  EvidenceEnvironmentController,
  LEFT_BLUEPRINT_CANVAS_SPEC,
  PAPER_LAYER_SPECS,
} from './EvidenceEnvironmentController';

const PAPER_ASSET_BY_ID = {
  cube: paperCubeWebp,
  chart: paperChartWebp,
  right: paperRightWebp,
};

function getViewportTier(reduced) {
  if (reduced) return 'reduced';
  if (typeof window === 'undefined') return 'desktop';
  if (window.innerWidth >= 1024) return 'desktop';
  if (window.innerWidth >= 640) return 'tablet';
  return 'mobile';
}

/**
 * ForgeEvidenceWall — Living Neo-Noir Investigation Environment (V3)
 *
 * High-performance layered architecture (`0` SVG DOM layout thrash, `0` CSS mask passes):
 * 1. Reconstructed stationary wall, metal frame, and fixed plaques (wall-base.webp).
 * 2. 18-segment flexible sheet simulation for the tall hanging left blueprint (canvas).
 * 3. Quantized top-anchored secondary loose paper sprites & dynamic cast shadows.
 * 4. Stationary red-tape & chart-pin anchors over moving sheets (wall-anchors.webp).
 * 5. Unified 1024x576 Canvas 2D layer: crimson thread catenaries + dusty haze + 3-depth dust.
 * 6. Local industrial tungsten lamp flicker glow, pin glints, & brownout shadow veil.
 */
export default function ForgeEvidenceWall({ className = '', variant = 'desktop' }) {
  const containerRef = useRef(null);
  const paperElsRef = useRef({});
  const paperShadowElsRef = useRef({});
  const leftPaperCanvasRef = useRef(null);
  const lampGlowRef = useRef(null);
  const shadowVeilRef = useRef(null);
  const pinGlintGroupRef = useRef(null);
  const fxCanvasRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.14 });
  const isVisible = shouldReduceMotion || isInView;
  const isDesktop = variant === 'desktop';

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return;

    const controller = new EvidenceEnvironmentController({
      tier: getViewportTier(shouldReduceMotion),
      paperEls: paperElsRef.current,
      paperShadowEls: paperShadowElsRef.current,
      leftPaperCanvasEl: leftPaperCanvasRef.current,
      leftPaperSrc: paperLeftWebp,
      lampGlowEl: lampGlowRef.current,
      shadowVeilEl: shadowVeilRef.current,
      pinGlintGroupEl: pinGlintGroupRef.current,
      fxCanvasEl: fxCanvasRef.current,
    });

    const onVisibility = () => controller.setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => controller.setTier(getViewportTier(shouldReduceMotion));
    window.addEventListener('resize', onResize, { passive: true });

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          controller.setInView(Boolean(entries[0]?.isIntersecting));
        },
        { rootMargin: '0px', threshold: 0.01 }
      );
      observer.observe(el);
    } else {
      controller.setInView(true);
    }

    const sectionEl = el.closest('.forge-section') || el;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const shouldBindPointer = !shouldReduceMotion && !isCoarsePointer;

    let cachedRect = null;
    const onPointerEnter = () => {
      cachedRect = sectionEl.getBoundingClientRect();
    };
    const onPointerMove = (e) => {
      if (!controller.isInView) return;
      if (!cachedRect) cachedRect = sectionEl.getBoundingClientRect();
      if (!cachedRect.width || !cachedRect.height) return;
      const nx = ((e.clientX - cachedRect.left) / cachedRect.width) * 2 - 1;
      const ny = ((e.clientY - cachedRect.top) / cachedRect.height) * 2 - 1;
      controller.setPointerNormalized(nx, ny);
    };
    const onPointerLeave = () => {
      cachedRect = null;
      controller.resetPointer();
    };

    if (shouldBindPointer) {
      sectionEl.addEventListener('pointerenter', onPointerEnter, { passive: true });
      sectionEl.addEventListener('pointermove', onPointerMove, { passive: true });
      sectionEl.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    return () => {
      controller.stop();
      if (observer) observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      if (shouldBindPointer) {
        sectionEl.removeEventListener('pointerenter', onPointerEnter);
        sectionEl.removeEventListener('pointermove', onPointerMove);
        sectionEl.removeEventListener('pointerleave', onPointerLeave);
      }
    };
  }, [shouldReduceMotion]);

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
          <div className="forge-wall-canvas">
            {/* 1. Stationary Wall, Metal Frame, Plaques & Blueprints */}
            <img
              src={wallBaseWebp}
              alt=""
              width={1024}
              height={576}
              loading="eager"
              decoding="async"
              draggable={false}
              className="forge-wall-img"
            />

            {/* 2. Dynamic Paper Cast Shadows (secondary sheets) */}
            {PAPER_LAYER_SPECS.map((spec) => (
              <div
                key={`shadow-${spec.id}`}
                ref={(node) => {
                  paperShadowElsRef.current[spec.id] = node;
                }}
                className="forge-wall-paper-shadow"
                style={{
                  ...spec.style,
                  transformOrigin: spec.pivotOrigin,
                }}
              />
            ))}

            {/* 2b. Flexible 18-Segment Hanging Left Blueprint Sheet (with curved cast shadow) */}
            <canvas
              ref={leftPaperCanvasRef}
              width={LEFT_BLUEPRINT_CANVAS_SPEC.canvasW}
              height={LEFT_BLUEPRINT_CANVAS_SPEC.canvasH}
              className="forge-wall-paper-sprite"
              style={LEFT_BLUEPRINT_CANVAS_SPEC.slotStyle}
            />

            {/* 3. Independently Animated Top-Anchored Loose Documents */}
            {PAPER_LAYER_SPECS.map((spec) => (
              <img
                key={spec.id}
                ref={(node) => {
                  paperElsRef.current[spec.id] = node;
                }}
                src={PAPER_ASSET_BY_ID[spec.id]}
                alt=""
                draggable={false}
                loading="eager"
                decoding="async"
                className="forge-wall-paper-sprite"
                style={{
                  ...spec.style,
                  transformOrigin: spec.pivotOrigin,
                }}
              />
            ))}

            {/* 4. Stationary Pinhead & Red Tape Anchors Over Papers */}
            <img
              src={wallAnchorsWebp}
              alt=""
              width={1024}
              height={576}
              loading="eager"
              decoding="async"
              draggable={false}
              className="forge-wall-anchors-img"
            />

            {/* 5. Static Pushpin Specular Glint Layer (opacity synced to lamp flicker) */}
            <svg viewBox="0 0 1024 576" className="forge-wall-threads-svg" preserveAspectRatio="none" fill="none">
              <g ref={pinGlintGroupRef}>
                {BOARD_PIN_GLINTS.map(([px, py, r], i) => (
                  <g key={i}>
                    <circle cx={px} cy={py} r={r} fill="rgba(255, 214, 172, 0.14)" />
                    <circle cx={px - 0.8} cy={py - 1.0} r={r * 0.28} fill="rgba(255, 240, 224, 0.55)" />
                  </g>
                ))}
              </g>
            </svg>

            {/* 6. Overhead Lamp Warm Illumination Cone + Coherent Brownout Darkening Veil */}
            <div ref={lampGlowRef} className="forge-wall-lamp-glow" />
            <div ref={shadowVeilRef} className="forge-wall-shadow-veil" />

            {/* 7. Unified Canvas 2D: Crimson Threads + Dusty Haze + 3-Depth Dust */}
            <canvas
              ref={fxCanvasRef}
              width={1024}
              height={576}
              className="forge-wall-dust-canvas"
            />
          </div>
        </div>

        {/* Solid #07080B perimeter feather overlay (replaces expensive nested mask-images) */}
        <div className="forge-wall-env-overlay" />
      </motion.div>
    </div>
  );
}
