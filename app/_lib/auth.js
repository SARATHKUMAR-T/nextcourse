import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createGuest, getGuest } from "./data-service"
import Credentials from 'next-auth/providers/credentials'


const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await getGuest(credentials.email)
        if (!user) {
          throw new Error("User not found.")
        }
        return user
      },
    })
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user
    },
    async signIn({ user, account, profile }) {
      try {
        const exisistingGuest = await getGuest(user.email)
        if (!exisistingGuest) await createGuest({ email: user.email, fullName: user.name })
        return true
      } catch (error) {
        return false
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email)
      session.user.guestId = guest.id
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}


export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig)