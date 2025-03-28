"use server"
import { isStaff, isUser } from "@/app/lib/checkPermittedRole";
import { convertTimeToFloat } from "@/app/lib/convertTime";
import { sendBookingNotificationEmail } from "@/app/lib/mail";
import { RequestColumn } from "@/components/custom/table/requestTable/requestCollumn";
import prismadb from "@/lib/prisma";
import { format } from "date-fns"
export const viewAllDoneRequest = async () => {
  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" }; ``
  }
  try {
    const request = await prismadb.request.findMany({
      where: {
        status: "paid"
      },
      select: {
        id: true,
        date: true,
        status: true,
        user: {
          select: {
            name: true,
            image: true,
            id: true,
            email: true,
          }
        },
        address: {
          select: {
            province: {
              select: {
                provinceName: true
              }

            },
            district: {
              select: {
                districtName: true
              }
            },
            ward: {
              select: {
                wardName: true
              }
            },
            specificAddress: true,
          }
        }

      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!request) {
      return { error: "Không tìm thấy thông tin request" };
    }

    let result: RequestColumn[] = [];

    for (let index = 0; index < request.length; index++) {
      const element = request[index];
      const addressCommplete = element.address.specificAddress
        + "," + element.address.ward.wardName
        + "," + element.address.district.districtName
        + "," + element.address.province.provinceName;

      result.push({
        id: element.id + "",
        date: new Date(element.date),
        status: element.status,
        customerName: element.user.name,
        customerAvatar: element.user.image,
        address: addressCommplete,
        customerId: element.user.id,
        customerEmail: element.user.email,
      });
    }

    return { request: result };
  } catch (error) {
    return { error: "Đã xảy ra lỗi khi lấy thông tin request" };
  }
};


export async function findFirstRequest(requestId: string) {
  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" }; ``
  }
  const request = await prismadb.request.findFirst({
    where: {
      id: parseInt(requestId),
    },
    select: {
      id: true,
      date: true,
      time: true,
      status: true,
      phone: true,
      address: {
        select: {
          specificAddress: true,
          ward: {
            select: {
              wardName: true
            }
          },
          district: {
            select: {
              districtName: true
            }
          },
          province: {
            select: {
              provinceName: true
            }
          }
        }
      },
      user: {
        select: {
          image: true,
          name: true,
          gender: true,
          id: true,
          email: true,
        }
      },
      service: {
        select: {
          serviceName: true,
        }
      },
      serviceCombo: {
        select: {
          title: true,
          description: true,
          price: true,
          staffNumber: true
        }
      },
      note: true,
    }
  })
  return { data: request }
}

export async function changeStatus({ requestId, isAccept, note, staffNumber }: { staffNumber: number, requestId: number, isAccept: boolean, note: string }) {
  console.log(note, staffNumber, isAccept)
  const isPermitted = await isStaff();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" }; ``
  }


  let checkAccept = isAccept;
  //note = null staffNumber = 1 => enough => change status request
  // if staffNumber > 1 change note to current staffNumber accept 
  //if staffNumber == note => change status of request
  let service
  if (note == null && staffNumber == 1) {
    service = await prismadb.request.update({
      where: {
        id: requestId,
      },
      select: {
        user: {
          select: {
            id: true,
            email: true,
          }
        },
      },
      data: {
        note: staffNumber + "",
      }

    });
  } else if (+note < staffNumber) {
    const oldNote = await prismadb.request.findFirst({
      where: {
        id: requestId
      },
      select: {
        note: true,
      }
    })
    service = await prismadb.request.update({
      where: {
        id: requestId,
      },
      select: {
        user: {
          select: {
            id: true,
            email: true,
          }
        },
      },
      data: {
        note: (+oldNote.note + 1).toString(),
      }
    });
  }
  const currentNote = await prismadb.request.findFirst({
    where: {
      id: requestId
    },
    select: {
      note: true,
    }
  })


  if (+currentNote.note == staffNumber) {
    service = await prismadb.request.update({
      where: {
        id: requestId,
      },
      select: {
        user: {
          select: {
            id: true,
            email: true,
          }
        },
      },
      data: {
        status: checkAccept ? "confirmed" : "canceled"
      }

    });
    if (checkAccept) {
      await sendBookingNotificationEmail(service.user.email, requestId);
    }
  }
  return { data: service }

}


export const staffSchedule = async (staffId: string) => {
  const isPermitted = await isUser();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };
  }
  const listDay = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const listShift = ["Sáng", "Chiều", "Tối"];

  const request = await prismadb.request.findMany({
    where: {
      userId: staffId,
    },
    select: {
      date: true,
      time: true,
      serviceCombo: {
        select: {
          duration: true
        }
      }
    }
  });

  const schedule = await prismadb.schedule.findMany({
    where: {
      userId: staffId
    }
  })

  const listTest = listDay.map((day) => {
    const date = new Date();
    const currentDate = date.getDate();
    const currentDay = date.getDay();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const dayIndex = listDay.indexOf(day);
    const dateIndex = currentDate + dayIndex - currentDay;
    const newDate = new Date(currentYear, currentMonth, dateIndex);

    const shift = listShift.map((item) => {
      const active = schedule.some((req) => {
        const reqDate = new Date(req.date);
        const reqTime = req.startTime;
        const time = convertTimeToFloat(reqTime)
        const endTime = convertTimeToFloat(req.endTime)
        return newDate.getDate() === reqDate.getDate() - 1 && (
          (time >= 0 && time <= 12 && item === "Sáng") ||
          (time >= 12 && time <= 17 && item === "Chiều") ||
          (time >= 18 && time <= 22 && item === "Tối") ||
          (endTime >= 0 && endTime <= 12 && item === "Sáng") ||
          (endTime >= 12 && endTime <= 17 && item === "Chiều") ||
          (endTime >= 18 && endTime <= 22 && item === "Tối")

        );
      });
      return {
        shift: item,
        active
      };
    });


    return {
      day,
      date: format(newDate, "dd/MM"),
      shift
    };
  });

  return { data: listTest };
}

