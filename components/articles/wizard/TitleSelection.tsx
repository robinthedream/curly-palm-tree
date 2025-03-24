import { GeneratedTitle, GenerateArticleInput } from '@/lib/types/article'
import { useState } from 'react'

interface TitleSelectionProps {
    formData: Partial<GenerateArticleInput>
    onChange: (data: Partial<GenerateArticleInput>) => void
    onNext: () => void
    onBack: () => void
}

export function TitleSelection({ formData, onChange, onNext, onBack }: TitleSelectionProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [titles, setTitles] = useState<GeneratedTitle[]>([])
    const [error, setError] = useState<string | null>(null)

    const generateTitles = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch('/api/articles/generate/titles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic: formData.topic,
                    keywords: formData.keywords,
                    language: formData.language,
                    template_type: formData.template_type,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate titles')
            }

            const data = await response.json()
            setTitles(data.titles)
        } catch (err) {
            setError('Failed to generate titles. Please try again.')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleTitleSelect = (title: string) => {
        onChange({ selected_title: title })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.selected_title) {
            onNext()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Select a Title</h3>
                <button
                    type="button"
                    onClick={generateTitles}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? 'Generating...' : 'Generate Titles'}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid gap-4">
                {titles.map((title, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleTitleSelect(title.title)}
                        className={`p-4 rounded-lg border text-left ${
                            formData.selected_title === title.title
                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-300 dark:border-gray-700'
                        }`}
                    >
                        <div className="font-medium mb-1">{title.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {title.description}
                        </div>
                    </button>
                ))}
            </div>

            {isLoading && (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                        </div>
                    ))}
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
                    disabled={!formData.selected_title}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    Next Step
                </button>
            </div>
        </form>
    )
} 