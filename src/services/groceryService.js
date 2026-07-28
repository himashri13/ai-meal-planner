import { MOCK_GROCERY_LIST, GROCERY_CATEGORIES } from '../data/groceryMock';

/**
 * Returns the mock grocery list grouped by categories.
 */
export const getGroceryList = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  return MOCK_GROCERY_LIST;
};

/**
 * Scales the quantities and prices of items based on the number of servings.
 */
export const scaleQuantities = (items, servings) => {
  return items.map(item => ({
    ...item,
    quantity: item.baseQuantity * servings,
    estimatedPrice: item.basePrice * servings
  }));
};

/**
 * Calculates the total cost of all items.
 */
export const calculateTotalCost = (items) => {
  return items.reduce((total, item) => total + item.estimatedPrice, 0);
};

/**
 * Calculates the progress of checked items.
 * Returns { checkedCount, totalCount, percentage }
 */
export const calculateProgress = (items) => {
  const totalCount = items.length;
  const checkedCount = items.filter(item => item.checked).length;
  const percentage = totalCount === 0 ? 0 : Math.round((checkedCount / totalCount) * 100);
  
  return { checkedCount, totalCount, percentage };
};

/**
 * Groups a flat list of items by their category.
 */
export const groupByCategory = (items) => {
  const grouped = {};
  
  // Initialize with empty arrays for ordered categories
  GROCERY_CATEGORIES.forEach(cat => {
    grouped[cat] = [];
  });

  items.forEach(item => {
    if (grouped[item.category]) {
      grouped[item.category].push(item);
    } else {
      // Fallback
      if (!grouped['Pantry']) grouped['Pantry'] = [];
      grouped['Pantry'].push(item);
    }
  });

  // Remove empty categories
  Object.keys(grouped).forEach(key => {
    if (grouped[key].length === 0) {
      delete grouped[key];
    }
  });

  return grouped;
};
