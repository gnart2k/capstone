"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DistrictProps, ProvinceProps, WardProps } from "@/app/(user)/booking/component/bookingForm";
import { startTransition, useEffect, useLayoutEffect, useRef, useState } from "react"
import { getAllDistricts, getAllProvinces, getAllWards } from "@/app/actions/location/get";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
import { createAddressAction } from "@/app/actions/profile/update-profile";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type AddressProps = {
  address: {
    id: string,
    province: {
      id: number,
    };
    district: {
      id: number
    };
    ward: {
      id: number
    };
    specificAddress: string
    isDefault: boolean
  }
}

export default function CreateAddressDialog() {
  const [provinces, setProvinces] = useState<ProvinceProps[]>([]);
  const [districts, setDistricts] = useState<DistrictProps[]>([]);
  const [wards, setWards] = useState<WardProps[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const [specificAddress, setSpecificAddress] = useState<string>("");
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const router = useRouter();
  const [newAddress, setNewAddress] = useState<AddressProps>({
    address: {
      id: "",
      province: {
        id: 0,
      },
      district: {
        id: 0
      },
      ward: {
        id: 0
      },
      specificAddress: "",
      isDefault: false
    }
  })

  const firstUpdate = useRef(true);
  useEffect(() => {
    const fetchProvinces = async () => {
      const _provinces = await getAllProvinces();
      setProvinces(_provinces);
    }
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        const provinceId = provinces.find(p => p.provinceName === selectedProvince)?.id;
        if (provinceId) {
          const _districts = await getAllDistricts(provinceId);
          setDistricts(_districts);
        }
      }
      fetchDistricts();
    }
  }, [selectedProvince, provinces]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        const districtId = districts.find(d => d.districtName === selectedDistrict)?.id;
        if (districtId) {
          const _wards = await getAllWards(districtId);
          setWards(_wards);
        }
      }
      fetchWards();
    }
  }, [selectedDistrict, districts]);

  const getCurrentProvinceId = (provinceName: string) => {
    const result = provinces?.filter(e => e.provinceName == provinceName)
    if (result !== undefined && result.length > 0) return result[0]?.id;
  }
  const getCurrentDistrictId = (districtName: string) => {
    const result = districts.filter(e => e.districtName == districtName)
    if (result !== undefined && result.length > 0) return result[0].id;
  }

  const getCurrentWardId = (wardName: string) => {
    const result = wards.filter(e => e.wardName == wardName)
    if (result !== undefined && result.length > 0) return result[0].id;
  }

  const handleSubmit = async (values: any) => {
    values.preventDefault();
    setError("")
    setSuccess("")
    let _newAddress = { ...newAddress }
    _newAddress.address!.province.id = getCurrentProvinceId(selectedProvince)
    _newAddress.address!.district.id = getCurrentDistrictId(selectedDistrict)
    _newAddress.address!.ward.id = +getCurrentWardId(selectedWard)
    _newAddress.address!.specificAddress = specificAddress
    setNewAddress(prev => _newAddress)
    startTransition(async () => {
      const data = await createAddressAction(_newAddress)
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
        setSuccess(data?.success);
        window.location.reload();
      }
    })
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" h-full bg-crusta font-bold shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-crusta">Tạo địa chỉ</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Tạo địa chỉ</DialogTitle>
          <DialogDescription>
            Bạn có thể tạo tối đa 3 địa chỉ
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 grid-cols-3">
            <div className="border border-orange-400 rounded-md text-gray-500">
              <Select onValueChange={setSelectedProvince}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tỉnh nơi bạn sống" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem value={province.provinceName} key={province.id}>
                      {province.provinceName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="border border-orange-400 rounded-md text-gray-500">
              <Select onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn Thành phố/Huyện nơi bạn sống" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem value={district.districtName} key={district.id}>
                      {district.districtName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="border border-orange-400 rounded-md text-gray-500">
              <Select onValueChange={setSelectedWard}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn Xã/Phường nơi bạn sống" />
                </SelectTrigger>
                <SelectContent>
                  {wards.map((ward) => (
                    <SelectItem value={ward.wardName} key={ward.id}>
                      {ward.wardName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <input
              className="col-span-4 mb-3 border border-crusta p-2 mr-4 rounded-md"
              placeholder="Địa chỉ cụ thể"
              value={specificAddress}
              onChange={(e) => setSpecificAddress(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button className={cn("bg-crusta text-white font-semibold hover:bg-crusta hover:shadow-md")} type="submit">Lưu địa chỉ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
