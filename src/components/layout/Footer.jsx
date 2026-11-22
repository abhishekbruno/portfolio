import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { Github, Linkedin, Twitter } from '../ui/Icons';
import { personalInfo, navLinks } from '../../data/portfolio';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative border-t border-[#292929] bg-[#080808] text-[#F5F5F5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Identity Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[#C1121F] flex items-center justify-center font-title font-bold text-sm text-white shadow-[0_0_12px_rgba(193,18,31,0.5)]">
                AB
              </div>
              <span className="font-title font-bold text-lg tracking-[0.2em] text-[#F5F5F5] uppercase">
                {personalInfo.name}
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#888888] max-w-md leading-relaxed">
              Computer Science Engineering student crafting intelligent software systems,
              AI agents, developer tooling, and modern digital interfaces.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-[#292929] bg-[#111111] hover:border-[#C1121F] hover:text-[#C1121F] text-[#A1A1A1] transition-all interactive-target"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-[#292929] bg-[#111111] hover:border-[#C1121F] hover:text-[#C1121F] text-[#A1A1A1] transition-all interactive-target"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-[#292929] bg-[#111111] hover:border-[#C1121F] hover:text-[#C1121F] text-[#A1A1A1] transition-all interactive-target"
                aria-label="X Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 border border-[#292929] bg-[#111111] hover:border-[#C1121F] hover:text-[#C1121F] text-[#A1A1A1] transition-all interactive-target"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4 className="font-title text-xs uppercase tracking-[0.2em] text-[#C1121F] mb-4 font-bold">
              REGISTRY INDEX
            </h4>
            <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#888888] hover:text-[#C1121F] transition-colors interactive-target"
                  >
                    // {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* System Telemetry & Back to Top */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-title text-xs uppercase tracking-[0.2em] text-[#C1121F] mb-4 font-bold">
                SYSTEM SPEC
              </h4>
              <p className="font-mono text-xs text-[#888888] leading-relaxed uppercase">
                STACK // REACT 19 • THREE.JS • TAILWIND V4 • ZERO BLOAT
              </p>
            </div>

            <button
              onClick={scrollToTop}
              type="button"
              className="mt-6 btn-noir-secondary interactive-target inline-flex items-center justify-between"
              aria-label="Back to top"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-4 h-4 text-[#C1121F]" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#666666] uppercase tracking-widest">
          <p>
            © {CURRENT_YEAR} {personalInfo.name}. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[#C1121F]">
            DESIGNED WITH NEO-NOIR CINEMATIC RIGOR
          </p>
        </div>
      </div>
    </footer>
  );
}
