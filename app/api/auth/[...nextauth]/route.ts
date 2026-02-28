import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

console.log("GITHUB_ID:", process.env.GITHUB_ID)
console.log("GITHUB_SECRET loaded:", !!process.env.GITHUB_SECRET)
console.log("GITHUB_SECRET prefix:", process.env.GITHUB_SECRET?.slice(0, 10))

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: true,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
