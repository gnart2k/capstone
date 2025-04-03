"use server";

import { generateRandomUsername } from "@/app/lib/generator";
import * as z from "zod"
import prismadb from "@/lib/prisma";
import { RegisterSchema } from "@/schema";
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/app/lib/data";

import { generateVerificationToken } from "@/app/lib/token";
import { sendVerificationEmail } from "@/app/lib/mail";

export const signUpAction = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại" }
  }

  const { email, password, comfirmPassword } = validatedFields.data

  if (password !== comfirmPassword) {
    return { error: "Xác nhận mật khẩu chưa chính xác! Vui lòng nhập lại" }
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email đã được sử dụng" }
  }

  const defaultName = generateRandomUsername();
  const defaultAvatar = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";
  const role = await prismadb.role.findFirst({
    where: {
      roleName: "USER"
    }
  })

  await prismadb.user.create({
    data: {
      email,
      name: defaultName,
      image: defaultAvatar,
      password: hashedPassword,
      role: {
        connect: {
          id: role.id
        }
      }
    },
  });

  try {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )
    return { success: "Đăng ký tài khoản thành công. Email xác nhận đã được gửi đi!" }
  } catch (err) {
    await prismadb.user.delete({
      where: {
        email: email
      }
    })


  }


};
