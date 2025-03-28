import { findAllReview } from "@/app/actions/staffs/list-review";
import { CustomStaffReviewDataTable } from "@/components/custom/table/StaffReviewDataTable/StaffReviewDataTable";
import { staffReviewColumn } from "@/components/custom/table/StaffReviewDataTable/staffReviewColumn";

export default async function StaffReviewDataTable() {
  const data = await findAllReview();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12 mt-11">
        <div className="border rounded-2xl px-5 py-2">
          <h2 className="font-semibold text-lg">Đánh giá của khách hàng</h2>
          <p>Những đánh giá mới nhất của khách hàng</p>
        </div>
        <CustomStaffReviewDataTable
          data={data?.data}
          columns={staffReviewColumn} />
      </div>

    </div>

  )

}

