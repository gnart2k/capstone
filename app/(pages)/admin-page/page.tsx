import { getRequestAnalyisData } from "@/app/actions/admin/RequestAnalysis"
import RecentlyService from "../manager-page/components/RecentlyService"
import RateCount from "./components/RateCount"
import RecentlyRegistedUser from "./components/RecentlyRegistedUser"
import RecentlyTransaction from "./components/RecentlyTransaction"
import RevenueChart from "./components/RevenueChart"
import StatusCard from "./components/StatusCard"


export default async function AdminDashboard() {
  const data = await getRequestAnalyisData().then(data => data.data);

  return (
    <div className="w-full flex items-center ">
      <div className="flex flex-col mx-12 mt-6 w-11/12">
        <div className="grid grid-cols-4 gap-4 mx-3">
          {data?.map((e, i) => (
            <div key={i}>
              <StatusCard title={e.title} amount={e.amount + ""} />
            </div>
          ))}

        </div>
        <div className="flex w-full justify-around mt-2 max-h-[440px]">
          <div className="w-[65%] min-h-[420px] ">
            <RevenueChart />
          </div>
          <div className="w-[32%]">
            <RateCount />
          </div>
        </div>
        <div className="mt-2 flex justify-around">
          <div className="w-[65%]">
            <RecentlyTransaction />
          </div>
          <div className="w-[32%]">
            <RecentlyRegistedUser />
          </div>
        </div>
      </div>
    </div>
  )
}


