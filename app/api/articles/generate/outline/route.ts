import { NextResponse } from 'next/server'
import OpenAI from 'openai'
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

        const { topic, keywords, language, template_type, title } = await request.json()

        if (!topic || !keywords || !language || !template_type || !title) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const prompt = `Create a detailed outline for an article titled "${title}" about ${topic}.
Keywords to include: ${keywords.join(', ')}
Language: ${language}
Article Type: ${template_type}

The outline should be structured with main sections and subsections where appropriate.
Format the response as a JSON array of strings, where each string represents a section or subsection.
Use proper indentation with "-" for main sections and "  *" for subsections.

Example:
[
    "- Introduction",
    "  * Background",
    "  * Purpose of the article",
    "- Main Section 1",
    "  * Subsection 1.1",
    "  * Subsection 1.2"
]`

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional content writer specializing in creating well-structured article outlines.'
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

        const outline = JSON.parse(response)

        return NextResponse.json({ outline })
    } catch (error) {
        console.error('Error generating outline:', error)
        return NextResponse.json(
            { error: 'Failed to generate outline' },
            { status: 500 }
        )
    }
} 