"use server"

import prismadb from "@/lib/prisma";

export async function replaceStaffOnRequest({ staffId, newStaffId, requestId }: { staffId: string, newStaffId: string, requestId: string }) {
  try {
    console.log('staff' + staffId)
    console.log('new' + newStaffId)
    console.log('request' + requestId)
    const data = await prismadb.requestOnStaff.updateMany({
      where: {
        staffId: staffId,
        requestId: +requestId
      },
      data: {
        staffId: newStaffId
      }
    });
    console.log(data)

    return { data: data, success: true, message: "Đổi nhân viên thành công" };
  } catch (error) {
    return { data: null, success: false, message: "Đổi nhân viên thất bại" }
  }


}
