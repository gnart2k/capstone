import { isAdmin } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string } }
  ) {
    const isPermitted = await isAdmin();
    if (!isPermitted) {
      return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
        status: 403,
      });
    }
    try {
      if (!params.userId) {
        return new NextResponse("User is required", { status: 400 });
      }
  
      const service = await prismadb.user.delete({
        where: {
          id: params.userId,
        }
      });
  
      return NextResponse.json(service, { status: 200 });
    } catch (err) {
      console.log("[size_GET]", err);
      return new NextResponse("internal error", { status: 500 });
    }
  }