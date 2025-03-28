import prismadb from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const services = await prismadb.service.findMany({
      include: {
        _count: {
          select: { request: true },
        },
      },
      orderBy: {
        request: {
          _count: "desc",
        },
      },
      take: 4,
    });

    const result = services.map((service) => ({
      serviceName: service.serviceName,
      requestCount: service._count.request,
    }));

    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching top services:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
