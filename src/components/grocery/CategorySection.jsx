import React from 'react';
import GroceryItem from './GroceryItem';

export default function CategorySection({ category, items, onToggleItem }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
        {category}
        <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
          {items.length}
        </span>
      </h2>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <GroceryItem 
            key={item.id} 
            item={item} 
            onToggle={() => onToggleItem(item.id)} 
          />
        ))}
      </div>
    </div>
  );
}
