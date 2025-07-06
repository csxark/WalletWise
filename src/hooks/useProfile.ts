import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  date_of_birth?: string;
  occupation?: string;
  monthly_income_target?: number;
  savings_goal?: number;
  preferred_currency: string;
  notification_preferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  is_premium: boolean;
  premium_expires_at?: string;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          await createProfile();
          return;
        }
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([
          {
            id: user.id,
            email: user.email!,
            full_name: user.email!.split('@')[0],
            preferred_currency: 'INR',
            notification_preferences: {
              email: true,
              push: false,
              sms: false
            },
            is_premium: false
          }
        ])
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error creating profile:', error);
      setError('Failed to create profile');
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return;

    try {
      setError(null);

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return { data, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
      return { data: null, error };
    }
  };

  const upgradeToPremiun = async (expiresAt?: string) => {
    return updateProfile({
      is_premium: true,
      premium_expires_at: expiresAt || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    });
  };

  const checkPremiumStatus = () => {
    if (!profile?.is_premium) return false;
    if (!profile.premium_expires_at) return true;
    return new Date(profile.premium_expires_at) > new Date();
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    upgradeToPremiun,
    isPremium: checkPremiumStatus(),
    createProfile
  };
};