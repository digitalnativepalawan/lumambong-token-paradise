
import { useState, useEffect } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  nationality: string | null;
  kyc_verified: boolean | null;
  is_admin: boolean | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, nationality, kyc_verified, is_admin')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.log('User profile fetch error:', error);
      }

      if (data) {
        setUserProfile({
          id: data.id,
          email: data.email,
          full_name: data.full_name,
          nationality: data.nationality,
          kyc_verified: data.kyc_verified,
          is_admin: data.is_admin,
        });
        return;
      }

      // Fallback if no profile row exists yet
      setUserProfile({
        id: userId,
        email: user?.email || null,
        full_name: null,
        nationality: null,
        kyc_verified: false,
        is_admin: false,
      });
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setUserProfile({
        id: userId,
        email: user?.email || null,
        full_name: null,
        nationality: null,
        kyc_verified: false,
        is_admin: false,
      });
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserProfile(session.user.id);
      }

      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Defer profile fetch to avoid potential deadlocks
          setTimeout(() => {
            fetchUserProfile(session.user!.id);
          }, 0);
        } else {
          setUserProfile(null);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    // Only send allowed fields to the profiles table
    const payload: Partial<UserProfile> = {};
    if (typeof updates.full_name !== 'undefined') payload.full_name = updates.full_name;
    if (typeof updates.nationality !== 'undefined') payload.nationality = updates.nationality;
    if (typeof updates.kyc_verified !== 'undefined') payload.kyc_verified = updates.kyc_verified;
    if (typeof updates.email !== 'undefined') payload.email = updates.email;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      await fetchUserProfile(user.id);
    } catch (error) {
      console.log('Profile update failed, updating local state as fallback');
      setUserProfile(prev => prev ? { ...prev, ...payload } as UserProfile : prev);
    }
  };

  return {
    user,
    session,
    userProfile,
    loading,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
    isKYCVerified: userProfile?.kyc_verified || false,
    isAdmin: userProfile?.is_admin || false,
  };
};

