'use client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import UpdateComboForm from './components/UpdateComboForm'
import IDICon from "@/public/id.png"
import Image from 'next/image'

export default function ServiceComboPage({
  params,
}: {
  params: { serviceComboId: string };
}) {
  const router = useRouter();
  const [isAddAction, setIsAddAction] = useState(true);
  useEffect(() => {
    params.serviceComboId.toString() === "add"
      ? setIsAddAction(true)
      : setIsAddAction(false);
  }, []);
  return (
    <div className="w-full flex justify-center">
    <div className="w-11/12 ">
      <div className=' rounded-lg border shadow-md flex items-center justify-between p-4 mt-12'>
        <div className='flex items-center'>
          <ChevronLeft className='w-[30px] text-crusta mr-8' onClick={() => router.back()} />
          <div>
            <p className='font-semibold'>Thông tin chi tiết combo</p>
            <p className='text-sm text-gray-500'>Xem và chỉnh sửa thông tin chi tiết của Combo cụ thể</p>
          </div>
        </div>
        {!isAddAction && (
          <div className="flex">
            <Image
              src={IDICon.src}
              width={IDICon.width}
              height={IDICon.height}
              className="mr-2"
              alt="ID"
            />
            {params.serviceComboId}
          </div>
        )}
      </div>
      <div className="">
        <UpdateComboForm serviceComboId={params.serviceComboId} />
      </div>
      </div>
    </div>
  )
}
