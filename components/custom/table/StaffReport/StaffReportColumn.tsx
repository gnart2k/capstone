"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronRight, CircleAlert, CircleCheckBig, CircleX} from "lucide-react"
import { Button } from "@/components/ui/button"
import { StaffReportType } from "@/type/report"
import Link from "next/link"


export const StaffReportColumn: ColumnDef<StaffReportType>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="ml-4 text-crusta">
          Mã đơn
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="ml-4">
          <p>#{row.getValue("id")}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "staffName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="text-crusta flex items-center">
            Nhân viên
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </Button>
      )
    },

    cell: ({ row }) => <div className="flex items-center text-[16px] ml-3">
      <img className="rounded-full w-[36px] mr-2" src={row.original.staffAvatar} alt={row.original.staffName} />
      <div className="">
        <p>
          {row.getValue("staffName")}
        </p>
        <p className="text-sm text-gray-400">
          {row.original.staffEmail}
        </p>
      </div>
    </div>
  },

  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="flex items-center text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >

            Ngày gửi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <i className="bi bi-gender-ambiguous text-crusta text-xl  mr-2" />
      <p className="mb-1">
        {row.getValue("date")}
      </p>
    </div>
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex items-center text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trạng thái
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="flex items-end ml-3">
      {
        row.getValue("status") == "Đã chấp thuận" && (
          <div className="flex items-center justify-center text-green-400 rounded-lg ">
            <CircleCheckBig className="w-10 " />
            <div>
              {row.getValue("status")}
            </div>
          </div>
        )

      }
      {
        row.getValue("status") == "Đã từ chối" && (
          <div className="flex items-center justify-center text-red-400 rounded-lg ">
            <CircleX className="w-10" />
            {row.getValue("status")}
          </div>
        )
      }

      {
        row.getValue("status") == "Chờ xử lý" && (
          <div className="flex items-center justify-center text-blue-400 rounded-lg ">

            <CircleAlert className="w-10" />
            {row.getValue("status")}
          </div>
        )
      }


    </div>
  },

  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <div className="flex items-center text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Loại đơn
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <p>
        {row.getValue("type")}
      </p>
    </div>
  },

  {
    accessorKey: "actions",
    header: ({ column }) => (
      <div></div>
    ),
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <div className="text-crusta">
        <Link href={`/manager-page/report-management/${row.original.id}`} >
          <ChevronRight />
        </Link>
      </div>
    </div>
  },





]




