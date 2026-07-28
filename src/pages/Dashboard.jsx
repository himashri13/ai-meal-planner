import React from 'react';
import { Flame, Droplets, Dumbbell, Sparkles, ShoppingBag, Heart, Coffee, Utensils, Apple, ChefHat, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProgressCard from '../components/dashboard/ProgressCard';
import MealCard from '../components/dashboard/MealCard';
import ActionCard from '../components/dashboard/ActionCard';
import BottomNav from '../components/dashboard/BottomNav';

export default function Dashboard() {
  const userName = "Jane";
  const userGoal = "Lose Weight";
  const navigate = useNavigate();

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
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Good morning, {userName}!</h1>
              <p className="text-wellness-700 font-medium mt-1 flex items-center gap-1.5">
                <TargetIcon size={18} /> Current Goal: {userGoal}
              </p>
            </div>
            <div className="hidden md:flex">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Jane+Doe&background=529676&color=fff" alt="User Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Nutrition Overview */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Daily Targets</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ProgressCard title="Calories" current={1450} target={1800} unit="kcal" icon={Flame} colorClass="bg-orange-500" />
            <ProgressCard title="Protein" current={65} target={120} unit="g" icon={Dumbbell} colorClass="bg-blue-500" />
            <ProgressCard title="Water" current={1.2} target={2.5} unit="L" icon={Droplets} colorClass="bg-cyan-500 text-cyan-500" />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-4">
            <ActionCard label="Meal Plan" icon={Sparkles} colorClass="bg-wellness-500" onClick={() => navigate('/generator')} />
            <ActionCard label="Groceries" icon={ShoppingBag} colorClass="bg-amber-500" onClick={() => navigate('/grocery-list')} />
            <ActionCard label="Assistant" icon={ChefHat} colorClass="bg-purple-500" />
            <ActionCard label="Favorites" icon={Heart} colorClass="bg-rose-500" />
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-3">
            <Link to="/personalization" className="bg-wellness-600 text-white rounded-2xl p-6 shadow-sm border border-wellness-500 flex flex-col sm:flex-row items-center justify-between hover:bg-wellness-700 transition-colors group">
              <div>
                <h2 className="text-lg font-semibold mb-1">Complete your Personalization Profile</h2>
                <p className="text-wellness-100 text-sm">Tell us about your lifestyle, budget, and health conditions to get better AI recommendations.</p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center gap-2 font-medium bg-white/20 px-4 py-2 rounded-xl group-hover:bg-white/30 transition-colors">
                Complete Now <ArrowRight size={18} />
              </div>
            </Link>
          </div>

          {/* Today's Meals */}
          <section className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Today's Meals</h2>
              <button className="text-sm font-medium text-wellness-600 hover:text-wellness-800 transition-colors">See all</button>
            </div>
            <div className="flex flex-col gap-3">
              <MealCard 
                id="m1"
                mealName="Idli with Sambar" 
                calories={350} 
                description="Steamed rice cakes served with lentil and vegetable stew." 
                icon={Coffee} 
                time="Breakfast"
              />
              <MealCard 
                id="m2"
                mealName="Rajma Rice" 
                calories={450} 
                description="Red kidney bean curry served with steamed basmati rice." 
                icon={Utensils} 
                time="Lunch"
              />
              <MealCard 
                id="m3"
                mealName="Fruit Chaat" 
                calories={150} 
                description="Mixed seasonal fruits tossed with tangy spices." 
                icon={Apple} 
                time="Snack"
              />
              <MealCard 
                id="m4"
                mealName="Chapati with Dal" 
                calories={400} 
                description="Whole wheat flatbreads with yellow lentil soup." 
                icon={Utensils} 
                time="Dinner"
              />
            </div>
          </section>

          {/* Weekly Progress */}
          <section className="md:col-span-1">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Weekly Progress</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full border-4 border-wellness-100 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-wellness-600">4<span className="text-lg text-slate-400">/7</span></span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">You're on a 4-day streak!</h3>
              <p className="text-sm text-slate-500">Keep sticking to your meal plan to hit your weight loss goal.</p>
            </div>
          </section>

        </div>
      </div>

      <BottomNav />
    </div>
  );
}

// Simple internal icon for the header goal
function TargetIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
