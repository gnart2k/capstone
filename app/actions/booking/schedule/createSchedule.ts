"use server"
import { convertFloatToTime, convertTimeToFloat } from "@/app/lib/convertTime"
import { datesAreInSameDay } from "@/app/lib/dateInSameDay"
import prismadb from "@/lib/prisma"
import { BookingFormSchema } from "@/schema"
import { z } from "zod"

export async function createSchedule({ values, requestId }: { values: z.infer<typeof BookingFormSchema>, requestId: number }) {
  const validtedFields = BookingFormSchema.safeParse(values)
  if (!validtedFields.success) {
    return { message: "Có lỗi, vui lòng thử lại sau", success: false }
  }
  const validData = validtedFields.data

  const _currentServiceCombo = await prismadb.serviceCombo.findFirst({
    where: {
      id: validData.serviceCombo
    }
  })
  for (let i = 0; i < values.staffList.length; i++) {

    let isExistedSchedule = false
    let _endTime = _currentServiceCombo?.duration + convertTimeToFloat(values.time);
    let date = values.date
    // if (_endTime > 24) {
    //   _endTime = _endTime - 24
    //   date = new Date(new Date(values.date).getTime() + 24 * 60 * 60 * 1000)
    // }

    //check schedule 
    const currentStaff = await prismadb.user.findFirst({
      where: {
        id: values.staffList[i].id
      },
      select: {
        Schedule: true
      }
    })


    currentStaff.Schedule.map((sch) => {
      if (datesAreInSameDay(sch.date, date)) {
        if ((+sch.startTime < convertTimeToFloat(values.time) && (+sch.endTime > convertTimeToFloat(values.time))) && (+sch.startTime < _endTime && +sch.endTime > _endTime)) {
          isExistedSchedule = true
        }
      }
      //       if ((((convertTimeToFloat(sch.startTime) < props.startTime) && (convertTimeToFloat(sch.endTime) > +props.startTime)) || ((convertTimeToFloat(sch.startTime) < props.endTime) && (convertTimeToFloat(sch.endTime) > +props.endTime)))) {
      //   existedSchedule = true
      // }

    })

    if (!isExistedSchedule) {
      try {
        const schedule = await prismadb.schedule.create({
          data: {
            date: date,
            taskName: values.serviceName,
            userId: values.staffList[i].id,
            startTime: values.time,
            endTime: convertFloatToTime(_endTime),
            requestId: requestId
          }
        })

        return { success: true, message: 'schedule created success', data: schedule }
      } catch (e) {
        console.log(e)
        return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại sau' }

      }
    } else {
      return { success: false, message: 'Nhân viên bị trùng lịch, vui lòng chọn lại' }

    }

  }


}
