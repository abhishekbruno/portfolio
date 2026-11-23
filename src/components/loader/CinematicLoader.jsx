import React, { useEffect, useState, useRef, useCallback } from 'react';
import LoaderFallingCoin3D from './LoaderFallingCoin3D';
import LoaderFallTrail from './LoaderFallTrail';
import LoaderTypography from './LoaderTypography';
import LoaderProgress from './LoaderProgress';
import LoaderTransition from './LoaderTransition';
import { Volume2, VolumeX, FastForward } from 'lucide-react';
import './cinematic-loader.css';

/**
 * CinematicLoader — "THE FALLING COIN"
 *
 * Master 3D Medallion Loading Sequence:
 * THE COIN ROTATES → REVOLVES → FALLS → THE WEBSITE OPENS.
 *
 * 7-State Animation State Machine:
 * 1. INITIALIZING   - Scene mounts, coin accelerates from stillness
 * 2. REVEALING      - Atmospheric lighting bleed and masked typography reveal
 * 3. ORBITING       - Continuous 3-axis rotation & elliptical orbital revolution
 * 4. DECELERATING   - Triggered on isSceneReady; orbit decelerates toward center
 * 5. SUSPENDED      - Brief suspended moment; silver reflection sweeps across AB
 * 6. FALLING        - Gravitational release: y = y0 + v0*t - 0.5*g*t^2 + tumbling
 * 7. TRANSITIONING  - Trajectory trail triggers split-shutter reveal of homepage
 * 8. COMPLETE       - Complete WebGL resource disposal, unmount
 */
