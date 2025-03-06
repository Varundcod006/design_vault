/*
  # Create tables for DesignVault

  1. New Tables
    - `palettes`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
      - `colors` (text array)
      - `tags` (text array)
      - `likes` (integer)

    - `inspirations`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `designer` (text)
      - `tags` (text array)
      - `likes` (integer)

  2. Security
    - Enable RLS on both tables
    - Add policies for:
      - Public read access
      - Authenticated users can create
      - Users can only update/delete their own entries
*/

-- Create palettes table
CREATE TABLE IF NOT EXISTS palettes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL,
  colors text[] NOT NULL,
  tags text[] NOT NULL,
  likes integer DEFAULT 0
);

-- Create inspirations table
CREATE TABLE IF NOT EXISTS inspirations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  designer text NOT NULL,
  tags text[] NOT NULL,
  likes integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE palettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspirations ENABLE ROW LEVEL SECURITY;

-- Policies for palettes
CREATE POLICY "Palettes are viewable by everyone"
  ON palettes
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create palettes"
  ON palettes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own palettes"
  ON palettes
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own palettes"
  ON palettes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for inspirations
CREATE POLICY "Inspirations are viewable by everyone"
  ON inspirations
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create inspirations"
  ON inspirations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own inspirations"
  ON inspirations
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own inspirations"
  ON inspirations
  FOR DELETE
  USING (auth.uid() = user_id);