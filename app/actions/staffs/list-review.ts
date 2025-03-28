import { isStaff } from "@/app/lib/checkPermittedRole";
import { auth } from "@/auth";
import { StaffReviewColumn } from "@/components/custom/table/StaffReviewDataTable/staffReviewColumn";
import prismadb from "@/lib/prisma";
import { format } from "date-fns";

export const findAllReview = async () => {
  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { data: [], error: "Bạn không có quyền thực hiện chức năng này" }; ``
  }
  const session = await auth();
  console.log(session.user.id)
  try {
    const request = await prismadb.feedback.findMany({
      where: {
        request: {
          staffs: {
            some: {
              user: {
                id: session.user.id,
              },
            },
          },
        },
      },
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

    console.log(request)

    if (!request) {
      return { error: "Không tìm thấy thông tin feedback" };
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
    return { data: new Array(), error: "Đã xảy ra lỗi khi lấy thông tin request" };
  }
};
