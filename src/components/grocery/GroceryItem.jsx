import React from 'react';
import { Check, CheckCircle2, Circle } from 'lucide-react';
import Button from '../ui/Button';

export default function GroceryItem({ item, onTogglePurchase, onToggleAlreadyHave }) {
  const isDone = item.purchased || item.alreadyHave;

  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
        isDone ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 hover:border-wellness-200 shadow-sm'
      }`}
    >
      <div 
        className="flex items-center gap-3 cursor-pointer flex-grow"
        onClick={() => onTogglePurchase(item.id)}
      >
        <button 
          className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-wellness-500 rounded-full"
        >
          {item.purchased ? (
            <CheckCircle2 size={24} className="text-wellness-500" />
          ) : (
            <Circle size={24} className="text-slate-300 hover:text-wellness-300 transition-colors" />
          )}
        </button>
        <span className={`font-medium transition-colors ${isDone ? 'line-through text-slate-400' : 'text-slate-700'}`}>
          {item.scaledText}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onToggleAlreadyHave(item.id)}
          className={`h-8 px-3 text-xs border ${
            item.alreadyHave 
              ? 'bg-slate-200 text-slate-700 border-slate-200' 
              : 'text-slate-500 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {item.alreadyHave ? 'Have it' : 'Already Have'}
        </Button>
      </div>
    </div>
  );
}
