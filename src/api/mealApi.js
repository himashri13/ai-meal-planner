/**
 * Mock Meal API
 * Mimics REST API for meal generation and retrieval
 */
import { 
  generateMealPlan as mockGenerateMealPlan, 
  getMealAlternatives as mockGetMealAlternatives,
  swapMeal as mockSwapMeal
} from '../services/ai/aiPersonalizationService';
import { getMealById as mockGetMealById } from './mocks/mockMealService';

export const generateMealPlan = async (userProfile, options) => {
  // In a real app, this would be an HTTP POST request to /api/meals/generate
  // with body: { userProfile, options }
  return await mockGenerateMealPlan(userProfile, options);
};

export const getMealAlternatives = async (currentMeal, userProfile, options) => {
  // In a real app, this would be an HTTP POST request to /api/meals/alternatives
  // with body: { currentMeal, userProfile, options }
  return await mockGetMealAlternatives(currentMeal, userProfile, options);
};

export const swapMeal = async (currentMeal, userProfile, newMealOptions) => {
  // In a real app, this would be an HTTP POST request to /api/meals/swap
  return await mockSwapMeal(currentMeal, userProfile, newMealOptions);
};

export const getMealById = async (id) => {
  // In a real app, this would be an HTTP GET request to /api/meals/:id
  return await mockGetMealById(id);
};
