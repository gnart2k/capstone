"use server";
import { ManagerListRequestProps } from "@/components/custom/table/ManagerListRequest/ManagerListRequestColumn";
import prismadb from "@/lib/prisma";
import { CustomerCardProps } from "@/type/customerCard";
import { ServiceInfoProps } from "@/type/serviceInfo";
import { parse, format } from "date-fns";

export async function listAllRequests() {
  try {
    const requests = await prismadb.request.findMany({
      include: {
        service: {
          select: {
            serviceName: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        staffs: {
          select: {
            id: true,
          },
        },
        address: {
          select: {
            province: {
              select: {
                provinceName: true,
              },
            },
            district: {
              select: {
                districtName: true,
              },
            },
            ward: {
              select: {
                wardName: true,
              },
            },
            specificAddress: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },

    });

    const result: ManagerListRequestProps[] = [];
    for (let index = 0; index < requests.length; index++) {
      const element = requests[index];
      result.push({
        id: element.id + "",
        serviceName: element.service.serviceName,
        date: format(new Date(element.createdAt), "dd/MM/yyyy"),
        status: element.status,
        staffNumber: element.staffs.length,
        address: element.address.province.provinceName + ", " + element.address.district.districtName + ", " + element.address.ward.wardName + ", " + element.address.specificAddress,
        customerName: element.user.name,
        customerAvatar: element.user.image,
      });
    }
    return { data: result, success: true, message: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function getRequestById(id: string) {
  try {
    const request = await prismadb.request.findUnique({
      where: {
        id: parseInt(id),
      },

      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
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
            }
          },
        },
        service: {
          select: {
            serviceName: true,
          },
        },
        serviceCombo: {
          select: {
            duration: true,
            title: true,
            price: true,
          },
        },
      },
    });

    const userOnRequest: CustomerCardProps = {
      name: request.user.name,
      avatar: request.user.image,
      address: request.address.province.provinceName + ", " + request.address.district.districtName,
      phone: request.phone,
    };

    const serviceOnRequest: ServiceInfoProps = {
      serviceName: request.service.serviceName,
      workDuration: request.serviceCombo.duration + "",
      workOption: request.serviceCombo.title,
      date: new Date(request.date),
      time: request.time,
      amount: request.serviceCombo.price.toString(),
      phoneNumber: request.phone,
      status: request.status
    };

    const result = {
      userOnRequest: userOnRequest,
      serviceOnRequest: serviceOnRequest,
    };

    return { data: result, success: true, message: "" };
  } catch (e) {
    return { success: false, message: "" };
  }
}

export async function changePhone({
  requestId,
  phone,
}: {
  requestId: string;
  phone: string;
}) {
  console.log(requestId, phone)
  const request = await prismadb.request.update({
    where: {
      id: parseInt(requestId),
    },
    data: {
      phone: phone,
    },
  });
  return { data: request };
}

export async function changeTime({
  requestId,
  time,
}: {
  requestId: string;
  time: string;
}) {
  const request = await prismadb.request.update({
    where: {
      id: parseInt(requestId),
    },
    data: {
      time: time,
    },
  });
  return { data: request };
}
export async function changeDate({
  requestId,
  date,
}: {
  requestId: string;
  date: string;
}) {
  let isoDate;
  const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
  isoDate = format(parsedDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx')
  const request = await prismadb.request.update({
    where: {
      id: parseInt(requestId),
    },
    data: {
      date: new Date(isoDate),
    },
  });
  return { data: request };
}
