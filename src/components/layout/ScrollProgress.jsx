import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || typeof window === 'undefined') return;

    let maxScroll = 0;
    let rafId = 0;

    const recalcBounds = () => {
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    };

    const updateBar = () => {
      rafId = 0;
      if (maxScroll <= 0) recalcBounds();
      const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      bar.style.transform = `scaleX(${ratio.toFixed(4)})`;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(updateBar);
    };

    recalcBounds();
    updateBar();

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        recalcBounds();
        onScroll();
      });
      ro.observe(document.documentElement);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recalcBounds, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recalcBounds);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none bg-transparent">
      <div
        ref={barRef}
        className="w-full h-full bg-[#C1121F] shadow-[0_0_8px_#C1121F] origin-left will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
