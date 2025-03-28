import { isAdmin } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { transactionId: string } }
) {
  const isPermitted = await isAdmin();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }
  try {
    if (!params.transactionId) {
      return new NextResponse("Request is required", { status: 400 });
    }

    const data = await prismadb.request.findFirst({
      select: {
        id: true,
        user: {
            select: {
              name: true,
              email: true,
              image: true
            },
          },
          createdAt: true,
          price: true,
          status: true  
      },
      where: {
        id: parseInt(params.transactionId),
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
  { params }: { params: { transactionId: string } }
) {
  try {
    if (!params.transactionId) {
      return new NextResponse("Service is required", { status: 400 });
    }

    const service = await prismadb.request.delete({
      where: {
        id: parseInt(params.transactionId),
      }
    });

    return NextResponse.json(service, { status: 200 });
  } catch (err) {
    console.log("[size_GET]", err);
    return new NextResponse("internal error", { status: 500 });
  }
}
