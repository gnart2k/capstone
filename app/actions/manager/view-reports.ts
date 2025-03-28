"use server"
import { isManager, isStaff } from "@/app/lib/checkPermittedRole";
import { auth } from "@/auth";
import prismadb from "@/lib/prisma";
export async function getAllReports() {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return { data: new Array(), error: "Bạn không có quyền thực hiện chức năng này" };
  }

  const data = await prismadb.applicationReport.findMany(
    {
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }
  );

  return { data: data };
}


export async function getAllApplications() {
  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { data: new Array(), error: "Bạn không có quyền thực hiện chức năng này" };
  }
  const session = await auth();

  const data = await prismadb.applicationReport.findMany(
    {
      where: {
        userId: session.user.id
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }
  );

  console.log(data)

  return { data: data };
}
