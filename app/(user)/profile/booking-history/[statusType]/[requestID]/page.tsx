import { redirect } from "next/navigation";
import ViewBookingHistoryDetail from "./components/viewBookingHistoryDetail";
import { findFirstBookingHistory } from "@/app/actions/profile/booking-history";
import ReviewPopover from "./components/ReviewPopover";

const BookingHistoryDetail = async ({
  params,
}: {
  params: { requestID: string };
}) => {
  const res = await findFirstBookingHistory(params.requestID);
  const request = res?.request;
  if (!request) {
    redirect("/404");
  } else {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <ViewBookingHistoryDetail props={request} />
        {request.status === "complete" && (
          <div className="w-[70%] border shadow-lg flex p-4 rounded-lg mb-10 items-center justify-between">
            <p className="text-gray-700">Đánh giá dịch vụ của bạn</p>
            <ReviewPopover />
          </div>
        )}
      </div>
    );
  }
};
export default BookingHistoryDetail;
