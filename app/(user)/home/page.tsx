import prismadb from "@/lib/prisma";
import HomeContainer from "./component/HomeContainer";

export default async function Home() {
  const ServiceResponse = await prismadb.service.findMany({
    select: {
      id: true,
      serviceName: true,
      promotionImg: true,
      shortDescription: true,
      longDescription: true
    }
  })
  const serviceNames = ServiceResponse.map(element => element.serviceName)

  const services = ServiceResponse.map(element => ({ name: element.serviceName, id: element.id, description: element.longDescription, image: element.promotionImg }))
  return (
    <HomeContainer serviceNames={serviceNames} services={services} />
  );
};

