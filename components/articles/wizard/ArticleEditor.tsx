import { GenerateArticleInput } from '@/lib/types/article'
import { useState } from 'react'
import { Editor } from '@/components/editor/Editor'

interface ArticleEditorProps {
    formData: Partial<GenerateArticleInput>
    onBack: () => void
    onComplete: (content: string) => void
}

export function ArticleEditor({ formData, onBack, onComplete }: ArticleEditorProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [content, setContent] = useState('')

    const generateArticle = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch('/api/articles/generate/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic: formData.topic,
                    keywords: formData.keywords,
                    language: formData.language,
                    template_type: formData.template_type,
                    title: formData.selected_title,
                    outline: formData.outline,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate article')
            }

            const data = await response.json()
            setContent(data.content)
        } catch (err) {
            setError('Failed to generate article. Please try again.')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (content.trim()) {
            onComplete(content)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Edit Article Content</h3>
                <button
                    type="button"
                    onClick={generateArticle}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? 'Generating...' : 'Generate Article'}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                    {error}
                </div>
            )}

            <div className="h-[calc(100vh-300px)] min-h-[500px]">
                <Editor
                    value={content}
                    onChange={setContent}
                    disabled={isLoading}
                    placeholder="Your article content will appear here. You can edit it after generation."
                />
            </div>

            {isLoading && (
                <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                            Generating your article...
                        </p>
                    </div>
                </div>
            )}

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={!content.trim() || isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    Complete
                </button>
            </div>
        </form>
    )
} 