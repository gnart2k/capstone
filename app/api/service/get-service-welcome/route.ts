import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  //   {
  //   img: dichvu1,
  //   title: "Tổng vệ sinh",
  //   content:
  //     "Giữ cho nhà cửa của bạn luôn ngăn nắp, sạch sẽ, thoáng đãng với dịch vụ dọn dẹp của chúng tôi. Hãy để chúng tôi giúp bạn duy trì không gian sống thật lý tưởng!",
  //   link: "/home",
  // },
  try {

    //@ts-ignore
    let finalRs = []
    const result = await prismadb.service.findMany({
      select: {
        promotionImg: true,
        serviceName: true,
        shortDescription: true,
        id: true,
      }
    })

    result.map(rs => {
      finalRs.push({
        img: rs.promotionImg,
        title: rs.serviceName,
        content: rs.shortDescription.slice(0, 150) + "...",
        link: `/service/${rs.id}`
      })
    })

    //@ts-ignore
    return NextResponse.json(finalRs)
  } catch (error) {
    console.log(error)

  }
}


