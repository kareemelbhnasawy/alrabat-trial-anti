-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT,
    bio TEXT,
    image_url TEXT,
    category TEXT NOT NULL CHECK (category IN ('executive', 'division_head', 'other')),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public Read Access" ON public.team_members;
CREATE POLICY "Public Read Access" ON public.team_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for all users" ON public.team_members;
CREATE POLICY "Enable insert for all users" ON public.team_members FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all users" ON public.team_members;
CREATE POLICY "Enable update for all users" ON public.team_members FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for all users" ON public.team_members;
CREATE POLICY "Enable delete for all users" ON public.team_members FOR DELETE USING (true);

-- Insert Initial Data (Executive Leadership)
INSERT INTO public.team_members (name, role, email, image_url, bio, category, display_order) VALUES
(
    'Aman Lashin', 
    'Co-Founder & Managing Director', 
    'aman.lashin@alrabat.com',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80',
    'Driving strategic growth and operational excellence across the region with visionary leadership.',
    'executive',
    1
),
(
    'Mohamed Ahmed Ghalwash', 
    'Co-Founder & Chairman', 
    'mohamed.ghalwash@alrabat.com',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=500&q=80',
    'Leading the board with decades of industry expertise and a commitment to sustainable development.',
    'executive',
    2
),
(
    'Ibrahim Ghalwash', 
    'Board Member', 
    'ibrahim.ghalwash@alrabat.com',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80',
    'Overseeing corporate governance and strategic partnerships to ensure long-term value.',
    'executive',
    3
),
(
    'Hussein Ghalwash', 
    'Board Member', 
    'hussein.ghalwash@alrabat.com',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=500&q=80',
    'Focusing on innovation and market expansion to secure future opportunities.',
    'executive',
    4
);
