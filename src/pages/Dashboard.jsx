import React, { useState, useEffect } from 'react';
import { Flame, Droplets, Dumbbell, Sparkles, ShoppingBag, Heart, ChefHat, Activity, Calendar, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProgressCard from '../components/dashboard/ProgressCard';
import ActionCard from '../components/dashboard/ActionCard';
import BottomNav from '../components/dashboard/BottomNav';
import { 
  calculateBMI, getBMICategory, calculateCalories, 
  calculateProteinTarget, estimateGoalTimeline 
} from '../services/recommendationService';
import { GOALS, FOOD_PREFERENCES } from '../constants/profileConstants';

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // In production, this would come from a Context, Redux, or API.
    const stored = localStorage.getItem('ai_meal_planner_profile');
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wellness-50 p-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Welcome to AI Meal Planner!</h1>
        <p className="text-slate-600 mb-8 text-center max-w-md">Let's set up your personalized nutrition profile to get started.</p>
        <button 
          onClick={() => navigate('/onboarding')}
          className="bg-wellness-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-wellness-700 transition-colors"
        >
          Start Onboarding
        </button>
      </div>
    );
  }

  const { personalInfo, nutrition, preferences, health, lifestyle } = profile;

  // Derived Insights
  const bmi = calculateBMI(personalInfo.weight, personalInfo.heightCm);
  const bmiCategory = getBMICategory(bmi);
  const dailyCalories = calculateCalories(
    personalInfo.age, personalInfo.gender, personalInfo.weight, 
    personalInfo.heightCm, lifestyle.activityLevel, lifestyle.goal
  );
  const proteinTarget = calculateProteinTarget(personalInfo.weight, lifestyle.goal);
  const timeline = estimateGoalTimeline(lifestyle.goal);
  
  // Formatters
  const goalLabel = GOALS.find(g => g.value === lifestyle.goal)?.label || lifestyle.goal;
  const dietLabel = FOOD_PREFERENCES.find(d => d.value === preferences.diet)?.label || preferences.diet;
  const firstName = personalInfo.fullName ? personalInfo.fullName.split(' ')[0] : 'User';

  return (
    <div className="min-h-screen bg-wellness-50 pb-20 md:pb-8 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[60%] h-[40%] rounded-bl-[100%] bg-wellness-200/30 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-tr-[100%] bg-wellness-300/20 blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        
        {/* Header */}
        <header className="mb-8 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Good morning, {firstName}!</h1>
              <p className="text-wellness-700 font-medium mt-1 flex items-center gap-1.5">
                <TargetIcon size={18} /> Current Goal: {goalLabel}
              </p>
            </div>
            <div className="hidden md:flex">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${firstName}&background=529676&color=fff`} alt="User Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Nutrition Overview */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Daily Targets</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ProgressCard title="Calories" current={0} target={dailyCalories} unit="kcal" icon={Flame} colorClass="bg-orange-500" />
            <ProgressCard title="Protein" current={0} target={proteinTarget} unit="g" icon={Dumbbell} colorClass="bg-blue-500" />
            <ProgressCard title="Water" current={0} target={nutrition.waterGoal} unit="L" icon={Droplets} colorClass="bg-cyan-500 text-cyan-500" />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-4">
            {/* Navigates directly to generator flow which will now ask for temporary options */}
            <ActionCard label="Meal Plan" icon={Sparkles} colorClass="bg-wellness-500" onClick={() => navigate('/generator')} />
            <ActionCard label="Groceries" icon={ShoppingBag} colorClass="bg-amber-500" onClick={() => navigate('/grocery-list')} />
            <ActionCard label="Assistant" icon={ChefHat} colorClass="bg-purple-500" />
            <ActionCard label="Favorites" icon={Heart} colorClass="bg-rose-500" />
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Advanced Profile Summary */}
          <section className="md:col-span-3">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Your Health Profile Insights</h2>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden relative">
              <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                <Activity size={200} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                
                {/* Left Column: Computed Health Stats */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Biometrics</h3>
                    
                    <div className="flex gap-4 mb-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div><span className="font-semibold text-slate-800">Age:</span> {personalInfo.age} yrs</div>
                      <div><span className="font-semibold text-slate-800">Height:</span> {personalInfo.heightFt}' {personalInfo.heightIn}"</div>
                      <div><span className="font-semibold text-slate-800">Weight:</span> {personalInfo.weight} kg</div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-wellness-50 p-4 rounded-2xl flex-1 border border-wellness-100">
                        <div className="text-sm text-wellness-600 font-medium mb-1">Current BMI</div>
                        <div className="text-2xl font-bold text-slate-800">{bmi}</div>
                        <div className={`text-xs font-medium mt-1 ${bmiCategory === 'Normal weight' ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {bmiCategory}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-2xl flex-1 border border-blue-100">
                        <div className="text-sm text-blue-600 font-medium mb-1">Est. Timeline</div>
                        <div className="text-lg font-bold text-slate-800 mt-2 flex items-center gap-2">
                          <Calendar size={18} className="text-blue-500" />
                          {timeline.split(' ')[0]}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{timeline.split(' ').slice(1).join(' ')}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Dietary Settings</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-medium text-slate-700">Preference:</span>
                      <span className="bg-wellness-100 text-wellness-700 px-2 py-1 rounded-md text-sm font-semibold">{dietLabel}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Lifestyle & Habits</h3>
                    <div className="flex flex-col gap-2">
                      {lifestyle.type && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-700">Living:</span>
                          <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-sm">{lifestyle.type}</span>
                        </div>
                      )}
                      {lifestyle.cookingHabit && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-700">Cooking:</span>
                          <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-sm">{lifestyle.cookingHabit}</span>
                        </div>
                      )}
                      {preferences.budget && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-700">Budget:</span>
                          <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-sm">{preferences.budget}</span>
                        </div>
                      )}
                      {!lifestyle.type && !lifestyle.cookingHabit && !preferences.budget && (
                        <p className="text-sm text-slate-500">Not specified.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Restrictions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <AlertTriangle size={16} /> Allergies & Exclusions
                    </h3>
                    
                    {health.allergies?.length > 0 ? (
                      <div className="mb-4">
                        <div className="text-sm font-medium text-slate-700 mb-2">Strict Allergies:</div>
                        <div className="flex flex-wrap gap-2">
                          {health.allergies.map(a => (
                            <span key={a} className="bg-red-50 text-red-600 border border-red-100 px-2.5 py-1 rounded-lg text-sm font-medium">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 mb-4">No allergies reported.</p>
                    )}

                    {health.conditions?.length > 0 && !health.conditions.includes('None') && (
                      <div className="mb-4">
                        <div className="text-sm font-medium text-slate-700 mb-2">Health Conditions:</div>
                        <div className="flex flex-wrap gap-2">
                          {health.conditions.filter(c => c !== 'None').map(c => (
                            <span key={c} className="bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-lg text-sm font-medium">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {preferences.ingredientDislikes.length > 0 ? (
                      <div>
                        <div className="text-sm font-medium text-slate-700 mb-2">Ingredient Dislikes:</div>
                        <div className="flex flex-wrap gap-2">
                          {preferences.ingredientDislikes.map(d => (
                            <span key={d} className="bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-lg text-sm">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">No ingredient dislikes reported.</p>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <button onClick={() => navigate('/onboarding')} className="text-wellness-600 text-sm font-medium hover:text-wellness-800 transition-colors">
                      Edit Profile Settings &rarr;
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function TargetIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
