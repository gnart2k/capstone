import React from "react";
import TransactionDataTable from "./components/TransactionDataTable";
import viewAllTransaction from "@/app/actions/admin/transaction";

export default async function TransactionManagement() {
  const transactions = await viewAllTransaction();

  return (
    <div className="flex flex-col items-center">
      <div className="p-4 rounded-lg border flex items-center justify-between mt-12 w-11/12">
        <div className=" flex flex-col ">
          <p className="font-semibold text-lg">Quản lý Giao Dịch</p>
          <p className="text-gray-400">
            Danh sách toàn bộ giao dịch trên hệ thống
          </p>
        </div>
      </div>
      <div className="w-11/12">
        <TransactionDataTable props={transactions.data} />
      </div>
    </div>
  );
}
