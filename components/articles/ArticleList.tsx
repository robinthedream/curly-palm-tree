import { createServerSupabaseClient } from '@/lib/supabase/client'
import { Article } from '@/lib/types/article'
import { ArticleCard } from './ArticleCard'

async function getArticles() {
    const supabase = createServerSupabaseClient()
    
    const { data: articles, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

    if (error) throw error
    return articles
}

export default async function ArticleList() {
    const articles = await getArticles()

    if (!articles?.length) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Create your first article to get started
                </p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article: Article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    )
} 