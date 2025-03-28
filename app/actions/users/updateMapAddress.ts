"use server"
import { auth } from "@/auth";
import prismadb from "@/lib/prisma";
import { MapType } from "@/type/location";

export async function UpdateMapAddress({ props }: { props: MapType }) {

  const session = await auth();
  if (!session) {
    return ({ success: false, message: "Bạn cần đăng nhập để thực hiện tác vụ này" })
  }


  console.log(props)
  if (!props.latitude || !props.latitude) {
    return ({ success: false, message: "Không tìm được vị trí cập nhật" })
  }

  let existedMap = null;

  try {

    let map = await prismadb.mapAddress.findFirst({
      where: {
        lat: +props.latitude,
        AND: {
          lng: +props.longitude,

        },
      }
    })


    if (!map) {
      map = await prismadb.mapAddress.create({
        data: {
          mapLink: props.mapLink,
          addressText: props.latitude + props.longitude + "",
          lat: +props.latitude,
          lng: +props.longitude,
        }
      })

    } else {
      existedMap = await prismadb.mapAddressOnUser.findFirst({
        where: {
          userId: session.user.id,
          mapId: map?.id,
        }
      })
    }


    if (!existedMap) {
      const otherMap = await prismadb.mapAddressOnUser.deleteMany({
        where: {
          userId: session?.user?.id
        }
      })
      console.log(otherMap)
      const result = await prismadb.mapAddressOnUser.create({
        data: {
          mapId: map.id,
          userId: session?.user?.id,
        }
      })

      return ({ success: true, message: "Cập nhật địa chỉ thành công" })
    } else {
      return ({ success: true, message: "Địa chỉ đã được liên kết với tài khoản của bạn" })

    }
  } catch (error) {
    console.log(error)
    return ({ success: false, message: "Có lỗi xảy ra trong quá trình cập nhật vị trí, vui lòng thử lại sau" })
  }

}
