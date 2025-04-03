"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import bg_img from "@/public/assets/about-us/bg_img.png";
import section_1 from "@/public/assets/about-us/section_1.png";
import section_2 from "@/public/assets/about-us/section_2.png";
import section_3 from "@/public/assets/about-us/section_3.png";
import icon_label from "@/public/assets/about-us/icon_label.png";
import icon_label02 from "@/public/assets/about-us/icon_label02.svg";
import bg_section03 from "@/public/assets/about-us/bg_section03.jpg";
import icon_qa from "@/public/assets/about-us/icon_qa.svg";
import img_qa from "@/public/assets/about-us/img_qa.png";
import Image from "next/image";
import BenefitQA from "./BenefitQA";

import {
  listBenefit,
  listOverview,
  listQA,
  listStory,
} from "@/initialData/about-us";
import { useRouter } from "next/navigation";

const AboutUs = () => {
  const router = useRouter()
  return (
    <div>
      <div className="bg-[#FBF6F4] relative md:h-auto h-[420px]">
        <div className="absolute lg:left-32 md:left-16 left-8 lg:top-[30%] md:top-[20%] top-[10%]">
          <div className="flex flex-col gap-2 md:w-[500px] w-auto">
            <Label className="text-2xl text-[#FB7C3C]">Giới thiệu</Label>
            <Label className="text-4xl text-[#FB7C3C] ">
              Về chúng tôi
            </Label>
            <Label className="text-base font-lightly">
              HomeShine tự hào sở hữu đội ngũ nhân viên tận tâm và chuyên nghiệp, luôn
              nỗ lực mang đến không gian sống và làm việc sạch sẽ, thoải mái cho
              khách hàng. Chúng tôi cam kết cung cấp dịch vụ vệ sinh và dọn dẹp
              chất lượng cao, đáp ứng mọi nhu cầu của khách hàng.
            </Label>
            <Button onClick={() => router.push('/service')} className="w-[200px] font-bold rounded-full bg-[#FB7C3C] hover:bg-[#FB7C3C]">
              Trải nghiệm ngay
            </Button>
          </div>
        </div>
        <Image src={bg_img} alt="backgroud" className="md:block hidden" />
      </div>
      <div className="xl:py-16 xl:px-32 md:py-8 md:px-16 py-4 px-8">
        <div className="flex flex-col items-center gap-2">
          <Label className="text-3xl font-semibold text-[#FB7C3C]">
            Về chúng tôi
          </Label>
          <Label className="font-semibold">
            Chúng tôi luôn cung cấp dịch vụ với thái độ chuyên nghiệp, tận tâm
            và chu đáo.
          </Label>
        </div>
        <div className="mt-12 grid lg:grid-cols-2 grid-cols-1 gap-12">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={section_1}
              alt="img_1"
              width={section_1.width * 0.8}
              height={section_1.height * 0.8}
            />
            <div className="flex gap-2 lg:flex-nowrap flex-wrap justify-center">
              <Image
                src={section_2}
                alt="img_2"
                width={section_2.width * 0.8}
                height={section_2.height * 0.8}
              />
              <Image
                src={section_3}
                alt="img_3"
                width={section_3.width * 0.8}
                height={section_3.height * 0.8}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image src={icon_label} alt="icon_label" width={30} height={30} />
              <Label>Về chúng tôi</Label>
            </div>
            <Label className="font-bold text-2xl">
              Tổng quan <strong className="text-[#FB7C3C]">Về HomeShine</strong>
            </Label>
            <div className="flex flex-col gap-4">
              {listOverview.map((value, index) => {
                return (
                  <div key={index} className="flex gap-4">
                    <Image src={value.img} alt="icon01" className="xl:w-[73px] xl:h-[73px] md:w-[50px] md:h-[50px] w-[30px] h-[30px]" />
                    <div className="flex flex-col">
                      <Label className="font-bold text-xl">{value.title}</Label>
                      <Label className="text-base font-light">
                        {value.description}
                      </Label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="relative ">
        <Image src={bg_section03} alt="bg_section03" className="xl:h-auto md:h-[600px] h-[1000px]" />
        <div className="absolute md:flex flex-col lg:flex-row justify-between items-center h-[100%] top-0 lg:px-32 lg:py-6 md:px-12 px-8 gap-20  w-[100%]">
          <div className="flex flex-col gap-8 md:w-[400px]">
            <div className="flex gap-1 items-center">
              <Image src={icon_label02} alt="icon_label02" />
              <Label className="text-sm text-white font-extralight">
                Lợi Ích từ HomeShine
              </Label>
            </div>
            <Label className="text-white md:text-3xl text-xl">
              Các lợi ích Khách hàng sẽ được nhận khi sử dụng HomeShine
            </Label>
            <Button variant="link" onClick={() => router.push("/service")} className="text-white border w-[200px]">
              Tất Cả Các Dịch Vụ
            </Button>
          </div>
          <div className="grid xl:grid-cols-4 md:grid-cols-2 mt-4 sm:grid-cols-1 gap-6">
            {listBenefit.map((value, index) => {
              return (
                <div
                  key={index}
                  className="border border-white rounded-lg flex flex-col justify-center items-center px-5 gap-6 w-[160px]"
                >
                  <Image
                    src={value.icon}
                    alt=""
                    width={value.icon.width * 0.8}
                    height={value.icon.height * 0.8}
                  />
                  <Label className="text-white font-semibold text-lg text-center">
                    {value.title}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="lg:px-32 lg:py-16 md:px-16 md:py-8 px-8 py-4">
        <div className="flex flex-col gap-2 items-center">
          <Label className="text-4xl text-[#FA7436] text-center font-bold">
            Những mẩu chuyện &quot; thành công &quot; được chia sẻ
          </Label>
          <Label className="text-center text-base font-light w-[60%]">
            Một số trải nghiệm thực tế được các thành viên của HomeShine bày tỏ. Mỗi
            câu chuyện là một minh chứng cho sự cam kết của chúng tôi trong việc
            hỗ trợ và khích lệ mỗi thành viên của đại gia đình HomeShine đạt được
            thành công và phát triển trong sự nghiệp của mình.
          </Label>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 mt-6">
          {listStory.map((value, index) => {
            return (
              <div key={index} className="flex justify-center">
                <div className="shadow-xl rounded-3xl w-[370px]">
                  <Image
                    src={value.img}
                    alt="img01"
                    width={value.img.width * 0.8}
                    height={value.img.height * 0.8}
                    className="rounded-t-3xl"
                  />
                  <div className="flex flex-col p-6">
                    <Label className="text-2xl text-center text-[#FF8228]">
                      {value.title}
                    </Label>
                    <Label className="text-sm italic font-light pt-2 text-center">
                      {value.description}
                    </Label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lg:px-40 md:px-20 px-10 flex flex-wrap gap-8 pb-16">
        <Image
          src={img_qa}
          alt="qa"
          height={img_qa.height * 0.7}
          width={img_qa.width * 0.7}
        />
        <div>
          <div className="flex gap-2 items-center mb-4">
            <Image src={icon_qa} alt="" width={30} height={30} />
            <Label className="text-base">Q&A</Label>
          </div>
          <div>
            <Label className="text-2xl font-bold ">
              Các Câu Hỏi Thường Gặp
            </Label>
            <div className="flex flex-col">
              {listQA.map((value: any, index) => {
                return <BenefitQA key={index} data={value} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
