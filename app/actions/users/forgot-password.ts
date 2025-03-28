"use server"
import * as z from "zod";
import { ForgotPasswordSchema } from "@/schema";
import { getUserByEmail } from "@/app/lib/data";
import { sendPasswordResetEmail } from "@/app/lib/mail";
import { generatePasswordResetToken } from "@/app/lib/token";

export const forgotPasswordAction = async (values: z.infer<typeof ForgotPasswordSchema>) => {
  const validateFields = ForgotPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Email không chính xác! Xin nhập lại." }
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email không tồn tại!" }
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )
  return { success: "Mã xác nhận đã được gửi đi" }
}
