"use client"
import { changePasswordAction } from "@/app/actions/profile/change-password";
import { FormError } from "@/components/custom/form-error";
import { FormSuccess } from "@/components/custom/form-success";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Eye, EyeOff } from 'lucide-react';
type ChangePasswordFormProps = {
  oldPassword?: string,
  newPassword?: string,
  reNewPassword?: string,
  id:string,
}

const ChangePasswordBox = (props: ChangePasswordFormProps) => {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isViewPassword, setIsViewPassword] = useState<boolean>(true)
    const form = useForm<z.infer<typeof ChangePasswordSchema>>({
      resolver: zodResolver(ChangePasswordSchema),
      defaultValues: {
        id: props.id,
        oldPassword: props.oldPassword,
        newPassword: props.newPassword,
        reNewPassword: props.reNewPassword,
      }
    });
  
   
  
    const handleSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
      setError("")
      setSuccess("")
  
      startTransition(() => {
        console.log(values)
        changePasswordAction(values).then((data) => {
          if(data?.error){
            toast.error(data?.error);
            setError(data?.error);
          }else if(data?.success){
            toast.success(data?.success);
            setSuccess(data?.success);
          }
        })
      })
    };
    return (
        <div className="w-full ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col mt-8">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-semibold">
                    Mật khẩu cũ
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                    <Input {...field} disabled={isPending} defaultValue={field.value} placeholder="Nhập mật khẩu cũ" type={isViewPassword ? "password" : "text"}className="h-14 border-gray-700 w-full" />
                    {
                          isViewPassword ? (
                            <EyeOff onClick={() => setIsViewPassword(false)} className='text-crusta absolute right-2 top-4 z-50 w-5' />
                          ) : (
                            <Eye onClick={() => setIsViewPassword(true)} className='text-crusta absolute right-2 top-4 z-50 w-5' />
                          )
                        }
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
  
              )}
            />
  
            <div className="grid grid-cols-2 gap-8 mt-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-lg font-semibold">
                      Mật khẩu mới
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                      <Input {...field} disabled={isPending} defaultValue={field.value} type={isViewPassword ? "password" : "text"} placeholder="Nhập mật khẩu mới" className="h-14 border-gray-700 w-full" />
                      {
                          isViewPassword ? (
                            <EyeOff onClick={() => setIsViewPassword(false)} className='text-crusta absolute right-2 top-4 z-50 w-5' />
                          ) : (
                            <Eye onClick={() => setIsViewPassword(true)} className='text-crusta absolute right-2 top-4 z-50 w-5' />
                          )
                        }
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
  
                )}
              />
              
            </div>
  
            <FormField
              control={form.control}
              name="reNewPassword"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel className="text-lg font-semibold">
                    Nhập lại mật khẩu mới
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                    <Input {...field} disabled={isPending} type={isViewPassword ? "password" : "text"} placeholder="Nhập lại mật khẩu mới" className="h-14 border-gray-700 w-full" />
                    {
                          isViewPassword ? (
                            <EyeOff onClick={() => setIsViewPassword(false)} className='text-crusta absolute right-2 top-4 z-50 w-5' />
                          ) : (
                            <Eye onClick={() => setIsViewPassword(true)} className='text-crusta absolute right-2 top-4 z-50 w-5' />
                          )
                        }
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
  
              )}
            />
  
  
            <FormError message={error} />
            <FormSuccess message={success} />
  
            <div className="flex justify-end items-end  w-full 4 my-4  ">
              <Button type="submit" disabled={isPending} className=" mr-4 h-full bg-gray-200 text-gray-500 font-bold  shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-crusta" >Hủy</Button>
  
              <Button type="submit" disabled={isPending} className=" h-full bg-crusta font-bold shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-crusta" >Cập nhật</Button>
            </div>
          </form>
        </Form>
  
      </div>
    );
  };
  
  
  export default ChangePasswordBox;
  
  
  