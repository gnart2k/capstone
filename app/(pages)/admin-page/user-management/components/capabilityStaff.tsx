"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { startTransition, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetchData } from "@/app/lib/fetchData";
import { updateStaffCapabilityAction } from "@/app/actions/staffs/update-capability";
import { Plus, PlusCircle } from "lucide-react";

export type capability = {
  id: string,
  name: string;
  isSelected: boolean
}

export default function CreateCapabilityStaffDialog() {
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const { userId } = useParams();
  const [capability, setCapability] = useState<capability[]>([])
  console.log(userId)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/staff/get-staff-capability/${userId}`;
  const { data } = useSWR("getServiceName", () =>
    fetchData({ url: url, method: "GET" })
  );


  useEffect(() => {
    setCapability(data?.map((item: any) => ({ id: item?.id, name: item?.name, isSelected: item?.isSelected })))
    console.log(data)

  }, [data])



  const handleSubmit = async (values: any) => {
    values.preventDefault();
    setError("")
    setSuccess("")
    startTransition(async () => {
      const updateStatus = await updateStaffCapabilityAction({ capability: capability, userId: userId.toString() })
      if (!updateStatus?.success) {
        toast.error(updateStatus?.message)
      } else {
        toast.success(updateStatus?.message)
      }

    })
  };

  const handleSelect = ({ item, i }: { item: capability, i: number }) => {
    const newCapabilityArray = [...capability]
    newCapabilityArray[i].isSelected = !newCapabilityArray[i].isSelected
    setCapability(newCapabilityArray)
    console.log(capability)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" h-full bg-crusta font-bold shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-crusta">
          <PlusCircle className="mr-1" />
          <p>
            Thêm kỹ năng
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Chọn kĩ năng của nhân viên</DialogTitle>
          <DialogDescription>
            Hãy chọn dịch vụ mà nhân viên có thể đảm nhận
          </DialogDescription>
        </DialogHeader>

        <div className="columns-4 gap-2 border p-4 rounded-lg">
          {capability?.map((item, i) => (
            <div key={i} className="break-inside-avoid mb-2">
              <div className={cn("rounded-lg p-2 font-semibold text-sm hover:shadow-lg cursor-pointer text-center", item.isSelected ? "bg-crusta text-white" : "bg-gray-100 text-slate-600 ")} onClick={() => handleSelect({ item: item, i: i })}>
                {item.name}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-3">
          <Button className={cn("bg-crusta text-white font-semibold shadow-md hover:bg-crusta hover:shadow-lg")} type="button" onClick={handleSubmit}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
