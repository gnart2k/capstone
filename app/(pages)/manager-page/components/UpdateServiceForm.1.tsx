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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UploadButton } from "@/utils/uploadthing";
import { useRef, useState, useEffect, startTransition } from "react";
import Picture from "@/public/Picture.png";
import Image from "next/image";
import { UpdateServiceSchema } from "@/schema";
import useSWR from "swr";
import { fetchData } from "@/app/lib/fetchData";
import {
  createServiceAction,
  updateServiceAction,
} from "@/app/actions/manager/service-management";

export default function UpdateServiceForm({
  serviceId,
}: {
  serviceId: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/service/${serviceId}`;
  const { data } = useSWR("getServiceName", () =>
    fetchData({ url: url, method: "GET" })
  );

  const form = useForm<z.infer<typeof UpdateServiceSchema>>({
    resolver: zodResolver(UpdateServiceSchema),
    defaultValues: {
      id: "",
      serviceName: "",
      serviceDescription: "",
      serviceImageUrl: "",
      shortDescription: "",
    },
  });

  const uploadRef = useRef(null);

  useEffect(() => {
    if (serviceId !== "add") {
      if (data) {
        form.reset({
          id: data.id,
          serviceName: data.serviceName,
          serviceDescription: data.longDescription,
          serviceImageUrl: data.promotionImg,
          shortDescription: data.shortDescription,
        });
        setImageUrl(data.promotionImg)
      }
    }
  }, [data, form]);
  const validateImage = (imageUrl: string) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
    return imageRegex.test(imageUrl);
  };

  function onSubmit(values: z.infer<typeof UpdateServiceSchema>) {
    values.id = serviceId;
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

    setError("");
    setSuccess("");

    startTransition(() => {
      if (serviceId === "add") {
        createServiceAction(values).then((data) => {
          if (data?.error) {
            toast.error(data?.error);
          }
          if (data?.success) {
            toast.success(data?.success);
          }
        });
      } else {
        updateServiceAction(values).then((data) => {
          if (data?.error) {
            toast.error(data?.error);
          }
          if (data?.success) {
            toast.success(data?.success);
          }
        });
      }
    });
  }

  const [imageUrl, setImageUrl] = useState("");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flex justify-center mt-8 gap-4 px-4">
          <div className="w-11/12">
            <FormField
              control={form.control}
              name="serviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên dịch vụ</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên dịch vụ của bạn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dịch vụ có gì?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả những hữu ích từ dịch vụ"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả chi tiết</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả dịch vụ của bạn"
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-4/12">
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
                  className="w-full rounded-lg h-64 object-cover mt-4"
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
                  <FormControl onChange={() => { setImageUrl(field.value) }}>
                    <Input placeholder="Đường dẫn của ảnh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-4 ml-4">
          <Button
            className="bg-crusta hover:shadow-lg hover:scale-105"
            type="submit"
          >
            Lưu
          </Button>
          <Button
            className="bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white cursor-pointer hover:shadow-lg hover:scale-105 ml-4"
            type="reset"
            onClick={router.back}
          >
            Hủy
          </Button>
        </div>
      </form>
    </Form>
  );
}
