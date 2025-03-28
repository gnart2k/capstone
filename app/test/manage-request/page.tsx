"use client"
import React, { useEffect } from 'react'
import useSWR from 'swr'
import GenerateSampleFile from '../components/GenerateSampleFile'
import ReadExcelFile from '../components/ReadExcelFile'

type Props = {}

export default function TestListData({ }: Props) {
  return (
    <div className=''>
      <div className='mt-8'>

        <GenerateSampleFile />
        <ReadExcelFile />
      </div>
    </div>

  )
}
