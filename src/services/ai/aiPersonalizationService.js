import { 
  filterByAllergies, 
  filterByDiet 
} from './mealFilterService';
import { scoreMeals } from './recommendationEngine';
import { selectBestMeals, updateHistoryContext } from './decisionEngine';
import { generateExplanations } from './explanationEngine';
import { buildNutritionProfile } from '../recommendationService';
import { MEAL_DB } from '../../api/mocks/mockMealService'; // Import the db from there for now

/**
 * AI Personalization Service
 * Orchestrates the full AI pipeline:
 * Profile Parsing -> Hard Filtering -> Scoring -> Selection -> Explanation
 */
export const generateMealPlan = async (userProfile, mealGenerationOptions = {}) => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const preferences = userProfile?.preferences || {};

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

export const swapMeal = async (currentMealId, timeSlot) => {
  await new Promise(resolve => setTimeout(resolve, 800)); 
  updateHistoryContext('replace', currentMealId);

  const availableMeals = MEAL_DB.filter(m => m.time === timeSlot && m.id !== currentMealId);
  if (availableMeals.length === 0) return MEAL_DB.find(m => m.time === timeSlot);
  return availableMeals[Math.floor(Math.random() * availableMeals.length)];
};

export const getMealAlternatives = async (currentMealId, timeSlot, reason = 'surprise_me', userProfile = {}, mealGenerationOptions = {}) => {
  await new Promise(resolve => setTimeout(resolve, 800)); 
  
  const preferences = userProfile?.preferences || {};
  const aiProfile = buildNutritionProfile(userProfile);

  let safeMeals = [...MEAL_DB];
  safeMeals = filterByAllergies(safeMeals, aiProfile.hardConstraints.excludedIngredients);
  safeMeals = filterByDiet(safeMeals, preferences.diet);
  
  let available = safeMeals.filter(m => m.time === timeSlot && m.id !== currentMealId);
  
  // Custom sorting based on reason
  if (reason === 'need_more_protein') {
    available = available.sort((a, b) => b.protein - a.protein);
  } else if (reason === 'want_fewer_calories') {
    available = available.sort((a, b) => a.calories - b.calories);
  } else {
    // For other reasons, score them properly using the engine, then sort by score
    const scored = scoreMeals(available, userProfile, mealGenerationOptions, aiProfile);
    available = scored.sort((a, b) => b.score - a.score);
  }

  // Fallback if empty
  if (available.length === 0) {
     available = MEAL_DB.filter(m => m.time === timeSlot && m.id !== currentMealId);
     available = available.sort(() => 0.5 - Math.random());
  }

  // Get single best alternative
  const topAlternative = available[0];
  
  let aiReasoning = ["Maintains your nutritional goals and dietary preferences."];
  if (reason === 'need_more_protein') aiReasoning = [`Strictly matches your profile while offering ${topAlternative.protein}g of protein.`];
  else if (reason === 'want_fewer_calories') aiReasoning = [`Strictly matches your profile with a lighter option of ${topAlternative.calories} calories.`];
  
  return { ...topAlternative, aiReasoning };
};
