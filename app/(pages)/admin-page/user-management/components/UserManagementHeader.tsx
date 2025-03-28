import { Button } from '@/components/ui/button'
import { CircleUserRound, UserPlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function UserManagementHeader({ }: Props) {
  return (
    <div className="flex justify-between items-center px-4 py-2 rounded-lg border border-gray-200">
      <div>
        <h1 className="font-medium">Quản lý Khách Hàng</h1>
        <p className='text-sm text-gray-400'>Danh sách các khách hàng đã đăng kí tài khoản trên hệ thống</p>
      </div>
      <Link href={"/admin-page/user-management/add"}>
        <div className='rounded-lg bg-crusta shadow-md hover:shadow-lg flex items-center p-3 text-white'>
          <UserPlus className='w-5 mr-2 ' />
          Thêm người dùng
        </div>
      </Link>
    </div>
  )
}
