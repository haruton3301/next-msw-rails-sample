import { Session, User } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { CommonError } from "./errors/base"
import { authService } from "./services"

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new CommonError()
        }

        const { authHeaders, user } = await authService.signIn({
          email: credentials.email,
          password: credentials.password,
        })

        return {
          ...user,
          ...authHeaders,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token = { ...user }
      }

      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}
