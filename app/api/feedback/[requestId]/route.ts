import { isUser } from "@/app/lib/checkPermittedRole";
import { auth } from "@/auth";
import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  const isPermitted = await isUser();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }
  try {
    if (!params.requestId) {
      return new NextResponse("Feedback is required", { status: 400 });
    }

    const session = await auth();
    const data = await prismadb.feedback.findFirst({
      where: {
          requestId: parseInt(params.requestId),
          AND: {
            userId: session.user.id
          }
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log("[size_GET]", err);
    return new NextResponse("internal error", { status: 500 });
  }
}
