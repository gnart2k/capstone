"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import id from "@/public/assets/images/id.png";
import avt from "@/public/assets/images/avt.png";
import idCard from "@/public/assets/images/id-card.png";
import phone from "@/public/assets/images/phone.png";
import gender from "@/public/assets/images/gender.png";
import location from "@/public/assets/images/location.png";
import Image from "next/image";
import { Label } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import { RequestSchema } from "../../../request/[requestID]/components/viewRequestDetail";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getStatusText } from "../../../components/upcomingWorkCard";
import { currencyFormater } from "@/app/lib/currencyFormat";

export default function ViewHistoryWorkDetail({ props }: { props: RequestSchema }) {
  const time = props.date ? format(new Date(props.date), "dd/MM/yyyy") : "";
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-center">
      <div className="mt-12 w-[85%] flex flex-col gap-4 mb-10 mr-10">
        <div className="shadow-lg rounded-lg flex justify-between px-8 py-4">
          <Button variant="ghost" className="flex gap-4" onClick={() => { router.push("/staff-page/work-history") }}>
            <ChevronLeft color="#FF6A28" />
            Trở lại
          </Button>
          <div className="flex gap-6">
            <div className="flex items-center gap-4">
              <Image src={id} width={id.width} height={id.height} alt="" />
              <Label>{props.id}</Label>
            </div>
            <div className="border-l" />
            <div className="flex gap-2 items-center">
              <div className={cn("flex items-center justify-center rounded-3xl py-1 w-36",
                props.status === 'paid' && 'bg-orange-100',
                props.status === 'canceled' && 'bg-red-100')}>
                <span className="relative flex h-3 w-3 mr-2">
                  <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75",
                    props.status === 'complete' && 'bg-green-400',
                    props.status === 'canceled' && 'bg-red-400')}>
                  </span>
                  <span className={cn("relative inline-flex rounded-full h-3 w-3",
                    props.status === 'complete' && 'bg-green-500',
                    props.status === 'canceled' && 'bg-red-500')} >

                  </span>
                </span>
                <p className=
                  {cn(
                    props.status === 'complete' && 'text-green-700',
                    props.status === 'canceled' && 'text-red-700')}>
                  {getStatusText(props.status)}
                </p>
              </div>

            </div>
          </div>
        </div>
        <div className="flex justify-between shadow-lg rounded-lg px-8 py-4">
          <Image className="rounded-lg" src={props.user.image} width={100} height={100} alt="avt" />
          <div className="flex gap-2 items-center">
            <Image src={idCard} alt="" width={idCard.width} height={idCard.height} />
            <Label>{props.user.name}</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={gender} alt="" width={gender.width} height={gender.height} />
            <Label>{props.user.gender}</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={phone} alt="" width={location.width} height={location.height} />
            <Label>{props.phone}</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={location} alt="" width={location.width} height={location.height} />
            <Label>{props.address.specificAddress}, {props.address.ward.wardName}, {props.address.district.districtName}, {props.address.province.provinceName}</Label>
          </div>
        </div>
        <div className="flex flex-col shadow-lg rounded-lg">
          <div className="px-8 py-4 border-b w-[100%]">
            <Label className="text-2xl font-bold">Chi tiết dịch vụ</Label>
          </div>
          <div className="flex justify-between px-8 py-8">
            <div className="flex flex-col gap-4">
              <div className="border-b pb-2">
                <Label className="text-[#FF6A28] text-sm">Dịch vụ</Label>
                <Label>{props.service.serviceName}</Label>
              </div>
              <div className="border-b pb-2">
                <Label className="text-[#FF6A28] text-sm">Thời lượng làm việc</Label>
                <Label>{props.serviceCombo.title}</Label>
              </div>
              <div className="border-b pb-2">
                <Label className="text-[#FF6A28] text-sm">Khối lượng công việc</Label>
                <Label>{props.serviceCombo.description}</Label>
              </div>
              <div>
                <Label className="text-[#FF6A28] text-sm">Thời gian</Label>
                <Label>{time} - Bắt đầu từ {props.time}</Label>
              </div>
            </div>
            <div className="flex items-end">
              <div className="pt-8 pl-4 border-t">
                <Label className="text-[#FF6A28]">Tổng số tiền: {currencyFormater.format(props.serviceCombo.price)}</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
