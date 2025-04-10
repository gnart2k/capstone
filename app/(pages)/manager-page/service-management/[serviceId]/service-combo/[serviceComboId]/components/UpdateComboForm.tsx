"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { fetchData } from "@/app/lib/fetchData";
import { startTransition, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import {
  createServiceComboAction,
  updateServiceComboAction,
} from "@/app/actions/manager/service-combo";
import { UpdateServiceComboSchema } from "@/schema";

export default function UpdateComboForm({
  serviceComboId,
}: {
  serviceComboId: string;
}) {
  const router = useRouter();
  const params = useParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/service/${params.serviceId}/service-combo/${serviceComboId}`;
  const { data } = useSWR("getServiceCombo", () =>
    fetchData({ url: url, method: "GET" })
  );
  const form = useForm<z.infer<typeof UpdateServiceComboSchema>>({
    resolver: zodResolver(UpdateServiceComboSchema),
    defaultValues: {
      id: "",
      workOption: "",
      workDuration: "",
      duration: 0,
      staffNumber: 0,
      price: 0,
      serviceId: "",
    },
  });

  useEffect(() => {
    if (data && serviceComboId != "add") {
      form.reset({
        id: data.id,
        workOption: data.description,
        workDuration: data.title,
        staffNumber: +data.staffNumber,
        duration: +data.duration,
        price: +data.price,
        serviceId: data.service.id,
      });
    }
  }, [data, form]);

  function onSubmit(values: z.infer<typeof UpdateServiceComboSchema>) {
    values.id = serviceComboId;
    values.serviceId = params.serviceId.toString();
    setError("");
    setSuccess("");
    startTransition(() => {
      if (serviceComboId === "add") {
        createServiceComboAction(values).then((data) => {
          if (data?.error) {
            toast.error(data?.error);
          }
          if (data?.success) {
            toast.success(data?.success);
            router.push(`/manager-page/service-management/${params.serviceId}/service-combo`);
          }
        });
      } else {
        updateServiceComboAction(values).then((data) => {
          if (data?.error) {
            toast.error(data?.error);
          }
          if (data?.success) {
            toast.success(data?.success);
            router.push(`/manager-page/service-management/${params.serviceId}/service-combo`);
          }
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log("Errors:", errors);
      })} className="">
        <div className="grid grid-cols-2 w-full gap-12 mt-6">
          <FormField
            control={form.control}
            name="workOption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khối lượng côngviệc</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập khối lượng công việc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời gian làm việc</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập thời gian làm việc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 w-full gap-12 mt-6">
          <FormField
            control={form.control}
            name="staffNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng nhân viên</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập số lương nhân viên"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá dịch vụ</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập giá dịch vụ"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 w-full gap-12 mt-6">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời lượng làm việc</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập thời lượng làm việc"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <Button
            type="reset"
            className="font-semibold bg-gray-200 mt-8 text-gray-600 mr-4 hover:bg-gray-700 hover:text-white cursor-pointer hover:shadow-lg hover:scale-105"
            onClick={router.back}
          >
            Hủy
          </Button>
          <Button
            type="submit"
            className="font-semibold  bg-crusta mt-8  hover:shadow-lg hover:scale-105"
          >
            Lưu
          </Button>
        </div>
      </form>
    </Form>
  );
}
