
export const MEAL_DB = [
  // Breakfasts
  { 
    id: "b1", time: "Breakfast", mealName: "Idli with Sambar", calories: 350, protein: 12, carbs: 65, fat: 4, fiber: 8, prepTime: "30 mins", difficulty: "Easy", cuisine: "South Indian", 
    tags: ["Vegetarian", "Vegan"], 
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    ingredients: ["Rice", "Toor Dal", "Mixed Vegetables", "Sambar Powder", "Tamarind", "Onion"]
  },
  { 
    id: "b2", time: "Breakfast", mealName: "Vegetable Poha", calories: 300, protein: 6, carbs: 55, fat: 5, fiber: 5, prepTime: "15 mins", difficulty: "Easy", cuisine: "Maharashtrian", 
    tags: ["Vegetarian", "Vegan"], 
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    ingredients: ["Flattened Rice", "Peanuts", "Onion", "Green Chilies", "Mustard Seeds", "Curry Leaves"]
  },
  { 
    id: "b3", time: "Breakfast", mealName: "Moong Dal Chilla", calories: 280, protein: 14, carbs: 40, fat: 6, fiber: 7, prepTime: "20 mins", difficulty: "Medium", cuisine: "North Indian", 
    tags: ["Vegetarian", "Vegan"], 
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46",
    ingredients: ["Moong Dal", "Onion", "Ginger", "Green Chilies", "Coriander"]
  },
  { 
    id: "b4", time: "Breakfast", mealName: "Ragi Dosa with Chutney", calories: 320, protein: 8, carbs: 60, fat: 7, fiber: 9, prepTime: "25 mins", difficulty: "Medium", cuisine: "South Indian", 
    tags: ["Vegetarian", "Vegan"], 
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    ingredients: ["Ragi Flour", "Urad Dal", "Coconut", "Green Chilies", "Mustard Seeds"]
  },
  { 
    id: "b5", time: "Breakfast", mealName: "Scrambled Eggs with Toast", calories: 350, protein: 20, carbs: 30, fat: 15, fiber: 4, prepTime: "10 mins", difficulty: "Easy", cuisine: "American", 
    tags: ["Eggetarian", "Non-Vegetarian"], 
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46",
    ingredients: ["Egg", "Bread", "Butter", "Milk", "Salt", "Pepper"]
  },
  
  // Lunches
  { 
    id: "l1", time: "Lunch", mealName: "Rajma Chawal", calories: 450, protein: 18, carbs: 70, fat: 8, fiber: 14, prepTime: "40 mins", difficulty: "Medium", cuisine: "North Indian", 
    tags: ["Vegetarian", "Vegan"], 
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
    ingredients: ["Kidney Beans", "Basmati Rice", "Onion", "Tomato", "Garlic", "Ginger"]
  },
  { 
    id: "l2", time: "Lunch", mealName: "Chicken Chettinad & Brown Rice", calories: 550, protein: 35, carbs: 60, fat: 15, fiber: 6, prepTime: "45 mins", difficulty: "Hard", cuisine: "South Indian", 
    tags: ["Non-Vegetarian", "Chicken"], 
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    ingredients: ["Chicken", "Brown Rice", "Coconut", "Onion", "Garlic", "Chettinad Spices"]
  },
  { 
    id: "l3", time: "Lunch", mealName: "Millet Bisi Bele Bath", calories: 400, protein: 12, carbs: 65, fat: 10, fiber: 11, prepTime: "35 mins", difficulty: "Medium", cuisine: "South Indian", 
    tags: ["Vegetarian", "Vegan"], 
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
    ingredients: ["Millets", "Toor Dal", "Carrot", "Beans", "Peanuts", "Tamarind"]
  },
  { 
    id: "l4", time: "Lunch", mealName: "Palak Paneer with Roti", calories: 480, protein: 22, carbs: 50, fat: 20, fiber: 8, prepTime: "30 mins", difficulty: "Medium", cuisine: "North Indian", 
    tags: ["Vegetarian"], 
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46",
    ingredients: ["Spinach", "Paneer", "Milk", "Wheat Flour", "Onion", "Garlic"]
  },
  { 
    id: "l5", time: "Lunch", mealName: "Grilled Salmon with Asparagus", calories: 420, protein: 34, carbs: 12, fat: 25, fiber: 6, prepTime: "25 mins", difficulty: "Medium", cuisine: "Mediterranean", 
    tags: ["Non-Vegetarian", "Fish"], 
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
    ingredients: ["Salmon Fish", "Asparagus", "Olive Oil", "Lemon", "Garlic"]
  },
  
  // Dinners
  { 
    id: "d1", time: "Dinner", mealName: "Chapati with Yellow Dal", calories: 400, protein: 16, carbs: 60, fat: 10, fiber: 12, prepTime: "25 mins", difficulty: "Easy", cuisine: "North Indian", 
    tags: ["Vegetarian", "Vegan"], 
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46",
    ingredients: ["Wheat Flour", "Moong Dal", "Onion", "Tomato", "Ghee", "Cumin"]
  },
  { 
    id: "d2", time: "Dinner", mealName: "Fish Curry (Meen Moilee)", calories: 420, protein: 28, carbs: 15, fat: 25, fiber: 2, prepTime: "30 mins", difficulty: "Medium", cuisine: "South Indian", 
    tags: ["Non-Vegetarian", "Fish"], 
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    ingredients: ["White Fish", "Coconut Milk", "Onion", "Green Chilies", "Ginger"]
  },
  { 
    id: "d3", time: "Dinner", mealName: "Vegetable Khichdi", calories: 350, protein: 10, carbs: 55, fat: 8, fiber: 7, prepTime: "20 mins", difficulty: "Easy", cuisine: "Indian", 
    tags: ["Vegetarian", "Vegan"], 
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
    ingredients: ["Rice", "Moong Dal", "Carrot", "Peas", "Ghee"]
  },
  { 
    id: "d4", time: "Dinner", mealName: "Tofu Stir Fry", calories: 380, protein: 25, carbs: 45, fat: 9, fiber: 15, prepTime: "15 mins", difficulty: "Easy", cuisine: "Asian", 
    tags: ["Vegetarian", "Vegan"], 
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46",
    ingredients: ["Tofu", "Soy Sauce", "Broccoli", "Bell Pepper", "Garlic"]
  },
  { 
    id: "d5", time: "Dinner", mealName: "Chicken Salad", calories: 320, protein: 30, carbs: 15, fat: 12, fiber: 5, prepTime: "10 mins", difficulty: "Easy", cuisine: "Mediterranean", 
    tags: ["Non-Vegetarian", "Chicken"], 
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46",
    ingredients: ["Chicken Breast", "Lettuce", "Tomato", "Cucumber", "Olive Oil"]
  },
  
  // Snacks
  { 
    id: "s1", time: "Snack", mealName: "Fruit Chaat", calories: 150, protein: 2, carbs: 38, fat: 0, fiber: 6, prepTime: "10 mins", difficulty: "Easy", cuisine: "Indian", 
    tags: ["Vegetarian", "Vegan"], 
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
    ingredients: ["Apple", "Banana", "Papaya", "Chaat Masala", "Lemon"]
  },
  { 
    id: "s2", time: "Snack", mealName: "Roasted Makhana", calories: 120, protein: 3, carbs: 20, fat: 3, fiber: 2, prepTime: "5 mins", difficulty: "Easy", cuisine: "Indian", 
    tags: ["Vegetarian", "Vegan"], 
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
    ingredients: ["Fox Nuts", "Ghee", "Salt", "Pepper"]
  },
  { 
    id: "s3", time: "Snack", mealName: "Sprout Salad", calories: 180, protein: 12, carbs: 25, fat: 2, fiber: 8, prepTime: "10 mins", difficulty: "Easy", cuisine: "Indian", 
    tags: ["Vegetarian", "Vegan"], 
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
    ingredients: ["Moong Sprouts", "Onion", "Tomato", "Coriander", "Lemon"]
  },
];

export const getMealById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500)); 
  const meal = MEAL_DB.find(m => m.id === id);
  if (meal) return meal;
  return MEAL_DB[0];
};
