import { cn } from "@/lib/utils";
import { format } from "date-fns"

type UpcommingWorkProps = {
  status: string,
  serviceName: string,
  serviceComboDescription: string,
  serviceComboTitle: string,
  time: string,
  date: Date,
  address: {
    provinceName: string,
    districtName: string,
    wardName: string,
    specificAddress: string
  }
}

export const getStatusText = (status: string): string => {
  switch (status) {
    case "pending":
      return "Chờ thanh toán";
    case "paid":
      return "Chờ xác nhận";
    case "confirmed":
      return "Đã xác nhận";
    case "complete":
      return "Hoàn thành";
    case "canceled":
      return "Đã hủy";
    default:
      return status;
  }
};

export const getReportStatusText = (status: boolean | null): string => {
  switch (status) {
    case null:
      return "Chờ xử lý";
    case true:
      return "Đã chấp thuận";
    case false:
      return "Đã từ chối";
    default:
      return status;
  }
};

export const getAccountStatusText = (status: boolean | null): string => {
  switch (status) {
    case true:
      return "Hoạt động";
    case false:
      return "Vô hiệu hóa";
    default:
      return status;
  }
};



export default function UpcommingWorkCard(props: UpcommingWorkProps) {

  const date = props.date ? format(new Date(props.date), "dd/MM/yyyy") : "N/A";

  return (
    <div>

      <div className="grid grid-cols-4 mt-8">
        <div className="flex items-center justify-center">
          <div className={cn("flex items-center text-xs md:text-lg justify-center rounded-3xl py-1 w-36",
            props.status === 'pending' && 'bg-yellow-100',
            props.status === 'complete' && 'bg-green-100',
            props.status === 'confirmed' && 'bg-blue-100',
            props.status === 'paid' && 'bg-orange-100',
            props.status === 'canceled' && 'bg-red-100')}>
            <span className="relative flex h-3 w-3 mr-2">
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75",
                props.status === 'pending' && 'bg-yellow-400',
                props.status === 'paid' && 'bg-orange-400',
                props.status === 'confirmed' && 'bg-blue-400',
                props.status === 'complete' && 'bg-green-400',
                props.status === 'canceled' && 'bg-red-400')}>
              </span>
              <span className={cn("relative inline-flex rounded-full h-3 w-3",
                props.status === 'pending' && 'bg-yellow-500',
                props.status === 'paid' && 'bg-orange-500',
                props.status === 'confirmed' && 'bg-blue-500',
                props.status === 'complete' && 'bg-green-500',
                props.status === 'canceled' && 'bg-red-500')} >

              </span>
            </span>
            <p className=
              {cn(props.status === 'pending' && 'text-yellow-700',
                props.status === 'paid' && 'text-orange-700',
                props.status === 'confirmed' && 'text-blue-700',
                props.status === 'complete' && 'text-green-700',
                props.status === 'canceled' && 'text-red-700')}>
              {getStatusText(props.status)}
            </p>
          </div>
        </div>
        <div className="ml-4">
          <p className="font-semibold text-xs md:text-lg">{props.serviceName}</p>
          <p className="text-gray-600 md:text-sm text-xs">{props.serviceComboTitle} {props.serviceComboDescription}</p>
        </div>
        <div>
          <p className="font-semibold  text-xs md:text-lg">{props.time}</p>
          <p className="text-gray-600 md:text-sm text-xs">{date}</p>
        </div>
        <div>
          <p className="text-gray-700 mr-2 text-xs md:text-lg">{props.address.specificAddress}, {props.address.wardName}, {props.address.districtName}, {props.address.provinceName}</p>
        </div>
      </div>
    </div>
  )
}
