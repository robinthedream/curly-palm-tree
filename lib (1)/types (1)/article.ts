export type TemplateType = 'short_form' | 'long_form' | 'long_form_pro';
export type ArticleStatus = 'draft' | 'published' | 'archived';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'nl';

export interface Article {
  id: string;
  user_id: string;
  title: string;
  content: string;
  meta_description: string | null;
  language: Language;
  template_type: TemplateType;
  keywords: string[];
  status: ArticleStatus;
  created_at: string;
  updated_at: string;
}

export interface ArticleInput {
  title: string;
  content: string;
  meta_description?: string;
  language: Language;
  template_type: TemplateType;
  keywords: string[];
  status?: ArticleStatus;
}

export interface GenerateArticleInput {
  topic: string;
  keywords: string[];
  language: Language;
  template_type: TemplateType;
}

export interface GenerateTitlesResponse {
  titles: string[];
}

export interface GenerateOutlineResponse {
  outline: string[];
}

export interface GenerateArticleResponse {
  title: string;
  content: string;
  meta_description: string;
} 