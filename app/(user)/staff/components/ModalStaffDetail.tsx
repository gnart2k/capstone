"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ArrowLeftIcon, HeartIcon } from "lucide-react";
import personIcon from "@/public/assets/images/person-icon.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TimeTag from "./TimeTag";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export type StaffDetail = {
  staffId: string;
  staffName: string;
  phoneNumber: string;
  staffAvatar: string;
  location: string;
  age: string;
  gender: string;
  credibility: string | null;
  capabilities: {
    Service: {
      serviceName: string;
    };
  }[];
  schedule: {
    day: string;
    date: string;
    shift: {
      shift: string;
      active: boolean;
    }[];
  }[];
};

export default function ModalStaffDetail({ props }: { props: StaffDetail }) {
  const staff = props;
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <Dialog open={true} onOpenChange={() => { }}>
      <DialogContent className="p-0 max-w-[1150px] top-[55%]">
        <div className="flex justify-between shadow-xl p-3">
          <ArrowLeftIcon onClick={() => router.back()} className="cursor-pointer" />

        </div>
        <div className="px-3">
          <div className="flex flex-col items-center gap-1">
            <img
              src={staff.staffAvatar}
              alt="avatar"
              className="h-12 w-12 rounded-lg object-cover"
            />
            <Label className="text-[#FF6A28] text-base">
              {staff.staffName}
            </Label>
            <Label className="text-gray-400">{staff.location}</Label>
          </div>
          <div className="flex justify-center gap-[100px] pt-6 pl-6">
            <div className="flex flex-col items-center gap-2">
              <Label className="text-gray-400">Tuổi</Label>
              <Label>{staff.age}</Label>
            </div>
            <div className="border-l-[1px] border-gray-500" />
            <div className="flex flex-col items-center gap-2">
              <Label className="text-gray-400">Giới tính</Label>
              <Label>{staff.gender}</Label>
            </div>
            <div className="border-l-[1px] border-gray-500" />
            <div className="flex flex-col items-center gap-2">
              <Label className="text-gray-400">Đánh giá</Label>
              <Label>{(+staff.credibility).toFixed(1)}</Label>
            </div>
          </div>
          <div className="flex flex-col items-center pt-4 gap-2">
            <Label>Kỹ năng</Label>
            <div className="flex gap-2 flex-wrap justify-center items-center w-9/12">
              {staff.capabilities.map((capability, index) => (
                <div key={index} className="border-[1px] min-w-[90px] font-light text-xs text-center border-[#FF6A28] p-1 rounded-md">
                  {capability.Service.serviceName}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-3">
            <div className="flex p-2 items-center gap-2 bg-[#F6F6F6]">
              <Image
                src={personIcon}
                width={personIcon.width}
                height={personIcon.height}
                alt="icon"
              />
              <Label className="font-light italic">
                Hồ sơ được xác thực bởi hệ thống của chúng tôi
              </Label>
            </div>
            <div className="min-w-[600px] flex justify-between mb-4">
              <div>
                <Label className="text-[#A0A0A0]">Ca sáng</Label>
                <div className="flex gap-1">
                  {staff.schedule.map((value, index) =>
                    value.shift
                      .filter((shift) => shift.shift === "Sáng")
                      .map((shift) => (
                        <TimeTag key={index} data={value} shift="Sáng" />
                      ))
                  )}
                </div>
              </div>
              <div>
                <Label className="text-[#A0A0A0]">Ca chiều</Label>
                <div className="flex gap-1">
                  {staff.schedule.map((value, index) =>
                    value.shift
                      .filter((shift) => shift.shift === "Chiều")
                      .map((shift) => (
                        <TimeTag key={index} data={value} shift="Chiều" />
                      ))
                  )}
                </div>
              </div>
              <div>
                <Label className="text-[#A0A0A0]">Ca tối</Label>
                <div className="flex gap-1">
                  {staff.schedule.map((value, index) =>
                    value.shift
                      .filter((shift) => shift.shift === "Tối")
                      .map((shift) => (
                        <TimeTag key={index} data={value} shift="Tối" />
                      ))
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-[10px] h-[10px] bg-[#FF6A28] rounded-full" />
                <Label>Ca nhân viên sẵn sàng đi làm</Label>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[10px] h-[10px] bg-[#A0A0A0] rounded-full" />
                <Label>Ca cần chờ nhân viên xác nhận</Label>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3">
          <Button onClick={() => router.push('/booking')} className="bg-[#FF6A28] hover:bg-[#FF6A28] w-[100%] rounded-full">
            Đặt lịch
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
