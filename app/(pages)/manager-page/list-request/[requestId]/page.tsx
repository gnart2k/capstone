import React from "react";
import idImage from "@/public/id.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getStatusText } from "@/app/(pages)/staff-page/(root)/components/upcomingWorkCard";
import CustomerCard from "./components/CustomerCard";
import ServiceInfo from "./components/ServiceInfo";
import StaffList from "./components/StaffList";
import BackButton from "./components/BackButton";
import { getRequestById } from "@/app/actions/request/RequestAction";
import { listStaffByRequestId } from "@/app/actions/staffs/list-staff";

export default async function ListRequestDetail({
  params,
}: {
  params: { requestId: string };
}) {
  const currentRequest = await getRequestById(params.requestId);
  const staffList = await listStaffByRequestId(+params.requestId);
  return (
    <div className="w-full flex flex-col items-center ">
      <div className="w-11/12">
        <div className="rounded-lg border shadow-md flex items-center justify-between p-4 mt-12">
          <BackButton />
          <div className="flex items-center">
            <Image
              src={idImage.src}
              width={idImage.width}
              height={idImage.height}
              alt=""
            />
            <span className="ml-2 mr-2">{params.requestId}</span>
            <p> | </p>
            <div className="flex items-end text-[16px] ml-3">
              <div
                className={cn(
                  "flex items-center justify-center rounded-3xl py-1 w-36",
                  currentRequest.data.serviceOnRequest.status === "pending" &&
                    "bg-yellow-100",
                  currentRequest.data.serviceOnRequest.status === "complete" &&
                    "bg-green-100",
                  currentRequest.data.serviceOnRequest.status === "confirmed" &&
                    "bg-blue-100",
                  currentRequest.data.serviceOnRequest.status === "paid" &&
                    "bg-orange-100",
                  currentRequest.data.serviceOnRequest.status === "canceled" &&
                    "bg-red-100"
                )}
              >
                <span className="relative flex h-3 w-3 mr-2">
                  <span
                    className={cn(
                      "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                      currentRequest.data.serviceOnRequest.status === "pending" && "bg-yellow-400",
                      currentRequest.data.serviceOnRequest.status === "paid" && "bg-orange-400",
                      currentRequest.data.serviceOnRequest.status === "confirmed" && "bg-blue-400",
                      currentRequest.data.serviceOnRequest.status === "complete" && "bg-green-400",
                      currentRequest.data.serviceOnRequest.status === "canceled" && "bg-red-400"
                    )}
                  ></span>
                  <span
                    className={cn(
                      "relative inline-flex rounded-full h-3 w-3",
                      currentRequest.data.serviceOnRequest.status === "pending" && "bg-yellow-500",
                      currentRequest.data.serviceOnRequest.status === "paid" && "bg-orange-500",
                      currentRequest.data.serviceOnRequest.status === "confirmed" && "bg-blue-500",
                      currentRequest.data.serviceOnRequest.status === "complete" && "bg-green-500",
                      currentRequest.data.serviceOnRequest.status === "canceled" && "bg-red-500"
                    )}
                  ></span>
                </span>
                <p
                  className={cn(
                    currentRequest.data.serviceOnRequest.status === "pending" && "text-yellow-700",
                    currentRequest.data.serviceOnRequest.status === "paid" && "text-orange-700",
                    currentRequest.data.serviceOnRequest.status === "confirmed" && "text-blue-700",
                    currentRequest.data.serviceOnRequest.status === "complete" && "text-green-700",
                    currentRequest.data.serviceOnRequest.status === "canceled" && "text-red-700"
                  )}
                >
                  {getStatusText(currentRequest.data.serviceOnRequest.status)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-around ">
          <div className="w-3/12 mt-2">
            <div className="flex items-center justify-between mt-2 ">
              <p className="text-xl font-semibold mb-2">Khách hàng</p>
            </div>
            <CustomerCard
              props={{
                name: currentRequest.data?.userOnRequest.name,
                avatar: currentRequest?.data?.userOnRequest.avatar,
                address: currentRequest?.data?.userOnRequest.address,
                phone: currentRequest?.data?.userOnRequest.phone,
              }}
            />
          </div>
          <div className="w-8/12">
            <ServiceInfo props={currentRequest.data?.serviceOnRequest} />
          </div>
        </div>
        <StaffList props={staffList.data} />
      </div>
    </div>
  );
}
