"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import loginImg from "@/public/assets/authentication/images/loginImg.png";
import logoImg from "@/public/assets/images/logo_large.png";
import { Button } from "@/components/ui/button";
import googleImage from "@/public/assets/images/googleImg.png";
import { CustomSquare } from "@/components/custom/Shape";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { signInAction } from "@/app/actions/users/sign-in";
import { FormSuccess } from "@/components/custom/form-success";
import { Eye, EyeOff } from "lucide-react";
const SignIn = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isViewPassword, setIsViewPassword] = useState<boolean>(true);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleSignIn = async () => {
    signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/home`,
    });
  };

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signInAction(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success); //verifyEmail
      });
    });
  };
  return (
    <div className="w-full h-screen relative">
      <CustomSquare className="animate-bounce duration-5000 top-12 left-12 opacity-30" />
      <CustomSquare className="animate-bounce duration-6000 top-44 left-24" />
      <CustomSquare className="animate-bounce duration-6000 bottom-12 right-12 opacity-30" />
      <CustomSquare className="animate-bounce duration-7000 bottom-44 right-24" />
      <div className="w-7/12 h-screen absolute z-0" />
      <div className="w-5/12 bg-lightcrusta absolute h-screen right-0 z-0" />
      <div className="absolute flex left-0 right-0 top-0 bottom-0 ml-auto mr-auto mt-auto mb-auto bg-white z-10 h-[700px] lg:w-9/12 border-crusta border rounded-3xl">
        <div className="form lg:w-7/12 w-full flex flex-col items-center justify-center">
          <div>
            <Image
              src={logoImg.src}
              width={200}
              height={loginImg.height}
              alt="Picture "
              className="object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold mt-4">Đăng nhập</h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full flex flex-col items-center mt-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="lg:w-7/12 w-10/12">
                    <FormLabel className="text-lg font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Nhập email của bạn"
                        type="email"
                        className="h-14 border-gray-700 w-full"
                      />
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
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Nhập mật khẩu của bạn"
                          type={isViewPassword ? "password" : "text"}
                          className="h-14 border-gray-700 w-full "
                        />
                        {isViewPassword ? (
                          <EyeOff
                            onClick={() => setIsViewPassword(false)}
                            className="text-crusta absolute right-2 top-4 z-50 w-5"
                          />
                        ) : (
                          <Eye
                            onClick={() => setIsViewPassword(true)}
                            className="text-crusta absolute right-2 top-4 z-50 w-5"
                          />
                        )}
                      </div>
                    </FormControl>

                    <Button
                      size="sm"
                      variant="link"
                      asChild
                      className="px-0 font-normal hover:text-blue-600"
                    >
                      <Link href="/auth/forgot-password">Quên mật khẩu?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={error} />
              <FormSuccess message={success} />
              <p className="text-sm ml-18 mt-4 mb-4 text-center">
                Khi bạn ấn đăng nhập, đồng nghĩa với việc bạn đồng ý với &nbsp;
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
              <div className="flex lg:w-7/12 w-10/12 h-14 items-center justify-center">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-10/12 h-full bg-crusta font-bold shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-crusta"
                >
                  Đăng nhập
                </Button>
                <div
                  onClick={handleGoogleSignIn}
                  className="p-4 cursor-pointer w-[60px] h-[60px] ml-4 rounded-lg shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500"
                >
                  <Image
                    className="min-w-[30px] min-h-[30px]"
                    src={googleImage.src}
                    width={20}
                    height={20}
                    alt="google auth"
                  />
                </div>
              </div>
              <p className="mt-4">
                Chưa có tài khoản? &nbsp;
                <a href="/auth/signup" className="text-crusta ">
                  Tạo tài khoản
                </a>
              </p>
            </form>
          </Form>
        </div>
        <Image
          className="lg:block hidden mr-6"
          src={loginImg.src}
          width={loginImg.width}
          height={loginImg.height}
          alt="Picture "
        />
      </div>
    </div>
  );
};

export default SignIn;
