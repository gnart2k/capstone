import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google"
import { LoginSchema } from "./schema";
import { getUserByEmail } from "./app/lib/data";
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"

export default {
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          const validatedFields = LoginSchema.safeParse(credentials);
          if (validatedFields.success) {
            const { email, password } = validatedFields.data
            const user = await getUserByEmail(email)
            if (!user || !user.password) return null;
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (passwordMatch) return user
          }

          return null;

        } catch (error) {
          return null;
        }
      }
    })
  ]
} satisfies NextAuthConfig
