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
import { useCallback, useEffect, useState } from "react";
import { changeStatus } from "@/app/actions/staffs/list-request";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getStatusText } from "../../../components/upcomingWorkCard";
import { createNotification } from "@/app/actions/notifications/create";
import { currencyFormater } from "@/app/lib/currencyFormat";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";


const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);

export type RequestSchema = {
  id: number;
  date: Date;
  time: string;
  status: string;
  phone: string;
  user: {
    image: string;
    name: string;
    gender: string;
    id: string;
    email: string;
  };
  address: {
    specificAddress: string;
    ward: {
      wardName: string;
    };
    district: {
      districtName: string;
    };
    province: {
      provinceName: string;
    };
  };
  service: {
    serviceName: string;
  };
  serviceCombo: {
    title: string;
    description: string;
    price: number;
    staffNumber?: number
  };
  note?: string
};

export default function ViewRequestDetail({ props }: { props: RequestSchema }) {
  const [accept, setAccept] = useState<boolean>(false);
  const [reject, setReject] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();

  const handleStatus = useCallback(async (e: string) => {
    if (e === "accept") {
      setAccept(true);
      setReject(false);
      if (+props.note + 1 == props.serviceCombo.staffNumber) {
        await createNotification(
          props.user.id,
          "accept booking",
          `Yêu cầu đặt dịch vụ đã được nhân viên xác nhận. Vui lòng kiểm tra Email.`
        );
        socket.emit(
          "notifyUser",
          props.user.id,
          `Yêu cầu đặt dịch vụ đã được nhân viên xác nhận. Vui lòng kiểm tra Email.`
        );
        await createNotification(
          session.data.user.id,
          "accept booking",
          `Bạn vừa xác nhận yêu cầu đặt dịch vụ. Kiểm tra công việc trong Lịch Làm Việc của bạn.`
        );
        socket.emit(
          "notifyUser",
          session.data.user.id,
          `Bạn vừa xác nhận yêu cầu đặt dịch vụ. Kiểm tra công việc trong Lịch Làm Việc của bạn.`
        );
      }
    } else {
      setReject(true);
      setAccept(false);
      await createNotification(
        props.user.id,
        "deny booking",
        `Yêu cầu đặt dịch vụ đã bị từ chối. Chúng tôi rất tiếc về sự bất tiện này. Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua tch@gmail.com. `
      );
      socket.emit(
        "notifyUser",
        props.user.id,
        `Yêu cầu đặt dịch vụ đã bị từ chối. Chúng tôi rất tiếc về sự bất tiện này. Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua tch@gmail.com`
      );
      await createNotification(
        session.data.user.id,
        "deny booking",
        `Bạn đã từ chối yêu cầu đặt dịch vụ. Thông báo từ chỗi đã được gửi tới khách hàng. `
      );
      socket.emit(
        "notifyUser",
        session.data.user.id,
        `Bạn đã từ chối yêu cầu đặt dịch vụ. Thông báo từ chỗi đã được gửi tới khách hàng. `
      );
    }
  }, []);

  useEffect(() => {
    const handleStatusAction = async () => {
      if (accept || reject) {
        await changeStatus({ requestId: props.id, isAccept: accept, note: props.note, staffNumber: props.serviceCombo.staffNumber });
        toast.success("Cập nhật trạng thái thành công!");
        router.refresh();
        router.push("/staff-page/request");
      }
    };
    handleStatusAction();
  }, [accept, reject, props.id]);

  const time = props.date ? format(new Date(props.date), "dd/MM/yyyy") : "";

  return (
    <div className="w-full flex items-center justify-center">
      <div className="mt-12 w-[85%] flex flex-col gap-4 mb-10">
        <div className="shadow-lg rounded-lg flex justify-between px-8 py-4">
          <Button
            variant="ghost"
            className="flex gap-4"
            onClick={() => {
              router.push("/staff-page/request");
            }}
          >
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
              <div
                className={cn(
                  "flex items-center justify-center rounded-3xl py-1 w-36",
                  props.status === "pending" && "bg-yellow-100",
                  props.status === "complete" && "bg-green-100",
                  props.status === "confirmed" && "bg-blue-100",
                  props.status === "paid" && "bg-orange-100",
                  props.status === "canceled" && "bg-red-100"
                )}
              >
                <span className="relative flex h-3 w-3 mr-2">
                  <span
                    className={cn(
                      "animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75",
                      props.status === "pending" && "bg-yellow-400",
                      props.status === "paid" && "bg-orange-400",
                      props.status === "confirmed" && "bg-blue-400",
                      props.status === "complete" && "bg-green-400",
                      props.status === "canceled" && "bg-red-400"
                    )}
                  ></span>
                  <span
                    className={cn(
                      "relative inline-flex rounded-full h-3 w-3",
                      props.status === "pending" && "bg-yellow-500",
                      props.status === "paid" && "bg-orange-500",
                      props.status === "confirmed" && "bg-blue-500",
                      props.status === "complete" && "bg-green-500",
                      props.status === "canceled" && "bg-red-500"
                    )}
                  ></span>
                </span>
                <p
                  className={cn(
                    props.status === "pending" && "text-yellow-700",
                    props.status === "paid" && "text-orange-700",
                    props.status === "confirmed" && "text-blue-700",
                    props.status === "complete" && "text-green-700",
                    props.status === "canceled" && "text-red-700"
                  )}
                >
                  {getStatusText(props.status)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-4 shadow-lg rounded-lg px-8 py-4">
          <Image
            className="rounded-lg"
            src={props.user.image}
            width={100}
            height={100}
            alt="avt"
          />
          <div className="flex gap-2 items-center">
            <Image
              src={idCard}
              alt=""
              width={idCard.width}
              height={idCard.height}
            />
            <Label>{props.user.name}</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src={gender}
              alt=""
              width={gender.width}
              height={gender.height}
            />
            <Label>{props.user.gender}</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src={phone}
              alt=""
              width={location.width}
              height={location.height}
            />
            <Label>{props.phone}</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src={location}
              alt=""
              width={location.width}
              height={location.height}
            />
            <Label>
              {props.address.specificAddress}, {props.address.ward.wardName},
              {props.address.district.districtName}{", "}
              {props.address.province.provinceName}
            </Label>
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
                <Label className="text-[#FF6A28] text-sm">
                  Thời lượng làm việc
                </Label>
                <Label>{props.serviceCombo.title}</Label>
              </div>
              <div className="border-b pb-2">
                <Label className="text-[#FF6A28] text-sm">
                  Diện tích làm việc
                </Label>
                <Label>{props.serviceCombo.description}</Label>
              </div>
              <div>
                <Label className="text-[#FF6A28] text-sm">Thời gian</Label>
                <Label>
                  {time} - Bắt đầu từ {props.time}
                </Label>
              </div>
            </div>
            <div className="flex items-end">
              <div className="pt-8 pl-4 border-t">
                <Label className="text-[#FF6A28]">
                  Tổng số tiền: {currencyFormater.format(props.serviceCombo.price)}
                </Label>
              </div>
            </div>
          </div>
        </div>
        {

          props.status == 'paid' &&
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => handleStatus("accept")}
              className="bg-[#24D198] hover:bg-[#24D198] hover:shadow-lg hover:scale-105"
            >
              Đồng ý
            </Button>
            <Button
              onClick={() => handleStatus("reject")}
              className="bg-[#FF3A44] hover:bg-[#FF3A44] hover:shadow-lg hover:scale-105"
            >
              Từ chối
            </Button>
          </div>
        }
      </div>
    </div>
  );
}
