import { viewAllDoneRequest } from "@/app/actions/staffs/list-request";
import { DataTable } from "@/components/custom/table/requestHistory/dataTable";
import { requestColumn } from "@/components/custom/table/requestTable/requestCollumn";

export default async function RequestDataTable() {
  const data = await viewAllDoneRequest();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12 mt-11">
        <div className="border rounded-2xl xl:px-5 px-2 py-2">
          <h2 className="font-semibold text-lg">Danh sách yêu cầu</h2>
          <p>Các yêu cầu mới nhất từ khách hàng</p>
        </div>
        <DataTable data={data?.request} columns={requestColumn} />
      </div>

    </div>

  )

}
