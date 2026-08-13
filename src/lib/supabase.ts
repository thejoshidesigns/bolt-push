import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Video {
  id: string;
  title: string;
  description: string;
  embed_url: string | null;
  thumbnail_url: string | null;
  aspect_ratio: '9:16' | '16:9';
  category: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  orientation: 'portrait' | 'landscape';
  category: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SiteContent {
  key: string;
  value: string;
}
