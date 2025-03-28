"use client";
import { handleBookingStatus } from "@/app/lib/handleBookingStatus";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function RequestHistoryTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [status, setStatus] = useState(false);



  const routes = [
    {
      href: `/profile/booking-history`,
      lable: "Tất cả",
      active: pathname === `/profile/booking-history`,
    },
    {
      href: `/profile/booking-history/pending`,
      lable: "Chờ thanh toán",
      active: pathname === `/profile/booking-history/pending`,
    },

    {
      href: `/profile/booking-history/paid`,
      lable: "Chờ xác nhận",
      active: pathname === `/profile/booking-history/paid`,
    },
    {
      href: `/profile/booking-history/confirmed`,
      lable: "Đã xác nhận",
      active: pathname === `/profile/booking-history/confirmed`,
    },

    {
      href: `/profile/booking-history/canceled`,
      lable: "Đã huỷ",
      active: pathname === `/profile/booking-history/canceled`,
    },

    {
      href: `/profile/booking-history/complete`,
      lable: "Hoàn thành",
      active: pathname === `/profile/booking-history/complete`,
    },
  ];

  return (
    <div className="  flex mt-4 w-full justify-start border-b border-gray-200 shadow-sm">
      {routes.map((route, index) => {
        return (
          <Link href={route.href} key={index} className="">
            <div className="flex items-center justify-between cursor-pointer">
              <p
                className={cn(
                  "ml-10 pb-4 border border-white  border-b-4",
                  route.active ? "border-b-crusta" : "border-b-white"
                )}
              >
                {route.lable}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
