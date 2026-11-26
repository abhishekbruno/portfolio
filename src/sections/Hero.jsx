import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Mail, FastForward } from 'lucide-react';
import { Github, Linkedin } from '../components/ui/Icons';
import { personalInfo } from '../data/portfolio';
import CinematicHeroLighting from '../components/hero/CinematicHeroLighting';
import InteractiveEmblem3D from '../components/hero/InteractiveEmblem3D';
import { RevealPhase } from '../components/hero/revealPhases';

export default function Hero({
  onSceneReady,
  revealPhase = RevealPhase.INITIALIZING,
  onPhaseChange,
  onLoaderComplete,
  isSkipped = false,
  onSkip
}) {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Atmosphere emerges during Phase 3 (camera transition)
  const isAtmosphereVisible =
    shouldReduceMotion ||
    revealPhase === RevealPhase.CAMERA_TRANSITION ||
    revealPhase === RevealPhase.HERO_INTERACTIVE;

  // Typography and interactive UI emerge during Phase 4 (hero interactive)
  const isContentVisible =
    shouldReduceMotion ||
    revealPhase === RevealPhase.HERO_INTERACTIVE;

  // Skip Intro is only active during the initial camera pullback
  const isSkipVisible =
    !shouldReduceMotion &&
    (revealPhase === RevealPhase.INTRO || revealPhase === RevealPhase.CAMERA_TRANSITION);

  // Scroll tracking linked directly to the Hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // ─── 3-LAYER DEPTH PARALLAX (Restrained to 20-52px) ───
  // Layer 1: Distant ambient crimson illumination
  const yDistantAmbient = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 20]);
  // Layer 2: Midground atmospheric haze & geometric background rings
  const yMidgroundHaze = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 36]);
  // Layer 3: Interactive 3D Emblem canvas
  const yEmblemCanvas = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 52]);

  // ─── HEADLINE SCROLL-LINKED TRANSITIONS ───
  const titleY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -42]);
  const titleSpacing = useTransform(scrollYProgress, [0, 1], ['0.04em', shouldReduceMotion ? '0.04em' : '0.08em']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.85, 0.3]);

  // Content scroll offset & atmospheric scroll fade
  const contentY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -26]);
  const atmosphereOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.72, 0.18]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Cinematic entrance transition settings (power3.out style)
  const transitionSettings = {
    duration: shouldReduceMotion ? 0.01 : 0.85,
    ease: [0.16, 1, 0.3, 1]
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden pt-24 pb-16 border-b border-[#292929] bg-[#050608]"
    >
      {/* ─── LAYER 1: Midnight Continental Luxury Architecture & Distant Crimson Illumination ─── */}
      <motion.div
        style={{ y: yDistantAmbient, opacity: shouldReduceMotion ? 1 : atmosphereOpacity }}
        className={`absolute inset-0 pointer-events-none select-none z-0 transition-opacity duration-1000 ${
          isAtmosphereVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <CinematicHeroLighting layer="distant" />
      </motion.div>

      {/* ─── LAYER 2: Midground Specular Silver-Blue Sheen, Floor Stone Wash & Contrast Falloff ─── */}
      <motion.div
        style={{ y: yMidgroundHaze, opacity: shouldReduceMotion ? 1 : atmosphereOpacity }}
        className={`absolute inset-0 pointer-events-none select-none z-0 transition-opacity duration-1000 ${
          isAtmosphereVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <CinematicHeroLighting layer="midground" />
      </motion.div>

      {/* Top Editorial Index & Coordinates */}
      <div
        className={`absolute top-24 left-4 sm:left-8 lg:left-[6vw] xl:left-[7vw] 2xl:left-[8vw] flex items-center gap-3 font-mono text-[10px] sm:text-xs text-[#888888] tracking-[0.25em] uppercase z-20 pointer-events-none transition-opacity duration-700 ${
          isContentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-[#C1121F] font-bold">001</span>
        <span>/</span>
        <span>RESEARCH &amp; SOFTWARE ARCHITECTURE</span>
        <span className="hidden sm:inline-block w-8 h-[1px] bg-[#292929]" />
        <span className="hidden sm:inline-block text-[#666666]">COORDINATES 28.6139° N, 77.2090° E</span>
      </div>

      {/* Floating Tactical Environmental Indicators (Near 3D Medallion) */}
      <div
        className={`absolute top-28 right-8 font-mono text-[9px] text-[#555555] tracking-[0.25em] uppercase z-20 pointer-events-none hidden lg:block text-right transition-opacity duration-700 ${
          isContentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div>ARTIFACT SPEC // AB-MEDALLION-01</div>
        <div className="text-[#C1121F]/80 mt-1">CORE MATERIAL // GUNMETAL • PBR</div>
      </div>

      <div
        className={`absolute bottom-32 right-8 font-mono text-[9px] text-[#555555] tracking-[0.25em] uppercase z-20 pointer-events-none hidden lg:block text-right transition-opacity duration-700 ${
          isContentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div>PHYSICAL INSPECTION // ACTIVE</div>
        <div className="text-[#888888] mt-1">DRAG SCENE TO ROTATE ARTIFACT</div>
      </div>

      {/* ─── LAYER 3: Single Persistent 3D AB Medallion Centerpiece ─── */}
      <motion.div
        style={{ y: yEmblemCanvas }}
        className="absolute inset-0 z-10 w-full h-full pointer-events-auto"
      >
        <InteractiveEmblem3D
          onReady={onSceneReady}
          onPhaseChange={onPhaseChange}
          onComplete={onLoaderComplete}
          isSkipped={isSkipped}
        />
      </motion.div>

      {/* ─── FOREGROUND: Cinematic Typography & Controls (Asymmetric Left-Aligned Composition) ─── */}
      <div
        className={`relative z-20 w-full px-4 sm:px-8 lg:px-0 lg:pl-[6vw] xl:pl-[7vw] 2xl:pl-[8vw] flex flex-col justify-center pointer-events-none transition-opacity duration-700 ${
          isContentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <motion.div
          style={{ y: contentY }}
          className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left pointer-events-auto"
        >
          {/* Status Telemetry Flag */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2.5 px-3 py-1 border border-[#292929] bg-[#111111]/90 backdrop-blur-sm mb-4"
          >
            <span className="w-1.5 h-1.5 bg-[#C1121F] shadow-[0_0_8px_#C1121F]" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#D1D1D1]">
              AVAILABLE FOR COLLABORATIVE RESEARCH &amp; INTERNSHIPS
            </span>
          </motion.div>

          {/* Monumental Developer Name with Overflow-Hidden Mask & Scroll Transitions */}
          <motion.div
            style={{
              y: titleY,
              letterSpacing: titleSpacing,
              opacity: titleOpacity
            }}
            className="mb-1.5"
          >
            {/* Line 1: ABHISHEK with Vertical Clipping Mask */}
            <div className="overflow-hidden">
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }}
                animate={isContentVisible ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }}
                transition={{ ...transitionSettings, delay: 0.1 }}
                className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[9.25rem] xl:text-[10rem] font-bold hero-noir-title leading-[0.85] tracking-tight uppercase select-none"
              >
                ABHISHEK
              </motion.h1>
            </div>

            {/* Line 2: BRUNO with Vertical Clipping Mask */}
            <div className="overflow-hidden">
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }}
                animate={isContentVisible ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }}
                transition={{ ...transitionSettings, delay: 0.24 }}
                className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[9.25rem] xl:text-[10rem] font-bold leading-[0.85] tracking-tight uppercase select-none drop-shadow-2xl"
              >
                <span className="hero-noir-title--bruno">
                  BRUNO
                </span>
              </motion.h1>
            </div>
          </motion.div>

          {/* Thin Crimson Laser Rule Animating from Left to Right */}
          <motion.div
            initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            animate={isContentVisible ? { scaleX: 1 } : { scaleX: 0 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md sm:max-w-lg h-[2px] bg-gradient-to-r from-[#C1121F] via-[#C1121F]/60 to-transparent my-4 shadow-[0_0_10px_#C1121F]"
          />

          {/* Sub-Headline Entrance */}
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="font-title text-base sm:text-xl font-bold tracking-[0.18em] text-[#E0E0E0] uppercase mb-4"
          >
            SOFTWARE ENGINEER <span className="text-[#C1121F]">•</span> AI SYSTEMS <span className="text-[#C1121F]">•</span> CREATIVE DEVELOPMENT
          </motion.h2>

          {/* ─── PERSONAL INTRODUCTION: CINEMATIC NEO-NOIR STATEMENT ─── */}
          <div className="mb-6 flex flex-col items-start">
            {/* 1. Small Introductory Label */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={isContentVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.56 }}
              className="hero-intro-label flex items-center gap-2.5 mb-2"
            >
              <span className="w-4 h-[1px] bg-[#8F182A]" aria-hidden="true" />
              <span>THE PERSON BEHIND THE SYSTEMS</span>
            </motion.div>

            {/* 2 & 3. Two-Line Condensed Statement (Brushed Silver + Deep Crimson Metallic) */}
            <div className="mb-3 flex flex-col items-start">
              <motion.p
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.55, delay: 0.64, ease: [0.16, 1, 0.3, 1] }}
                className="hero-intro-statement hero-intro-statement--silver"
              >
                I DON&apos;T JUST STUDY TECHNOLOGY.
              </motion.p>
              <motion.p
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.55, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
                data-text="I BUILD WITH IT."
                className={`hero-intro-statement hero-intro-statement--crimson ${
                  isContentVisible && !shouldReduceMotion ? 'is-sweeping' : ''
                }`}
              >
                I BUILD WITH IT.
              </motion.p>
            </div>

            {/* 4. Personal Description */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.55, delay: 0.84, ease: [0.16, 1, 0.3, 1] }}
              className="hero-intro-body space-y-2 mb-3.5"
            >
              <p className="text-[#EDECF0]">
                I&apos;m a Computer Science Engineering student who believes the best way to understand an idea is to bring it to life.
              </p>
              <p className="text-[#ADB1BA]">
                I create intelligent software, automation tools, and interactive experiences—experimenting, learning from what fails, and refining what works.
              </p>
            </motion.div>

            {/* 5. Concluding Sequence */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={isContentVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.94 }}
              className="hero-intro-sequence flex items-center gap-2"
            >
              <span>CURIOSITY</span>
              <span className="text-[#C83D50]" aria-hidden="true">→</span>
              <span>CREATION</span>
              <span className="text-[#C83D50]" aria-hidden="true">→</span>
              <span>REFINEMENT</span>
            </motion.div>
          </div>

          {/* Sequential CTA Buttons Reveal */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-6 w-full sm:w-auto"
          >
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              className="btn-noir-primary interactive-target w-full sm:w-auto text-center"
            >
              EXPLORE MY WORK
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="btn-noir-secondary interactive-target w-full sm:w-auto text-center"
            >
              CONTACT ME
              <Mail className="w-4 h-4 ml-1 text-[#C1121F]" />
            </a>
          </motion.div>

          {/* Technical Telemetry Row Fade In */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={isContentVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.84 }}
            className="flex items-center gap-6 pt-4 border-t border-[#292929] w-full max-w-lg"
          >
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#292929] bg-[#111111] hover:border-[#C1121F] hover:text-[#C1121F] text-[#A1A1A1] transition-all interactive-target"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#292929] bg-[#111111] hover:border-[#C1121F] hover:text-[#C1121F] text-[#A1A1A1] transition-all interactive-target"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <div className="font-mono text-[10px] tracking-widest text-[#666666] uppercase">
              REPOSITORIES: 12+ // STATUS: ACTIVE
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ─── MINIMALIST SKIP INTRO BUTTON (Visible only during camera sequence) ─── */}
      <div
        className={`absolute bottom-8 right-6 sm:right-10 z-30 transition-opacity duration-500 ${
          isSkipVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={onSkip}
          className="flex items-center gap-2 px-3.5 py-1.5 font-mono text-xs text-[#94a3b8] hover:text-[#c1121f] border border-[#292929] bg-[#0c0c0e]/85 backdrop-blur-md shadow-lg transition-all"
          aria-label="Skip introductory camera sequence"
        >
          <span>SKIP INTRO</span>
          <FastForward className="w-3.5 h-3.5 text-[#c1121f]" />
        </button>
      </div>
    </section>
  );
}
