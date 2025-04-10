"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import loginImg from "@/public/assets/authentication/images/loginImg.png"
import logoImg from "@/public/assets/images/logo_large.png"
import { Button } from "@/components/ui/button";
import { CustomSquare } from "@/components/custom/Shape";
import { RegisterSchema } from "@/schema";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormError } from "@/components/custom/form-error";
import { FormSuccess } from "@/components/custom/form-success";
import { Input } from "@/components/ui/input";
import googleImage from "@/public/assets/images/googleImg.png"
import { signUpAction } from "@/app/actions/users/sign-up";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";




const SignUp = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isViewPassword, setIsViewPassword] = useState<boolean>(true)
  const [isAcceptTerm, setAcceptTerm] = useState<boolean>(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      comfirmPassword: ""
    }
  });

  const handleGoogleSignIn = async () => {
  };

  const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    console.log(isAcceptTerm)
    if (!isAcceptTerm) {
      setError("Hãy đồng ý điều khoản của chúng tôi trước khi đăng ký")
      return
    }
    setError("")
    setSuccess("")

    startTransition(() => {
      signUpAction(values).then((data) => {
        setError(data.error);
        setSuccess(data.success)
      })

    })
  };
  return (
    <div className="w-full h-screen relative">
      <CustomSquare className="animate-bounce duration-5000 top-12 left-12 opacity-30" />
      <CustomSquare className="animate-bounce duration-6000 top-44 left-24" />
      <CustomSquare className="animate-bounce duration-6000 bottom-12 right-12 opacity-30" />
      <CustomSquare className="animate-bounce duration-7000 bottom-44 right-24" />
      <div className="w-7/12h-screen absolute z-0" />
      <div className="w-5/12  bg-lightcrusta absolute h-screen right-0 z-0" />
      <div className="absolute flex left-0 right-0 top-0 bottom-0 ml-auto mr-auto mt-auto mb-auto bg-white z-10 h-[700px] w-9/12 border-crusta border rounded-3xl">
        <div className="form lg:w-7/12 w-full flex flex-col items-center justify-center">
          <div>
            <Image src={logoImg.src} width={200} height={loginImg.height} alt="Picture " className="object-contain" />
          </div>
          <h3 className="text-2xl font-bold mt-4">Đăng ký</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col items-center mt-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="lg:w-7/12 w-10/12">
                    <FormLabel className="text-lg font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="Nhập email của bạn" type="email" className="h-14 border-gray-700 w-full" />
                    </FormControl>
                    <FormMessage />


                  </FormItem>

                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="lg:w-7/12 w-10/12 mt-4">
                    <FormLabel className="text-lg font-semibold">
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} disabled={isPending} placeholder="Nhập mật khẩu của bạn" type={isViewPassword ? "password" : "text"} className="h-14 border-gray-700 w-full" />
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
              <FormField
                control={form.control}
                name="comfirmPassword"
                render={({ field }) => (
                  <FormItem className="lg:w-7/12 w-10/12 mt-4">
                    <FormLabel className="text-lg font-semibold">
                      Nhập lại mật khẩu
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} disabled={isPending} placeholder="Nhập lại mật khẩu của bạn" type={isViewPassword ? "password" : "text"} className="h-14 border-gray-700 w-full" />
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

              <div className="flex items-center text-center space-x-2">
                <input type="checkbox" className="w-4 h-4 checked:bg-blue-500" id="terms" onClick={() => setAcceptTerm((prev) => !prev)} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  aria-required
                >
                  <p className="mt-4">
                    Khi bạn đăng ký tài khoản, đồng nghĩa với việc bạn đồng ý với &nbsp;
                    <br />
                    <a href="/license/term" className="text-crusta">
                      Điều Khoản &nbsp;
                    </a>
                    và &nbsp;
                    <a href="/license/policy" className="text-crusta">
                      Chính Sách &nbsp;
                    </a>
                    của chúng tôi.
                  </p>
                </label>
              </div>
              <div className="flex lg:w-8/12 w-10/12 h-14 my-4 items-center justify-center">
                <Button type="submit" disabled={isPending} className="w-9/12 h-full bg-crusta mr-4 font-bold shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-crusta" >Đăng ký</Button>
                <div onClick={handleGoogleSignIn} className="p-4 cursor-pointer  rounded-lg shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500">
                  <Image className="" src={googleImage.src} width={30} height={30} alt="google auth" />
                </div>
              </div>

              <p>Đã có tài khoản? &nbsp;<a href="/auth/signin" className="text-crusta ">Đăng nhập</a></p>
            </form>
          </Form>

        </div>
        <Image className="mr-6 lg:block hidden" src={loginImg.src} width={loginImg.width} height={loginImg.height} alt="Picture " />
      </div>

    </div>
  );
};

export default SignUp;
