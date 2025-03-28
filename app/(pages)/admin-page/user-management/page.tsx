import React from 'react'
import UserManagementHeader from './components/UserManagementHeader'
import UserDataTable from './components/UserDataTable'
import { getNumberOfUserData } from '@/app/actions/admin/count-user'
import StatusCard from '../components/StatusCard'

type Props = {}

export default async function UserManagement({ }: Props) {
  const data = await getNumberOfUserData().then(data => data.data)
  return (

    <div className='flex flex-col items-center'>
      <div className='mt-12 w-11/12'>
        <UserManagementHeader />
        <div className="grid grid-cols-5 gap-4 mt-3">
          {data?.map((e, i) => (
            <div key={i}>
              <StatusCard title={e.title} amount={e.amount + ""} />
            </div>
          ))}
        </div>
        <UserDataTable />
      </div>
    </div>
  )
}
