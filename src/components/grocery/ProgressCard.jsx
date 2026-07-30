import React from 'react';
import { Users, Minus, Plus } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

export default function ProgressCard({ progress, totalCost, servings, setServings }) {
  const { checkedCount, totalCount, percentage } = progress;

  const handleDecrease = () => setServings(prev => Math.max(1, prev - 1));
  const handleIncrease = () => setServings(prev => Math.min(10, prev + 1));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      
      {/* Progress Section */}
      <div className="flex-grow">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h3 className="text-slate-800 font-bold text-lg">Shopping Progress</h3>
            <p className="text-slate-500 text-sm">
              {checkedCount} of {totalCount} items collected
            </p>
          </div>
          <span className="text-emerald-600 font-bold text-lg">{percentage}%</span>
        </div>
        <ProgressBar 
          percentage={percentage} 
          colorClass="bg-gradient-to-r from-emerald-400 to-emerald-500"
          trackClass="bg-slate-100"
          sizeClass="h-3"
        />
      </div>

      <div className="w-px h-16 bg-slate-100 hidden lg:block" />

      {/* Household & Cost Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
        
        {/* Servings */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Household Size</label>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1">
            <button 
              onClick={handleDecrease}
              disabled={servings <= 1}
              className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-200/50 rounded-lg active:bg-slate-300/50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
            >
              <Minus size={18} />
            </button>
            <div className="flex items-center gap-2 font-bold text-slate-700 w-12 justify-center select-none">
              <Users size={16} className="text-emerald-500" />
              <span>{servings}</span>
            </div>
            <button 
              onClick={handleIncrease}
              disabled={servings >= 10}
              className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-200/50 rounded-lg active:bg-slate-300/50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Cost */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Estimated Total</label>
          <div className="text-3xl font-extrabold text-slate-800 flex items-baseline gap-1">
            <span className="text-emerald-500 text-xl">₹</span>
            {totalCost.toLocaleString('en-IN')}
          </div>
        </div>

      </div>

    </div>
  );
}
