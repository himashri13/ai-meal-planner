import React from 'react';

const MultiSelectPill = ({ label, selected, onClick, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-wellness-500 focus-visible:ring-offset-1
        ${selected 
          ? 'bg-wellness-600 text-white border-wellness-600 shadow-sm shadow-wellness-600/20' 
          : 'bg-white text-slate-600 border-slate-200 hover:border-wellness-300 hover:bg-wellness-50'
        } ${className}`}
    >
      {label}
    </button>
  );
}

export default React.memo(MultiSelectPill);
