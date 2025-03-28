'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PhoneCall } from 'lucide-react';
import React from 'react'

type Props = {
  customerName: string;
  address: string;
  phoneNumber: string;
  customerAvatar: string;
  title: string;
}

export default function CustomerProfile({ customerName, customerAvatar, address, phoneNumber, title }: Props) {
  return (
    <div className='lg:ml-4 w-full mt-4 mr-2'>
      <p className='text-lg font-semibold mb-4'>{title}</p>
      <div className='flex flex-col lg:items-center lg:justify-center w-full shadow-lg lg:pb-52 pb-4 border rounded-2xl '>
        <div className='rounded-lg flex lg:flex-col ml-4 gap-8 items-center lg:justify-center mt-4'>
          <div className='xl:w-52 xl:h-52  md:h-32 md:w-32 border-2 border-gray-300  rounded-full flex items-center justify-center'>
            <Avatar className='xl:w-48 xl:h-48 md:h-28 md:w-28 h-20 w-20'>
              <AvatarImage src={customerAvatar} alt={customerName} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className='text-center mt-4'>
            <p className='text-lg font-semibold mt-2 '>{customerName}</p>
            <p className='text-gray-500 mt-2'>{address}</p>
            <p className='font-semibold text-sm mt-2'>{phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
