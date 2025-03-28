import React from 'react'

type Props = { title: string, amount: string }

export default function StatusCard({ title, amount }: Props) {
  return (
    <div>
      <div className="shadow-md flex flex-col items-center justify-between border rounded-lg p-4">
        <div className=" text-gray-600 mb-2 text-sm">{title}</div>
        <div className="text-lg font-semibold">{amount}</div>
      </div>
    </div>
  )
}
