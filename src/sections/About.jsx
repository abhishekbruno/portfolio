import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Terminal,
  Cpu,
  Activity,
  Layers,
  CheckCircle2,
  GitBranch,
  Flame
} from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import ChapterTransition from '../components/layout/ChapterTransition';
import ForgeAssemblyStructure from '../components/forge/ForgeAssemblyStructure';
import '../components/forge/forge.css';

/**
 * About Section — "THE FORGE"
 *
 * Cinematic narrative experience: FROM CONCEPT TO EXECUTION.
 * Distinctive Scoped Typography System:
 * - Headlines: Syne ExtraBold (800)
 * - Secondary & Stage Headings: Space Grotesk (700)
 * - Narrative & Philosophy: Manrope (400-500)
 * - Technical Annotations & Metadata: IBM Plex Mono (500)
 */
export default function About() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(1);

  // Scroll tracking across The Forge section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Parallax subtle shifts for thermal forge lighting and typography depth
  const yHeatFlare = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -90]);
  const yHeadlineParallax = useTransform(scrollYProgress, [0, 0.4], [0, shouldReduceMotion ? 0 : -30]);
  const headlineLetterSpacing = useTransform(
    scrollYProgress,
    [0, 0.35],
    [shouldReduceMotion ? '-0.045em' : '-0.035em', '-0.05em']
  );

  // The 4 Connected Stages of The Forge
  const forgeStages = [
    {
      num: '01',
      title: 'IDENTIFY THE PROBLEM',
      phase: 'BOUNDARY CONSTRAINTS & FAILURE ISOLATION',
      icon: Terminal,
      philosophy:
        'Every structural flaw originates in unexamined assumptions. Before writing a line of implementation, I deconstruct problem spaces into rigid invariants, mapping operational constraints, threat vectors, and deterministic boundaries.',
      project: {
        title: 'TRIAD — Local AI Consensus Workspace',
        tagline: 'Multi-Model Offline Consensus & Zero Data Leakage',
        desc: 'Identified the architectural fragility of single-model hallucinations and external cloud privacy risks. Built a local multi-model deliberation runtime operating completely air-gapped on developer hardware.',
        githubUrl: 'https://github.com/abhishekbruno/triad-desktop',
        tech: ['Python', 'Local LLMs', 'Desktop Architecture', 'Multi-Agent'],
        metric: 'ISOLATION // 100% AIR-GAPPED'
      }
    },
    {
      num: '02',
      title: 'DESIGN THE ARCHITECTURE',
      phase: 'DETERMINISTIC PROTOCOLS & IPC CONTRACTS',
      icon: Layers,
      philosophy:
        'Architecture is the explicit definition of boundaries. I construct typed communication schemas, low-latency IPC socket bridges, and strict interface contracts that maintain deterministic execution across decoupled environments.',
      project: {
        title: 'Unreal Codex Bridge',
        tagline: 'Connecting AI Reasoning to Unreal Engine via MCP',
        desc: 'Engineered a low-latency bi-directional socket bridge and Model Context Protocol (MCP) schema, transforming raw Unreal Engine viewport controls, actor hierarchies, and editor commands into callable AI tools.',
        githubUrl: 'https://github.com/abhishekbruno/unreal-codex-bridge',
        tech: ['Python', 'Unreal Engine', 'OpenAI Codex', 'MCP', 'IPC'],
        metric: 'LATENCY // SUB-2MS IPC'
      }
    },
    {
      num: '03',
      title: 'BUILD THE SYSTEM',
      phase: 'MODULAR RUNTIMES & TOOL HARNESSES',
      icon: Cpu,
      philosophy:
        'Execution demands disciplined craft. I build modular software harnesses, asynchronous multi-agent runtimes, and developer tooling with strict typing, defensive error boundaries, and zero redundant bloat.',
      project: {
        title: 'FORGE — AI Integration Platform',
        tagline: 'AI-Native Development Platform for Model Context Protocol',
        desc: 'Created an end-to-end integration platform that automates generating, validating, testing, and packaging secure Model Context Protocol (MCP) connectors, empowering developers to link AI agents with external APIs.',
        githubUrl: 'https://github.com/abhishekbruno/forge-ai-integration-platform',
        tech: ['Python', 'Model Context Protocol', 'FastMCP', 'JSON Schema', 'CLI'],
        metric: 'PROTOCOL // FAST_MCP v1.0'
      }
    },
    {
      num: '04',
      title: 'VALIDATE THE RESULT',
      phase: 'EMPIRICAL BENCHMARKS & HARDENING',
      icon: Activity,
      philosophy:
        'Software without empirical verification is speculation. I subject every architecture to ground-truth benchmarks, eliminate computational bottlenecks, and stress-test failure conditions under verifiable metrics.',
      project: {
        title: 'Drug Discovery — Dockpipe (Phase 1)',
        tagline: 'Reproducible CPU Molecular Docking Pipeline',
        desc: 'Engineered an automated ligand preparation and batch docking pipeline using RDKit and AutoDock Vina, validated against experimental 1IEP crystal structure redocking benchmarks with verified RMSD accuracy.',
        githubUrl: 'https://github.com/abhishekbruno/drug-discovery-phase1',
        tech: ['Python', 'AutoDock Vina', 'RDKit', 'Meeko', 'Streamlit'],
        metric: 'BENCHMARK // 1IEP REDOCKING'
      }
    }
  ];

  // Headline character/word staggered reveal variants
  const lineVariants = {
    hidden: { y: '105%', opacity: 0 },
    visible: (custom) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: custom * 0.14,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="forge-section py-24 sm:py-32 border-b border-[#1f2633]"
    >
      {/* Chapter Transition Boundary */}
      <ChapterTransition />

      {/* Atmospheric Background Lighting & Industrial Precision Grid */}
      <div className="forge-grid-pattern" aria-hidden="true" />
      <motion.div style={{ y: yHeatFlare }} className="forge-heat-flare" aria-hidden="true" />
      <div className="forge-silver-flare" aria-hidden="true" />
      <div className="forge-vignette" aria-hidden="true" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* ─── HERO COMPOSITION: FULL-WIDTH ASYMMETRIC EDITORIAL ─── */}
        <div className="pt-4 pb-16 lg:pb-24 border-b border-[#1b2330]">
          {/* Section Code Index with IBM Plex Mono */}
          <div className="flex items-center gap-3 forge-font-mono text-[11px] sm:text-xs text-[#888888] tracking-[0.22em] uppercase mb-8">
            <span className="text-[#c1121f] font-bold">002</span>
            <span>/</span>
            <span className="text-[#cbd5e1]">THE FORGE</span>
            <span className="hidden sm:inline-block w-8 h-[1px] bg-[#292929]" />
            <span className="hidden sm:inline-block text-[#888888] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#c1121f]" />
              <span>FROM CONCEPT TO EXECUTION</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            {/* Left Monumental Typography & Narrative Column */}
            <motion.div
              style={{ y: yHeadlineParallax }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Line 1: IDEAS ARE EASY. */}
              <div className="forge-mask-container mb-2">
                <motion.h2
                  custom={0}
                  initial={shouldReduceMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={lineVariants}
                  style={{ letterSpacing: headlineLetterSpacing }}
                  className="forge-font-hero forge-hero-text forge-headline-offwhite m-0"
                >
                  IDEAS ARE EASY.
                </motion.h2>
              </div>

              {/* Line 2: ENGINEERING IS HARD. (Crimson with Shimmer Sweep) */}
              <div className="forge-mask-container mb-8 sm:mb-10">
                <motion.h2
                  custom={1}
                  initial={shouldReduceMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={lineVariants}
                  style={{ letterSpacing: headlineLetterSpacing }}
                  className="forge-font-hero forge-hero-text forge-headline-crimson forge-crimson-sweep m-0"
                >
                  ENGINEERING IS HARD.
                </motion.h2>
              </div>

              {/* Comprehensive Background & Academic Discipline (Manrope 400-500) */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 max-w-2xl mb-10"
              >
                <p className="forge-font-body text-[#cbd5e1] leading-relaxed text-base sm:text-lg">
                  I am a <strong className="text-white font-semibold">Computer Science Engineering student</strong> passionate about building reliable software systems, protocol integrations, and intelligent automation.
                </p>
                <p className="forge-font-body text-[#94a3b8] leading-relaxed text-sm sm:text-base">
                  {personalInfo.bio[1]}
                </p>
              </motion.div>

              {/* Academic & Systems Telemetry Strip (IBM Plex Mono 500) */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl pt-6 border-t border-[#1e2633]"
              >
                <div className="p-3.5 bg-[#0d1117] border border-[#1b2330]">
                  <span className="forge-font-mono text-[10px] text-[#64748b] tracking-wider uppercase block">DEGREE TRACK</span>
                  <span className="forge-font-mono text-xs text-[#f1f5f9] font-bold mt-1 block">B.Tech CSE</span>
                </div>
                <div className="p-3.5 bg-[#0d1117] border border-[#1b2330]">
                  <span className="forge-font-mono text-[10px] text-[#64748b] tracking-wider uppercase block">CORE DOMAIN</span>
                  <span className="forge-font-mono text-xs text-[#c1121f] font-bold mt-1 block">AI &amp; Systems</span>
                </div>
                <div className="p-3.5 bg-[#0d1117] border border-[#1b2330]">
                  <span className="forge-font-mono text-[10px] text-[#64748b] tracking-wider uppercase block">REPOSITORIES</span>
                  <span className="forge-font-mono text-xs text-[#f1f5f9] font-bold mt-1 block">12+ Verified</span>
                </div>
                <div className="p-3.5 bg-[#0d1117] border border-[#1b2330]">
                  <span className="forge-font-mono text-[10px] text-[#64748b] tracking-wider uppercase block">STACK</span>
                  <span className="forge-font-mono text-xs text-[#f1f5f9] font-bold mt-1 block">Python &amp; JS</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero Perspective Preview of The Forge Assembly */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-[480px]">
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#1b2330]">
                  <span className="forge-font-mono text-[11px] text-[#64748b] tracking-[0.2em] uppercase">
                    STRUCTURAL ASSEMBLY // TIER 0{activeStage}
                  </span>
                  <span className="flex items-center gap-1.5 forge-font-mono text-[10px] text-[#c1121f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c1121f] animate-pulse" />
                    <span>SYNCHRONIZED</span>
                  </span>
                </div>
                <ForgeAssemblyStructure
                  scrollProgress={scrollYProgress}
                  activeStage={activeStage}
                  onStageSelect={(s) => setActiveStage(s)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── THE 4 CONNECTED SCROLL STAGES: FROM CONCEPT TO EXECUTION ─── */}
        <div className="py-20 lg:py-28">
          {/* Section Subheading with Space Grotesk 700 & IBM Plex Mono */}
          <div className="mb-16">
            <span className="forge-font-mono text-xs text-[#c1121f] tracking-[0.28em] uppercase font-bold block mb-3">
              THE METHODOLOGY
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="forge-font-heading forge-chapter-title text-white uppercase tracking-tight">
                  FROM CONCEPT TO EXECUTION
                </h3>
                <p className="forge-font-mono text-xs sm:text-sm text-[#71717a] uppercase tracking-widest mt-2">
                  FOUR STAGES OF REPRODUCIBLE SYSTEM CONSTRUCTION
                </p>
              </div>
              <p className="forge-font-mono text-[11px] text-[#64748b] tracking-[0.2em] uppercase max-w-sm">
                SCROLL TO PROGRESSIVELY ASSEMBLE ARCHITECTURAL COMPONENTS
              </p>
            </div>
          </div>

          {/* 4 Connected Stages Timeline Layout */}
          <div className="relative">
            {/* Vertical Crimson Timeline Rail on Desktop */}
            <div className="hidden lg:block forge-timeline-rail" aria-hidden="true" />

            <div className="space-y-12 lg:space-y-16">
              {forgeStages.map((stage, idx) => {
                const StageIcon = stage.icon;
                const isSelected = activeStage === idx + 1;

                return (
                  <motion.div
                    key={stage.num}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    onViewportEnter={() => setActiveStage(idx + 1)}
                    transition={{
                      duration: 0.65,
                      delay: shouldReduceMotion ? 0 : 0.05,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`forge-step-card ${isSelected ? 'active' : ''} lg:ml-12`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Stage Index & Narrative Philosophy */}
                      <div className="lg:col-span-6 flex flex-col justify-between h-full">
                        <div>
                          {/* Stage Header Badge (IBM Plex Mono) */}
                          <div className="flex items-center justify-between pb-3 border-b border-[#1e2633] mb-4">
                            <span className="forge-font-mono text-xs tracking-[0.2em] text-[#c1121f] font-bold flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#c1121f]" />
                              <span>STAGE {stage.num}</span>
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="forge-font-mono text-[10px] text-[#64748b] tracking-wider uppercase">
                                {stage.phase}
                              </span>
                              <StageIcon className="w-4 h-4 text-[#c1121f]" />
                            </div>
                          </div>

                          {/* Stage Title in Space Grotesk 700 */}
                          <h4 className="forge-font-heading forge-supporting-title text-white font-bold uppercase tracking-wide mb-3">
                            {stage.title}
                          </h4>

                          {/* Stage Philosophy in Manrope 400-500 */}
                          <p className="forge-font-body text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                            {stage.philosophy}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[#1b2330] flex items-center justify-between forge-font-mono text-[11px] text-[#64748b]">
                          <span>PHASE STATUS</span>
                          <span className="text-[#cbd5e1] font-semibold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                            <span>VERIFIED IN PRODUCTION</span>
                          </span>
                        </div>
                      </div>

                      {/* Right: Real Project Connection Card */}
                      <div className="lg:col-span-6">
                        <div className="mb-2 flex items-center justify-between forge-font-mono text-[11px] text-[#64748b] tracking-wider uppercase">
                          <span>SYSTEM IMPLEMENTATION</span>
                          <span className="text-[#c1121f] font-bold">{stage.project.metric}</span>
                        </div>

                        <a
                          href={stage.project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="forge-project-card group"
                          aria-label={`Inspect ${stage.project.title} on GitHub`}
                        >
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              {/* Project Title in Space Grotesk */}
                              <h5 className="forge-font-heading text-lg sm:text-xl font-bold text-white group-hover:text-[#c1121f] transition-colors uppercase tracking-normal">
                                {stage.project.title}
                              </h5>
                              <p className="forge-font-mono text-[11px] text-[#94a3b8] tracking-wider mt-0.5">
                                {stage.project.tagline}
                              </p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-[#64748b] group-hover:text-[#c1121f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                          </div>

                          {/* Project Description in Manrope */}
                          <p className="forge-font-body text-xs sm:text-sm text-[#888888] leading-relaxed mb-4">
                            {stage.project.desc}
                          </p>

                          {/* Technology Tags in IBM Plex Mono */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#1e2633]">
                            {stage.project.tech.map((t) => (
                              <span key={t} className="forge-tech-pill">
                                {t}
                              </span>
                            ))}
                            <span className="ml-auto forge-font-mono text-[10px] text-[#cbd5e1] group-hover:text-white flex items-center gap-1">
                              <GitBranch className="w-3 h-3 text-[#c1121f]" />
                              <span>VIEW SOURCE</span>
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ─── SECTION EXIT: TRANSITION TOWARD THE ARSENAL (SKILLS) ─── */}
          <div className="mt-20 pt-10 border-t border-[#1b2330] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3 forge-font-mono text-[11px] sm:text-xs text-[#64748b] tracking-[0.22em] uppercase">
              <span className="text-[#c1121f] font-bold">003</span>
              <span>•</span>
              <span>PROCEED TO SYSTEM SPECIFICATIONS &amp; THE ARSENAL</span>
            </div>

            <a
              href="#skills"
              className="inline-flex items-center gap-2.5 forge-font-heading text-xs uppercase tracking-[0.18em] text-[#cbd5e1] hover:text-white hover:border-[#c1121f] px-6 py-3 border border-[#263143] bg-[#0d1117] transition-all duration-200 group"
            >
              <span>ENTER THE ARSENAL</span>
              <ArrowRight className="w-4 h-4 text-[#c1121f] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
