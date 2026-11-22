import React from 'react';

export default function TechBadge({ text, status, size = 'sm' }) {
  const getStatusIndicator = (s) => {
    switch (s) {
      case 'experienced':
        return 'text-[#C1121F]';
      case 'learning':
        return 'text-[#A1A1A1]';
      case 'exploring':
        return 'text-[#666666]';
      default:
        return 'text-[#444444]';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-none border border-[#292929] bg-[#111111] font-mono tracking-wider uppercase font-medium text-[#D1D1D1] transition-all duration-200 hover:border-[#C1121F] hover:text-white ${sizeClasses}`}
    >
      <span className={`text-[10px] ${getStatusIndicator(status)}`}>
        {status ? '■' : '·'}
      </span>
      {text}
    </span>
  );
}
