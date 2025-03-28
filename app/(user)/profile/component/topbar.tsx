"use client"
import { cn } from "@/lib/utils";
import { CircleUserRound, History, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileTopbar() {
  const pathname = usePathname();

  const routes = [
    {
      href: `/profile/user`,
      lable: "Thông tin cá nhân",
      active: pathname === `/profile/user` || pathname == '/profile/user/update',
    },

    {
      href: `/profile/user/change-password`,
      lable: "Mật khẩu và bảo mật",
      active: pathname === `/profile/user/change-password`,
    },
  ];


  return (
    <div className=" rounded-lg flex mt-4">
      {routes.map((route, index) => {
        return (
          <Link href={route.href} key={index} className="">
            <div className="flex items-center cursor-pointer">
              <p
                className={cn("ml-4 pb-4 border border-white  border-b-4", route.active ? "border-b-crusta" : "border-b-white")}>{route.lable}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )

}

