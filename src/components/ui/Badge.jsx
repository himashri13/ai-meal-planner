import React from 'react';

const variants = {
  primary: 'bg-wellness-600 text-white shadow-sm',
  secondary: 'bg-slate-100 text-slate-600',
  outline: 'bg-wellness-50 text-wellness-600 border border-wellness-100',
  success: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500',
  glass: 'bg-white/20 backdrop-blur-md text-white'
};

export default function Badge({ 
  children, 
  variant = 'secondary', 
  className = '', 
  icon = null 
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap ${variants[variant]} ${className}`}>
      {icon}
      {children}
    </span>
  );
}
