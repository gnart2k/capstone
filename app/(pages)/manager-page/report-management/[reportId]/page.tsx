import React from 'react'
import ReportInfo from './components/ReportInfo'
import ReportDetailHeader from './components/ReportHeader'
import UpdateReportStatusForm from './components/ReportVerificationForm';
import StaffCard from '../components/StaffCard';
import prismadb from '@/lib/prisma';
type Props = {}

async function StaffReportDetail({ params }: { params: { reportId: string } }) {

  const report = await prismadb.applicationReport.findUnique({
    where: {
      id: params?.reportId
    },
    include: {
      user: true,
      AttachedFile: {
        select: {
          fileName: true,
          downloadUrl: true
        }
      }
    },
  })

  return (
    <div className='w-full flex flex-col items-center '>
      <div className='w-11/12'>
        <ReportDetailHeader reportId={params?.reportId} status={report.status} />

        <div className='flex justify-around'>
          <div className='w-3/12 mt-10'>
            <p className='text-xl font-semibold'>Thông tin nhân viên</p>
            <StaffCard props={{
              name: report.user.name,
              avatar: report.user.image,
              address: report.user.email,
              phone: report.user.phone
            }} />

          </div>
          <div className='w-8/12'>
            <div className='mt-8'>
              <div className='flex items-center justify-between'>
                <p className='text-xl font-semibold'>Thông tin đơn gửi</p>
              </div>

              <div className='border shadow-md flex flex-col rounded-2xl min-h-[61vh] justify-center p-14 mt-8'>
                <ReportInfo
                  type={report.reportType}
                  reason={report.reportContent}
                  sendDate={report.createdAt}
                  attachedFile={report.AttachedFile}
                />
                <div className='flex items-center justify-end'>
                  <UpdateReportStatusForm
                    id={report.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffReportDetail
