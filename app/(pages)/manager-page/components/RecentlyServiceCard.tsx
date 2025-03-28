"use client";

import { format } from "date-fns";
import React from "react";

export type RecentlyServiceCardProps = {
  id: string;
  serviceName: string;
  serviceImage: string;
  serviceComboNumber: number;
  createdAt: Date;
}

export default function RecentlyServiceCard(props: RecentlyServiceCardProps) {
  const time = props.createdAt ? format(new Date(props.createdAt), "dd/MM/yyyy") : "N/A";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/6478/6478111.png";
    e.currentTarget.classList.add('error-image');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center min-w-[200px] max-w-[200px]">
          <img
            src={props.serviceImage}
            alt={props.serviceName}
            className="w-10 h-10 rounded-full object-cover mr-2"
            onError={handleImageError}
          />
          <div className="flex flex-col items-start justify-center">
            <p className="font-semibold">{props.serviceName}</p>
            <p className="text-gray-400 text-sm">ID:{props.id.slice(0, 10)}</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center mr-4">
          <p className="font-semibold">Số combo: {props.serviceComboNumber}</p>
          <p className="text-gray-400 text-sm">Ngày tạo: {time}</p>
        </div>
      </div>
    </div>
  )
}
