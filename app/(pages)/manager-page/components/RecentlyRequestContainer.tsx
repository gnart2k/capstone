"use client"

import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { getStatusText } from "../../staff-page/(root)/components/upcomingWorkCard";

type RecentlyRequestType = {
  status: string;
  serviceName: string;
  titleServiceCombo: string;
  descriptionServiceCombo: string;
  date: Date;
  address: {
    provinceName: string,
    districtName: string,
    wardName: string,
    specificAddress: string
  };
  time: string;
}

export default function RecentlyRequest(props: RecentlyRequestType) {
  const time = props.date ? format(new Date(props.date), "dd/MM/yyyy") : "N/A";

  return (
    <div>
      <div className="mt-4 grid grid-cols-6 gap-4">
        <div className="flex gap-2 items-center ">
          <div className={cn("flex items-center justify-center rounded-3xl py-1 w-36",
            props.status === 'pending' && 'bg-yellow-100',
            props.status === 'complete' && 'bg-green-100',
            props.status === 'confirmed' && 'bg-blue-100',
            props.status === 'paid' && 'bg-orange-100',
            props.status === 'canceled' && 'bg-red-100')}>
            <span className="relative flex h-3 w-3 mr-2">
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75",
                props.status === 'pending' && 'bg-yellow-400',
                props.status === 'paid' && 'bg-orange-400',
                props.status === 'confirmed' && 'bg-blue-400',
                props.status === 'complete' && 'bg-green-400',
                props.status === 'canceled' && 'bg-red-400')}>
              </span>
              <span className={cn("relative inline-flex rounded-full h-3 w-3",
                props.status === 'pending' && 'bg-yellow-500',
                props.status === 'paid' && 'bg-orange-500',
                props.status === 'confirmed' && 'bg-blue-500',
                props.status === 'complete' && 'bg-green-500',
                props.status === 'canceled' && 'bg-red-500')} >

              </span>
            </span>
            <p className=
              {cn(props.status === 'pending' && 'text-yellow-700',
                props.status === 'paid' && 'text-orange-700',
                props.status === 'confirmed' && 'text-blue-700',
                props.status === 'complete' && 'text-green-700',
                props.status === 'canceled' && 'text-red-700')}>
              {getStatusText(props.status)}
            </p>
          </div>
        </div>


        <div className="">
          <p className="font-semibold ">{props?.serviceName}</p>
          <p className="text-gray-600 text-sm">
            {props.titleServiceCombo} - {props.descriptionServiceCombo}
          </p>
        </div>

        <div className="">
          <p className="font-semibold">
            {props.time}
          </p>
          <p className="text-gray-600 text-sm">
            {time}
          </p>
        </div>

        <div className="ml-6 col-span-3">
          <p className="font-semibold ">{props?.address.specificAddress} {props.address.wardName} {props.address.districtName} {props.address.provinceName}</p>

        </div>

      </div>
    </div>
  )

}

