import { 
  filterByAllergies, 
  filterByDiet, 
  filterByDislikedIngredients 
} from './mealFilterService';
import { scoreMeals } from './ai/recommendationEngine';
import { selectBestMeals, updateHistoryContext } from './ai/decisionEngine';
import { generateExplanations } from './ai/explanationEngine';
import { buildNutritionProfile } from './ai/nutritionProfileBuilder';
import { MEAL_DB } from './mockMealService'; // Import the db from there for now

/**
 * AI Personalization Service
 * Orchestrates the full AI pipeline:
 * Profile Parsing -> Hard Filtering -> Scoring -> Selection -> Explanation
 */
export const generateMealPlan = async (userProfile, mealGenerationOptions = {}) => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const preferences = userProfile?.preferences || {};
  const health = userProfile?.health || {};

  // 0. Build AI Nutrition Profile (Parse raw user data into targets & flags)
  const aiProfile = buildNutritionProfile(userProfile);

  // 1. Mandatory Filters (Hard Rules)
  // Strict rules: Allergies, Food Preferences, Dislikes.
  let safeMeals = [...MEAL_DB];
  safeMeals = filterByAllergies(safeMeals, aiProfile.hardConstraints.excludedIngredients);
  safeMeals = filterByDiet(safeMeals, preferences.diet);

  // 2. Recommendation Engine (Scoring against precise AI Profile)
  const scoredMeals = scoreMeals(safeMeals, userProfile, mealGenerationOptions, aiProfile);

  // 3. Decision Engine (Selection & Variety)
  const selectedMeals = selectBestMeals(scoredMeals, mealGenerationOptions);

  // 4. Explanation Engine (Generating Reasoning)
  const explainedMeals = generateExplanations(selectedMeals, userProfile, mealGenerationOptions);

  // Record these in history automatically (in a real app, only record when actually accepted)
  explainedMeals.forEach(m => updateHistoryContext('accept', m.id));

  // Calculate Summary
  const summary = explainedMeals.reduce((acc, meal) => {
    acc.calories += meal.calories;
    acc.protein += meal.protein;
    acc.carbs += meal.carbs;
    acc.fat += meal.fat;
    acc.fiber += meal.fiber;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

  return { summary, meals: explainedMeals };
};
