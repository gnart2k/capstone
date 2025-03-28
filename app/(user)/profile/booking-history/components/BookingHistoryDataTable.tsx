"use client"
import { viewAllBookingHistoryAction } from '@/app/actions/profile/booking-history'
import { handleBookingStatus } from '@/app/lib/handleBookingStatus'
import { requestHistoryCollumn } from '@/components/custom/table/requestHistory/columns'
import { DataTable } from '@/components/custom/table/requestHistory/dataTable'
import Loading from '@/components/ui/loading'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
}

export default function BookingHistoryDataTable({ }: Props) {
  const router = useRouter();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await viewAllBookingHistoryAction({ props: "all" })
      setData(data.request)

    }
    const getStatus = async () => {
      await handleBookingStatus();
    }
    let a = 0
    const loop = setInterval(() => {
      getStatus()
      fetchData()
      a++;
      if (a == 3) clearInterval(loop);
    }, 1000)

    router.refresh();
    fetchData();
  }, [])

  return (
    <div>
      {data ? (
        <DataTable columns={requestHistoryCollumn} data={data} />
      ) : (
        <div className='h-[40vh] w-full flex items-center justify-center'>
          <Loading />
        </div>
      )}

    </div>
  )
}
