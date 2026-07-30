import React from 'react';
import { Check, Circle } from 'lucide-react';

export default function GroceryItem({ item, onToggle }) {
  const { name, quantity, unit, estimatedPrice, checked } = item;

  return (
    <div 
      onClick={onToggle}
      className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
        checked 
          ? 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-100 hover:bg-slate-100' 
          : 'bg-white border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5'
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
