import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GenerateArticleInput } from '@/lib/types/article'
import { InitialInput } from '@/components/articles/wizard/InitialInput'
import { TitleSelection } from '@/components/articles/wizard/TitleSelection'
import { OutlineEditor } from '@/components/articles/wizard/OutlineEditor'
import { ArticleEditor } from '@/components/articles/wizard/ArticleEditor'

const steps = [
    {
        title: 'Initial Input',
        description: 'Enter the topic and keywords for your article'
    },
    {
        title: 'Title Selection',
        description: 'Choose from AI-generated titles'
    },
    {
        title: 'Outline',
        description: 'Review and edit the article outline'
    },
    {
        title: 'Content',
        description: 'Generate and edit the article content'
    }
]

export function ArticleWizard() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<Partial<GenerateArticleInput>>({})

    const handleFormDataChange = (data: Partial<GenerateArticleInput>) => {
        setFormData(prev => ({ ...prev, ...data }))
    }

    const handleNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0))
    }

    const handleComplete = async (content: string) => {
        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.selected_title,
                    content,
                    meta_description: '', // TODO: Generate meta description
                    keywords: formData.keywords,
                    language: formData.language,
                    status: 'draft',
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create article')
            }

            const data = await response.json()
            router.push(`/articles/${data.id}`)
        } catch (err) {
            console.error('Failed to create article:', err)
            // TODO: Show error message to user
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            className={`flex flex-col items-center relative z-10 ${
                                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                            }`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                    index <= currentStep
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-300 bg-white'
                                }`}
                            >
                                {index < currentStep ? (
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <div className="text-sm mt-2">{step.title}</div>
                            <div className="text-xs text-gray-500">{step.description}</div>
                        </div>
                    ))}
                    {/* Progress Line */}
                    <div
                        className="absolute top-4 left-0 h-0.5 bg-gray-300"
                        style={{ width: '100%', zIndex: 0 }}
                    />
                    <div
                        className="absolute top-4 left-0 h-0.5 bg-blue-600 transition-all duration-300"
                        style={{
                            width: `${(currentStep / (steps.length - 1)) * 100}%`,
                            zIndex: 1,
                        }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <div className="mt-8">
                {currentStep === 0 && (
                    <InitialInput
                        formData={formData}
                        onChange={handleFormDataChange}
                        onNext={handleNext}
                    />
                )}
                {currentStep === 1 && (
                    <TitleSelection
                        formData={formData}
                        onChange={handleFormDataChange}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {currentStep === 2 && (
                    <OutlineEditor
                        formData={formData}
                        onChange={handleFormDataChange}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {currentStep === 3 && (
                    <ArticleEditor
                        formData={formData}
                        onBack={handleBack}
                        onComplete={handleComplete}
                    />
                )}
            </div>
        </div>
    )
} 