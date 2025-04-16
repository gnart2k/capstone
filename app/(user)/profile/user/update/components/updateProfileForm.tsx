"use client"
import React, { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/custom/form-error";
import { FormSuccess } from "@/components/custom/form-success";
import { UpdateProfileSchema } from "@/schema";
import { updateProfileAction } from "@/app/actions/profile/update-profile";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CreateAddressDialog from "./createAddress";
import AddressForm from "@/components/custom/AddressForm";
import { useUserStore } from "@/app/store/useUserStore";

type UpdateProfileFormProps = {
  id: string,
  name?: string,
  phone?: string,
  dob?: Date,
  gender?: string
  addresses?: {
    address: {
      id: string,
      province: {
        id: number,
        provinceName: string
      };
      district: {
        id: number
        districtName: string
      };
      ward: {
        id: number
        wardName: string
      };
      specificAddress: string
      isDefault: boolean
    }
  }[]
};

const UpdateProfileForm = (props: UpdateProfileFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();
  const userState = useUserStore(state => state.user);
  const setUserState = useUserStore(state => state.setUser)


  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      id: props.id,
      name: props.name,
      phone: props.phone,
      dob: props.dob,
      gender: props.gender,
    },
  });

  const handleSubmit = async (values: z.infer<typeof UpdateProfileSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      updateProfileAction(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
          setError(data?.error);
        } else {
          console.log(data)
          setUserState({id: data?.data?.id, name: data?.data?.name, image: data?.data?.image })
          toast.success(data?.success);
          setSuccess(data?.success);
        }
      })
    })
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col mt-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="Nhập tên của bạn" type="text" className="border-gray-700 w-full" />
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
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Nhập số điện thoại của bạn" type="text" className="border-gray-700 w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col w-5/12 mt-3">
                  <FormLabel>Ngày tháng năm sinh</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal", "border-gray-700 w-full",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value && field.value.toString() !== "Invalid Date" ? (
                            // field.value.toString()
                            format(field.value, "PPP")
                          ) : (
                            <span>Chọn ngày/tháng/năm</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    {}<PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        initialFocus mode="single"
                        onSelect={(e) => field.onChange(new Date(e))}
                        disabled={(date) =>
                          date > new Date()
                        }
                        selected={field.value ?? undefined} translate="vi" />

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
                <div className="w-full">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="border-gray-700 w-full">
                      <SelectTrigger>
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

          <FormError message={error} />
          <FormSuccess message={success} />

          <div className="flex justify-end items-end w-full mt-4">
            <Button type="reset" onClick={router.back} disabled={isPending} className="mr-4 h-full bg-gray-200 text-gray-500 font-bold shadow-md hover:shadow-lg  hover:bg-gray-200">
              Hủy
            </Button>
            <Button type="submit" disabled={isPending} className="h-full bg-crusta font-bold shadow-md hover:shadow-lg  hover:bg-crusta">
              Cập nhật
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex items-end ">
        <h2 className="text-lg font-semibold">Thông tin địa chỉ</h2>
        <div className="ml-5">
          {
            props.addresses.length < 3 && (
              <div>
                <CreateAddressDialog />
              </div>
            )
          }
        </div>
      </div>
      <div className="w-full">
        <AddressForm addresses={props.addresses} />
      </div>
    </div>
  );
};

export default UpdateProfileForm;
