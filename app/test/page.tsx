'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import LocationReminder from '@/components/custom/LocationReminder'

type Props = {}

export default function Page({ }: Props) {

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <LocationReminder />
    </div>

  )
}
