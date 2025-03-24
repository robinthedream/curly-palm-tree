import { Article, ArticleStatus } from '@/lib/types/article'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface ArticleCardProps {
    article: Article
}

const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-red-100 text-red-800'
} as const

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Link 
            href={`/articles/${article.id}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold line-clamp-2">
                        {article.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[article.status as ArticleStatus]}`}>
                        {article.status}
                    </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                    {article.meta_description || article.content.substring(0, 150)}...
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{article.language.toUpperCase()}</span>
                    <span>{formatDistanceToNow(new Date(article.created_at))} ago</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {article.keywords.slice(0, 3).map((keyword, index) => (
                        <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                        >
                            {keyword}
                        </span>
                    ))}
                    {article.keywords.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                            +{article.keywords.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
} 