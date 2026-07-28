import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Utensils } from 'lucide-react';

const TIPS = [
  "Eat protein with every meal.",
  "Hydration improves metabolism.",
  "Fiber keeps you full longer.",
  "Vegetables should fill half your plate.",
  "Small healthy habits create lasting results."
];

const VEGETABLES = [
  { emoji: '🥑', top: '10%', left: '15%', delay: '0s', duration: '4s' },
  { emoji: '🥕', top: '5%', right: '15%', delay: '0.5s', duration: '3.5s' },
  { emoji: '🥦', top: '45%', left: '5%', delay: '1s', duration: '5s' },
  { emoji: '🍅', bottom: '15%', left: '20%', delay: '0.2s', duration: '4.5s' },
  { emoji: '🍎', bottom: '10%', right: '25%', delay: '1.5s', duration: '3.8s' },
  { emoji: '🥬', top: '40%', right: '5%', delay: '0.8s', duration: '4.2s' },
  { emoji: '🌽', bottom: '35%', left: '10%', delay: '2s', duration: '4.8s' },
  { emoji: '🥗', top: '25%', right: '20%', delay: '1.2s', duration: '4s' }
];

export default function NotFound() {
  const navigate = useNavigate();
  const [tip, setTip] = useState('');

  useEffect(() => {
    // Pick a random tip on mount
    setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_80%_10%,_#0d3d26_0%,_#071c10_42%,_#040d07_100%)] text-white overflow-hidden relative flex flex-col font-sans">
      
      {/* Ambient Glow Orbs */}
      <div className="absolute top-[-200px] right-[-150px] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[100px] pointer-events-none" />

      {/* Main Content Grid */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto w-full px-6 py-12 gap-12 lg:gap-24 relative z-10">
        
        {/* LEFT: Glassmorphism Card */}
        <div className="w-full max-w-lg lg:w-1/2 order-2 lg:order-1 flex flex-col">
          <div className="bg-white/5 backdrop-blur-2xl border border-emerald-400/20 rounded-[2rem] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.35)_inset_0_1px_0_rgba(255,255,255,0.1)] relative group hover:border-emerald-400/30 transition-colors duration-500">
            
            {/* Top Shine Accent */}
            <div className="absolute top-0 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50" />
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              404 Error
            </div>

            <h1 className="text-7xl font-black mb-4 bg-gradient-to-br from-emerald-300 to-emerald-600 text-transparent bg-clip-text">
              404
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              <span className="text-emerald-400">Oops!</span> Looks like this recipe got lost.
            </h2>

            <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed">
              Looks like you've wandered away from your personalized meal plan. Don't worry, your AI nutrition assistant is ready to guide you back.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={() => navigate('/login')}
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-semibold shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Back to Login page"
              >
                <Home size={18} />
                Back to Login
              </button>
              
              <button 
                onClick={() => navigate('/generator')}
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 text-white rounded-xl font-medium transition-all duration-300 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Generate Meal Plan page"
              >
                <Utensils size={18} />
                Generate Meal Plan
              </button>
            </div>

            {/* AI Tip Hint */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50" role="complementary" aria-label="AI Nutrition Tip">
              <ArrowRight size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">AI Nutrition Tip</p>
                <p className="text-sm text-slate-400 italic">"{tip}"</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT: JSX Illustration */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex items-center justify-center min-h-[400px] relative" aria-hidden="true">
          
          {/* Ambient Pulse Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-emerald-500/20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:animate-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-emerald-500/10 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_1s_infinite] motion-reduce:animate-none" />
          
          {/* Floating Food Emojis */}
          {VEGETABLES.map((veg, i) => (
            <div 
              key={i}
              className="absolute text-4xl select-none pointer-events-none filter drop-shadow-xl animate-bounce motion-reduce:animate-none"
              style={{
                top: veg.top, bottom: veg.bottom, left: veg.left, right: veg.right,
                animationDuration: veg.duration,
                animationDelay: veg.delay
              }}
            >
              {veg.emoji}
            </div>
          ))}

          {/* 4 [PLATE] 4 */}
          <div className="flex items-center gap-2 sm:gap-6 relative z-10">
            
            <span className="text-[120px] sm:text-[180px] font-black leading-none bg-gradient-to-br from-emerald-300 to-emerald-600 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(52,211,153,0.2)] select-none">
              4
            </span>

            {/* Glass Plate Container */}
            <div className="relative w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] rounded-full bg-white/5 backdrop-blur-xl border-4 border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.3)_inset_0_0_30px_rgba(16,185,129,0.1)] flex flex-col items-center justify-center animate-[pulse_3s_ease-in-out_infinite] motion-reduce:animate-none">
              {/* Inner Dashed Rim */}
              <div className="absolute inset-4 sm:inset-6 rounded-full border-2 border-dashed border-emerald-400/40" />
              
              <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                <span className="text-3xl sm:text-5xl">🍽️</span>
                <span className="font-serif italic font-black text-2xl sm:text-4xl text-emerald-300 tracking-tighter drop-shadow-[0_0_15px_rgba(110,231,183,0.5)]">OOPS!</span>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-400/70 uppercase">Not Found</span>
              </div>
            </div>

            <span className="text-[120px] sm:text-[180px] font-black leading-none bg-gradient-to-br from-emerald-300 to-emerald-600 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(52,211,153,0.2)] select-none">
              4
            </span>
            
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-8 border-t border-white/5 bg-white/5 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-xs text-slate-400">
        <p>© 2026 AI Meal Planner</p>
        <p className="font-medium tracking-wide">Healthy Eating • Personalized Nutrition</p>
      </footer>
    </div>
  );
}