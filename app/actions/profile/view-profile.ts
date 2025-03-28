"use server"

import prismadb from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isUser } from "@/app/lib/checkPermittedRole";
export const viewProfileAction = async () => {

  try {
    const session = await auth();
    if (!session?.user?.id) {
      redirect("/auth/signin");
    }

    const customer = await prismadb.user.findFirst({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        phone: true,
        dob: true,
        email: true,
        image: true,
        gender: true,
        addresses: {
          select: {
            address: {
              select: {
                id: true,
                province: {
                  select: {
                    id: true,
                    provinceName: true
                  }

                },
                district: {
                  select: {
                    id: true,
                    districtName: true
                  }
                },
                ward: {
                  select: {
                    id: true,
                    wardName: true
                  }
                },
                specificAddress: true,
                isDefault: true
              }

            }
          }
        }
      }
    });

    if (!customer) {
      return { error: "Không tìm thấy thông tin người dùng" };
    }

    return { user: customer };
  } catch (error) {
    return { error: "Đã xảy ra lỗi khi lấy thông tin người dùng" };
  }
};
