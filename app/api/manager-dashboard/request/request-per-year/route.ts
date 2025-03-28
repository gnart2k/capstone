import { isManager } from '@/app/lib/checkPermittedRole';
import prismadb from '@/lib/prisma'
import { NextResponse } from 'next/server'

type ResponseData = {
  message: string
}

export async function GET(
) {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }
  const currentDate = new Date();
  const results = [];

  for (let i = 0; i < 12; i++) {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0, 23, 59, 59, 999);

const monthlyData = await prismadb.request.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    })
    results.push(monthlyData)
  }
  return NextResponse.json(results)
}
