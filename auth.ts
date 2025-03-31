import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismadb from "./lib/prisma"
import authConfig from "./auth.config"
import { getUserById } from "./app/lib/data"
import { DefaultSession } from "@auth/core/types"
import { User } from "@prisma/client"
import db from "@/lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession['user']
  }
}

function CustomPrismaAdapter(p: typeof prismadb) {
  return {
    ...PrismaAdapter(p),
    createUser: async (data: User) => {
      const role = await prismadb.role.findFirst({
        where: {
          roleName: "USER"
        }
      })
      const roleId = role.id;
      // delete (data.id)
      const newData = { ...data, roleId }

      return p.user.create({ data: newData })
    }
  }
}


export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id
        },
        data: { emailVerified: new Date() }
      })
    }

  },

  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role.roleName;
      // if (account) {
      //   token.accessToken = account.access_token
      //   token.id = profile.id
      // }
      return token;
    },
    async signIn({ user, account }) {

      const existingUser = await getUserById(user.id);
      if (account?.provider !== "credentials") {
        if (!existingUser) {
          return true;
        }
        if (!existingUser?.status) return false;
      }

      //Prevent sign in without email verification
      // if (!existingUser?.emailVerified) return false;
      // if (!existingUser?.status) return false;
      //TODO: 2 factor Check 
      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        if (token.role && session.user) {
          session.user.role = token.role as "ADMIN" | "USER" | "STAFF" | "MANAGER";
        }
      }
      return session
    }
  },
  adapter: CustomPrismaAdapter(prismadb),
  session: { strategy: "jwt" }
})
