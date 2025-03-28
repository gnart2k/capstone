'use client'
import { ChevronLeft } from 'lucide-react'
import React, { useEffect } from 'react'
import IdIcon from "@/public/id.png"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function TransactionHeader({ transactionId }: { transactionId: string }) {
  const router = useRouter();
  return (
    <div className='flex items-center justify-between border rounded-lg shadow-md px-6 py-3 w-full'>
      <div className='flex items-center mr-2'>
        <ChevronLeft onClick={() => router.back()} className='text-crusta mr-4' />
        <div>
          <p className='font-semibold'>Chi tiết giao dịch</p>
          <p className='text-sm text-gray-500'>Thông tin chi tiết của giao dịch</p>
        </div>
      </div>
      <div className='flex items-center'>
        <Image src={IdIcon.src} height={IdIcon.height} width={IdIcon.width} alt='ID' />
        <p className='font-medium ml-2'>{transactionId}</p>
      </div>

    </div>
  )
}

