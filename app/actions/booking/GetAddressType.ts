type Props = {
  userAddress: string,
  address: {
    province: string,
    district: string,
    ward: string,
    specificAddress: string,
  }
}

export const addressType = { oldAddress: "oldAddress", newAddress: "newAddress" }
export default function getAddressType({ validData }: { validData: Props }) {
  if (validData.address?.province?.length > 0 && validData.address?.district?.length > 0 && validData?.address?.ward && validData?.address?.specificAddress.length > 0) return addressType.newAddress
  if (validData.userAddress) {
    if (validData.userAddress.length > 0) return addressType.oldAddress
  }
  return null
}
