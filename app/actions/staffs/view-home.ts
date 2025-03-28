"use server"

import { isStaff } from "@/app/lib/checkPermittedRole";
import { auth } from "@/auth";
import prismadb from "@/lib/prisma";
export const viewDoneRequest = async () => {
  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" }; ``
  }
  const { user } = await auth();
  try {
    const request = await prismadb.request.findMany({
      select: {
        service: {
          select: {
            serviceName: true,
            promotionImg: true
          }
        },
        date: true,

      }, where: {
        staffs: {
          some: {
            user: {
              id: user.id
            }
          }
        },
        status: "Complete",
      },
      take: 4,
      orderBy: {
        createdAt: "desc"
      },
    });

    if (!request) {
      return { error: "Không tìm thấy thông tin request" };
    }

    return { request: request };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { error: "Đã xảy ra lỗi khi lấy thông tin request" };
  }
};

export const viewUpcomingWorking = async () => {
  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" }; ``
  }
  const { user } = await auth();
  try {
    const request = await prismadb.request.findMany({
      where: {
        staffs: {
          some: {
            user: {
              id: user.id
            }
          }
        },
        OR: [
          { status: "paid" },
          { status: "confirmed" },]
      },
      select: {
        service: {
          select: {
            serviceName: true
          }
        },
        date: true,
        serviceCombo: {
          select: {
            title: true,
            description: true,

          }
        },
        status: true,
        time: true,
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
        },

      },
      take: 4,
      orderBy: {
        createdAt: "desc"
      },

    });

    if (!request) {
      return { error: "Không tìm thấy thông tin request" };
    }

    return { request: request };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { error: "Đã xảy ra lỗi khi lấy thông tin request" };
  }
};


export const viewRecentReview = async () => {
  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" }; ``
  }
  const { user } = await auth();
  try {
    const request = await prismadb.feedback.findMany({
      where: {
        request: {
          staffs: {
            some: {
              user: {
                id: user.id
              }
            }
          },
        }
      },
      select: {
        user: {
          select: {
            name: true,
            image: true
          }
        },
        text: true,
        rate: true
      },
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!request) {
      return { error: "Không tìm thấy thông tin feedback" };
    }
    return { request: request };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { error: "Đã xảy ra lỗi khi lấy thông tin feedback" };
  }
};
