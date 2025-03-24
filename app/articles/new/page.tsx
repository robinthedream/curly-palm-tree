import { ArticleWizard } from '@/components/articles/ArticleWizard'

export default function NewArticlePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Create New Article</h1>
                <ArticleWizard />
            </div>
        </div>
    )
} 