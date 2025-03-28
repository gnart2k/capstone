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
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState, useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { feedbackOnRequestAction } from "@/app/actions/feedback";
import toast from "react-hot-toast";
import { feedbackSchema } from "@/schema";
import useSWR from "swr";
import CustomButton from "@/components/custom/button/CustomButton";

export default function ReviewRequest() {
  const session = useSession();
  const [starArray, setStarArray] = useState<number[]>([]);
  const starFull = [1, 2, 3, 4, 5];
  const [rate, setRate] = useState<number>(0);
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [feedbackText, setFeedbackText] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const response = fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${params.requestID}`
      );
      const responseJson = response?.then((data) => data.json());
      responseJson.then((data) => setFeedbackText(data?.text));
      responseJson.then((data) => setRate(data?.rate));
      console.log(await responseJson)
      console.log(feedbackText)
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      feedback: feedbackText,
      rate: rate + "",
      userId: session?.data?.user?.id,
      requestId: params.requestID + "",
    },
  });

  useEffect(() => {
    if (rate > 0) {
      const array = new Array(rate).fill(1);
      setStarArray(array);
    }

  }, [rate, feedbackText]);

  async function onSubmit(values: z.infer<typeof feedbackSchema>) {
    startTransition(async () => {
      values.feedback = feedbackText;
      values.rate = rate + ""
      console.log(values)
      const feedbackResult = await feedbackOnRequestAction(values);
      if (feedbackResult.success) {
        toast.success(feedbackResult.message);
      } else {
        toast.error(feedbackResult.message);
      }
    });
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center justify-between"
        >
          <FormField
            control={form.control}
            name="rate"
            defaultValue={rate + ""}
            render={({ field }) => (
              <FormItem className="space-y-3 mb-4">
                <FormControl>
                  <RadioGroup
                    onValueChange={(e) => {
                      field.onChange(e);
                      setRate(+e);
                    }}
                    className="flex"
                  >
                    <div className="relative">
                      <div className="flex items-start absolute left-[-60px] bottom-[-20px] text-crusta z-20">
                        {starFull.map((e, i) => {
                          return (
                            <FormItem
                              key={i}
                              className="cursor-pointer text-crusta "
                            >
                              <FormLabel className="">
                                <div className="">
                                  <Star />
                                </div>
                                <FormControl>
                                  <RadioGroupItem
                                    value={e + ""}
                                    className="hidden"
                                  />
                                </FormControl>
                              </FormLabel>
                            </FormItem>
                          );
                        })}
                      </div>
                      <div className="flex items-start absolute bottom-[-20px] left-[-60px]">
                        {starArray.map((star, index) => (
                          <div key={index} className="flex text-crusta">
                            <StarIcon className="w-6" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="feedback"
            defaultValue={feedbackText + ""}
            render={({ field }) => (
              <FormItem className="w-full mt-10 mb-4">
                <FormControl>
                  <Textarea
                    placeholder="Ý kiến của bạn về dịch vụ của chúng tôi"
                    {...field}
                    cols={40}
                    className="w-full h-80 p-4 border-crusta"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}

                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CustomButton
            type="submit"
            disabled={isPending}
            className="bg-crusta rounded-3xl"
            text="
            Đánh giá
            "
            variant="shine"
          />
        </form>
      </Form>
    </div>
  );
}
