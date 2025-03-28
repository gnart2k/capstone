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
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { deleteUserSchema, updateUserSchema } from "@/schema";
import React, { startTransition, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { deleteUserAction } from "@/app/actions/admin/delete-user";
import { useRouter } from 'next/navigation';

type DeleteUserFormProps = {
  id: string
}

  export default function DeleteUserForm(props: DeleteUserFormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();

  const form = useForm<z.infer<typeof deleteUserSchema>>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      id: props.id
    }
  });
  const uploadRef = useRef(null);

  function onSubmit(values: z.infer<typeof deleteUserSchema>) {
    setError("")
    setSuccess("")

    startTransition(() => {
      deleteUserAction(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }else{
          toast.success(data?.success);

          router.push('/admin-page/user-management');
        }
      })
    })
  }

  const [imageUrl, setImageUrl] = useState("")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-center mt-5">
        <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                    <FormItem style={{ display: 'none' }}>
                        <FormControl>
                            <Input disabled type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
        <div className="text-center">
          <Button className="bg-crusta hover:opacity-90 hover:bg-crusta" type="submit">Delete</Button>
        </div>
      </form>
    </Form>
  );
}


