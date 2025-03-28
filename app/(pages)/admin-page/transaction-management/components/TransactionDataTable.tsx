import { TransactionColumn } from '@/components/custom/table/TransactionTable/TransactionColumn'
import { DataTable } from '@/components/custom/table/requestHistory/dataTable'
import { TransactionColumnType } from '@/type/transaction'
import React from 'react'


export default function TransactionDataTable({ props }: { props: TransactionColumnType[] }) {
  return (
    <div>
      <DataTable columns={TransactionColumn} data={props} />
    </div>
  )
}
