import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserCardType } from '@/type/user-card'
import React from 'react'

export default function UserCard({ props }: { props: UserCardType }) {
  return (
    <div className='flex items-center rounded-lg p-2 mt-1'>
      <Avatar className='mr-3'>
        <AvatarImage src={props.imageUrl} alt={props.name} />
        <AvatarFallback>{props.name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col ">
        <div className="text-lg font-semibold">{props.name}</div>
        <div className="text-gray-600 mb-2 text-sm">{props.email}</div>
      </div>
    </div>
  )
}
