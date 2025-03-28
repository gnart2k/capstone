"use server";
import * as z from "zod";
import { ServiceManagementColumn } from "@/components/custom/table/ServiceManagement/ServiceManagementColumn";
import prismadb from "@/lib/prisma";
import { UpdateServiceSchema } from "@/schema";
import { isManager } from "@/app/lib/checkPermittedRole";
import { error } from "console";

export default async function viewAllService() {
  const isPermitted = await isManager();
    if (!isPermitted) {
      return { error: "Bạn không có quyền thực hiện chức năng này" };
    }
  try {
    const services = await prismadb.service.findMany({
      select: {
        id: true,
        serviceName: true,
        shortDescription: true,
        longDescription: true,
        promotionImg: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let result: ServiceManagementColumn[] = [];

    for (let index = 0; index < services.length; index++) {
      const element = services[index];

      result.push({
        id: element.id + "",
        serviceName: element.serviceName,
        serviceDescription: element.longDescription,
        serviceImage: element.promotionImg,
      });
    }
    if (!services) {
      return { error: "Không tìm thấy thông tin service" };
    }

    return { service: result };
  } catch (error) {
    return { error: "Đã xảy ra lỗi khi lấy thông tin service" };
  }
}

export const updateServiceAction = async (
  values: z.infer<typeof UpdateServiceSchema>
) => {
  const isPermitted = await isManager();
    if (!isPermitted) {
      return { error: "Bạn không có quyền thực hiện chức năng này" };
    }
  const validatedFields = UpdateServiceSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }

  const { id, serviceName, serviceDescription, serviceImageUrl, shortDescription } =
    validatedFields.data;

  const service = await prismadb.service.update({
    data: {
      serviceName: serviceName,
      longDescription: serviceDescription,
      shortDescription: shortDescription,
      promotionImg: serviceImageUrl,
    },
    where: {
      id: id,
    },
  });
  if (service) {
    return { success: "Cập nhật service thành công" };
  }
  return { error: "Có lỗi xảy ra, vui lòng thử lại" };
};

export const createServiceAction = async (
  values: z.infer<typeof UpdateServiceSchema>
) => {
  const isPermitted = await isManager();
    if (!isPermitted) {
      return { error: "Bạn không có quyền thực hiện chức năng này" };
    }
  const validatedFields = UpdateServiceSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }

  const { serviceName, serviceDescription, serviceImageUrl, shortDescription } = validatedFields.data;

  const existedServiceName = await prismadb.service.findUnique({
    where: {
      serviceName: serviceName,
    }
  })

  if (existedServiceName?.serviceName.trim().localeCompare(serviceName.trim(), undefined, { sensitivity: 'base' }) === 0) {
    return { error: "Tên dịch vụ đã tồn tại!" }
}

  const service = await prismadb.service.create({
    data: {
      serviceName: serviceName,
      shortDescription: shortDescription,
      longDescription: serviceDescription,
      promotionImg: serviceImageUrl,
      otherImg: "https://i.pinimg.com/originals/05/e9/de/05e9de021dcdd5eb68268c08c3ec567f.jpg"
    }
  });
  if (service) {
    return { success: "Tạo service thông tin thành công" };
  }
  return { error: "Có lỗi xảy ra, vui lòng thử lại" };
};
