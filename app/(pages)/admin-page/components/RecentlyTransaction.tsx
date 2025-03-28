'use client'
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import RecentlyTransactionContainer from "./RecentlyTransactionContainer";
import { useEffect } from "react";
import useSWR from "swr";
import { RecentlyTransactionType } from "@/type/transaction";

export default function RecentlyTransaction() {
  const fetchResult = useSWR('getRecentlyTransaction', async () => {
    const response = fetch('/api/request/recently-request')
    return response?.then(data => data.json())
  })

  useEffect(() => {
    fetchResult.mutate();
  }, [fetchResult.isLoading, fetchResult,])


  const data: RecentlyTransactionType[] = fetchResult?.data
  return (
    <div className="border rounded-lg py-4 px-6 min-h-[250px]">
      <div className="flex items-center justify-between">
        <div >
          <h2 className="font-semibold text-lg">
            Các giao dịch mới gần đây
          </h2>
          <p className="text-gray-600 text-sm">
            Các giao dịch mới được thực hiện trong thời gian gần đây
          </p>
        </div>
        <div>
          <Link href={""} className="text-crusta flex items-center justify-center">Xem tất cả
            <ChevronRight className="w-[18px] ml-1" />
          </Link>
        </div>
      </div>
      <div className="overflow-auto  max-h-[140px]">
        {data?.map((item, index) => (
          <div key={index} className="">
            <RecentlyTransactionContainer
              //@ts-ignore
              props={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
