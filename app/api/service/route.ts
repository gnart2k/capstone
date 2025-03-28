import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prismadb.service.findMany({
    select: {
      id: true,
      serviceName: true
    }
  }).then(result => result.map(e => e.serviceName))
  return NextResponse.json(result)
}
