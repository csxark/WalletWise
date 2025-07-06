import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      expenses: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          category: string;
          description: string;
          date: string;
          type: 'expense' | 'income';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          category: string;
          description: string;
          date: string;
          type: 'expense' | 'income';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          category?: string;
          description?: string;
          date?: string;
          type?: 'expense' | 'income';
          created_at?: string;
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
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
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string;
          avatar_url?: string;
          phone?: string;
          date_of_birth?: string;
          occupation?: string;
          monthly_income_target?: number;
          savings_goal?: number;
          preferred_currency?: string;
          notification_preferences?: {
            email: boolean;
            push: boolean;
            sms: boolean;
          };
          is_premium?: boolean;
          premium_expires_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string;
          phone?: string;
          date_of_birth?: string;
          occupation?: string;
          monthly_income_target?: number;
          savings_goal?: number;
          preferred_currency?: string;
          notification_preferences?: {
            email: boolean;
            push: boolean;
            sms: boolean;
          };
          is_premium?: boolean;
          premium_expires_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};