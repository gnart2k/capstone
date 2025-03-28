import { ArrowRight } from "lucide-react";
import Link from "next/link";
import UpcommingWorkCard from "./upcomingWorkCard";
import { viewUpcomingWorking } from "@/app/actions/staffs/view-home";


const UpcommingWork = async () => {
  const data = await viewUpcomingWorking();
  return (
    <div className="w-full border rounded-lg h-[400px] overflow-auto">
      <div className="flex justify-between mt-6 ml-12 ">
        <div>
          <h1 className="text-xs md:text-xl font-semibold">
            Công việc sắp tới
          </h1>
          <p className="md:text-sm text-gray-600  text-xs">
            Những công việc sắp tới cần thực hiện
          </p>
        </div>
        <Link href="staff-page/schedule" className="text-crusta flex mr-6">
          <p className="mr-2 text-xs md:text-lg">Xem tất cả</p>
          <ArrowRight />
        </Link>
      </div>
      <div>
        {data?.request?.length == 0 && (
          <div className="h-[20vh] w-full flex justify-center items-center font-semibold text-xl text-slate-500">Hiện chưa có công việc nào sắp tới</div>
        )}
        {data?.request.map((item, index) => (
          <div key={index} className="">
            <UpcommingWorkCard
              status={item.status}
              serviceName={item.service.serviceName}
              serviceComboTitle={item.serviceCombo.title}
              serviceComboDescription={item.serviceCombo.description}
              date={item.date}
              time={item.time}
              address={{
                provinceName: item.address.province.provinceName,
                districtName: item.address.district.districtName,
                wardName: item.address.ward.wardName,
                specificAddress: item.address.specificAddress
              }}
            />
          </div>
        ))}
      </div>

    </div>

  )
}

export default UpcommingWork;
