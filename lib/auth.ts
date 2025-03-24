import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Test Account',
            credentials: {
                email: { label: "Email", type: "email" },
            },
            async authorize(credentials) {
                if (!credentials?.email) return null
                
                // Create or get user for testing
                const user = await prisma.user.upsert({
                    where: { email: credentials.email },
                    create: {
                        email: credentials.email,
                        name: 'Test User'
                    },
                    update: {}
                })

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.sub!
            }
            return session
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
} 