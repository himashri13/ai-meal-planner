/**
 * Mock Profile API
 * Mimics REST API for user profile
 */

export const getProfile = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const stored = localStorage.getItem('ai_meal_planner_profile');
        if (stored) {
          resolve(JSON.parse(stored));
        } else {
          resolve(null);
        }
      } catch (e) {
        reject(new Error('Failed to fetch profile'));
      }
    }, 500);
  });
};

export const updateProfile = async (profileData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        localStorage.setItem('ai_meal_planner_profile', JSON.stringify(profileData));
        resolve(profileData);
      } catch (e) {
        reject(new Error('Failed to update profile'));
      }
    }, 600);
  });
};

export const deleteProfile = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        localStorage.removeItem('ai_meal_planner_profile');
        resolve({ success: true });
      } catch (e) {
        reject(new Error('Failed to delete profile'));
      }
    }, 400);
  });
};
