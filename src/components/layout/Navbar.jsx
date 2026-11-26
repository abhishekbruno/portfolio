import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks, personalInfo } from '../../data/portfolio';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar({ activeSection, isDark, onToggleTheme, isHidden = false }) {
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > 30 : false
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let prevScrolled = window.scrollY > 30;
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 30;
      if (nextScrolled !== prevScrolled) {
        prevScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isHidden ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'
      } ${
        scrolled
          ? 'py-3.5 bg-[#080808]/95 light:bg-[#f4f4f4]/95 backdrop-blur-md border-b border-[#292929] shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monolith Brand Mark */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group interactive-target focus:outline-none focus:ring-1 focus:ring-[#C1121F]"
          >
            <div className="w-7 h-7 bg-[#C1121F] flex items-center justify-center font-title font-bold text-sm text-white shadow-[0_0_15px_rgba(193,18,31,0.5)] group-hover:scale-105 transition-transform">
              AB
            </div>
            <div className="flex flex-col">
              <span className="font-title font-bold text-sm tracking-[0.2em] text-[#F5F5F5] light:text-[#0d0d0d] uppercase group-hover:text-[#C1121F] transition-colors">
                {personalInfo.name}
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#A1A1A1] uppercase">
                SYSTEM ARCHITECT
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 font-title text-xs uppercase tracking-[0.22em] transition-all duration-200 interactive-target ${
                    isActive
                      ? 'text-[#F5F5F5] font-semibold'
                      : 'text-[#888888] hover:text-[#F5F5F5]'
                  }`}
                >
                  {link.name}
                  {isActive ? (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C1121F] shadow-[0_0_8px_#C1121F]" />
                  ) : null}
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Theme Toggle & Sharp CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 font-title text-xs font-semibold uppercase tracking-[0.15em] border border-[#292929] bg-[#111111] hover:border-[#C1121F] hover:text-white text-[#D1D1D1] transition-all duration-200 interactive-target"
            >
              TRANSMIT
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C1121F]" />
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-none border border-[#292929] bg-[#111111] text-[#F5F5F5] hover:border-[#C1121F] focus:outline-none focus:border-[#C1121F] interactive-target"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Cinematic Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-[#080808]/98 backdrop-blur-2xl border-t border-[#292929] p-6 flex flex-col justify-between animate-fade-in z-50">
          <nav className="flex flex-col gap-4 mt-6">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between py-3 border-b border-[#292929] font-title text-lg tracking-[0.2em] uppercase transition-colors ${
                    isActive ? 'text-[#C1121F] font-bold' : 'text-[#A1A1A1] hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="text-xs text-[#C1121F]">● ACTIVE</span>}
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="w-full text-center py-3.5 bg-[#C1121F] text-white font-title text-sm tracking-[0.2em] uppercase font-bold shadow-[0_0_20px_rgba(193,18,31,0.4)]"
          >
            TRANSMIT MESSAGE
          </a>
        </div>
      )}
    </header>
  );
}
