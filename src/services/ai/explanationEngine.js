/**
 * Explanation Engine
 * Responsible for generating clear, simple, bullet-point reasoning for meal selections.
 */

export const generateExplanations = (selectedMeals, userProfile, options) => {
  const goal = userProfile?.lifestyle?.goal;

  const goalDescriptions = {
    'muscle_gain': 'Supports your muscle gain goal',
    'weight_loss': 'Supports your weight-loss goal',
    'weight_gain': 'Helps hit your caloric surplus target',
    'maintain_weight': 'Keeps calories balanced'
  };

  return selectedMeals.map(meal => {
    const factors = meal.scoreFactors || [];
    const benefits = [];

    // 1. Goal & Macro Point
    if (factors.includes('perfect_calories')) {
      benefits.push(`Perfectly matches your strict calorie target`);
    } else if (factors.includes('perfect_protein')) {
      benefits.push(`Perfectly hits your AI protein target`);
    } else if (factors.includes('high_protein') || factors.includes('good_protein')) {
      benefits.push(`High in protein (${meal.protein}g)`);
    } else if (factors.includes('low_calorie')) {
      benefits.push(`Fits perfectly into your weight loss deficit`);
    } else {
      benefits.push(goalDescriptions[goal] || 'Aligns with your nutritional targets');
    }

    // 2. Cuisine Point
    if (factors.includes('cuisine_match')) {
      benefits.push(`Matches your craving for ${meal.cuisine} cuisine`);
    }

    // 3. Time Point
    if (factors.includes('time_match')) {
      benefits.push(`Fits your ${options.cookingTime}-minute cooking limit`);
    }
    
    // 3.5 AI Profile Points
    if (factors.includes('easy_prep')) {
      benefits.push(`Extremely easy to prepare for your lifestyle`);
    }

    // 4. History Point
    if (factors.includes('history_accepted')) {
      benefits.push(`One of your frequently enjoyed favorites`);
    }

    // Always include a generic one if we somehow missed all factors
    if (benefits.length === 0) {
      benefits.push(`Selected for its balanced nutritional profile`);
    }

    // Also explicitly add safety guarantees (User-First Guideline)
    benefits.push(`Safe for your dietary preferences`);

    return {
      ...meal,
      aiReasoning: benefits // Now an array of strings
    };
  });
};
