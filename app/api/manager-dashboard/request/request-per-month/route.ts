import { isManager } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export async function GET() {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }
  const currentDate = new Date();

  const results = [];

  for (let i = 0; i < 31; i++) {
    const startOfDay = new Date(currentDate);
    startOfDay.setDate(currentDate.getDate() - i);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(currentDate);
    endOfDay.setDate(currentDate.getDate() - i);
    endOfDay.setHours(23, 59, 59, 999);


    const dailyData = await prismadb.request.count({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
    results.push(dailyData);
  }
  return NextResponse.json(results);
}
