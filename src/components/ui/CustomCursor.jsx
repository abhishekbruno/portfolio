import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(pointer: fine)').matches;
  });

  useEffect(() => {
    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-target')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice]);

  // Smooth lerp for trailing ring
  useEffect(() => {
    if (isTouchDevice) return;

    let animId;
    const lerp = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.22,
        y: prev.y + (position.y - prev.y) * 0.22
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);

    return () => cancelAnimationFrame(animId);
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-none bg-[#C1121F] transition-opacity duration-200"
        style={{
          width: '4px',
          height: '4px',
          transform: `translate3d(${position.x - 2}px, ${position.y - 2}px, 0)`,
          opacity: isVisible ? 1 : 0
        }}
      />
      {/* Neo-Noir Reticle Halo */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-40 rounded-none border transition-all duration-150 ease-out ${
          isHovering
            ? 'w-9 h-9 border-[#C1121F] bg-[#C1121F]/10 scale-125 shadow-[0_0_12px_rgba(193,18,31,0.5)]'
            : 'w-6 h-6 border-[#C1121F]/40 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x - (isHovering ? 18 : 12)}px, ${
            trailingPos.y - (isHovering ? 18 : 12)
          }px, 0)`,
          opacity: isVisible ? 1 : 0
        }}
      />
    </>
  );
}
