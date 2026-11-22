import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FileText,
  ExternalLink,
  Bot,
  Cpu,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import SectionHeader from '../components/ui/SectionHeader';
import ChapterTransition from '../components/layout/ChapterTransition';

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const pillars = [
    {
      num: '01',
      icon: Bot,
      title: 'AGENTIC AI & PROTOCOLS',
      desc: 'Architecting Model Context Protocol (MCP) integrations, FastMCP tooling, and multi-model consensus runtimes.'
    },
    {
      num: '02',
      icon: Cpu,
      title: 'ENGINE & WORKFLOW AUTOMATION',
      desc: 'Connecting AI reasoning with Unreal Engine through real-time socket bridges and robotic process automation (UiPath).'
    },
    {
      num: '03',
      icon: Layers,
      title: 'COMPUTATIONAL RESEARCH',
      desc: 'Reproducible structure-based molecular docking pipelines, AutoDock Vina redocking, and biochemical algorithm validation.'
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: 'SYSTEM SECURITY & INTEGRITY',
      desc: 'Constructing robust software harnesses, defensive telemetry, and deterministic IPC communication layers.'
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative border-b border-[#292929] overflow-hidden">
      {/* Chapter Transition Divider & Atmospheric Illumination */}
      <ChapterTransition />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          chapter="002"
          category="BACKGROUND & PHILOSOPHY"
          title="THE ARCHITECT"
          subtitle="A computer science engineering student exploring practical intelligence, automation architectures, and modern web development."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Sharp Editorial Dossier & Image */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative border border-[#292929] bg-[#111111] p-4">
              {/* Corner Crosshair Accents (Obsidian Reference Style) */}
              <div className="absolute -top-1.5 -left-1.5 font-mono text-[#C1121F] text-xs pointer-events-none">+</div>
              <div className="absolute -top-1.5 -right-1.5 font-mono text-[#C1121F] text-xs pointer-events-none">+</div>
              <div className="absolute -bottom-1.5 -left-1.5 font-mono text-[#C1121F] text-xs pointer-events-none">+</div>
              <div className="absolute -bottom-1.5 -right-1.5 font-mono text-[#C1121F] text-xs pointer-events-none">+</div>

              {/* Dossier Image Frame */}
              <div className="relative w-full aspect-square bg-[#171717] overflow-hidden border border-[#292929]">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback Graphic */}
                <div className="hidden absolute inset-0 bg-[#111111] flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 border border-[#C1121F] flex items-center justify-center mb-3 text-[#C1121F] font-title text-2xl font-bold">
                    AB
                  </div>
                  <span className="font-title font-bold text-lg text-[#F5F5F5] uppercase tracking-wider">
                    {personalInfo.name}
                  </span>
                  <span className="font-mono text-xs text-[#C1121F] mt-1 uppercase tracking-widest">
                    SYSTEM ARCHITECT
                  </span>
                </div>
              </div>

              {/* Dossier Caption */}
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-[#888888] tracking-widest uppercase">
                <span>IDENTITY // ABHISHEK BRUNO</span>
                <span className="text-[#C1121F]">RECORD: VERIFIED</span>
              </div>
            </div>

            {/* Verified Statistics Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {personalInfo.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="p-4 border border-[#292929] bg-[#111111]"
                >
                  <span className="block font-title font-bold text-2xl text-[#F5F5F5]">
                    {stat.value}
                  </span>
                  <span className="block font-mono text-[10px] text-[#888888] uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            {/* Academic Briefing Box */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 border-l-2 border-[#C1121F] border-t border-r border-b border-[#292929] bg-[#111111]"
            >
              <span className="font-mono text-xs text-[#C1121F] tracking-widest uppercase block mb-1">
                ACADEMIC CREDENTIAL
              </span>
              <h3 className="font-title text-xl font-bold text-[#F5F5F5] uppercase tracking-wide">
                B.Tech in Computer Science &amp; Engineering
              </h3>
              <p className="font-body text-sm text-[#A1A1A1] mt-2 leading-relaxed">
                Active coursework across Data Structures &amp; Algorithms, Computer Networks, Operating Systems,
                Artificial Intelligence, and Distributed Systems. Grounded in practical C, Python, and modern software paradigms.
              </p>
            </motion.div>

            {/* Narrative Paragraphs */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 font-body text-sm sm:text-base text-[#A1A1A1] leading-relaxed"
            >
              {personalInfo.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Four Rectangular Strategic Pillars (Sequential Upward Stagger) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.15 + idx * 0.08,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="p-5 border border-[#292929] bg-[#141414] hover:border-[#C1121F] transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-[#C1121F]">
                        {pillar.num}
                      </span>
                      <IconComponent className="w-4 h-4 text-[#888888] group-hover:text-[#C1121F] transition-colors" />
                    </div>
                    <h4 className="font-title font-bold text-sm text-[#F5F5F5] uppercase tracking-wider mb-2">
                      {pillar.title}
                    </h4>
                    <p className="font-body text-xs text-[#888888] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Actions */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center gap-4"
            >
              <a
                href={personalInfo.resumeUrl}
                className="btn-noir-primary interactive-target"
              >
                <FileText className="w-4 h-4 mr-2" />
                DOWNLOAD DOSSIER / CV
              </a>
              <a
                href="#contact"
                className="btn-noir-secondary interactive-target"
              >
                DIRECT COLLABORATION
                <ExternalLink className="w-4 h-4 ml-1 text-[#C1121F]" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
