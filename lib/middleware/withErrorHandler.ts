import { NextResponse } from 'next/server'

export class ApiError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 400,
        public data?: any
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

type ApiHandler = (request: Request, context: any) => Promise<NextResponse | Response>

export function withErrorHandler(handler: ApiHandler): ApiHandler {
    return async (request: Request, context: any) => {
        try {
            return await handler(request, context)
        } catch (error) {
            console.error('API Error:', error)

            if (error instanceof ApiError) {
                return NextResponse.json(
                    {
                        error: error.message,
                        data: error.data
                    },
                    { status: error.statusCode }
                )
            }

            return NextResponse.json(
                { error: 'Internal server error' },
                { status: 500 }
            )
        }
    }
} 