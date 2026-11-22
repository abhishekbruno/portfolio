import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Code,
  Layout,
  Cpu,
  Wrench,
  Shield,
  ArrowRight,
  Search
} from 'lucide-react';
import { skillsData } from '../data/portfolio';
import SectionHeader from '../components/ui/SectionHeader';
import TechBadge from '../components/ui/TechBadge';
import ChapterTransition from '../components/layout/ChapterTransition';

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryIcons = {
    programming: Code,
    frontend: Layout,
    'ai-automation': Cpu,
    tools: Wrench,
    exploration: Shield
  };

  const categoryNumbers = {
    programming: '01',
    frontend: '02',
    'ai-automation': '03',
    tools: '04',
    exploration: '05'
  };

  const allSkills = skillsData.categories.flatMap((cat) =>
    cat.skills.map((skill) => ({
      ...skill,
      categoryId: cat.id,
      categoryName: cat.name,
      catNumber: categoryNumbers[cat.id] || '00'
    }))
  );

  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.categoryId === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.highlight && skill.highlight.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 md:py-32 relative border-b border-[#292929] overflow-hidden">
      {/* Chapter Transition Laser & Ambient Lighting */}
      <ChapterTransition />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          chapter="003"
          category="TECHNICAL ARSENAL"
          title="SYSTEM CAPABILITIES & EXPERTISE"
          subtitle="Editorial breakdown of programming paradigms, agentic AI protocols, engineering tooling, and active computational disciplines."
        />

        {/* Legend / Status Protocol */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider text-[#A1A1A1]"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#C1121F]">■</span>
            <span>VERIFIED CAPABILITY (EXPERIENCED)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#A1A1A1]">■</span>
            <span>ACTIVE SYSTEM DEPLOYMENT (LEARNING)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#666666]">■</span>
            <span>EXPLORATORY RESEARCH</span>
          </div>
        </motion.div>

        {/* Category Filter Buttons & Search Input */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12"
        >
          {/* Sharp Rectangular Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setActiveCategory('all')}
              type="button"
              className={`px-4 py-2 font-title text-xs uppercase tracking-[0.15em] border transition-all duration-200 interactive-target ${
                activeCategory === 'all'
                  ? 'border-[#C1121F] bg-[#C1121F] text-white font-bold'
                  : 'border-[#292929] bg-[#111111] text-[#A1A1A1] hover:border-[#C1121F] hover:text-white'
              }`}
            >
              ALL PROTOCOLS
            </button>
            {skillsData.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                type="button"
                className={`px-4 py-2 font-title text-xs uppercase tracking-[0.15em] border transition-all duration-200 interactive-target ${
                  activeCategory === cat.id
                    ? 'border-[#C1121F] bg-[#C1121F] text-white font-bold'
                    : 'border-[#292929] bg-[#111111] text-[#A1A1A1] hover:border-[#C1121F] hover:text-white'
                }`}
              >
                {categoryNumbers[cat.id]} / {cat.name}
              </button>
            ))}
          </div>

          {/* Precision Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
            <input
              type="text"
              placeholder="SEARCH PROTOCOL OR TECH..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 font-mono text-xs uppercase bg-[#111111] border border-[#292929] text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#C1121F]"
            />
          </div>
        </motion.div>

        {/* Main Rectangular Editorial Panels Grid (Sequential Upward Reveal) */}
        {activeCategory === 'all' && !searchQuery ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.categories.map((category, idx) => {
              const Icon = categoryIcons[category.id] || Cpu;
              const num = categoryNumbers[category.id] || '01';

              return (
                <motion.div
                  key={category.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="p-8 border border-[#292929] bg-[#141414] hover:border-[#C1121F] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle Top Red Accent Stripe (Animates on hover) */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#C1121F] transition-colors duration-300" />

                  <div>
                    {/* Header Row: Number + Category */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#292929] mb-5">
                      <div className="font-mono text-xs font-bold text-[#C1121F] tracking-widest">
                        {num} / {category.name.toUpperCase()}
                      </div>
                      <Icon className="w-4 h-4 text-[#666666] group-hover:text-[#C1121F] transition-colors" />
                    </div>

                    {/* Headline & Description */}
                    <h3 className="font-title text-xl font-bold uppercase tracking-wider text-[#F5F5F5] group-hover:text-white transition-colors mb-2">
                      {category.name}
                    </h3>
                    <p className="font-body text-xs text-[#888888] leading-relaxed mb-6">
                      {category.description}
                    </p>

                    {/* Technical Badges Matrix */}
                    <div className="space-y-2">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center justify-between p-2.5 border border-[#222222] bg-[#0f0f0f] group-hover:border-[#2e2e2e] transition-colors"
                        >
                          <TechBadge text={skill.name} status={skill.status} />
                          {skill.highlight && (
                            <span className="font-mono text-[10px] text-[#666666] uppercase truncate max-w-[140px]">
                              {skill.highlight}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Arrow & Indicator */}
                  <div className="mt-8 pt-4 border-t border-[#222222] flex items-center justify-between font-mono text-[10px] text-[#666666] uppercase tracking-widest group-hover:text-[#C1121F] transition-colors">
                    <span>EXPLORE CAPABILITIES</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Filtered View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={`${skill.name}-${skill.categoryId}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(idx * 0.04, 0.4),
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="p-5 border border-[#292929] bg-[#141414] hover:border-[#C1121F] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-[#C1121F] uppercase tracking-widest">
                      {skill.catNumber} // {skill.categoryName}
                    </span>
                  </div>
                  <div className="mb-3">
                    <TechBadge text={skill.name} status={skill.status} size="md" />
                  </div>
                  {skill.highlight && (
                    <p className="font-mono text-xs text-[#888888] uppercase mt-2">
                      {skill.highlight}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
