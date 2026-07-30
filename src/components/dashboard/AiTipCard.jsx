import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function AiTipCard({ tip }) {
  return (
    <div className="bg-gradient-to-br from-wellness-50 to-white border border-wellness-100 rounded-2xl p-6 shadow-sm relative overflow-hidden h-full flex flex-col justify-center">
      <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
        <Lightbulb size={120} />
      </div>
      <div className="flex items-start gap-3 relative z-content">
        <div className="w-10 h-10 rounded-xl bg-wellness-100 flex items-center justify-center flex-shrink-0 text-wellness-600">
          <Lightbulb size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">Today's AI Tip</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {tip || "Drink an extra glass of water before meals to help with digestion and hydration!"}
          </p>
        </div>
      </div>
    </div>
  );
}
