export const CATEGORIES = [
  'Produce', 'Dairy', 'Grains & Pulses', 'Spices & Condiments', 'Pantry', 'Oils', 'Frozen', 'Miscellaneous'
];

const CATEGORY_MAP = {
  'Idli': 'Grains & Pulses', 'Sambar': 'Pantry & Misc', 'Chutney': 'Spices & Condiments',
  'Rice': 'Grains & Pulses', 'Dal': 'Grains & Pulses', 'Ghee': 'Dairy',
  'Tomato': 'Produce', 'Onion': 'Produce', 'Spinach': 'Produce',
  'Chicken': 'Frozen', 'Egg': 'Dairy', 'Paneer': 'Dairy',
  'Oil': 'Oils', 'Salt': 'Spices & Condiments', 'Pepper': 'Spices & Condiments',
  'Yogurt': 'Dairy', 'Milk': 'Dairy', 'Butter': 'Dairy', 'Cheese': 'Dairy',
  'Oats': 'Grains & Pulses', 'Quinoa': 'Grains & Pulses', 'Millet': 'Grains & Pulses',
  'Roti': 'Grains & Pulses', 'Chapati': 'Grains & Pulses', 'Paratha': 'Grains & Pulses',
  'Chana': 'Grains & Pulses', 'Rajma': 'Grains & Pulses',
  'Potato': 'Produce', 'Carrot': 'Produce', 'Cucumber': 'Produce', 'Lemon': 'Produce',
  'Coriander': 'Produce', 'Mint': 'Produce', 'Ginger': 'Produce', 'Garlic': 'Produce',
  'Turmeric': 'Spices & Condiments', 'Cumin': 'Spices & Condiments', 'Mustard': 'Spices & Condiments'
};

const parseIngredient = (ingredientStr) => {
  // Try to match patterns like "1/2 cup Rice", "4 Idlis", "1 tbsp Ghee"
  const match = ingredientStr.match(/^(\d+(?:\/\d+)?(?:\.\d+)?)\s*(.*)/);
  
  if (match) {
    const qtyStr = match[1];
    const rest = match[2];
    
    let baseQty;
    if (qtyStr.includes('/')) {
      const [num, den] = qtyStr.split('/');
      baseQty = parseFloat(num) / parseFloat(den);
    } else {
      baseQty = parseFloat(qtyStr);
    }
    
    return { hasQuantity: true, baseQty, rest, original: ingredientStr };
  }
  
  return { hasQuantity: false, original: ingredientStr };
};

const determineCategory = (ingredientName) => {
  const lowerName = ingredientName.toLowerCase();
  for (const [key, category] of Object.entries(CATEGORY_MAP)) {
    if (lowerName.includes(key.toLowerCase())) {
      return category;
    }
  }
  return 'Miscellaneous'; // Default
};

/**
 * Generates a grouped grocery list from an array of meal objects
 * and scales quantities based on householdSize.
 */
export const generateGroceryList = async (meals, householdSize = 1) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Sim network

  const flatItems = [];
  
  meals.forEach(meal => {
    if (!meal.ingredients) return;
    
    meal.ingredients.forEach(ing => {
      const parsed = parseIngredient(ing);
      const category = determineCategory(parsed.hasQuantity ? parsed.rest : parsed.original);
      
      let scaledText = parsed.original;
      let scaledValue;
      
      if (parsed.hasQuantity) {
        scaledValue = parsed.baseQty * householdSize;
        // Format nicely (e.g., 1.5 instead of 1.500000000)
        let formattedValue = Number.isInteger(scaledValue) ? scaledValue : scaledValue.toFixed(1);
        scaledText = `${formattedValue} ${parsed.rest}`;
      } else if (householdSize > 1) {
        // Just append the multiplier if we couldn't parse a number
        scaledText = `${parsed.original} (x${householdSize})`;
      }

      flatItems.push({
        id: Math.random().toString(36).substr(2, 9),
        original: parsed.original,
        name: parsed.hasQuantity ? parsed.rest : parsed.original,
        scaledText,
        category,
        estimatedCost: Math.floor(Math.random() * 80) + 20, // ₹20 to ₹100 mock cost per item
        purchased: false,
        alreadyHave: false
      });
    });
  });

  // Group by category
  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = [];
    return acc;
  }, {});

  flatItems.forEach(item => {
    if (grouped[item.category]) {
      grouped[item.category].push(item);
    } else {
      grouped['Miscellaneous'].push(item);
    }
  });

  // Remove empty categories
  Object.keys(grouped).forEach(key => {
    if (grouped[key].length === 0) {
      delete grouped[key];
    }
  });

  const totalCost = flatItems.reduce((sum, item) => sum + (item.estimatedCost * householdSize), 0);

  return {
    items: grouped,
    totalItems: flatItems.length,
    estimatedCost: totalCost
  };
};
