"use client";
import { ChevronLeft, PlusCircle } from "lucide-react";
import React from "react";
import ID from "@/public/id.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetchData } from "@/app/lib/fetchData";
import Link from "next/link";
import ServiceComboTable from "./components/ServiceComboTable";

function ServiceComboPage({ params }: { params: { serviceId: string } }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/service/${params.serviceId}`;
  const router = useRouter();
  const { data } = useSWR("getServiceName", () =>
    fetchData({ url: url, method: "GET" })
  );
  return (
    <div className="w-full flex flex-col items-center mt-12 ">
      <div className="p-8 rounded-lg shadow-lg w-11/12 ">
        <div className="flex justify-between">
          <div
            className="flex text-crusta cursor-pointer"
            onClick={(e) => router.back()}
          >
            <ChevronLeft />
            <p className="font-semibold">Trở Lại</p>
          </div>
          <div className="flex items-center">
            <Image
              src={ID.src}
              width={ID.width}
              height={ID.height}
              alt="id"
              className="mr-2"
            />
            <p className="font-bold text-gray-700">{params.serviceId}</p>
          </div>
        </div>
      </div>
      <div className="shadow-lg flex flex-col justify-center w-11/12 rounded-lg p-8 mt-3  border-t">
        <div className="flex items-center justify-between">
          <div>
            Danh sách combo của dịch vụ
            <span className="text-crusta"> {data?.serviceName} </span>
          </div>
          <Link
            href={`/manager-page/service-management/${params.serviceId}/service-combo/add`}
            className=""
          >
            <div className="rounded-md p-2 bg-crusta text-white flex items-center">
              <PlusCircle className="w-[18px] mr-2" />
              <p>Tạo Combo</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-11/12">
        <ServiceComboTable serviceId={params.serviceId} />
      </div>
    </div>
  );
}

export default ServiceComboPage;
