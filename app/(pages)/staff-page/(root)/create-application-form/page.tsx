import CustomerProfile from '@/app/(pages)/admin-page/transaction-management/[transactionId]/components/CustomerProfile'
import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { ApplicationForm } from './components/ApplicationForm'
import { useSession } from 'next-auth/react'
import { auth } from '@/auth'

type Props = {}

async function CreateApplicationForm({ }: Props) {
  const session = await auth();

  const userData = {
    customerName: session?.user?.name,
    customerEmail: session?.user?.email,
    customerAvatar: session?.user?.image,
    customerPhone: ''

  }
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='mt-12 w-11/12'>
        <div className='flex items-center border  p-3 rounded-lg shadow-md'>
          <ChevronLeft className='text-crusta w-8 h-8 text-xl mr-2' />
          <div>
            <h1 className='text-xl font-semibold'>Tạo đơn yêu cầu</h1>
            <p className='text-gray-500 text-sm'>Tạo yêu cầu tới quản lý</p>
          </div>
        </div>
        <div className='flex lg:flex-row flex-col w-full justify-between'>
          <div className='lg:w-3/12'>
            <CustomerProfile customerName={userData.customerName} customerAvatar={userData.customerAvatar} address={userData.customerEmail} phoneNumber={userData.customerPhone} title='Thông tin nhân viên' />
          </div>
          <div className='lg:w-8/12'>
            <ApplicationForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateApplicationForm
