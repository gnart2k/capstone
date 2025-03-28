import { DataTable } from "@/components/custom/table/requestHistory/dataTable";
import RequestHistoryTopbar from "./components/historyTopbar";
import { requestHistoryCollumn } from "@/components/custom/table/requestHistory/columns";
import { viewAllBookingHistoryAction } from "@/app/actions/profile/booking-history";
import BookingHistoryDataTable from "./components/BookingHistoryDataTable";

export default async function BookingHistory() {
  return (
    <div className="w-full flex flex-col items-center mt-4">
      <RequestHistoryTopbar />
      <div className="w-10/12">
        <BookingHistoryDataTable />
      </div>

    </div>
  )

}
