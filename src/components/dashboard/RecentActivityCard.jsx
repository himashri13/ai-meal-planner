import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function RecentActivityCard({ title, subtitle, icon: Icon, colorClass, onClick, stats, actionLabel }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group flex flex-col justify-between h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
            <Icon size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
            <p className="text-xs font-medium text-slate-500">{subtitle}</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
      </div>
      
      {stats && (
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-3">
          {stats}
        </div>
      )}
      
      <div className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
        {actionLabel} &rarr;
      </div>
    </div>
  );
}
