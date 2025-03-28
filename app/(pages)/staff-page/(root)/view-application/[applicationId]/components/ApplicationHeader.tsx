'use client'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import idImage from "@/public/id.png"
import { getReportStatusText } from '@/app/(pages)/staff-page/(root)/components/upcomingWorkCard'
import { cn } from '@/lib/utils'


type Props = {
  reportId: string;
  status: boolean | null;
}

export default function ApplicationDetailHeader({ reportId, status }: Props) {

  return (
    <div className='rounded-lg border shadow-md flex items-center justify-between p-4 mt-12'>
      <div className='flex items-center'>
        <Link href='/staff-page/view-application'>
          <ChevronLeft className='w-[30px] text-crusta mr-8' />
        </Link>

        <div>
          <p className='font-semibold'>Chi tiết đơn</p>
          <p className='text-sm text-gray-500'>Chi tiết đơn đã gửi tới Quản Lý</p>
        </div>
      </div>
      <div className='flex items-center'>
        <Image src={idImage.src} width={idImage.width} height={idImage.height} alt='' />
        <span className="ml-2 mr-2">{reportId}</span>
        <p> | </p>
        <div className="flex items-end text-[16px] ml-3">
          <div className={cn(
            "flex items-center justify-center rounded-3xl py-1 w-36",
            'paid' === 'paid' && '',
          )}>
            <span className="relative flex h-3 w-3 mr-2" >
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                status === true ? 'bg-green-400' :
                  status === false ? 'bg-red-400' : 'bg-orange-400'
              )}></span>
              <span className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                status === true ? 'bg-green-500' :
                  status === false ? 'bg-red-500' : 'bg-orange-500'
              )}></span>
            </span>
            <p className={cn(
              status === true ? 'text-green-700' :
                status === false ? 'text-red-700' : 'text-orange-700'
            )}>
              {getReportStatusText(status)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
