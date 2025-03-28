import prismadb from "@/lib/prisma";
import ServiceContainer, { ServiceContainerProps } from "./serviceContainer";

export default async function ServiceWrapper() {
  const service = await prismadb.service.findMany();
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold mt-8 mb-4">Có những loại dịch vụ gì?</h2>
      <p className="text-center w-4/12 text-lg">Chúng tôi cung cấp nhiều loại dịch vụ dọn dẹp để đáp ứng mọi nhu cầu của khách hàng, đảm bảo mang đến cho bạn một không gian sống sạch sẽ, gọn gàng và ngăn nắp nhất!</p>
      <div className="mt-8 grid lg:grid-cols-3 grid-cols-1 gap-12 xl:mx-32 lg:mx-24 md:mx-16">
        {service.map(item => (
          <div key={item.id} className="">
            <ServiceContainer imgUrl={item.promotionImg} title={item.serviceName} redirectUrl={`/service/${item.id}`} sortDesc={item.longDescription} />
          </div>
        ))}

      </div>

    </div>
  )
}
