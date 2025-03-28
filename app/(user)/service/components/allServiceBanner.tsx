"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ServiceBannerImg from "@/public/assets/service/freepik-export-20240520072118fWSb.png"
import { useRouter } from "next/navigation";



export default function AllServiceBanner() {

  const router = useRouter();

  return (
    <div className=" bg-cover bg-service-background xl:h-[740px] lg:h-[650px] relative w-full flex justify-between">
      <div className="lg:w-6/12 xl:w-4/12 text-crusta p-20 mt-32 lg:ml-24 xl:ml-32 z-30">
        <h3 className="text-2xl font-semibold">Tất cả</h3>
        <h3 className="text-[40px] xl:text-[32px] font-semibold">Các dịch vụ</h3>
        <desc>
          Chúng tôi tự hào mang đến giải pháp toàn diện cho mọi nhu cầu vệ sinh, từ nhà ở, văn phòng cho đến các công trình xây dựng và khu công nghiệp. Với đội ngũ nhân viên tận tâm và giàu kinh nghiệm, chúng tôi cam kết mang lại không gian sạch sẽ, thoáng mát và an toàn cho bạn. Đặt lịch trực tuyến ngay hôm nay để trải nghiệm dịch vụ chất lượng và tận hưởng sự tiện lợi vượt trội mà chúng tôi cung cấp!
        </desc>
        <br />
        <Button onClick={() => { router.push("/booking") }} className="mt-10 rounded-full text-white bg-crusta dark:bg-slate-500 hover:shadow-md hover:shadow-gray-500  hover:bg-crusta">Đăng Ký Ngay</Button>
      </div>

      <div className="absolute bottom-0 right-0 z-20 lg:block hidden ">
        <Image className="xl:w-[900px] w-[700px]" src={ServiceBannerImg.src} alt="service banner image" height={ServiceBannerImg.height} width={ServiceBannerImg.width} />
      </div>

    </div>

  )
}

