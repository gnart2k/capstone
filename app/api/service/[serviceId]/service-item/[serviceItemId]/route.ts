import { isManager } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { serviceItemId: string } }
) {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }
  try {
    if (!params.serviceItemId) {
      return new NextResponse("Service Item is required", { status: 400 });
    }

    const data = await prismadb.serviceItem.findFirst({
      select: {
        id: true,
        title: true,
        description: true,
        promotionImg: true,
        service: {
          select: {
            id: true
          }
        }
      },
      where: {
        id: params.serviceItemId,
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
  { params }: { params: { serviceItemId: string } }
) {
  try {
    if (!params.serviceItemId) {
      return new NextResponse("Service Item is required", { status: 400 });
    }

    const service = await prismadb.serviceItem.delete({
      where: {
        id: params.serviceItemId,
      }
    });

    return NextResponse.json(service, { status: 200 });
  } catch (err) {
    console.log("[size_GET]", err);
    return new NextResponse("internal error", { status: 500 });
  }
}
