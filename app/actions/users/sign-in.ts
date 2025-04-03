"use server"

import { getUserByEmail } from "@/app/lib/data"
import { signIn } from "@/auth"
import { LoginSchema } from "@/schema"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import * as z from "zod"
import bcrypt from "bcryptjs"

import { generateVerificationToken } from "@/app/lib/token"
import { sendVerificationEmail } from "@/app/lib/mail"


export const signInAction = async (values: z.infer<typeof LoginSchema>) => {
  const validtedFields = LoginSchema.safeParse(values)

  if (!validtedFields.success) {
    return { error: "Có lỗi, vui lòng thử lại sau" }
  }
  const { email, password } = validtedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Tài khoản chưa được đăng ký!" };
  }

  if (!existingUser.status) {
    return { error: "Tài khoản của bạn đã bị vô hiệu hóa" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
    return { success: "Email xác nhận đã được gửi đi!" }
  };

  const existedUser = await getUserByEmail(email)

  if (!existedUser || !existedUser.password) return { error: "Tài khoản chưa được đăng ký" };
  const passwordMatch = await bcrypt.compare(password, existedUser.password)

  if (passwordMatch) {
    try {
      await signIn("credentials", {
        email, password, redirectTo: "/home"
      }).then(() =>
        redirect("/home")
      )
    } catch (err) {
      if (err instanceof AuthError) {
        if (err.type == 'CredentialsSignin') {
          redirect("/home")
        }
      }
      redirect("/home")
    }
  }
  return { error: "Sai mật khẩu. Vui lòng nhập lại!" }


}

