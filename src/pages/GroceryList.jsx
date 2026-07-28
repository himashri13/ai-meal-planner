import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Printer, Share2, Download, ShoppingCart, ArrowLeft } from 'lucide-react';
import { generateGroceryList } from '../services/mockGroceryService';
import { MEAL_DB } from '../services/mockMealService'; // Fallback to all meals if we don't have a plan in global state
import GroceryCategory from '../components/grocery/GroceryCategory';
import Button from '../components/ui/Button';

export default function GroceryList() {
  const navigate = useNavigate();
  const [householdSize, setHouseholdSize] = useState(1);
  const [loading, setLoading] = useState(true);
  const [groceryData, setGroceryData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // We are simulating fetching the user's generated plan.
  // Since we don't have a global state setup yet, we just grab a few random meals from MEAL_DB to mock it.
  const [sourceMeals] = useState(() => {
    const shuffled = [...MEAL_DB].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4); // Simulate 4 meals in the plan
  });

  useEffect(() => {
    let isMounted = true;
    
    const fetchGroceries = async () => {
      setLoading(true);
      try {
        const data = await generateGroceryList(sourceMeals, householdSize);
        if (isMounted) setGroceryData(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    fetchGroceries();
    
    return () => { isMounted = false; };
  }, [householdSize, sourceMeals]);

  const handleTogglePurchase = (itemId) => {
    setGroceryData(prev => {
      const newItems = { ...prev.items };
      for (const cat in newItems) {
        newItems[cat] = newItems[cat].map(item => 
          item.id === itemId ? { ...item, purchased: !item.purchased } : item
        );
      }
      return { ...prev, items: newItems };
    });
  };

  const handleToggleAlreadyHave = (itemId) => {
    setGroceryData(prev => {
      const newItems = { ...prev.items };
      for (const cat in newItems) {
        newItems[cat] = newItems[cat].map(item => 
          item.id === itemId ? { ...item, alreadyHave: !item.alreadyHave, purchased: false } : item
        );
      }
      return { ...prev, items: newItems };
    });
  };

  // Filter items by search
  const filteredData = useMemo(() => {
    if (!groceryData) return null;
    if (!searchQuery) return groceryData;
    
    const q = searchQuery.toLowerCase();
    const newItems = {};
    
    Object.entries(groceryData.items).forEach(([cat, items]) => {
      const matches = items.filter(item => item.name.toLowerCase().includes(q) || item.original.toLowerCase().includes(q));
      if (matches.length > 0) newItems[cat] = matches;
    });
    
    return { ...groceryData, items: newItems };
  }, [groceryData, searchQuery]);

  // Calculate Progress
  const progressStats = useMemo(() => {
    if (!groceryData) return { total: 0, done: 0, percent: 0 };
    
    let total = 0;
    let done = 0;
    
    Object.values(groceryData.items).forEach(items => {
      total += items.length;
      done += items.filter(i => i.purchased || i.alreadyHave).length;
    });
    
    return {
      total,
      done,
      percent: total === 0 ? 0 : Math.round((done / total) * 100)
    };
  }, [groceryData]);

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-wellness-600 transition-colors mb-2 font-medium"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
            <ShoppingCart className="text-wellness-500" size={32} /> Smart Grocery List
          </h1>
          <p className="text-slate-500 mt-2">Automatically compiled from your 4 planned meals.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-10 px-3"><Printer size={18} /></Button>
          <Button variant="outline" className="h-10 px-3"><Download size={18} /></Button>
          <Button variant="primary" className="h-10 px-3"><Share2 size={18} className="mr-2"/> Share</Button>
        </div>
      </div>

      {/* Summary Dashboard Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col sm:flex-row gap-8 sm:items-center">
        
        {/* Household Toggle */}
        <div className="flex-shrink-0">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 block">Household Size</label>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {[1, 2, 4].map(size => (
              <button
                key={size}
                onClick={() => setHouseholdSize(size)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  householdSize === size 
                    ? 'bg-white text-wellness-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Users size={16} /> {size} {size === 1 ? 'Person' : 'People'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="w-px h-16 bg-slate-100 hidden sm:block" />
        
        {/* Est Cost */}
        <div className="flex-grow">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 block">Estimated Cost</label>
          <div className="text-3xl font-extrabold text-slate-800 flex items-baseline gap-2">
            ₹{groceryData?.estimatedCost || '0'}
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              On Budget
            </span>
          </div>
        </div>

      </div>

      {/* Progress & Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-8 sticky top-4 z-20">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          
          <div className="flex-grow w-full">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-700">Shopping Progress</span>
              <span className="text-wellness-600">{progressStats.percent}%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-wellness-500 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${progressStats.percent}%` }}
              >
                {/* Shine effect */}
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>
          
          <div className="w-full sm:w-64 relative flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-wellness-500 font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>
          
        </div>
      </div>

      {/* Grocery List Categories */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-500">
          <div className="w-10 h-10 border-4 border-wellness-200 border-t-wellness-600 rounded-full animate-spin mb-4" />
          <p className="font-medium text-lg">Compiling grocery list...</p>
        </div>
      ) : filteredData && Object.keys(filteredData.items).length > 0 ? (
        <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-100">
          {Object.entries(filteredData.items).map(([category, items]) => (
            <GroceryCategory 
              key={category}
              category={category}
              items={items}
              onTogglePurchase={handleTogglePurchase}
              onToggleAlreadyHave={handleToggleAlreadyHave}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 text-center">
          <ShoppingCart size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">No items found</h3>
          <p className="text-slate-500 max-w-sm mx-auto">Try adjusting your search query to find what you're looking for.</p>
        </div>
      )}

    </div>
  );
}
