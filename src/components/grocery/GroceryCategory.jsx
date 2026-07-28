import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import GroceryItem from './GroceryItem';

export default function GroceryCategory({ category, items, onTogglePurchase, onToggleAlreadyHave }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (items.length === 0) return null;

  const purchasedCount = items.filter(i => i.purchased || i.alreadyHave).length;
  const isAllDone = purchasedCount === items.length;

  return (
    <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-200 group"
      >
        <div className="flex items-center gap-2 text-slate-800">
          <ShoppingBag size={18} className="text-wellness-500" />
          <h2 className="text-lg font-bold group-hover:text-wellness-600 transition-colors">
            {category}
          </h2>
          <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full ml-2">
            {purchasedCount}/{items.length}
          </span>
        </div>
        <div className="text-slate-400 group-hover:text-wellness-500 transition-colors">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {isExpanded && (
        <div className={`space-y-2 transition-opacity duration-300 ${isAllDone ? 'opacity-60' : 'opacity-100'}`}>
          {items.map(item => (
            <GroceryItem 
              key={item.id} 
              item={item} 
              onTogglePurchase={onTogglePurchase}
              onToggleAlreadyHave={onToggleAlreadyHave}
            />
          ))}
        </div>
      )}
    </div>
  );
}
