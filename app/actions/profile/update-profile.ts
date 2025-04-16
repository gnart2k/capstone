"use server";
import * as z from "zod";
import prismadb from "@/lib/prisma";
import { UpdateProfileSchema } from "@/schema";
import { auth } from "@/auth";
import { Address } from "@prisma/client";

type AddressInput = {
  address: {
    id: string;
    province: {
      id: number;
      provinceName: string;
    };
    district: {
      id: number;
      districtName: string;
    };
    ward: {
      id: number;
      wardName: string;
    };
    specificAddress: string;
    isDefault: boolean;
  };
}[];

type AddressCreate = {
  address: {
    id: string;
    province: {
      id: number;
    };
    district: {
      id: number;
    };
    ward: {
      id: number;
    };
    specificAddress: string;
    isDefault: boolean;
  };
};

/**
 * Normalizes a JavaScript Date object to represent midnight (00:00:00.000) UTC
 * for the given date's year, month, and day based on its UTC components.
 * This helps prevent timezone shifts from affecting the actual date part when stored/retrieved.
 *
 * @param date - The input Date object (potentially with time and varying timezone context).
 * @returns A new Date object set to midnight UTC for that date, or undefined if input is invalid/nullish.
 */
const normalizeDateToUTCMidnight = (date: Date | undefined | null): Date | undefined => {
  // Check if the input is a valid Date object
  if (!date || typeof date.getTime !== 'function' || isNaN(date.getTime())) {
    return undefined;
  }

  // Create a new Date object representing midnight UTC for the given date.
  // Date.UTC returns milliseconds since epoch for midnight UTC based on components.
  const utcMidnightTimestamp = Date.UTC(
    date.getUTCFullYear(), // Get year according to UTC
    date.getUTCMonth(),    // Get month index (0-11) according to UTC
    date.getUTCDate()      // Get day of the month (1-31) according to UTC
    // Hours, minutes, seconds, milliseconds default to 0 in Date.UTC
  );

  // Convert the UTC timestamp back into a Date object
  return new Date(utcMidnightTimestamp);
};


export const updateProfileAction = async (
  values: z.infer<typeof UpdateProfileSchema>
) => {
  const validatedFields = UpdateProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Profile Update Validation Error:", validatedFields.error.flatten()); // Log validation errors
    return { error: "Dữ liệu không hợp lệ, vui lòng kiểm tra lại." };
  }

  // Assuming UpdateProfileSchema ensures `dob` is a Date object if present
  // e.g., dob: z.coerce.date().optional()
  const { name, phone, dob, gender } = validatedFields.data;
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Người dùng chưa được xác thực." };
  }

  // Log the original Date object received after validation
  // console.log("Original DOB object from validation:", dob);

  // --- Normalize the DOB to UTC midnight before saving ---
  const normalizedDob = normalizeDateToUTCMidnight(dob);
  console.log(normalizedDob)

  // --- Increment DOB by one day ---
  const updatedDob = new Date(normalizedDob!.getTime() + (1000 * 60 * 60 * 24));

  // Log the date that will be saved
  // console.log("Normalized DOB to save (UTC Midnight):", normalizedDob);

  try {
    const user = await prismadb.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: name,
        phone: phone,
        dob: updatedDob,
        gender: gender,
      },
    });

    // If update is successful, Prisma doesn't throw. No need to check 'user'.
    return { data: user, success: "Cập nhật thông tin thành công" };

  } catch (error) {
    console.error("Failed to update profile in database:", error); // Log the actual DB error
    return { error: "Không thể cập nhật thông tin do lỗi hệ thống." };
  }
};


export const updateAddressAction = async (values: AddressInput) => {

  values.map((value) => {
    if (value.address.district.districtName.length > 0) {
      return { error: "district can not be blank" };
    }
  });

  const session = await auth();
  const customer = await prismadb.user.findFirst({
    where: { id: session.user?.id },
  });
  if (customer) {
    for (let index = 0; index < values.length; index++) {
      const element = values[index];
      try {
        const address = await prismadb.address.update({
          data: {
            specificAddress: element.address.specificAddress,
            province: {
              connect: {
                id: element.address.province.id,
              },
            },
            district: {
              connect: {
                id: element.address.district.id,
              },
            },
            ward: {
              connect: {
                id: element.address.ward.id,
              },
            },
          },
          where: {
            id: element.address.id,
          },
        });
      } catch (error) {
        console.log(error)
        return { error: "Cập nhật địa chỉ thất bại!!" };
      }
    }
  }
  return { success: "Cập nhật địa chỉ thành công!" };
};
export const createAddressAction = async (values: AddressCreate) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "User not authenticated" };
  }

  const customer = await prismadb.user.findFirst({
    where: { id: session.user.id },
  });
  if (!customer) {
    return { error: "Không tìm thấy thông tin khách hàng" };
  }

  let newAddress: Address;
  try {
    const address = await prismadb.address.findFirst({
      where: {
        province: {
          id: values.address.province.id,
        },
        AND: {
          district: {
            id: values.address.district.id,
          },
          ward: {
            id: values.address.ward.id,
          },
          specificAddress: values.address.specificAddress,
        },
      },
    });

    if (!address) {
      newAddress = await prismadb.address.create({
        data: {
          specificAddress: values.address.specificAddress,
          province: {
            connect: {
              id: values.address.province.id,
            },
          },
          district: {
            connect: {
              id: values.address.district.id,
            },
          },
          ward: {
            connect: {
              id: values.address.ward.id,
            },
          },
        },
      });
    } else {
      await prismadb.addressOnUser.create({
        data: {
          address: {
            connect: {
              id: address.id,
            },
          },
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
    }

    if (newAddress != undefined) {
      await prismadb.addressOnUser.create({
        data: {
          address: {
            connect: {
              id: newAddress.id,
            },
          },
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
    } else {
      return { error: "Tạo địa chỉ thất bại!! "};
    }
  } catch (error) {
    return { error: "Tạo địa chỉ thất bại!! "+ error };
  }

  return { success: "Tạo địa chỉ thành công!" };
};


export const deleteAddressAction = async (addressId: string) => {
  const session = await auth();
  const customer = await prismadb.user.findFirst({
    where: { id: session.user?.id },
  });
  if (customer) {
      try {
        const address = await prismadb.address.delete({
          where: {
            id: addressId,
          },
        });
      } catch (error) {
        return { error: "Xóa địa chỉ thất bại!!" };
      }
    }
    return { success: "Xóa địa chỉ thành công!" };
  }