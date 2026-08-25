"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { User, Session } from '@supabase/supabase-js';

export interface UserProfileData {
  fullName: string;
  firstName: string;
  email: string;
  age?: number;
  userId?: string;
  isEmailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfileData | null;
  isLoading: boolean;
  isDemoMode: boolean;
  isSupabaseConfigured: boolean;
  unverifiedEmail: string | null;
  setUnverifiedEmail: (email: string | null) => void;
  signUp: (fullName: string, email: string, password: string, age: number) => Promise<{ error: Error | null; isExistingUser?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  checkEmailVerified: () => Promise<boolean>;
  resendVerificationEmail: (email: string) => Promise<{ error: Error | null }>;
  enableDemoMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const metadata = currentUser.user_metadata || {};
        const fullName = metadata.full_name || metadata.first_name || 'Recovery Patient';
        
        setProfile({
          fullName,
          firstName: fullName.split(' ')[0],
          email: currentUser.email || '',
          age: metadata.age ? Number(metadata.age) : undefined,
          userId: currentUser.id,
          isEmailVerified: true
        });
      }
      setIsLoading(false);
    });

    // Listen to auth state changes (e.g. Google OAuth redirect callback)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const metadata = currentUser.user_metadata || {};
        const fullName = metadata.full_name || metadata.first_name || 'Recovery Patient';

        setProfile({
          fullName,
          firstName: fullName.split(' ')[0],
          email: currentUser.email || '',
          age: metadata.age ? Number(metadata.age) : undefined,
          userId: currentUser.id,
          isEmailVerified: true
        });
        setIsDemoMode(false);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      // Offline / Local Dev Mock Google Login
      const mockUser = {
        id: `user-google-${Date.now()}`,
        email: 'google.user@example.com',
        user_metadata: { full_name: 'Google User', first_name: 'Google' },
        email_confirmed_at: new Date().toISOString(),
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as unknown as User;

      setUser(mockUser);
      setProfile({
        fullName: 'Google User',
        firstName: 'Google',
        email: 'google.user@example.com',
        userId: mockUser.id,
        isEmailVerified: true
      });
      setIsDemoMode(false);
      return { error: null };
    }

    const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}` : undefined;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl
      }
    });

    return { error: error ? new Error(error.message) : null };
  };

  const signUp = async (fullName: string, email: string, password: string, age: number) => {
    if (!isSupabaseConfigured) {
      // Offline / Local Dev Mock Signup
      const mockUser = {
        id: `user-${Date.now()}`,
        email,
        user_metadata: { full_name: fullName, first_name: fullName.split(' ')[0], age },
        email_confirmed_at: new Date().toISOString(),
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as unknown as User;

      setUser(mockUser);
      setProfile({
        fullName,
        firstName: fullName.split(' ')[0],
        email,
        age,
        userId: mockUser.id,
        isEmailVerified: true
      });
      setIsDemoMode(false);
      return { error: null };
    }

    const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}` : undefined;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          first_name: fullName.split(' ')[0],
          age: age
        },
        emailRedirectTo: redirectUrl
      }
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes('already registered') || msg.includes('already exists') || msg.includes('user_already_exists')) {
        return { error: null, isExistingUser: true };
      }
      return { error: new Error(error.message) };
    }

    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return { error: null, isExistingUser: true };
    }

    if (data.user) {
      setUser(data.user);
      setProfile({
        fullName,
        firstName: fullName.split(' ')[0],
        email,
        age,
        userId: data.user.id,
        isEmailVerified: true
      });
      setIsDemoMode(false);
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      // Offline / Local Dev Mock Signin
      const mockUser = {
        id: `user-${Date.now()}`,
        email,
        user_metadata: { full_name: email.split('@')[0], first_name: email.split('@')[0] },
        email_confirmed_at: new Date().toISOString(),
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as unknown as User;

      setUser(mockUser);
      setProfile({
        fullName: email.split('@')[0],
        firstName: email.split('@')[0],
        email,
        userId: mockUser.id,
        isEmailVerified: true
      });
      setIsDemoMode(false);
      return { error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { error: new Error("Incorrect email or password. Please try again.") };
    }

    if (data.user) {
      const metadata = data.user.user_metadata || {};
      const fullName = metadata.full_name || metadata.first_name || 'Recovery Patient';

      setUser(data.user);
      setProfile({
        fullName,
        firstName: fullName.split(' ')[0],
        email: data.user.email || email,
        age: metadata.age ? Number(metadata.age) : undefined,
        userId: data.user.id,
        isEmailVerified: true
      });
      setIsDemoMode(false);
    }

    return { error: null };
  };

  const checkEmailVerified = async (): Promise<boolean> => {
    return true;
  };

  const resendVerificationEmail = async (_emailToResend: string) => {
    return { error: null };
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsDemoMode(false);
    setUnverifiedEmail(null);
  };

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured) {
      return { error: null };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}` : undefined,
    });
    return { error: error ? new Error(error.message) : null };
  };

  const enableDemoMode = () => {
    setIsDemoMode(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isDemoMode,
        isSupabaseConfigured,
        unverifiedEmail,
        setUnverifiedEmail,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        resetPassword,
        checkEmailVerified,
        resendVerificationEmail,
        enableDemoMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
