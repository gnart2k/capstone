import React from 'react'
import ReportsDataTable from './components/ReportsDataTable'

type Props = {}

function ReportManagement({ }: Props) {

  return (
    <div>
      <div className='border rounded-2xl p-4 mt-12'>
        <p className='text-lg font-medium'>Quản lý đơn</p>
        <p className='font-thin text-gray-500'>Danh sách về các đơn cần xử lý từ nhân viên</p>
      </div>

      <div>
        <ReportsDataTable />
      </div>
    </div>
  )
}

export default ReportManagement
