import { redirect, useParams } from "next/navigation"
import TotalSanitation from "./pages/totalSanitation"
import OtherServiceDetail from "./pages/otherService"
import { findFirstService } from "@/app/actions/service"
import { removeVietnameseTones } from "@/app/lib/removeVietNameseTone"


const ServiceDetail = async ({
  params,
}: {
  params: { serviceId: string }
}) => {
  const res = await findFirstService(params.serviceId);
  const service = res.data
  if (!service) {
    redirect("/404")
  } else if (removeVietnameseTones(service?.serviceName).toLowerCase() == removeVietnameseTones("Tổng vệ sinh").toLowerCase()) {
    return (
      <TotalSanitation />
    )
  } else {
    return (
      <OtherServiceDetail props={service} />
    )
  }

}

export default ServiceDetail 
