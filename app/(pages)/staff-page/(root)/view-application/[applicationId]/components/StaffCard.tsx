"use client"
import { CustomerCardProps } from '@/type/customerCard';
import React from 'react'


function StaffCard({ props }: { props: CustomerCardProps }) {
  return (
    <div className='mt-8 '>
      <div className='border shadow-md min-h-[62vh]
      flex flex-col rounded-2xl items-center p-8 mt-8'>
        <div className='rounded-full border p-2 '>
          <img src={props.avatar} alt={props.name} className='rounded-full w-[175px] h-[175px] object-cover' />
        </div>
        <span className='text-2xl text-center font-semibold'>{props.name}</span>
        <span className='text-sm text-gray-500 mb-2 mt-2'>{props.address}</span>
        <div className='flex items-center'>
          {props.phone &&
            <span className='text-sm text-gray-500 mr-2'>Số điện thoại: {props.phone}</span>
          }
        </div>
      </div>
    </div>
  )
}

export default StaffCard
