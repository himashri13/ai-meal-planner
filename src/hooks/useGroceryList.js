import { useState, useCallback, useEffect, useMemo } from 'react';
import { getGroceryList as apiGetGroceryList } from '../api/groceryApi';
import { updateServings, filterItems, calculateProgress, calculateTotalCost, groupByCategory } from '../services/groceryService';

/**
 * Custom hook to manage the user's grocery list.
 * 
 * Provides state and functions for fetching, filtering, checking off items,
 * and recalculating quantities based on servings.
 * 
 * @returns {{
 *   loading: boolean,
 *   error: string|null,
 *   servings: number,
 *   setServings: Function,
 *   searchQuery: string,
 *   setSearchQuery: Function,
 *   categories: Array<{category: string, items: Array<Object>}>,
 *   stats: {
 *     totalItems: number,
 *     completedItems: number,
 *     progressPercentage: number,
 *     estimatedTotal: number
 *   },
 *   toggleItem: Function,
 *   clearCompleted: Function,
 *   refreshList: Function
 * }} Grocery list state and mutation functions.
 */
export const useGroceryList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servings, setServings] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetGroceryList();
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch grocery list', err);
      setError('Failed to load grocery list.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleToggleItem = useCallback((itemId) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === itemId ? { ...item, checked: !item.checked } : item
    ));
  }, []);

  // Derived state
  const scaledItems = useMemo(() => {
    return updateServings(items, 1, servings);
  }, [items, servings]);

  const filteredItems = useMemo(() => {
    return filterItems(scaledItems, searchQuery);
  }, [scaledItems, searchQuery]);

  const progress = useMemo(() => calculateProgress(filteredItems), [filteredItems]);
  const totalCost = useMemo(() => calculateTotalCost(filteredItems), [filteredItems]);
  const groupedItems = useMemo(() => groupByCategory(filteredItems), [filteredItems]);

  return {
    loading,
    error,
    items,
    servings,
    setServings,
    searchQuery,
    setSearchQuery,
    handleToggleItem,
    progress,
    totalCost,
    groupedItems,
    refreshList: fetchList
  };
};
