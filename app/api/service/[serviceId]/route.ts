import { isManager } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";
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

    const data = await prismadb.service.findFirst({
      select: {
        serviceName: true,
        longDescription: true,
        promotionImg: true,
        shortDescription: true,
        serviceItems: true,
        ServiceCombo: true,
      },
      where: {
        id: params.serviceId,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log("[size_GET]", err);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
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

    const service = await prismadb.service.delete({
      where: {
        id: params.serviceId,
      }
    });

    return NextResponse.json(service, { status: 200 });
  } catch (err) {
    console.log("[size_GET]", err);
    return new NextResponse("internal error", { status: 500 });
  }
}
