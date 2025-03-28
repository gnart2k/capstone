"use client"
import { cn } from "@/lib/utils";
import { Archive, BarChartBig, CalendarCheck, CalendarCheck2, CircleUserRound, History, LogOut, NotepadText, ScrollText, Server, Star, StoreIcon, WalletCards } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ManagerSidebar() {
  const pathname = usePathname();

  const routes = [
    {
      href: `/manager-page`,
      lable: "Tổng quan",
      active: pathname === `/manager-page`,
      icon: BarChartBig
    },

    {
      href: `/manager-page/service-management`,
      lable: "Quản lý dịch vụ",
      active: pathname.startsWith(`/manager-page/service-management`),
      icon: NotepadText
    },
    {
      href: `/manager-page/list-request`,
      lable: "Quản lý yêu cầu",
      active: pathname.startsWith(`/manager-page/list-request`),
      icon: Server
    },
    {
      href: `/manager-page/report-management`,
      lable: "Quản lý đơn",
      active: pathname.startsWith(`/manager-page/report-management`),
      icon: WalletCards
    },


  ];


  return (
    <div className="w-2/12 mr-8 rounded-lg shadow-lg shadow-gray-400 flex flex-col justify-between h-[80vh] border-t mt-12 ml-12">
      <div className="flex flex-col items-around">
        {routes.map((route, index) => {
          const Icon = route.icon
          return (
            <Link href={route.href} key={index} className="mt-8 mx-3 border-b font-semibold">
              <div className={cn("flex items-center cursor-pointer p-4 ", route.active ? "text-crusta " : "text-gray-700")}>
                <Icon />
                <p
                  className={cn("ml-4 border border-white border-b-4", route.active ? "text-crusta" : "text-gray-700")}>{route.lable}</p>
              </div>
            </Link>
          )
        })}
      </div>
      <Link href={"/auth/signout"} className="flex font-semibold items-center text-crusta mb-8 mx-6 hover:bg-neutral-50 hover:shadow-md  py-3 px-2 rounded-lg">
        <span className="mr-3 text-sm"><LogOut /></span>
        <p className="text-lg">Đăng xuất</p>
      </Link>
    </div>
  )

}


