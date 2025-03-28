import { viewAllHistoryRequest } from "@/app/actions/staffs/work-history";
import { DataTable } from "@/components/custom/table/requestHistory/dataTable";
import { workHistorytColumn } from "@/components/custom/table/workHistoryTable/workHistoryColumn";

export default async function HistoryDataTable() {
  const data = await viewAllHistoryRequest();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12 mt-11">
        <div className="border rounded-2xl px-5 py-2">
          <h2 className="font-semibold text-lg">Danh sách việc đã hoàn thành</h2>
          <p>Các việc đã hoàn thành gần đây</p>
        </div>
        <DataTable data={data?.request} columns={workHistorytColumn} />
      </div>

    </div>

  )

}
