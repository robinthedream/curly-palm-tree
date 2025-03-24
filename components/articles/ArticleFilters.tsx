import { ArticleLanguage, ArticleStatus, ArticleTemplateType } from '@/lib/types/article'

export function ArticleFilters() {
    return (
        <div className="flex flex-wrap gap-4 mb-8">
            <select
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                defaultValue=""
            >
                <option value="">All Status</option>
                {Object.values(ArticleStatus).map(status => (
                    <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                ))}
            </select>

            <select
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                defaultValue=""
            >
                <option value="">All Languages</option>
                {Object.values(ArticleLanguage).map(language => (
                    <option key={language} value={language}>
                        {language.toUpperCase()}
                    </option>
                ))}
            </select>

            <select
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                defaultValue=""
            >
                <option value="">All Templates</option>
                {Object.values(ArticleTemplateType).map(type => (
                    <option key={type} value={type}>
                        {type.split('_').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Search articles..."
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            />
        </div>
    )
} 