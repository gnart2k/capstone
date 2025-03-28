"use client"
import { useStaffPerRequestStore } from "@/app/store/useStaffPerRequestStore"
import { staffEditColumn } from "@/components/custom/table/StaffEditTable/StaffEditTableColumn"
import { DataTable } from "@/components/custom/table/requestHistory/dataTable"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StaffColumn } from "@/type/staff/staff-columns"
import PencilSquareIcon from "@heroicons/react/20/solid/PencilSquareIcon"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from "swr"

type Props = {
  staffId: string[]
}

export default function StaffEditDialog({ props }: { props: Props }) {
  const setSelectedStaffId = useStaffPerRequestStore(state => state.setSelectedStaffId);
  const params = useParams();
  const [fetchData, setFetchData] = useState([]);

  const fetchResult = async () => {
    setSelectedStaffId(props.staffId);
    const response = await fetch(`/api/staff/request/${params.requestId}`)
    const responseJson = await response.json();
    console.log(responseJson)
    setFetchData(responseJson)
    // return response?.then(data => data.json())
  }

  useEffect(() => {
    fetchResult();
  }, [])

  const staffData: StaffColumn[] = fetchData

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex items-center p-2 bg-crusta rounded-lg text-white hover:bg-orange-400' >
          <PencilSquareIcon className='w-4 mr-2' />
          Chỉnh sửa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1500px]">
        <DataTable data={staffData} columns={staffEditColumn} />
      </DialogContent>
    </Dialog>
  )
}

