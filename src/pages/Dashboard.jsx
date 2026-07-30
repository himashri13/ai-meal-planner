import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Droplets, Dumbbell, Activity, CheckCircle2, Sparkles, ShoppingBag, ChefHat, Heart, ListTodo, ChevronDown, ChevronUp } from 'lucide-react';

import { useProfile } from '../hooks/useProfile';
import { 
  calculateBMI, getBMICategory, calculateCalories, 
  calculateProteinTarget, estimateGoalTimeline 
} from '../services/recommendationService';
import { GOALS, FOOD_PREFERENCES } from '../constants/profileConstants';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProgressCard from '../components/dashboard/ProgressCard';
import ActionCard from '../components/dashboard/ActionCard';
import BottomNav from '../components/dashboard/BottomNav';
import AiTipCard from '../components/dashboard/AiTipCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, loading } = useProfile();
  const [profileExpanded, setProfileExpanded] = useState(false);

  // Derived Insights (Memoized to prevent recalculation on profileExpanded toggle)
  const insights = useMemo(() => {
    if (!profile) return {};
    const { personalInfo, lifestyle } = profile;
    const bmi = calculateBMI(personalInfo.weight, personalInfo.heightCm);
    const dailyCalories = calculateCalories(
      personalInfo.age, personalInfo.gender, personalInfo.weight, 
      personalInfo.heightCm, lifestyle.activityLevel, lifestyle.goal
    );
    const proteinTarget = calculateProteinTarget(personalInfo.weight, lifestyle.goal);
    
    return {
      bmi,
      bmiCategory: getBMICategory(bmi),
      dailyCalories,
      proteinTarget,
      timeline: estimateGoalTimeline(lifestyle.goal)
    };
  }, [profile]);

  const { bmi, bmiCategory, dailyCalories, proteinTarget, timeline } = insights;
  
  // Formatters (Memoized)
  const formatters = useMemo(() => {
    if (!profile) return {};
    const { personalInfo, preferences, lifestyle } = profile;
    return {
      goalLabel: GOALS.find(g => g.value === lifestyle.goal)?.label || lifestyle.goal,
      dietLabel: FOOD_PREFERENCES.find(d => d.value === preferences.diet)?.label || preferences.diet,
      firstName: personalInfo.fullName ? personalInfo.fullName.split(' ')[0] : 'User'
    };
  }, [profile]);

  const { goalLabel, dietLabel, firstName } = formatters;

  if (loading) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

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

  const { personalInfo, nutrition, preferences, health } = profile;

  // Mock consumed data for lively UI
  const caloriesConsumed = Math.round(dailyCalories * 0.6);
  const proteinConsumed = Math.round(proteinTarget * 0.5);
  const waterConsumed = 1.5;

  return (
    <main className="min-h-screen bg-wellness-50 pb-24 md:pb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[60%] h-[40%] rounded-bl-[100%] bg-wellness-200/30 blur-3xl -z-content" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-tr-[100%] bg-wellness-300/20 blur-3xl -z-content" />

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 relative z-content space-y-6">
        
        {/* Header */}
        <header className="pt-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Good morning, {firstName}!</h1>
            <p className="text-wellness-700 font-medium mt-1">
              You're on track to hit your {goalLabel.toLowerCase()} goal today. Keep it up! 🚀
            </p>
          </div>
          <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
            <img src={`https://ui-avatars.com/api/?name=${firstName}&background=529676&color=fff`} alt="User Avatar" />
          </div>
        </header>

        {/* Bento Row 1: Daily Targets & Goal Progress */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProgressCard title="Calories" current={caloriesConsumed} target={dailyCalories} unit="kcal" icon={Flame} colorClass="bg-orange-500" />
          <ProgressCard title="Protein" current={proteinConsumed} target={proteinTarget} unit="g" icon={Dumbbell} colorClass="bg-blue-500" />
          <ProgressCard title="Water" current={waterConsumed} target={nutrition.waterGoal} unit="L" icon={Droplets} colorClass="bg-cyan-500 text-cyan-500" />
          
          {/* Goal Progress Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-emerald-100">
                <Activity size={20} className="text-emerald-600" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Timeline</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800 line-clamp-1 mb-1">{timeline}</div>
              <div className="text-xs text-slate-500 font-medium">{bmiCategory} (BMI: {bmi})</div>
            </div>
          </div>
        </div>

        {/* Bento Row 2: AI Tip & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <AiTipCard />
          </div>
          <div className="md:col-span-2 grid grid-cols-4 gap-3 sm:gap-4">
            <ActionCard label="Meal Plan" icon={Sparkles} colorClass="bg-wellness-500" onClick={() => navigate('/generator')} />
            <ActionCard label="Groceries" icon={ShoppingBag} colorClass="bg-amber-500" onClick={() => navigate('/grocery-list')} />
            <ActionCard label="Assistant" icon={ChefHat} colorClass="bg-purple-500" />
            <ActionCard label="Favorites" icon={Heart} colorClass="bg-rose-500" />
          </div>
        </div>

        {/* Bento Row 3: Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecentActivityCard 
            title="Today's Meal Plan" 
            subtitle="Generated 2 hours ago"
            icon={ListTodo}
            colorClass="bg-wellness-500"
            actionLabel="View Plan"
            onClick={() => navigate('/generator')}
            stats={
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-600">3 Meals</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-600">{dailyCalories} kcal</span>
                <span className="text-slate-400">|</span>
                <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 size={14}/> 100% Match</span>
              </div>
            }
          />
          <RecentActivityCard 
            title="Active Grocery List" 
            subtitle="Last updated yesterday"
            icon={ShoppingBag}
            colorClass="bg-amber-500"
            actionLabel="Open List"
            onClick={() => navigate('/grocery-list')}
            stats={
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-600">12/24 items</span>
                <span className="text-slate-400">|</span>
                <span className="text-emerald-600 font-bold">50% Done</span>
              </div>
            }
          />
        </div>

        {/* Collapsible Profile Summary */}
        <div className="card overflow-hidden">
          <button 
            onClick={() => setProfileExpanded(!profileExpanded)}
            className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                <Activity size={20} />
              </div>
              <div className="text-left">
                <h2 className="text-sm font-bold text-slate-800">Health Profile Settings</h2>
                <p className="text-xs text-slate-500 font-medium">View your biometrics, allergies, and diet preferences</p>
              </div>
            </div>
            <div className="text-slate-400">
              {profileExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>

          {profileExpanded && (
            <div className="p-4 sm:p-6 pt-0 border-t border-slate-100 animate-in slide-in-from-top-2 fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                
                {/* Left Column: Stats */}
                <div className="space-y-4">
                  <div className="flex gap-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div><span className="font-semibold text-slate-800">Age:</span> {personalInfo.age} yrs</div>
                    <div><span className="font-semibold text-slate-800">Height:</span> {personalInfo.heightFt}' {personalInfo.heightIn}"</div>
                    <div><span className="font-semibold text-slate-800">Weight:</span> {personalInfo.weight} kg</div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Diet:</span>
                      <span className="bg-wellness-100 text-wellness-700 px-2 py-1 rounded-md text-sm font-semibold">{dietLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Restrictions */}
                <div className="space-y-4">
                  {health.allergies?.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Allergies:</div>
                      <div className="flex flex-wrap gap-2">
                        {health.allergies?.map(a => (
                          <span key={a} className="bg-red-50 text-red-600 border border-red-100 px-2 py-1 rounded-md text-xs font-semibold">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {preferences.ingredientDislikes?.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Dislikes:</div>
                      <div className="flex flex-wrap gap-2">
                        {preferences.ingredientDislikes?.map(d => (
                          <span key={d} className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded-md text-xs font-semibold">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button onClick={() => navigate('/edit-profile')} className="text-wellness-600 text-sm font-bold hover:text-wellness-800 transition-colors mt-2 inline-block">
                    Edit Profile &rarr;
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>

      <BottomNav />
    </main>
  );
}
