import { getStaffOnDemand } from "@/app/actions/staffs/GetStaffOnDemand";
import { isAdmin, isUser } from "@/app/lib/checkPermittedRole";
import { convertTimeToFloat } from "@/app/lib/convertTime";
import prismadb from "@/lib/prisma";
import { StaffColumn } from "@/type/staff/staff-columns";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  const isPermitted = await isUser() || isAdmin();
  if (!isPermitted) {
    return NextResponse.json("Bạn không có quyền thực hiện chức năng này");
  }
  try {
    if (!params.requestId) {
      return new NextResponse("Service is required", { status: 400 });
    }

    const request = await prismadb.request.findFirst({
      where: {
        id: +params.requestId
      },
      include: {
        service: {
          select: {
            id: true
          }
        },
        serviceCombo: {
          select: {
            duration: true
          }
        },
        address: {
          select: {
            provinceId: true,
            districtId: true,
            wardId: true,
          }
        },
        map: {
          select: {
            lat: true,
            lng: true,
          }
        }
      }
    })
    const _endTime = request.serviceCombo.duration + convertTimeToFloat(request.time)


    const staffs = await getStaffOnDemand({
      props: {
        serviceId: request.serviceId,
        date: request.date,
        startTime: convertTimeToFloat(request.time),
        endTime: _endTime,
        location: {
          provinceId: request.address?.provinceId + "",
          districtId: request.address?.districtId + '',
          wardId: request.address?.wardId + ''
        },
        map: {
          latitude: request.map?.lat,
          longitude: request.map?.lng
        }
      }
    });
    const rs: StaffColumn[] = []

    for (let index = 0; index < staffs.data.length; index++) {
      const element = staffs.data[index];
      rs.push({
        id: element.id,
        staffName: element.name,
        staffAvatar: element.image,
        staffGender: element.gender,
        phone: element.phone,
        credibility: element.credibility,
        address: element.addresses.length != 0 ? element.addresses[0].address.district.districtName : "",
        age: (new Date(Date.now()).getFullYear() - element?.dob?.getFullYear()) + "",
        //@ts-ignore
        distance: element.distance
      })
    }

    return NextResponse.json(rs, { status: 200 });
  } catch (err) {
    console.log("[size_GET]", err);
    return new NextResponse("internal error", { status: 500 });
  }
}


