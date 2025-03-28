import { isManager } from "@/app/lib/checkPermittedRole";
import { ServiceItemColumnProps } from "@/components/custom/table/serviceItemTable/ServiceItemColumn";
import prismadb from "@/lib/prisma";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }
  try {
    if (!params.serviceId) {
      return new NextResponse("Service is required", { status: 400 });
    }
    const data = await viewAllServiceItem({ serviceId: params.serviceId });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return new NextResponse("internal error", { status: 500 });
  }
}

async function viewAllServiceItem({ serviceId }: { serviceId: string }) {
  try {
    const serviceItems = await prismadb.serviceItem.findMany({
      select: {
        id: true,
        createdAt: true,
        title: true,
        description: true,
        promotionImg: true,
        service: {
          select: {
            id: true,
            serviceName: true,
          },
        },
      },
      where: {
        serviceId: serviceId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let result: ServiceItemColumnProps[] = [];

    for (let index = 0; index < serviceItems.length; index++) {
      const element = serviceItems[index];

      result.push({
        id: element.id + "",
        createdAt: format(new Date(element.createdAt), "dd/MM/yyyy"),
        workLocation: element.title,
        description: element.description,
        image: element.promotionImg,
      });
    }
    if (!serviceItems) {
      return { error: "Không tìm thấy thông tin request" };
    }

    return { data: result };
  } catch (error) {
    return { error: "Đã xảy ra lỗi khi lấy thông tin request" };
  }
}
