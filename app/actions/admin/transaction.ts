"use server";
import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import { TransactionColumnType } from "@/type/transaction";
import { isAdmin } from "@/app/lib/checkPermittedRole";

export default async function viewAllTransaction() {
  const isPermitted = await isAdmin();
  if (!isPermitted) {
    return { error: "Bạn không có quyền xem tất cả giao dịch của hệ thống" };
    ``;
  }
  try {
    const requests = await prismadb.request.findMany({
      where: {
        status: { in: ["paid", "pending", "complete","confirmed"] },
      },
      select: {
        id: true,
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        createdAt: true,
        price: true,
        status: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let result: TransactionColumnType[] = [];

    for (let index = 0; index < requests.length; index++) {
      const element = requests[index];

      result.push({
        id: element.id + "",
        customerName: element.user.name,
        customerAvatar: element.user.image,
        customerEmail: element.user.email,
        date: format(new Date(element.createdAt), "dd/MM/yyyy"),
        amount: element.price,
        status: element.status,
      });
    }
    if (!requests) {
      return { error: "Không tìm thấy thông tin giao dịch" };
    }
    return { data: result };
  } catch (error) {
    return { error: "Đã xảy ra lỗi khi lấy thông tin giao dịch" };
  }
}
