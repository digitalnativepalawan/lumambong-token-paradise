
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
}

interface UserProfile {
  email: string;
  full_name: string;
  nationality: 'ph' | 'foreign';
  kyc_verified: boolean;
  is_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isKYCVerified: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock admin user for frontend development
    const mockUser: User = {
      id: 'admin-123',
      email: 'admin@lumambong.com'
    };

    const mockProfile: UserProfile = {
      email: 'admin@lumambong.com',
      full_name: 'Admin User',
      nationality: 'ph',
      kyc_verified: true,
      is_admin: true
    };

    setUser(mockUser);
    setUserProfile(mockProfile);
  }, []);

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock sign up for frontend
      console.log('Mock sign up:', { email, password });
      // In real implementation, this would create a user
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock sign in for frontend
      console.log('Mock sign in:', { email, password });
      // In real implementation, this would authenticate user
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      // Mock sign out for frontend
      console.log('Mock sign out');
      // Keep user logged in for frontend development
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profile: Partial<UserProfile>) => {
    setIsLoading(true);
    try {
      // Mock profile update for frontend
      console.log('Mock profile update:', profile);
      if (userProfile) {
        setUserProfile({ ...userProfile, ...profile });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    userProfile,
    isAuthenticated: !!user,
    isKYCVerified: userProfile?.kyc_verified || false,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
