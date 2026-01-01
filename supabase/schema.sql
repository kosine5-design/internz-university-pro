-- Internz University Pro - Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'pro', 'elite')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  ai_interactions_used INTEGER DEFAULT 0,
  ai_interactions_reset_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COURSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  price_cents INTEGER,
  tier_required TEXT DEFAULT 'free' CHECK (tier_required IN ('free', 'basic', 'pro', 'elite')),
  thumbnail_url TEXT,
  preview_video_url TEXT,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LESSONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration_seconds INTEGER,
  order_index INTEGER NOT NULL,
  content_markdown TEXT,
  is_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, slug)
);

-- ============================================
-- USER PROGRESS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  progress_percent INTEGER DEFAULT 0,
  last_watched_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- ============================================
-- AI CONVERSATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_type TEXT NOT NULL CHECK (agent_type IN ('mix_advisor', 'beat_analyzer', 'vocal_producer', 'industry_mentor', 'curriculum_guide')),
  title TEXT,
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SOUND KITS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sound_kits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,
  tier_required TEXT DEFAULT 'basic' CHECK (tier_required IN ('free', 'basic', 'pro', 'elite')),
  download_url TEXT NOT NULL,
  preview_url TEXT,
  thumbnail_url TEXT,
  sample_count INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USER PURCHASES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_type TEXT NOT NULL CHECK (product_type IN ('course', 'sound_kit', 'subscription')),
  product_id UUID NOT NULL,
  stripe_payment_id TEXT,
  amount_cents INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COMMUNITY POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  title TEXT,
  content TEXT NOT NULL,
  attachment_url TEXT,
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- POST REPLIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS post_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_lesson_id ON community_posts(lesson_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sound_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_replies ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Everyone can view published courses
CREATE POLICY "Anyone can view published courses" ON courses
  FOR SELECT USING (published = true);

-- Everyone can view lessons of published courses
CREATE POLICY "Anyone can view lessons" ON lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses WHERE courses.id = lessons.course_id AND courses.published = true
    )
  );

-- Users can manage their own progress
CREATE POLICY "Users can manage own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id);

-- Users can manage their own AI conversations
CREATE POLICY "Users can manage own conversations" ON ai_conversations
  FOR ALL USING (auth.uid() = user_id);

-- Everyone can view published sound kits
CREATE POLICY "Anyone can view published sound kits" ON sound_kits
  FOR SELECT USING (published = true);

-- Users can view their own purchases
CREATE POLICY "Users can view own purchases" ON user_purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Anyone can view community posts
CREATE POLICY "Anyone can view posts" ON community_posts
  FOR SELECT USING (true);

-- Users can create their own posts
CREATE POLICY "Users can create posts" ON community_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own posts
CREATE POLICY "Users can update own posts" ON community_posts
  FOR UPDATE USING (auth.uid() = user_id);

-- Anyone can view replies
CREATE POLICY "Anyone can view replies" ON post_replies
  FOR SELECT USING (true);

-- Users can create replies
CREATE POLICY "Users can create replies" ON post_replies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_ai_conversations_updated_at
  BEFORE UPDATE ON ai_conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_community_posts_updated_at
  BEFORE UPDATE ON community_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED DATA - Sample Courses
-- ============================================

-- Beat Making Fundamentals
INSERT INTO courses (title, slug, description, long_description, price_cents, tier_required, published, featured, order_index)
VALUES (
  'Beat Making Fundamentals',
  'beat-making-fundamentals',
  'Master the foundations of beat production from scratch',
  'In this comprehensive course, you''ll learn everything from choosing the right DAW to creating your first professional-quality beat. Perfect for beginners who want to start their production journey.',
  19700,
  'free',
  true,
  true,
  1
);

-- Art of Arrangement
INSERT INTO courses (title, slug, description, long_description, price_cents, tier_required, published, featured, order_index)
VALUES (
  'The Art of Arrangement',
  'art-of-arrangement',
  'Learn how to structure songs that keep listeners engaged',
  'Discover the secrets behind hit song structures. Learn how to build tension, create drops, and arrange your tracks for maximum impact. Includes analysis of real platinum records.',
  29700,
  'basic',
  true,
  true,
  2
);

-- Industry Insider Secrets
INSERT INTO courses (title, slug, description, long_description, price_cents, tier_required, published, featured, order_index)
VALUES (
  'Industry Insider Secrets',
  'industry-insider-secrets',
  'Navigate the music business with insider knowledge',
  'From Grammy-nominated producer Kosine: Learn how to get placements, negotiate deals, build relationships, and create multiple income streams in the music industry.',
  49700,
  'pro',
  true,
  true,
  3
);

-- Complete Producer Blueprint
INSERT INTO courses (title, slug, description, long_description, price_cents, tier_required, published, order_index)
VALUES (
  'Complete Producer Blueprint',
  'complete-producer-blueprint',
  'The full curriculum: production, mixing, and business',
  'Everything you need to go from bedroom producer to professional. This bundle includes all courses plus exclusive masterclasses and behind-the-scenes sessions.',
  99700,
  'elite',
  true,
  4
);

-- Sample Sound Kits
INSERT INTO sound_kits (title, slug, description, price_cents, tier_required, download_url, sample_count, published)
VALUES
  ('Kosine Drum Kit Vol. 1', 'kosine-drums-v1', 'The same drums used on platinum records', 4900, 'basic', '/downloads/kosine-drums-v1.zip', 150, true),
  ('Flame Thrower 808s', 'flame-thrower-808s', 'Hard-hitting 808s for trap and hip-hop', 2900, 'basic', '/downloads/flame-808s.zip', 50, true),
  ('Sax Loops & One-Shots', 'sax-loops', 'Smooth saxophone loops and one-shots for R&B', 5900, 'pro', '/downloads/sax-loops.zip', 75, true);
