import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import GroceryItem from './GroceryItem';

export default function CategorySection({ category, items, onToggleItem }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-4 pb-2 border-b border-slate-100 group"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-slate-800">{category}</h2>
          <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full transition-colors group-hover:bg-slate-200">
            {items.length}
          </span>
        </div>
        <div className="text-slate-400 group-hover:text-emerald-500 transition-colors">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-in slide-in-from-top-2 fade-in duration-200">
          {items.map(item => (
            <GroceryItem 
              key={item.id} 
              item={item} 
              onToggle={() => onToggleItem(item.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
