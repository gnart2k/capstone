"use client"
import { cn } from "@/lib/utils";
import { AppWindowMac, Archive, BarChartBig, CalendarCheck, FolderClock, Menu, ScrollText, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/public/assets/images/logo_large.png"

export default function StaffSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false)
  const routes = [
    {
      href: `/staff-page`,
      lable: "Trang chủ",
      active: pathname === `/staff-page`,
      icon: BarChartBig
    },

    {
      href: `/staff-page/request`,
      lable: "Yêu cầu",
      active: pathname.startsWith(`/staff-page/request`),
      icon: CalendarCheck
    },

    {
      href: `/staff-page/schedule`,
      lable: "Lịch làm việc",
      active: pathname.startsWith(`/staff-page/schedule`),
      icon: Archive
    },

    {
      href: `/staff-page/work-history`,
      lable: "Lịch sử làm việc",
      active: pathname.startsWith(`/staff-page/work-history`),
      icon: ScrollText
    },


    {
      href: `/staff-page/review`,
      lable: "Xem đánh giá",
      active: pathname.startsWith(`/staff-page/review`),
      icon: Star
    },
    {
      href: `/staff-page/create-application-form`,
      lable: "Đơn yêu cầu",
      active: pathname.startsWith(`/staff-page/create-application-form`),
      icon: AppWindowMac
    },
    {
      href: `/staff-page/view-application`,
      lable: "Lịch sử gửi đơn",
      active: pathname.startsWith(`/staff-page/view-application`),
      icon: FolderClock
    },

  ];


  return (
    <>
      <div className="flex lg:hidden mt-12 items-center cursor-pointer gap-4" onClick={() => setIsOpen(true)}>
        <Menu className="md:ml-12 ml-8" />
        <p className="text-lg"> Danh mục</p>
      </div>
      {
        isOpen && <div className="fixed inset-0 z-50 p-4  bg-white w-screen h-screen">
          <div className="flex justify-between">
            <Image className="" src={logo} alt="logo" height={logo.height} width={logo.width} />
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
          {routes.map((route, index) => {
            const Icon = route.icon
            return (
              <Link href={route.href} key={index} className="mt-8 mx-3 border-b font-semibold" onClick={() => setIsOpen(false)}>
                <div className={cn("flex items-center cursor-pointer p-4 ", route.active ? "text-crusta border rounded-lg shadow-md" : "text-gray-700")}>
                  <Icon />
                  <p
                    className={cn("ml-4 border border-white border-b-4", route.active ? "text-crusta" : "text-gray-700")}>{route.lable}</p>
                </div>
              </Link>
            )
          })}
        </div>
      }
      <div className="w-2/12 mb-4 lg:flex hidden  mr-8 rounded-lg shadow-lg shadow-gray-400 flex-col items-around h-[750px] min-w-[200px] border-t mt-12 ml-12">
        {routes.map((route, index) => {
          const Icon = route.icon
          return (
            <Link href={route.href} key={index} className="mt-8 mx-3 border-b font-semibold">
              <div className={cn("flex items-center cursor-pointer p-4 ", route.active ? "text-crusta border rounded-lg shadow-md" : "text-gray-700")}>
                <Icon />
                <p
                  className={cn("ml-4 border border-white border-b-4", route.active ? "text-crusta" : "text-gray-700")}>{route.lable}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </>

  )

}

