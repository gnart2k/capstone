import { DataTable } from "@/components/custom/table/requestHistory/dataTable";
import { requestHistoryCollumn } from "@/components/custom/table/requestHistory/columns";
import { viewAllBookingHistoryAction } from "@/app/actions/profile/booking-history";
import RequestHistoryTopbar from "../components/historyTopbar";



export default async function BookingHistory(
  { params }: { params: { statusType: string } }
) {
  const data = await viewAllBookingHistoryAction({ props: params.statusType })

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <RequestHistoryTopbar />
      <div className="w-10/12">
        <DataTable columns={requestHistoryCollumn} data={data?.request} />
      </div>

    </div>
  )

}
