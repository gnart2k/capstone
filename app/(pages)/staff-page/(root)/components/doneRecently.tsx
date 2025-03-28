import { viewDoneRequest } from "@/app/actions/staffs/view-home"
import RecentlyContainer from "./doneRecentlyContainer";
import { format } from "date-fns"

const DoneRecently = async () => {

  const data = await viewDoneRequest();


  return (
    <div className="border rounded-lg py-4 px-6 h-[400px]">
      <h2 className="font-semibold text-lg">
        Đã hoàn thành gần đây
      </h2>
      <p className="text-gray-600 text-sm">
        Những công việc đã hoàn thành
      </p>
      <div className="overflow-hidden">
        {data?.request?.length == 0 && (
          <div className="h-[20vh] w-full flex justify-center items-center font-semibold text-lg text-center text-slate-500">Hiện chưa có công việc nào được hoàn thành</div>
        )}

        {data?.request.map((item, index) => (
          <div key={index} className="">

            <RecentlyContainer serviceName={item.service.serviceName} date={item.date} img={item.service.promotionImg} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoneRecently;
