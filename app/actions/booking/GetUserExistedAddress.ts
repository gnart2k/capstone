import prismadb from "@/lib/prisma";

type Props = {
  addressId: string
}

export async function GetUserExistedAddress({ props }: { props: Props }) {
  const existedAddress = await prismadb.address.findFirst({
    where: {
      id: props.addressId
    }
  })

  return existedAddress

}
