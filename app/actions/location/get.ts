"use server"
import prismadb from "@/lib/prisma";

export async function getAllProvinces() {
  const data = await prismadb.province.findMany({
    select: {
      id: true,
      provinceName: true
    }
  });
  return data
}

export async function getAllDistricts(id: number) {
  const data = await prismadb.district.findMany({
    where: {
      provinceId: id
    },
    select: {
      id: true,
      districtName: true,
      provinceId: true
    }
  });
  return data
}

export async function getAllWards(id: number) {
  const data = await prismadb.ward.findMany({
    where: {
      districtId: id
    },
    select: {
      id: true,
      wardName: true,
      districtId: true
    }
  });
  return data
}


