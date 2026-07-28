import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ChefHat, RefreshCw, Bookmark, ShoppingCart, Flame, AlertCircle, CheckCircle2, Circle, Share2, Sparkles, Scale, HeartPulse, ShieldCheck, Utensils } from 'lucide-react';
import { getMealById } from '../services/mockMealService';

export default function MealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());

  const toggleIngredient = (idx) => {
    setCheckedIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) newSet.delete(idx);
      else newSet.add(idx);
      return newSet;
    });
  };

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      try {
        const data = await getMealById(id);
        setMeal(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wellness-50">
        <RefreshCw className="animate-spin text-wellness-500 mb-4" size={32} />
        <p className="text-slate-500 font-medium">Fetching recipe details...</p>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wellness-50">
        <p className="text-slate-500">Meal not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wellness-50 pb-20 md:pb-12">
      
      {/* Premium Hero Section */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <img 
          src={meal.image} 
          alt={meal.mealName} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Floating Nav */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-md rounded-xl text-white hover:bg-black/50 transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Back
          </button>
          <button onClick={() => alert("Link Copied!")} className="p-2 bg-black/30 backdrop-blur-md rounded-xl text-white hover:bg-black/50 transition-colors">
            <Share2 size={20} />
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-6 left-4 right-4 md:left-8 md:right-8 text-white max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs font-bold tracking-wider uppercase bg-wellness-600 px-3 py-1 rounded-full">
              {meal.time}
            </span>
            <span className="text-xs font-bold tracking-wider uppercase bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
              {meal.cuisine}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">{meal.mealName}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-slate-200">
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm"><Flame size={16} className="text-orange-400" /> {meal.calories} kcal</div>
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm"><Clock size={16} className="text-blue-400" /> {meal.prepTime}</div>
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm"><ChefHat size={16} className="text-purple-400" /> {meal.difficulty}</div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 -mt-4 relative z-10 space-y-6">
        
        {/* Action Bar (Top) */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 flex items-center justify-between overflow-x-auto hide-scrollbar gap-2">
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={() => navigate('/grocery-list')} className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-wellness-600 hover:bg-wellness-700 rounded-xl transition-colors">
              <ShoppingCart size={18} /> Add Ingredients
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors" title="Save Meal">
              <Bookmark size={18} /> Save
            </button>
          </div>
          <div className="flex flex-shrink-0">
            <button onClick={() => navigate('/generator')} className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-wellness-700 bg-wellness-50 hover:bg-wellness-100 rounded-xl transition-colors">
              <RefreshCw size={18} /> Replace
            </button>
          </div>
        </div>

        {/* AI Recommendation Card */}
        <div className="bg-gradient-to-r from-wellness-50 to-white rounded-2xl p-6 shadow-sm border border-wellness-200 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-xl bg-wellness-100 flex items-center justify-center flex-shrink-0">
            <Sparkles className="text-wellness-600" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-wellness-900 mb-2">Why the AI chose this for you</h2>
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">
              {meal.aiReasoning || "This meal aligns perfectly with your macro goals, preferred cuisines, and required cooking time while offering excellent nutritional value."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content (Left Col 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Ingredients & Equipment */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Utensils size={20} className="text-slate-400"/> Ingredients</h2>
                <span className="text-sm font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full flex items-center gap-1.5"><Scale size={14}/> {meal.servingSize}</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {meal.ingredients.map((item, idx) => {
                  const isChecked = checkedIngredients.has(idx);
                  return (
                    <li 
                      key={idx} 
                      onClick={() => toggleIngredient(idx)}
                      className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer select-none"
                    >
                      {isChecked ? (
                        <CheckCircle2 size={20} className="text-wellness-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle size={20} className="text-slate-300 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`font-medium transition-all duration-200 ${isChecked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ChefHat size={16}/> Equipment Needed
              </h3>
              <div className="flex flex-wrap gap-2">
                {meal.equipment?.map(eq => (
                  <span key={eq} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium">
                    {eq}
                  </span>
                ))}
              </div>
            </section>

            {/* Preparation Steps */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Clock size={20} className="text-slate-400"/> Preparation</h2>
              <div className="space-y-6">
                {meal.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    {idx !== meal.steps.length - 1 && (
                      <div className="absolute top-8 bottom-0 left-4 w-[2px] bg-slate-100 -ml-[1px]" />
                    )}
                    <div className="w-8 h-8 rounded-full bg-wellness-100 text-wellness-700 flex items-center justify-center font-bold flex-shrink-0 z-10 shadow-sm border border-white">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 pt-1 leading-relaxed text-lg">{step}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar (Right Col 1/3) */}
          <div className="space-y-6">
            
            {/* Extended Nutrition */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Nutrition Facts</h2>
              
              {/* Macros */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <div className="text-xs text-blue-600 font-bold mb-1 uppercase tracking-wider">Protein</div>
                  <div className="text-xl font-black text-slate-800">{meal.protein}g</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                  <div className="text-xs text-purple-600 font-bold mb-1 uppercase tracking-wider">Carbs</div>
                  <div className="text-xl font-black text-slate-800">{meal.carbs}g</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-3 border border-rose-100">
                  <div className="text-xs text-rose-600 font-bold mb-1 uppercase tracking-wider">Fat</div>
                  <div className="text-xl font-black text-slate-800">{meal.fat}g</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                  <div className="text-xs text-green-600 font-bold mb-1 uppercase tracking-wider">Fiber</div>
                  <div className="text-xl font-black text-slate-800">{meal.fiber}g</div>
                </div>
              </div>

              {/* Micros & Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium text-sm">Sugar</span>
                  <span className="text-slate-800 font-bold">{meal.sugar}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium text-sm">Sodium</span>
                  <span className="text-slate-800 font-bold">{meal.sodium}</span>
                </div>
                
                {meal.vitamins && Object.entries(meal.vitamins).map(([vit, val]) => (
                  <div key={vit} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium text-sm">{vit}</span>
                    <span className="text-slate-800 font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Health & Tags */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Health Profile</h2>
              
              <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1"><HeartPulse size={14}/> Benefits</h3>
                <ul className="space-y-2">
                  {meal.healthBenefits?.map(benefit => (
                    <li key={benefit} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-wellness-500 mt-1">•</span> {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1"><ShieldCheck size={14}/> Suitable For</h3>
                <div className="flex flex-wrap gap-1.5">
                  {meal.suitableFor?.map(suit => (
                    <span key={suit} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                      {suit}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1"><AlertCircle size={14}/> Tags & Allergens</h3>
                <div className="flex flex-wrap gap-1.5">
                  {meal.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
