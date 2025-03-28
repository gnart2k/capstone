import getScheduleData from "@/app/actions/staffs/schedule";
import ScheduleTable from "@/components/custom/ScheduleTable";

export default async function StaffSchedule() {
  const scheduleData = await getScheduleData();

  return (
    <div className="w-full" >
      <div className="">
        <ScheduleTable props={scheduleData.data} />
      </div>
    </div>
  )
}
