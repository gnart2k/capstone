import { findFirstRequest } from "@/app/actions/staffs/list-request";
import ViewRequestDetail from "./components/viewRequestDetail";
import { redirect } from "next/navigation";

export default async function RequestDetail({
  params,
}: {
  params: { requestID: string }
}) {
  const res = await findFirstRequest(params.requestID);
  const request = res.data
  if (!request) {
    redirect("/404")
  } else {
    return (
      <ViewRequestDetail props={request} />
    )
  }

}

