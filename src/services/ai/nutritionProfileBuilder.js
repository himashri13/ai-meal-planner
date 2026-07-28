/**
 * Nutrition Profile Builder
 * Responsible for understanding the raw user profile and computing a precise AI Nutrition Profile.
 * This translates basic info, lifestyle constraints, and health conditions into strict targets and bounds.
 */

import { 
  calculateCalories, 
  calculateProteinTarget, 
  calculateWaterIntake 
} from '../recommendationService';

export const buildNutritionProfile = (userProfile) => {
  const { personalInfo, nutrition, preferences, health, lifestyle } = userProfile;

  // 1. Core Macro Computation
  const baseCalories = calculateCalories(
    personalInfo.age, personalInfo.gender, personalInfo.weight, 
    personalInfo.heightCm, lifestyle.activityLevel, lifestyle.goal
  );
  
  const baseProtein = calculateProteinTarget(personalInfo.weight, lifestyle.goal);
  const baseWater = calculateWaterIntake(personalInfo.weight, lifestyle.activityLevel);

  const aiProfile = {
    targets: {
      calories: baseCalories,
      protein: baseProtein,
      water: baseWater
    },
    flags: {
      requiresLowSodium: false,
      requiresLowSugar: false,
      requiresHighIron: false,
      requiresEasyPrep: false,
      requiresBudgetFriendly: false
    },
    hardConstraints: {
      excludedIngredients: [...health.allergies, ...(preferences.ingredientDislikes || [])]
    }
  };

  // 2. Health Condition Adjustments
  if (health.conditions && health.conditions.length > 0) {
    const conditions = health.conditions.map(c => c.toLowerCase());
    
    if (conditions.includes('diabetes') || conditions.includes('pcos')) {
      aiProfile.flags.requiresLowSugar = true;
      // Recommend slightly higher protein/fat to stabilize blood sugar
      aiProfile.targets.protein = Math.round(aiProfile.targets.protein * 1.1);
    }
    
    if (conditions.includes('high blood pressure')) {
      aiProfile.flags.requiresLowSodium = true;
    }

    if (conditions.includes('anemia')) {
      aiProfile.flags.requiresHighIron = true;
    }
  }

  // 3. Lifestyle & Cooking Adjustments
  if (lifestyle.type === 'Student (Hostel)' || lifestyle.cookingHabit === 'Hostel/Mess') {
    aiProfile.flags.requiresEasyPrep = true;
  }

  if (preferences.budget === 'Budget') {
    aiProfile.flags.requiresBudgetFriendly = true;
  }

  return aiProfile;
};
