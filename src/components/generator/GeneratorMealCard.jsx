import React from 'react';
import { Clock, Dumbbell, ChefHat, RefreshCw, Bookmark, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GeneratorMealCard({ meal, onReplace, isReplacing }) {
  // If the card is currently being replaced, show a loading shimmer overlay
  return (
    <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-wellness-300 transition-all duration-300 group overflow-hidden animate-in fade-in duration-500">
      
      {isReplacing && (
        <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-sm flex items-center justify-center">
          <RefreshCw className="animate-spin text-wellness-600" size={24} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-5 relative z-10">
        
        {/* Left: Image & Quick Stats */}
        <div className="w-full sm:w-1/3 flex-shrink-0">
          <div className="relative h-40 sm:h-full sm:min-h-[160px] rounded-xl overflow-hidden bg-slate-100">
            <img 
              src={meal.image} 
              alt={meal.mealName}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 text-transparent"
            />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded">
              {meal.time}
            </div>
            <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-2 py-1 rounded shadow-sm">
              {meal.calories} kcal
            </div>
          </div>
        </div>

        {/* Right: Details & Actions */}
        <div className="w-full sm:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold text-lg text-slate-800 leading-tight">{meal.mealName}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full whitespace-nowrap">
                  {meal.cuisine}
                </span>
                {meal.confidenceScore && (
                  <span className="text-xs font-bold bg-wellness-600 text-white px-2 py-1 rounded-full whitespace-nowrap flex items-center gap-1 shadow-sm">
                    <Sparkles size={12} /> {meal.confidenceScore}% Match
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-3">
              <span className="flex items-center gap-1"><Dumbbell size={14} className="text-blue-500"/> {meal.protein}g protein</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {meal.prepTime}</span>
              <span className="flex items-center gap-1"><ChefHat size={14} /> {meal.difficulty}</span>
            </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
              {meal.tags.map(tag => (
                <span key={tag} className="text-[10px] font-medium bg-wellness-50 text-wellness-700 px-2 py-0.5 rounded border border-wellness-100 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            {meal.aiReasoning && (
              <div className="bg-wellness-50/50 rounded-xl p-3 mb-4 border border-wellness-100 flex flex-col gap-2">
                {Array.isArray(meal.aiReasoning) ? (
                  meal.aiReasoning.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-wellness-200 text-wellness-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold">✓</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-tight font-medium">
                        {reason}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-2 items-start">
                    <Sparkles size={16} className="text-wellness-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {meal.aiReasoning}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-slate-50 pt-3">
            <Link 
              to={`/meal/${meal.id}`} 
              className="text-sm font-semibold text-wellness-600 hover:text-wellness-700 flex items-center gap-1 transition-colors"
            >
              View Details <ArrowRight size={14} />
            </Link>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert('Meal saved to favorites!')}
                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                title="Save Meal"
              >
                <Bookmark size={18} />
              </button>
              <button 
                onClick={() => onReplace(meal)}
                disabled={isReplacing}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
                title="Replace this meal"
              >
                <RefreshCw size={14} className={isReplacing ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Swap</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
