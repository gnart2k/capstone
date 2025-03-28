"use client";
import { Button } from "@/components/ui/button";
import TrapezoidText from "../../../components/trapezoidText";
import z from "zod";
import { ServiceSchema } from "@/schema";
import WhyUs from "../../../components/whyus";
import img_qa from "@/public/assets/service/qa_image.png";
import icon_qa from "@/public/assets/about-us/icon_qa.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  listQAService,
} from "@/initialData/about-us";
import BenefitQA from "@/app/(user)/about-us/component/BenefitQA";
import otherImage from "@/public/other_image.png"

export default function OtherService({
  props,
}: {
  props: z.infer<typeof ServiceSchema>;
}) {
  const router = useRouter();

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src =
      "https://cdn-icons-png.flaticon.com/512/6478/6478111.png";
    e.currentTarget.classList.add("error-image");
  };

  return (
    <div>
      <div className="bg-service-background lg:h-[650px] w-full flex justify-between items-center">
        <div className="text-crusta lg:pt-0 pt-24 lg:px-0 px-12 w-7/12 mr-4 lg:my-40 my-20 lg:ml-56 z-30">
          <h3 className="text-2xl font-semibold">Dịch Vụ</h3>
          <h3 className="text-[40px] font-semibold">{props.serviceName}</h3>
          <desc>{props.longDescription}</desc>
          <br />
          <Button className="mt-10 rounded-full text-white bg-crusta hover:shadow-md hover:shadow-gray-500  hover:bg-crusta">
            Đăng Ký Ngay
          </Button>
        </div>
        <div className=" hidden h-full w-6/12 xl:flex flex-col items-center justify-end z-20">
          <img className=" min-w-[370px] max-w-[370px] " src={otherImage.src} alt={props.serviceName} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-10 mb-8 text-center">
        <h2 className="font-semibold text-[38px]">
          Dịch vụ <span className="text-crusta">{props.serviceName}</span> có
          gì?
        </h2>
        <TrapezoidText text={`${props.shortDescription}`} />
      </div>
      <div className="mt-12 mb-20 flex flex-col  items-center ">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-[85%]"
        >
          <CarouselContent className="mx-4">
            {props.serviceItems.map((value, index) => {
              return (
                <CarouselItem key={index} className="lg:basis-1/4 h-full p-4">
                  <div className="mt-2 dark:bg-slate-700 rounded-2xl shadow-md pt-4 mx-3 border">
                    <div className="flex justify-center w-[100%]">
                      <img
                        alt="dichvu"
                        src={value.promotionImg}
                        className="rounded-2xl min-w-[260px] w-[90%] h-[260px] object-cover"
                        onError={handleImageError}
                      />
                    </div>
                    <div className="min-w-[270px] w-[100%] rounded-xl shadow-xl pt-3">
                      <div className="flex flex-col text-center justify-between">
                        <div className="font-bold text-xl row-span-2 max-h-20px overflow-hidden">
                          {value.title}
                        </div>
                        <Label className="text-base px-5 pt-4 pb-4 min-h-60 h-20 overflow-hidden">
                          {value.description.slice(0, 300)}
                        </Label>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="lg:top-[106%] lg:left-[45rem] text-crusta" />
          <CarouselNext className="lg:top-[106%] lg:right-[45rem] text-crusta" />
        </Carousel>
      </div>
      <div className="px-26">
        <WhyUs />
      </div>
      <div className="lg:px-40 md:px-20 px-10 flex lg:flex-row flex-col gap-8 pt-16 justify-center">
        <Image
          src={img_qa}
          alt="qa"
          height={img_qa.height * 0.24}
          width={img_qa.width * 0.24}
        />
        <div>
          <div className="flex gap-2 items-center mb-4">
            <Image src={icon_qa} alt="" width={30} height={40} />
            <Label className="text-base">Q&A</Label>
          </div>
          <div>
            <Label className="text-2xl font-bold ">
              Các Câu Hỏi Thường Gặp
            </Label>
            <div className="flex flex-col">
              {listQAService.map((value: any, index) => {
                return <BenefitQA key={index} data={value} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
