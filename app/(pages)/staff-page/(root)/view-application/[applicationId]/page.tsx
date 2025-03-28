import React from 'react'
import CustomerCard from '@/app/(pages)/manager-page/list-request/[requestId]/components/CustomerCard';
import ApplicationInfo from './components/ApplicationInfo';
import ApplicationDetailHeader from './components/ApplicationHeader';
import StaffCard from './components/StaffCard';
import prismadb from '@/lib/prisma';
type Props = {}

async function ApplicationDetail({ params }: { params: { applicationId: string } }) {

  const report = await prismadb.applicationReport.findUnique({
    where: {
      id: params?.applicationId
    },
    include: {
      user: true,
      AttachedFile: {
        select: {
          fileName: true,
          downloadUrl: true
        }
      },
    }
  })

  return (
    <div className='w-full flex flex-col items-center '>
      <div className='w-11/12'>
        <ApplicationDetailHeader reportId={params?.applicationId} status={report.status} />

        <div className='flex justify-around'>
          <div className='w-3/12 mt-8'>
            <p className='text-xl font-semibold'>Thông tin người gửi</p>
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

              <div className='border shadow-md flex flex-col rounded-2xl min-h-[360px] justify-center p-14 mt-8'>
                <ApplicationInfo
                  type={report.reportType}
                  reason={report.reportContent}
                  sendDate={report.createdAt}
                  updatedAt={report.updatedAt}
                  attachedFile={report.AttachedFile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationDetail
