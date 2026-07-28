import React from 'react';

export default function ActionCard({ label, icon: Icon, colorClass, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-wellness-100"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${colorClass}`}>
        <Icon size={24} className="text-white" />
      </div>
      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{label}</span>
    </button>
  );
}
