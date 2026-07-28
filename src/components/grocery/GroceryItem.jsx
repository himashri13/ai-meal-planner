import React from 'react';
import { Check, Circle } from 'lucide-react';

export default function GroceryItem({ item, onToggle }) {
  const { name, quantity, unit, estimatedPrice, checked } = item;

  return (
    <div 
      onClick={onToggle}
      className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
        checked 
          ? 'bg-slate-50 border-slate-200 opacity-60' 
          : 'bg-white border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-emerald-300 hover:shadow-[0_4px_15px_rgba(16,185,129,0.08)] hover:-translate-y-0.5'
      }`}
    >
      <div className="flex items-center gap-4">
        <button className={`flex-shrink-0 transition-colors ${checked ? 'text-emerald-500' : 'text-slate-300 group-hover:text-emerald-400'}`}>
          {checked ? <Check size={24} strokeWidth={3} /> : <Circle size={24} />}
        </button>
        
        <div>
          <h4 className={`font-semibold text-[15px] ${checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
            {name}
          </h4>
          <p className="text-sm font-medium text-slate-500">
            {quantity} {unit}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className={`text-sm font-bold ${checked ? 'text-slate-400' : 'text-slate-700'}`}>
          ₹{estimatedPrice.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
}
