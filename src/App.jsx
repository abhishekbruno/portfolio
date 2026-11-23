import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/layout/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CinematicLoader from './components/loader/CinematicLoader';

// Page Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import GithubSection from './sections/GithubSection';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

function App() {
  const { toggleTheme, isDark } = useTheme();
  const [sceneReady, setSceneReady] = useState(false);
  const [loaderMounted, setLoaderMounted] = useState(true);

  const markSceneReady = useCallback(() => setSceneReady(true), []);

  // Escape hatch for WebGL errors or GPUs that refuse to create a context.
  useEffect(() => {
    if (sceneReady) return;
    const timer = window.setTimeout(() => setSceneReady(true), 5000);
    return () => window.clearTimeout(timer);
  }, [sceneReady]);

  const handleLoaderFinish = useCallback(() => {
    setLoaderMounted(false);
  }, []);

  // Restore hash navigation once loader unmounts and restores scroll
  useEffect(() => {
    if (!loaderMounted && window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        window.requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'auto' });
        });
      }
    }
  }, [loaderMounted]);

  const sectionIds = ['hero', 'about', 'skills', 'projects', 'github', 'experience', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 140);

  return (
    <div className="relative min-h-screen bg-[#080808] light:bg-[#f4f4f4] text-[#F5F5F5] light:text-[#0d0d0d] font-body transition-colors duration-300">
      {/* "THE CONTRACT" — Neo-Noir Cinematic Loading Experience */}
      {loaderMounted && (
        <CinematicLoader
          isSceneReady={sceneReady}
          onFinish={handleLoaderFinish}
        />
      )}

      {/* Neo-Noir Precision Crosshair Desktop Cursor */}
      <CustomCursor />

      {/* Top Crimson Laser Scroll Progress */}
      <ScrollProgress />

      {/* Sticky Top Minimalist Navigation */}
      <Navbar
        activeSection={activeSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onSceneReady={markSceneReady} />
        <About />
        <Skills />
        <Projects />
        <GithubSection />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
