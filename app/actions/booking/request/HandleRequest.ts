import prismadb from "@/lib/prisma";
import { BookingFormSchema } from "@/schema";
import { z } from "zod";
import { BookingResponseType } from "..";

type Props = {
  values: z.infer<typeof BookingFormSchema>,
  mapId: string,
  hasMap: boolean,
  addressId: string
}
export async function handleRequest({ values, mapId, addressId, hasMap }: Props): Promise<BookingResponseType> {
  try {

    const validData = BookingFormSchema.safeParse(values).data
    const request = hasMap ? await prismadb.request.create({
      data: {
        date: validData.date,
        time: validData.time,
        price: parseFloat(validData.price),
        status: "pending",
        paymentMethod: validData.paymentMethod,
        phone: validData.phoneNumber,
        map: {
          connect: {
            id: mapId
          }
        },
        deposit: +validData.deposit,
        user: {
          connect: {
            id: validData.userId
          }
        },
        type: validData.bookingOption,
        address: {
          connect: {
            id: addressId
          }
        },
        service: {
          connect: {
            serviceName: validData.serviceName
          }
        },
        serviceCombo: {
          connect: {
            id: validData.serviceCombo
          }
        },
      },
    }) : await prismadb.request.create({
      data: {
        date: validData.date,
        time: validData.time,
        paymentMethod: validData.paymentMethod,
        price: parseFloat(validData.price),
        status: "pending",
        phone: validData.phoneNumber,

        user: {
          connect: {
            id: validData.userId
          }
        },
        type: validData.bookingOption,
        address: {
          connect: {
            id: validData.address.id ? validData.address.id : addressId
          }
        },
        service: {
          connect: {
            serviceName: validData.serviceName
          }
        },
        serviceCombo: {
          connect: {
            id: validData.serviceCombo
          }
        },
      },
    });
    return { data: request, isSuccess: true, message: "Đặt lịch thành công" }
  } catch (error) {
    console.log(error)
    return { data: null, isSuccess: false, message: "Có lỗi xảy ra, vui lòng thử lại" }
  }

}
