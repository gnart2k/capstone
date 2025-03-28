"use server"
import { isAdmin } from "@/app/lib/checkPermittedRole";
import { UserRole, requestStatus } from "@/app/lib/const";
import { dateToArray } from "@/app/lib/dateToArray";
import prismadb from "@/lib/prisma"
import { format } from "date-fns";

export async function getRequestAnalyisData() {
  const isPermitted = await isAdmin();
  if (!isPermitted) {
    return { error: "Bạn không có quyền xem bảng dữ liệu" };``
  }
  const now = dateToArray(Date.now())
  const startDate = [...now]
  startDate[0] = 0
  startDate[1] = 0
  startDate[2] = 0
  const todayRequest = await prismadb.request.count({
    where: {
      createdAt: {
        lte: new Date(Date.now()),
        gte: new Date(`${now[5]}-${now[4]}-${now[3]}`).toISOString(),
      }
    }
  })

  const doneRequest = await prismadb.request.count({
    where: {
      status: {
        in: [requestStatus.complete, requestStatus.cancel],
      },
    }
  })

  const customerNumber = await prismadb.user.count({
    where: {
      role: {
        roleName: UserRole.user
      }
    }
  })

  const allRequest = await prismadb.request.count()

  const data = [
    {
      title: "Yêu cầu được đặt hôm nay",
      amount: todayRequest,
    },
    {
      title: "Tổng yêu cầu đã hoàn thành",
      amount: doneRequest,
    },
    {
      title: "Tổng  số yêu cầu",
      amount: allRequest,
    },
    {
      title: "Tổng số khách hàng",
      amount: customerNumber,
    },
  ]
  return { data: data }


}
