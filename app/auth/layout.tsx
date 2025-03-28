"use client";
import Header from "@/components/custom/header";
import { useSession } from "next-auth/react";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  return (
    <div>
      <div>
        <Header user={session?.data?.user} />
        <div>{children}</div>
      </div>
    </div>
  );
}

