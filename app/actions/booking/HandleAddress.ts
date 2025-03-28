import { BookingResponseType } from "."
import { CreateUserAddress } from "./CreateUserAddress"
import getAddressType, { addressType } from "./GetAddressType"
import { GetUserExistedAddress } from "./GetUserExistedAddress"
type Props = {
  userAddress: string,
  province: string,
  provinceId: number,
  district: string,
  districtId: number,
  ward: string,
  wardId: number,
  specificAddress: string,
}

export async function handleAddress({ validData }: { validData: Props }): Promise<BookingResponseType> {
  const requestAddressType = getAddressType({ validData: { userAddress: validData.userAddress, address: { province: validData.province, district: validData.district, ward: validData.ward, specificAddress: validData.specificAddress } } })
  if (!requestAddressType) {
    return { data: null, isSuccess: false, message: "Địa chỉ không hợp lệ, vui lòng thử lại", }
  }

  let address = null
  if (requestAddressType == addressType.newAddress) {
    //TODO: create new address and return address object
    address = await CreateUserAddress({ props: { provinceId: validData.provinceId, districtId: validData.districtId, wardId: validData.wardId, specificAddress: validData.specificAddress } })
  } else {
    //DONE: get current user address base on input
    address = await GetUserExistedAddress({ props: { addressId: validData.userAddress } })
  }
  return { data: address, isSuccess: true, message: "" };

}
