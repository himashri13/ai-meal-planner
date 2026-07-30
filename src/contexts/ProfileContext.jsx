import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getProfile as apiGetProfile, updateProfile as apiUpdateProfile } from '../api/profileApi';
import { useAuth } from '../hooks/useAuth';

// eslint-disable-next-line react-refresh/only-export-components
export const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!isAuthenticated) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await apiGetProfile();
      setProfile(data);
    } catch (err) {
      console.error('Failed to fetch profile', err);
      setError('Failed to load profile.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (profileData) => {
    try {
      const updatedData = await apiUpdateProfile(profileData);
      setProfile(updatedData);
      return updatedData;
    } catch (err) {
      console.error('Failed to update profile', err);
      throw err;
    }
  }, []);

  const value = useMemo(() => ({
    profile,
    loading,
    error,
    updateProfile,
    refreshProfile: fetchProfile
  }), [profile, loading, error, updateProfile, fetchProfile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
