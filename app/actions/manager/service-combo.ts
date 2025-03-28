"use server";
import { isManager } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";
import { UpdateServiceComboSchema } from "@/schema";
import * as z from "zod";

export const createServiceComboAction = async (
    values: z.infer<typeof UpdateServiceComboSchema>
  ) => {
    const isPermitted = await isManager();
    if (!isPermitted) {
      return { error: "Bạn không có quyền thực hiện chức năng này" };
    }
    const validatedFields = UpdateServiceComboSchema.safeParse(values);
  
    if (!validatedFields.success) {
      return { error: "Có lỗi xảy ra, vui lòng thử lại" };
    }
  
    const { workDuration, workOption, staffNumber, price, serviceId, duration } =
      validatedFields.data;
  
      const existingServiceCombo = await prismadb.serviceCombo.findFirst({
        where: { description: workOption,
            serviceId: serviceId
         }
      });
    
      if (existingServiceCombo) {
        return { error: "Service Combo đã tồn tại!" };
      }

    const serviceCombo = await prismadb.serviceCombo.create({
      data: {
        title: workDuration,
        description: workOption,
        price: price,
        staffNumber: staffNumber,
        duration: duration,
        service:{
          connect: {
            id: serviceId,
          }
        }
      },
      
    });
    if (serviceCombo) {
      return { success: "Tạo service combo thông tin thành công" };
    }
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  };
  

  export const updateServiceComboAction = async (
    values: z.infer<typeof UpdateServiceComboSchema>
  ) => {
    const isPermitted = await isManager();
    if (!isPermitted) {
      return { error: "Bạn không có quyền thực hiện chức năng này" };
    }
    const validatedFields = UpdateServiceComboSchema.safeParse(values);
  
    if (!validatedFields.success) {
      return { error: "Có lỗi xảy ra, vui lòng thử lại" };
    }
  
    const { workDuration, workOption, staffNumber, price, id, duration, serviceId  } =
      validatedFields.data;
  
    const serviceCombo = await prismadb.serviceCombo.updateMany({
      data: {
        title: workDuration,
        description: workOption,
        staffNumber: staffNumber,
        price: price,
        duration: duration,
      },
        where: {
          id: id,
        },
      });
    if (serviceCombo) {
      return { success: "Cập nhật service Combo thành công" };
    }
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  };