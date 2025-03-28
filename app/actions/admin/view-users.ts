"use server"
import prisma_db from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isAdmin } from "@/app/lib/checkPermittedRole";


export async function getAllUsers() {

  const isPermitted = await isAdmin();
  if (!isPermitted) {
    return { success: false, data: new Array(), error: "Bạn không có quyền xem tất cả người dùng của hệ thống" }; ``
  }
  const session = await auth();
  const currentUserEmail = session?.user?.email;

  const data = await prisma_db.user.findMany({
    where: {
      NOT: {
        email: currentUserEmail
      }
    },
    include: {
      role: true
    }
  });

  return { data: data, success: true };

  

}
