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

        const { topic, keywords, language, template_type, title, outline } = await request.json()

        if (!topic || !keywords || !language || !template_type || !title || !outline) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const prompt = `Write a comprehensive article with the following details:

Title: "${title}"
Topic: ${topic}
Keywords: ${keywords.join(', ')}
Language: ${language}
Article Type: ${template_type}

Outline:
${outline.join('\n')}

Please follow these guidelines:
1. Write in a professional, engaging style
2. Include all the sections from the outline
3. Naturally incorporate the keywords throughout the text
4. Use appropriate headings for sections (## for main sections, ### for subsections)
5. Write in Markdown format
6. Maintain consistency in tone and style
7. Include relevant examples and explanations
8. Conclude with a strong summary

The article should be well-researched, informative, and valuable to readers.`

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional content writer specializing in creating high-quality, engaging articles.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 4000,
        })

        const content = completion.choices[0]?.message?.content
        if (!content) {
            throw new Error('No response from OpenAI')
        }

        return NextResponse.json({ content })
    } catch (error) {
        console.error('Error generating content:', error)
        return NextResponse.json(
            { error: 'Failed to generate content' },
            { status: 500 }
        )
    }
} 