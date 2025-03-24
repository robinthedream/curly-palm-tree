import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { ArticleLanguage, ArticleTemplateType } from '@/lib/types/article'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { topic, keywords, language, template_type } = await request.json()

        if (!topic || !keywords || !language || !template_type) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const prompt = `Generate 5 engaging titles for an article about "${topic}".
Keywords: ${keywords.join(', ')}
Language: ${language}
Article Type: ${template_type}

For each title, also provide a brief explanation of why it would be effective.

Format the response as a JSON array of objects with 'title' and 'description' properties.
Example:
[
    {
        "title": "Example Title",
        "description": "This title is effective because..."
    }
]`

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional content writer specializing in creating engaging article titles.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1000,
        })

        const response = completion.choices[0]?.message?.content
        if (!response) {
            throw new Error('No response from OpenAI')
        }

        const titles = JSON.parse(response)

        return NextResponse.json({ titles })
    } catch (error) {
        console.error('Error generating titles:', error)
        return NextResponse.json(
            { error: 'Failed to generate titles' },
            { status: 500 }
        )
    }
} 