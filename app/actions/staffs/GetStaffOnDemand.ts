"use server";

import { isAdmin, isUser } from "@/app/lib/checkPermittedRole";
import { datesAreInSameDay } from "@/app/lib/dateInSameDay";
import { getDistanceFromLatLon } from "@/app/lib/getDistance";
import { getDistanceMapbox } from "@/app/lib/getDistanceMapbox";
import prismadb from "@/lib/prisma";

type ConditionType = {
  serviceId: string,
  date: Date,
  startTime: number,
  endTime: number,
  addressId?: string,
  location: {
    provinceId: string,
    districtId: string,
    wardId: string,
  },
  map?: {
    latitude: number,
    longitude: number,
  },
};

export async function getStaffOnDemand({ props }: { props: ConditionType }) {
  const isPermitted = await isUser() || isAdmin();
  if (!isPermitted) {
    return { error: "Bạn không có quyền thực hiện chức năng này" };
  }

  try {
    const result: typeof data = [];

    if (!props.serviceId || !props.endTime || !props.startTime || !props.date) {
      return { data: result, message: "Không đủ thông tin để chọn ra nhân viên phù hợp", success: false };
    }

    if (!props.addressId && !(props.location.provinceId && props.location.districtId && props.location.wardId)) {
      return { data: result, message: "Hãy chọn địa chỉ trước khi đặt", success: false };
    }

    let districtId = +props.location.districtId;
    if (props?.addressId) {
      districtId = await prismadb.address.findUnique({
        where: { id: props.addressId },
        select: { districtId: true },
      }).then((e) => e?.districtId ?? districtId);
    }

    const data = await prismadb.user.findMany({
      where: {
        role: {
          roleName: {
            equals: "STAFF",
          },
        },
        capabilities: {
          some: {
            serviceId: props.serviceId,
          },
        },
      },
      include: {
        feedbacks: {
          select: {
            rate: true,
          },
        },
        capabilities: {
          select: {
            serviceId: true,
            Service: {
              select: {
                serviceName: true,
              },
            },
          },
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
                  },
                },
                district: {
                  select: {
                    id: true,
                    districtName: true,
                  },
                },
                ward: {
                  select: {
                    id: true,
                    wardName: true,
                  },
                },
              },
            },
          },
        },
        Schedule: true,
        maps: {
          select: {
            mapAddress: {
              select: {
                lat: true,
                lng: true,
              },
            },
          },
        },
      },
    });

    for (const user of data) {
      const isAvailable = user.Schedule.every((sch) => {
        if (!datesAreInSameDay(sch.date, props.date)) return true;
        const schStartTime = +sch.startTime;
        const schEndTime = +sch.endTime;
        return !((schStartTime <= props.endTime && schStartTime >= props.startTime) || (schEndTime >= props.startTime && schEndTime <= props.endTime));
      });
      if (isAvailable) result.push(user);
    }

    const calculateRate = (input: number[]): number => {
      const sum = input.reduce((acc, rate) => acc + rate, 0);
      return input.length ? sum / input.length : 0;
    };

    if (result.length === 0) {
      return { data: [], message: "Không tìm thấy nhân viên phù hợp", success: false };
    }

    type ResultType = typeof data[0] & { distance: number, rate: number };

    const _result: ResultType[] = [];
    for (const user of result) {
      const rate = calculateRate(user.feedbacks.map((feedback) => feedback.rate));
      let distance = -1;

      if (user.maps.length && props?.map?.latitude && props?.map?.longitude) {
        const [lat1, lon1] = [props.map.latitude, props.map.longitude];
        const [lat2, lon2] = [user.maps[0].mapAddress.lat, user.maps[0].mapAddress.lng];
        const straightDistance = +(getDistanceFromLatLon(lat1, lon1, lat2, lon2) / 1000).toFixed(2);

        if (straightDistance < 30) {
          const calculatedDistance = await getDistanceMapbox({
            lat1,
            lon1,
            lat2,
            lon2,
          });
          distance = calculatedDistance.success && calculatedDistance.data < 30000 ? +(calculatedDistance.data / 1000).toFixed(2) : straightDistance;
        }
      } else if (user.addresses.some((address) => address.address.district.id === districtId)) {
        distance = -1;
      }

      _result.push({ ...user, distance, rate });
    }

    return { data: _result, success: true, message: "" };
  } catch (error) {
    console.error(error);
    return { data: [], message: "Hiện có vấn đề xảy ra, vui lòng thử lại sau", success: false };
  }
}

