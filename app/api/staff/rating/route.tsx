import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prismadb from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  try {
    const feedbacks = await prismadb.feedback.groupBy({
      by: ["rate"],
      where: {
        request: {
          staffs: {
            some: {
              user: {
                id: session.user.id,
              },
            },
          },
        },
      },
      _count: {
        rate: true,
      },
    });

    if (feedbacks.length === 0) {
      return new NextResponse(JSON.stringify({ message: "null" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const result = {
      labels: feedbacks.map((fb) => `${fb.rate} sao`),
      datasets: [
        {
          label: "Số đánh giá",
          data: feedbacks.map((fb) => fb._count.rate),
          backgroundColor: [
            "#1814F3",
            "#343C6A",
            "#FA00FF",
            "#FC7900",
            "green",
          ],
          borderColor: ["white"],
          borderWidth: 5,
        },
      ],
      options: {
        responsive: true,
      },
    };

    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching ratings:", error);
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
