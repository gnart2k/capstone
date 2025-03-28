import { isAdmin } from '@/app/lib/checkPermittedRole';
import prismadb from '@/lib/prisma'
import { RecentlyTransactionType } from '@/type/transaction';
import { NextResponse } from 'next/server'

export async function GET(
) {
  const isPermitted = await isAdmin();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }
  const data = await prismadb.request.findMany(
    {
      include: {
        user: {
          select: {
            name: true,
            image: true,
          }
        },
        serviceCombo: {
          select: {
            title: true,
            description: true,
            price: true
          }
        },
        address: {
          select: {
            province: {
              select: {
                provinceName: true,
              }
            },
            district: {
              select: {
                districtName: true,
              }
            },
            ward: {
              select: { wardName: true }
            },
            specificAddress: true
          }
        }
      },

      take: 1,
      skip: 0,
      orderBy: {
        createdAt: 'desc',
      },
    }
  );
  const results: RecentlyTransactionType[] = []
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    results.push({
      id: element.id + "",
      service: {
        id: element.serviceComboId + "",
        serviceName: element.serviceCombo.title,
        promotionImg: "https://picsum.photos/200/300"
      },
      serviceCombo: {
        title: element.serviceCombo.title,
        description: element.serviceCombo.description
      },
      date: element.createdAt.toLocaleString(),
      address: `${element.address.specificAddress}, ${element.address.ward.wardName}, ${element.address.district.districtName}, ${element.address.province.provinceName}`.slice(0, 12) + "...",
      status: element.status,
      userName: element.user.name,
      userAvatar: element.user.image,
      amount: element.price
    })

  }

  return NextResponse.json(results)
}



