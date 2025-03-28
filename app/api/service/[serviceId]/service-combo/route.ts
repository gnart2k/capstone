import { isManager } from "@/app/lib/checkPermittedRole";
import { ServiceComboColumnProps } from "@/components/custom/table/serviceCombo/serviceComboColumn";
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
      return new NextResponse("Service Combo is required", { status: 400 });
    }
    const data = await viewAllServiceCombo({ serviceId: params.serviceId });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log("[size_GET]", err);
    return new NextResponse("internal error", { status: 500 });
  }
}

async function viewAllServiceCombo({ serviceId }: { serviceId: string }) {
  try {
    const serviceCombos = await prismadb.serviceCombo.findMany({
      select: {
        id: true,
        createdAt: true,
        title: true,
        description: true,
        price: true,
        staffNumber: true,
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

    let result: ServiceComboColumnProps[] = [];

    for (let index = 0; index < serviceCombos.length; index++) {
      const element = serviceCombos[index];

      result.push({
        id: element.id + "",
        createdAt: format(new Date(element.createdAt), "dd/MM/yyyy"),
        workDuration: element.title,
        workOption: element.description,
        staffNumber: element.staffNumber + "",
        price: element.price + "",
      });
    }
    if (!serviceCombos) {
      return { error: "Không tìm thấy thông tin combo dịch vụ" };
    }

    return { data: result };
  } catch (error) {
    return { error: "Đã xảy ra lỗi khi lấy thông tin combo dịch vụ" };
  }
}
