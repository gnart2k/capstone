import { CANCEL_URI, PAYMENT_URI, SUCCESS_URI } from "@/app/lib/const"
import { generateSignature, GenerateSignatureProps } from "@/app/lib/generator"
import { BookingFormSchema } from "@/schema"
import { z } from "zod"
import { ZaloPay } from "./zalopay"
import prismadb from "@/lib/prisma"
import { BookingResponseType } from "."
import { handlePayOs } from "./payos"

type Props = {
  values: z.infer<typeof BookingFormSchema>,
  requestId: string,
  userId: string
  paymentMethod: string,
}
export async function handlePayment({ values, requestId, userId, paymentMethod }: Props): Promise<BookingResponseType> {
  const validData = BookingFormSchema.safeParse(values).data
  // const validData = {
  //   id: 68,
  //   serviceId: 'c0f0e33e-2863-11ef-8419-0242ac110002',
  //   serviceName: 'c0f0e33e-2863-11ef-8419-0242ac110002',
  //   serviceComboId: 'c8948f1c-2863-11ef-8419-0242ac110002',
  //   date: new Date("2024-08-22T17:00:00.000Z"),
  //   time: '08:05',
  //   price: 4500,
  //   deposit: 500,
  //   staffNum: 2,
  //   note: "",
  //   status: 'pending',
  //   mapAddressId: 'clzdwnuk60000snaml7hlk5zm',
  //   addressId: 'clxnbtvan000081via04ic6bd',
  //   type: '1',
  //   paymentLink: "",
  //   createdAt: new Date("2024-08-03T09:52:18.374Z"),
  //   phone: '021321313',
  //   transactionId: "",
  //   userId: '669e5197-cf36-489d-900a-bf8cf0c5c951'
  // }
  console.log(values)

  if (paymentMethod == 'payos') {
    const billProps: GenerateSignatureProps = {
      orderCode: requestId,
      amount: validData.price + "",
      description: `dich vu ${validData.serviceName}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_API_URL}/profile/booking-history`,
      returnUrl: `${process.env.NEXT_PUBLIC_API_URL}/profile/booking-history`,
    }
    console.log(billProps)

    const paymentResponse = await handlePayOs({ props: billProps })
    try {
      if (!paymentResponse.isSuccess) {
        return ({ data: null, isSuccess: false, message: "Payos hiện đang dừng họat động, vui lòng chọn phương thức thanh toán khác" })

      }
      if (paymentResponse.isSuccess) {
        const updatedRequest = await prismadb.request.update({
          where: {
            id: +requestId
          }, data: {
            paymentLink: paymentResponse?.data?.checkoutUrl + "",
            transactionId: paymentResponse?.data?.paymentLinkId
          }
        })
        return ({ data: updatedRequest, isSuccess: true, message: "success" })
      }
    } catch (e) {
      await prismadb.requestOnStaff.deleteMany({
        where: {
          requestId: +requestId,
        }
      })
      await prismadb.request.delete({ where: { id: +requestId } })
      return ({ data: null, isSuccess: false, message: "failed when create payment link at payos" })

      //zalopay
    }
  } else if (paymentMethod == "zalopay") {
    try {

      const zalopayPaymentResponse = await ZaloPay({ props: { description: validData.serviceName, amount: +validData.price, app_trans_id: requestId, app_user: userId, items: [] } })
      if (!zalopayPaymentResponse) {
        return ({ data: null, isSuccess: false, message: "Zalopay hiện đang dừng họat động, vui lòng chọn phương thức thanh toán khác" })
      }
      if (zalopayPaymentResponse.return_code == 1) {
        const updatedRequest = await prismadb.request.update({
          where: {
            id: +requestId
          }, data: {
            paymentLink: zalopayPaymentResponse?.order_url + "",
            transactionId: zalopayPaymentResponse?.transaction_id
          }
        })
        return ({ data: updatedRequest, isSuccess: true, message: "success" })
      }
    } catch (e) {
      await prismadb.requestOnStaff.deleteMany({
        where: {
          requestId: +requestId,
        }
      })
      await prismadb.request.delete({ where: { id: +requestId } })
      return ({ data: null, isSuccess: false, message: "error" })
    }
    return ({ data: null, isSuccess: false, message: "error" })
  } else {
    return ({ data: null, isSuccess: false, message: "Phương thức thanh toán không h��p lệ" })
  }
}
