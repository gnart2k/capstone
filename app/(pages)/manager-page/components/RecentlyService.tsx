import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import RecentlyServiceCard, { RecentlyServiceCardProps } from "./RecentlyServiceCard";
import { viewRecentlyService } from "@/app/actions/manager/manager-dashboard";

const RecentlyService = async () => {

  const sampleData = await viewRecentlyService();

  return (
    <div className="border max-h-full rounded-lg py-4 px-6 ">
      <div className="flex items-center justify-between">
        <div >
          <h2 className="font-semibold text-lg">
            Các dịch vụ gần đây
          </h2>
          <p className="text-gray-400 text-sm">
            Dịch vụ mới thêm gần đây
          </p>
        </div>
        <div>
        </div>
      </div>
      <div className="overflow-auto max-h-[200px] mt-3">
        {sampleData?.service?.map((item, index) => (
          <div key={index} className="">
            <RecentlyServiceCard
              id={item.id}
              serviceName={item.serviceName}
              serviceImage={item.promotionImg}
              createdAt={item.createdAt}
              serviceComboNumber={item.ServiceCombo.length}
            />
          </div>
        ))}
      </div>
      <Link href={"/manager-page/service-management"} className="text-crusta flex items-center justify-center">Xem tất cả
        <ChevronRight className="w-[18px] ml-1" />
      </Link>
    </div>
  )
}

export default RecentlyService;


