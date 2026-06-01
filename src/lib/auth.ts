import { supabase } from './supabase';

export interface AuthUser {
  id: string;
  phone: string;
  accessToken: string;
}

export async function sendOtp(phone: string): Promise<void> {
  const normalized = phone.startsWith('+') ? phone : `+9${phone.replace(/^0/, '')}`;
  const { error } = await supabase.auth.signInWithOtp({ phone: normalized });
  if (error) throw new Error(error.message);
}

export async function verifyOtp(phone: string, token: string): Promise<AuthUser> {
  const normalized = phone.startsWith('+') ? phone : `+9${phone.replace(/^0/, '')}`;
  const { data, error } = await supabase.auth.verifyOtp({
    phone: normalized,
    token,
    type: 'sms',
  });
  if (error || !data.session) throw new Error(error?.message ?? 'Doğrulama başarısız.');
  return {
    id: data.session.user.id,
    phone: normalized,
    accessToken: data.session.access_token,
  };
}

export async function getSession(): Promise<AuthUser | null> {
  const { data } = await supabase.auth.getSession();
  if (!data.session) return null;
  return {
    id: data.session.user.id,
    phone: data.session.user.phone ?? '',
    accessToken: data.session.access_token,
  };
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}
