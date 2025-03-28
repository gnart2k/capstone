import { findFirstRequest } from "@/app/actions/staffs/list-request";
import { redirect } from "next/navigation";
import ViewHistoryWorkDetail from "./components/viewHistoryWorkDetail";
import { findFirstHistoryWork } from "@/app/actions/staffs/work-history";

const RequestDetail = async ({
  params,
}: {
  params: { requestID: string }
}) => {
  const res = await findFirstHistoryWork(params.requestID);
  const request = res.data
  if (!request) {
    redirect("/404")
  } else {
    return (
      //@ts-ignore
      <ViewHistoryWorkDetail props={request} />
    )
  }

}
export default RequestDetail;

