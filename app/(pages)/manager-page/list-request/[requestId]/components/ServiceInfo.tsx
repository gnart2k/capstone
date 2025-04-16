"use client";
import React, { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import { ServiceInfoProps } from "@/type/serviceInfo";
import EditWrapper from "@/components/custom/EditWrapper";
import { useParams, useRouter } from "next/navigation";
import { changeDate, changePhone, changeTime } from "@/app/actions/request/RequestAction";
import toast from "react-hot-toast";
import { useEditWrapperStore } from "@/app/store/useEditWrapperStore";
import { currencyFormater } from "@/app/lib/currencyFormat";

function ServiceInfo({ props }: { props: ServiceInfoProps }) {
  const dateString = props.date ? format(props?.date, "dd/MM/yyyy") : "N/A";
  const timeString = props.time ? format(parse(props?.time, "HH:mm", new Date()), "HH:mm") : "N/A";
  const params = useParams();
  const router = useRouter();
  const setInputValue = useEditWrapperStore((state) => state.setInput);
  const inputValue = useEditWrapperStore((state) => state.input);

  const [editField, setEditField] = useState<string | null>(null);

  useEffect(() => {
    if (editField === 'phone') {
      setInputValue(props.phoneNumber);
    } else if (editField === 'date') {
      setInputValue(dateString);
    } else if (editField === 'time') {
      setInputValue(timeString);
    }
  }, [editField, props.phoneNumber, dateString, timeString]);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const validateDate = (date: string) => {
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());
    return !isNaN(parsedDate.getTime());
  };

  const validateTime = (time: string) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const handleChangePhone = async () => {
    if (!validatePhone(inputValue)) {
      toast.error("Số điện thoại phải bắt đầu bằng 0 và chứa 9-10 chữ số!!");
      return;
    }
    await changePhone({ requestId: params.requestId.toString(), phone: inputValue });
    toast.success("Cập nhật số điện thoại thành công!");
    router.refresh();
  };

  const handleChangeDate = async () => {
    if (!validateDate(inputValue)) {
      toast.error("Ngày không hợp lệ!Nhập ngày format dạng dd/MM/yyyy");
      return;
    }
    await changeDate({ requestId: params.requestId.toString(), date: inputValue });
    toast.success("Cập nhật ngày đặt thành công!");
    router.refresh();
  };

  const handleChangeTime = async () => {
    if (!validateTime(inputValue)) {
      toast.error("Thời gian không hợp lệ! Format dạng HH:MM");
      return;
    }
    await changeTime({ requestId: params.requestId.toString(), time: inputValue });
    toast.success("Cập nhật thời gian thành công!");
    router.refresh();
  };

  return (
    <div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Thông tin dịch vụ</p>
        </div>
        <div className="border shadow-md flex flex-col rounded-2xl justify-center pt-10 pb-14 px-12 mt-4">
          <div className="w-6/12">
            <div className="flex flex-col border-b border-b-gray-300 pb-2">
              <span className="text-crusta font-semibold">Dịch vụ</span>
              <span>{props.serviceName}</span>
            </div>

            <div className="flex flex-col border-b border-b-gray-300 pb-2">
              <span className="text-crusta font-semibold">Số điện thoại</span>
              <EditWrapper
                defaultValue={{ value: props.phoneNumber, type: "text" }}
                triggerFunction={handleChangePhone}
                onEdit={editField === 'phone'}
                setOnEdit={() => setEditField(editField === 'phone' ? null : 'phone')}
              >
                <span>{props.phoneNumber}</span>
              </EditWrapper>
            </div>

            <div className="flex flex-col border-b border-b-gray-300 pb-2">
              <span className="text-crusta font-semibold">
                Khối lượng công việc
              </span>
              <span>{props.workOption}</span>
            </div>

            <div className="flex flex-col border-b border-b-gray-300 pb-2">
              <span className="text-crusta font-semibold">Lịch làm việc</span>
              <EditWrapper
                defaultValue={{ value: dateString, type: "text" }}
                triggerFunction={handleChangeDate}
                onEdit={editField === 'date'}
                setOnEdit={() => setEditField(editField === 'date' ? null : 'date')}
              >
                <span>{dateString}</span>
              </EditWrapper>
            </div>

            <div className="flex flex-col border-b border-b-gray-300 pb-2">
              <span className="text-crusta font-semibold">Thời gian đặt</span>
              <EditWrapper
                defaultValue={{ value: timeString, type: "text" }}
                triggerFunction={handleChangeTime}
                onEdit={editField === 'time'}
                setOnEdit={() => setEditField(editField === 'time' ? null : 'time')}
              >
                <span>Bắt đầu từ {timeString}</span>
              </EditWrapper>
            </div>
          </div>
          <div className="flex items-end justify-end">
            <span className="text-crusta">Tổng số tiền: {currencyFormater.format(+props.amount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceInfo;
