"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Picture from "@/public/Picture.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ApplicationFormSchema } from "@/schema"
import { UploadButton } from "@/utils/uploadthing"
import Image from "next/image"
import { useEffect, useRef, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import { FileProps } from "@/type/file";
import { applicationAction } from "@/app/actions/applicationForm/ApplicationAction";
import CustomButton from "@/components/custom/button/CustomButton";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormError } from "@/components/custom/form-error";
import { FormSuccess } from "@/components/custom/form-success";

const applicationTypes: { [key: string]: string } = {
  leaveRequest: "Đơn xin nghỉ phép",
  lateRequest: "Đơn xin đi làm muộn",
  otherRequest: "Đơn khác"
};


export function ApplicationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const uploadRef = useRef(null);
  const [filePath, setFilePath] = useState<FileProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [uploadResult, setUploadResult] = useState<any[]>([]);

  const form = useForm<z.infer<typeof ApplicationFormSchema>>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      applicationType: "",
      reason: ""
    },
  })

  useEffect(() => {
    const path: FileProps[] = []
    for (let index = 0; index < uploadResult.length; index++) {
      const element = uploadResult[index];
      path.push({ name: element.name, url: element.url, type: element.type, size: element.size })
    }
    setFilePath(path)
  }, [isLoading])

  function onSubmit(data: z.infer<typeof ApplicationFormSchema>) {
    data.attachedFile = filePath



    startTransition(async () => {
      setError("");
      setSuccess("");
      console.log(data)
      const res = await applicationAction(data)
      console.log(res)
      if (res?.success) {
        toast.success(res.message)
        setSuccess(res.message)
      } else {
        toast.error(res.message)
        setError(res.message)
      }

    })
  }

  return (
    <div className="mt-4">
      <Form {...form}>
        <span className='text-lg font-semibold'>Thông tin chi tiết đơn</span>
        <form onSubmit={form.handleSubmit(onSubmit)} className="border rounded-lg shadow-md p-4 w-full mt-4">
          <FormField
            control={form.control}
            name="applicationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại đơn</FormLabel>
                <div>
                  <Select onValueChange={(value) => field.onChange(applicationTypes[value])} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại đơn yêu cầu" {...field} className="focus:outline-none" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(applicationTypes).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lý do</FormLabel>
                <FormControl>
                  <Input placeholder="Lý do làm đơn" {...field} />
                </FormControl>

              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attachedFile"
            render={({ field }) => (
              <FormItem className="cursor-pointer">
                <FormLabel>Tệp đính kèm</FormLabel>
                <FormControl>
                  <div
                    className={cn("w-full pt-10 pb-10 rounded-lg border border-gray-700 border-dashed flex items-center justify-center flex-col", (isLoading && "opacity-50"))}
                    ref={uploadRef}
                    aria-disabled={isLoading}
                    onClick={() => {
                      uploadRef.current &&
                        uploadRef.current.querySelector("label").click();
                    }}
                  >
                    <Image
                      src={Picture.src}
                      width={Picture.width}
                      height={Picture.height}
                      alt=""
                    />
                    <div className="text-gray-700 text-sm">Chọn File tại đây</div>
                    <div className="text-[10px] text-gray-400">
                      Chọn định dạng ảnh: PDF, TXT, PNG, JPG
                    </div>
                    <UploadButton
                      className="hidden"
                      endpoint="productPdf"
                      onUploadBegin={e => setIsLoading(true)}
                      onClientUploadComplete={(res) => {
                        setUploadResult(res)
                        setIsLoading(false)
                      }}
                      onUploadError={(error: Error) => {
                        toast.error("File không hợp lệ hoặc file quá lớn, hãy tải file dưới 4MB")
                        console.log(error)
                      }}
                    />
                    {filePath.length > 0 && (
                      <div className="mt-4">
                        <p className="text-center">Các file đã tải lên</p>
                        <div className="border-t border-gray-400">
                          <div>
                            {filePath.map((file, index) => (
                              <div key={index} className="mt-4 flex items-center justify-center ">
                                {
                                  file.type.startsWith("image") ? <img src={file.url} alt="" className="object-contain w-16 mr-2" /> : <FileText className="text-crusta mr-2" />
                                }
                                <span className="text-gray-600">{file.name} ({file.size} Bytes)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="w-full flex justify-end mt-4">
            <CustomButton type="submit" variant="swipe" disabled={isLoading} className="mt-4" text="Gửi đơn" />

          </div>
        </form>
      </Form>
    </div>
  )
}

