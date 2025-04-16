"use client";
import { FormError } from "@/components/custom/form-error";
import { FormSuccess } from "@/components/custom/form-success";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarComponent } from "@/components/ui/calendar";
import ZaloPayImg from "@/public/zalopay.png";
import PayOsImg from "@/public/payos.png";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BookingFormSchema } from "@/schema";
import { ServiceComboType, ServiceType } from "@/type/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { add, format } from "date-fns";
import { bookingAction } from "@/app/actions/booking";
import { AddressType } from "@/type/location";
import {
  getAllDistricts,
  getAllProvinces,
  getAllWards,
} from "@/app/actions/location/get";
import Map from "./map";
import { useAddressStore } from "@/app/store/useAddressStore";
import { UserAddresses } from "@/type/address";
import { bookingOptionDataType } from "@/initialData/home";
import {
  StaffMultiSelect,
  staffSelectType,
} from "@/components/custom/MultiSelect";
import calculateAge from "@/app/lib/calculateAge";
import { convertTimeToFloat } from "@/app/lib/convertTime";
import { useStaffStore } from "@/app/store/useSelectedStaff";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { createNotification } from "@/app/actions/notifications/create";

import styles from "../style/booking.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { CircleX } from "lucide-react";
import MapWithGeocoder from "@/components/custom/mapbox/Geocoding";
import { currencyFormater } from "@/app/lib/currencyFormat";
import { createSchedule } from "@/app/actions/booking/schedule/createSchedule";
import { Checkbox } from "@/components/ui/checkbox";
import LocationReminder from "@/components/custom/LocationReminder";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);

interface BookingFormProps {
  currentService?: ServiceType | null;
  priorityStaffId?: string;
  services: ServiceType[];
  userId: string;
  currentAddress?: UserAddresses;
}

export type ProvinceProps = {
  id: number;
  provinceName: string;
};
export type DistrictProps = {
  id: number;
  provinceId: number;
  districtName: string;
};
export type WardProps = {
  id: number;
  districtId: number;
  wardName: string;
};

interface searchStaffInputProps {
  serviceId: string; // ID of the service
  date: Date; // Date as a string
  startTime: number; // Start time in numerical form (timestamp or hour in the day)
  endTime: number; // End time in numerical form (timestamp or hour in the day)
  location: {
    // Location information
    provinceId: string;
    districtId: string;
    wardId: string;
  };
  map: {
    // Map coordinates
    latitude: number;
    longitude: number;
  };
}

