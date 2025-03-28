"use server";
import * as z from "zod";
import prismadb from "@/lib/prisma";
import { deleteUserSchema } from "@/schema";
import { isAdmin } from "@/app/lib/checkPermittedRole";

export const deleteUserAction = async (values: z.infer<typeof deleteUserSchema>) => {
  const isPermitted = await isAdmin();
  if (!isPermitted) {
    return { error: "Bạn không có quyền xóa người dùng này" };``
  }
  const validatedFields = deleteUserSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }

  const { id } = validatedFields.data;
  const foundUser = await prismadb.user.findFirst({
    where: { id: id },
  });

  if (foundUser) {
    const user = await prismadb.user.delete({
      where: {
        id: id,
      }
    });

    if (user) {
      return { success: "Xóa User thành công" };
    }
  }

  return { error: "Có lỗi xảy ra, vui lòng thử lại" };
}
