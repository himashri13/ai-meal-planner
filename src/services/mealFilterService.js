/**
 * Safely normalizes text for comparison
 * @param {string} text 
 * @returns {string}
 */
const normalize = (text) => text?.toLowerCase().trim() || "";

/**
 * Filter 1: Strict Allergen Exclusion
 * Excludes any meal where ANY ingredient matches an allergen.
 * 
 * @param {Array} meals 
 * @param {Array} allergies 
 * @returns {Array} Filtered meals
 */
export const filterByAllergies = (meals, allergies) => {
  if (!allergies || allergies.length === 0 || allergies.includes('None')) return meals;

  const normalizedAllergies = allergies.map(normalize);

  return meals.filter(meal => {
    // If the meal doesn't have ingredients listed, we keep it just to not break the UI 
    // in the mock, but in production we'd want to drop it for safety.
    if (!meal.ingredients) return true;

    // Check if any ingredient contains any allergen
    const hasAllergen = meal.ingredients.some(ingredient => {
      const normIng = normalize(ingredient);
      return normalizedAllergies.some(allergen => normIng.includes(allergen));
    });

    return !hasAllergen; // Keep if it doesn't have the allergen
  });
};

/**
 * Filter 2: Food Preference (Diet) Exclusion
 * Excludes meals that violate the dietary preference.
 * 
 * @param {Array} meals 
 * @param {string} diet 
 * @returns {Array} Filtered meals
 */
export const filterByDiet = (meals, diet) => {
  if (!diet) return meals;
  
  // Example tag logic matching our MEAL_DB tags
  return meals.filter(meal => {
    const tags = (meal.tags || []).map(normalize);
    
    switch (diet) {
      case 'vegan':
        return tags.includes('vegan');
      case 'vegetarian':
        // Vegetarians eat dairy, so vegan is also fine
        return tags.includes('vegetarian') || tags.includes('vegan');
      case 'eggetarian':
        return tags.includes('vegetarian') || tags.includes('vegan') || tags.includes('eggetarian');
      case 'chicken_only':
        return tags.includes('chicken') || tags.includes('vegetarian'); // Assuming they eat veg + chicken
      case 'non_vegetarian':
      default:
        return true; // Eat everything
    }
  });
};

/**
 * Filter 3: Disliked Ingredients Avoidance
 * Avoids meals containing disliked ingredients.
 * 
 * @param {Array} meals 
 * @param {Array} dislikes 
 * @returns {Array} Filtered meals
 */
export const filterByDislikedIngredients = (meals, dislikes) => {
  if (!dislikes || dislikes.length === 0) return meals;

  const normalizedDislikes = dislikes.map(normalize);

  return meals.filter(meal => {
    if (!meal.ingredients) return true;

    const hasDisliked = meal.ingredients.some(ingredient => {
      const normIng = normalize(ingredient);
      return normalizedDislikes.some(dislike => normIng.includes(dislike));
    });

    return !hasDisliked;
  });
};

/**
 * Filter 4: Cooking Time Exclusion
 * Excludes meals that take longer than the max time.
 * 
 * @param {Array} meals 
 * @param {string|number} maxTime - e.g. "15", "30"
 * @returns {Array} Filtered meals
 */
export const filterByCookingTime = (meals, maxTime) => {
  if (!maxTime || maxTime === 'unlimited') return meals;

  const limit = parseInt(maxTime, 10);
  if (isNaN(limit)) return meals;

  return meals.filter(meal => {
    if (!meal.prepTime) return true;
    
    // Extract number from "30 mins"
    const timeVal = parseInt(meal.prepTime.replace(/\D/g, ''), 10);
    if (isNaN(timeVal)) return true;

    return timeVal <= limit;
  });
};

/**
 * Filter 5: Cuisine Prioritization (Sorting)
 * We don't exclude non-matching cuisines entirely because we need to ensure 
 * we have meals to serve, but we sort the matching cuisines to the top.
 * 
 * @param {Array} meals 
 * @param {Array} cuisines 
 * @returns {Array} Sorted meals
 */
export const prioritizeByCuisine = (meals, cuisines) => {
  if (!cuisines || cuisines.length === 0) return meals;

  const normalizedCuisines = cuisines.map(normalize);

  const prioritized = [...meals].sort((a, b) => {
    const aMatch = normalizedCuisines.includes(normalize(a.cuisine));
    const bMatch = normalizedCuisines.includes(normalize(b.cuisine));
    
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  return prioritized;
};
