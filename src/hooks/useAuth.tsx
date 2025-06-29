
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
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
      // Try to fetch from users table, handle gracefully if it doesn't exist
      const { data, error } = await supabase
        .from('users' as any)
        .select('*')
        .eq('auth_user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found is ok
        console.log('User profile table not available yet:', error);
        // Create a basic profile from auth user data
        setUserProfile({
          id: userId,
          email: user?.email || null,
          full_name: null,
          nationality: null,
          kyc_verified: false,
          is_admin: false
        });
        return;
      }
      
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Fallback profile
      setUserProfile({
        id: userId,
        email: user?.email || null,
        full_name: null,
        nationality: null,
        kyc_verified: false,
        is_admin: false
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
            fetchUserProfile(session.user.id);
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

    try {
      const { error } = await supabase
        .from('users' as any)
        .upsert({
          auth_user_id: user.id,
          email: user.email,
          ...updates,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      // Refresh profile
      await fetchUserProfile(user.id);
    } catch (error) {
      console.log('Profile update not available yet, storing locally');
      // Update local state as fallback
      setUserProfile(prev => prev ? { ...prev, ...updates } : null);
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
    isAdmin: userProfile?.is_admin || false
  };
};
