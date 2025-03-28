import {
  staffColumns,
} from "@/components/custom/table/staff/staffColumns";
import AllServiceBanner from "./components/banner";
import { DataTable } from "@/components/custom/table/requestHistory/dataTable";
import { getListStaff } from "@/app/actions/staffs/list-staff";

export default async function Staff() {
  const data = await getListStaff();
  console.log(data)
  return (
    <div className="flex flex-col items-center">
      <AllServiceBanner />
      <div className="w-10/12 mt-6">
        <DataTable columns={staffColumns} data={data?.data} />
      </div>
    </div>
  );
}
