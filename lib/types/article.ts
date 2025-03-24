import { Database } from './supabase'

export type Article = Database['public']['Tables']['articles']['Row']

export enum ArticleTemplateType {
    ShortForm = 'short_form',
    LongForm = 'long_form',
    LongFormPro = 'long_form_pro'
}

export enum ArticleStatus {
    Draft = 'draft',
    InProgress = 'in_progress',
    Review = 'review',
    Published = 'published',
    Archived = 'archived'
}

export enum ArticleLanguage {
    EN = 'en',
    ES = 'es',
    FR = 'fr',
    DE = 'de',
    IT = 'it',
    PT = 'pt',
    NL = 'nl',
    PL = 'pl',
    RU = 'ru',
    JA = 'ja',
    ZH = 'zh',
    KO = 'ko'
}

export interface CreateArticleInput {
    title: string;
    content: string;
    meta_description?: string;
    language: ArticleLanguage;
    template_type: ArticleTemplateType;
    keywords: string[];
}

export interface UpdateArticleInput extends Partial<CreateArticleInput> {
    status?: ArticleStatus;
}

export interface GenerateArticleInput {
    topic: string;
    keywords: string[];
    language: ArticleLanguage;
    template_type: ArticleTemplateType;
    selected_title?: string;
    outline?: string[];
}

export interface GenerateTitlesResponse {
    titles: string[];
}

export interface GenerateOutlineResponse {
    sections: {
        title: string;
        subsections?: string[];
    }[];
}

export interface ArticleMetrics {
    wordCount: number;
    readingTime: number;
    keywordDensity: {
        [keyword: string]: number;
    };
    seoScore: number;
}

export interface GeneratedTitle {
    title: string;
    description: string;
} 