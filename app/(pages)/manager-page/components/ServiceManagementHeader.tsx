"use client"

import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

function ServiceManagementHeader({ }: Props) {
  return (
    <div className='border rounded-lg flex items-center justify-between p-4 w-full mb-8 '>
      <div>
        <p className='font-semibold '>Quản lý dịch vụ</p>
        <p className='text-gray-400 text-sm mt-2'>Danh sách về các dịch vụ dành cho khách hàng</p>

      </div>
      <Link href={"/manager-page/service-management/add"} className=''>
        <div className='rounded-md p-2 bg-crusta text-white flex items-center'>
          <PlusCircle className='w-[18px] mr-2' />
          <p>Thêm dịch vụ</p>
        </div>
      </Link>

    </div>
  )
}

export default ServiceManagementHeader
