export const viewAllRequest = async () => {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };
  }
  try {
    const request = await prismadb.request.findMany({
      select: {
        id: true,
        date: true,
        time: true,
        status: true,
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
        service: {
          select: {
            serviceName: true,
          }
        },
        serviceCombo: {
          select: {
            title: true,
            description: true
          }
        }

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
    return { error: "Đã xảy ra lỗi khi lấy thông tin request" };
  }
};


export const viewRecentlyService = async () => {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };
  }
  try {
    const service = await prismadb.service.findMany({
      select: {
        id: true,
        serviceName: true,
        promotionImg: true,
        createdAt: true,
        ServiceCombo: true,
      },
      take: 4,
      orderBy: {
        createdAt: "desc"
      },
    });

    if (!service) {
      return { error: "Không tìm thấy thông tin service" };
    }



    return { service: service };
  } catch (error) {
    return { error: "Đã xảy ra lỗi khi lấy thông tin service" };
  }
};

import { isManager } from '@/app/lib/checkPermittedRole';
import { PrismaClient } from '@prisma/client';

const prismadb = new PrismaClient();

export const viewRequestStats = async () => {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };
  }
  try {
    const requests = await prismadb.request.groupBy({
      by: ['date'],
      _count: {
        id: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    if (!requests) {
      return { error: "Không tìm thấy thông tin yêu cầu" };
    }

    const requestStats = requests.map(request => ({
      date: request.date,
      count: request._count.id,
    }));

    return { requestStats: requestStats };
  } catch (error) {
    console.error(error);
    return { error: "Đã xảy ra lỗi khi lấy thông tin yêu cầu" };
  }
};
