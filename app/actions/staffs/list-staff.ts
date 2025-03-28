"use server"
import { StaffDetail } from "@/app/(user)/staff/components/ModalStaffDetail";
import { isManager, isUser } from "@/app/lib/checkPermittedRole";
import prismadb from "@/lib/prisma";
import { StaffListProps } from "@/type/staff";
import { StaffColumn } from "@/type/staff/staff-columns";
import { staffSchedule } from "./list-request";

export async function getListStaff() {
  const isPermitted = await isUser();
  if (!isPermitted) {
    return { data: new Array(), success: false, error: "Bạn không có quyền thực hiện chức năng này" }; ``
  }
  try {
    const data = await prismadb.user.findMany({
      where: {
        role: {
          roleName: { equals: "staff" }
        }
      },
      select: {
        phone: true,
        dob: true,
        feedbacks: true,
        credibility: true,
        addresses: {
          select: {
            address: {
              select: {
                specificAddress: true,
                isDefault: true,
                ward: {
                  select: {
                    wardName: true,
                  }
                },
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
              },
            },
          },
        },
        image: true,
        id: true,
        name: true,
        gender: true,
      },
    });

    let result: StaffColumn[] = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      let age = new Date().getFullYear() - new Date(element.dob).getFullYear();
      let total = 0;
      element.feedbacks.forEach((feedback) => {
        total += feedback.rate;
      });
      let credibility = element.credibility ? element.credibility : "0";
      const staffDefaultAddress = element.addresses.filter(e => e.address.isDefault)
      let staffAddress =
        element.addresses.length > 0 ? `${element.addresses[0].address.specificAddress}, ${element.addresses[0].address.ward.wardName}, ${element.addresses[0].address.district.districtName}, ${element.addresses[0].address.province.provinceName}` : ""
      result.push(
        {
          id: element.id + "",
          staffName: element.name,
          staffAvatar: element.image,
          staffGender: element.gender,
          address: staffAddress,
          age: age + "",
          credibility: credibility,
          phone: element.phone
        }
      )
    }

    return { data: result, success: true };
  } catch (ex) {
    return { data: new Array(), success: false };
  }

}


export default async function findStaffById({ staffId }: { staffId: string }) {
  const isPermitted = await isUser();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };
  }
  try {
    const data = await prismadb.user.findFirst({
      select: {
        id: true,
        name: true,
        phone: true,
        image: true,
        addresses: {
          select: {
            address: {
              select: {
                specificAddress: true,
                ward: { select: { wardName: true } },
                province: { select: { provinceName: true } },
                district: { select: { districtName: true } }
              }
            }
          }
        },
        dob: true,
        gender: true,
        credibility: true,
        capabilities: {
          where: {
            userId: staffId
          },
          select: {
            Service: {
              select: {
                serviceName: true
              }
            }
          }
        }
      },
      where: { id: staffId }
    });

    if (!data) {
      return { error: "Không tìm thấy thông tin staff" };
    }

    let staffAge = new Date().getFullYear() - new Date(data.dob).getFullYear();

    const scheduleResponse = await staffSchedule(staffId);

    let result: StaffDetail = {
      staffId: data.id,
      staffName: data.name,
      staffAvatar: data.image,
      gender: data.gender,
      location: `${data.addresses[0]?.address.ward.wardName}, ${data.addresses[0]?.address.district.districtName}, ${data.addresses[0]?.address.province.provinceName}`,
      age: staffAge + "",
      phoneNumber: data.phone,
      credibility: data.credibility,
      capabilities: data.capabilities,
      schedule: scheduleResponse.data
    };


    return { staff: result };
  } catch (error) {
    return { error: "Đã xảy ra lỗi khi lấy thông tin staff: " + error };
  }
}

// (alias) type StaffListProps = {
//     id: string;
//     staffName: string;
//     staffAvatar: string;
//     staffGender: string;
//     phone: string;
//     credibility: string;
//     address: string;
// }

export async function listStaffByRequestId(requestId: number) {
  const isPermitted = await isManager();
  if (!isPermitted) {
    return { data: new Array(), success: false, error: "Bạn không có quyền thực hiện chức năng này" };
  }
  try {
    const staffs = await prismadb.user.findMany({
      where: {
        requests: {
          some: {
            requestId: requestId,
          }
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        phone: true,
        credibility: true,
        addresses: {
          select: {
            address: {
              select: {
                specificAddress: true,
                ward: { select: { wardName: true } },
                province: { select: { provinceName: true } },
                district: { select: { districtName: true } }
              }
            }
          }
        },
        gender: true
      }
    });

    let data: StaffListProps[] = []
    staffs.forEach(staff => {
      const address = staff.addresses.length > 0 ? `${staff.addresses[0].address.specificAddress}, ${staff.addresses[0].address.ward.wardName}, ${staff.addresses[0].address.district.districtName}, ${staff.addresses[0].address.province.provinceName}` : ""
      data.push({
        id: staff.id,
        staffName: staff.name,
        staffAvatar: staff.image,
        staffGender: staff.gender,
        phone: staff.phone,
        credibility: staff.credibility,
        address: address,
      })

    })


    if (!data) {
      return { data: new Array(), success: false };
    }

    return { data: data, success: true };
  } catch (error) {
    return { data: new Array(), success: false };
  }

}
