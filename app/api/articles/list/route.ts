import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/client'

export async function GET(request: Request) {
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

        // Get query parameters
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const status = searchParams.get('status')
        const language = searchParams.get('language')
        const template_type = searchParams.get('template_type')

        // Calculate offset
        const offset = (page - 1) * limit

        // Build query
        let query = supabase
            .from('articles')
            .select('*', { count: 'exact' })
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        // Add filters if provided
        if (status) query = query.eq('status', status)
        if (language) query = query.eq('language', language)
        if (template_type) query = query.eq('template_type', template_type)

        // Execute query
        const { data, error, count } = await query

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json({
            data,
            metadata: {
                total: count || 0,
                page,
                limit,
                totalPages: count ? Math.ceil(count / limit) : 0
            }
        })
    } catch (error) {
        console.error('Error listing articles:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 