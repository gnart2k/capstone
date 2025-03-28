import { auth } from "@/auth";
import { StaffReviewColumn } from "@/components/custom/table/StaffReviewDataTable/staffReviewColumn";
import prismadb from "@/lib/prisma";
import { format } from "date-fns";

export async function listAllReviewAdmin() {
  const { user } = await auth();
  if (user.role.toLowerCase() !== "admin") {
    return { data: new Array(), error: "Không có quyền truy cập" };
  }
  try {
    const request = await prismadb.feedback.findMany({
      select: {
        id: true,
        createdAt: true,
        text: true,
        rate: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        request: {
          select: {
            service: {
              select: {
                serviceName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });



    if (!request) {
      return { data: new Array(), error: "Không tìm thấy thông tin request" };
    }

    let result: StaffReviewColumn[] = [];

    for (let index = 0; index < request.length; index++) {
      const element = request[index];
      result.push({
        id: element.id + "",
        date: format(new Date(element.createdAt), "dd/MM/yyyy"),
        customerName: element.user.name,
        customerAvatar: element.user.image,
        rate: element.rate + "",
        feedback: element.text,
        serviceName: element.request.service.serviceName,
      });
    }


    return { data: result };
  } catch (error) {
    console.log(error)
    return { data: new Array(), error: "Đã xảy ra lỗi khi lấy thông tin request" };
  }
};

