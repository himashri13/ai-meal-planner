import React from 'react';

export default function ProgressCard({ title, current, target, unit, colorClass, icon: Icon }) {
  const percentage = Math.min(Math.round((current / target) * 100), 100);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
          <Icon size={20} className={colorClass.replace('bg-', 'text-')} />
        </div>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
      </div>
      
      <div>
        <div className="flex items-end gap-1 mb-2">
          <span className="text-2xl font-bold text-slate-800">{current}</span>
          <span className="text-sm text-slate-500 mb-1">/ {target} {unit}</span>
        </div>
        
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${colorClass.replace('bg-', 'bg-').replace('text-', 'bg-')} transition-all duration-500 ease-out`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
