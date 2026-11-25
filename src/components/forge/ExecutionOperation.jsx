import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowRight, ExternalLink, GitBranch } from 'lucide-react';
import { StageEngineeringVisual, IntroBlueprintScene } from './ExecutionVisuals';

/**
 * ExecutionOperation
 *
 * Full-width neo-noir architectural methodology chapter ("FROM CONCEPT TO EXECUTION")
 * replacing cramped cards with:
 * - Wide cinematic intro (title + subtitle + lightweight vector blueprint)
 * - Continuous scroll-linked steel/crimson vertical spine with accessible stage jump controls
 * - Four spacious horizontal engineering stages preserving original descriptions & projects
 * - Closing outcome band ("IDEAS TURNED INTO WORKING SYSTEMS.") with CTA to Projects
 */
export default function ExecutionOperation({ stages = [] }) {
  const containerRef = useRef(null);
  const spineRef = useRef(null);
  const stageRefs = useRef([]);
  const shouldReduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ['start 72%', 'end 68%']
  });

  // Bi-directional IntersectionObserver tracks active phase coherently on up & down scroll
  useEffect(() => {
    const elements = stageRefs.current.filter(Boolean);
    if (!elements.length || typeof IntersectionObserver === 'undefined') return;

    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.dataset.stageIndex);
          ratios.set(idx, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let bestIdx = -1;
        let bestRatio = 0;
        ratios.forEach((ratio, idx) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = idx;
          }
        });
        if (bestIdx >= 0) {
          setActiveStage(bestIdx);
        }
      },
      {
        rootMargin: '-18% 0px -28% 0px',
        threshold: [0.1, 0.25, 0.45, 0.7]
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [stages.length]);

  const scrollToStage = (index) => {
    setActiveStage(index);
    const el = stageRefs.current[index];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({
        top,
        behavior: shouldReduceMotion ? 'auto' : 'smooth'
      });
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top,
        behavior: shouldReduceMotion ? 'auto' : 'smooth'
      });
    }
  };

  return (
    <div ref={containerRef} id="execution-operation" className="op-chapter-root">
      {/* Subtle architectural vignette isolating chapter mood */}
      <div className="op-chapter-atmosphere" aria-hidden="true" />

      <div className="relative z-10 max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* ─── 1. CINEMATIC INTRODUCTION ─── */}
        <header className="op-intro-band">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Intro Headline & Navigation Index */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="flex items-center gap-3 font-mono text-xs tracking-[0.26em] uppercase text-[#888888] mb-5">
                <span className="w-2 h-2 bg-[#C41E37]" />
                <span>THE METHODOLOGY</span>
                <span className="text-[#3d424d]">//</span>
                <span className="text-[#cbd5e1]">ENGINEERING OPERATION</span>
              </div>

              <motion.h3
                initial={shouldReduceMotion ? false : { opacity: 0.15, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="op-intro-title m-0"
              >
                <span className="block op-intro-silver">FROM CONCEPT TO</span>
                <span className="block op-intro-crimson">EXECUTION</span>
              </motion.h3>

              <p className="op-intro-subtitle mt-5 mb-8">
                A REPEATABLE PROCESS OF BUILDING, TESTING, AND REFINING SYSTEMS.
              </p>

              {/* Accessible Quick Phase Navigation */}
              <nav aria-label="Engineering operation phases" className="flex flex-wrap items-center gap-2.5">
                {stages.map((st, idx) => {
                  const isActive = activeStage === idx;
                  return (
                    <button
                      key={st.num}
                      type="button"
                      onClick={() => scrollToStage(idx)}
                      aria-current={isActive ? 'step' : undefined}
                      className={`op-jump-pill ${isActive ? 'is-active' : ''}`}
                    >
                      <span className="op-jump-num">{st.num}</span>
                      <span className="op-jump-label">{st.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right Abstract Technical Engineering Scene */}
            <div className="lg:col-span-6">
              <IntroBlueprintScene reducedMotion={Boolean(shouldReduceMotion)} />
            </div>
          </div>
        </header>

        {/* ─── 2. CONNECTED PROCESS SPINE + FOUR ENGINEERING STAGES ─── */}
        <div ref={spineRef} className="op-stages-container relative">
          {/* Desktop Continuous Process Spine & Stage Anchor Controls */}
          <div className="hidden lg:block op-spine-column" aria-label="Operation progress spine">
            <div className="op-spine-track">
              <motion.div
                className="op-spine-fill"
                style={{
                  scaleY: shouldReduceMotion ? 1 : scrollYProgress
                }}
              />
            </div>

            {/* Quick-jump sticky stage indicator rail */}
            <div className="sticky top-28 flex flex-col gap-3 pt-2">
              {stages.map((st, idx) => {
                const isActive = activeStage === idx;
                return (
                  <button
                    key={st.num}
                    type="button"
                    onClick={() => scrollToStage(idx)}
                    aria-label={`Jump to Phase ${st.num}: ${st.title}`}
                    aria-current={isActive ? 'step' : undefined}
                    className={`op-spine-node ${isActive ? 'is-active' : ''}`}
                  >
                    <span className="op-spine-dot" />
                    <span className="op-spine-num">{st.num}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Four Wide Horizontal Engineering Stages */}
          <div className="lg:pl-20 xl:pl-24">
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <motion.article
                  key={stage.num}
                  id={`operation-stage-${stage.num}`}
                  data-stage-index={idx}
                  ref={(el) => {
                    stageRefs.current[idx] = el;
                  }}
                  initial={shouldReduceMotion ? false : { opacity: 0.24, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className={`op-stage-band ${isActive ? 'is-active' : ''}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center w-full">
                    {/* Stage Narrative, Giant Numeral & Grounded Project Spec */}
                    <div className="lg:col-span-6 flex flex-col items-start">
                      <div className="flex items-baseline gap-5 sm:gap-7 mb-3">
                        <span className="op-phase-number" aria-hidden="true">
                          {stage.num}
                        </span>
                        <div>
                          <div className="op-phase-meta mb-1.5">
                            STAGE {stage.num} // {stage.phase}
                          </div>
                          <h4 className="op-phase-title m-0">{stage.title}</h4>
                        </div>
                      </div>

                      <p className="op-phase-body mt-3 mb-7">{stage.philosophy}</p>

                      {/* Real System Implementation Reference (Borderless architectural split) */}
                      <div className="op-project-spec w-full pt-5 border-t border-[#222731]">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="op-spec-eyebrow">SYSTEM IMPLEMENTATION</span>
                          <span className="op-spec-metric">{stage.project.metric}</span>
                        </div>

                        <a
                          href={stage.project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block text-left"
                          aria-label={`Inspect ${stage.project.title} source on GitHub`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h5 className="font-heading text-lg sm:text-xl font-bold text-[#F4F4F5] group-hover:text-[#DF2238] transition-colors uppercase m-0">
                                {stage.project.title}
                              </h5>
                              <p className="op-spec-tagline mt-0.5 mb-2.5">
                                {stage.project.tagline}
                              </p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-[#64748b] group-hover:text-[#DF2238] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                          </div>

                          <p className="op-spec-desc mb-4">{stage.project.desc}</p>

                          <div className="flex flex-wrap items-center gap-2">
                            {stage.project.tech.map((t) => (
                              <span key={t} className="forge-tech-pill">
                                {t}
                              </span>
                            ))}
                            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase text-[#cbd5e1] group-hover:text-white">
                              <GitBranch className="w-3.5 h-3.5 text-[#C41E37]" />
                              <span>VIEW SOURCE</span>
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Stage-Specific Engineering Visualization */}
                    <div className="lg:col-span-6">
                      <div className="op-visual-frame">
                        <StageEngineeringVisual
                          stageIndex={idx}
                          reducedMotion={Boolean(shouldReduceMotion)}
                        />
                      </div>

                      {idx < stages.length - 1 && (
                        <div className="hidden lg:flex items-center justify-end gap-3 mt-4 pr-2">
                          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#64748b]">
                            NEXT // STAGE {stages[idx + 1].num} {stages[idx + 1].title}
                          </span>
                          <span className="w-8 h-[1px] bg-gradient-to-r from-[#788898]/50 to-[#C41E37]" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ─── 3. FINAL OUTCOME CLOSING COMPOSITION ─── */}
        <div className="op-outcome-band">
          {/* Unified SVG circuit connecting all four engineering stages into continuous improvement */}
          <div className="op-outcome-circuit mb-10" aria-hidden="true">
            <svg viewBox="0 0 1120 84" className="w-full h-auto block" fill="none">
              <line x1="60" y1="36" x2="1060" y2="36" stroke="rgba(120, 136, 152, 0.25)" strokeWidth="1.2" />
              <motion.line
                x1="60"
                y1="36"
                x2="1060"
                y2="36"
                stroke="#C41E37"
                strokeWidth="1.6"
                initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Return refinement loop arc */}
              <path
                d="M 810 36 C 720 76, 400 76, 310 36"
                stroke="rgba(223, 34, 56, 0.45)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              {[
                { x: 60, label: '01 INVESTIGATE' },
                { x: 310, label: '02 DESIGN' },
                { x: 560, label: '03 BUILD' },
                { x: 810, label: '04 VALIDATE' },
                { x: 1060, label: '05 IMPROVE', accent: true }
              ].map((node) => (
                <g key={node.label}>
                  <circle cx={node.x} cy="36" r="5" fill={node.accent ? '#DF2238' : '#131722'} stroke={node.accent ? '#F5F5F5' : '#C41E37'} strokeWidth="1.5" />
                  <text
                    x={node.x}
                    y="16"
                    textAnchor={node.x === 60 ? 'start' : node.x === 1060 ? 'end' : 'middle'}
                    fontFamily="IBM Plex Mono, monospace"
                    fontSize="10"
                    letterSpacing="1.8"
                    fill={node.accent ? '#DF2238' : '#94a3b8'}
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h4 className="op-outcome-title m-0">
                IDEAS TURNED INTO <span className="op-intro-crimson">WORKING SYSTEMS.</span>
              </h4>
              <p className="op-outcome-copy mt-4 mb-0">
                Creation leads to testing. Testing leads to understanding. Understanding drives refinement.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className="btn-noir-primary interactive-target"
              >
                <span>EXPLORE MY PROJECTS</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="#skills"
                onClick={(e) => scrollToSection(e, 'skills')}
                className="btn-noir-secondary interactive-target"
              >
                <span>ENTER THE ARSENAL</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
