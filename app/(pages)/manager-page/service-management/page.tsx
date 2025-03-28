import viewAllService from "@/app/actions/manager/service-management";
import ServiceManagementHeader from "../components/ServiceManagementHeader";
import { ServiceManagementColumn } from "@/components/custom/table/ServiceManagement/ServiceManagementColumn";
import { CustomServiceManagementDataTable } from "@/components/custom/table/ServiceManagement/ServiceManagementDataTable";

const ServiceManagementPage = async () => {
  const ServiceManagementData = await viewAllService();
  return (
    <div className="w-full mt-12 flex flex-col items-center justify-center">
      <div className="w-11/12">
        <ServiceManagementHeader />
        <CustomServiceManagementDataTable
          data={ServiceManagementData?.service}
          columns={ServiceManagementColumn}
        />
      </div>
    </div>
  );
}
export default ServiceManagementPage;
