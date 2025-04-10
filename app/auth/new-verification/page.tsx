"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
} from "@/components/ui/form";
import { FormError } from "@/components/custom/form-error";
import { FormSuccess } from "@/components/custom/form-success";
import BeatLoader from "react-spinners/BeatLoader";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { newVerification } from "@/app/actions/users/new-verification";

const NewVerification = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing Token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    if (token) {
      onSubmit();
    }
  }, [token, onSubmit]);

  const [isPending, startTransition] = useTransition();

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

  return (
    <div className="w-full h-screen relative">
      <CustomSquare className="animate-bounce duration-5000 top-12 left-12 opacity-30" />
      <CustomSquare className="animate-bounce duration-6000 top-44 left-24" />
      <CustomSquare className="animate-bounce duration-6000 bottom-12 right-12 opacity-30" />
      <CustomSquare className="animate-bounce duration-7000 bottom-44 right-24" />
      <div className="w-7/12 h-screen absolute z-0" />
      <div className="w-5/12 bg-lightcrusta absolute h-screen right-0 z-0" />
      <div className="absolute flex left-0 right-0 top-0 bottom-0 ml-auto mr-auto mt-auto mb-auto bg-white z-10 h-[700px] w-9/12 border-crusta border rounded-3xl">
        <div className="form w-7/12 flex flex-col items-center justify-center">
          <div>
            <Image
              src={logoImg.src}
              width={200}
              height={loginImg.height}
              alt="Picture "
              className="object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold mt-4">Xác nhận Email</h3>
          <Form {...form}>
            <form className="w-full flex flex-col items-center mt-8">
              {!success && !error && <BeatLoader />}
              <FormSuccess message={success} />
              {!success && <FormError message={error} />}

              <Button
                size="sm"
                variant="link"
                asChild
                className="px-0 font-normal"
              >
                <Link href="/auth/signin">Quay lại đăng nhập</Link>
              </Button>

              <p className="text-sm ml-18 mt-6">
                By signing in, i agree to &nbsp;
                <a href="#" className="text-crusta">
                  Terms of Use &nbsp;
                </a>
                and &nbsp;
                <a href="#" className="text-crusta">
                  Privacy Policy
                </a>
              </p>
              <div className="flex w-6/12 h-14 my-4 items-center justify-between">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-9/12 h-full bg-crusta font-bold shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-crusta"
                >
                  Gửi mã xác thực{" "}
                </Button>
                <div
                  onClick={handleGoogleSignIn}
                  className="p-4 cursor-pointer w-2/12 rounded-lg shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500"
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
          className="mr-6"
          src={loginImg.src}
          width={loginImg.width}
          height={loginImg.height}
          alt="Picture "
        />
      </div>
    </div>
  );
};

export default NewVerification;
