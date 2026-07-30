import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, Dumbbell, Clock, ArrowLeft, ArrowRight, RefreshCw, SearchX } from 'lucide-react';
import ResponsiveModal from '../ui/ResponsiveModal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import LoadingSpinner from '../ui/LoadingSpinner';
import { getMealAlternatives } from '../../api/mealApi';

const REASON_OPTIONS = [
  { id: 'dislike', label: "I don't like this meal", icon: '👎' },
  { id: 'missing_ingredients', label: "I don't have these ingredients", icon: '🛒' },
  { id: 'too_expensive', label: "Too expensive", icon: '💰' },
  { id: 'too_much_cooking', label: "Too much cooking", icon: '⏳' },
  { id: 'need_more_protein', label: "Need more protein", icon: '💪' },
  { id: 'want_fewer_calories', label: "Want fewer calories", icon: '🥗' },
  { id: 'different_cuisine', label: "Want a different cuisine", icon: '🌮' },
  { id: 'surprise_me', label: "Surprise me", icon: '✨' }
];

export default function ReplaceMealModal({ isOpen, onClose, currentMeal, onConfirm, userProfile, mealGenerationOptions }) {
  const [stage, setStage] = useState('reason'); // 'reason' | 'alternative'
  const [selectedReason, setSelectedReason] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recommendedMeal, setRecommendedMeal] = useState(null);
  
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStage('reason');
      setSelectedReason(null);
      setRecommendedMeal(null);
    }
  }, [isOpen, currentMeal]);

  if (!currentMeal) return null;

  const handleReasonSelect = async (reasonId) => {
    setSelectedReason(reasonId);
    setStage('alternative');
    setLoading(true);
    
    try {
      const alt = await getMealAlternatives(currentMeal.id, currentMeal.time, reasonId, userProfile, mealGenerationOptions);
      setRecommendedMeal(alt);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (recommendedMeal) {
      onConfirm(recommendedMeal);
      onClose();
    }
  };

  const renderReasonSelector = () => (
    <div className="p-4 sm:p-6 pb-12 h-full flex flex-col">
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-slate-800">Why are you replacing this meal?</h3>
        <p className="text-sm text-slate-500 mt-1">This helps us find the perfect alternative for you.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto w-full">
        {REASON_OPTIONS.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleReasonSelect(opt.id)}
            className="flex items-center gap-3 p-4 bg-white border-2 border-slate-100 rounded-xl hover:border-wellness-300 hover:bg-wellness-50 transition-all text-left shadow-sm hover:shadow group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">{opt.icon}</span>
            <span className="font-medium text-slate-700">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderAlternative = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-slate-500 h-full">
          <LoadingSpinner />
          <p className="font-medium mt-4">Finding the perfect alternative...</p>
        </div>
      );
    }

    if (!recommendedMeal) {
      return (
        <EmptyState 
          icon={SearchX} 
          title="No alternative found" 
          description="We couldn't find a meal that perfectly matches this criteria for this time slot. Try selecting a different reason." 
          action={<Button variant="outline" onClick={() => setStage('reason')}>Go Back</Button>} 
        />
      );
    }

    return (
      <div className="flex flex-col h-full bg-slate-50 relative">
        
        {/* Sticky Top: Back Button */}
        <div className="bg-white border-b border-slate-100 p-4 sm:px-6 py-3 flex-shrink-0 z-content sticky top-0 shadow-sm flex items-center justify-between">
          <button 
            onClick={() => setStage('reason')}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors font-medium"
          >
            <ArrowLeft size={16} /> Change Reason
          </button>
          <Badge variant="outline">
            AI Recommendation
          </Badge>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto hide-scrollbar pb-32">
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
            
            {/* 1. Side-by-Side Visual Comparison */}
            <div className="flex items-center justify-between gap-4 relative">
              {/* Old */}
              <div className="flex-1 bg-white rounded-2xl p-3 border border-slate-200 opacity-60 text-center grayscale">
                <img src={currentMeal.image} alt="old" className="w-full h-24 sm:h-32 object-cover rounded-xl mb-2" />
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Removing</div>
                <div className="text-sm font-semibold text-slate-600 line-clamp-1">{currentMeal.mealName}</div>
              </div>

              {/* Arrow Indicator */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md border border-slate-100 z-content">
                <ArrowRight size={24} className="text-wellness-500" />
              </div>

              {/* New */}
              <div className="flex-1 bg-white rounded-2xl p-3 border-2 border-wellness-400 shadow-md text-center ring-4 ring-wellness-50">
                <img src={recommendedMeal.image} alt="new" className="w-full h-24 sm:h-32 object-cover rounded-xl mb-2" />
                <div className="text-xs font-bold text-wellness-600 uppercase tracking-wider mb-1">Replacing With</div>
                <div className="text-sm font-bold text-slate-800 line-clamp-1">{recommendedMeal.mealName}</div>
              </div>
            </div>

            {/* 2. Macro Comparison */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Nutrition Comparison</h3>
              <div className="overflow-x-auto hide-scrollbar">
                <table className="w-full text-left text-sm border-collapse min-w-[250px]">
                  <thead>
                    <tr className="text-slate-400 text-xs font-medium border-b border-slate-100">
                      <th className="pb-2 font-normal w-1/4"></th>
                      <th className="pb-2 font-normal w-1/4">Current</th>
                      <th className="pb-2 font-normal w-1/4">New</th>
                      <th className="pb-2 font-normal w-1/4">Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2.5 text-slate-500 flex items-center gap-1.5"><Flame size={14}/> Calories</td>
                      <td className="py-2.5 font-medium">{currentMeal.calories}</td>
                      <td className="py-2.5 font-bold text-slate-800">{recommendedMeal.calories}</td>
                      <td className="py-2.5"><MacroDiff current={currentMeal.calories} new={recommendedMeal.calories} suffix="" /></td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-500 flex items-center gap-1.5"><Dumbbell size={14}/> Protein</td>
                      <td className="py-2 font-medium">{currentMeal.protein}g</td>
                      <td className="py-2 font-bold text-slate-800">{recommendedMeal.protein}g</td>
                      <td className="py-2"><MacroDiff current={currentMeal.protein} new={recommendedMeal.protein} suffix="g" inverted /></td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-500 flex items-center gap-1.5"><Clock size={14}/> Prep</td>
                      <td className="py-2 font-medium">{currentMeal.prepTime}</td>
                      <td className="py-2 font-bold text-slate-800">{recommendedMeal.prepTime}</td>
                      <td className="py-2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. AI Reasoning */}
            <div className="bg-gradient-to-r from-wellness-50 to-white rounded-2xl p-6 shadow-sm border border-wellness-200 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-wellness-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-wellness-600" size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-wellness-900 mb-1">Why this meal?</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {recommendedMeal.aiReasoning?.[0] || "This meal adheres perfectly to your dietary constraints while matching your updated preferences."}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Sticky Bottom Actions */}
        <div className="bg-white border-t border-slate-100 p-4 sm:p-6 flex-shrink-0 absolute bottom-0 left-0 right-0 z-nav shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between gap-4 max-w-2xl mx-auto">
            <button 
              onClick={() => handleReasonSelect(selectedReason)}
              className="flex items-center justify-center px-4 py-3 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors w-1/3"
            >
              <RefreshCw size={18} className="sm:mr-2" />
              <span className="hidden sm:inline">Try Another</span>
            </button>
            <Button onClick={handleConfirm} className="w-2/3 py-3 text-base">
              Confirm Replacement
            </Button>
          </div>
        </div>

      </div>
    );
  };

  return (
    <ResponsiveModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Replace ${currentMeal.time}`}
    >
      <div className="h-full relative overflow-hidden flex flex-col">
        {stage === 'reason' ? renderReasonSelector() : renderAlternative()}
      </div>
    </ResponsiveModal>
  );
}

// Helper to show visual diffs (e.g. +10g or -50)
function MacroDiff({ current, new: newVal, suffix, inverted = false }) {
  const diff = newVal - current;
  if (diff === 0) return <span className="text-slate-400 font-medium text-xs">No change</span>;
  
  const isPositive = diff > 0;
  
  // eslint-disable-next-line no-useless-assignment
  let colorClass = 'text-slate-500 bg-slate-100';
  if (isPositive) {
    colorClass = inverted ? 'text-green-700 bg-green-100' : 'text-orange-700 bg-orange-100';
  } else {
    colorClass = inverted ? 'text-orange-700 bg-orange-100' : 'text-green-700 bg-green-100';
  }

  return (
    <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${colorClass} inline-block min-w-[36px] text-center`}>
      {isPositive ? '+' : ''}{diff}{suffix}
    </span>
  );
}
