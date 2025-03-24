import { ArticleLanguage, ArticleTemplateType, GenerateArticleInput } from '@/lib/types/article'
import { useState } from 'react'

interface InitialInputProps {
    formData: Partial<GenerateArticleInput>
    onChange: (data: Partial<GenerateArticleInput>) => void
    onNext: () => void
}

const templateDescriptions = {
    [ArticleTemplateType.ShortForm]: 'Brief, concise articles (500-800 words)',
    [ArticleTemplateType.LongForm]: 'Detailed articles (1000-1500 words)',
    [ArticleTemplateType.LongFormPro]: 'In-depth articles with advanced structure (2000+ words)'
}

export function InitialInput({ formData, onChange, onNext }: InitialInputProps) {
    const [keyword, setKeyword] = useState('')

    const addKeyword = () => {
        if (keyword.trim() && !formData.keywords?.includes(keyword.trim())) {
            onChange({
                keywords: [...(formData.keywords || []), keyword.trim()]
            })
            setKeyword('')
        }
    }

    const removeKeyword = (keywordToRemove: string) => {
        onChange({
            keywords: formData.keywords?.filter(k => k !== keywordToRemove)
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.topic && formData.keywords?.length) {
            onNext()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic Input */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Topic
                </label>
                <input
                    type="text"
                    value={formData.topic || ''}
                    onChange={e => onChange({ topic: e.target.value })}
                    placeholder="Enter your article topic"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    required
                />
            </div>

            {/* Keywords Input */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Keywords
                </label>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                        placeholder="Enter keywords"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                    <button
                        type="button"
                        onClick={addKeyword}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.keywords?.map(kw => (
                        <span
                            key={kw}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm flex items-center gap-2"
                        >
                            {kw}
                            <button
                                type="button"
                                onClick={() => removeKeyword(kw)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Language Selection */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Language
                </label>
                <select
                    value={formData.language}
                    onChange={e => onChange({ language: e.target.value as ArticleLanguage })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                    {Object.values(ArticleLanguage).map(lang => (
                        <option key={lang} value={lang}>
                            {lang.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>

            {/* Template Selection */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Template
                </label>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    {Object.values(ArticleTemplateType).map(template => (
                        <button
                            key={template}
                            type="button"
                            onClick={() => onChange({ template_type: template })}
                            className={`p-4 rounded-lg border text-left ${
                                formData.template_type === template
                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-300 dark:border-gray-700'
                            }`}
                        >
                            <div className="font-medium mb-1">
                                {template.split('_').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {templateDescriptions[template]}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    disabled={!formData.topic || !formData.keywords?.length}
                >
                    Next Step
                </button>
            </div>
        </form>
    )
} 