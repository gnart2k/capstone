import { isStaff } from "@/app/lib/checkPermittedRole";
import { auth } from "@/auth";
import { WorkHistoryColumn } from "@/components/custom/table/workHistoryTable/workHistoryColumn";
import prismadb from "@/lib/prisma";
import { format } from "date-fns";

export const viewAllHistoryRequest = async () => {
  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" }; ``
  }
  const session = await auth();
  try {
    const request = await prismadb.request.findMany({
      where: {
        staffs: {
          some: {
            user: {
              id: session.user.id
            }
          }
        },
        OR: [
          { status: "canceled" },
          { status: "complete" },]
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        date: true,
        status: true,
        user: {
          select: {
            name: true,
            image: true,
          }
        },
        address: {
          select: {
            province: {
              select: {
                provinceName: true
              }

            },
            district: {
              select: {
                districtName: true
              }
            },
            ward: {
              select: {
                wardName: true
              }
            },
            specificAddress: true,
          }
        }

      }
    });

    if (!request) {
      return { error: "Không tìm thấy thông tin request" };
    }

    let result: WorkHistoryColumn[] = [];

    for (let index = 0; index < request.length; index++) {
      const element = request[index];
      const addressCommplete = element.address.specificAddress
        + "," + element.address.ward.wardName
        + "," + element.address.district.districtName
        + "," + element.address.province.provinceName;

      result.push({
        id: element.id + "",
        date: element.date,
        status: element.status,
        customerName: element.user.name,
        customerAvatar: element.user.image,
        address: addressCommplete,
      });
    }

    return { request: result };
  } catch (error) {
    return { error: "Đã xảy ra lỗi khi lấy thông tin request" };
  }
};


export async function findFirstHistoryWork(requestId: string) {
  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" }; ``
  }
  const request = await prismadb.request.findFirst({
    where: {
      id: parseInt(requestId),
    },
    select: {
      id: true,
      date: true,
      time: true,
      status: true,
      phone: true,
      address: {
        select: {
          specificAddress: true,
          ward: {
            select: {
              wardName: true
            }
          },
          district: {
            select: {
              districtName: true
            }
          },
          province: {
            select: {
              provinceName: true
            }
          }
        }
      },
      user: {
        select: {
          image: true,
          name: true,
          gender: true,
        }
      },
      service: {
        select: {
          serviceName: true,
        }
      },
      serviceCombo: {
        select: {
          title: true,
          description: true,
          price: true
        }
      }

    }
  })

  return { data: request }
}
