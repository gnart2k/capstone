import RecentlyRequest from "./components/RecentlyRequest";
import RecentlyService from "./components/RecentlyService";
import RequestChart from "./components/RequestChart";
import TopServiceDashboard from "./components/TopServiceDashboard";
export default function ManagerHomepage() {
  return (
    <div className="w-full flex items-center">
      <div className="flex flex-col mx-12 mt-8 w-11/12">
        <div className="flex w-full justify-around mt-4 ">
          <div className="w-[65%] min-h-[440px] ">
            <RequestChart />
          </div>
          <div className="w-[32%]">
            <TopServiceDashboard />
          </div>
        </div>
        <div className="m-2 flex justify-between max-h-[270px] overflow-hidden">
          <div className="w-[66%]  ">
            <RecentlyRequest />
          </div>
          <div className="w-[32%] ">
            <RecentlyService />
          </div>
        </div>
      </div>
    </div>
  )
}

