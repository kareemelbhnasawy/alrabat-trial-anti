-- 1. Create Storage Bucket for Icons
INSERT INTO storage.buckets (id, name, public) 
VALUES ('icons', 'icons', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Storage Policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'icons' );

DROP POLICY IF EXISTS "Public Insert" ON storage.objects;
CREATE POLICY "Public Insert" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'icons' );

DROP POLICY IF EXISTS "Public Update" ON storage.objects;
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'icons' );

DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'icons' );

-- 3. Table Policies (Add Write Access)
-- Qualifications Table
DROP POLICY IF EXISTS "Enable insert for all users" ON public.qualifications;
CREATE POLICY "Enable insert for all users" ON public.qualifications FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all users" ON public.qualifications;
CREATE POLICY "Enable update for all users" ON public.qualifications FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for all users" ON public.qualifications;
CREATE POLICY "Enable delete for all users" ON public.qualifications FOR DELETE USING (true);

-- Qualification Stats Table
DROP POLICY IF EXISTS "Enable insert for all users" ON public.qualification_stats;
CREATE POLICY "Enable insert for all users" ON public.qualification_stats FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all users" ON public.qualification_stats;
CREATE POLICY "Enable update for all users" ON public.qualification_stats FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for all users" ON public.qualification_stats;
CREATE POLICY "Enable delete for all users" ON public.qualification_stats FOR DELETE USING (true);

-- 4. Enable RLS (Should already be enabled, but good measure)
ALTER TABLE public.qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualification_stats ENABLE ROW LEVEL SECURITY;
