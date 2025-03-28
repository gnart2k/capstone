import React from 'react';
import ModalStaffDetail from '../components/ModalStaffDetail';
import findStaffById from '@/app/actions/staffs/list-staff';
import { staffSchedule } from '@/app/actions/staffs/list-request';

async function StaffDetailPage({
  params,
}: {
  params: { staffId: string };
}) {
  const staffDetailsResponse = await findStaffById({ staffId: params.staffId });
  if (staffDetailsResponse.error) {
    return <div>{staffDetailsResponse.error}</div>;
  }

  const staffScheduleResponse = await staffSchedule(params.staffId);
  if (staffScheduleResponse.error) {
    return <div>{staffScheduleResponse.error}</div>;
  }
  console.log(staffScheduleResponse?.data[0]?.shift)

  const staffDetails = {
    ...staffDetailsResponse.staff,
    schedule: staffScheduleResponse.data,
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-11/12 mt-11'>
        <ModalStaffDetail props={staffDetails} />
      </div>
    </div>
  );
}

export default StaffDetailPage;
