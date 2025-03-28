import prismadb from "@/lib/prisma";


export default async function PaymentSuccess() {
  const data = await prismadb.request.findFirst({
    orderBy: {
      id: 'desc'
    }
  });

  await prismadb.request.update({
    where: {
      id: data.id
    },
    data: {
      status: "paid"
    }
  })
  console.log(data)

  return (
    <div>

    </div>
  )
}

