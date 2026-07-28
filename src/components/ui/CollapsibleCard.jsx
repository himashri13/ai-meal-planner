import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function CollapsibleCard({ title, icon: Icon, children, defaultOpen = false, isComplete = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-4 transition-all duration-300 hover:border-wellness-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 focus:outline-none focus:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl transition-colors ${isComplete ? 'bg-wellness-100 text-wellness-600' : 'bg-slate-100 text-slate-500'}`}>
            <Icon size={20} />
          </div>
          <h3 className={`font-semibold ${isComplete ? 'text-slate-800' : 'text-slate-600'}`}>{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          {isComplete && <span className="text-xs font-medium text-wellness-600 bg-wellness-50 px-2 py-1 rounded-full">Completed</span>}
          {isOpen ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
        </div>
      </button>
      
      {isOpen && (
        <div className="p-4 border-t border-slate-100 animate-in slide-in-from-top-2 fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
