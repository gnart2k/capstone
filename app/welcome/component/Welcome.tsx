"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import bg_01 from "@/public/assets/welcome/bg_01.png";
import bg_02 from "@/public/assets/welcome/bg_02.png";
import blob_top from "@/public/assets/welcome/blob-top.png";
import blob_bottom from "@/public/assets/welcome/blob-bottom.png";
import img_01 from "@/public/assets/welcome/img_01.png";
import img_02 from "@/public/assets/welcome/img_02.png";
import img_03 from "@/public/assets/welcome/img_03.png";
import icon_cmt from "@/public/assets/welcome/icon_cmt.png";
import star from "@/public/assets/images/star.png";
import Image from "next/image";
import { listBenefit } from "@/initialData/home";
import { listFeedback } from "@/initialData/welcome";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const target = useRef(null);
  const handleClick = () => {
    target.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [listService, setListService] = useState([]);

  useEffect(() => {

    const fetchService = async () => {
      const data = await fetch("/api/service/get-service-welcome");
      const dataJson = await data?.json();
      setListService(dataJson)
    }

    fetchService()
  }, [])
  const router = useRouter();
  return (
    <div className="mt-[100px]">
      <div className="grid grid-cols-2  h-[550px] lg:px-32 md:px-16 px-8">
        <div className="flex flex-col gap-3 min-w-[330px]">
          <Label className="font-bold lg:text-4xl md:text-3xl text-xl">Dịch Vụ Dọn Dẹp</Label>
          <Label className="font-black text-[#FF6A28] lg:text-8xl md:text-6xl text-3xl">
            HomeShine
          </Label>
          <Label className="text-xl mt-4">
            Với đội ngũ nhân viên tận tâm và giàu kinh nghiệm, chúng tôi cam kết
            mang đến cho bạn không gian sạch sẽ và thoải mái nhất.
          </Label>
          <div className="flex gap-4">
            <Button className="w-[150px] bg-[#FA7436] hover:bg-[#FA7436] font-semibold rounded-full" onClick={() => router.push("/auth-signin")}>
              Tìm hiểu thêm
            </Button>
            <Button
              className="w-[150px] border-[#FA7436] text-[#FA7436] hover:text-[#FA7436] font-semibold rounded-full"
              variant="outline"
              color="#FA7436"
            >
              Đăng ký
            </Button>
          </div>
        </div>
        <div className="lg:flex justify-end hidden">
          <div className="absolute z-10">
            <Image alt="bg_01" src={bg_01} width={504} />
          </div>
          <div className="absolute">
            <Image alt="bg_02" src={bg_02} width={540} />
          </div>
        </div>
      </div>
      <div className="bg-[#F9F9F9] pt-[90px] pb-28 relative">
        <Image
          src={blob_top}
          alt="top"
          className="absolute right-0 top-0"
          width={300}
        />
        <Image
          src={blob_bottom}
          alt="bottom"
          className="absolute bottom-0"
          width={400}
        />
        <div className="lg:px-32 md:px-16 px-12" ref={target}>
          <div className="flex flex-col gap-4">
            <Label className="font-bold lg:text-4xl md:text-3xl text-2xl min-w-[50%] max-w-[60%] z-10">
              Chúng tôi có thể cung cấp cho bạn những{" "}
              <strong className="text-[#FA7436]">dịch vụ</strong> nào ?
            </Label>
            <Label className="md:text-xl text-base z-10 lg:w-[700px]">
              Chúng tôi cung cấp nhiều loại dịch vụ dọn dẹp để đáp ứng mọi nhu
              cầu của khách hàng, đảm bảo mang đến cho bạn một không gian sống
              sạch sẽ, gọn gàng và ngăn nắp nhất!
            </Label>
          </div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full mt-[80px]"
          >
            <CarouselContent className="lg:h-[460px] ">
              {listService.map((value: any, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 xl:basis-1/4"
                  >
                    <div className="relative mt-24 shadow-sm">
                      <div className="flex justify-center w-[100%] z-10 absolute top-[-100px]">
                        <img
                          alt="dichvu"
                          src={value.img}
                          className=" w-[300px] h-[200px] object-cover rounded-t-2xl mt-1 shadow-sm"
                        />
                      </div>
                      <div className="bg-white min-w-[270px] relative w-[100%] pb-4 lg:min-h-[364px] min-h-[400px] rounded-xl pt-[30%]">
                        <div className="flex flex-col text-center px-4 justify-between items-center">
                          <div className="font-bold text-xl row-span-2 mt-4">
                            {value.title}
                          </div>
                          <Label className="text-base pt-3 min-h-36">
                            {value.content}
                          </Label>
                          <Button
                            variant="outline"
                            className="text-crusta border-crusta hover:text-crusta absolute bottom-4 w-[90%]"
                          >
                            Tìm hiểu thêm
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="lg:top-[106%] lg:left-[35rem]" />
            <CarouselNext className="lg:top-[106%] lg:right-[35rem]" />
          </Carousel>
        </div>
      </div>
      <div className="pt-[90px] lg:px-32 md:px-16 px-8 pb-28">
        <div className="grid lg:grid-cols-[auto_500px] grid-cols-auto gap-16">
          <div className="flex gap-4 flex-wrap">
            <Image
              src={img_01}
              alt="img01"
              className="lg:relative lg:top-16 shadow-lg rounded-3xl"
              width={img_01.width * 0.8}
              height={img_01.height * 0.8}
            />
            <Image
              src={img_02}
              alt="img02"
              className="shadow-lg rounded-3xl"
              width={img_02.width * 0.8}
              height={img_02.height * 0.8}
            />
            <Image
              src={img_03}
              alt="img03"
              className="lg:relative lg:top-8  shadow-lg rounded-3xl"
              width={img_02.width * 0.8}
              height={img_02.height * 0.8}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-4xl font-bold ">
              Tại sao bạn nên chọn dịch vụ của chúng tôi?
            </Label>
            <Label className="text-xl">
              Trải nghiệm sự thuận tiện và linh hoạt khi đặt lịch. Bạn có thể
              đặt lịch bất cứ lúc nào và ở bất kỳ đâu chỉ trong vài phút. Không
              chỉ tiết kiệm thời gian mà còn giúp bạn dễ dàng quản lý không gian
              sống của mình một cách hiệu quả.
            </Label>
            <Button className="rounded-full bg-[#FA7436] hover:bg-[#FA7436] font-bold">
              Đặt lịch ngay
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:px-32 md:px-16 px-8 pb-16">
        <Label className="text-4xl font-bold flex justify-center">
          An tâm với lựa chọn của bạn
        </Label>
        <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {listBenefit.map((value, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center pt-4 pb-4 border shadow-md"
              >
                <div className="h-24">
                  <Image src={value.img} alt={value.img + ""} />
                </div>
                <Label className="font-bold h-8 text-base">{value.title}</Label>
                <Label className="font-normal w-60 leading-snug">
                  {value.content}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lg:px-32 md:px-16 px-12 py-12 bg-[#ECF4FF]">
        <Label className="text-4xl font-bold">Feedback của khách hàng</Label>
        <div className="mt-6">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {listFeedback.map((value: any, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/4"
                  >
                    <div className="relative bg-white rounded-lg p-4">
                      <Image
                        src={icon_cmt}
                        alt="icon_cmt"
                        width={icon_cmt.width * 0.6}
                        height={icon_cmt.height * 0.6}
                      />
                      <div className="flex gap-3 py-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Image src={star} alt={`star-${index}`} key={index} width={25} height={25} />
                        ))}
                      </div>

                      <div className="min-h-[120px]">
                        <Label>
                          {value.content}
                        </Label>
                      </div>
                      <div className="flex gap-2 items-center mt-4">
                        <Image
                          src={value.userImg}
                          alt="avatar"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        <Label className="font-semibold">{value.userName}</Label>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="lg:top-[-30px] lg:left-[93%]" />
            <CarouselNext className="lg:top-[-30px] lg:right-0" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
