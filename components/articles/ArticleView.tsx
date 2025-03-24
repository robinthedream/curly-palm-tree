import { Article, ArticleStatus } from '@/lib/types/article'
import { formatDistanceToNow } from 'date-fns'

interface ArticleViewProps {
    article: Article
}

const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-red-100 text-red-800'
} as const

export function ArticleView({ article }: ArticleViewProps) {
    return (
        <article className="max-w-4xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl font-bold">{article.title}</h1>
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[article.status as ArticleStatus]}`}>
                        {article.status}
                    </span>
                </div>

                {article.meta_description && (
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        {article.meta_description}
                    </p>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{article.language.toUpperCase()}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(article.created_at))} ago</span>
                    <span>•</span>
                    <span>{article.template_type.replace('_', ' ')}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {article.keywords.map((keyword, index) => (
                        <span 
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                        >
                            {keyword}
                        </span>
                    ))}
                </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
                {article.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    Edit
                </button>
                <button className="px-4 py-2 text-red-600 hover:text-red-800">
                    Delete
                </button>
            </div>
        </article>
    )
} 