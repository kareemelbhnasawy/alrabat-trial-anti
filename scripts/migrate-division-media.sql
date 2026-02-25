-- Division hero image overrides managed from Admin Dashboard.
CREATE TABLE IF NOT EXISTS public.division_media (
  slug TEXT PRIMARY KEY,
  hero_image_url TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.division_media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.division_media;
CREATE POLICY "Enable read access for all users"
ON public.division_media FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for all users" ON public.division_media;
CREATE POLICY "Enable insert for all users"
ON public.division_media FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all users" ON public.division_media;
CREATE POLICY "Enable update for all users"
ON public.division_media FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for all users" ON public.division_media;
CREATE POLICY "Enable delete for all users"
ON public.division_media FOR DELETE USING (true);
