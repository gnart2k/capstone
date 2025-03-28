import { isAdmin } from '@/app/lib/checkPermittedRole';
import prismadb from '@/lib/prisma'
import { RateAnalysticType } from '@/type/rate';
import { NextResponse } from 'next/server'

type ResponseData = {
  message: string
}

export async function GET(
) {
  const isPermitted = await isAdmin();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }
  const currentDate = new Date();
  const results = [];

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 12);

  const totalRate = await prismadb.feedback.count({
    where: {
      createdAt: {
        gte: startOfMonth,
      }
    }
  })

  const fiveStarRate = await prismadb.feedback.count({
    where: {
      createdAt: {
        gte: startOfMonth,
      },
      rate: 5
    }
  })

  const fourStarRate = await prismadb.feedback.count({
    where: {
      createdAt: {
        gte: startOfMonth,
      },
      rate: 4
    }
  })
  const threeStarRate = await prismadb.feedback.count({
    where: {
      createdAt: {
        gte: startOfMonth,
      }
      , rate: 3
    }
  })

  const twoStarRate = await prismadb.feedback.count({
    where: {
      createdAt: {
        gte: startOfMonth,
      }
      , rate: 2
    }
  })

  const oneStarRate = await prismadb.feedback.count({
    where: {
      createdAt: {
        gte: startOfMonth,
      }
      , rate: 1
    }
  })

  const data: RateAnalysticType = {
    totalRate: totalRate,
    fiveStarRate: fiveStarRate,
    fourStarRate: fourStarRate,
    threeStarRate: threeStarRate,
    twoStarRate: twoStarRate,
    oneStarRate: oneStarRate,
  }
  return NextResponse.json(data)
}