export default function BookingForm({
  priorityStaffId,
  currentService,
  services,
  userId,
  currentAddress,
}: BookingFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [currentServiceName, setCurrentServiceName] = useState<
    string | undefined
  >();
  const [currentServiceState, setCurrentServiceState] = useState<
    ServiceType | undefined
  >(currentService);
  const [currentPrice, setCurrentPrice] = useState<string | undefined>();
  const [deposit, setDeposit] = useState<string | undefined>();
  const [provinces, setProvinces] = useState<ProvinceProps[]>();
  const [curProvinceName, setCurProvince] = useState<string>();
  const [district, setDistrict] = useState<DistrictProps[]>();
  const [curDistrictName, setCurDistrictName] = useState<string>();
  const [ward, setWard] = useState<WardProps[]>();
  const [curWardName, setCurWardName] = useState<string>();
  const map = useAddressStore((state) => state.address);
  const [address, setAddress] = useState<AddressType>(null);
  const [bookingOptionId, setBookingOptionId] = useState<string>("e");
  const [staffSelectInputState, setStaffSelectInputState] =
    useState<searchStaffInputProps>(null);
  const [staffList, setStaffList] = useState<staffSelectType[]>();
  const [currentServiceCombo, setCurrentServiceCombo] = useState<string>();
  const [currentServiceComboState, setCurrentServiceComboState] =
    useState<ServiceComboType>();
  const { selectedList } = useStaffStore();
  const [getStaffMessage, setGetStaffMessage] = useState<string>();
  const [currentUserAddress, setCurrentUserAddress] = useState<string>();
  const [isFetchingStaff, setIsFetchingStaff] = useState<boolean>();
  const [acceptTerm, setAcceptTerm] = useState<boolean>()
  const router = useRouter();
  const [currentSpecificAddress, setCurrentSpecificAddress] = useState<string>();
  const setAddressText = useAddressStore(state => state.setAddressText)


  const firstUpdate = useRef(true);

  const bookingOptionData: bookingOptionDataType = [
    {
      id: "1",
      title: "Tự động tìm kiếm nhân viên phù hợp",
    },
    {
      id: "2",
      title: "Chọn nhân viên theo ý thích của bạn",
    },
  ];
  useEffect(() => {
    const fetchProvince = async () => {
      const _province = await getAllProvinces();
      setProvinces(_province);
    };
    fetchProvince();
  }, []);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const fetchDistrict = async () => {
      const provinceId = getCurrentProvinceId();

      if (provinceId) {
        setAddress((prev) => ({ ...prev, provinceId: provinceId }));
        const _district = await getAllDistricts(getCurrentProvinceId());
        setDistrict(_district);
      }
    };
    fetchDistrict();
  }, [curProvinceName]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    

    const fetchWard = async () => {
      const districtId = getCurrentDistrictId();
      if (districtId) {
        setAddress((prev) => ({ ...prev, districtId: districtId }));
        const _ward = await getAllWards(districtId);
        setWard(_ward);
      }
    };
    fetchWard();
  }, [curDistrictName]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const fetchWard = async () => {
      const wardId = getCurrentWardId();
      if (wardId) {
        setAddress((prev) => ({ ...prev, wardId: wardId }));
      }
    };
    fetchWard();
  }, [curWardName]);
  useEffect(() => {
    setCurrentServiceState(
      services.find((service) => service.serviceName == currentServiceName)
    );
  }, [currentServiceName, services]);

  useEffect(() => {
    const _currentServiceCombo: ServiceComboType | undefined =
      currentServiceState?.ServiceCombo.find(
        (item) => item.id === currentServiceCombo
      );
    setCurrentServiceComboState(_currentServiceCombo);


  }, [currentServiceCombo])

  useEffect(() => {
    const searchedAddress = currentAddress.addresses.filter(address => address.address.id == currentUserAddress)
    console.log(searchedAddress)
    if (searchedAddress.length > 0) {
      setAddressText(`${searchedAddress[0].address.province.provinceName}, ${searchedAddress[0].address.district.districtName}, ${searchedAddress[0].address.ward.wardName}`)
    }
  }, [currentUserAddress])

  useEffect(() => {
    setIsFetchingStaff(true);
    const fetchStaff = async () => {
      const _currentServiceCombo: ServiceComboType | undefined =
        currentServiceState?.ServiceCombo.find(
          (item) => item.id === currentServiceCombo
        );
      setCurrentServiceComboState(_currentServiceCombo);
      const _endTime =
        _currentServiceCombo?.duration + staffSelectInputState?.startTime;
      const requetsBody = {
        props: {
          serviceId: currentServiceState?.id,
          date: staffSelectInputState?.date, // specify the date
          startTime: staffSelectInputState?.startTime, // specify start time
          endTime: _endTime, // specify end time
          location: {
            provinceId: getCurrentProvinceId() + "",
            districtId: getCurrentDistrictId() + "",
            wardId: getCurrentWardId() + "",
          },
          map: {
            latitude: map?.latitude,
            longitude: map?.longitude,
          },
          addressId: currentUserAddress
        },


      };
      const staffResponse = await axios.post(
        "/api/staff/get-staff-on-demand",
        requetsBody
      );
      const staffs = staffResponse.data;
      console.log(staffs)
      if (staffResponse.status == 200 && !staffResponse.data.success) {
        setGetStaffMessage(staffs.message);
      }
      const rs: staffSelectType[] = [];
      //@ts-ignore
      staffs?.data?.map((staff) => {
        const staffSkills = staff.capabilities.map(
          //@ts-ignore
          (cap) => cap.Service.serviceName
        );
        let staffAddress: string;
        let defaultAddress = staff.addresses.filter(
          //@ts-ignore
          (address) => address.address.isDefault
        );
        if (defaultAddress.length == 0) defaultAddress = staff.addresses;

        if (defaultAddress.length > 0) {
          staffAddress =
            defaultAddress[0].address.specificAddress +
            ", " +
            defaultAddress[0].address.ward.wardName +
            ", " +
            defaultAddress[0].address.district.districtName +
            ", " +
            defaultAddress[0].address.province.provinceName;
        }
        rs.push({
          id: staff.id,
          staffName: staff.name,
          staffAvatar: staff.image,
          credibility: staff.credibility,
          //@ts-ignore
          distance: staff.distance,
          age: calculateAge(staff?.dob),
          skills: staffSkills,
          address: staffAddress,
          priority: staff.priority,
          numberOfFeedback: staff.numberOfFeedback
        });
      });
      setStaffList(rs);
      setIsFetchingStaff(false)
    };
    fetchStaff();
  }, [
    bookingOptionId,
    staffSelectInputState,
    currentServiceName,
    curDistrictName,
  ]);

  const handleSubmit = async (values: z.infer<typeof BookingFormSchema>) => {
    try {
      if (!acceptTerm) {
        toast.error("Vui lòng đồng ý với điều khoản và chính sách của chúng tôi trước khi đặt lịch")
        return
      }
      values.price = currentServiceComboState?.price + "";
      values.address = {
        provinceId: address?.provinceId,
        districtId: address?.districtId,
        wardId: address?.wardId,
        specificAddress: values.specificAddress,
        userId: userId,
      };
      values.map = { ...map };
      values.priorityStaffId = priorityStaffId;
      values.deposit = deposit;
      if (bookingOptionId == "2") {
        values.staffList = selectedList;
      } else {
        let generatedStaffList: staffSelectType[] = [];
        for (
          let index = 0;
          index < currentServiceComboState.staffNumber;
          index++
        ) {
          generatedStaffList.push(staffList[index]);
        }
        values.staffList = generatedStaffList;
      }
      console.log(selectedList);
      setError("");
      setSuccess("");
      console.log(values);
      startTransition(async () => {
        const res = await bookingAction(values);
        if (res?.isSuccess && res?.data?.paymentLink) {
          await createNotification(
            userId,
            "booking",
            `Yêu cầu đặt dịch vụ ${currentServiceName} của bạn đã được gửi đi. Đang chờ xác nhận từ nhân viên hệ thống.`
          );
          socket.emit(
            "notifyUser",
            userId,
            `Yêu cầu đặt dịch vụ ${currentServiceName} của bạn đã được gửi đi. Đang chờ xác nhận từ nhân viên hệ thống.`
          );

          for (const staff of selectedList) {
            await createNotification(
              staff.id,
              "booking",
              `Bạn có yêu cầu đặt dịch vụ mới ${currentServiceComboState.title}. Kiểm tra ngay.`
            );
            socket.emit(
              "notifyUser",
              staff.id,
              `Bạn có yêu cầu đặt dịch vụ mới ${currentServiceComboState.title}. Kiểm tra ngay`
            );
          }

          toast.success("Đặt lịch thành công");
          router.refresh();
          router.push(res.data?.paymentLink);
        }
        if (!res?.isSuccess) {
          toast.error(res?.message);
        }

      });
    } catch (err: any) {
      toast.error(err?.message);
      console.log(err);
    }
  };

  const getCurrentProvinceId = () => {
    const result = provinces?.filter((e) => e.provinceName == curProvinceName);
    if (result !== undefined && result.length > 0) return result[0]?.id;
  };
  const getCurrentDistrictId = () => {
    const result = district?.filter((e) => e.districtName == curDistrictName);
    if (result !== undefined && result.length > 0) return result[0]?.id;
  };

  const getCurrentWardId = () => {
    const result = ward?.filter((e) => e.wardName == curWardName);
    if (result !== undefined && result.length > 0) return result[0]?.id;
  };

  const getCurrentValue = (e: any) => {
    const _currentPrice = currentServiceState?.ServiceCombo.filter(
      (item) => item.id === e
    );
    const _currentPriceNumber = _currentPrice[0].price;
    setDeposit(((_currentPriceNumber * 10) / 100).toString());
  };

  const form = useForm<z.infer<typeof BookingFormSchema>>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      serviceName: "",
      specificAddress: "",
      serviceCombo: "",
      date: null,
      time: "08:00",
      userId: userId,
      bookingOption: "1",
      phoneNumber: "",
    },
  });

  return (
    <div className="flex justify-center dark:bg-booking-background-dark mb-20">
      {/* <div className="2xl:block hidden">
        <div className="absolute dark:border-gray-600 w-40 h-40 bg-transparent shadow-md backdrop-blur-sm animate-bounce duration-5000 top-80 left-[400px]  border border-gray-100 rounded-lg"></div>
        <div className="absolute dark:border-gray-600 w-40 h-40 bg-transparent shadow-lg backdrop-blur-sm animate-bounce duration-6000 top-60 right-[350px] z-10  border border-gray-100 rounded-lg"></div>

        <div className="absolute dark:border-gray-600 w-40 h-40 bg-transparent shadow-lg backdrop-blur-sm animate-bounce duration-7000 top-[500px] left-[800px]  border border-gray-100 rounded-lg"></div>
      </div> */}
      <div className="flex flex-col bg-white/10 justify-between mt-10 rounded-2xl dark:border-slate-700 shadow-2xl border border-white backdrop-blur-sm  lg:w-6/12 pb-8">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-3xl font-semibold mt-10">
            Tùy chọn về <span className="text-crusta">dịch vụ</span> của bạn
          </h2>
          {currentServiceState?.shortDescription ? (
            <p className="w-7/12 text-center mt-4 animate-fade-out">
              {currentServiceState?.shortDescription}
            </p>
          ) : (
            <div></div>
          )}
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col justify-around mt-8 px-12"
          >
            <div className="grid lg:grid-cols-2 md:grid-cols-1  gap-8">
              <FormField
                control={form.control}
                name="serviceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dịch vụ</FormLabel>
                    <div className="border rounded-md text-gray-500">
                      <Select
                        onValueChange={(e) => {
                          field.onChange(e);
                          setCurrentServiceName(e);
                        }}
                        defaultValue={currentServiceState?.serviceName}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent shadow-sm shadow-gray-600 h-12">
                            <SelectValue placeholder="Chọn dịch vụ bạn mong muốn " />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white backdrop-blur-[10px] ">
                          {services.map((e) => (
                            <SelectItem
                              value={e.serviceName}
                              key={e.id}
                              className={styles.option}
                            >
                              {e.serviceName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="">Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Nhập số điện thoại của bạn"
                        type="text"
                        className="bg-transparent border p-2 h-12 shadow-gray-600 rounded-md w-full focus:shadow-largeInset shadow-sm  border-t"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {currentAddress?.addresses?.length > 0 && (
              <div>
                <FormField
                  control={form.control}
                  name="userAddress"
                  render={({ field }) => (
                    <FormItem className="space-y-3 mb-4">
                      <FormLabel>Địa chỉ của bạn</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(e) => { field.onChange(e); setCurrentUserAddress(e); }}
                          className="grid grid-cols-3"
                        >
                          {currentAddress.addresses.map((e) => {
                            return (
                              <FormItem
                                key={e.address.id}
                                className=" shadow-sm shadow-gray-500 border-t  transition-all duration-200 rounded-lg mr-2 cursor-pointer hover:scale-105"
                              >
                                <FormLabel className="font-normal rounded-lg h-full block p-5 cursor-pointer has-[:checked]:shadow-none has-[:checked]:bg-crusta has-[:checked]:text-white">
                                  <div className="">
                                    <h2 className="font-semibold ">
                                      {e.address.specificAddress},{" "}
                                      {e.address.ward.wardName},{" "}
                                      {e.address.district.districtName},{" "}
                                      {e.address.province.provinceName}
                                    </h2>
                                  </div>
                                  <FormControl>
                                    <RadioGroupItem
                                      value={e.address.id}
                                      className="hidden"
                                    />
                                  </FormControl>
                                </FormLabel>
                              </FormItem>
                            );
                          })}
                          <FormItem className="flex items-center ">
                            <FormLabel className="cursor-pointer hover:scale-105 transition duration-100">
                              <div className="">
                                <CircleX className="w-12 text-crusta" />
                              </div>
                              <FormControl>
                                <RadioGroupItem value={""} className="hidden" />
                              </FormControl>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {

                  // <div className="font-semibold text-blue-700 mb-4">
                  //   Hoặc lựa chọn địa chỉ mới
                  // </div>
                }
              </div>
            )}




            {
              !currentUserAddress &&
              <div>
                <div className="grid lg:grid-cols-3 lg:mt-0 mt-4 gap-4">
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tỉnh</FormLabel>
                        <div className=" shadow-gray-600 rounded-md text-gray-500">
                          <Select
                            onValueChange={(e) => {
                              field.onChange(e);
                              setCurProvince(e);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-transparent shadow-sm shadow-gray-600 h-12">
                                <SelectValue placeholder="Chọn tỉnh nơi bạn sống" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="">
                              {provinces?.map((e) => (
                                <SelectItem value={e.provinceName} key={e.id}>
                                  {e.provinceName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thành phố/Quận</FormLabel>
                        <div className="shadow-sm shadow-gray-600 rounded-md text-gray-500">
                          <Select
                            onValueChange={(e) => {
                              field.onChange(e);
                              setCurDistrictName(e);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-transparent shadow-sm shadow-gray-600 h-12">
                                <SelectValue placeholder="Chọn Thành phố/Huyện nơi bạn sống" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="">
                              {district?.map((e) => (
                                <SelectItem value={e.districtName} key={e.id}>
                                  {e.districtName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ward"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Huyện/Xã</FormLabel>
                        <div className="shadow-sm shadow-gray-600 rounded-md text-gray-500">
                          <Select
                            onValueChange={(e) => {
                              field.onChange(e);
                              setCurWardName((prev) => e);
                              setAddressText(`${e}, ${curDistrictName}, ${curProvinceName}, VietNam`)
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-transparent shadow-sm shadow-gray-600 h-12">
                                <SelectValue placeholder="Chọn xã nơi bạn sống" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="">
                              {ward?.map((e) => (
                                <SelectItem value={e.wardName} key={e.id}>
                                  {e.wardName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="specificAddress"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="">Địa chỉ</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Nhập địa chỉ nhà bạn"
                          type="text"
                          className=" bg-transparent  p-2 h-12 rounded-md w-full focus:shadow-largeInset shadow-sm shadow-gray-600 dark:shadow-gray-100  dark:shadow-largeInsetWhite"
                          onBlur={(e) => setCurrentSpecificAddress(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="my-2">
                  <LocationReminder />
                </div>
              </div>
            }
            <div className="mt-2">
              {
                <MapWithGeocoder />
              }
            </div>

            <FormField
              control={form.control}
              name="serviceCombo"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Thời lượng và diện tích làm việc </FormLabel>
                  <FormControl>
                    <RadioGroup
                      //@ts-ignore
                      onValueChange={(e) => {
                        field.onChange(e);
                        getCurrentValue(e);
                        setCurrentServiceCombo(e);
                      }}
                      defaultValue={field.value}
                      className={cn(
                        currentServiceState?.ServiceCombo.length >= 3
                          ? `grid-cols-3 `
                          : "grid-cols-2",
                        "grid gap-8"
                      )}
                    >
                      {currentServiceState ? (
                        currentServiceState.ServiceCombo.map((e) => {
                          return (
                            <FormItem
                              key={e.id}
                              className="border border-crusta rounded-lg cursor-pointer  "
                            >
                              <FormLabel className="font-normal block p-3 has-[:checked]:bg-crusta has-[:checked]:text-white">
                                <div className="pl-2 py-2">
                                  <h2 className="md:text-xl text-md font-semibold mb-2">
                                    {e.title}
                                  </h2>
                                  <p className="  has-[:checked]:text-white md:text-sm text-sx font-light ">
                                    {e.description}
                                  </p>
                                </div>
                                <FormControl>
                                  <RadioGroupItem
                                    value={e.id}
                                    className="hidden"
                                  />
                                </FormControl>
                              </FormLabel>
                            </FormItem>
                          );
                        })
                      ) : (
                        <div className="text-red-500">
                          Vui lòng chọn dịch vụ trước
                        </div>
                      )}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex lg:flex-row flex-col lg:items-center justify-between mt-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col lg:w-5/12 mt-4">
                    <FormLabel>Thời gian sử dụng dịch vụ</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              "w-full pl-3 text-left text-black font-normal bg-transparent h-12 hover:bg-transparent hover:mb-2 transition duration-100 shadow-sm shadow-gray-600",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {
                              field.value ? (
                                field.value.toString() !== "Invalid Date" ?
                                  format(field.value, "PPP")
                                  :
                                  <span className="text-gray-500">Hãy nhập địa chỉ đặt lịch</span>
                              ) : (
                                <span>Chọn thời gian dọn dẹp</span>
                              )
                            }
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={(e) => {
                            field.onChange(new Date(e));
                            setStaffSelectInputState((prev) => ({
                              ...prev,
                              date: new Date(e),
                            }));
                          }}
                          translate="vi"
                          disabled={(date) => new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="lg:w-5/12">
                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Thời gian
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setStaffSelectInputState((prev) => ({
                            ...prev,
                            startTime: convertTimeToFloat(e.target.value),
                          }));
                        }}
                        disabled={isPending}
                        placeholder="Nhập thời gian sử dụng dịch vụ"
                        type="time"
                        className=" bg-transparent shadow-sm shadow-gray-600 leading-none  text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-500 block h-12 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {staffList?.length >= currentServiceComboState?.staffNumber ? (
              <FormField
                control={form.control}
                name="bookingOption"
                render={({ field }) => (
                  <FormItem className="space-y-3 mb-4">
                    <FormLabel>Tùy chọn</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(e) => {
                          field.onChange(e);
                          setBookingOptionId(e);
                        }}
                        className="grid grid-cols-2"
                        defaultValue={field.value}
                      >
                        {bookingOptionData.map((e) => {
                          return (
                            <FormItem
                              key={e.id}
                              className="border border-crusta rounded-lg cursor-pointer  "
                            >
                              <FormLabel className="font-normal block p-4 h-full text-slate-600 has-[:checked]:bg-crusta has-[:checked]:text-white">
                                <div className="">
                                  <h2 className="font-semibold text-lg">{e.title}</h2>
                                </div>
                                <FormControl>
                                  <RadioGroupItem
                                    value={e.id}
                                    className="hidden"
                                  />
                                </FormControl>
                              </FormLabel>
                            </FormItem>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              !isFetchingStaff &&
              <FormError message={getStaffMessage} />
            )}
            {
              isFetchingStaff &&
              <div className="w-full flex items-center justify-center">
                <img src="/searching_staff.gif" alt="searching_staff" />
              </div>
            }


            {bookingOptionId == "2" && (
              <div>
                <StaffMultiSelect data={staffList} staffNum={currentServiceComboState.staffNumber} />
              </div>
            )}
            <div className="w-full font-semibold text-slate-500">
              Phương thức thanh toán
            </div>

            <FormField
              control={form.control}
              name="paymentMethod"
              defaultValue="zalopay"
              render={({ field }) => (
                <FormItem className="mt-4 w-[160px]">
                  <FormControl>
                    <RadioGroup
                      //@ts-ignore
                      onValueChange={(e) => {
                        field.onChange(e);
                        console.log(e);
                      }}
                      defaultValue={"zalopay"}
                      className="grid grid-cols-2 gap-4"
                    >
                      {[
                        { title: "zalopay", img: ZaloPayImg.src },
                        { title: "payos", img: PayOsImg.src },
                      ].map((e, i) => {
                        return (
                          <FormItem
                            key={i}
                            className="rounded-lg cursor-pointer"
                          >
                            <FormLabel className="font-normal border block p-3 has-[:checked]:bg-slate-200 rounded-lg has-[:checked]:text-white">
                              <div>
                                <p className="mb-2 font-semibold text-slate-500">
                                  {e.title}
                                </p>
                                <img src={e.img} alt="logo" />
                              </div>
                              <FormControl>
                                <RadioGroupItem
                                  value={e.title}
                                  className="hidden"
                                />
                              </FormControl>
                            </FormLabel>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <hr className="w-full border-dashed border-crusta my-4" />

            <FormError message={error} />
            <FormSuccess message={success} />

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" onClick={() => setAcceptTerm((prev) => !prev)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                aria-required
              >
                <p className="">
                  Khi bạn ấn đặt lịch, đồng nghĩa với việc bạn đồng ý với &nbsp;
                  <a href="/license/term" className="text-crusta">
                    Điều Khoản &nbsp;
                  </a>
                  và &nbsp;
                  <a href="/license/policy" className="text-crusta">
                    Chính Sách &nbsp;
                  </a>
                  của chúng tôi.
                </p>
              </label>
            </div>

            {currentServiceCombo?.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl mt-4 text-crusta font-semibold">
                    Số tiền  phải thanh toán : {currentServiceComboState?.price && currencyFormater.format(+currentServiceComboState?.price)}                   </span>
                </div>

                <div className="flex w-full h-14 my-4 items-center justify-center">
                  <Button
                    type="submit"
                    disabled={isPending || (staffList?.length) == 0}
                    className="w-full h-full bg-crusta font-bold shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-crusta"
                  >
                    Thanh toán
                  </Button>
                </div>

              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
