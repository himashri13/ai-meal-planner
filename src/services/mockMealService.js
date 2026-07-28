// Mock database of meals, heavily featuring regional Indian cuisines and deep metadata
export const MEAL_DB = [
  // Breakfasts
  { 
    id: "b1", time: "Breakfast", mealName: "Idli with Sambar", calories: 350, protein: 12, carbs: 65, fat: 4, fiber: 8, prepTime: "30 mins", difficulty: "Easy", cuisine: "South Indian", 
    tags: ["Vegetarian", "Vegan", "Gluten-Free"], 
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    sugar: "3g", sodium: "450mg", vitamins: { "Vitamin C": "15%", "Iron": "20%", "Calcium": "10%" },
    servingSize: "4 idlis + 1 cup sambar", equipment: ["Idli Steamer", "Pressure Cooker", "Pan"],
    healthBenefits: ["Fermented for gut health", "Low glycemic index", "Complete protein profile when combined"],
    suitableFor: ["Weight Loss", "Diabetes Friendly", "Post-Workout"],
    aiReasoning: "I chose this classic South Indian breakfast because it perfectly aligns with your request for a low-fat, high-fiber start to the day. The fermentation process makes it easy to digest, which is ideal based on your health profile.",
    ingredients: [
      "4 pieces fermented rice/lentil batter idlis",
      "1 cup toor dal (split pigeon peas)",
      "1/2 cup mixed vegetables (carrots, beans, drumsticks)",
      "2 tbsp sambar powder",
      "1 tsp tamarind paste"
    ],
    steps: [
      "Steam the idli batter in an idli maker for 10-12 minutes.",
      "Pressure cook the toor dal and vegetables until soft.",
      "In a pot, combine cooked dal, vegetables, sambar powder, and tamarind.",
      "Simmer for 10 minutes. Serve hot with idlis."
    ]
  },
  { id: "b2", time: "Breakfast", mealName: "Vegetable Poha", calories: 300, protein: 6, carbs: 55, fat: 5, fiber: 5, prepTime: "15 mins", difficulty: "Easy", cuisine: "Maharashtrian", tags: ["Vegetarian", "Vegan", "Quick"], image: "https://images.unsplash.com/photo-1601050690597-df0568f70950" },
  { id: "b3", time: "Breakfast", mealName: "Moong Dal Chilla", calories: 280, protein: 14, carbs: 40, fat: 6, fiber: 7, prepTime: "20 mins", difficulty: "Medium", cuisine: "North Indian", tags: ["Vegetarian", "High Protein", "Diabetes Friendly"], image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46" },
  { id: "b4", time: "Breakfast", mealName: "Ragi Dosa with Chutney", calories: 320, protein: 8, carbs: 60, fat: 7, fiber: 9, prepTime: "25 mins", difficulty: "Medium", cuisine: "South Indian", tags: ["Vegetarian", "High Fiber", "Gluten-Free"], image: "https://images.unsplash.com/photo-1601050690597-df0568f70950" },
  
  // Lunches
  { 
    id: "l1", time: "Lunch", mealName: "Rajma Chawal", calories: 450, protein: 18, carbs: 70, fat: 8, fiber: 14, prepTime: "40 mins", difficulty: "Medium", cuisine: "Punjabi", 
    tags: ["Vegetarian", "High Protein", "High Fiber"], 
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
    sugar: "5g", sodium: "600mg", vitamins: { "Iron": "35%", "Potassium": "25%", "Folate": "40%" },
    servingSize: "1 cup rajma + 1 cup rice", equipment: ["Pressure Cooker", "Deep Pan"],
    healthBenefits: ["Excellent source of plant-based protein", "High fiber for sustained energy", "Rich in essential minerals"],
    suitableFor: ["Muscle Building", "Heart Health", "Vegetarians"],
    aiReasoning: "Rajma Chawal provides an incredibly rich source of plant-based protein and complex carbohydrates. It was selected to ensure you have sustained energy throughout your afternoon without exceeding your budget constraint.",
    ingredients: [
      "1 cup cooked kidney beans (rajma)",
      "1 cup steamed basmati rice",
      "1 large onion, finely chopped",
      "2 tomatoes, pureed",
      "1 tsp garam masala",
      "1 tbsp ginger-garlic paste"
    ],
    steps: [
      "Sauté onions and ginger-garlic paste until golden.",
      "Add tomato puree and spices, cook until oil separates.",
      "Add cooked rajma and simmer for 15 minutes.",
      "Serve hot over steamed basmati rice."
    ]
  },
  { id: "l2", time: "Lunch", mealName: "Chicken Chettinad & Brown Rice", calories: 550, protein: 35, carbs: 60, fat: 15, fiber: 6, prepTime: "45 mins", difficulty: "Hard", cuisine: "Chettinad", tags: ["Non-Vegetarian", "High Protein", "Spicy"], image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d" },
  { id: "l3", time: "Lunch", mealName: "Millet Bisi Bele Bath", calories: 400, protein: 12, carbs: 65, fat: 10, fiber: 11, prepTime: "35 mins", difficulty: "Medium", cuisine: "Karnataka", tags: ["Vegetarian", "High Fiber", "Gluten-Free"], image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d" },
  { id: "l4", time: "Lunch", mealName: "Palak Paneer with Roti", calories: 480, protein: 22, carbs: 50, fat: 20, fiber: 8, prepTime: "30 mins", difficulty: "Medium", cuisine: "North Indian", tags: ["Vegetarian", "High Protein"], image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46" },
  
  // Dinners
  { id: "d1", time: "Dinner", mealName: "Chapati with Yellow Dal", calories: 400, protein: 16, carbs: 60, fat: 10, fiber: 12, prepTime: "25 mins", difficulty: "Easy", cuisine: "North Indian", tags: ["Vegetarian", "High Protein", "Quick"], image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46" },
  { id: "d2", time: "Dinner", mealName: "Fish Curry (Meen Moilee)", calories: 420, protein: 28, carbs: 15, fat: 25, fiber: 2, prepTime: "30 mins", difficulty: "Medium", cuisine: "Kerala", tags: ["Non-Vegetarian", "High Protein", "Low Carb"], image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d" },
  { id: "d3", time: "Dinner", mealName: "Vegetable Khichdi", calories: 350, protein: 10, carbs: 55, fat: 8, fiber: 7, prepTime: "20 mins", difficulty: "Easy", cuisine: "Gujarati", tags: ["Vegetarian", "Comfort Food", "Quick"], image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d" },
  { id: "d4", time: "Dinner", mealName: "Soya Chunk Sabzi with Jowar Roti", calories: 380, protein: 25, carbs: 45, fat: 9, fiber: 15, prepTime: "35 mins", difficulty: "Medium", cuisine: "Indian", tags: ["Vegetarian", "High Protein", "High Fiber"], image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46" },
  
  // Snacks
  { id: "s1", time: "Snack", mealName: "Fruit Chaat", calories: 150, protein: 2, carbs: 38, fat: 0, fiber: 6, prepTime: "10 mins", difficulty: "Easy", cuisine: "Indian", tags: ["Vegetarian", "Vegan", "Raw"], image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf" },
  { id: "s2", time: "Snack", mealName: "Roasted Makhana (Fox Nuts)", calories: 120, protein: 3, carbs: 20, fat: 3, fiber: 2, prepTime: "5 mins", difficulty: "Easy", cuisine: "Indian", tags: ["Vegetarian", "Low Calorie", "Quick"], image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf" },
  { id: "s3", time: "Snack", mealName: "Sprout Salad", calories: 180, protein: 12, carbs: 25, fat: 2, fiber: 8, prepTime: "15 mins", difficulty: "Easy", cuisine: "Indian", tags: ["Vegetarian", "High Protein", "Raw"], image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf" },
  { id: "s4", time: "Snack", mealName: "Masala Buttermilk (Chaas)", calories: 50, protein: 3, carbs: 5, fat: 2, fiber: 0, prepTime: "5 mins", difficulty: "Easy", cuisine: "Indian", tags: ["Vegetarian", "Low Calorie", "Hydrating"], image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf" },
];

/**
 * Simulates a backend AI generation process.
 */
export const generateMealPlan = async (preferences) => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const requestedMeals = preferences.mealsToInclude || ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  const plan = [];

  if (requestedMeals.includes('Breakfast')) plan.push(getRandomMeal('Breakfast'));
  if (requestedMeals.includes('Lunch')) plan.push(getRandomMeal('Lunch'));
  if (requestedMeals.includes('Dinner')) plan.push(getRandomMeal('Dinner'));
  if (requestedMeals.includes('Snacks')) plan.push(getRandomMeal('Snack'));

  const summary = plan.reduce((acc, meal) => {
    acc.calories += meal.calories;
    acc.protein += meal.protein;
    acc.carbs += meal.carbs;
    acc.fat += meal.fat;
    acc.fiber += meal.fiber;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

  summary.water = preferences.waterGoal || 2.5;

  return { summary, meals: plan };
};

export const swapMeal = async (currentMealId, timeSlot) => {
  await new Promise(resolve => setTimeout(resolve, 800)); 
  const availableMeals = MEAL_DB.filter(m => m.time === timeSlot && m.id !== currentMealId);
  if (availableMeals.length === 0) return MEAL_DB.find(m => m.time === timeSlot);
  return availableMeals[Math.floor(Math.random() * availableMeals.length)];
};

/**
 * Retrieves full detailed metadata for a specific meal ID.
 */
export const getMealById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Sim network
  
  // Find the exact meal or return a fallback
  const exactMeal = MEAL_DB.find(m => m.id === id);
  if (exactMeal && exactMeal.ingredients) {
    return exactMeal;
  }
  
  // If we queried a meal that doesn't have deep metadata in our mock DB yet, 
  // we'll safely polyfill it so the UI doesn't crash during testing.
  const baseMeal = exactMeal || MEAL_DB[0];
  
  return {
    ...baseMeal,
    sugar: "4g", 
    sodium: "350mg", 
    vitamins: { "Vitamin A": "15%", "Vitamin C": "20%" },
    servingSize: "1 Standard Portion", 
    equipment: ["Standard Kitchen Basics", "Pan"],
    healthBenefits: ["Provides essential nutrients", "Balanced macronutrient profile"],
    suitableFor: ["General Diet", "Healthy Eating"],
    aiReasoning: "This meal was selected to ensure you have a balanced intake of macronutrients while adhering to your specified cuisine preferences.",
    ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
    steps: ["Prepare ingredients.", "Cook thoroughly.", "Serve hot."]
  };
}

function getRandomMeal(timeSlot) {
  const options = MEAL_DB.filter(m => m.time === timeSlot);
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Returns a list of alternative meals for the replacement modal.
 */
export const getMealAlternatives = async (currentMealId, timeSlot, reason = 'surprise_me') => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Sim network
  
  // Filter meals for the same time slot, excluding the current meal
  let available = MEAL_DB.filter(m => m.time === timeSlot && m.id !== currentMealId);
  
  // Simulate intelligent filtering based on reason
  if (reason === 'need_more_protein') {
    available = available.sort((a, b) => b.protein - a.protein);
  } else if (reason === 'want_fewer_calories') {
    available = available.sort((a, b) => a.calories - b.calories);
  } else {
    // Just shuffle for other reasons in the mock
    available = available.sort(() => 0.5 - Math.random());
  }

  const alternatives = available.slice(0, 4);
  
  // Ensure we have some items (if DB is too small)
  if (alternatives.length === 0) return [];
  
  // Add dynamic reasoning to each based on the intent
  return alternatives.map(m => {
    let aiReasoning = "This is a great alternative because it maintains your nutritional goals.";
    if (reason === 'need_more_protein') {
      aiReasoning = `Better matches your protein goal by offering ${m.protein}g of protein while keeping calories balanced.`;
    } else if (reason === 'too_expensive') {
      aiReasoning = `More budget-friendly alternative that relies on affordable staples without compromising nutrition.`;
    } else if (reason === 'want_fewer_calories') {
      aiReasoning = `Lighter option containing only ${m.calories} calories, perfectly suited to your weight loss goals.`;
    } else if (reason === 'different_cuisine') {
      aiReasoning = `A delicious ${m.cuisine} dish that offers a totally different flavor profile for your ${timeSlot.toLowerCase()}.`;
    } else if (reason === 'too_much_cooking') {
      aiReasoning = `Faster to prepare, taking only ${m.prepTime}, making it perfect for a quick ${timeSlot.toLowerCase()}.`;
    }

    return {
      ...m,
      aiReplacementReasoning: aiReasoning
    };
  });
};
