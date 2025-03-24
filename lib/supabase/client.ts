import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

export const createServerSupabaseClient = () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
    }

    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    )
}

export const createClientSupabaseClient = () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }

    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
} 