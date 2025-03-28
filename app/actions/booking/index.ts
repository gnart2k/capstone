"use server"
import { BookingFormSchema } from "@/schema"
import * as z from "zod"
import { handleAddress } from "./HandleAddress"
import { handleRequest } from "./request/HandleRequest"
import { handleUserMap } from "./HandleUserMap"
import { assignRequestToStaff } from "./staff/AssignToStaff"
import { handlePayment } from "./handlePayment"
import prismadb from "@/lib/prisma"
import StaffList from "@/app/(pages)/manager-page/list-request/[requestId]/components/StaffList"
import { createSchedule } from "./schedule/createSchedule"
import { convertTimeToFloat } from "@/app/lib/convertTime"
import { datesAreInSameDay } from "@/app/lib/dateInSameDay"

export type BookingResponseType = {
  data: any,
  isSuccess: boolean,
  message: string
}
export const bookingAction = async (values: z.infer<typeof BookingFormSchema>): Promise<BookingResponseType> => {
  const validtedFields = BookingFormSchema.safeParse(values)

  if (!validtedFields.success) {
    return { data: null, message: "Có lỗi, vui lòng thử lại sau", isSuccess: false }
  }
  const validData = validtedFields.data

  if (convertTimeToFloat(validData.time) < 6 || convertTimeToFloat(validData.time) > 20) {
    return { data: null, message: "Hãy đặt lịch trong khoảng thời gian từ 6 giờ tới 20 giờ", isSuccess: false }
  }
  // Create a new Date object for the current date
  const currentDate = new Date(values.date);

  // Subtract one day
  currentDate.setDate(currentDate.getDate() - 1);

  // Log the new date
  console.log(currentDate);

  if (datesAreInSameDay(new Date(), currentDate)) {
    const now = new Date();

    // Parse the time string into hours and minutes
    const [hours, minutes] = values.time.split(':').map(Number);

    // Create a new Date object for today with the given time
    const inputTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    // Compare the input time with the current time

    if (inputTime.getTime() < now.getTime()) {
      return { data: null, message: "Hãy đặt lịch trong thời gian tương lai", isSuccess: false }
    }

  }

  const addressHandler = await handleAddress({ validData: { userAddress: validData.userAddress, province: validData.province, provinceId: validData.address.provinceId, districtId: validData?.address?.districtId, wardId: validData?.address?.wardId, district: validData.district, ward: validData.ward, specificAddress: validData.specificAddress } })
  if (!addressHandler?.isSuccess) {
    //return error message
    return addressHandler
  }

  //handle address return address object for create request
  const address = addressHandler.data

  if (validData.staffList.length == 0) {
    return { data: null, message: "Vui lòng chọn nhân viên", isSuccess: false }
  }
  const mapHandler = await handleUserMap({ props: { mapLink: validData?.map?.mapLink, addressText: validData?.map?.addressText, longitude: validData?.map?.longitude, latitude: validData?.map?.latitude } });


  //DONE: create request
  const request = await handleRequest({ values: values, hasMap: mapHandler.isSuccess, addressId: address.id, mapId: mapHandler.isSuccess ? mapHandler.data.mapId : "" });
  if (!request?.isSuccess) {
    //return error message
    return request
  }

  //DONE: assign task to staff
  const assignStaff = await assignRequestToStaff({ listStaffId: validData.staffList.map(staff => staff.id), requestId: request?.data?.id })
  if (!assignStaff.isSuccess) {
    await prismadb.request.delete({
      where: {
        id: +request.data.id
      }
    })

    return assignStaff
  }

  //DONE: create schedule for each staff
  const createScheduleHandler = await createSchedule({ values: values, requestId: request.data?.id })
  if (!createScheduleHandler?.success) {
    await prismadb.request.delete({
      where: {
        id: +request.data.id
      }
    })

    return (
      { data: null, isSuccess: false, message: createScheduleHandler.message }
    )
  }



  const paymentHandler = await handlePayment({
    values: values,
    requestId: request.data?.id + "",
    userId: values.userId,
    paymentMethod: validData?.paymentMethod
  })
  if (!paymentHandler?.isSuccess) {
    await prismadb.schedule.deleteMany({
      where: {
        requestId: +request.data.id
      }
    })

    await prismadb.request.delete({
      where: {
        id: +request.data.id
      }
    })
  }


  return paymentHandler

}


