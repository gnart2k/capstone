'use client'

import { TransactionDetail } from '@/type/transaction'
import React from 'react'
import TransactionDetailCard from './TransactionDetailCard'
import CustomerProfile from './CustomerProfile'


export default function TransactionDetailContainer({ props }: { props: TransactionDetail }) {
  const propsData: any[] = [
    {
      label: "Mã giao dịch",
      content: props.transactionId
    },
    {
      label: "Ngày giao dịch",
      content: props.transactionDate
    },
    {
      label: "Số tiền",
      content: props.amount
    },
    {
      label: "Trạng thái giao dịch",
      content: props.status
    },
    {
      label: "Phương thức thanh toán",
      content: props.transactionType
    },
    {
      label: "Dịch vụ",
      content: props.serviceName
    },
  ];


  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-8 mt-4 '>
        <div className='flex items-center justify-between '>
          <p className='text-lg font-semibold'>Thông tin giao dịch</p>
        </div>
        <div className='overflow-scroll max-h-[730px] mt-4'>
          {propsData.map((element, index) => (
            <TransactionDetailCard label={element.label} content={element.content} key={index} />
          ))}
        </div>
      </div>

      <div className='col-span-4'>
        <CustomerProfile customerName={props.customerName} customerAvatar={props.customerAvatar} address={props.address} phoneNumber={props.phoneNumber} title='Khách hàng' />
      </div>
    </div>
  )
}
