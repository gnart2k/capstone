"use client";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import loginImg from "@/public/assets/authentication/images/loginImg.png";
import logoImg from "@/public/assets/images/logo_large.png";
import { Button } from "@/components/ui/button";
import googleImage from "@/public/assets/images/googleImg.png";
import { CustomSquare } from "@/components/custom/Shape";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema } from "@/schema";
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
import { forgotPasswordAction } from "@/app/actions/users/forgot-password";
import { FormSuccess } from "@/components/custom/form-success";
export default function ForgotPassword() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleGoogleSignIn = async () => {
    signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/home`,
    });
  };

  const handleSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      forgotPasswordAction(values).then((data) => {
        console.log(data);
        setError(data?.error);
        setSuccess(data?.success); //verifyEmail
      });
    });
  };
  return (
    <div className="w-full lg:h-screen lg:top-0 top-[250px] relative">
      <CustomSquare className="animate-bounce duration-5000 top-12 left-12 opacity-30 hidden lg:block" />
      <CustomSquare className="animate-bounce duration-6000 top-44 left-24 hidden lg:block" />
      <CustomSquare className="animate-bounce duration-6000 bottom-12 right-12 opacity-30 hidden lg:block" />
      <CustomSquare className="animate-bounce duration-7000 bottom-44 right-24 hidden lg:block" />
      <div className="w-7/12 lg:h-screen absolute z-0" />
      <div className="w-5/12 bg-lightcrusta absolute lg:h-screen right-0 z-0" />
      <div className="absolute flex left-0 right-0 top-0 bottom-0 ml-auto mr-auto mt-auto mb-auto bg-white z-10 lg:h-[700px] md:h-[470px]  h-[420px] lg:w-9/12 w-10/12 border-crusta border rounded-3xl">
        <div className="form xl:w-7/12 w-full flex flex-col items-center justify-center">
          <div>
            <Image
              src={logoImg.src}
              width={200}
              height={loginImg.height}
              alt="Picture "
              className="object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold mt-4">Quên mật khẩu</h3>
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
              <Button
                size="sm"
                variant="link"
                asChild
                className="px-0 font-normal"
              >
                <Link href="/auth/reset">Quay lại đăng nhập</Link>
              </Button>
              <FormError message={error} />
              <FormSuccess message={success} />
              <p className="text-sm ml-18 mt-6 px-6">
                By signing in, i agree to &nbsp;
                <a href="#" className="text-crusta">
                  Terms of Use &nbsp;
                </a>
                and &nbsp;
                <a href="#" className="text-crusta">
                  Privacy Policy
                </a>
              </p>
              <div className="flex lg:w-6/12 w-10/12 h-14 my-4 gap-2 items-center justify-between">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-9/12 h-full bg-crusta font-bold shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-crusta"
                >
                  Gửi mã xác thực{" "}
                </Button>
                <div
                  onClick={handleGoogleSignIn}
                  className="p-4 cursor-pointer min-w-[50px] max-w-[60px] w-2/12 rounded-lg shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500"
                >
                  <Image
                    className=""
                    src={googleImage.src}
                    width={googleImage.width}
                    height={googleImage.height}
                    alt="google auth"
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
        <Image
          className="mr-6 hidden xl:block"
          src={loginImg.src}
          width={loginImg.width}
          height={loginImg.height}
          alt="Picture "
        />
      </div>
    </div>
  );
}
