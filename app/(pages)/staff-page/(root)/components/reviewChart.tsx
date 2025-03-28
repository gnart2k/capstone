"use client"
import ReviewPieChart from "@/components/custom/chart";

export default function ReviewChart() {
  return (
    <div className="h-full rounded-lg border pt-4 pl-6">
      <p className="font-semibold text-lg">Lượt đánh giá</p>
      <p>
        Lượt đánh giá dịch vụ của khách hàng
      </p>
      <div className="mb-6 h-full">
        <ReviewPieChart />
      </div>
    </div>
  )
}

