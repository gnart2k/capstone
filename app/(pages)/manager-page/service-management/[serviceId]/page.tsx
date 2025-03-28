"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import IDICon from "@/public/id.png";
import Image from "next/image";
import Link from "next/link";
import UpdateServiceForm from "../../components/UpdateServiceForm.1";
import { useEffect, useState } from "react";
import { fetchData } from "@/app/lib/fetchData";
import useSWR from "swr";

function ServicePage({ params }: { params: { serviceId: string } }) {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/service/${params.serviceId}`;
  const { data } = useSWR("getService", () =>
    fetchData({ url: url, method: "GET" })
  );

  const [isAddAction, setIsAddAction] = useState(true);
  useEffect(() => {
    params.serviceId.toString() === "add"
      ? setIsAddAction(true)
      : setIsAddAction(false);
    console.log(isAddAction)
  }, [params.serviceId]);

  return (
    <>
      <div className="mt-11 mr-12">
        <div className="flex items-center justify-between border rounded-lg p-4">
          <div className="flex items-center">
            <ChevronLeft className="text-crusta mr-4" onClick={router.back} />
            <div>
              <p className="text-md font-semibold">Chi tiết dịch vụ</p>
              <p className="text-gray-500 text-sm">
                Xem và chỉnh sửa thông tin chi tiết của dịch vụ cụ thể
              </p>
            </div>
          </div>
          {!isAddAction && (
            <div className="flex">
              <Image
                src={IDICon.src}
                width={IDICon.width}
                height={IDICon.height}
                className="mr-2"
                alt="ID"
              />
              {params.serviceId}
            </div>
          )}
        </div>
        {!isAddAction && (
          <div className="mt-12 ml-4">
            <Link
              href={`/manager-page/service-management/${params.serviceId}/service-combo`}
              className="rounded-lg bg-[#FF6A28] px-3 py-2 text-white mr-4"
            >
              Tổng số Combo: {data?.ServiceCombo.length}
            </Link>
            <Link
              href={`/manager-page/service-management/${params.serviceId}/service-item`}
              className="rounded-lg bg-[#FF6A28] px-3 py-2 text-white"
            >
              Tổng số Item: {data?.serviceItems.length}
            </Link>
          </div>
        )}
        <UpdateServiceForm serviceId={params.serviceId} />
      </div>
    </>
  );
}

export default ServicePage;
