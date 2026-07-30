import React, { useMemo } from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';

const AiInsightsCard = ({ summary, meals }) => {
  // Simple heuristic logic to generate mock AI insights based on the plan
  const insights = useMemo(() => {
    const result = [];

    if (summary.protein < 50) {
      result.push({ type: 'warning', text: 'Protein is slightly low today. Consider adding roasted chana or a protein shake as a snack.' });
    } else {
      result.push({ type: 'success', text: 'Great job! This plan hits your high-protein target.' });
    }

    if (summary.fiber < 25) {
      result.push({ type: 'warning', text: 'Fiber is a bit low. Swap white rice for brown rice in your lunch.' });
    }

    const hasHighCalorieMeal = meals.some(m => m.calories > 600);
    if (hasHighCalorieMeal) {
      result.push({ type: 'info', text: 'You have a heavy meal planned. Make sure to stay hydrated and active around that time.' });
    } else {
      result.push({ type: 'success', text: 'Your calories are beautifully distributed throughout the day to prevent energy crashes.' });
    }
    
    return result;
  }, [summary, meals]);

  return (
    <div className="bg-wellness-50 rounded-2xl p-6 border border-wellness-200">
      <h3 className="text-wellness-900 font-semibold flex items-center gap-2 mb-4">
        <Sparkles className="text-wellness-600" size={18} /> AI Coach Insights
      </h3>
      <ul className="space-y-3">
        {insights.map((insight, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm">
            {insight.type === 'warning' ? (
              <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={16} />
            ) : insight.type === 'success' ? (
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-[10px] font-bold">✓</span>
              </div>
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-wellness-400 flex-shrink-0 mt-1.5" />
            )}
            <span className={insight.type === 'warning' ? 'text-amber-900' : 'text-slate-700'}>
              {insight.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(AiInsightsCard);
