"use server"

import { convertFloatToTime, convertTimeToFloat } from "@/app/lib/convertTime";
import { auth } from "@/auth"
import prismadb from "@/lib/prisma"
import { ScheduleInputType } from "@/type/schedule";

export default async function getScheduleData() {
  const { user } = await auth();
  const response = await prismadb.request.findMany({
    where: {
      staffs: {
        some: {
          user: {
            id: user.id
          }
        }
      },
      AND: {
        status: { equals: "confirmed" }
      }
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          phone: true,
          image: true,
        }
      },
      address: {
        select: {
          province: {
            select: {
              provinceName: true,
            }
          },
          district: {
            select: {
              districtName: true,
            }
          },
          ward: {
            select: {
              wardName: true
            }
          },
          specificAddress: true
        }
      },
      serviceCombo: true,
      service: true,
      phone: true,
      time: true,
      date: true,
      map: {
        select: {
          mapLink: true
        }
      }
    }
  })


  const data: ScheduleInputType[] = []

  response.map(res => {
    const scheduleAddress = `${res.address.specificAddress}, ${res.address.ward.wardName}, ${res.address.district.districtName}, ${res.address.province.provinceName}`

    const item: ScheduleInputType = res?.map?.mapLink ? {
      id: res.id + "",
      user: {
        id: res.user.id,
        avatar: res.user.image,
        name: res.user.name
      },
      phone: res.phone,
      address: scheduleAddress,
      serviceCombo: res.serviceCombo.title,
      serviceComboTitle: res.serviceCombo.description,
      startTime: res.time,
      date: res.date,
      endTime: convertFloatToTime(convertTimeToFloat(res.time) + res.serviceCombo.duration),
      googleMapLink: res.map.mapLink,
      serviceName: res.service.serviceName
    } : {
      id: res.id + "",
      user: {
        id: res.user.id,
        avatar: res.user.image,
        name: res.user.name
      },
      phone: res.phone,
      address: scheduleAddress,
      serviceCombo: res.serviceCombo.title,
      serviceComboTitle: res.serviceCombo.description,
      startTime: res.time,
      date: res.date,
      endTime: convertFloatToTime(convertTimeToFloat(res.time) + res.serviceCombo.duration),
      googleMapLink: null,
      serviceName: res.service.serviceName
    }


    data.push(item)
  })

  return { data: data }



}
