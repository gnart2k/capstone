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

export const updateProfileAction = async (
  values: z.infer<typeof UpdateProfileSchema>
) => {
  const validatedFields = UpdateProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }

  const { name, phone, dob, gender } = validatedFields.data;
  const session = await auth();
  const customer = await prismadb.user.findFirst({
    where: { id: session.user?.id },
  });
  if (customer) {
    const user = await prismadb.user.update({
      data: {
        name: name,
        phone: phone,
        dob: dob,
        gender: gender,
      },
      where: {
        id: session.user.id,
      },
    });
    if (user) {
      return { success: "Cập nhật thông tin thành công" };
    }
  }
  return { error: "Có lỗi xảy ra, vui lòng thử lại" };
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