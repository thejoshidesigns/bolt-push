/*
  # Add PUGJI Logo and Appaji Avatar to gallery_images

  1. New Rows
    - PUGJI_LOGO.png — Branding & Identity, display_order 8
    - Appaji_Avatar_Draft_1.png — Character Design, display_order 9
*/

INSERT INTO gallery_images (title, category, image_url, display_order, is_published)
VALUES
  ('PUGJI Logo', 'Branding & Identity', '/PUGJI_LOGO.png', 8, true),
  ('Appaji Avatar Draft', 'Character Design', '/Appaji_Avatar_Draft_1.png', 9, true);