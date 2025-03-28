import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prismadb.service.findMany({
    select: {
      id: true,
      serviceName: true
    }
  })
  return NextResponse.json(result)
}

