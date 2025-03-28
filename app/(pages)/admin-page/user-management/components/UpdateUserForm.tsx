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
import { updateUserSchema } from "@/schema";
import React, { useEffect, useRef, useState, useTransition } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { updateUserProfileAction } from "@/app/actions/admin/update-user-profile";
import toast from "react-hot-toast";
import CustomButton from "@/components/custom/button/CustomButton";
import { useRouter } from "next/navigation";
import { FormError } from "@/components/custom/form-error";
import { FormSuccess } from "@/components/custom/form-success";
import CreateAddressAdminDialog from "./createUserAddress";
import AddressUserForm from "./AddressUserForm";
import CreateCapabilityStaffDialog from "./capabilityStaff";

type UpdateUserFormProps = {
  id: string;
  name?: string;
  dob?: Date;
  phone?: string;
  email?: string;
  role?: string;
  gender?: string;
  addresses?: {
    address: {
      id: string;
      province: {
        id: number;
        provinceName: string;
      };
      district: {
        id: number;
        districtName: string;
      };
      ward: {
        id: number;
        wardName: string;
      };
      specificAddress: string;
      isDefault: boolean;
    };
  }[];
  status: boolean;
};

export default function UpdateUserForm(props: UpdateUserFormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();
  const [isPending, startTransition] = useTransition()



  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: props.id,
      name: props.name,
      phoneNumber: props.phone,
      dateOfBirth: props.dob,
      email: props.email,
      role: props.role,
      status: props.status,
      gender: props.gender,
    },
  });

  function onSubmit(values: z.infer<typeof updateUserSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      updateUserProfileAction(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
          setError(data?.error);
        } else {
          toast.success(data?.success);
          setSuccess(data?.success);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">

        <div role="status">
          <span className="sr-only">Loading...</span>
        </div>

        <div className="flex justify-center mt-8 gap-4 px-4">
          <div className="w-11/12">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-2xl mb-4">Thông tin người dùng</p>
              {props.role === "staff" && (
                <div className="">
                  <CreateCapabilityStaffDialog />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-6/12 mr-2 mt-4 ">
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-700"
                        placeholder="Tên của bạn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-6/12 mr-2 mt-4">
                    <FormLabel>Trạng thái</FormLabel>
                    <div className="">
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === "true" ? true : false)
                        }
                        defaultValue={field.value ? "true" : "false"}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-700">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Hoạt động</SelectItem>
                          <SelectItem value="false">Dừng họat động</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" mt-5 flex items-center justify-between">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-6/12 mr-2 mt-1">
                    <FormLabel className="mb-1">Ngày sinh</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal border-gray-700",
                              !field?.value && "text-muted-foreground"
                            )}
                          >
                            {field?.value && field?.value?.toString() !== "Invalid Date" ? (
                              // field.value.toString()
                              format(field?.value, "PPP")
                            ) : (
                              <span>Chọn ngày/tháng/năm</span>
                            )}

                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      {}
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          initialFocus
                          mode="single"
                          onSelect={(e) => field.onChange(new Date(e))}
                          disabled={(date) => date > new Date()}
                          selected={field.value ?? undefined}
                          translate="vi"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="w-6/12">
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-700"
                        placeholder="Nhập số điện thoại tại đây"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-700"
                        placeholder="Nhập địa chỉ email tại đây"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Vai trò</FormLabel>
                    <div className="">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-700">
                            <SelectValue placeholder="Chọn vai trò" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Quản trị viên</SelectItem>
                          <SelectItem value="manager">Quản lý</SelectItem>
                          <SelectItem value="staff">Nhân viên</SelectItem>
                          <SelectItem value="user">Người dùng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới Tính</FormLabel>
                    <div>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-700 w-full">
                            <div >
                              {
                                !field.value ? (
                                  <span>
                                    Chọn giới tính
                                  </span>
                                ) : (
                                  <span>
                                    {field.value}
                                  </span>
                                )

                              }
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Nam">Nam</SelectItem>
                          <SelectItem value="Nữ">Nữ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="mt-4 end-0 flex">
              <div className="mr-2">
                <CustomButton
                  text="Hủy"
                  type="reset"
                  variant="skewCurtain"
                  onClick={router.back}
                  disabled={isPending}
                />
              </div>
              <CustomButton text="Lưu" type="submit" variant="swipe" disabled={isPending} />
            </div>
            <div className="flex items-end pt-10 ">
              <h2 className="text-lg font-semibold">Thông tin địa chỉ</h2>
              <div className="ml-5">
                {props.addresses.length < 3 && (
                  <div>
                    <CreateAddressAdminDialog />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full">
              <AddressUserForm addresses={props.addresses} />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
