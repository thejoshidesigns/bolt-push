/*
  # THEJOSHIDESIGNS Portfolio Schema

  ## Overview
  Creates all tables needed for the portfolio website.

  ## New Tables

  ### videos
  Stores video showcase entries for both 9:16 and 16:9 video placeholders.
  - id: unique identifier
  - title: display title
  - description: short description
  - embed_url: YouTube or Vimeo embed URL (null = placeholder)
  - thumbnail_url: optional custom thumbnail
  - aspect_ratio: '9:16' or '16:9'
  - category: 'Kids Stories' | 'Cinematic & GenAI' | 'Branding Reels' | 'Feature Films' | 'Brand Campaigns' | 'Story Features'
  - display_order: controls sort position within category
  - is_published: whether to show on site

  ### gallery_images
  Stores the image gallery entries — seeded with the 5 uploaded images.
  - id: unique identifier
  - title: display title
  - image_url: path or full URL to image
  - orientation: 'portrait' or 'landscape'
  - category: work category label
  - display_order: sort order
  - is_published: whether to show on site

  ### contact_submissions
  Stores contact form submissions.
  - id, name, email, subject, message, created_at

  ### site_content
  Key-value store for editable text content.

  ## Security
  - RLS enabled on all tables
  - Public read access for videos, gallery_images, site_content (portfolio content is public)
  - Authenticated-only write (owner manages content)
  - contact_submissions: public insert, authenticated select
*/

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  embed_url text DEFAULT NULL,
  thumbnail_url text DEFAULT NULL,
  aspect_ratio text NOT NULL DEFAULT '16:9',
  category text NOT NULL DEFAULT 'Uncategorized',
  display_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published videos"
  ON videos FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can insert videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (true);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  orientation text NOT NULL DEFAULT 'landscape',
  category text NOT NULL DEFAULT 'General',
  display_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published gallery images"
  ON gallery_images FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can insert gallery images"
  ON gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery images"
  ON gallery_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery images"
  ON gallery_images FOR DELETE
  TO authenticated
  USING (true);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  subject text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- Site content key-value table
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
  ON site_content FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage site content"
  ON site_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update site content"
  ON site_content FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Seed videos: 10 x 9:16 placeholders
INSERT INTO videos (title, description, aspect_ratio, category, display_order, is_published) VALUES
  ('Kids Story 01', 'An enchanting animated adventure for young dreamers', '9:16', 'Kids Stories', 1, true),
  ('Kids Story 02', 'Colorful characters on a magical journey', '9:16', 'Kids Stories', 2, true),
  ('Kids Story 03', 'A bedtime tale brought to life with 3D Pixar-style animation', '9:16', 'Kids Stories', 3, true),
  ('Kids Story 04', 'Friendship, laughter, and wonder in every frame', '9:16', 'Kids Stories', 4, true),
  ('Cinematic Story 01', 'GenAI-powered cinematic reel with stunning visual language', '9:16', 'Cinematic & GenAI', 5, true),
  ('Cinematic Story 02', 'Exploring emotion through AI-generated motion', '9:16', 'Cinematic & GenAI', 6, true),
  ('Cinematic Story 03', 'Anime-inspired world-building with narrative depth', '9:16', 'Cinematic & GenAI', 7, true),
  ('Brand Reel 01', 'Dynamic brand identity reel for a product launch', '9:16', 'Branding Reels', 8, true),
  ('Brand Reel 02', 'Social-first campaign content with bold visual identity', '9:16', 'Branding Reels', 9, true),
  ('Brand Reel 03', 'Storytelling-driven brand narrative in vertical format', '9:16', 'Branding Reels', 10, true);

-- Seed videos: 3 x 16:9 placeholders
INSERT INTO videos (title, description, aspect_ratio, category, display_order, is_published) VALUES
  ('Cinematic Showcase', 'A full-length cinematic showcase demonstrating the full range of visual storytelling', '16:9', 'Feature Films', 1, true),
  ('Brand Campaign', 'Enterprise brand campaign — from concept to screen in 3D animated excellence', '16:9', 'Brand Campaigns', 2, true),
  ('Story Feature', 'A complete animated story feature, built with GenAI tools and cinematic craft', '16:9', 'Story Features', 3, true);

-- Seed gallery images with the uploaded files
INSERT INTO gallery_images (title, image_url, orientation, category, display_order, is_published) VALUES
  ('Character Design — Kids Story', '/_prompt_cute_202511281001_(1).jpeg', 'landscape', 'Kids Story Animation', 1, true),
  ('3D Cinematic — GenAI', '/Anime_Landscape.png', 'landscape', '3D Cinematic Animation', 2, true),
  ('Brand Identity — Bake My Way', '/ChatGPT_Image_Dec_2,_2025,_01_00_05_PM.png', 'landscape', 'Branding & Identity', 3, true),
  ('Studio Mockup — Streamline Studios', '/Create_the_profiles_202512041541.jpeg', 'portrait', 'Branding & Identity', 4, true);

-- Seed site content
INSERT INTO site_content (key, value) VALUES
  ('tagline', 'Video Producer · GenAI Animator · Creative Strategist'),
  ('bio', 'I craft immersive visual stories — from 3D Pixar-style kids animations to AI-powered cinematic reels and brand campaigns. Every frame is a world built with intention.'),
  ('stat_clients_individual', '10+'),
  ('stat_clients_enterprise', '15+'),
  ('stat_instagram', '24K'),
  ('availability', 'Open to Animation, GenAI, and Creative Projects'),
  ('location', 'Columbia, MO'),
  ('email', 'joshi@thejoshidesigns.com'),
  ('instagram_handle', '@thejoshidesigns'),
  ('instagram_url', 'https://www.instagram.com/thejoshidesigns')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
