import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { registerProfile } from './api';
import { Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  role: 'seeker' | 'provider' | 'admin';
  full_name: string;
  phone: string;
}

interface AuthContextType {
  session: Session | null;
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, phone: string, role: 'seeker' | 'provider') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!error && data) {
      setProfile(data as UserProfile);
    } else {
      setProfile(null);
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        setLoading(true);
        await fetchProfile(session.user.id);
        setLoading(false);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  };

  const signUp = async (email: string, password: string, fullName: string, phone: string, role: 'seeker' | 'provider') => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Kayıt başarısız oldu.');

    // Wait short delay to allow Auth trigger if any, then insert profile via API
    // The api /auth/register registers the profile bypass RLS using supabaseAdmin
    try {
      await registerProfile(data.session?.access_token || '', data.user.id, fullName, phone);
      // Wait for session and trigger profile fetch
      await fetchProfile(data.user.id);
    } catch (err: any) {
      // If profile already exists or failed, we try direct supabase insert as fallback
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          full_name: fullName,
          phone,
          role,
          consent_kvkk_at: new Date().toISOString()
        });
      
      if (profileError) {
        throw new Error(profileError.message);
      }

      if (role === 'provider') {
        const { error: provError } = await supabase
          .from('provider_profiles')
          .insert({ user_id: data.user.id });
        if (provError) console.error('Provider profile creation failed:', provError);
      }
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
