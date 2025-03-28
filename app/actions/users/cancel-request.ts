"use server"
import { isUser } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";

export async function cancelRequest({ requestId, isCanceled }: { requestId: number, isCanceled: boolean }) {
    const isPermitted = await isUser();
    if (!isPermitted) {
      return { error: "Bạn không có quyền thực hiện chức năng này" };``
    }
    let checkCanceled = isCanceled;
    const updatedRequest = await prismadb.request.update({
        where: {
            id: requestId
        },
        data: {
            status: checkCanceled ? "canceled" : "confirmed"

        },
        include: {
            user: true,
            staffs: true,
        },

    })
    const staffIds = updatedRequest.staffs.map(staff => staff.staffId);
    return { data: updatedRequest,
       staffIds: staffIds,
       userId: updatedRequest.user.id
        
     }
}