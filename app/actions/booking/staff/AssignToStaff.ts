import prismadb from "@/lib/prisma"
import { BookingResponseType } from ".."

type Props = {
  listStaffId: string[],
  requestId: string
}
export async function assignRequestToStaff({ listStaffId, requestId }: Props): Promise<BookingResponseType> {
  try {
    for (let i = 0; i < listStaffId.length; i++) {
      const existed = await prismadb.requestOnStaff.findFirst({
        where: {
          requestId: +requestId,
          staffId: listStaffId[0]
        }
      })
      if (existed) {
        return { data: null, isSuccess: false, message: "staff is already assigned to this request" }
      }
    }

    for (let i = 0; i < listStaffId.length; i++) {
      await prismadb.requestOnStaff.create({
        data: {
          Request: {
            connect: {
              id: +requestId
            }
          },
          user: {
            connect: {
              id: listStaffId[i]
            }
          }
        }

      })
    }

    return { data: null, isSuccess: true, message: "success" }
  } catch (error) {
    return { data: null, isSuccess: true, message: "failed" }
  }
}
