/**
 * Mock Grocery API
 * Mimics REST API for grocery list operations
 */
import { generateGroceryList as mockGenerateGroceryList } from './mocks/mockGroceryService';

export const getGroceryList = async (meals, userProfile) => {
  // In a real app, this might be a GET request to /api/groceries
  // But since we generate it on the fly from meals, it could be a POST to /api/groceries/generate
  // or just fetching the persisted list from backend
  return new Promise((resolve) => {
    try {
      // simulate network delay
      setTimeout(() => {
        const list = mockGenerateGroceryList(meals, userProfile);
        resolve(list);
      }, 800);
    } catch {
      // Return mock data for demo
      resolve([]);
    }
  });
};

export const updateGroceryItem = async (itemId, data) => {
  // In a real app, this would be an HTTP PATCH to /api/groceries/items/:itemId
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, itemId, data });
    }, 300);
  });
};
