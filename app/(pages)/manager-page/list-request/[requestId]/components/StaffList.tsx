"use client"
import React from 'react'
import staffImg from '@/public/staffIcon.png'
import genderIcon from '@/public/genderIcon.png'
import phoneIcon from '@/public/phoneIcon.png'
import mapPinIcon from '@/public/MapPìn.png'
import starIcon from '@/public/starFillIcon.png'
import Image from 'next/image';
import StaffEditDialog from './StaffEditDialog';
import { StaffListProps } from '@/type/staff';
import { useStaffPerRequestStore } from '@/app/store/useStaffPerRequestStore'


function StaffList({ props }: { props: StaffListProps[] }) {
  const currentStaffId: string[] = props.filter(prop => prop.id).map(e => e.id)
  const setOnSelectedStaffId = useStaffPerRequestStore(state => state.setOnSelectedStaffId)


  return (
    <div className='mt-8 overflow-auto'>
      <div className='flex items-center justify-between'>
        <p className='text-xl font-semibold'>Nhân viên đảm nhận</p>
      </div>
      {
        props.map((prop, index) => (
          <div key={prop.id} className='border shadow-md flex rounded-2xl items-center justify-between p-8 mt-4'>
            <img src={prop.staffAvatar} alt={prop.staffName} className='rounded-xl w-[40px] h-[40px] object-cover mr-8' />
            <div className='flex items-center '>
              <Image src={staffImg.src} width={staffImg.width} height={staffImg.height} alt='' />
              <span className='text-sm font-semibold ml-2'>{prop.staffName}</span>
            </div>
            <div className='flex items-center '>
              <Image src={genderIcon.src} width={genderIcon.width} height={genderIcon.height} alt='' />
              <span className='text-sm font-semibold ml-2'>{prop.staffGender}</span>
            </div>
            <div className='flex items-center '>
              <Image src={phoneIcon.src} width={phoneIcon.width} height={phoneIcon.height} alt='' />
              <span className='text-sm text-gray-500 ml-2'>{prop.phone}</span>
            </div>
            <div className='flex items-center '>
              <Image src={starIcon.src} width={starIcon.width} height={starIcon.height} alt='' />
              <span className='text-sm text-gray-500 ml-2'>{prop.credibility}</span>
            </div>
            <div className='flex items-center '>
              <Image src={mapPinIcon.src} width={mapPinIcon.width} height={mapPinIcon.height} alt='' />
              <span className='text-sm text-gray-500 ml-2'>{prop.address}</span>
            </div>

            <div onClick={() => setOnSelectedStaffId(prop.id)}>
              <StaffEditDialog props={{ staffId: currentStaffId }} />
            </div>
          </div>
        ))
      }
    </div>

  )
}

export default StaffList
