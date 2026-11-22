import React, { Suspense, lazy, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Github, Linkedin } from '../components/ui/Icons';
import { personalInfo } from '../data/portfolio';
import CinematicHeroLighting from '../components/hero/CinematicHeroLighting';

// Code-split Three.js interactive 3D AB Medallion centerpiece
const InteractiveEmblem3D = lazy(() => import('../components/hero/InteractiveEmblem3D'));

export default function Hero() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

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
  // Subtly lifts the title, gently widens letter-spacing, and gracefully reduces opacity near hero exit
  const titleY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -42]);
  const titleSpacing = useTransform(scrollYProgress, [0, 1], ['0.04em', shouldReduceMotion ? '0.04em' : '0.08em']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.85, 0.3]);

  // Content scroll offset (moves upward slower than background)
  const contentY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -26]);

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
      className="relative min-h-screen w-full flex items-center overflow-hidden pt-24 pb-16 border-b border-[#292929] bg-[#080808]"
    >
      {/* ─── LAYER 1: Distant Ambient Crimson Illumination (Parallax Layer 1) ─── */}
      <motion.div
        style={{ y: yDistantAmbient }}
        className="absolute inset-0 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        {/* Soft Upper-Left Directional Crimson Source & Dynamic Mouse Follower */}
        <CinematicHeroLighting />

        {/* Ambient glow radiating specifically behind the emblem footprint */}
        <div
          className="absolute top-1/2 right-[5%] sm:right-[15%] lg:right-[20%] -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(193, 18, 31, 0.16) 0%, rgba(120, 0, 0, 0.06) 40%, transparent 70%)'
          }}
        />
      </motion.div>

      {/* ─── LAYER 2: Midground Atmospheric Haze & Architectural Rings (Parallax Layer 2) ─── */}
      <motion.div
        style={{ y: yMidgroundHaze }}
        className="absolute inset-0 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        {/* Subtle curved architectural background rings */}
        <div className="absolute top-1/2 right-[10%] lg:right-[18%] -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-[#292929]/30 pointer-events-none hidden sm:block" />
        <div className="absolute top-1/2 right-[10%] lg:right-[18%] -translate-y-1/2 w-[920px] h-[920px] rounded-full border border-[#292929]/15 pointer-events-none hidden lg:block" />

        {/* Atmospheric vignette to smoothly integrate into the dark void */}
        <div className="absolute inset-0 bg-vignette pointer-events-none" />
      </motion.div>

      {/* Top Editorial Index & Coordinates */}
      <div className="absolute top-24 left-4 sm:left-8 flex items-center gap-3 font-mono text-[10px] sm:text-xs text-[#888888] tracking-[0.25em] uppercase z-20 pointer-events-none">
        <span className="text-[#C1121F] font-bold">001</span>
        <span>/</span>
        <span>RESEARCH &amp; SOFTWARE ARCHITECTURE</span>
        <span className="hidden sm:inline-block w-8 h-[1px] bg-[#292929]" />
        <span className="hidden sm:inline-block text-[#666666]">COORDINATES 28.6139° N, 77.2090° E</span>
      </div>

      {/* Floating Tactical Environmental Indicators (Near 3D Medallion) */}
      <div className="absolute top-28 right-8 font-mono text-[9px] text-[#555555] tracking-[0.25em] uppercase z-20 pointer-events-none hidden lg:block text-right">
        <div>ARTIFACT SPEC // AB-MEDALLION-01</div>
        <div className="text-[#C1121F]/80 mt-1">CORE MATERIAL // GUNMETAL • PBR</div>
      </div>

      <div className="absolute bottom-12 right-8 font-mono text-[9px] text-[#555555] tracking-[0.25em] uppercase z-20 pointer-events-none hidden lg:block text-right">
        <div>PHYSICAL INSPECTION // ACTIVE</div>
        <div className="text-[#888888] mt-1">DRAG SCENE TO ROTATE ARTIFACT</div>
      </div>

      {/* ─── LAYER 3: Full-Bleed Integrated 3D AB Medallion Canvas (Parallax Layer 3) ─── */}
      <motion.div
        style={{ y: yEmblemCanvas }}
        className="absolute inset-0 z-10 w-full h-full pointer-events-auto"
      >
        <Suspense fallback={null}>
          <InteractiveEmblem3D />
        </Suspense>
      </motion.div>

      {/* ─── FOREGROUND: Cinematic Typography & Controls ─── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pointer-events-none">
        <motion.div
          style={{ y: contentY }}
          className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left pointer-events-auto"
        >
          {/* Status Telemetry Flag */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2.5 px-3 py-1 border border-[#292929] bg-[#111111]/90 backdrop-blur-sm mb-6"
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
            className="mb-2"
          >
            {/* Line 1: ABHISHEK with Vertical Clipping Mask */}
            <div className="overflow-hidden">
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ ...transitionSettings, delay: 0.1 }}
                className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-[#F5F5F5] leading-[0.85] tracking-tight uppercase select-none drop-shadow-2xl"
              >
                ABHISHEK
              </motion.h1>
            </div>

            {/* Line 2: BRUNO with Vertical Clipping Mask */}
            <div className="overflow-hidden">
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ ...transitionSettings, delay: 0.24 }}
                className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-[#F5F5F5] leading-[0.85] tracking-tight uppercase select-none drop-shadow-2xl"
              >
                <span className="text-[#F5F5F5] hover:text-[#C1121F] transition-colors duration-300">
                  BRUNO
                </span>
              </motion.h1>
            </div>
          </motion.div>

          {/* Thin Crimson Laser Rule Animating from Left to Right */}
          <motion.div
            initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md sm:max-w-lg h-[2px] bg-gradient-to-r from-[#C1121F] via-[#C1121F]/60 to-transparent my-6 shadow-[0_0_10px_#C1121F]"
          />

          {/* Sub-Headline Entrance */}
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="font-title text-base sm:text-xl font-bold tracking-[0.18em] text-[#E0E0E0] uppercase mb-4"
          >
            SOFTWARE ENGINEER <span className="text-[#C1121F]">•</span> AI SYSTEMS <span className="text-[#C1121F]">•</span> CREATIVE DEVELOPMENT
          </motion.h2>

          {/* Editorial Paragraph Slide-up */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-sm sm:text-base text-[#A1A1A1] max-w-xl leading-relaxed mb-8 drop-shadow"
          >
            Engineering intelligent systems, immersive digital experiences, and practical software solutions.
            Bridging autonomous Model Context Protocol (MCP) integrations with game engine automation and computational research pipelines.
          </motion.p>

          {/* Sequential CTA Buttons Reveal */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
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
            animate={{ opacity: 1 }}
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
    </section>
  );
}
