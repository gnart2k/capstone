import { getAllApplications } from '@/app/actions/manager/view-reports';
import { StaffReportColumn } from '@/components/custom/table/StaffReport/StaffReportColumn';
import { DataTable } from '@/components/custom/table/requestHistory/dataTable';
import { ApplicationType } from '@/type/report';
import React from 'react'
import { format } from 'date-fns';
import { ApplicationColumn } from '@/components/custom/table/ApplicationTable/ApplicationStaffColumn';

type Props = {}

const mapReportData = (report: any): ApplicationType => {
  let statusString;
  switch (report.status) {
    case null:
      statusString = 'Chờ xử lý'
      break;
    case false:
      statusString = 'Đã từ chối'
      break;
    default:
      statusString = 'Đã chấp thuận'
      break;

  }
  return {
    id: report.id,
    staffName: report.user.name,
    staffEmail: report.user.email,
    staffAvatar: report.user.image,
    createdAt: format(new Date(report.createdAt), 'dd/MM/yyyy HH:mm'),
    updatedAt: format(new Date(report.updatedAt), 'dd/MM/yyyy HH:mm'),
    status: statusString,
    type: report.reportType
  };
}

export default async function ApplicationDataTable({ }: Props) {

  const data = await getAllApplications();
  const mappedData = data?.data.map(mapReportData)

  const applications: ApplicationType[] = mappedData;

  return (
    <div>
      <DataTable
        columns={ApplicationColumn}
        data={applications}
      />
    </div>
  )
}
