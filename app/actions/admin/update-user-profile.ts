"use server";
import * as z from "zod";
import prismadb from "@/lib/prisma";
import { CreateUserSchema, updateUserSchema } from "@/schema";
import { isAdmin } from "@/app/lib/checkPermittedRole";
import { getUserByEmail } from "@/app/lib/data";
import bcrypt from "bcryptjs"
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
  userId: string
};
export const updateUserProfileAction = async (
  values: z.infer<typeof updateUserSchema>
) => {
  const isPermitted = await isAdmin();
  if (!isPermitted) {
    return { error: "Bạn không có quyền chỉnh sửa profile của người dùng" };
  }
  const validatedFields = updateUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }

  const { id, name, phoneNumber, dateOfBirth, email, role, gender, status } =
    validatedFields.data;
  const customer = await prismadb.user.findFirst({
    where: { id: id },
  });

  const r = await prismadb.role.findFirst({
    where: { roleName: role },
  });

  if (customer) {
    const user = await prismadb.user.update({
      data: {
        gender: gender,
        name: name,
        phone: phoneNumber,
        dob: dateOfBirth,
        email: email,
        roleId: r.id,
        status: status,
      },
      where: {
        id: id,
      },
    });
    if (user) {
      return { success: "Cập nhật thông tin thành công" };
    }
  }
  return { error: "Có lỗi xảy ra, vui lòng thử lại" };
};


export const createUserProfileAction = async (
  values: z.infer<typeof CreateUserSchema>
) => {
  const isPermitted = await isAdmin();
  if (!isPermitted) {
    return { error: "Bạn không có quyền tạo người dùng mới" };
  }
  const validatedFields = CreateUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }
  const defaultAvatar = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

  const { name, phone, dob, email, role, password, confirmPassword, gender } = validatedFields.data;
  const roleUser = await prismadb.role.findFirst({
    where: {
      roleName: role
    }
  })
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email đã được sử dụng" }
  }

  if (password !== confirmPassword) {
    return { error: "Xác nhận mật khẩu chưa chính xác! Vui lòng nhập lại" }
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const customer = await prismadb.user.create({
    data: {
      email: email,
      name: name,
      phone: phone,
      gender: gender,
      dob: dob,
      image: defaultAvatar,
      password: hashedPassword,
      emailVerified: new Date(),
      role: {
        connect: {
          id: roleUser.id
        }
      }
    }
  });

  if (customer) {
    return {success: "Tạo người dùng thành công!"}
  }
  return { error: "Có lỗi xảy ra, vui lòng thử lại" };
};

export const createUserAddressAction = async (values: AddressCreate) => {

  const customer = await prismadb.user.findFirst({
    where: { id: values.userId },
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
              id: values.userId,
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
              id: values.userId,
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


export const updateUserAddressAction = async (values: AddressInput, userId: string) => {

  const customer = await prismadb.user.findFirst({
    where: { id: userId},
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

export const deleteUserAddressAction = async (addressId: string, userId: string) => {
  const customer = await prismadb.user.findFirst({
    where: { id: userId },
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
