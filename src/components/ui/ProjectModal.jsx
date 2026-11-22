import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Github } from './Icons';
import TechBadge from './TechBadge';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-[#292929] bg-[#0f0f11] p-6 sm:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Crimson Laser Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C1121F] shadow-[0_0_12px_#C1121F]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 border border-[#292929] bg-[#171717] text-[#A1A1A1] hover:text-[#C1121F] hover:border-[#C1121F] transition-colors focus:outline-none focus:border-[#C1121F]"
          aria-label="Close project dossier"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Status */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-xs font-semibold text-[#C1121F] tracking-widest uppercase">
            // {project.category}
          </span>
          <span className="w-6 h-[1px] bg-[#292929]" />
          {project.status && (
            <span className="font-mono text-xs text-[#888888] tracking-widest uppercase">
              STATUS: {project.status}
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3
          id="modal-title"
          className="font-title text-2xl sm:text-4xl font-bold uppercase tracking-wider text-[#F5F5F5]"
        >
          {project.title}
        </h3>
        <p className="mt-2 font-mono text-xs sm:text-sm text-[#A1A1A1] uppercase tracking-wide">
          {project.tagline || project.description}
        </p>

        {/* Thin Crimson Separator */}
        <div className="w-20 h-[2px] bg-[#C1121F] my-6" />

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} text={tech} />
          ))}
        </div>

        {/* Deep Dive Description */}
        <div className="space-y-4 font-body text-sm sm:text-base text-[#A1A1A1] leading-relaxed mb-6">
          <p>{project.longDescription || project.description}</p>
        </div>

        {/* Architectural Metadata Grid */}
        {project.stats && (
          <div className="p-4 border border-[#292929] bg-[#141414] grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {Object.entries(project.stats).map(([key, value]) => (
              <div key={key}>
                <span className="block font-mono text-[10px] text-[#666666] uppercase tracking-widest">
                  {key}
                </span>
                <span className="block font-title text-sm font-bold text-[#F5F5F5] uppercase tracking-wider mt-0.5">
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-[#292929]">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-noir-secondary interactive-target"
            >
              <Github className="w-4 h-4 mr-1 text-[#C1121F]" />
              VIEW REPOSITORY
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-noir-primary interactive-target"
            >
              LIVE DEPLOYMENT
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          )}
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 font-title text-xs uppercase tracking-widest text-[#888888] hover:text-white transition-colors"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
}
