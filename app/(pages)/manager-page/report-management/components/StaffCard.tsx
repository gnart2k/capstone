"use client"
import { Button } from '@/components/ui/button';
import { CustomerCardProps } from '@/type/customerCard';
import { Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react'


function StaffCard({ props }: { props: CustomerCardProps }) {
  const [editField, setEditField] = useState<string | null>(null);


  return (
    <div className='mt-8 '>
      <div className='border h-[60vh] shadow-md flex flex-col rounded-2xl items-center justify-center p-8 mt-8'>
        <div className='rounded-full border p-2 '>
          <img src={props.avatar} alt={props.name} className='rounded-full w-[175px] h-[175px] object-cover' />
        </div>
        <span className='text-2xl font-semibold text-center'>{props.name}</span>
        <span className='text-sm text-gray-500 mb-2 mt-2'>{props.address}</span>
        <div className='flex items-center'>
          <span className='text-sm text-gray-500 mr-2'>Số điện thoại:</span>
          <span className='text-sm text-gray-500 mb-2 mt-2'>{props.phone}</span>
        </div>

        <div className='border-t border-gray-300 mt-4 p-2 w-full flex items-center flex-col justify-center'>
          <Button variant='ghost' className='bg-crusta flex  text-white mt-4'>
            <Phone className='w-[15px] mr-2' />
            <p>Gọi ngay</p></Button>
        </div>
      </div>
    </div>
  )
}


export default StaffCard
