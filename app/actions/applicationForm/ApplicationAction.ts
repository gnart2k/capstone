"use server";
import { isStaff } from "@/app/lib/checkPermittedRole";
import { auth } from "@/auth";
import prismadb from "@/lib/prisma";
import { ApplicationFormSchema } from "@/schema";
import { FileProps } from "@/type/file";
import { z } from "zod";

export async function applicationAction(
  values: z.infer<typeof ApplicationFormSchema>
) {
  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };
  }
  const validatedFields = ApplicationFormSchema.safeParse(values);
  const currentUser = await auth();
  const fileArray: FileProps[] = [];

  if (!validatedFields.success) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }

  try {
        // Kiểm tra đơn tương tự đã gửi gần đây (trong 3 phút)
    const existingReport = await prismadb.applicationReport.findFirst({
      where: {
        userId: currentUser?.user?.id,
        reportType: validatedFields.data.applicationType,
        reportContent: validatedFields.data.reason,
        createdAt: {
          gte: new Date(Date.now() - 3 * 60 * 1000), // trong 3 phút gần đây
        },
      },
    });

    // if (existingReport) {
    //   return {
    //     error: "Vui lòng đợi xử lý hoặc thử lại sau."
    //   };
    // }
    //save attachedFile
    const createdReport = await prismadb.applicationReport.create({
      data: {
        userId: currentUser?.user?.id,
        reportContent: validatedFields.data.reason,
        reportType: validatedFields?.data?.applicationType,
      },
    });

    for (
      let index = 0;
      index < validatedFields?.data?.attachedFile?.length;
      index++
    ) {
      const file: FileProps = validatedFields.data?.attachedFile[index];
      await prismadb.attachedFile.create({
        data: {
          fileName: file.name,
          fileSize: file.size,
          contentType: file.type,
          downloadUrl: file.url,
          applicationReportId: createdReport.id,
        },
      });
    }
    return { success: true, message: "Gửi đơn thành công" };
  } catch (error) {
    return { success: false, message: "Gửi đơn thất bại" };
  }
}

export async function getAllReportOfUser() {
  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };
  }
  const currentUser = await auth();
  const reports = await prismadb.applicationReport.findMany({
    where: { userId: currentUser?.user?.id },
    include: {
      AttachedFile: true,
    },
  });
  return { success: true, message: "Lấy toàn bộ thông tin đơn thành công", data: reports };
}
