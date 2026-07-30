import { ArrowLeft, SearchX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useGroceryList } from '../hooks/useGroceryList';
import GroceryHeader from '../components/grocery/GroceryHeader';
import GroceryActions from '../components/grocery/GroceryActions';
import ProgressCard from '../components/grocery/ProgressCard';
import SearchBar from '../components/grocery/SearchBar';
import CategorySection from '../components/grocery/CategorySection';
import EmptyState from '../components/ui/EmptyState';

const GrocerySkeleton = () => (
  <div className="min-h-screen bg-slate-50 font-sans pb-24">
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-nav h-16" />
    <main className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 w-48 bg-slate-200 rounded-lg mb-8" />
      <div className="h-32 bg-white rounded-2xl border border-slate-100 mb-8" />
      <div className="h-12 bg-white rounded-xl border border-slate-200 mb-10" />
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i}>
            <div className="h-6 w-32 bg-slate-200 rounded-md mb-4" />
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(j => (
                <div key={j} className="h-20 bg-white rounded-2xl border border-slate-100" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
);

export default function GroceryList() {
  const navigate = useNavigate();
  const {
    loading,
    items,
    servings,
    setServings,
    searchQuery,
    setSearchQuery,
    handleToggleItem,
    progress,
    totalCost,
    groupedItems
  } = useGroceryList();

  if (loading) {
    return <GrocerySkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-nav">
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <GroceryHeader />
          <GroceryActions items={items} />
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
          <EmptyState
            icon={SearchX}
            title="No items found"
            description={`We couldn't find any ingredients matching "${searchQuery}".`}
            action={
              <button 
                onClick={() => setSearchQuery('')}
                className="px-6 py-2.5 bg-emerald-50 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-100 transition-colors"
              >
                Clear Search
              </button>
            }
          />
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
