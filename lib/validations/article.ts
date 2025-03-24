import { z } from 'zod'
import { ArticleLanguage, ArticleStatus, ArticleTemplateType } from '../types/article'

export const createArticleSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
    content: z.string().min(1, 'Content is required'),
    meta_description: z.string().max(160, 'Meta description is too long').optional(),
    language: z.nativeEnum(ArticleLanguage),
    template_type: z.nativeEnum(ArticleTemplateType),
    keywords: z.array(z.string()).min(1, 'At least one keyword is required').max(10, 'Too many keywords')
})

export const updateArticleSchema = createArticleSchema.partial().extend({
    status: z.nativeEnum(ArticleStatus).optional()
})

export const listArticlesSchema = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
    status: z.nativeEnum(ArticleStatus).optional(),
    language: z.nativeEnum(ArticleLanguage).optional(),
    template_type: z.nativeEnum(ArticleTemplateType).optional()
})

export const generateArticleSchema = z.object({
    topic: z.string().min(1, 'Topic is required').max(200, 'Topic is too long'),
    keywords: z.array(z.string()).min(1, 'At least one keyword is required').max(10, 'Too many keywords'),
    language: z.nativeEnum(ArticleLanguage),
    template_type: z.nativeEnum(ArticleTemplateType)
}) 