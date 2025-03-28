'use client'
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { UserCardType } from "@/type/user-card";
import UserCard from "./UserCard";
import useSWR from "swr";
import { useEffect } from "react";

const RecentlyService = () => {

  const fetchResult = useSWR('getRecentlyRegistedTransaction', async () => {
    const response = fetch('/api/user/recently-registed-user')
    return response?.then(data => data.json())
  })

  useEffect(() => {
    fetchResult.mutate();
  }, [fetchResult.isLoading, fetchResult,])


  const sampleData: UserCardType[] = fetchResult?.data
  return (
    <div className="border rounded-lg py-4 px-6  ">
      <div className="flex items-center justify-between">
        <div >
          <h2 className="font-semibold text-lg">
            Khách hàng đăng kí gần đây
          </h2>
          <p className="text-gray-400 text-sm">
            Các khách hàng đã đăng kí tài khoản gần nhất
          </p>
        </div>
        <div>
        </div>
      </div>
      <div className="overflow-auto max-h-[140px]">
        {sampleData?.map((item, index) => (
          <div key={index} className="">
            <UserCard props={item} />
          </div>
        ))}
      </div>
      <Link href={"/admin-page/user-management"} className="text-crusta flex items-center justify-center">Xem tất cả
        <ChevronRight className="w-[18px] ml-1" />
      </Link>
    </div>
  )
}

export default RecentlyService;


