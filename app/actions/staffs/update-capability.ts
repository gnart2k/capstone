"use server"
import { capability } from "@/app/(pages)/admin-page/user-management/components/capabilityStaff";
import { isAdmin, isStaff } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";

export const updateStaffCapabilityAction = async ({ capability, userId }: { capability: capability[], userId: string }) => {
  const isPermitted = await isAdmin();
  if (!isPermitted) {
    return { success: false, message: "Bạn không có quyền thực hiện chức năng này" }; ``
  }

  const isSelectedCapability = capability?.filter((cap) => cap.isSelected === true)
  const isNotSelectedCapability = capability?.filter((cap) => cap.isSelected === false)


  isSelectedCapability?.forEach(async (cap) => {
    try {

      await prismadb.capabilities.create({
        data: {
          userId: userId,
          serviceId: cap.id,
        }
      })
    } catch (error) {
      return { success: false, message: "Đã có lỗi trong lúc cập nhật kỹ năng của nhân viên" };

    }
  })

  isNotSelectedCapability?.forEach(async (cap) => {
    try {
      const existedCapability = await prismadb.capabilities.findFirst({
        where: {
          userId: userId,
          serviceId: cap.id
        }
      })
      if (existedCapability) {
        await prismadb.capabilities.delete({
          where: {
            id: existedCapability.id,
          }
        })
      }

    } catch (error) {
      return { success: false, message: "Đã có lỗi trong lúc cập nhật kỹ năng của nhân viên" };


    }

  })

  return { success: true, message: "Cập nhật kỹ năng nhân viên thành công" }
}

