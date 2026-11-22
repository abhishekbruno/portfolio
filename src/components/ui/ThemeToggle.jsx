import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      type="button"
      className="relative p-2.5 rounded-none border border-[#292929] bg-[#111111] text-[#A1A1A1] hover:text-[#C1121F] hover:border-[#C1121F] transition-all duration-200 focus:outline-none focus:border-[#C1121F] interactive-target"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-[#F5F5F5] hover:text-[#C1121F] transition-colors" />
        ) : (
          <Moon className="w-4 h-4 text-[#0d0d0d] hover:text-[#C1121F] transition-colors" />
        )}
      </div>
    </button>
  );
}
