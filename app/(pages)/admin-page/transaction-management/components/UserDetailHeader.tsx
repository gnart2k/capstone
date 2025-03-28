'use client'
import { ChevronLeft } from 'lucide-react'
import React, { useEffect } from 'react'
import IdIcon from "@/public/id.png"
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

export default function UserDetailHeader({ userId }: { userId: string }) {
  return (
    <div className='flex items-center justify-between border rounded-lg shadow-md p-3'>
      <div className='flex items-center mr-2'>
        <Link href='/admin-page/user-management'>
          <ChevronLeft className='text-crusta mr-4'/>
        </Link>
        
        <div>
          <p className='font-semibold'>Thông tin chi tiết người dùng</p>
          <p className='text-sm font-gray-400'>Chỉnh sửa thông tin người dùng</p>
        </div>
      </div>
      <div className='flex items-center'>
        <Image src={IdIcon.src} height={IdIcon.height} width={IdIcon.width} alt='ID' />
        <p className='font-medium ml-2'>{userId}</p>
      </div>

    </div>
  )
}
