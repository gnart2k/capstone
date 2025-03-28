import CustomCard from "@/components/custom/custom-card";
import { whyUsData } from "@/initialData/service";

export default function WhyUs() {

  return (
    <div className="flex flex-col items-center lg:px-0 px-6 justify-center mt-8">
      <h1 className="font-semibold text-[38px] text-crusta">Tại sao bạn nên chọn dịch vụ của chúng tôi? </h1>
      <p className="lg:w-8/12 text-xl text-center mt-4">
        Trải nghiệm sự thuận tiện và linh hoạt khi đặt lịch. Bạn có thể đặt lịch bất cứ lúc nào và ở bất kỳ đâu chỉ trong vài phút. Không chỉ tiết kiệm thời gian mà còn giúp bạn dễ dàng quản lý không gian sống của mình một cách hiệu quả.
      </p>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-8 lg:mx-36 md:mx-18 mx-9">
        {whyUsData.map(e => (
          <div key={e.title} className="">
            <CustomCard title={e.title} desc={e.desc} img={e.img} />
          </div>

        ))}

      </div>



    </div>
  )
}
