import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function GroceryHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-emerald-100 rounded-xl">
          <ShoppingCart className="text-emerald-600" size={24} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Smart Grocery List</h1>
      </div>
      <p className="text-slate-500 text-lg max-w-2xl">
        Your tailored shopping list, automatically scaled to your household size.
      </p>
    </div>
  );
}
