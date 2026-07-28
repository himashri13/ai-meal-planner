/**
 * Decision Engine
 * Responsible for taking scored meals, enforcing variety, and selecting the absolute best combination.
 */

// Helper to track and update history
export const updateHistoryContext = (action, mealId) => {
  try {
    const history = localStorage.getItem('mealHistory');
    let parsed = history ? JSON.parse(history) : { accepted: [], replaced: [] };
    
    if (action === 'accept') {
      parsed.accepted.push(mealId);
      // Keep only last 50
      if (parsed.accepted.length > 50) parsed.accepted.shift();
    } else if (action === 'replace') {
      parsed.replaced.push(mealId);
      if (parsed.replaced.length > 50) parsed.replaced.shift();
    }
    
    localStorage.setItem('mealHistory', JSON.stringify(parsed));
  } catch (e) {
    console.error("Failed to update history", e);
  }
};

export const selectBestMeals = (scoredMeals, options) => {
  const plan = [];
  const requestedMeals = options.mealsPerDay || 3;
  const timeSlots = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'].slice(0, requestedMeals);
  
  // Track selected proteins to enforce variety
  const selectedProteins = new Set();

  timeSlots.forEach(slot => {
    // 1. Filter by slot and sort by confidenceScore (descending)
    let slotMeals = scoredMeals
      .filter(m => m.time === slot)
      .sort((a, b) => b.confidenceScore - a.confidenceScore);

    if (slotMeals.length > 0) {
      
      // 2. Enforce Variety (Lower Priority factor)
      // Try to find a highly scored meal that doesn't use a protein we already selected today
      let selected = null;
      for (const meal of slotMeals) {
        // Simple heuristic: check if meal name implies a specific protein
        const proteinKeyword = ['chicken', 'fish', 'paneer', 'tofu', 'egg'].find(k => 
          meal.mealName.toLowerCase().includes(k) || (meal.ingredients && meal.ingredients.some(i => i.toLowerCase().includes(k)))
        );

        if (!proteinKeyword || !selectedProteins.has(proteinKeyword)) {
          selected = meal;
          if (proteinKeyword) selectedProteins.add(proteinKeyword);
          break; // Found our variety match
        }
      }

      // 3. Fallback if variety constraint is too strict
      if (!selected) {
        selected = slotMeals[0];
      }

      // Add to plan
      plan.push(selected);
    }
  });

  return plan;
};
