"use client";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Copy, PhoneIcon } from "lucide-react";
import id from "@/public/assets/images/id.png";
import idCard from "@/public/assets/images/id-card.png";
import gender from "@/public/assets/images/gender.png";
import age from "@/public/assets/images/age1.png";
import star from "@/public/assets/images/star1.png";
import location from "@/public/assets/images/location.png";
import Image from "next/image";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getStatusText } from "@/app/(pages)/staff-page/(root)/components/upcomingWorkCard";
import { currencyFormater } from "@/app/lib/currencyFormat";
import { cancelRequest } from "@/app/actions/users/cancel-request";
import { io } from "socket.io-client";
import { createNotification } from "@/app/actions/notifications/create";
import { AlertModal } from "@/components/custom/modals/AlertModal";
import Link from "next/link";
import payos from "@/public/payos.png";
import zalopay from "@/public/zalopay.png";
import { format } from "date-fns";
import CustomPhoneIcon from "@/public/phoneIcon.png"

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}:4000`);

export type BookingHistorySchema = {
  id: number;
  status: string;
  phone: string;
  staff: StaffSchema[];
  serviceName: string;
  titleServiceCombo: string;
  descriptionServiceComBo: string;
  priceServiceCombo: number;
  date: Date;
  time: string;
  paymentMethod: string;
  paymentLink: string;
};

export type StaffSchema = {
  staffName: string;
  staffImage: string;
  staffGender: string;
  addressStaff: string;
  ageStaff: string;
  credibilityStaff: string;
  staffPhone: string;
};

export default function ViewBookingHistoryDetail({
  props,
}: {
  props: BookingHistorySchema;
}) {
  const [canceled, setCanceled] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [staffIds, setStaffIds] = useState<string[] | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStatus = useCallback((e: string) => {
    if (e === "canceled") {
      setOpen(true);
    }
  }, []);

  const onCancelConfirm = async () => {
    try {
      setLoading(true);
      setCanceled(true);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const cancelRequestAction = async () => {
      if (canceled) {
        const data = await cancelRequest({
          requestId: props.id,
          isCanceled: canceled,
        });
        setUserId(data.userId);
        setStaffIds(data.staffIds);
        await sendNotification(data.userId, data.staffIds);
        router.push("/profile/booking-history");
        window.location.reload();
      }
    };
    cancelRequestAction();
  }, [canceled, props.id]);

  const sendNotification = async (
    userId: string | null,
    staffIds: string[] | null
  ) => {
    try {
      if (userId) {
        await createNotification(userId, "cancel_booking", "Bạn đã hủy dịch vụ thành công");
        socket.emit("notifyUser", userId, "Hủy yêu cầu thành công!");
      }
      if (staffIds) {
        for (const staffId of staffIds) {
          await createNotification(staffId, "cancel_booking", "Dịch vụ đã bị hủy bởi người đặt");
          socket.emit("notifyUser", staffId, "Lịch làm việc của bạn đã bị hủy!");
        }
      }
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  };

  const router = useRouter();

  return (
    <div className=" w-[70%] flex flex-col gap-4 mb-6">
      <div className="shadow-lg rounded-lg flex justify-between px-8 py-4">
        <Button
          variant="ghost"
          className="flex gap-4 "
          onClick={() => {
            router.push("/profile/booking-history");
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
                props.status === "pending" && "bg-yellow-100",
                props.status === "complete" && "bg-green-100",
                "flex items-center justify-center rounded-3xl py-1 w-36",
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
      {props.staff.map((st, index) => (

        <div key={index} className="flex justify-between shadow-lg rounded-lg px-8 py-4">
          <Image
            className="rounded-lg"
            src={st.staffImage}
            width={100}
            height={100}
            alt="avt"
          />
          <div
            className="w-10/12"
          >
            <div className="flex justify-between">
              <div className="flex gap-2 items-center mt-4 mb-4">
                <Image
                  src={idCard}
                  alt=""
                  width={idCard.width}
                  height={idCard.height}
                />
                <Label>{st.staffName}</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Image
                  src={gender}
                  alt=""
                  width={gender.width}
                  height={gender.height}
                />
                <Label>{st.staffGender}</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Image src={age} alt="" width={age.width} height={age.height} />
                <Label>{st.ageStaff}</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Image src={star} alt="" width={star.width} height={star.height} />
                <Label>{(+st.credibilityStaff).toFixed(1)}/5</Label>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Image
                  src={location}
                  alt=""
                  width={location.width}
                  height={location.height}
                />
                <Label>{st.addressStaff}</Label>
              </div>
              <div className="flex items-center ml-4">
                <Image src={CustomPhoneIcon.src} width={20} height={20} alt="phone" className="mr-2" />
                {st.staffPhone}
              </div>
            </div>
          </div>
        </div>

      ))}
      <div className="flex flex-col shadow-lg rounded-lg">
        <div className="px-8 py-4 border-b w-[100%] flex justify-between items-center">
          <Label className="text-2xl font-bold">Chi tiết dịch vụ</Label>
          {props.status !== "canceled" &&
            props.status !== "complete" &&
            props.status !== "confirmed" && (
              <Button
                onClick={() => handleStatus("canceled")}
                className="bg-crusta text-white dark:hover:bg-gray-700  hover:scale-105 shadow-md hover:shadow-lg hover:bg-crusta"
              >
                Hủy yêu cầu
              </Button>
            )}
        </div>
        <div className="flex justify-between px-8 py-8 w-full">
          <div className="flex flex-col gap-4">
            <div className="border-b pb-2">
              <Label className="text-[#FF6A28] text-sm">Dịch vụ</Label>
              <Label>{props.serviceName}</Label>
            </div>
            <div className="border-b pb-2">
              <Label className="text-[#FF6A28] text-sm">
                Số điện thoại đặt
              </Label>
              <Label>{props.phone}</Label>
            </div>
            <div className="border-b pb-2">
              <Label className="text-[#FF6A28] text-sm">
                Thời lượng làm việc
              </Label>
              <Label>{props.titleServiceCombo}</Label>
            </div>
            <div className="border-b pb-2">
              <Label className="text-[#FF6A28] text-sm">
                Khối lượng công việc
              </Label>
              <Label>{props.descriptionServiceComBo}</Label>
            </div>
            <div>
              <Label className="text-[#FF6A28] text-sm">Thời gian</Label>
              <Label>
                {format(props.date, "dd/MM/yyyy")} - Bắt đầu từ {props.time}
              </Label>
            </div>
          </div>
          {props?.paymentLink && (
            <div className="flex flex-col items-end justify-between w-[400px]">
              <div className="flex flex-col">
                <div className="">
                  <div className="text-[#FF6A28] text-sm ">Link thanh toán</div>
                  <div className="flex items-center">

                    <div className="flex items-center">
                      <Link
                        href={props?.paymentLink}
                        className="mr-1 underline text-sm text-slate-600 hover:text-blue-600"
                      >
                        Click vào đây để thanh toán{" "}
                      </Link>
                      <Copy
                        className="ml-2 w-3 h-3 cursor-pointer "
                        onClick={() => {
                          navigator.clipboard.writeText(props?.paymentLink);
                          toast.success("Đã lưu link trong clipboard");
                        }}
                      />
                    </div>

                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-[#FF6A28] text-sm w-24 ">
                    Nền tảng thanh toán
                  </span>
                  <br />
                  {props?.paymentMethod == "payos" ? (
                    <Image src={payos} alt="payos" width={60} height={60} />
                  ) : (
                    <Image src={zalopay} alt="zalopay" width={120} height={120} />
                  )}
                </div>
              </div>
              <div className="pt-8 pl-8 border-t">
                <Label className="text-[#FF6A28]">
                  Tổng số tiền: {currencyFormater.format(props.priceServiceCombo)}
                </Label>
              </div>
            </div>
          )}
        </div>
      </div>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onCancelConfirm}
        loading={loading}
      />
    </div>
  );
}
