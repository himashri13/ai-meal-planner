import React from 'react';

const SkeletonMealCard = () => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 animate-pulse">
      
      {/* Left: Image Placeholder */}
      <div className="w-full sm:w-1/3 flex-shrink-0">
        <div className="h-40 sm:h-full sm:min-h-[160px] rounded-xl bg-slate-200" />
      </div>

      {/* Right: Details Placeholder */}
      <div className="w-full sm:w-2/3 flex flex-col justify-between py-1">
        <div>
          {/* Title and Badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="h-6 bg-slate-200 rounded-md w-3/4" />
            <div className="h-6 bg-slate-200 rounded-full w-16" />
          </div>
          
          {/* Stats row */}
          <div className="flex gap-3 mb-4">
            <div className="h-4 bg-slate-200 rounded w-16" />
            <div className="h-4 bg-slate-200 rounded w-16" />
            <div className="h-4 bg-slate-200 rounded w-16" />
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            <div className="h-5 bg-slate-200 rounded w-12" />
            <div className="h-5 bg-slate-200 rounded w-14" />
          </div>

          {/* AI Reasoning Box */}
          <div className="h-20 bg-wellness-50 rounded-xl w-full mb-4" />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between border-t border-slate-50 pt-3">
          <div className="h-4 bg-slate-200 rounded w-24" />
          <div className="flex gap-2">
            <div className="h-8 bg-slate-200 rounded-lg w-8" />
            <div className="h-8 bg-slate-200 rounded-lg w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SkeletonMealCard);
