"use client";
import { ChevronLeft } from "lucide-react";
import IDICon from "@/public/id.png"
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UpdateServiceItemForm from "./components/UpdateServiceItemForm";
import Image from "next/image";

export default function ServiceItemPage({
  params,
}: {
  params: { serviceItemId: string };
}) {
  const router = useRouter();
  const [isAddAction, setIsAddAction] = useState(true);
  useEffect(() => {
    params.serviceItemId.toString() === "add"
      ? setIsAddAction(true)
      : setIsAddAction(false);
  }, []);
  return (
    <div>
      <div className="rounded-lg border shadow-md flex items-center justify-between p-4 mt-12">
        <div className="flex items-center">
          <ChevronLeft
            className="w-[30px] text-crusta mr-8"
            onClick={() => router.back()}
          />
          <div>
            <p className="font-semibold">Thông tin chi tiết Item</p>
            <p className="text-sm text-gray-500">
              Xem và chỉnh sửa thông tin chi tiết của Item cụ thể
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
            {params.serviceItemId}
          </div>
        )}
      </div>
      <div>
        <UpdateServiceItemForm serviceItemId={params.serviceItemId} />
      </div>
    </div>
  );
}
