import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  Info,
  ArrowUpRight
} from 'lucide-react';
import { Github } from '../components/ui/Icons';
import { featuredProjects, additionalRepositories } from '../data/portfolio';
import SectionHeader from '../components/ui/SectionHeader';
import TechBadge from '../components/ui/TechBadge';
import ProjectModal from '../components/ui/ProjectModal';
import ChapterTransition from '../components/layout/ChapterTransition';

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  const categories = ['All', 'AI & Systems', 'Web & Automation', 'Web & 3D', 'Hardware & Systems'];

  const filteredProjects =
    selectedCategory === 'All'
      ? featuredProjects
      : featuredProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 md:py-32 relative border-b border-[#292929] overflow-hidden">
      {/* Chapter Transition Laser & Ambient Lighting */}
      <ChapterTransition />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          chapter="004"
          category="SELECTED WORKS"
          title="ENGINEERED SYSTEMS & REPOSITORIES"
          subtitle="Production architectures, Model Context Protocol (MCP) integrations, game engine automation, and reproducible docking pipelines."
        />

        {/* Category Filters in Neo-Noir Style */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-1.5 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`px-4 py-2 font-title text-xs uppercase tracking-[0.16em] border transition-all duration-200 interactive-target ${
                selectedCategory === cat
                  ? 'border-[#C1121F] bg-[#C1121F] text-white font-bold'
                  : 'border-[#292929] bg-[#111111] text-[#A1A1A1] hover:border-[#C1121F] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Primary Project Cards Grid (Sequential Upward Reveal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const chapterNum = String(idx + 1).padStart(2, '0');

            return (
              <motion.div
                key={project.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="group relative border border-[#292929] bg-[#141414] hover:border-[#C1121F] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(193,18,31,0.12)]"
              >
                {/* Top Crimson Laser Accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#C1121F] transition-colors duration-300" />

                {/* Card Top Metadata */}
                <div className="p-6 border-b border-[#222222] bg-[#0f0f11]">
                  <div className="flex items-center justify-between mb-3 font-mono text-[10px] uppercase tracking-widest">
                    <span className="text-[#C1121F] font-bold">
                      CHAPTER {chapterNum}
                    </span>
                    <span className="text-[#888888]">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-title text-2xl font-bold uppercase tracking-wider text-[#F5F5F5] group-hover:text-white transition-colors">
                    {project.title}
                  </h3>

                  {project.status && (
                    <div className="mt-2 font-mono text-[10px] text-[#A1A1A1] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#C1121F]" />
                      <span>{project.status}</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <p className="font-body text-xs sm:text-sm text-[#A1A1A1] line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Rectangular Tech Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <TechBadge key={tech} text={tech} />
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="font-mono text-[10px] text-[#666666] uppercase self-center ml-1">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 border-t border-[#222222] flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      type="button"
                      className="font-title text-xs uppercase tracking-widest text-[#F5F5F5] hover:text-[#C1121F] flex items-center gap-1 font-semibold transition-colors interactive-target"
                    >
                      DOSSIER
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C1121F]" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-[#292929] bg-[#111111] hover:border-[#C1121F] hover:text-[#C1121F] text-[#A1A1A1] transition-all interactive-target"
                          aria-label={`View ${project.title} on GitHub`}
                          title="View Repository"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#C1121F] bg-[#C1121F]/10 hover:bg-[#C1121F] text-[#F5F5F5] hover:text-white font-title text-xs uppercase tracking-wider font-semibold transition-all interactive-target"
                          title="Live Deployment"
                        >
                          <ExternalLink className="w-3 h-3" />
                          DEMO
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expandable "More Repositories" Drawer Button */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-center"
        >
          <button
            onClick={() => setShowMoreProjects(!showMoreProjects)}
            type="button"
            className="btn-noir-secondary interactive-target inline-flex items-center gap-2"
          >
            <FolderGit2 className="w-4 h-4 text-[#C1121F]" />
            <span>
              {showMoreProjects ? 'COLLAPSE ARCHIVE' : 'EXPAND ADDITIONAL REPOSITORIES'}
            </span>
            {showMoreProjects ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </motion.div>

        {/* Additional Repositories Grid */}
        {showMoreProjects && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            {additionalRepositories.map((repo, idx) => (
              <motion.div
                key={repo.name}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="p-5 border border-[#292929] bg-[#111111] hover:border-[#C1121F] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-title text-sm font-bold uppercase tracking-wider text-[#F5F5F5]">
                      {repo.title}
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 border border-[#292929] text-[#888888] uppercase">
                      {repo.language}
                    </span>
                  </div>
                  <p className="font-body text-xs text-[#888888] leading-relaxed mb-3">
                    {repo.description}
                  </p>
                  {repo.attribution && (
                    <div className="p-2 border border-[#292929] bg-[#141414] font-mono text-[10px] text-[#A1A1A1] uppercase mb-3 flex items-start gap-1.5">
                      <Info className="w-3 h-3 text-[#C1121F] shrink-0 mt-0.5" />
                      <span>{repo.attribution}</span>
                    </div>
                  )}
                  {repo.note && (
                    <div className="p-2 border border-[#292929] bg-[#141414] font-mono text-[10px] text-[#A1A1A1] uppercase mb-3">
                      {repo.note}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#222222] flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[#666666] uppercase">
                    {repo.status}
                  </span>
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-title text-xs uppercase tracking-wider text-[#C1121F] hover:text-white flex items-center gap-1 interactive-target"
                  >
                    <Github className="w-3.5 h-3.5" />
                    SOURCE
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal Component */}
        <ProjectModal
          project={activeModalProject}
          isOpen={!!activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
}
