import { viewRecentReview } from "@/app/actions/staffs/view-home";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import RecentlyReviewContainer from "./recentReviewContainer";

const RecentReview = async () => {
  const data = await viewRecentReview();

  return (
    <div className="border rounded-lg h-full">
      <div className="flex justify-between mt-6 ml-12 ">
        <div>
          <h1 className="text-xl font-semibold">
            Đánh giá gần đây
          </h1>
          <p className="text-sm text-gray-600">
            Một vài lượt đánh giá khách hàng gần nhất
          </p>
        </div>
        <Link href="staff-page/review" className="text-crusta flex mr-6">
          <p className="mr-2">Xem tất cả</p>
          <ArrowRight />
        </Link>
      </div>
      <div className="flex flex-col ml-12">
        {data?.request?.length == 0 && (
          <div className="h-[20vh] w-full flex justify-center items-center font-semibold text-lg text-center text-slate-500">Hiện chưa có đánh giá nào</div>
        )}

        {data?.request?.map((item, index) => (
          <div key={index} className="">

            <RecentlyReviewContainer userAvatar={item.user.image} userName={item.user.name} text={item.text} rate={item.rate} />
          </div>
        ))}


      </div>
    </div>

  )
}

export default RecentReview;
