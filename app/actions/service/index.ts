import { isUser } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";

export async function findAllService() {
  const isPermitted = await isUser();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };``
  }
  const services = await prismadb.service.findMany({
    include: {
      serviceItems: {
        select: {
          title: true, description: true, promotionImg: true, id: true
        }
      },
    }
  })
  return { data: services }
}

export async function findFirstService(serviceId: string) {
  const isPermitted = await isUser();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };``
  }
  const service = await prismadb.service.findFirst({
    where: {
      id: serviceId
    },
    include: {
      serviceItems: {
        select: {
          title: true, description: true, promotionImg: true, id: true
        }
      },
    }
  })
  return { data: service }
}

export async function findAllServiceBookingForm() {
  const isPermitted = await isUser();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };``
  }
  const services = await prismadb.service.findMany({
    select: {
      id: true,
      serviceName: true,
      shortDescription: true,
      ServiceCombo: {
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          duration: true,
          staffNumber: true

        }
      }
    }
  })
  return { data: services }
}

