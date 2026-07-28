import React from 'react';

export default function MultiSelectPill({ label, selected, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-wellness-200 focus:ring-offset-1
        ${selected 
          ? 'bg-wellness-600 text-white border-wellness-600 shadow-sm shadow-wellness-600/20' 
          : 'bg-white text-slate-600 border-slate-200 hover:border-wellness-300 hover:bg-wellness-50'
        } ${className}`}
    >
      {label}
    </button>
  );
}
