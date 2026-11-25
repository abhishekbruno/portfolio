import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import ChapterTransition from '../components/layout/ChapterTransition';
import ForgeEvidenceWall from '../components/forge/ForgeEvidenceWall';
import ForgeExtrudedLine from '../components/forge/ForgeExtrudedLine';
import ExecutionOperation from '../components/forge/ExecutionOperation';
import '../components/forge/forge.css';

/**
 * About Section — "002 / THE FORGE: LEARNING THROUGH CREATION"
 *
 * Central Philosophy: Engineering is a process of learning through creation.
 * Clean, cinematic two-column composition:
 * - Left Column (55-60%): John Wick–inspired 3D title card with glossy floor reflection,
 *   manifesto philosophy, and process signature.
 * - Right Column (40-45%): Clean, reserved ForgeVisualSlot for future asset integration.
 * Followed by Section 2: "FROM CONCEPT TO EXECUTION" (4 Stages of Reproducible System Construction)
 */
export default function About() {
  const sectionRef = useRef(null);
  const titleStageRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isTitleInView = useInView(titleStageRef, { once: false, amount: 0.1 });

  // Minimal Process Signature Progression (numbered phases for The Creed)
  const processSteps = [
    { num: '01', label: 'CURIOSITY' },
    { num: '02', label: 'CREATE' },
    { num: '03', label: 'EXPERIMENT' },
    { num: '04', label: 'LEARN' },
    { num: '05', label: 'EVOLVE', accent: true }
  ];

  // Scroll tracking across The Forge section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Parallax subtle shifts for thermal forge lighting & title room spill
  const yHeatFlare = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -90]);
  const yTitleGlow = useTransform(scrollYProgress, [0, 0.55], [14, shouldReduceMotion ? 14 : -14]);

  // The 4 Connected Stages of The Forge
  const forgeStages = [
    {
      num: '01',
      title: 'IDENTIFY THE PROBLEM',
      phase: 'BOUNDARY CONSTRAINTS & FAILURE ISOLATION',
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="forge-section pt-20 pb-16 sm:pt-24 sm:pb-20 border-b border-[#282C34]"
    >
      {/* Chapter Transition Boundary */}
      <ChapterTransition />

      {/* Atmospheric Background Lighting & Industrial Precision Grid */}
      <div className="forge-grid-pattern" aria-hidden="true" />
      <motion.div style={{ y: yHeatFlare }} className="forge-heat-flare" aria-hidden="true" />
      <div className="forge-silver-flare" aria-hidden="true" />
      <div className="forge-vignette" aria-hidden="true" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* ─── 002 / THE FORGE: A PERSONAL ENGINEERING PHILOSOPHY & MANIFESTO ─── */}
        <div className="relative pt-2 pb-14 lg:pb-18 border-b border-[#282C34]/60">
          {/* Layer 2 (Desktop): Coded Investigation Board seamlessly blended on right */}
          <div className="hidden lg:block" aria-hidden="true">
            <ForgeEvidenceWall variant="desktop" />
          </div>

          <div className="relative z-10 flex flex-col items-start">

            {/* Left Column — The Manifesto (48–52% desktop width, preserved untouched) */}
            <div className="w-full lg:w-[50%] xl:w-[50%] flex flex-col items-start">

              {/* 1. Chapter number and section label */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0.1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 font-mono text-[11px] sm:text-xs text-[#888888] tracking-[0.26em] uppercase mb-3"
              >
                <span className="text-[#C41E37] font-bold">002</span>
                <span className="text-[#3d424d]">/</span>
                <span className="text-[#E4E7ED] font-semibold">THE FORGE</span>
              </motion.div>

              {/* 2. Small editorial eyebrow: A PERSONAL ENGINEERING PHILOSOPHY */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0.1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5 font-mono text-[10px] sm:text-[11px] text-[#B5BAC4] tracking-[0.28em] uppercase font-medium mb-7 sm:mb-9"
              >
                <span className="w-[2px] h-3 bg-[#C41E37] inline-block shadow-[0_0_8px_rgba(196,30,55,0.65)]" />
                <span>A PERSONAL ENGINEERING PHILOSOPHY</span>
              </motion.div>

              {/* 3. Monumental John Wick–Inspired 3D Title Block + Glossy Floor Reflection Stage */}
              <div ref={titleStageRef} className="forge-title-stage w-full">
                {/* Ambient Neo-Noir Practical Room Lighting behind Title */}
                <div className="forge-title-key-spill" aria-hidden="true" />
                <motion.div
                  style={{ y: yTitleGlow }}
                  className="forge-title-crimson-spill"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col items-start w-full">
                  {/* Statement 1: Brushed Platinum / Cold Silver 3D Title */}
                  <h2 className="m-0 flex flex-col items-start w-full">
                    <span className="block overflow-hidden pb-1 pr-2">
                      <motion.span
                        initial={shouldReduceMotion ? false : { opacity: 0.08, y: '28%' }}
                        whileInView={{ opacity: 1, y: '0%' }}
                        viewport={{ once: false, amount: 0.05 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        className="block"
                      >
                        <ForgeExtrudedLine
                          text="I LEARN"
                          variant="silver"
                          sweepActive={isTitleInView}
                          reducedMotion={Boolean(shouldReduceMotion)}
                          className="forge-title-silver-lead"
                        />
                      </motion.span>
                    </span>

                    <span className="block overflow-hidden pb-2 pr-2 -mt-0.5">
                      <motion.span
                        initial={shouldReduceMotion ? false : { opacity: 0.08, y: '28%' }}
                        whileInView={{ opacity: 1, y: '0%' }}
                        viewport={{ once: false, amount: 0.05 }}
                        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="block"
                      >
                        <ForgeExtrudedLine
                          text="BY BUILDING."
                          variant="silver"
                          sweepActive={isTitleInView}
                          reducedMotion={Boolean(shouldReduceMotion)}
                          className="forge-title-silver-main"
                        />
                      </motion.span>
                    </span>
                  </h2>

                  {/* Statement 2: Deep Lit Crimson Metallic 3D Title (Elevated Drama & Scale) */}
                  <h2 className="m-0 mt-3 sm:mt-4 flex flex-col items-start w-full">
                    <span className="block overflow-hidden pb-1 pr-2">
                      <motion.span
                        initial={shouldReduceMotion ? false : { opacity: 0.08, y: '28%' }}
                        whileInView={{ opacity: 1, y: '0%' }}
                        viewport={{ once: false, amount: 0.05 }}
                        transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                        className="block"
                      >
                        <ForgeExtrudedLine
                          text="I GROW THROUGH"
                          variant="crimson"
                          sweepActive={isTitleInView}
                          reducedMotion={Boolean(shouldReduceMotion)}
                          className="forge-title-crimson-lead"
                        />
                      </motion.span>
                    </span>

                    <span className="block overflow-hidden pb-1.5 pr-2 -mt-0.5">
                      <motion.span
                        initial={shouldReduceMotion ? false : { opacity: 0.08, y: '28%' }}
                        whileInView={{ opacity: 1, y: '0%' }}
                        viewport={{ once: false, amount: 0.05 }}
                        transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="block"
                      >
                        <ForgeExtrudedLine
                          text="TRIAL & ERROR."
                          variant="crimson"
                          sweepActive={isTitleInView}
                          reducedMotion={Boolean(shouldReduceMotion)}
                          className="forge-title-crimson-main"
                        />
                      </motion.span>
                    </span>
                  </h2>

                  {/* Glossy Black Lacquer Floor Horizon & Vertically Flipped Reflection */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.05 }}
                    transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="forge-floor-stage"
                    aria-hidden="true"
                  >
                    <div className="forge-floor-horizon" />
                    <div className="forge-floor-spill" />
                    <div className="forge-reflection-mask-wrap">
                      <div className="forge-reflection-flipped flex flex-col items-start w-full">
                        <ForgeExtrudedLine
                          text="I GROW THROUGH"
                          variant="crimson"
                          reflection
                          className="forge-title-crimson-lead"
                        />
                        <ForgeExtrudedLine
                          text="TRIAL & ERROR."
                          variant="crimson"
                          reflection
                          className="forge-title-crimson-main -mt-0.5"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* 4. Thin architectural crimson divider */}
              <motion.div
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="w-20 sm:w-28 h-[1px] bg-gradient-to-r from-[#C41E37] via-[#C41E37]/45 to-transparent mt-4 mb-7 sm:mt-5 sm:mb-8"
              />

              {/* 5. Main philosophy paragraph */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0.12, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.08 }}
                transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl"
              >
                <p className="forge-creed-paragraph m-0">
                  I believe engineering is a continuous process of{' '}
                  <span className="forge-creed-emphasis">learning through creation</span>. Every idea invites experimentation. Every failure reveals something new. Every iteration brings me closer to understanding.
                </p>
              </motion.div>

              {/* 6. Personal Quote — THE CREED (Secondary Focal Point) */}
              <motion.blockquote
                initial={shouldReduceMotion ? false : { opacity: 0.12, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.08 }}
                transition={{ duration: 0.72, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="forge-creed-quote-wrap max-w-2xl mt-7 sm:mt-8 mb-0"
              >
                {/* Short, thin crimson vertical accent */}
                <span className="forge-creed-accent" aria-hidden="true" />
                <p className="forge-creed-quote m-0">
                  <span className="block forge-creed-ivory-face">
                    I don&apos;t build because I know everything.
                  </span>
                  <span className="block forge-creed-ivory-face">
                    I build because there&apos;s
                  </span>
                  <span className="block forge-creed-crimson-end">
                    always something more to learn.
                  </span>
                </p>
              </motion.blockquote>

              {/* 7. Process sequence (IBM Plex Mono numerals + Space Grotesk Medium stages + hairline connectors) */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0.12, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.08 }}
                transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-2xl mt-8 sm:mt-10 pt-6 sm:pt-7 border-t border-[#282C34]/65"
              >
                <div className="flex flex-wrap lg:flex-nowrap items-end gap-y-5 gap-x-6 sm:gap-x-3.5">
                  {processSteps.map((step, idx) => (
                    <React.Fragment key={step.label}>
                      <div className="flex flex-col items-start gap-1.5 shrink-0">
                        <span
                          className={`forge-creed-step-num ${
                            step.accent ? 'is-crimson' : ''
                          }`}
                        >
                          {step.num}
                        </span>
                        <span className="forge-creed-step-title">
                          {step.label}
                        </span>
                      </div>
                      {idx < processSteps.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="forge-creed-connector hidden sm:block flex-1 min-w-[14px] max-w-[36px] mb-[6px]"
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Tablet & Mobile Evidence Wall (Stacked cleanly below Manifesto with radial edge dissolve) */}
            <div className="w-full lg:hidden mt-10 sm:mt-12" aria-hidden="true">
              <ForgeEvidenceWall variant="stacked" />
            </div>

          </div>
        </div>

      </div>

      {/* ─── FULL-WIDTH ENGINEERING CHAPTER: FROM CONCEPT TO EXECUTION ─── */}
      <ExecutionOperation stages={forgeStages} />
    </section>
  );
}
