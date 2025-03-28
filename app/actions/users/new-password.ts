"use server"
import * as z from "zod"
import { NewPasswordSchema } from "@/schema"
import { getPasswordResetTokenByToken } from "@/app/lib/password-reset-token"
import { getUserByEmail } from "@/app/lib/data"
import bcrypt from "bcryptjs"
import db from "@/lib/prisma";

export const newPassword = async(
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
     
) => {
    if(!token) {
        return {error: "Token bị thiếu!"}
    }

    const validateFields = NewPasswordSchema.safeParse(values);
    if(!validateFields.success){
        return {error: "Mật khẩu không hợp lệ"}
    }

    const {password} = validateFields.data;
    const existingToken = await getPasswordResetTokenByToken(token);
    if(!existingToken) {
        return {error: "Token bị thiếu!"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if(hasExpired){
        return {error: "Token đã hết hạn"}
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return {error: "Email không tồn tại!"}
    }


    const {confirmPassword} = validateFields.data
    if (password !== confirmPassword) {
        return { error: "Xác nhận mật khẩu chưa chính xác!" }
      }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
        where: {id: existingUser.id},
        data: {password: hashedPassword},
    })

    await db.passwordResetToken.delete({
        where: {id: existingToken.id}
    });
    return {success: "Mật khẩu đã được cập nhật!"}
}