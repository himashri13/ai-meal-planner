import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, ArrowLeft, RefreshCw, Bookmark, ShoppingCart, Utensils, Zap, ShieldCheck, Droplets, Clock, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import MultiSelectPill from '../components/ui/MultiSelectPill';
import Input from '../components/ui/Input';
import GeneratorMealCard from '../components/generator/GeneratorMealCard';
import AiInsightsCard from '../components/generator/AiInsightsCard';
import ReplaceMealModal from '../components/generator/ReplaceMealModal';
import { getMealAlternatives, swapMeal } from '../services/mockMealService';
import { generateMealPlan } from '../services/aiPersonalizationService';
import { CUISINE_TYPES, COOKING_TIMES } from '../constants/profileConstants';

export default function Generator() {
  const navigate = useNavigate();
  const [generationState, setGenerationState] = useState('form'); 
  const [results, setResults] = useState(null);
  const [swappingMealId, setSwappingMealId] = useState(null);

  const { register, watch, setValue, handleSubmit, getValues } = useForm({
    defaultValues: {
      cuisines: ['Indian', 'South Indian'],
      cookingTime: '30',
      mealsToInclude: ['Breakfast', 'Lunch', 'Dinner'],
      servings: 2
    }
  });

  const watchCuisines = watch('cuisines');
  const watchMeals = watch('mealsToInclude');

  const onSubmit = async (data) => {
    setGenerationState('loading');
    try {
      const userProfile = JSON.parse(localStorage.getItem('ai_meal_planner_profile') || '{}');
      
      const mealGenerationOptions = {
        cuisines: data.cuisines,
        cookingTime: data.cookingTime,
        mealsPerDay: data.mealsToInclude.length,
        servings: data.servings
      };

      // Save temp preferences
      localStorage.setItem('mealGenerationOptions', JSON.stringify(mealGenerationOptions));

      const generatedData = await generateMealPlan(userProfile, mealGenerationOptions);
      setResults(generatedData);
      setGenerationState('results');
    } catch (error) {
      console.error(error);
      setGenerationState('error');
    }
  };

  const handleSwapClick = (meal) => {
    setSwappingMealId(meal.id); // open modal
  };

  const handleConfirmSwap = (newMeal) => {
    setResults(prev => {
      const updatedMeals = prev.meals.map(m => m.id === swappingMealId ? newMeal : m);
      
      // Recalculate summary
      const newSummary = updatedMeals.reduce((acc, m) => {
        acc.calories += m.calories;
        acc.protein += m.protein;
        acc.carbs += m.carbs;
        acc.fat += m.fat;
        acc.fiber += m.fiber;
        return acc;
      }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, water: prev.summary?.water || 0 });

      return { summary: newSummary, meals: updatedMeals };
    });
    setSwappingMealId(null);
  };

  const renderRadioGroup = (name, options) => (
    <div className="grid grid-cols-2 gap-3">
      {options.map(opt => {
        const isSelected = watch()[name] === opt.value;
        return (
          <label key={opt.value} className={`cursor-pointer px-4 py-3 rounded-xl border transition-all ${isSelected ? 'bg-wellness-50 border-wellness-500 text-wellness-800 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-wellness-300'}`}>
            <input type="radio" value={opt.value} {...register(name)} className="sr-only" />
            <span className="block font-medium text-sm">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      
      {/* Header */}
      <div className="bg-wellness-700 text-white pt-8 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] rounded-full bg-wellness-600/50 blur-3xl" />
        <div className="max-w-2xl lg:max-w-4xl mx-auto relative z-10">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-wellness-100 hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Sparkles className="text-wellness-200" /> Meal Plan Settings
          </h1>
          <p className="text-wellness-100 text-sm leading-relaxed max-w-lg">
            Tell us what you're craving today. These temporary options won't permanently change your profile.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-2xl lg:max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        
        {/* State: ERROR */}
        {generationState === 'error' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <ShieldCheck size={48} className="text-rose-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-slate-500 mb-6">Our AI chef is currently unavailable. Please try again.</p>
            <Button onClick={() => setGenerationState('form')}>Back to Form</Button>
          </div>
        )}

        {/* State: FORM */}
        {generationState === 'form' && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><Utensils size={18}/> Meals per Day</h2>
              <div className="flex flex-wrap gap-2">
                {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(meal => (
                  <MultiSelectPill
                    key={meal}
                    label={meal}
                    selected={watchMeals.includes(meal)}
                    onClick={() => {
                      const newMeals = watchMeals.includes(meal) ? watchMeals.filter(m => m !== meal) : [...watchMeals, meal];
                      setValue('mealsToInclude', newMeals);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><Users size={18}/> Servings</h2>
              <div className="max-w-xs">
                 <Input 
                  id="servings" 
                  type="number" 
                  placeholder="2"
                  min="1"
                  max="10"
                  {...register("servings", { valueAsNumber: true })} 
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Cuisines Options</h2>
              <div className="flex flex-wrap gap-2">
                {CUISINE_TYPES.map(cuisine => (
                  <MultiSelectPill
                    key={cuisine}
                    label={cuisine}
                    selected={watchCuisines.includes(cuisine)}
                    onClick={() => {
                      const newCuisines = watchCuisines.includes(cuisine) ? watchCuisines.filter(c => c !== cuisine) : [...watchCuisines, cuisine];
                      setValue('cuisines', newCuisines);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
               <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><Clock size={18}/> Cooking Time</h2>
                {renderRadioGroup('cookingTime', COOKING_TIMES)}
            </div>

            <div className="mt-8 flex justify-end">
              <Button type="submit" className="w-full sm:w-auto text-lg px-8 py-3">
                <Sparkles size={20} className="mr-2" /> Generate Meal Plan
              </Button>
            </div>
          </form>
        )}

        {/* State: LOADING */}
        {generationState === 'loading' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500 max-w-2xl mx-auto">
            <Loader2 size={48} className="text-wellness-500 animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Crafting your perfect menu...</h2>
            <p className="text-slate-500 max-w-md">Our AI is fetching the best recipes, balancing macros, and aligning with your time constraints and strict profile settings.</p>
          </div>
        )}

        {/* State: RESULTS */}
        {generationState === 'results' && results && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Summary & Insights */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Daily Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-lg font-semibold text-slate-800 mb-4">Daily Targets</h2>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                      <div className="text-xs text-orange-600 font-medium mb-1">Calories</div>
                      <div className="text-xl font-bold text-slate-800">{results.summary.calories}</div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                      <div className="text-xs text-blue-600 font-medium mb-1">Protein</div>
                      <div className="text-xl font-bold text-slate-800">{results.summary.protein}g</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                      <div className="text-xs text-purple-600 font-medium mb-1">Carbs</div>
                      <div className="text-xl font-bold text-slate-800">{results.summary.carbs}g</div>
                    </div>
                    <div className="bg-rose-50 rounded-xl p-3 border border-rose-100">
                      <div className="text-xs text-rose-600 font-medium mb-1">Fat</div>
                      <div className="text-xl font-bold text-slate-800">{results.summary.fat}g</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                      <div className="text-xs text-green-600 font-medium mb-1">Fiber</div>
                      <div className="text-xl font-bold text-slate-800">{results.summary.fiber}g</div>
                    </div>
                    {results.summary.water && (
                      <div className="bg-cyan-50 rounded-xl p-3 border border-cyan-100">
                        <div className="text-xs text-cyan-600 font-medium mb-1 flex items-center justify-center gap-1"><Droplets size={12}/> Water</div>
                        <div className="text-xl font-bold text-slate-800">{results.summary.water}L</div>
                      </div>
                    )}
                  </div>
                </div>

                <AiInsightsCard summary={results.summary} meals={results.meals} />

                {/* Desktop Actions */}
                <div className="hidden lg:flex flex-col gap-3">
                  <button onClick={() => alert("Plan Saved!")} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-wellness-600 hover:bg-wellness-700 rounded-xl transition-colors">
                    <Bookmark size={18} /> Save Plan
                  </button>
                  <button onClick={() => navigate('/grocery-list')} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-wellness-700 bg-wellness-50 hover:bg-wellness-100 border border-wellness-200 rounded-xl transition-colors">
                    <ShoppingCart size={18} /> Add All to Grocery
                  </button>
                  <button onClick={() => setGenerationState('form')} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                    <RefreshCw size={18} /> Change Preferences
                  </button>
                </div>
              </div>

              {/* Right Column: Meal List */}
              <div className="lg:col-span-2 space-y-4">
                
                {/* Mobile Actions (Visible only on small screens) */}
                <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  <button onClick={() => alert("Plan Saved!")} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-wellness-600 hover:bg-wellness-700 rounded-xl transition-colors">
                    <Bookmark size={16} /> Save
                  </button>
                  <button onClick={() => navigate('/grocery-list')} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-wellness-700 bg-wellness-50 hover:bg-wellness-100 rounded-xl transition-colors border border-wellness-200">
                    <ShoppingCart size={16} /> Grocery
                  </button>
                  <button onClick={() => setGenerationState('form')} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                    <RefreshCw size={16} /> Change Settings
                  </button>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-slate-800">Your Custom Menu</h2>
                  <span className="text-sm text-slate-500 font-medium">{results.meals.length} Meals</span>
                </div>

                {results.meals.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
                    No meals matched your strict criteria. Try loosening your preferences.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {results.meals.map((meal) => (
                      <GeneratorMealCard 
                        key={meal.id} 
                        meal={meal} 
                        isReplacing={false}
                        onReplace={handleSwapClick} 
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      <ReplaceMealModal 
        isOpen={!!swappingMealId}
        onClose={() => setSwappingMealId(null)}
        currentMeal={results?.meals?.find(m => m.id === swappingMealId)}
        onConfirm={handleConfirmSwap}
      />
    </div>
  );
}
