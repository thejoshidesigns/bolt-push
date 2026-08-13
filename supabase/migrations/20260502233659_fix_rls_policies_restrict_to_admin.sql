/*
  # Fix RLS Policies — Remove Always-True Conditions

  ## Problem
  Nine RLS policies across four tables used `WITH CHECK (true)` or `USING (true)`,
  meaning any authenticated user (or anonymous user for contact_submissions) could
  perform write operations without restriction.

  ## Changes

  ### videos — INSERT / UPDATE / DELETE
  Replace `true` with an admin-role check so only the site owner (a user whose
  app_metadata contains `"role": "admin"`) can modify video records.

  ### gallery_images — INSERT / UPDATE / DELETE
  Same admin-role restriction applied.

  ### site_content — INSERT / UPDATE
  Same admin-role restriction applied.

  ### contact_submissions — INSERT (public)
  Replace always-true WITH CHECK with a data-validity check:
  - name must not be blank
  - email must contain '@' (basic format guard)
  - message must not be blank
  This preserves public form submission while preventing empty/garbage inserts.

  ## Security Notes
  - Admin check: `(auth.jwt()->'app_metadata'->>'role') = 'admin'`
    This reads the `role` field from the authenticated user's app_metadata,
    which can only be set server-side (not by the user themselves), making it
    safe for authorization.
  - The contact_submissions SELECT policy (`Authenticated users can view submissions`)
    already uses `USING (true)` scoped to `authenticated` — this is intentional
    (any logged-in admin can read submissions) and left unchanged since the
    admin check on the table's write policies is the critical fix.
    We additionally tighten it to require admin role for consistency.
*/

-- ============================================================
-- videos: drop and recreate write policies
-- ============================================================

DROP POLICY IF EXISTS "Authenticated users can insert videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can update videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON videos;

CREATE POLICY "Admin can insert videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "Admin can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  )
  WITH CHECK (
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "Admin can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

-- ============================================================
-- gallery_images: drop and recreate write policies
-- ============================================================

DROP POLICY IF EXISTS "Authenticated users can insert gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON gallery_images;

CREATE POLICY "Admin can insert gallery images"
  ON gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "Admin can update gallery images"
  ON gallery_images FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  )
  WITH CHECK (
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "Admin can delete gallery images"
  ON gallery_images FOR DELETE
  TO authenticated
  USING (
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

-- ============================================================
-- site_content: drop and recreate write policies
-- ============================================================

DROP POLICY IF EXISTS "Authenticated users can manage site content" ON site_content;
DROP POLICY IF EXISTS "Authenticated users can update site content" ON site_content;

CREATE POLICY "Admin can insert site content"
  ON site_content FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "Admin can update site content"
  ON site_content FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  )
  WITH CHECK (
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

-- ============================================================
-- contact_submissions: tighten INSERT and SELECT policies
-- ============================================================

DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON contact_submissions;

CREATE POLICY "Public can submit valid contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (
    name <> ''
    AND email LIKE '%@%'
    AND message <> ''
  );

CREATE POLICY "Admin can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );
