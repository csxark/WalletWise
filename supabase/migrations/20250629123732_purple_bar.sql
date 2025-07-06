/*
  # Create User Profiles Table

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique, not null)
      - `full_name` (text, optional)
      - `avatar_url` (text, optional)
      - `phone` (text, optional)
      - `date_of_birth` (date, optional)
      - `occupation` (text, optional)
      - `monthly_income_target` (numeric, default 0)
      - `savings_goal` (numeric, default 0)
      - `preferred_currency` (text, default 'INR')
      - `notification_preferences` (jsonb, default settings)
      - `is_premium` (boolean, default false)
      - `premium_expires_at` (timestamptz, optional)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policies for authenticated users to manage their own profiles

  3. Functions & Triggers
    - Function to handle new user registration
    - Function to update updated_at timestamp
    - Triggers for automatic profile creation and timestamp updates

  4. Indexes
    - Performance indexes on email, created_at, and is_premium columns
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  phone text,
  date_of_birth date,
  occupation text,
  monthly_income_target numeric(12,2) DEFAULT 0,
  savings_goal numeric(12,2) DEFAULT 0,
  preferred_currency text DEFAULT 'INR',
  notification_preferences jsonb DEFAULT '{"sms": false, "push": false, "email": true}'::jsonb,
  is_premium boolean DEFAULT false,
  premium_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
  DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
EXCEPTION
  WHEN undefined_object THEN
    NULL; -- Policy doesn't exist, continue
END $$;

-- Create RLS policies
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS user_profiles_email_idx ON user_profiles(email);
CREATE INDEX IF NOT EXISTS user_profiles_created_at_idx ON user_profiles(created_at);
CREATE INDEX IF NOT EXISTS user_profiles_is_premium_idx ON user_profiles(is_premium);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new user registration
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user();
  END IF;
END $$;

-- Create trigger for updating updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_user_profiles_updated_at
      BEFORE UPDATE ON user_profiles
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;