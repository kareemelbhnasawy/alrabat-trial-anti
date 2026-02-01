-- Create qualifications table
CREATE TABLE IF NOT EXISTS public.qualifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    authority TEXT NOT NULL,
    logo_url TEXT,
    fallback_icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create qualification_stats table
CREATE TABLE IF NOT EXISTS public.qualification_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    qualification_id UUID REFERENCES public.qualifications(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualification_stats ENABLE ROW LEVEL SECURITY;

-- Policies (Public read)
CREATE POLICY "Enable read access for all users" ON public.qualifications FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.qualification_stats FOR SELECT USING (true);

-- Insert Data
INSERT INTO public.qualifications (authority, fallback_icon_name) VALUES
('Dubai Municipality', 'Building2'),
('Trakhees', 'FileCheck'),
('RTA', 'ShieldCheck'),
('Dubai Development Authority', 'Landmark'),
('DEWA', 'Zap'),
('Nakheel', 'Award');

-- Insert Stats
-- Dubai Municipality
INSERT INTO public.qualification_stats (qualification_id, description, count, display_order)
SELECT id, 'Shoring & Piling Foundation Certified', 5, 1 FROM public.qualifications WHERE authority = 'Dubai Municipality';
INSERT INTO public.qualification_stats (qualification_id, description, count, display_order)
SELECT id, 'Water Supply Lines Certified', 2, 2 FROM public.qualifications WHERE authority = 'Dubai Municipality';
INSERT INTO public.qualification_stats (qualification_id, description, count, display_order)
SELECT id, 'Soil Improvement Qualified', 2, 3 FROM public.qualifications WHERE authority = 'Dubai Municipality';
INSERT INTO public.qualification_stats (qualification_id, description, count, display_order)
SELECT id, 'Sewerage & Pipelines Certified', 1, 4 FROM public.qualifications WHERE authority = 'Dubai Municipality';

-- Trakhees
INSERT INTO public.qualification_stats (qualification_id, description, count, display_order)
SELECT id, 'Qualified Safety Professionals', 5, 1 FROM public.qualifications WHERE authority = 'Trakhees';
INSERT INTO public.qualification_stats (qualification_id, description, count, display_order)
SELECT id, 'Qualified Quality Control Professionals', 2, 2 FROM public.qualifications WHERE authority = 'Trakhees';
INSERT INTO public.qualification_stats (qualification_id, description, count, display_order)
SELECT id, 'Qualified Structural Professionals', 2, 3 FROM public.qualifications WHERE authority = 'Trakhees';

-- RTA
INSERT INTO public.qualification_stats (qualification_id, description, count, display_order)
SELECT id, 'Approved Safety Professionals', 2, 1 FROM public.qualifications WHERE authority = 'RTA';
INSERT INTO public.qualification_stats (qualification_id, description, count, display_order)
SELECT id, 'Approved Shoring & Piling Professionals', 2, 2 FROM public.qualifications WHERE authority = 'RTA';

-- Dubai Development Authority
INSERT INTO public.qualification_stats (qualification_id, description, count, display_order)
SELECT id, 'Qualified Professionals', 5, 1 FROM public.qualifications WHERE authority = 'Dubai Development Authority';

-- DEWA
INSERT INTO public.qualification_stats (qualification_id, description, count, display_order)
SELECT id, 'Qualified Professionals', 2, 1 FROM public.qualifications WHERE authority = 'DEWA';

-- Nakheel
INSERT INTO public.qualification_stats (qualification_id, description, count, display_order)
SELECT id, 'Nakheel Qualification', 1, 1 FROM public.qualifications WHERE authority = 'Nakheel';
