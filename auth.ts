import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient, Role, User as PrismaUser } from "@prisma/client"
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth"
import github from "next-auth/providers/github"

const prisma = new PrismaClient()

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string
            role: Role
    } & DefaultSession["user"]
    }

    interface User extends PrismaUser {}
}

export const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [github],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.id = user.id
            }
            return token
        },
        session( {session, token }) {
            if (session.user) {
                session.user.role = token.role as Role
                session.user.id = token.id as string
            }
            return session
        }
}
}
 
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)