import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from '../api/authApi';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const token = localStorage.getItem('ai_meal_planner_token');
    const storedUser = localStorage.getItem('ai_meal_planner_user');
    
    if (token && storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    const { token, user: userData } = await apiLogin(credentials);
    localStorage.setItem('ai_meal_planner_token', token);
    localStorage.setItem('ai_meal_planner_user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const signup = useCallback(async (userData) => {
    const { token, user: newUserData } = await apiSignup(userData);
    localStorage.setItem('ai_meal_planner_token', token);
    localStorage.setItem('ai_meal_planner_user', JSON.stringify(newUserData));
    setUser(newUserData);
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    localStorage.removeItem('ai_meal_planner_token');
    localStorage.removeItem('ai_meal_planner_user');
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout
  }), [user, loading, login, signup, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
