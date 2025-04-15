import { getAllReports } from '@/app/actions/manager/view-reports';
import { StaffReportColumn } from '@/components/custom/table/StaffReport/StaffReportColumn';
import { DataTable } from '@/components/custom/table/requestHistory/dataTable';
import { StaffReportType } from '@/type/report';
import React from 'react'
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const vietnamTimeZone = 'Asia/Ho_Chi_Minh';

type Props = {}

const mapReportData = (report: any): StaffReportType => {
    // Chuyển đổi thời gian từ UTC (hoặc múi giờ hệ thống) sang múi giờ Việt Nam
    const zonedCreatedAt = toZonedTime(new Date(report.createdAt), vietnamTimeZone);
    
    return {
        id: report.id,
        staffName: report.user.name,
        staffEmail: report.user.email,
        staffAvatar: report.user.image,
        // Sử dụng thời gian đã chuyển đổi thay vì thời gian gốc
        date: format(zonedCreatedAt, 'dd/MM/yyyy HH:mm'),
        status: report.status == null ? 'Chờ xử lý' : (report.status === true ? 'Đã chấp thuận' : 'Đã từ chối'),
        type: report.reportType
    };
};

export default async function ReportsDataTable({ }: Props) {

  const data = await getAllReports();
  const mappedData = data?.data.map(mapReportData)

  const rps: StaffReportType[] = mappedData;

  return (
    <div>
      <DataTable
        columns={StaffReportColumn}
        data={rps}
      />
    </div>
  )
}
