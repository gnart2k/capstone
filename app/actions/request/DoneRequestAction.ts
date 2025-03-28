"use server"

import { isStaff } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";


export default async function DoneRequestAction({ requestId }: { requestId: number }) {

  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" }; ``
  }


  const foundRequest = await prismadb.request.findFirst({
    where: {
      id: +requestId,
      AND: {
        status: "confirmed",
      }
    }
  })

  if (!foundRequest) return { success: false, message: "Không tìm thấy yêu cầu" }

  await prismadb.request.update({
    where: {
      id: +requestId
    },
    data: {
      status: "complete",
    }
  })
  return { success: true, message: "Cập nhật trạng thái thành công" }
}
