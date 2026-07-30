import { useState, useCallback } from 'react';
import { generateMealPlan as apiGenerateMealPlan, swapMeal as apiSwapMeal } from '../api/mealApi';

/**
 * Custom hook to manage the meal plan generation lifecycle.
 * 
 * Handles the state transitions between form input, loading, results, and errors.
 * Exposes methods to generate new plans, swap individual meals, and reset the generator.
 * 
 * @param {Object} userProfile - The current user's profile containing health and preference data.
 * @returns {{
 *   results: Object|null,
 *   generationState: 'form'|'loading'|'results'|'error',
 *   error: string|null,
 *   generatePlan: Function,
 *   swapMeal: Function,
 *   resetGenerator: Function
 * }} The meal plan state and mutation functions.
 */
export const useMealPlan = (userProfile) => {
  const [results, setResults] = useState(null);
  const [generationState, setGenerationState] = useState('form'); // 'form' | 'loading' | 'results' | 'error'
  const [error, setError] = useState(null);

  const generatePlan = useCallback(async (options) => {
    setGenerationState('loading');
    setError(null);
    try {
      // Save temp preferences
      localStorage.setItem('mealGenerationOptions', JSON.stringify(options));
      const generatedData = await apiGenerateMealPlan(userProfile, options);
      setResults(generatedData);
      setGenerationState('results');
    } catch (err) {
      console.error('Error generating meal plan', err);
      setError('Failed to generate meal plan.');
      setGenerationState('error');
    }
  }, [userProfile]);

  const swapMeal = useCallback(async (currentMeal, options) => {
    if (!userProfile) return;
    try {
      const newMeal = await apiSwapMeal(currentMeal, userProfile, options);
      
      setResults(prev => {
        if (!prev) return prev;
        
        const updatedMeals = prev.meals.map(m => m.id === currentMeal.id ? newMeal : m);
        
        // Recalculate summary
        const newSummary = updatedMeals.reduce((acc, m) => {
          acc.calories += m.calories;
          acc.protein += m.protein;
          acc.carbs += m.carbs;
          acc.fat += m.fat;
          acc.fiber += m.fiber;
          return acc;
        }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, water: prev.summary?.water || 0 });

        return { summary: newSummary, meals: updatedMeals };
      });
      return newMeal;
    } catch (err) {
      console.error('Failed to swap meal', err);
      throw err;
    }
  }, [userProfile]);

  const resetGenerator = useCallback(() => {
    setGenerationState('form');
    setResults(null);
    setError(null);
  }, []);

  return {
    results,
    generationState,
    error,
    generatePlan,
    swapMeal,
    resetGenerator
  };
};
