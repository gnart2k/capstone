import { isUser } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";

export async function GetDefaultAddress({ userId }: { userId: string }) {
  const isPermitted = await isUser();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };``
  }
  try {
    const data = await prismadb.user.findFirst({
      where: {
        id: userId
      },
      select: {
        addresses: {
          select: {
            address: {
              select: {
                id: true,
                isDefault: true,
                specificAddress: true,
                province: {
                  select: {
                    id: true,
                    provinceName: true,
                  }
                },
                district: {
                  select: {
                    id: true,
                    districtName: true,
                  }
                },
                ward: {
                  select: {
                    id: true,
                    wardName: true,
                  }
                }
              }
            }
          }
        }
      }
    })

    return { data: data }
  } catch (err) {
    return { error: err }
  }
}
