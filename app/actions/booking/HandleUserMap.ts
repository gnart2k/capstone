import { BookingResponseType } from "."
import { checkUserMapInRange } from "./CheckExistedUserMap"
import { createMapAddress } from "./map/CreateMapAddress"

type HandleUserMapProps = {
  longitude: number,
  latitude: number,
  mapLink: string,
  addressText: string
}

export async function handleUserMap({ props }: { props: HandleUserMapProps }): Promise<BookingResponseType> {
  if (!props?.latitude || !props?.longitude) return { data: null, isSuccess: false, message: "" }
  //check map in range, if not create new, else return found map
  const existedMapInRange = await checkUserMapInRange({ props: { map: { longitude: props.longitude, latitude: props.latitude } } })
  if (existedMapInRange.length == 0) {
    //TODO: create new map
    if (!props?.latitude || !props?.latitude || !props?.mapLink || !props?.addressText) return ({ data: null, isSuccess: false, message: "" })
    const newMap = await createMapAddress({ props: { longitude: props.longitude, latitude: props.latitude, addressText: props.addressText, mapLink: props.mapLink } })
    return { data: newMap, isSuccess: true, message: "new map" }
  } else {
    return { data: existedMapInRange[0], isSuccess: true, message: "there are map in range" }
  }
}
