import { NextResponse } from 'next/server'
import { z } from 'zod'
import { ApiError } from './withErrorHandler'

type ValidationConfig = {
    body?: z.ZodSchema
    query?: z.ZodSchema
    params?: z.ZodSchema
}

export function withValidation(config: ValidationConfig) {
    return function(handler: (request: Request, context: any) => Promise<Response>) {
        return async function(request: Request, context: { params: Record<string, string> }) {
            try {
                // Validate query parameters
                if (config.query) {
                    const url = new URL(request.url)
                    const queryParams: Record<string, any> = {}
                    
                    // Convert and store parameters
                    url.searchParams.forEach((value, key) => {
                        queryParams[key] = /^\d+$/.test(value) ? parseInt(value, 10) : value
                    })
                    
                    await config.query.parseAsync(queryParams)
                }

                // Validate request body
                if (config.body && !['GET', 'HEAD'].includes(request.method)) {
                    const clonedRequest = request.clone()
                    const body = await clonedRequest.json()
                    await config.body.parseAsync(body)
                }

                // Validate URL parameters
                if (config.params) {
                    await config.params.parseAsync(context.params)
                }

                return handler(request, context)
            } catch (error) {
                if (error instanceof z.ZodError) {
                    throw new ApiError('Validation error', 400, {
                        errors: error.errors.map(err => ({
                            path: err.path.join('.'),
                            message: err.message
                        }))
                    })
                }
                throw error
            }
        }
    }
} 