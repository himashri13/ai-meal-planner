import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MealCard({ id, mealName, calories, description, icon: Icon, time }) {
  return (
    <Link 
      to={`/meal/${id}`}
      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-wellness-200 transition-all duration-200 cursor-pointer group flex items-center justify-between block"
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-wellness-50 text-wellness-600 flex items-center justify-center group-hover:bg-wellness-100 transition-colors">
            <Icon size={24} />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-800">{mealName}</h3>
            {time && <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{time}</span>}
          </div>
          <p className="text-sm text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-medium text-wellness-700">{calories} kcal</span>
        <ChevronRight size={16} className="text-slate-300 group-hover:text-wellness-500 transition-colors mt-1" />
      </div>
    </Link>
  );
}
