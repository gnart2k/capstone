import { getDistanceFromLatLon } from "@/app/lib/getDistance";
import { auth } from "@/auth";
import prismadb from "@/lib/prisma";
import { redirect } from "next/navigation";

type Props = {
  map: {
    latitude: number,
    longitude: number
  }
}
export async function checkUserMapInRange({ props }: { props: Props }) {
  const session = await auth();
  let result = []

  const currentUser = await prismadb.user.findUnique({
    where: {
      id: session?.user?.id
    },
    include: {
      maps: {
        select: {
          mapId: true
        }
      }
    }
  })

  if (!currentUser) {
    return []
  }

  //check has exited map in radius 100m from current location 
  for (let i = 0; i < currentUser.maps.length; i++) {
    const mapid = currentUser.maps[i].mapId;
    const existedMap = await prismadb.mapAddress.findUnique({
      where: {
        id: mapid
      }
    })
    const distance = getDistanceFromLatLon(existedMap.lat, existedMap.lng, props?.map?.latitude, props?.map?.longitude)
    if (distance < 100) {
      const requestMap = currentUser.maps[i];
      result.push(requestMap)
      break;
    }
  }

  return result

}
