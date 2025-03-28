import RecentlyRequestContainer from "./RecentlyRequestContainer";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { viewAllRequest } from "@/app/actions/manager/manager-dashboard";

const DoneRecently = async () => {

  const data = await viewAllRequest();

  console.log(data)


  return (
    <div className="border rounded-lg py-4 px-6 max-h-full  ">
      <div className="flex items-center justify-between">
        <div >
          <h2 className="font-semibold text-lg">
            Các yêu cầu gần đây
          </h2>
          <p className="text-gray-600 text-sm">
            Những yêu cầu được gử đến hệ thống gần đây
          </p>
        </div>
        <div>
          <Link href={"/manager-page/list-request"} className="text-crusta flex items-center justify-center">Xem tất cả
            <ChevronRight className="w-[18px] ml-1" />
          </Link>
        </div>
      </div>
      <div className="overflow-auto max-h-[200px] w-full">
        {data?.request?.map((item, index) => (
          <div key={index} className="mr-5 ">
            <RecentlyRequestContainer
              status={item.status}
              serviceName={item.service.serviceName}
              titleServiceCombo={item.serviceCombo.title}
              descriptionServiceCombo={item.serviceCombo.description}
              date={item.date}
              time={item.time}
              address={{
                provinceName: item.address.province.provinceName,
                districtName: item.address.district.districtName,
                wardName: item.address.ward.wardName,
                specificAddress: item.address.specificAddress
              }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoneRecently;

