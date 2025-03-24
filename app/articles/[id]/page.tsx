import { Suspense } from 'react'
import { createServerSupabaseClient } from '@/lib/supabase/client'
import { ArticleView } from '@/components/articles/ArticleView'
import { ArticleViewSkeleton } from '@/components/articles/ArticleViewSkeleton'
import { notFound } from 'next/navigation'

async function getArticle(id: string) {
    const supabase = createServerSupabaseClient()
    
    const { data: article, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !article) {
        notFound()
    }

    return article
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
    const article = await getArticle(params.id)

    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<ArticleViewSkeleton />}>
                <ArticleView article={article} />
            </Suspense>
        </div>
    )
} 