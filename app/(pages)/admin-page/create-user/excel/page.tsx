"use client"
import GenerateSampleFile from '@/app/test/components/GenerateSampleFile'
import ReadExcelFile from '@/app/test/components/ReadExcelFile'
import React, { useEffect } from 'react'
import useSWR from 'swr'

type Props = {}

export default function CreateUserWithExcel({ }: Props) {
  return (
    <div className='mt-12 flex items-center justify-center'>
      <div className='w-10/12 '>
        <div className='border rounded-lg text-slate-600 p-8'>
          <p className='text-xl font-semibold '>Hướng dẫn tạo user bằng file xlsx</p>
          <div className='text-md mt-4'>
            <p className='font-semibold'>Bước 1: </p>
            <p >Tải xuống file mẫu ở dưới và điền thông tin phù hợp</p>
            <p className='font-semibold'>Bước 2: </p>
            <p >Tải lên file vừa chỉnh sửa và ấn nút tạo</p>

          </div>
        </div>
        <div className='mt-4 border rounded-lg p-4'>
          <GenerateSampleFile />
        </div>
        <div className='mt-4 border rounded-lg p-4 max-h-[40vh] overflow-auto'>
          <ReadExcelFile />
        </div>
      </div>
    </div>

  )
}

