import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Discord from "next-auth/providers/discord"
import NeonAdapter from "@auth/neon-adapter"
import { Pool } from "@neondatabase/serverless"
 
export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  return {
    adapter: NeonAdapter(pool),
    providers: [
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        allowDangerousEmailAccountLinking: true,
        authorization: {
          params: {
            scope: "repo read:user user:email",
          },
        },
      }),
      Discord({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        allowDangerousEmailAccountLinking: true,
        authorization: {
          params: {
            scope: "identify email guilds guilds.members.read messages.read",
          },
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async signIn({ user, account, profile }) {
        return true
      },
      jwt({ token, user, account }) {
        if (account) {
          token.accessToken = account.access_token
          token.provider = account.provider
        }
        if (user) {
          token.id = user.id
        }
        return token
      },
      session({ session, token }) {
        if (token && session.user) {
          session.accessToken = token.accessToken
          session.provider = token.provider
          session.user.id = token.id
        }
        return session
      },
    },
    pages: {
      signIn: "/login",
    },
  }
})
