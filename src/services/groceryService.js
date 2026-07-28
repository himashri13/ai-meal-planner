import { GROCERY_CATEGORIES } from '../data/groceryMock';

/**
 * Calculates the total estimated cost of all items in the grocery list.
 * 
 * @param {Array} items - Array of grocery item objects
 * @returns {number} The total cost, converted safely to a number
 */
export const calculateTotalCost = (items) => {
  if (!Array.isArray(items)) return 0;
  
  return items.reduce((total, item) => {
    const price = Number(item?.estimatedPrice);
    const validPrice = isNaN(price) ? 0 : price;
    return total + validPrice;
  }, 0);
};

/**
 * Calculates the progress of the grocery list based on checked items.
 * 
 * @param {Array} items - Array of grocery item objects
 * @returns {Object} Object containing checkedCount, totalCount, and percentage
 */
export const calculateProgress = (items) => {
  if (!Array.isArray(items)) return { checkedCount: 0, totalCount: 0, percentage: 0 };
  
  const totalCount = items.length;
  if (totalCount === 0) return { checkedCount: 0, totalCount: 0, percentage: 0 };
  
  const checkedCount = items.filter(item => item?.checked).length;
  const percentage = Math.round((checkedCount / totalCount) * 100);
  
  return { checkedCount, totalCount, percentage };
};

/**
 * Filters the grocery list based on a search query against the item name or category.
 * 
 * @param {Array} items - Array of grocery item objects
 * @param {string} search - The search query string
 * @returns {Array} Filtered array of grocery items
 */
export const filterItems = (items, search) => {
  if (!Array.isArray(items)) return [];
  if (!search || typeof search !== 'string' || !search.trim()) return [...items];
  
  const lowerQuery = search.toLowerCase().trim();
  
  return items.filter(item => {
    const nameMatch = item?.name?.toLowerCase().includes(lowerQuery) || false;
    const categoryMatch = item?.category?.toLowerCase().includes(lowerQuery) || false;
    
    return nameMatch || categoryMatch;
  });
};

/**
 * Groups a flat array of grocery items by their category.
 * 
 * @param {Array} items - Array of grocery item objects
 * @returns {Object} An object where keys are categories and values are arrays of items
 */
export const groupByCategory = (items) => {
  const grouped = {};
  
  if (!Array.isArray(items)) return grouped;
  
  // Initialize with ordered categories if available
  if (Array.isArray(GROCERY_CATEGORIES)) {
    GROCERY_CATEGORIES.forEach(cat => {
      grouped[cat] = [];
    });
  }

  items.forEach(item => {
    const cat = item?.category || 'Other';
    if (!grouped[cat]) {
      grouped[cat] = [];
    }
    grouped[cat].push(item);
  });

  // Clean up empty categories
  Object.keys(grouped).forEach(key => {
    if (grouped[key].length === 0) {
      delete grouped[key];
    }
  });

  return grouped;
};

/**
 * Scales the quantities and estimated prices of grocery items proportionally 
 * when the household servings size changes.
 * 
 * @param {Array} items - Array of grocery item objects
 * @param {number} oldServings - The previous number of servings
 * @param {number} newServings - The new number of servings
 * @returns {Array} A new array of scaled grocery items
 */
export const updateServings = (items, oldServings, newServings) => {
  if (!Array.isArray(items)) return [];
  
  // Validation: Prevent divide-by-zero, invalid, or negative servings
  if (
    typeof oldServings !== 'number' || oldServings <= 0 ||
    typeof newServings !== 'number' || newServings <= 0
  ) {
    return [...items]; // Return a shallow copy of the original array
  }
  
  const scaleFactor = newServings / oldServings;

  return items.map(item => {
    const newQuantity = (Number(item?.quantity) || 0) * scaleFactor;
    const newPrice = (Number(item?.estimatedPrice) || 0) * scaleFactor;
    
    // Format quantities to two decimal places if they aren't integers
    const formattedQuantity = Number.isInteger(newQuantity) 
      ? newQuantity 
      : Number(newQuantity.toFixed(2));
      
    // Round prices to the nearest whole number
    const formattedPrice = Math.round(newPrice);

    return {
      ...item,
      quantity: formattedQuantity,
      estimatedPrice: formattedPrice
    };
  });
};

/**
 * Calculates the total estimated cost for each category.
 * 
 * @param {Array} items - Array of grocery item objects
 * @returns {Object} An object mapping category names to their total cost
 */
export const calculateCategoryTotals = (items) => {
  if (!Array.isArray(items)) return {};

  return items.reduce((totals, item) => {
    const cat = item?.category || 'Other';
    const price = Number(item?.estimatedPrice);
    const validPrice = isNaN(price) ? 0 : price;
    
    if (!totals[cat]) {
      totals[cat] = 0;
    }
    totals[cat] += validPrice;
    
    return totals;
  }, {});
};

/**
 * Sorts the grocery list based on a specific criteria.
 * 
 * @param {Array} items - Array of grocery item objects
 * @param {string} sortBy - The sort criteria ('alphabetical', 'price-low', 'price-high', 'checked-first', 'unchecked-first')
 * @returns {Array} A new sorted array of grocery items
 */
export const sortItems = (items, sortBy) => {
  if (!Array.isArray(items)) return [];
  
  // Create a shallow copy so we don't mutate the original array
  const sortedItems = [...items];

  switch (sortBy) {
    case 'alphabetical':
      return sortedItems.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    case 'price-low':
      return sortedItems.sort((a, b) => (Number(a.estimatedPrice) || 0) - (Number(b.estimatedPrice) || 0));
    case 'price-high':
      return sortedItems.sort((a, b) => (Number(b.estimatedPrice) || 0) - (Number(a.estimatedPrice) || 0));
    case 'checked-first':
      return sortedItems.sort((a, b) => (b.checked ? 1 : 0) - (a.checked ? 1 : 0));
    case 'unchecked-first':
      return sortedItems.sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0));
    default:
      return sortedItems;
  }
};

/**
 * Toggles the checked status of a specific item by its ID.
 * 
 * @param {Array} items - Array of grocery item objects
 * @param {string|number} id - The ID of the item to toggle
 * @returns {Array} A new array with the toggled item
 */
export const toggleItemChecked = (items, id) => {
  if (!Array.isArray(items)) return [];
  
  return items.map(item => {
    if (item.id === id) {
      return {
        ...item,
        checked: !item.checked
      };
    }
    return item;
  });
};

/**
 * Returns comprehensive statistics about the current grocery list.
 * 
 * @param {Array} items - Array of grocery item objects
 * @returns {Object} Object containing totalItems, checkedItems, remainingItems, estimatedCost, and progress
 */
export const getGroceryStats = (items) => {
  if (!Array.isArray(items)) {
    return {
      totalItems: 0,
      checkedItems: 0,
      remainingItems: 0,
      estimatedCost: 0,
      progress: 0
    };
  }

  const { checkedCount, totalCount, percentage } = calculateProgress(items);
  const estimatedCost = calculateTotalCost(items);
  
  return {
    totalItems: totalCount,
    checkedItems: checkedCount,
    remainingItems: totalCount - checkedCount,
    estimatedCost,
    progress: percentage
  };
};

/**
 * Utility to fetch the mock data (retained for component compatibility)
 * 
 * @returns {Promise<Array>}
 */
export const getGroceryList = async () => {
  const { groceryItems } = await import('../data/groceryMock');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  return groceryItems;
};
