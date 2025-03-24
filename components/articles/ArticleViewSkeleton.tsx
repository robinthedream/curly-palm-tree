export function ArticleViewSkeleton() {
    return (
        <div className="max-w-4xl mx-auto animate-pulse">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
                </div>

                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>

                <div className="flex items-center gap-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {[...Array(4)].map((_, i) => (
                        <div 
                            key={i}
                            className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"
                        ></div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                    <div 
                        key={i}
                        className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"
                    ></div>
                ))}
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
        </div>
    )
} 