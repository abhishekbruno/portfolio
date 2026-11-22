import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Star,
  GitFork,
  Calendar,
  ExternalLink,
  Code2,
  Search
} from 'lucide-react';
import { Github } from '../components/ui/Icons';
import { useGithubData } from '../hooks/useGithubData';
import SectionHeader from '../components/ui/SectionHeader';
import ChapterTransition from '../components/layout/ChapterTransition';

export default function GithubSection() {
  const shouldReduceMotion = useReducedMotion();
  const { repos, loading, isLive, stats } = useGithubData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');

  const languages = ['All', ...Object.keys(stats.languages || {})];

  const filteredRepos = repos.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLang =
      selectedLang === 'All' || (r.language || 'Other') === selectedLang;
    return matchesSearch && matchesLang;
  });

  const formatDate = (isoString) => {
    if (!isoString) return 'RECENT';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).toUpperCase();
    } catch {
      return 'RECENT';
    }
  };

  return (
    <section id="github" className="py-24 md:py-32 relative border-b border-[#292929] overflow-hidden">
      {/* Chapter Transition Laser & Ambient Lighting */}
      <ChapterTransition />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          chapter="005"
          category="VERSION CONTROL TELEMETRY"
          title="GITHUB REPOSITORY ARCHIVES"
          subtitle="Real-time public repository telemetry synchronized via the GitHub REST API, backed by verified static cache fallbacks."
        />

        {/* Live Sync Status Banner */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-10 p-4 border border-[#292929] bg-[#111111] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#C1121F] shadow-[0_0_8px_#C1121F]" />
            <span className="font-mono text-xs text-[#D1D1D1] uppercase tracking-wider">
              {isLive ? 'GITHUB TELEMETRY // SYNCHRONIZED LIVE' : 'GITHUB DATA // VERIFIED FALLBACK CACHE'}
            </span>
          </div>

          <a
            href="https://github.com/abhishekbruno"
            target="_blank"
            rel="noopener noreferrer"
            className="font-title text-xs uppercase tracking-widest text-[#C1121F] hover:text-white flex items-center gap-1.5 interactive-target"
          >
            GITHUB.COM/ABHISHEKBRUNO
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Statistics Cards Grid (Sequential Reveal) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { value: stats.totalRepos, label: 'PUBLIC REPOSITORIES', color: 'text-[#F5F5F5]' },
            { value: stats.stars, label: 'TOTAL STARS', color: 'text-[#C1121F]' },
            { value: stats.forks, label: 'FORKS & COPIES', color: 'text-[#F5F5F5]' },
            { value: 'PYTHON / JS', label: 'PRIMARY CODEBASE', color: 'text-[#D1D1D1]', isSmall: true }
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="p-5 border border-[#292929] bg-[#141414]"
            >
              <span
                className={`block font-title font-bold ${
                  item.isSmall ? 'text-2xl sm:text-3xl mt-1' : 'text-3xl sm:text-4xl'
                } ${item.color}`}
              >
                {item.value}
              </span>
              <span className="block font-mono text-[10px] text-[#888888] uppercase tracking-widest mt-1">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Language Filter & Search Bar */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8"
        >
          <div className="flex flex-wrap items-center gap-1">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                type="button"
                className={`px-3 py-1.5 font-title text-xs uppercase tracking-wider border transition-all ${
                  selectedLang === lang
                    ? 'border-[#C1121F] bg-[#C1121F] text-white font-bold'
                    : 'border-[#292929] bg-[#111111] text-[#A1A1A1] hover:border-[#C1121F] hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
            <input
              type="text"
              placeholder="SEARCH REPOSITORIES..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 font-mono text-xs uppercase bg-[#111111] border border-[#292929] text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#C1121F]"
            />
          </div>
        </motion.div>

        {/* Repositories Cards Grid (Sequential Reveal) */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-44 border border-[#292929] bg-[#141414] animate-pulse p-6"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo, idx) => (
              <motion.div
                key={repo.name}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="border border-[#292929] bg-[#141414] p-6 flex flex-col justify-between hover:border-[#C1121F] transition-all duration-200 group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[#C1121F]" />
                      <h3 className="font-title font-bold text-sm text-[#F5F5F5] uppercase tracking-wider truncate max-w-[190px]">
                        {repo.name}
                      </h3>
                    </div>
                    {repo.language && (
                      <span className="font-mono text-[9px] px-2 py-0.5 border border-[#292929] bg-[#0d0d10] text-[#A1A1A1] uppercase">
                        {repo.language}
                      </span>
                    )}
                  </div>

                  <p className="font-body text-xs text-[#888888] line-clamp-3 leading-relaxed mb-6">
                    {repo.description || 'System software, integration protocols, and algorithmic pipelines.'}
                  </p>
                </div>

                <div>
                  {/* Repo Metrics & Last Updated */}
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#666666] pt-4 border-t border-[#222222] mb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#C1121F]" />
                        {repo.stargazers_count ?? 0}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-[#A1A1A1]" />
                        {repo.forks_count ?? 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#666666]" />
                      <span>{formatDate(repo.updated_at)}</span>
                    </div>
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 border border-[#292929] bg-[#111111] group-hover:border-[#C1121F] group-hover:text-white font-title text-xs uppercase tracking-widest text-[#A1A1A1] transition-all interactive-target"
                  >
                    <Github className="w-3.5 h-3.5 text-[#C1121F]" />
                    INSPECT SOURCE
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* GitHub Terminal CTA Banner */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14 p-8 border border-[#292929] bg-[#111111] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h4 className="font-title font-bold text-xl uppercase tracking-wider text-[#F5F5F5]">
              ACCESS REPOSITORY REGISTRY ON GITHUB
            </h4>
            <p className="font-body text-xs sm:text-sm text-[#888888] mt-1 max-w-xl leading-relaxed">
              Inspect commit trees, open-source pull requests, architectural releases, and code implementations directly.
            </p>
          </div>
          <a
            href="https://github.com/abhishekbruno"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-noir-primary interactive-target shrink-0"
          >
            <Github className="w-4 h-4 mr-2" />
            VISIT @ABHISHEKBRUNO
          </a>
        </motion.div>
      </div>
    </section>
  );
}
