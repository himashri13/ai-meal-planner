export const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise, desk job' },
  { value: 'lightly_active', label: 'Lightly Active', description: 'Light exercise/sports 1-3 days/week' },
  { value: 'moderately_active', label: 'Moderately Active', description: 'Moderate exercise/sports 3-5 days/week' },
  { value: 'very_active', label: 'Very Active', description: 'Hard exercise/sports 6-7 days a week' },
];

export const GOALS = [
  { value: 'weight_loss', label: 'Weight Loss', description: 'Create a calorie deficit while maintaining balanced nutrition.' },
  { value: 'weight_gain', label: 'Weight Gain', description: 'Increase calories in a healthy and sustainable way.' },
  { value: 'maintain_weight', label: 'Maintain Weight', description: 'Keep your current weight with healthy eating habits.' },
  { value: 'muscle_gain', label: 'Muscle Gain', description: 'Increase protein intake and support muscle growth.' },
];

export const FOOD_PREFERENCES = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'eggetarian', label: 'Eggetarian' },
  { value: 'chicken_only', label: 'Chicken Only' },
  { value: 'non_vegetarian', label: 'Non-Vegetarian' },
];

export const ALLERGIES = [
  'Milk', 'Egg', 'Peanut', 'Tree Nuts', 'Soy', 'Wheat / Gluten', 
  'Fish', 'Shellfish', 'Sesame', 'None'
];

export const INGREDIENT_DISLIKES = [
  'Mushroom', 'Onion', 'Garlic', 'Broccoli', 'Brinjal', 'Tofu'
];

export const CUISINE_TYPES = [
  'Andhra', 'Telangana', 'Tamil', 'Kerala', 'Karnataka', 
  'North Indian', 'Gujarati', 'Punjabi', 'Bengali', 'Maharashtrian',
  'Italian', 'Chinese', 'Japanese', 'Mediterranean', 'Mexican'
];

export const COOKING_TIMES = [
  { value: '15', label: '<15 min' },
  { value: '30', label: '15–30 min' },
  { value: '60', label: '30–60 min' },
  { value: 'unlimited', label: 'No Preference' },
];

export const LIFESTYLES = [
  'Student (Hostel)', 'Working Professional', 'Living Alone', 'Couple', 
  'Family', 'Senior Citizen', 'Pregnant', 'Postpartum'
];

export const COOKING_HABITS = [
  'I cook daily', 'Occasionally cook', 'Hostel/Mess', 'Mostly order food', 'Have a cook'
];

export const BUDGETS = [
  'Budget', 'Moderate', 'Premium'
];

export const HEALTH_CONDITIONS = [
  'Diabetes', 'High Blood Pressure', 'PCOS', 'Thyroid', 
  'High Cholesterol', 'GERD', 'IBS', 'Anemia', 
  'Vitamin D Deficiency', 'Vitamin B12 Deficiency', 'None'
];
