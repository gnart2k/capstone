"use server"
import * as z from "zod"
import prismadb from "@/lib/prisma";
import { ChangePasswordSchema } from "@/schema";
import bcrypt from "bcryptjs"
export const changePasswordAction = async (values: z.infer<typeof ChangePasswordSchema>) => {
  const validatedFields = ChangePasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại" }
  }

  const { oldPassword, newPassword, reNewPassword } = validatedFields.data

  if (newPassword !== reNewPassword) {
    return { error: "Xác nhận mật khẩu chưa chính xác! Vui lòng nhập lại" }
  }

  const existedUser = await prismadb.user.findFirst({ where: { id: validatedFields.data.id } })

  const passwordMatch = await bcrypt.compare(validatedFields.data.oldPassword, existedUser?.password.toString())
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  if (passwordMatch) {
    const user = await prismadb.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: validatedFields.data.id
      }
    });
    if (user) {
      return { success: "Cập nhật mật khẩu thành công" }
    }
  }
  return { error: "Có lỗi xảy ra, vui lòng thử lại" }

};

