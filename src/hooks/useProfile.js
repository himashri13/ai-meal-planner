import { useContext } from 'react';
import { ProfileContext } from '../contexts/ProfileContext';

/**
 * Custom hook to access the user's profile context.
 * 
 * Provides access to the current profile data, loading state,
 * and functions to update the profile or clear it.
 * 
 * @throws {Error} If used outside of a ProfileProvider.
 * @returns {{
 *   profile: Object|null,
 *   loading: boolean,
 *   updateProfile: Function,
 *   clearProfile: Function,
 *   hasCompletedOnboarding: boolean
 * }} The profile context value.
 */
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
