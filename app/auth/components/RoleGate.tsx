"use client"

import { useCurrentRole } from "@/app/hooks/UseCurrentRole"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RoleGateProps {
  allowedRole: string;
}

export const RoleGate: React.FC<RoleGateProps> = ({ allowedRole }) => {
  const redirectToObj = [
    {
      role: "staff",
      url: "/staff-page"
    },
    {
      role: "user",
      url: "/"
    },

    {
      role: "manager",
      url: "/manager-page/"
    },

    {
      role: "admin",
      url: "/admin-page/"
    },
  ]
  const role = useCurrentRole();
  const router = useRouter()
  const [isPermitted, setIsPermitted] = useState(false)

  useEffect(() => {
    if (!role || role.toLowerCase() !== allowedRole.toLowerCase()) {
      const redirectUrl = redirectToObj.filter(r => r.role?.toLowerCase() == role?.toLowerCase())
      if (redirectUrl.length == 0) {
        router.push('/')
      } else {
        router.push(redirectUrl[0].url)
      }
    } else {
      setIsPermitted(true)
    }
  }, [])
  if (!isPermitted) {
    return (
      <div className="bg-white w-full h-screen">
      </div>

    )
  } else {
    return (
      <div className="">
      </div>
    )
  }
}
