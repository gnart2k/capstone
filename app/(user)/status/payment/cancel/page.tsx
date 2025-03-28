import prismadb from "@/lib/prisma"

export default async function PaymentCancel() {
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
      status: "canceled"
    }
  })
  console.log(data)

  return (
    <div>

    </div>
  )
}
