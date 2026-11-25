import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/layout/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { RevealPhase } from './components/hero/revealPhases';

// Critical Above-The-Fold Hero Section
import Hero from './sections/Hero';

// Deferred Non-Critical Sections (Code-split to ensure 100% main thread availability during 3D transition)
const About = React.lazy(() => import('./sections/About'));
const Skills = React.lazy(() => import('./sections/Skills'));
const Projects = React.lazy(() => import('./sections/Projects'));
const GithubSection = React.lazy(() => import('./sections/GithubSection'));
const Experience = React.lazy(() => import('./sections/Experience'));
const Contact = React.lazy(() => import('./sections/Contact'));

function App() {
  const { toggleTheme, isDark } = useTheme();
  const [, setSceneReady] = useState(false);
  const [revealPhase, setRevealPhase] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return RevealPhase.HERO_INTERACTIVE;
    }
    return RevealPhase.INITIALIZING;
  });
  const [isSkipped, setIsSkipped] = useState(false);

  const markSceneReady = useCallback(() => setSceneReady(true), []);

  const handlePhaseChange = useCallback((phase) => {
    setRevealPhase(phase);
  }, []);

  const handleComplete = useCallback(() => {
    setRevealPhase(RevealPhase.HERO_INTERACTIVE);
  }, []);

  const handleSkip = useCallback(() => {
    setIsSkipped(true);
  }, []);

  // Lock scroll during 4.5s cinematic intro camera sequence
  useEffect(() => {
    if (revealPhase !== RevealPhase.HERO_INTERACTIVE) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [revealPhase]);

  // Restore hash navigation once intro finishes and restores scroll
  useEffect(() => {
    if (revealPhase === RevealPhase.HERO_INTERACTIVE && window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        window.requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'auto' });
        });
      }
    }
  }, [revealPhase]);

  const sectionIds = ['hero', 'about', 'skills', 'projects', 'github', 'experience', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 140);

  return (
    <div className="relative min-h-screen bg-[#080808] light:bg-[#f4f4f4] text-[#F5F5F5] light:text-[#0d0d0d] font-body transition-colors duration-300">
      {/* Neo-Noir Precision Crosshair Desktop Cursor */}
      <CustomCursor />

      {/* Top Crimson Laser Scroll Progress */}
      <ScrollProgress />

      {/* Sticky Top Minimalist Navigation (Slides down when Hero Interactive starts) */}
      <Navbar
        activeSection={activeSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        isHidden={revealPhase !== RevealPhase.HERO_INTERACTIVE}
      />

      {/* Main Content Sections — One Continuous Canvas in Hero */}
      <main className="relative z-10">
        <Hero
          onSceneReady={markSceneReady}
          revealPhase={revealPhase}
          onPhaseChange={handlePhaseChange}
          onLoaderComplete={handleComplete}
          isSkipped={isSkipped}
          onSkip={handleSkip}
        />
        <React.Suspense fallback={<div className="min-h-[200px] bg-[#080808]" />}>
          <About />
          <Skills />
          <Projects />
          <GithubSection />
          <Experience />
          <Contact />
        </React.Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
