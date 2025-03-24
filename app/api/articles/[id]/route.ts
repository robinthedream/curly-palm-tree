import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/client'
import { UpdateArticleInput } from '@/lib/types/article'

// Get single article
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
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

        // Get the article
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('id', params.id)
            .eq('user_id', session.user.id)
            .single()

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            )
        }

        if (!data) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error getting article:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Update article
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
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
        const body: UpdateArticleInput = await request.json()

        // Update the article
        const { data, error } = await supabase
            .from('articles')
            .update(body)
            .eq('id', params.id)
            .eq('user_id', session.user.id)
            .select()
            .single()

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            )
        }

        if (!data) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error updating article:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Delete article
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
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

        // Delete the article
        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', params.id)
            .eq('user_id', session.user.id)

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting article:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 