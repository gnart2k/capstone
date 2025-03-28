import { listAllRequests } from '@/app/actions/request/RequestAction';
import { ManagerListRequestColumn, ManagerListRequestProps } from '@/components/custom/table/ManagerListRequest/ManagerListRequestColumn';
import { DataTable } from '@/components/custom/table/requestHistory/dataTable';
import React from 'react'

type Props = {}

export default async function ManagerListRequest({ }: Props) {
  const data = await listAllRequests();
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-11/12'>
        <div className='rounded-lg p-8 border shadow-md mt-12'>
          <div className='flex flex-col'>
            <span className='font-semibold'>Quản lý yêu cầu</span>
            <span className='text-sm text-gray-500'>Danh sách về các yêu cầu đặt dịch vụ từ khách hàng</span>
          </div>
        </div>

        <div>
          <DataTable columns={ManagerListRequestColumn} data={data.data} />
        </div>
      </div>

    </div>
  )
}
