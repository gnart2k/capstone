"use server";

import prismadb from "@/lib/prisma";
import { BookingHistoryColumn } from "@/components/custom/table/requestHistory/columns";
import {
  BookingHistorySchema,
  StaffSchema,
} from "@/app/(user)/profile/booking-history/[statusType]/[requestID]/components/viewBookingHistoryDetail";
import { auth } from "@/auth";
import { isUser } from "@/app/lib/checkPermittedRole";
export const viewAllBookingHistoryAction = async ({
  props,
}: {
  props?: string;
}) => {
  const isPermitted = await isUser();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" }; ``
  }
  const session = await auth();

  try {
    let request = [];
    let result: BookingHistoryColumn[] = [];

    if (props && props !== "all") {
      request = await prismadb.request.findMany({
        where: {
          userId: session.user.id,
          AND: {
            status: {
              equals: props
            },
          }
        },
        select: {
          id: true,
          staffs: {
            select: {
              user: {
                select: {
                  name: true,
                  image: true,
                  email: true,
                },
              },
            },
          },
          service: {
            select: {
              serviceName: true,
              promotionImg: true,
            },
          },
          paymentLink: true,
          paymentMethod: true,
          date: true,
          time: true,
          status: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    } else {
      request = await prismadb.request.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          id: true,
          staffs: {
            select: {
              user: {
                select: {
                  name: true,
                  image: true,
                  email: true,
                },
              },
            },
          },
          paymentMethod: true,
          paymentLink: true,
          service: {
            select: {
              serviceName: true,
              promotionImg: true,
            },
          },
          date: true,
          time: true,
          status: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    if (!request) {
      return { error: "Không tìm thấy thông tin request" };
    }

    for (let index = 0; index < request.length; index++) {
      const element = request[index];
      let staffName = "";
      for (let index = 0; index < element.staffs.length; index++) {
        const staff = element.staffs[index];
        staffName = staff.user.name;
      }
      let staffAvatar = "";
      let staffEmail = "";
      for (let index = 0; index < element.staffs.length; index++) {
        const staff = element.staffs[index];
        staffAvatar = staff.user.image;
        staffEmail = staff.user.email;
      }



      result.push({
        id: element.id + "",
        staffName: staffName,
        serviceName: element.service.serviceName,
        date: new Date(element.date),
        time: element.time,
        status: element.status,
        staffAvatar: staffAvatar,
        staffEmail: staffEmail,
      });

    }
    return { request: result };
  } catch (error) {
    return { error: "Đã xảy ra lỗi khi lấy thông tin request" };
  }
};

export async function findFirstBookingHistory(requestId: string) {
  const isPermitted = await isUser();
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
      paymentLink: true,
      paymentMethod: true,
      staffs: {
        select: {
          user: {
            select: {
              name: true,
              image: true,
              gender: true,
              credibility: true,
              phone: true,
              dob: true,
              addresses: {
                select: {
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
                        }
                      },
                      ward: {
                        select: {
                          wardName: true,
                        }
                      },
                      specificAddress: true
                    },
                  },
                },
              },
            },
          },
        },
      },
      service: {
        select: {
          serviceName: true,
        },
      },
      serviceCombo: {
        select: {
          title: true,
          description: true,
          price: true,
        },
      },
    },
  });
  if (!request) {
    return { error: "Không tìm thấy thông tin request" };
  }

  let staffs: StaffSchema[] = [];

  for (let index = 0; index < request.staffs.length; index++) {
    const element = request.staffs[index];
    let staffName = element.user.name;
    let staffImage = element.user.image;
    let staffGender = element.user.gender;
    let addressStaff = "";
    let credibility = element.user.credibility ? element.user.credibility : "0";
    let age = new Date().getFullYear() - new Date(element.user.dob).getFullYear();
    let staffPhone = element.user.phone ? element.user.phone : "";

    if (element.user.addresses.length > 0) {
      addressStaff = element.user.addresses[0].address.specificAddress + ", "
        + element.user.addresses[0].address.ward.wardName + ", "
        + element.user.addresses[0].address.district.districtName + ", "
        + element.user.addresses[0].address.province.provinceName
    }

    staffs.push({
      staffGender: staffGender,
      staffName: staffName,
      staffImage: staffImage,
      addressStaff: addressStaff,
      ageStaff: age + "",
      credibilityStaff: credibility,
      staffPhone: staffPhone,
    });
  }

  let result: BookingHistorySchema = {
    id: request.id,
    status: request.status,
    date: new Date(request.date),
    time: request.time,
    phone: request.phone,
    staff: staffs,
    serviceName: request.service.serviceName,
    titleServiceCombo: request.serviceCombo.title,
    descriptionServiceComBo: request.serviceCombo.description,
    priceServiceCombo: request.serviceCombo.price,
    paymentLink: request?.paymentLink,
    paymentMethod: request?.paymentMethod,

  };

  return { request: result };
}
