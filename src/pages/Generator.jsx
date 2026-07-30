import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Sparkles, Loader2, ArrowLeft, RefreshCw, Bookmark, ShoppingCart, Utensils, ShieldCheck, Droplets, Clock, Users, CheckCircle2 } from 'lucide-react';

import { useProfile } from '../hooks/useProfile';
import { useMealPlan } from '../hooks/useMealPlan';
import { CUISINE_TYPES, COOKING_TIMES } from '../constants/profileConstants';

import Button from '../components/ui/Button';
import MultiSelectPill from '../components/ui/MultiSelectPill';
import Input from '../components/ui/Input';
import FormRadioGroup from '../components/ui/FormRadioGroup';
import GeneratorMealCard from '../components/generator/GeneratorMealCard';
import AiInsightsCard from '../components/generator/AiInsightsCard';
import ReplaceMealModal from '../components/generator/ReplaceMealModal';
import SkeletonMealCard from '../components/generator/SkeletonMealCard';

export default function Generator() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { results, generationState, generatePlan, swapMeal, resetGenerator } = useMealPlan(profile);
  
  const [swappingMealId, setSwappingMealId] = useState(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const { register, watch, setValue, control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      cuisines: ['Indian', 'South Indian'],
      cookingTime: '30',
      mealsToInclude: ['Breakfast', 'Lunch', 'Dinner'],
      servings: 2
    }
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchCuisines = watch('cuisines');
  const watchMeals = watch('mealsToInclude');

  const onSubmit = async (data) => {
    const mealGenerationOptions = {
      cuisines: data.cuisines,
      cookingTime: data.cookingTime,
      mealsPerDay: data.mealsToInclude.length,
      servings: data.servings
    };

    await generatePlan(mealGenerationOptions);
    setShowSuccessBanner(true);
    setTimeout(() => setShowSuccessBanner(false), 4000);
  };

  const handleSwapClick = useCallback((meal) => {
    setSwappingMealId(meal.id); // open modal
  }, []);

  const handleConfirmSwap = useCallback(async (newMealOptions, currentMeal) => {
    await swapMeal(currentMeal, newMealOptions);
    setSwappingMealId(null);
  }, [swapMeal]);

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      
      {/* Header */}
      <div className="bg-wellness-700 text-white pt-8 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] rounded-full bg-wellness-600/50 blur-3xl" />
        <div className="max-w-2xl lg:max-w-4xl mx-auto relative z-content">
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
      <div className="max-w-2xl lg:max-w-4xl mx-auto px-4 -mt-8 relative z-nav">
        
        {/* State: ERROR */}
        {generationState === 'error' && (
          <div className="bg-rose-50 rounded-2xl shadow-sm border border-rose-100 p-12 text-center max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ShieldCheck size={32} className="text-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-rose-900 mb-2">Oops, something went wrong</h2>
            <p className="text-rose-700 mb-8 max-w-md mx-auto">Our AI chef encountered an unexpected error while crafting your menu. Please try again.</p>
            <Button onClick={resetGenerator} variant="primary" className="bg-rose-600 hover:bg-rose-700">
              Try Again
            </Button>
          </div>
        )}

        {/* State: FORM */}
        {generationState === 'form' && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
            
            <div className="card border-slate-200 p-6">
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

            <div className="card border-slate-200 p-6">
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

            <div className="card border-slate-200 p-6">
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

            <div className="card border-slate-200 p-6">
               <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><Clock size={18}/> Cooking Time</h2>
               <FormRadioGroup 
                 name="cookingTime" 
                 options={COOKING_TIMES} 
                 control={control} 
                 register={register} 
                 className="grid grid-cols-2 gap-3"
               />
            </div>

            <div className="mt-8 flex justify-end">
              <Button type="submit" disabled={isSubmitting || generationState === 'loading'} className="w-full sm:w-auto text-lg px-8 py-3 disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting || generationState === 'loading' ? (
                   <><Loader2 size={20} className="mr-2 animate-spin" /> Generating...</>
                ) : (
                   <><Sparkles size={20} className="mr-2" /> Generate Meal Plan</>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* State: LOADING */}
        {generationState === 'loading' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 h-64 animate-pulse" />
              <div className="bg-white rounded-2xl border border-slate-100 p-6 h-48 animate-pulse" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="h-8 bg-slate-200 rounded w-48 animate-pulse" />
              </div>
              <SkeletonMealCard />
              <SkeletonMealCard />
              <SkeletonMealCard />
            </div>
          </div>
        )}

        {/* State: RESULTS */}
        {generationState === 'results' && results && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {showSuccessBanner && (
              <div 
                className="mb-6 bg-green-50 text-green-800 p-4 rounded-xl flex items-center justify-center gap-2 border border-green-200 animate-in fade-in slide-in-from-top-4"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 size={20} className="text-green-600" />
                <span className="font-medium">Meal plan generated successfully!</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Summary & Insights */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Daily Summary */}
                <div className="card border-slate-200 p-6">
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
                  <button onClick={resetGenerator} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
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
                  <button onClick={resetGenerator} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                    <RefreshCw size={16} /> Change Settings
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800">Your Custom Menu</h2>
                  <span className="text-sm text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-lg">{results.meals.length} Meals</span>
                </div>

                {results.meals.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 flex flex-col items-center">
                     <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Utensils size={32} className="text-slate-300" />
                     </div>
                     <h3 className="text-lg font-bold text-slate-800 mb-2">No matches found</h3>
                     <p className="max-w-sm mx-auto mb-6">We couldn't find any meals that match your strict criteria and temporary settings.</p>
                     <Button onClick={resetGenerator} variant="outline">Adjust Preferences</Button>
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
        onConfirm={(options) => handleConfirmSwap(options, results?.meals?.find(m => m.id === swappingMealId))}
        userProfile={profile}
        mealGenerationOptions={JSON.parse(localStorage.getItem('mealGenerationOptions') || '{}')}
      />
    </main>
  );
}
