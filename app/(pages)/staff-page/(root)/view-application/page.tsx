import React from "react";
import ApplicationDataTable from "./components/ApplicationDataTable";

type Props = {};

function ApplicationManagement({ }: Props) {
  return (
    <div className="w-full flex  flex-col items-center justify-center">
      <div className="w-11/12">
        <div className="border rounded-2xl p-4 mt-12">
          <p className="text-lg font-medium">Quản lý đơn đã gửi</p>
          <p className="font-thin text-gray-500">
            Danh sách về các đơn đã gửi tới Quản Lý
          </p>
        </div>
        <ApplicationDataTable />
      </div>
    </div>
  );
}

export default ApplicationManagement;
