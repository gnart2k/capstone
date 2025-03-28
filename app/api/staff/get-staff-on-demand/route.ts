import { isUser } from "@/app/lib/checkPermittedRole"
import { convertTimeToFloat } from "@/app/lib/convertTime"
import { datesAreInSameDay } from "@/app/lib/dateInSameDay"
import { getDistanceFromLatLon } from "@/app/lib/getDistance"
import { getDistanceMapbox } from "@/app/lib/getDistanceMapbox"
import { auth } from "@/auth"
import prismadb from "@/lib/prisma"
import { NextResponse } from "next/server"

type ConditionType = {
  serviceId: string,
  date: Date,
  startTime: number,
  endTime: number,
  addressId?: string,
  location: {
    provinceId: string, districtId: string, wardId: string
  },
  map?: {
    latitude: number, longitude: number
  }
}
export async function POST(req: Request) {

  const isPermitted = await isUser();
  const session = await auth();
  if (!isPermitted) {
    return NextResponse.json({ error: "Bạn không có quyền thực hiện chức năng này" }); ``
  }
  try {
    const { props } = await req.json();
    const result: typeof data = []

    if (!props.serviceId || !props.endTime || !props.startTime || !props.date) {
      return NextResponse.json({ data: result, message: "Hãy chọn đủ thông tin để chúng tôi tìm kiếm nhân viên phù hợp ", success: false })
    }

    if (!props.addressId && !(props.location.provinceId && props.location.districtId && props.location.wardId)) {
      return NextResponse.json({ data: result, message: "Hãy chọn địa chỉ trước khi đặt ", success: false })
    }

    const data = await prismadb.user.findMany({
      where: {
        role: {
          roleName: {
            equals: "STAFF"
          },
        },
        capabilities: {
          some: {
            serviceId: props.serviceId
          }
        },
      },
      include: {
        feedbacks: {
          select: {
            rate: true
          },
        },
        capabilities: {
          select: {
            serviceId: true,
            Service: {
              select: {
                serviceName: true
              }
            }
          }
        },
        addresses: {
          select: {
            address: {
              select: {
                specificAddress: true,
                isDefault: true,
                province: {
                  select: {
                    id: true,
                    provinceName: true,
                  }
                },
                district: {
                  select: {
                    id: true,
                    districtName: true,
                  }
                },
                ward: {
                  select: {
                    id: true,
                    wardName: true,
                  }
                }
              }
            }
          }
        },
        Schedule: true,
        maps: {
          select: {
            mapAddress: {
              select: {
                lat: true,
                lng: true
              }
            }
          }
        }
      }
    })

    type resultTypePriority = (typeof data[0]) & { priority: number, numberOfFeedback: number }
    const _resultPriority: resultTypePriority[] = []

    if (data?.length == 0) {
      return NextResponse.json({ data: data, message: "Không tìm thấy nhân viên phù hợp", success: false })
    }


    //schedule handle
    for (let i = 0; i < data.length; i++) {
      let scheduleList = await prismadb.schedule.findMany({
        where: {
          userId: {
            equals: data[i].id
          },
        }
      })
      //update schedule status 
      scheduleList.forEach(async (sch) => {
        //update schedule when request is cancelled
        const scheduleStatus = await prismadb.request.findFirst({
          where: {
            id: sch.requestId
          },
          select: {
            status: true
          }
        })

        if (scheduleStatus.status == 'canceled' || scheduleStatus.status == 'complete') {
          sch && await prismadb.schedule.delete({
            where: {
              id: sch.id
            }
          })
        }
      })

      let existedSchedule = false
      data[i].Schedule.map((sch) => {
        if (datesAreInSameDay(sch.date, props.date)) {
          if ((((convertTimeToFloat(sch.startTime) <= props.startTime) && (convertTimeToFloat(sch.endTime) >= +props.startTime)) || ((convertTimeToFloat(sch.startTime) <= props.endTime) && (convertTimeToFloat(sch.endTime) >= +props.endTime)))) {
            existedSchedule = true
          }
        }

        // if (datesAreInSameDay(sch.date, props.date)) {
        //   if ((convertTimeToFloat(sch.startTime) < props.startTime && convertTimeToFloat(sch.endTime) > props.startTime) || (convertTimeToFloat(sch.startTime) < props.endTime && convertTimeToFloat(sch.endTime) > +props.endTime)) {
        //     existedSchedule = true
        //   }
        // }
      })

      if (!existedSchedule) {
        //get number of feedback 
        const numberOfFeedback = await prismadb.feedback.count({
          where: {
            request: {
              staffs: {
                some: {
                  staffId: data[i].id, // Assuming you want to match staffId with data[i].id
                },
              },
            }
          }
        })
        //calculate priority
        const priorityUp = await prismadb.request.count({
          where: {
            userId: session?.user.id,
            staffs: {
              some: {
                staffId: data[i].id, // Assuming you want to match staffId with data[i].id
              },
            },
            status: {
              equals: 'complete'
            }
          },
        });
        const priorityDown = await prismadb.request.count({
          where: {
            userId: session?.user.id,
            staffs: {
              some: {
                staffId: data[i].id, // Assuming you want to match staffId with data[i].id
              },
            },
            status: {
              equals: 'canceled'
            }
          },
        });

        const priorityCount = priorityUp - priorityDown;
        _resultPriority.push({ ...data[i], priority: priorityCount, numberOfFeedback: numberOfFeedback })
      }
    }

    if (_resultPriority?.length == 0) {
      return NextResponse.json({ data: result, message: "Hiện tất cả nhân viên đang bận, vui lòng chọn thời gian khác", success: false })
    }




    const calculateRate = (input: number[]): number => {
      let sum = 0;
      input.forEach((feedback) => {
        sum += feedback
      });
      const result = sum / input.length || 0;
      return result;
    }

    type resultType = resultTypePriority & { distance: number, rate: number }

    const _result: resultType[] = []
    for (let i = 0; i < _resultPriority.length; i++) {
      // console.log(props.map?.latitude,
      //   props.map.longitude,
      //   result[i].maps[0].mapAddress.lat,
      //   result[i].maps[0].mapAddress.lng
      // )
      const e = _resultPriority[i];
      const calculatedRate = calculateRate(_resultPriority[i].feedbacks.map(feedback => feedback.rate));
      let straightDistance = -1
      let distance

      if (_resultPriority[i].maps.length == 0) {
        if (_resultPriority[i].addresses.map(address => address.address.district.id == props.location.districtId)) {
          _result.push({ ...e, distance: -1, rate: calculatedRate });
        }

      } else if (props?.map?.longitude != 0 && props?.map?.latitude != 0) {
        straightDistance = getDistanceFromLatLon(
          props.map.latitude,
          props.map.longitude,
          _resultPriority[i].maps[0].mapAddress.lat,
          _resultPriority[i].maps[0].mapAddress.lng
        );
        if (straightDistance > 0) {
          straightDistance = +(straightDistance / 1000).toFixed(2);
          console.log("straightDistance", straightDistance)
        } else {
          straightDistance = -1
        }


        if (straightDistance < 30) {
          distance = await getDistanceMapbox({
            lat1: props.map.latitude,
            lon1: props.map.longitude,
            lat2: _resultPriority[i].maps[0].mapAddress.lat,
            lon2: _resultPriority[i].maps[0].mapAddress.lng
          })
          console.log("distance", distance)
          if (distance.success) {
            if (distance.data < 30000) {
              distance = +(distance.data / 1000).toFixed(2)
            }
          } else {
            if (straightDistance < 30000) {
              distance = straightDistance
            }
          }
          _result.push({ ...e, distance: +distance, rate: calculatedRate });
        }
      } else {
        _result.push({ ...e, distance: -1, rate: calculatedRate });
      }


      _result.sort((a, b) => {
        if (a.priority !== b.priority) {
          return b.priority - a.priority
        } else {
          return a.rate - b.rate
        }
      }
      );

    }

    return NextResponse.json({ data: _result, success: true, message: "" })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ data: [], message: "Hiện có vấn đề xảy ra, vui lòng thử lại sau", success: false })
  }

}

