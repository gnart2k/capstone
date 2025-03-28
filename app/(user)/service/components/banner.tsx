"use client"
import { AvatarBorder, CustomCircle } from "@/components/custom/Shape";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ServiceBannerImg from "@/public/assets/images/service-banner.png"
import { useRouter } from "next/navigation";


export default function Banner() {
  const router = useRouter();

  return (
    <div className="bg-torange h-[703px] w-full flex justify-between">
      <CustomCircle className="top-40 w-60 h-60 animate-scale-up" />
      <CustomCircle className="bottom-80 right-40 animate-scale-up" />
      <AvatarBorder className="top-40 right-60 w-80 " />
      <div className="absolute top-40 right-60 z-20">
        <Image src={ServiceBannerImg.src} alt="service banner image" height={ServiceBannerImg.height} width={ServiceBannerImg.width} />
      </div>

      <div className="w-4/12 text-white p-20 my-20 ml-72 z-50">
        <h3 className="text-2xl font-semibold">Dịch Vụ</h3>
        <h3 className="text-[40px] font-semibold">Tổng Vệ Sinh</h3>
        <desc>
          Dịch vụ tổng vệ sinh của chúng tôi mang đến giải pháp làm sạch toàn diện cho không gian sống và làm việc của bạn. Từ quét dọn, lau chùi đến vệ sinh các khu vực khó tiếp cận, chúng tôi đảm bảo không gian của bạn sẽ sạch bóng từ trong ra ngoài. Đặt lịch ngay để tận hưởng môi trường sạch sẽ, thoải mái và an lành!
        </desc>
        <br />
        <Button onClick={() => router.push("/booking/")} className="mt-10 rounded-full text-crusta bg-white hover:shadow-md hover:shadow-gray-500  hover:bg-white">Đăng Ký Ngay</Button>

      </div>


    </div>

  )
}
