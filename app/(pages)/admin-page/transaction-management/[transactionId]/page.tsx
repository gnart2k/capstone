import React from 'react'
import TransactionHeader from './components/TransactionHeader'
import TransactionDetailContainer from './components/TransactionDetailContainer'
import findTransaction from '@/app/actions/manager/transaction'

async function TransactionDetailPage({
  params,
}: {
  params: { transactionId: string };
}) {
  const transactionDetails = await findTransaction({ transactionId: params.transactionId });

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-11/12 mt-11'>
        <TransactionHeader transactionId={params.transactionId} />
        <TransactionDetailContainer props={transactionDetails.transaction} />
      </div>
    </div>
  )
}

export default TransactionDetailPage;