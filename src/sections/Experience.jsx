import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Calendar,
  Building
} from 'lucide-react';
import { timelineData } from '../data/portfolio';
import SectionHeader from '../components/ui/SectionHeader';
import ChapterTransition from '../components/layout/ChapterTransition';

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-24 md:py-32 relative border-b border-[#292929] overflow-hidden">
      {/* Chapter Transition Laser & Ambient Lighting */}
      <ChapterTransition />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          chapter="006"
          category="CHRONOLOGY & RECORD"
          title="ACADEMIC & TECHNICAL MILESTONES"
          subtitle="Chronological record of university engineering coursework, open-source protocol development, and computational biochemistry pipelines."
        />

        <div className="relative max-w-4xl mx-auto mt-14">
          {/* Central Vertical Laser Guide (Grows Downward) */}
          <motion.div
            initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            style={{ originY: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[#C1121F] via-[#780000] to-[#292929]"
          />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 group`}
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-2 w-4 h-4 rounded-none border border-[#C1121F] bg-[#080808] flex items-center justify-center shadow-[0_0_8px_#C1121F] z-10 group-hover:scale-125 transition-transform">
                    <div className="w-1.5 h-1.5 bg-[#C1121F]" />
                  </div>

                  {/* Content Card */}
                  <div className="w-full sm:w-1/2 pl-10 sm:pl-0 sm:px-8">
                    <div className="p-6 border border-[#292929] bg-[#141414] hover:border-[#C1121F] transition-all duration-300 group-hover:-translate-y-1 shadow-lg hover:shadow-[0_0_25px_rgba(193,18,31,0.08)]">
                      {/* Period Badge & Category */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#C1121F] font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 font-mono text-[9px] border border-[#292929] bg-[#0f0f11] text-[#A1A1A1] uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Title & Organization */}
                      <h3 className="font-title text-xl font-bold uppercase tracking-wider text-[#F5F5F5]">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1.5 font-mono text-xs text-[#888888] mt-1 mb-4">
                        <Building className="w-3.5 h-3.5 text-[#C1121F]" />
                        <span>{item.organization}</span>
                      </div>

                      {/* Description */}
                      <p className="font-body text-xs sm:text-sm text-[#A1A1A1] leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Technical Contribution Highlights */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="space-y-2 pt-4 border-t border-[#222222]">
                          {item.highlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2.5 font-mono text-xs text-[#888888]"
                            >
                              <span className="text-[#C1121F] font-bold shrink-0 mt-0.5">›</span>
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
