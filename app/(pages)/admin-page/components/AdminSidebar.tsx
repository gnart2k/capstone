
"use client"
import { cn } from "@/lib/utils";
import { Archive, BadgeEuro, BarChartBig, CalendarCheck, CalendarCheck2, CircleUserRound, History, LogOut, NotepadText, ScrollText, Server, SquareActivity, Star, StoreIcon, WalletCards } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const routes = [
    {
      href: `/admin-page`,
      lable: "Tổng quan",
      active: pathname === `/admin-page`,
      icon: BarChartBig
    },

    {
      href: `/admin-page/user-management`,
      lable: "Quản lý Người Dùng",
      active: pathname.startsWith(`/admin-page/user-management`) || pathname === '/admin-page/create-user/excel',
      icon: Server
    },
    {
      href: `/admin-page/transaction-management`,
      lable: "Quản lý Giao dịch",
      active: pathname.startsWith(`/admin-page/transaction-management`),
      icon: BadgeEuro
    },
    {
      href: `/admin-page/rate-management`,
      lable: "Quản lý Đánh giá",
      active: pathname.startsWith(`/admin-page/rate-management`),
      icon: SquareActivity
    },

  ];


  return (
    <div className="w-2/12 mr-8 rounded-lg shadow-lg h-[650px] shadow-gray-400 flex flex-col justify-between border-t mt-12 ml-12">
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



