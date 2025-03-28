"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import imgBanner2 from "@/public/assets/home/home-banner-2.png";
import imgBanner from "@/public/assets/home/home-banner.svg";

import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { listBenefit } from "@/initialData/home";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  serviceNames: string[]
  services: {
    name: string,
    id: string,
    description: string,
    image: string,
  }[]
}

export default function HomeContainer({ services, serviceNames }: Props) {
  const [index, setIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('');
  const [dotArray, setDotArray] = useState(Array.from({ length: 4 }, () => Array(4).fill(0)));
  const router = useRouter();

  useEffect(() => { })

  useEffect(() => {
    const updateIndex = () => {
      setFadeClass('animate-fade-in');
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % serviceNames.length);
        setFadeClass('animate-fade-out');
      }, 1000);
    };
    const intervalId = setInterval(updateIndex, 3000);
    return () => clearInterval(intervalId);
  }, [serviceNames.length]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/6478/6478111.png";
    e.currentTarget.classList.add('error-image');
  };

  return (
    <div>
      <div className="w-full">
        <div className="relative">
          <div className="bg-[#FEF2E9] lg:h-auto h-[300px] dark:bg-slate-200 flex items-center justify-around" style={{ zIndex: 20 }}>
            <div className="w-96 h-96 rounded-full bg-[#FFCD2A] dark:bg-slate-400 absolute top-[-130px] left-[-40px] z-0 lg:block hidden" />
            <div className="lg:ml-40 ml-10 md:ml-20">
              <div className="flex flex-col min-w-80 mb-20 z-10 relative">
                <span className="text-black text-3xl mb-2 font-semibold ">Hệ thống cung cấp các dịch vụ</span>
                <span className={cn("text-crusta dark:text-slate-500 text-3xl font-semibold", fadeClass)}>{serviceNames[index]}</span>
              </div>
              <div className="mt-6">
                <Link href="/service" className="font-semibold dark:bg-slate-600 bg-[#ff6b29] mt-12 text-white py-3 px-8 rounded-full hover:shadow-md hover:shadow-slate-500 transition-all duration-200">
                  Khám phá ngay
                </Link>
              </div>
            </div>
            <div className="absolute lg:flex items-center justify-center w-16 right-20 top-20 hidden">
              {dotArray.map((row, rowIndex) => (
                <div key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <div key={colIndex} className="w-5 h-5 bg-crusta dark:bg-slate-600 rounded-full mx-1 my-2" />
                  ))}
                </div>
              ))}
            </div>

            <div className="relative z-0 lg:block hidden">
              <img alt="image banner" src={imgBanner.src} className="" />
              <div className="w-96 h-48 rounded-t-full z-0 bg-[#3EB273] absolute bottom-[0px] right-[-100px]" style={{ zIndex: -10 }} />
            </div>
          </div>
          <div className="w-full h-16 bg-[#FF8228] dark:bg-slate-400 z-10" />
        </div>

        <div className="lg:px-32 px-16">
          <div className="mt-16">
            <div className="flex justify-center">
              <Label className="text-4xl font-bold dark:text-slate-200">
                Tất cả <strong className="text-[#FF8228] dark:text-slate-400">những dịch vụ</strong>{" "}
                của chúng tôi
              </Label>
            </div>
            <div className="flex justify-center mt-6">
              <Label className="text-center line-clamp-3 text-[#333333] text-lg dark:text-slate-200 w-100 leading-snug">
                Với đội ngũ nhân viên tận tâm và giàu kinh nghiệm, chúng tôi cam kết mang đến cho bạn không gian sạch sẽ và thoải mái nhất.
              </Label>
            </div>
          </div>
          <div className="mt-10 mb-20">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {services.map((value, index) => {
                  return (
                    <CarouselItem
                      key={index}
                      className=":md-1/2 xl:basis-1/4  h-full p-4"
                    >
                      <div className="mt-2 dark:bg-slate-700 min-w-[280px] rounded-2xl shadow-md pt-4 border">
                        <div className="flex justify-center w-[100%]">
                          <img
                            alt="dichvu"
                            src={value.image}
                            className="rounded-2xl min-w-[260px] w-[90%] h-[260px] object-cover"
                            onError={handleImageError}
                          />
                        </div>
                        <div className="w-full flex items-center justify-center shadow-xl ">
                          <div className="min-w-[270px] w-[90%] rounded-xl pt-3">
                            <div className="flex flex-col text-center justify-between">
                              <div className="font-bold text-xl row-span-2 max-h-20px overflow-hidden">
                                {value.name}
                              </div>
                              <Label className="text-base pt-4 min-h-40 h-20 overflow-hidden">
                                {value.description.slice(0, 250)}
                              </Label>
                              <Button variant="link" onClick={() => router.push(`/service/${value.id}`)} className="text-crusta dark:text-slate-400 mb-4">
                                Tìm hiểu thêm
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="xl:top-[106%] xl:left-[35rem]" />
              <CarouselNext className="xl:top-[106%] xl:right-[35rem]" />
            </Carousel>
          </div>
          <div className="mb-24">
            <div>
              <h2 className="font-bold mb-8 text-3xl dark:text-gray-200">
                An tâm với lựa chọn của bạn
              </h2>
              <Image src={imgBanner2} alt="banner-2" className="w-[100%]" />
            </div>
            <div className="mt-12 grid xl:grid-cols-4 gap-2 md:grid-cols-2 grid-cols-1">
              {listBenefit.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="h-24">
                      <Image src={value.img} alt={value.img + ""} />
                    </div>
                    <Label className="font-bold h-8 text-base">
                      {value.title}
                    </Label>
                    <Label className="font-normal w-60 leading-snug">
                      {value.content}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
