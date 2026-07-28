import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Flame, Dumbbell, Clock, ChefHat, Info, ArrowLeft, SearchX, X } from 'lucide-react';
import ResponsiveModal from '../ui/ResponsiveModal';
import Button from '../ui/Button';
import { getMealAlternatives } from '../../services/mockMealService';

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

export default function ReplaceMealModal({ isOpen, onClose, currentMeal, onConfirm }) {
  const [stage, setStage] = useState('reason'); // 'reason' | 'alternatives'
  const [selectedReason, setSelectedReason] = useState(null);
  
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);
  
  // Reset state when opened with a new meal
  useEffect(() => {
    if (isOpen) {
      setStage('reason');
      setSelectedReason(null);
      setAlternatives([]);
      setSelectedMealId(null);
    }
  }, [isOpen, currentMeal]);

  if (!currentMeal) return null;

  const handleReasonSelect = async (reasonId) => {
    setSelectedReason(reasonId);
    setStage('alternatives');
    setLoading(true);
    
    try {
      const alts = await getMealAlternatives(currentMeal.id, currentMeal.time, reasonId);
      setAlternatives(alts);
      setSelectedMealId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedMealId) return;
    const selectedMeal = alternatives.find(m => m.id === selectedMealId);
    if (selectedMeal) {
      onConfirm(selectedMeal);
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

  const renderAlternatives = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-slate-500 h-full">
          <div className="w-10 h-10 border-4 border-wellness-200 border-t-wellness-600 rounded-full animate-spin mb-4" />
          <p className="font-medium">Finding intelligent alternatives...</p>
        </div>
      );
    }

    if (alternatives.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-slate-500 h-full text-center px-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <SearchX size={32} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No alternatives found</h3>
          <p className="max-w-md mx-auto mb-6">We couldn't find any meals that perfectly match this criteria for this time slot. Try selecting a different reason.</p>
          <Button variant="outline" onClick={() => setStage('reason')}>Go Back</Button>
        </div>
      );
    }

    const selectedMeal = alternatives.find(m => m.id === selectedMealId);

    return (
      <div className="flex flex-col h-full bg-slate-50 relative">
        
        {/* Sticky Top Section: Current Meal & Back Button */}
        <div className="bg-white border-b border-slate-100 p-4 sm:p-6 flex-shrink-0 z-10 sticky top-0 shadow-sm">
          <button 
            onClick={() => setStage('reason')}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors font-medium mb-3"
          >
            <ArrowLeft size={16} /> Change Reason
          </button>
          
          <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-4 border border-slate-100">
            <img src={currentMeal.image} alt={currentMeal.mealName} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover" />
            <div className="flex-grow">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Current Selection</div>
              <div className="font-semibold text-slate-800 text-sm sm:text-base leading-tight">{currentMeal.mealName}</div>
              <div className="text-xs sm:text-sm text-slate-500 flex gap-3 mt-1">
                <span className="flex items-center gap-1"><Flame size={14} className="text-orange-400"/> {currentMeal.calories} kcal</span>
                <span className="flex items-center gap-1"><Dumbbell size={14} className="text-blue-400"/> {currentMeal.protein}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Alternatives List */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto hide-scrollbar">
          <div className="space-y-4 pb-32">
            {alternatives.map(alt => (
              <div 
                key={alt.id}
                onClick={() => setSelectedMealId(alt.id)}
                className={`bg-white rounded-2xl p-4 border-2 transition-all cursor-pointer ${
                  selectedMealId === alt.id ? 'border-wellness-500 shadow-md ring-4 ring-wellness-50' : 'border-slate-100 hover:border-wellness-300 shadow-sm'
                }`}
              >
                <div className="flex gap-4">
                  <img src={alt.image} alt={alt.mealName} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-800 leading-tight pr-4 text-sm sm:text-base">{alt.mealName}</h3>
                        {selectedMealId === alt.id && <CheckCircle2 className="text-wellness-500 flex-shrink-0" size={20} />}
                      </div>
                      <div className="text-xs font-medium text-slate-500 mt-1">{alt.cuisine}</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 mt-2">
                      <span className="flex items-center gap-1 font-semibold text-slate-700"><Flame size={12}/> {alt.calories} kcal</span>
                      <span className="flex items-center gap-1"><Dumbbell size={12}/> {alt.protein}g</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {alt.prepTime}</span>
                    </div>
                  </div>
                </div>
                
                {/* AI Reasoning (shown if selected) */}
                {selectedMealId === alt.id && alt.aiReplacementReasoning && (
                  <div className="mt-4 bg-wellness-50 p-3 rounded-xl border border-wellness-100 flex items-start gap-2 animate-in fade-in zoom-in-95 duration-200">
                    <Sparkles size={16} className="text-wellness-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-700 leading-snug">{alt.aiReplacementReasoning}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Bottom Comparison & Action Bar */}
        <div className="bg-white border-t border-slate-100 p-4 sm:p-6 flex-shrink-0 absolute bottom-0 left-0 right-0 z-20 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
          {selectedMeal ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              
              {/* Detailed 3-column Nutrition Comparison */}
              <div className="w-full sm:w-auto overflow-x-auto hide-scrollbar">
                <table className="w-full text-left text-sm border-collapse min-w-[250px]">
                  <thead>
                    <tr className="text-slate-400 text-xs font-medium border-b border-slate-100">
                      <th className="pb-1 font-normal w-1/4"></th>
                      <th className="pb-1 font-normal w-1/4">Current</th>
                      <th className="pb-1 font-normal w-1/4">New</th>
                      <th className="pb-1 font-normal w-1/4">Diff</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1.5 text-slate-500">Calories</td>
                      <td className="py-1.5 font-medium">{currentMeal.calories}</td>
                      <td className="py-1.5 font-bold text-slate-800">{selectedMeal.calories}</td>
                      <td className="py-1.5"><MacroDiff current={currentMeal.calories} new={selectedMeal.calories} suffix="" /></td>
                    </tr>
                    <tr>
                      <td className="py-1 text-slate-500">Protein</td>
                      <td className="py-1 font-medium">{currentMeal.protein}g</td>
                      <td className="py-1 font-bold text-slate-800">{selectedMeal.protein}g</td>
                      <td className="py-1"><MacroDiff current={currentMeal.protein} new={selectedMeal.protein} suffix="g" inverted /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <Button onClick={handleConfirm} className="w-full sm:w-auto py-3 px-8 text-base flex-shrink-0">
                Confirm Swap
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-slate-500 py-3 sm:py-5">
              <Info size={18} />
              <span className="font-medium text-sm">Select an alternative above to compare</span>
            </div>
          )}
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
        {stage === 'reason' ? renderReasonSelector() : renderAlternatives()}
      </div>
    </ResponsiveModal>
  );
}

// Helper to show visual diffs (e.g. +10g or -50)
function MacroDiff({ current, new: newVal, suffix, inverted = false }) {
  const diff = newVal - current;
  if (diff === 0) return <span className="text-slate-400 font-medium text-xs">No change</span>;
  
  const isPositive = diff > 0;
  
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
