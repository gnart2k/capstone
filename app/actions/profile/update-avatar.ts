"use server"

import { auth } from "@/auth";
import prismadb from "@/lib/prisma"

export async function UpdateAvatar({ url }: { url: string }) {
  const session = await auth();
  if (!session?.user?.id) {
    return ({ success: false, message: "Cập nhật ảnh đại diện thất bại" })

  }

  try {

    const isSuccess = await prismadb.user.update({
      where: {
        id: session?.user.id
      },
      data: {
        image: url
      }
    })
    if (isSuccess) {
      return ({ success: true, message: "Cập nhật ảnh đại diện thành công" })
    } else {
      return ({ success: false, message: "Cập nhật ảnh đại diện thất bại" })
    }

  } catch (err) {
    console.error("Error updating user avatar: ", err)
    return ({ success: false, message: "Cập nhật ảnh đại diện thất bại" })
  }

}
