/**
 * Mock Auth API
 * Mimics REST API for authentication
 */

export const login = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock validation
      if (credentials.email && credentials.password) {
        resolve({
          token: 'mock-jwt-token-12345',
          user: {
            id: 'u1',
            email: credentials.email,
            name: credentials.email.split('@')[0]
          }
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800);
  });
};

export const signup = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.email && userData.password) {
        resolve({
          token: 'mock-jwt-token-67890',
          user: {
            id: 'u2',
            email: userData.email,
            name: userData.fullName || userData.email.split('@')[0]
          }
        });
      } else {
        reject(new Error('Invalid user data'));
      }
    }, 800);
  });
};

export const logout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 400);
  });
};
