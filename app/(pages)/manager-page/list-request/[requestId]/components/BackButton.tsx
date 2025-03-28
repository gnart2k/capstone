'use client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

function BackButton({ }: Props) {
  const router = useRouter()
  return (
    <div className='flex items-center'>
      <ChevronLeft className='w-[30px] text-crusta mr-8' onClick={() => router.back()} />
      <div>
        <p className='font-semibold'>Chi tiết yêu cầu</p>
        <p className='text-sm text-gray-500'>Danh sách về các dịch vụ dành cho khách hàng</p>
      </div>
    </div>

  )
}

export default BackButton
