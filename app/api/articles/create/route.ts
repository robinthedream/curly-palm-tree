import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/client'
import { CreateArticleInput } from '@/lib/types/article'
import { withErrorHandler } from '@/lib/middleware/withErrorHandler'
import { withValidation } from '@/lib/middleware/withValidation'
import { createArticleSchema } from '@/lib/validations/article'

async function handler(request: Request) {
    const supabase = createServerSupabaseClient()
    
    // Get the current session
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    // Get the request body
    const body: CreateArticleInput = await request.json()

    // Insert the article
    const { data, error } = await supabase
        .from('articles')
        .insert({
            ...body,
            user_id: session.user.id,
        })
        .select()
        .single()

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }

    return NextResponse.json(data)
}

// Compose middlewares
export const POST = withErrorHandler(
    withValidation({ body: createArticleSchema })(handler)
) 