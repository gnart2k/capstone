import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react'

type Props = {
  userName: string;
  userAvatar: string;
  userEmail: string;
}

export default function UserBox(props: Props) {
  return (
    <div className = "flex flex-col items-center mt-9 ">
      <Avatar className='w-48 h-48' >
        <AvatarImage src={props.userAvatar} alt={props.userName} />
        <AvatarFallback>{props.userName}</AvatarFallback>
      </Avatar>
      <div className='text-center mt-6'>
        <p className='font-semibold text-2xl'>{props.userName}</p>
        <p className='text-gray-400 font-medium'>{props.userEmail}</p>
      </div>

    </div>
  )
}
