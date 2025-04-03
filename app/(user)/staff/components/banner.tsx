"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Banner from "@/public/assets/staff/banner.svg"



export default function AllServiceBanner() {

  return (
    <div>

      <div className="bg-cover bg-service-background xl:h-[770px] lg:h-[670px] relative w-full flex justify-between">

        <div className="lg:w-6/12 xl:w-4/12 text-crusta p-20 lg:mt-16 mt-24 lg:ml-24 xl:ml-32 z-30">
          <h3 className="text-2xl font-semibold dark:text-slate-600">Đội ngũ</h3>
          <h3 className="text-[40px] font-semibold dark:text-slate-600">Nhân Viên của HomeShine</h3>
          <desc className="dark:text-slate-500">
            Đội ngũ nhân viên đầy nhiệt huyết và tận tâm của HomeShine - những người làm việc với sứ mệnh tạo ra không gian sống và làm việc sạch sẽ, thoải mái và an toàn cho mọi khách hàng. Với sự chuyên nghiệp, kỹ năng và tận tâm, đội ngũ nhân viên của chúng tôi cam kết mang lại dịch vụ vệ sinh và dọn dẹp tốt nhất. Chúng tôi tự hào về mỗi thành viên trong đội ngũ đều đóng góp vào sự thành công và phát triển không ngừng của HomeShine trong ngành công nghiệp dịch vụ vệ sinh.
          </desc>
          <br />
          <Button className="mt-10 dark:bg-slate-600 rounded-full text-white bg-crusta hover:shadow-md hover:shadow-gray-500  hover:bg-crusta">Đăng Ký Ngay</Button>
        </div>

        <div className="absolute bottom-0 right-0 z-20 lg:block hidden">
          <Image className="lg:w-[600px] xl:w-[900px]" src={Banner.src} alt="service banner image" height={Banner.height * 0.8} width={Banner.width * 0.8} />
        </div>

      </div>
      <div className="text-center mt-8">
        <h1 className="text-2xl font-semibold">
          Đội ngũ <span className="text-crusta">nhân viên</span> của chúng tôi
        </h1>
        <p>
          Bạn có thể tìm kiếm những người có thể hỗ trợ
          và thông tin chi tiết của họ
        </p>
      </div>

    </div>
  )
}


