import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "邮箱登录",
      id: "email",
      credentials: {
        email: { label: "邮箱", type: "email", placeholder: "your@email.com" },
        code: { label: "验证码", type: "text", placeholder: "输入验证码" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null
        
        // 简单验证：验证码与邮箱对应（实际项目中需要更复杂的验证逻辑）
        // 这里仅作为演示，实际应该发送验证码到邮箱并验证
        if (credentials.code === "123456") {
          return {
            id: credentials.email,
            email: credentials.email,
            name: credentials.email.split("@")[0],
            image: null,
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
