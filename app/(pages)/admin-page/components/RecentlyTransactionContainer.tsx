"use client"

import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { getStatusText } from "../../staff-page/(root)/components/upcomingWorkCard";
import { currencyFormater } from "@/app/lib/currencyFormat";
import { TransactionType } from "@/type/transaction";

export default function RecentlyTransactionContainer({ props }: { props: TransactionType }) {
  const time = props.date ? format(new Date(props.date), "dd/MM/yyyy") : "N/A";

  return (
    <div>
      <div className="flex items-center mt-4 justify-between mr-4">
        <div className="flex gap-2 items-center">
        </div>
        <div className="flex items-center">
          <img src={props.userAvatar} alt={props.userName} className="w-10 h-10 rounded-full" />
          <p className="ml-2 font-medium">{props.userName}</p>
        </div>


        <div className="ml-2">
          <p className="font-semibold ">{props?.service?.serviceName}</p>
          <p className="text-gray-600 text-sm">
            {props.serviceCombo.title} - {props.serviceCombo.description}
          </p>
        </div>

        <div className="ml-2">
          <p className="font-semibold">
            {'Giá tiền'}
          </p>
          <p className="text-gray-600 text-sm">
            {currencyFormater.format(props.amount)}VND
          </p>

        </div>

        <div className="ml-2">
          <p className="font-semibold ">{props?.address}</p>
          <p className="text-gray-600 text-sm">
            {time}
          </p>
        </div>
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
    </div>
  )

}


