-- Create Articles table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    meta_description TEXT,
    language TEXT NOT NULL,
    template_type TEXT NOT NULL CHECK (template_type IN ('short_form', 'long_form', 'long_form_pro')),
    keywords TEXT[],
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can view own articles" ON public.articles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own articles" ON public.articles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own articles" ON public.articles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own articles" ON public.articles
    FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_articles_user_id ON public.articles(user_id);
CREATE INDEX idx_articles_created_at ON public.articles(created_at);
CREATE INDEX idx_articles_updated_at ON public.articles(updated_at);
CREATE INDEX idx_articles_status ON public.articles(status);
CREATE INDEX idx_articles_language ON public.articles(language);
CREATE INDEX idx_articles_template_type ON public.articles(template_type);

-- Add trigger for updated_at
CREATE TRIGGER handle_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at(); 