"use client";
import React, { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import excelIcon from "@/public/excel-icon.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/custom/form-error";
import { FormSuccess } from "@/components/custom/form-success";
import { CreateUserSchema } from "@/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createUserProfileAction } from "@/app/actions/admin/update-user-profile";
import Image from "next/image";
import Link from "next/link";

const CreateUserForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      name: "",
      phone: "",
      dob: new Date(),
      gender: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof CreateUserSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createUserProfileAction(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
          setError(data?.error);
        } else {
          toast.success(data?.success);
          setSuccess(data?.success);
        }
      });
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-10/12">
        <div className="mt-12 flex justify-between items-center px-4 py-2 rounded-lg border border-gray-200">
          <div className="flex justify-between w-full">
            <div>
              <h1 className="font-semibold text-lg">Tạo người dùng mới</h1>
              <p className="text-sm text-gray-400">
                Tạo người dùng mới trên hệ thống
              </p>
            </div>
            <div>
              <Link
                href={"/admin-page/create-user/excel"}
                className="p-2 border rounded-lg border-slate-200 flex items-center shadow-md hover:shadow-lg"
              >
                <Image
                  className="mr-2"
                  src={excelIcon.src}
                  height={20}
                  width={20}
                  alt="excel icon"
                />
                <p className="font-semibold text-slate-500 text-[14px]">
                  Tạo user với file excel
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full flex flex-col mt-8"
              >
                <div className="grid grid-cols-2 gap-4 ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className=" ">Họ và tên</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            defaultValue={field.value}
                            placeholder="Nhập tên của bạn"
                            type="text"
                            className=" border-gray-700 w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className=" ">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            defaultValue={field.value}
                            placeholder="Nhập email của bạn"
                            type="text"
                            className=" border-gray-700 w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full mt-2">
                      <FormLabel className=" ">Mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          defaultValue={field.value}
                          placeholder="Nhập password của bạn"
                          type="text"
                          className=" border-gray-700 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-full mt-2">
                      <FormLabel className=" ">Xác nhận mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          defaultValue={field.value}
                          placeholder="Xác nhận mật khẩu của bạn"
                          type="text"
                          className=" border-gray-700 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-8 mt-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" ">Số điện thoại</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            defaultValue={field.value}
                            placeholder="Nhập số điện thoại của bạn"
                            type="text"
                            className=" border-gray-700 w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full mt-3">
                        <FormLabel>Ngày tháng năm sinh</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  "border-gray-700 w-full",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value.toString() !== "Invalid Date" ? (
                                  // field.value.toString()
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Chọn ngày/tháng/năm</span>
                                )}

                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>

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
                </div>

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
                              <SelectValue placeholder="Chọn giới tính" />
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
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vai trò</FormLabel>
                      <div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-gray-700 w-full">
                              <SelectValue placeholder="Chọn vai trò" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="User">Khách hàng</SelectItem>
                            <SelectItem value="Staff">Nhân viên</SelectItem>
                            <SelectItem value="Manager">Quản lý</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormError message={error} />
                <FormSuccess message={success} />

                <div className="flex justify-end items-end  w-full 4 my-4  ">
                  <Button
                    type="reset"
                    onClick={() => router.back()}
                    disabled={isPending}
                    className=" mr-4 h-full bg-gray-200 text-gray-500 font-bold  shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-crusta"
                  >
                    Hủy
                  </Button>

                  <Button
                    className="w-full mt-8 bg-crusta text-white hover:bg-crusta shadow-md hover:shadow-lg hover:text-white"
                    disabled={isPending}
                    type="submit"
                  >
                    Tạo Tài khoản
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
