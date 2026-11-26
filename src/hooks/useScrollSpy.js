import { useState, useEffect, useRef } from 'react';

export function useScrollSpy(sectionIds, offset = 120) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'hero');
  const activeRef = useRef(sectionIds[0] || 'hero');

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionIds.length) return;

    let cachedOffsets = [];
    let rafId = 0;

    const measureSections = () => {
      cachedOffsets = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter(Boolean);
    };

    const evaluateActive = () => {
      rafId = 0;
      if (cachedOffsets.length !== sectionIds.length) {
        measureSections();
      }
      const scrollPosition = window.scrollY + offset;
      let nextSection = sectionIds[0];

      for (let i = cachedOffsets.length - 1; i >= 0; i--) {
        if (scrollPosition >= cachedOffsets[i].top) {
          nextSection = cachedOffsets[i].id;
          break;
        }
      }

      if (nextSection !== activeRef.current) {
        activeRef.current = nextSection;
        setActiveSection(nextSection);
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(evaluateActive);
    };

    measureSections();
    evaluateActive();

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        measureSections();
        evaluateActive();
      });
      ro.observe(document.body);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measureSections, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measureSections);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
