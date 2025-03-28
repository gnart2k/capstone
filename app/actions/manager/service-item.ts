"use server";
import { ServiceItemColumnProps } from "@/components/custom/table/serviceItemTable/ServiceItemColumn";
import prismadb from "@/lib/prisma";
import * as z from "zod";
import { UpdateServiceItemSchema } from "@/schema";
import { format } from "date-fns";
import { isManager } from "@/app/lib/checkPermittedRole";

export default async function viewAllServiceItem({
  serviceId,
}: {
  serviceId: string;
}) {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };
  }
  try {
    const serviceItems = await prismadb.serviceItem.findMany({
      select: {
        id: true,
        createdAt: true,
        title: true,
        description: true,
        promotionImg: true,
        service: {
          select: {
            serviceName: true,
          },
        },
      },
      where: {
        serviceId: serviceId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let result: ServiceItemColumnProps[] = [];

    for (let index = 0; index < serviceItems.length; index++) {
      const element = serviceItems[index];

      result.push({
        id: element.id + "",
        createdAt: format(new Date(element.createdAt), "dd/MM/yyyy"),
        workLocation: element.title,
        description: element.description,
        image: element.promotionImg,
      });
    }
    if (!serviceItems) {
      return { error: "Không tìm thấy thông tin service item" };
    }

    return { serviceItems: result };
  } catch (error) {
    return { error: "Đã xảy ra lỗi khi lấy thông tin service item" };
  }
}

export const viewServiceName = async ({ serviceId }: { serviceId: string }) => {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };
  }
  const service = await prismadb.service.findFirst({
    select: {
      serviceName: true,
    },
    where: {
      id: serviceId,
    },
  });
  return { serviceName: service.serviceName };
};


export const createServiceItemAction = async (
  values: z.infer<typeof UpdateServiceItemSchema>
) => {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };
  }
  const validatedFields = UpdateServiceItemSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }

  const {
    serviceItemTitle,
    serviceItemDescription,
    serviceImageUrl,
    serviceId,
  } = validatedFields.data;

  const existingServiceItem = await prismadb.serviceItem.findFirst({
    where: { 
      title: serviceItemTitle,
      serviceId: serviceId }
  });

  if (existingServiceItem) {
    return { error: "Service Item đã tồn tại!" };
  }

  const serviceItem = await prismadb.serviceItem.create({
    data: {
      title: serviceItemTitle,
      description: serviceItemDescription,
      promotionImg: serviceImageUrl,
      service: {
        connect: {
          id: serviceId,
        },
      },
    },
  });
  if (serviceItem) {
    return { success: "Tạo service item thông tin thành công" };
  }
  return { error: "Có lỗi xảy ra, vui lòng thử lại" };
};

export const updateServiceItemAction = async (
  values: z.infer<typeof UpdateServiceItemSchema>
) => {
  const isPermitted = await isManager();
    if (!isPermitted) {
      return { error: "Bạn không có quyền thực hiện chức năng này" };
    }
  const validatedFields = UpdateServiceItemSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }

  const {
    serviceItemTitle,
    serviceItemDescription,
    serviceImageUrl,
    id,
    serviceId,
  } = validatedFields.data;

  const serviceItem = await prismadb.serviceItem.updateMany({
    data: {
      title: serviceItemTitle,
      description: serviceItemDescription,
      promotionImg: serviceImageUrl,
    },
    where: {
      id: id,
    },
  });
  if (serviceItem) {
    return { success: "Cập nhật service Item thành công" };
  }
  return { error: "Có lỗi xảy ra, vui lòng thử lại" };
};

