/**
 * Recommendation Engine
 * Responsible solely for scoring meals based on a priority hierarchy.
 * Output: Assigns a `confidenceScore` (0-100) to each meal.
 */

const getHistoryContext = () => {
  try {
    const history = localStorage.getItem('mealHistory');
    return history ? JSON.parse(history) : { accepted: [], replaced: [] };
  } catch {
    return { accepted: [], replaced: [] };
  }
};

export const scoreMeals = (meals, userProfile, options, aiProfile) => {
  const goal = userProfile?.lifestyle?.goal;
  const history = getHistoryContext();
  
  // Daily targets per meal (assuming roughly 3 meals)
  const mealsPerDay = options.mealsPerDay || 3;
  const targetCaloriesPerMeal = aiProfile ? (aiProfile.targets.calories / mealsPerDay) : 600;
  const targetProteinPerMeal = aiProfile ? (aiProfile.targets.protein / mealsPerDay) : 20;

  return meals.map(meal => {
    let score = 50; // Base score
    const factors = [];

    // --- Highest Priority: Goal & Macros (Up to 25 points) ---
    // Perfect match if within 20% of target
    const calDiff = Math.abs(meal.calories - targetCaloriesPerMeal) / targetCaloriesPerMeal;
    const proteinDiff = Math.abs(meal.protein - targetProteinPerMeal) / targetProteinPerMeal;
    
    if (calDiff < 0.2) {
      score += 15;
      factors.push('perfect_calories');
    } else if (calDiff < 0.4) {
      score += 5;
    }

    if (proteinDiff < 0.2 || (meal.protein > targetProteinPerMeal && goal.includes('gain'))) {
      score += 10;
      factors.push('perfect_protein');
    }
    if (goal === 'muscle_gain' || goal === 'weight_gain') {
      if (meal.protein > 20) {
        score += 15;
        factors.push('high_protein');
      }
      if (meal.calories > 400) {
        score += 10;
        factors.push('high_calorie');
      }
    } else if (goal === 'weight_loss') {
      if (meal.calories < 400) {
        score += 15;
        factors.push('low_calorie');
      }
      if (meal.protein > 15) {
        score += 10;
        factors.push('good_protein');
      }
    } else {
      if (meal.fiber > 5) {
        score += 12;
        factors.push('high_fiber');
      }
      if (meal.protein > 15) {
        score += 13;
        factors.push('good_protein');
      }
    }

    // --- Medium Priority: Cooking Time & Cuisine (Up to 15 points) ---
    if (options?.cuisines && options.cuisines.length > 0) {
      const requestedCuisines = options.cuisines.map(c => c.toLowerCase());
      if (requestedCuisines.includes(meal.cuisine?.toLowerCase())) {
        score += 10;
        factors.push('cuisine_match');
      }
    }

    if (options?.cookingTime && options.cookingTime !== 'unlimited') {
      const maxTime = parseInt(options.cookingTime, 10);
      const mealTime = parseInt(meal.prepTime?.replace(/\D/g, ''), 10) || 0;
      if (mealTime <= maxTime) {
        score += 5;
        factors.push('time_match');
      } else {
        score -= 20; // Heavy penalty for exceeding time limit
      }
    }

    // --- AI Profile Specific Flags ---
    if (aiProfile?.flags?.requiresEasyPrep) {
      if (meal.difficulty === 'Easy') {
        score += 15;
        factors.push('easy_prep');
      } else if (meal.difficulty === 'Hard') {
        score -= 15;
      }
    }

    if (aiProfile?.flags?.requiresBudgetFriendly && meal.ingredients.length > 8) {
      score -= 10; // Penalize overly complex meals if budget is tight
    }

    // --- Lower Priority: User History (Up to 10 points) ---
    if (history.accepted.includes(meal.id)) {
      score += 10;
      factors.push('history_accepted');
    }
    if (history.replaced.includes(meal.id)) {
      score -= 15;
      factors.push('history_rejected');
    }

    // Normalize score to 0-100
    const finalScore = Math.max(0, Math.min(100, score));

    return {
      ...meal,
      confidenceScore: finalScore,
      scoreFactors: factors
    };
  });
};
