import { isAdmin } from '@/app/lib/checkPermittedRole';
import { UserRole } from '@/app/lib/const';
import { auth } from '@/auth';
import prismadb from '@/lib/prisma'
import { RecentlyTransactionType } from '@/type/transaction';
import { UserCardType } from '@/type/user-card';
import { NextResponse } from 'next/server'

export async function GET(
) {
  const isPermitted = await isAdmin();
  if (!isPermitted) {
    return new NextResponse("Bạn không có quyền thực hiện chức năng này", {
      status: 403,
    });
  }

  const results: UserCardType[] = []
  const data = await prismadb.user.findMany(
    {
      where: {
        role: {
          roleName: { equals: UserRole.user }
        }
      },
      take: 5,
      skip: 0,
      orderBy: {
        createdAt: 'desc',
      },
    }
  );

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    results.push({
      id: element.id,
      name: element.name,
      email: element.email,
      imageUrl: element.image
    })

  }
  return NextResponse.json(results)
}