export default function CinematicLoader({
  isSceneReady = false,
  onFinish
}) {
  const [reducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // State Machine
  const [loaderState, setLoaderState] = useState(() => (reducedMotion ? 'ORBITING' : 'INITIALIZING'));
  const [progress, setProgress] = useState(15);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [statusText, setStatusText] = useState('INITIALIZING DIGITAL ENVIRONMENT');

  const audioCtxRef = useRef(null);
  const hasTriggeredExitRef = useRef(false);
  const timeoutsRef = useRef([]);

  const addTimeout = useCallback((fn, delay) => {
    const id = window.setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  // ─── 1. SYNTHESIZED PROCEDURAL AUDIO (Optional & Muted by Default) ───
  const playCinematicChime = useCallback(() => {
    if (!isAudioEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Deep sub-bass pulse (55Hz)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(55, now);
      subOsc.frequency.exponentialRampToValueAtTime(36, now + 0.9);

      subGain.gain.setValueAtTime(0.22, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.95);

      // Metallic high harmonic chime (Brushed Silver gleam)
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'triangle';
      chimeOsc.frequency.setValueAtTime(1480, now);
      chimeOsc.frequency.exponentialRampToValueAtTime(820, now + 0.5);

      chimeGain.gain.setValueAtTime(0.09, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(now);
      chimeOsc.stop(now + 0.58);
    } catch {
      // Audio playback fails silently if browser blocks Web Audio
    }
  }, [isAudioEnabled]);

  // ─── 2. SCROLL LOCKING SYSTEM ───
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  // ─── 3. STATE MACHINE: INITIALIZING -> REVEALING -> ORBITING ───
  useEffect(() => {
    if (reducedMotion) return;

    // Phase 1 -> 2: Reveal typography & atmospheric lighting
    addTimeout(() => {
      setLoaderState('REVEALING');
    }, 280);

    // Phase 2 -> 3: Steady orbital revolution & 3-axis rotation
    addTimeout(() => {
      setLoaderState('ORBITING');
    }, 720);
  }, [reducedMotion, addTimeout]);

  // ─── 4. GENUINE ASSET READINESS TRACKING ───
  useEffect(() => {
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready
        .then(() => {
          setProgress((prev) => Math.max(prev, 55));
        })
        .catch(() => {
          setProgress((prev) => Math.max(prev, 55));
        });
    }

    // Safety fallback: ensure user is never trapped even if 3D crashes
    const fallbackTimer = window.setTimeout(() => {
      setProgress(100);
    }, 4500);

    return () => window.clearTimeout(fallbackTimer);
  }, []);

  const effectiveProgress = isSceneReady ? 100 : progress;
  const effectiveStatusText = isSceneReady
    ? 'DIGITAL ENVIRONMENT READY'
    : statusText;

  // ─── 5. FINAL ANIMATION SEQUENCE: DECELERATE -> SUSPEND -> FALL ───
  const startFinalFallingSequence = useCallback(() => {
    if (hasTriggeredExitRef.current) return;
    hasTriggeredExitRef.current = true;

    if (reducedMotion) {
      // Clean instant cut for reduced motion
      setIsRevealing(true);
      addTimeout(() => {
        onFinish?.();
      }, 120);
      return;
    }

    // Stage A: Decelerate orbit and ease coin toward center
    setLoaderState('DECELERATING');

    // Stage B: Brief suspended moment at center + silver flash + audio chime
    addTimeout(() => {
      setLoaderState('SUSPENDED');
      playCinematicChime();
    }, 550);

    // Stage C: Release into gravity-driven downward acceleration fall
    addTimeout(() => {
      setLoaderState('FALLING');
      setIsExiting(true); // Begin subtle typography fade-out as coin falls
    }, 900);
  }, [reducedMotion, onFinish, playCinematicChime, addTimeout]);

  // Trigger final sequence when application resources are verified ready
  useEffect(() => {
    if ((isSceneReady || effectiveProgress >= 100) && loaderState === 'ORBITING') {
      const delay = isSkipped ? 50 : 200;
      addTimeout(() => {
        startFinalFallingSequence();
      }, delay);
    }
  }, [isSceneReady, effectiveProgress, loaderState, isSkipped, startFinalFallingSequence, addTimeout]);

  // ─── 6. CALLBACK WHEN COIN EXITS BOTTOM OF SCREEN ───
  const handleFallComplete = useCallback(() => {
    // Transition state: Coin has plunged past bottom of viewport
    setLoaderState('TRANSITIONING');

    // Trigger split shutter panels (top slides up, bottom slides down)
    setIsRevealing(true);

    // Complete transition and unmount after shutter finishes
    addTimeout(() => {
      setLoaderState('COMPLETE');
      onFinish?.();
    }, 680);
  }, [onFinish, addTimeout]);

  // ─── 7. SKIP INTRO HANDLER ───
  const handleSkipIntro = () => {
    setIsSkipped(true);
    if (isSceneReady) {
      startFinalFallingSequence();
    } else {
      setProgress(95);
      setStatusText('FINALIZING CRITICAL INITIALIZATION...');
    }
  };

  const handleAudioToggle = () => {
    setIsAudioEnabled((prev) => !prev);
  };

  // Cleanup all timeouts on unmount
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <LoaderTransition isRevealing={isRevealing}>
      {/* Top Editorial Telemetry Index */}
      <div className="the-contract-top-telemetry" aria-hidden="true">
        <span className="text-[#c1121f] font-bold">CONTRACT // 001</span>
        <span>•</span>
        <span>ARTIFACT: ROTATING 3D MEDALLION</span>
      </div>

      {/* 3D Photorealistic Rotating & Revolving Falling Coin Stage */}
      <LoaderFallingCoin3D
        state={loaderState}
        onFallComplete={handleFallComplete}
        isReducedMotion={reducedMotion}
      />

      {/* Downward Crimson Trajectory Laser Trail when Coin Falls */}
      <LoaderFallTrail
        isActive={loaderState === 'FALLING' || loaderState === 'TRANSITIONING'}
        isReducedMotion={reducedMotion}
      />

      {/* Masked Vertical Editorial Typography */}
      <LoaderTypography
        isReducedMotion={reducedMotion}
        isExiting={isExiting}
        statusText={effectiveStatusText}
      />

      {/* Horizontal Crimson Progress Indicator */}
      <LoaderProgress
        progress={effectiveProgress}
        isReady={isSceneReady || effectiveProgress >= 100}
        isReducedMotion={reducedMotion}
      />

      {/* ─── CONTROLS: ELEGANT "SKIP INTRO" & OPTIONAL AUDIO TOGGLE ─── */}
      {/* Skip Intro Button (Bottom-Right) */}
      <button
        type="button"
        className="the-contract-skip-btn group"
        onClick={handleSkipIntro}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSkipIntro();
          }
        }}
        aria-label="Skip introductory cinematic sequence"
        tabIndex={0}
      >
        <span>{isSkipped && !isSceneReady ? 'FINALIZING...' : 'SKIP INTRO'}</span>
        <FastForward className="w-3 h-3 text-[#94a3b8] group-hover:text-[#c1121f] transition-colors" />
      </button>

      {/* Optional Audio Toggle (Bottom-Left) */}
      <button
        type="button"
        className={`the-contract-audio-btn ${isAudioEnabled ? 'the-contract-audio-btn--active' : ''}`}
        onClick={handleAudioToggle}
        aria-label={isAudioEnabled ? 'Mute cinematic sound' : 'Enable cinematic sound'}
        title="Optional synthesized cinematic sound"
      >
        {isAudioEnabled ? (
          <>
            <Volume2 className="w-3 h-3 text-[#c1121f]" />
            <span className="text-[#f1f5f9]">AUDIO ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3 h-3 text-[#64748b]" />
            <span>AUDIO OFF</span>
          </>
        )}
      </button>
    </LoaderTransition>
  );
}
