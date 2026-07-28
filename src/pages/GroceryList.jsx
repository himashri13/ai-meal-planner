import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { 
  getGroceryList, 
  updateServings,
  calculateTotalCost, 
  calculateProgress, 
  groupByCategory,
  filterItems
} from '../services/groceryService';

import GroceryHeader from '../components/grocery/GroceryHeader';
import GroceryActions from '../components/grocery/GroceryActions';
import ProgressCard from '../components/grocery/ProgressCard';
import SearchBar from '../components/grocery/SearchBar';
import CategorySection from '../components/grocery/CategorySection';

export default function GroceryList() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [servings, setServings] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Fetch initial data on mount
  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await getGroceryList();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch grocery list", error);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  // 2. Scale quantities based on servings
  // Wait, updateServings requires oldServings and newServings, but items is our source of truth.
  // Actually, we can just track the previous servings value, or more simply, 
  // calculate the scaling dynamically from 1 to current servings using the base items fetched.
  const scaledItems = useMemo(() => {
    return updateServings(items, 1, servings);
  }, [items, servings]);

  // 3. Filter items by search query
  const filteredItems = useMemo(() => {
    return filterItems(scaledItems, searchQuery);
  }, [scaledItems, searchQuery]);

  // 4. Calculate Progress & Cost on the filtered/scaled items
  const progress = useMemo(() => calculateProgress(filteredItems), [filteredItems]);
  const totalCost = useMemo(() => calculateTotalCost(filteredItems), [filteredItems]);

  // 5. Group by category for rendering
  const groupedItems = useMemo(() => groupByCategory(filteredItems), [filteredItems]);

  // Handle toggling an item's checked state
  const handleToggleItem = (itemId) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === itemId ? { ...item, checked: !item.checked } : item
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <GroceryHeader />
          <GroceryActions />
        </div>

        {/* Progress & Servings Card */}
        <div className="mb-8">
          <ProgressCard 
            progress={progress} 
            totalCost={totalCost} 
            servings={servings} 
            setServings={setServings} 
          />
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* Grocery List Categories */}
        {Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No ingredients found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <CategorySection 
                key={category} 
                category={category} 
                items={categoryItems} 
                onToggleItem={handleToggleItem}
              />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
