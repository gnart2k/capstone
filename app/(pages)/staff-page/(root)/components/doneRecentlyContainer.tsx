"use client"

import { format } from "date-fns"

export type RecentlyContainerProps = {
  serviceName: string;
  date: Date;
  img: string;

}

export default function RecentlyContainer(props: RecentlyContainerProps) {
  const time = props.date ? format(new Date(props.date), "dd/MM/yyyy") : "N/A";

  return (
    <div>
      <div className="flex items-center mt-4">
        <img className="rounded-full h-[40px] w-[40px] object-cover" src={props.img} alt="avatar"  />
        <div className="ml-2">
          <p className="font-semibold ">{props.serviceName}</p>
          <p className="text-gray-600 text-sm">
            {time}
          </p>
        </div>
      </div>
    </div>
  )

}
