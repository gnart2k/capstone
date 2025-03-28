"use client"
import { cn } from "@/lib/utils";
import { CircleUserRound, History, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const session = useSession();
  console.log(pathname.startsWith('/profile/user'))

  const routes = session?.data.user.role == "user" ? [
    {
      href: `/profile/user`,
      lable: "Thông tin cá nhân",
      active: pathname?.startsWith(`/profile/user`) || pathname?.startsWith('/profile/update'),
      icon: CircleUserRound
    },

    {
      href: `/profile/booking-history`,
      lable: "Lịch sử đặt lịch",
      active: pathname.startsWith(`/profile/booking-history`),
      icon: History
    },
    {
      href: `/auth/signout`,
      lable: "Đăng xuất",
      active: pathname === `/auth/signout`,
      icon: LogOut
    },
  ] :
    [
      {
        href: `/profile/user`,
        lable: "Thông tin cá nhân",
        active: pathname.startsWith(`/profile/user`) || pathname == '/profile/update',
        icon: CircleUserRound
      },

      {
        href: `/auth/signout`,
        lable: "Đăng xuất",
        active: pathname === `/auth/signout`,
        icon: LogOut
      },
    ]

    ;


  return (
    <div className="w-2/12 mr-8 rounded-lg shadow-lg flex flex-col items-around shadow-gray-400 pt-10 border-t  mb-10">
      {routes.map((route, index) => {
        const Icon = route.icon
        return (
          <Link href={route.href} key={index} className="mt-8 ml-8">
            <div className="flex items-center cursor-pointer">
              <Icon />
              <p
                className={cn("ml-4 border border-white  border-b-4", route.active ? "border-b-crusta" : "border-b-white")}>{route.lable}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )

}
