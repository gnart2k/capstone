"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SquarePen } from "lucide-react";

import { io } from "socket.io-client";
import UpdateMap from "@/components/custom/mapbox/UpdateMap";

const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);

type ViewProfileBoxProps = {
  name: string,
  dob: string,
  phone: string,
  gender: string,
  address: {
    id: string
    provinceName: string,
    districtName: string,
    wardName: string,
    specificAddress: string
    isDefault: boolean
  } | undefined
}
export default function ViewProfileBox(data: ViewProfileBoxProps) {
  const router = useRouter();

  const formattedDate = new Date(data.dob).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="flex mt-10 w-full">
      <div className="ml-4 w-6/12">
        <h2 className="text-xl font-semibold ">Thông tin cá nhân của bạn</h2>
        <div className="mt-3 ml-6">
          <h3 className="font-semibold text-lg mb-2">Họ và tên</h3>
          <h4>{data.name}</h4>
          <hr></hr>
        </div>
        <div className="mt-3 ml-6">
          <h3 className="font-semibold text-lg mb-2">Ngày tháng năm sinh</h3>
          <h4>{formattedDate}</h4>
          <hr></hr>
        </div>
        <div className="mt-3 ml-6">
          <h3 className="font-semibold text-lg mb-2">Giới tính</h3>
          <h4>{data.gender}</h4>
          <hr></hr>
        </div>
        <div className="mt-3 ml-6">
          <h3 className="font-semibold text-lg mb-2">Số điện thoại</h3>
          <h4>{data.phone}</h4>
          <hr></hr>
        </div>
        <div className="mt-3 ml-6">
          <h3 className="font-semibold text-lg mb-2">Địa chỉ</h3>
          <h4>{data.address.specificAddress} {data.address.wardName} {data.address.districtName}  {data.address.provinceName}</h4>
          <hr></hr>
        </div>
        <div className=""></div>
        <div className="flex justify-end w-full my-4">
          <Button onClick={() => { router.push("/profile/user/update") }} className="bg-[#FF6A28] opacity-80 font-bold shadow-gray-200 shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-crusta" >
            <SquarePen />
            <span className="ml-2">Cập nhật</span>
          </Button>
        </div>
      </div>
      <div className="ml-4 w-5/12">
        {
          <UpdateMap />
        }
      </div>

    </div>
  )
}
