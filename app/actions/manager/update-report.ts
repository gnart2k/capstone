"use server";
import * as z from "zod";
import prismadb from "@/lib/prisma";
import { updateReportStatusSchema } from "@/schema";
import { isManager } from "@/app/lib/checkPermittedRole";

export const updateReportStatusAction = async (values: z.infer<typeof updateReportStatusSchema>) => {
  const isPermitted = await isManager();
    if (!isPermitted) {
      return { error: "Bạn không có quyền thực hiện chức năng này" };
    }
    const validatedFields = updateReportStatusSchema.safeParse(values);
  
    if (!validatedFields.success) {
      return { error: "Có lỗi xảy ra, vui lòng thử lại" };
    }

    const {id} = validatedFields.data;
    const c = await prismadb.applicationReport.findFirst({
      where: { id: id },
    });
    var x = validatedFields.data.status;

    if (c) {
        const rp = await prismadb.applicationReport.update({
          where: {
            id: id,
          },
          data: {
            status: x == 'false'? false : true,
            updatedAt: new Date(Date.now()),
        }
        });
        
        if (rp) {
          return { success: "Cập nhật trạng thái thành công" };
        }
    }

    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
}