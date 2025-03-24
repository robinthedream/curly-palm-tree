import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Article } from '@prisma/client'

interface CreateArticleBody {
    title: string
    content: string
    meta_description: string
    keywords: string[]
    language: string
    status: string
}

interface ArticleWithKeywords extends Omit<Article, 'keywords_string'> {
    keywords: string[]
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json() as CreateArticleBody

        const article = await prisma.article.create({
            data: {
                title: body.title,
                content: body.content,
                meta_description: body.meta_description,
                keywords_string: body.keywords.join(','),
                language: body.language,
                status: body.status,
                user_id: session.user.id,
            },
        })

        const articleWithKeywords: ArticleWithKeywords = {
            ...article,
            keywords: article.keywords_string.split(',').filter(Boolean),
        }

        return NextResponse.json(articleWithKeywords)
    } catch (error) {
        console.error('Error creating article:', error)
        return NextResponse.json(
            { error: 'Failed to create article' },
            { status: 500 }
        )
    }
}

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')

        const articles = await prisma.article.findMany({
            where: {
                user_id: session.user.id,
                ...(status ? { status } : {}),
            },
            orderBy: {
                created_at: 'desc',
            },
        })

        const transformedArticles: ArticleWithKeywords[] = articles.map(article => ({
            ...article,
            keywords: article.keywords_string.split(',').filter(Boolean),
        }))

        return NextResponse.json(transformedArticles)
    } catch (error) {
        console.error('Error fetching articles:', error)
        return NextResponse.json(
            { error: 'Failed to fetch articles' },
            { status: 500 }
        )
    }
} 