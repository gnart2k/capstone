import React from 'react'
import { format } from 'date-fns'
import { CloudDownload } from 'lucide-react';


type Props = {
  sendDate: Date;
  type: string;
  reason: string;
  attachedFile: {
    fileName: string;
    downloadUrl: string;
  }[];
}

function ReportInfo(props: Props) {
  const dateString = format(props.sendDate, "dd/MM/yyyy")
  return (
    <div className='w-6/12'>
      <div className='flex flex-col border-b border-b-gray-300 pb-2'>
        <span className='text-crusta font-semibold'>Ngày gửi đơn</span>
        <span>{dateString}</span>
      </div>

      <div className='flex flex-col border-b border-b-gray-300 pb-2'>
        <span className='text-crusta font-semibold'>Loại đơn</span>
        <span>{props.type}</span>
      </div>

      <div className='flex flex-col border-b border-b-gray-300 pb-2'>
        <span className='text-crusta font-semibold'>Lí do làm đơn</span>
        <span>{props.reason}</span>
      </div>

      <div className='flex flex-col border-b border-b-gray-300 pb-2'>
        <span className='text-crusta font-semibold'>Tệp đính kèm</span>
        <div>
          {
            props.attachedFile.map((attachment, i) => (
              <div key={i} className='flex items-center mt-2'>
                <a href={attachment.downloadUrl} target='_blank' className='text-blue-500 hover:underline'>
                  {attachment.fileName.endsWith('jpg') || attachment.fileName.endsWith('png') ? <img src={attachment.downloadUrl} className='rounded-lg w-20 h-20 object-cover' /> : <p>{attachment.fileName}</p>}
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ReportInfo

