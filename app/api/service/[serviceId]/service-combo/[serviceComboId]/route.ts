import { isManager } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { serviceComboId: string } }
) {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }
  try {
    if (!params.serviceComboId) {
      return new NextResponse("Service Combo is required", { status: 400 });
    }

    const data = await prismadb.serviceCombo.findFirst({
      select: {
        id: true,
        title: true,
        description: true,
        staffNumber: true,
        duration: true,
        price: true,
        service: {
          select: {
            id: true
          }
        }
      },
      where: {
        id: params.serviceComboId,
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
  { params }: { params: { serviceComboId: string } }
) {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }
  try {
    if (!params.serviceComboId) {
      return new NextResponse("Service Item is required", { status: 400 });
    }

    const service = await prismadb.serviceCombo.delete({
      where: {
        id: params.serviceComboId,
      }
    });

    return NextResponse.json(service, { status: 200 });
  } catch (err) {
    console.log("[size_GET]", err);
    return new NextResponse("internal error", { status: 500 });
  }
}
