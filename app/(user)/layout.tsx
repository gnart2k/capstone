"use client"
import Header from "@/components/custom/header";
import { RoleGate } from "../auth/components/RoleGate";
import GeminiContainer from "@/components/custom/gemini/GeminiContainer";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Footer from "@/components/custom/footer";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const pathName = usePathname();
  if (pathName.includes('/profile')) {
    return (
      <div className=" w-full ">
        <Header user={session?.data?.user} />
        <div className="overflow-x-hidden w-full">{children}</div>
      </div>
    )
  }
  if (session.data?.user?.role.toLowerCase() !== 'user') {
    return (
      <div className="w-full">
        <RoleGate allowedRole="user" />
      </div>
    );
  } else {
    return (
      <div className=" w-full ">
        <Header user={session?.data?.user} />
        <div className="relative z-50 top-0 right-[200px]">
          <div className="fixed top-[800px] right-[450px]  w-24 " >
            {
              <GeminiContainer />
            }
          </div>
        </div>
        <div className="overflow-x-hidden w-full">{children}</div>
        <Footer />
      </div>
    );
  }
}
