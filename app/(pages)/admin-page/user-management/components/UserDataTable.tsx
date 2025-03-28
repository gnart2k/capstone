import { UserRole, UserStatus } from '@/app/lib/const';
import { UserTableColumn } from '@/components/custom/table/UserTable/UserTableColumn';
import { DataTable } from '@/components/custom/table/requestHistory/dataTable';
import { UserType } from '@/type/user';
import { getAllUsers } from '@/app/actions/admin/view-users';
import React from 'react';

type Props = {}

const mapUserData = (user: any): UserType => {
  return {
    id: user.id,
    userName: user.name || '',
    userAvatar: user.image || '',
    email: user.email || '',
    role: user.role.roleName,
    createdAt: user.emailVerified ? user.emailVerified.toISOString().split('T')[0] : '',
    status: user.status ? UserStatus.enabled : UserStatus.disabled
  };
}

export default async function UserDataTable({ }: Props) {
  const data = await getAllUsers();
  const mappedData = data?.data?.map(mapUserData);

  const users: UserType[] = mappedData;

  return (
    <div>
      <DataTable data={users} columns={UserTableColumn} />
    </div>
  )
}
