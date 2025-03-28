"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { UploadButton } from "@/utils/uploadthing";
import { startTransition, useEffect, useRef, useState } from "react";
import Picture from "@/public/Picture.png";
import Image from "next/image";
import { UpdateServiceItemSchema } from "@/schema";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetchData } from "@/app/lib/fetchData";
import {
  createServiceItemAction,
  updateServiceItemAction,
} from "@/app/actions/manager/service-item";

export default function UpdateServiceItemForm({
  serviceItemId,
}: {
  serviceItemId: string;
}) {
  const router = useRouter();
  const params = useParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/service/${params.serviceId}/service-item/${serviceItemId}`;
  const { data } = useSWR("getServiceItem", () =>
    fetchData({ url: url, method: "GET" })
  );
  const form = useForm<z.infer<typeof UpdateServiceItemSchema>>({
    resolver: zodResolver(UpdateServiceItemSchema),
    defaultValues: {
      id: "",
      serviceItemTitle: "",
      serviceItemDescription: "",
      serviceImageUrl: "",
      serviceId: "",
    },
  });

  const uploadRef = useRef(null);

  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        serviceItemTitle: data.title,
        serviceItemDescription: data.description,
        serviceImageUrl: data.promotionImg,
        serviceId: data.service.id,
      });
    }
  }, [data, form]);

  const validateImage = (imageUrl: string) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
    return imageRegex.test(imageUrl);
  };

  function onSubmit(values: z.infer<typeof UpdateServiceItemSchema>) {
    if (imageUrl.length > 0) {
      values.serviceImageUrl = imageUrl;
    }
    if (!validateImage(values.serviceImageUrl)) {
      toast.error("Ảnh upload không hợp lệ!!");
      return false;
    }
    if (values.serviceImageUrl.length == 0) {
      toast.error("Vui lòng upload ảnh!");
      return false;
    }
    values.id = serviceItemId;
    values.serviceId = params.serviceId.toString();
    setError("");
    setSuccess("");

    startTransition(() => {
      if (serviceItemId === "add") {
        createServiceItemAction(values).then((data) => {
          if (data?.error) {
            toast.error(data?.error);
          }
          if (data?.success) {
            toast.success(data?.success);
            router.push(`/manager-page/service-management/${params.serviceId}/service-item`);
          }
        });
      } else {
        updateServiceItemAction(values).then((data) => {
          if (data?.error) {
            toast.error(data?.error);
          }
          if (data?.success) {
            toast.success(data?.success);
            router.push(`/manager-page/service-management/${params.serviceId}/service-item`);
          }
        });
      }
    });
  }

  const [imageUrl, setImageUrl] = useState("");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 ">
        <div className="flex justify-center gap-4 px-4">
          <div className="w-11/12">
            <FormField
              control={form.control}
              name="serviceItemTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vị trí làm việc</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Vị trí làm việc của bộ phận nhân viên"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceItemDescription"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Nội dung làm việc</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả nội dung công việc nhân viên cần làm"
                      rows={15}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-4/12 mt-8">
            <div
              className=" w-full pt-10 pb-10 rounded-lg border border-gray-700 border-dashed flex items-center justify-center flex-col"
              ref={uploadRef}
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
              <div className="text-gray-700 text-sm">Chọn ảnh tại đây</div>
              <div className="text-[10px] text-gray-400">
                Chọn định dạng ảnh: PNG, JPG, JPEG, WEBP
              </div>
              <UploadButton
                className="hidden"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  toast.success("Upload thành công");
                  res.length > 0 && setImageUrl(res[0]?.url);
                }}
                onUploadError={(error: Error) => {
                  toast.error(error.message);
                }}
              />
            </div>
            <div>
              {imageUrl && (
                <img
                  className="w-full rounded-lg h-64 object-cover"
                  src={imageUrl}
                  alt=""
                />
              )}
            </div>
            <FormField
              control={form.control}
              name="serviceImageUrl"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Hoặc tải ảnh lên từ URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Đường dẫn của ảnh" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-4 ml-4">
          <Button
            className="bg-gray-200 text-gray-700 mr-4 hover:bg-gray-700 hover:text-white cursor-pointer hover:shadow-lg hover:scale-105"
            type="reset"
            onClick={router.back}
          >
            Hủy
          </Button>
          <Button
            className="bg-crusta  hover:shadow-lg hover:scale-105"
            type="submit"
          >
            Lưu
          </Button>
        </div>
      </form>
    </Form>
  );
}
