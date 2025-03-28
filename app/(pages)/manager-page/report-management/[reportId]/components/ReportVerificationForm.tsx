"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { startTransition, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateReportStatusSchema } from "@/schema";
import toast from "react-hot-toast";
import { CircleCheck, CircleX } from "lucide-react";
import { updateReportStatusAction } from "@/app/actions/manager/update-report";
import { AlertModal } from "@/components/custom/modals/AlertModal";


type UpdateReportStatusFormProps = {
  id: string
}

export default function UpdateReportStatusForm(props: UpdateReportStatusFormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | undefined>();

  const form = useForm<z.infer<typeof updateReportStatusSchema>>({
    resolver: zodResolver(updateReportStatusSchema),
    defaultValues: {
      id: props.id
    }
  });


  function onSubmit(values: z.infer<typeof updateReportStatusSchema>) {
    setError("")
    setSuccess("")
    setLoading(true);

    startTransition(() => {
      updateReportStatusAction(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success(data?.success);
          router.push('/manager-page/report-management');
        }
      }).finally(() => {
        setLoading(false);
        setOpen(false);
      })
    })
  }

  function handleReject() {
    setStatus('false');
    setOpen(true);
  }

  function handleAccept() {
    setStatus('true');
    setOpen(true);
  }

  const confirmAction = () => {
    form.setValue('status', status);
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem style={{ display: 'none' }}>
              <FormControl>
                <Input readOnly type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

        <FormField
          control={form.control}
          name="status"
          render={() => (
            <FormItem style={{ display: 'none' }}>
              <FormControl>
                <Input readOnly type="text" value='true' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

        <Button
          className="bg-green-500 mt-4 mr-2 hover:bg-green-600 hover:shadow-md"
          type="button"
          onClick={handleAccept}>
          <CircleCheck className="mr-2" /> Đồng ý
        </Button>

        <Button
          variant="outline"
          className="bg-red-500 hover:text-white text-white mt-4 hover:bg-red-600 hover:shadow-md"
          type="button"
          onClick={handleReject}>
          <CircleX className="mr-2" /> Từ chối
        </Button>
      </form>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={confirmAction}
        loading={loading}
      />
    </Form>

  );
}
