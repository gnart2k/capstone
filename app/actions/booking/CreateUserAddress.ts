import prismadb from "@/lib/prisma";

type Props = {
  provinceId: number;
  districtId: number;
  wardId: number;
  specificAddress: string;
}
export async function CreateUserAddress({ props }: { props: Props }) {
  //check if address is existed in database 
  console.log(props)
  const isExistedAddress = await prismadb.address.findFirst({
    where: {
      specificAddress: props.specificAddress,
      district: {
        id: props.districtId
      },
      ward: {
        id: props.wardId
      },
      province: {
        id: props.provinceId
      }
    }
  })


  if (isExistedAddress) {
    return isExistedAddress
  }

  const newAddress = await prismadb.address.create({
    data: {
      province: {
        connect: {
          id: +props.provinceId
        }
      },
      district: {
        connect: {
          id: +props.districtId
        }
      },
      ward: {
        connect: {
          id: +props.wardId
        }
      },
      specificAddress: props.specificAddress
    }
  })

  return newAddress
}
