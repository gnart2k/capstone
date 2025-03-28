import React from 'react'

type Props = {
  label: string;
  content: string
}

export default function TransactionDetailCard({ label, content }: Props) {
  return (
    <div className='w-full shadow-md rounded-lg p-4 border mt-3 border-b'>
      <p className='text-crusta font-semibold'>{label}</p>
      <p className='text-gray-700 '>{content}</p>
    </div>
  )
}
