/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - password (text)
      - username (text)
      - created_at (timestamp)
    - games
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - image_url (text)
      - created_at (timestamp)
    - user_games
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - game_id (uuid, foreign key)
      - progress (integer)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  username text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read games"
  ON games
  FOR SELECT
  TO authenticated
  USING (true);

-- User Games table
CREATE TABLE IF NOT EXISTS user_games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  game_id uuid REFERENCES games(id),
  progress integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own game progress"
  ON user_games
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own game progress"
  ON user_games
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);