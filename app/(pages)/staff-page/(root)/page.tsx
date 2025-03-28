import ReviewChart from "./components/reviewChart";
import DoneRecently from "./components/doneRecently";
import RecentReview from "./components/recentReview";
import UpcommingWork from "./components/upcommingWork";

export default function StaffHomepage() {




  return (
    <div className="flex flex-col xl:mx-12 md:mx-6 mx-4 mt-8">
      <div className="flex xl:flex-row flex-col gap-4 w-full justify-around">
        <div className="xl:w-[73%] w-auto">
          <UpcommingWork />
        </div>
        <div className="xl:w-[25%] w-auto">
          <DoneRecently />
        </div>
      </div>
      <div className="flex xl:flex-row flex-col gap-4 w-full justify-around mt-4 mb-4 xl:h-[330px]">
        <div className="xl:w-[73%] w-auto">
          <RecentReview />
        </div>
        <div className="xl:w-[38%] w-auto">
          <ReviewChart />
        </div>

      </div>

    </div>
  )
}
