import { viewProfileAction } from "@/app/actions/profile/view-profile";
import { redirect } from "next/navigation";
import { format } from "date-fns"
import ViewProfileBox from "../component/ViewProfileBox";
const Profile = async () => {

  const data = await viewProfileAction();
  if (!data?.user) {
    return redirect("/auth/signin");
  }

  const user = data?.user;
  const time = user?.dob ? format(new Date(user.dob), "dd/MM/yyyy") : "N/A";

  const addressRecord = user?.addresses.length > 0 ? user.addresses[0].address : null;
  const formattedAddress = addressRecord
    ? {
      provinceName: addressRecord.province.provinceName,
      districtName: addressRecord.district.districtName,
      wardName: addressRecord.ward.wardName,
      specificAddress: addressRecord.specificAddress,
      isDefault: addressRecord.isDefault,
      id: addressRecord.id
    }
    : {
      id: "",
      provinceName: "",
      districtName: "",
      wardName: "",
      specificAddress: "Hiện chưa có địa chỉ của người dùng",
      isDefault: false
    };


  return (
    <div>
      <ViewProfileBox
        dob={time}
        gender={user?.gender}
        address={formattedAddress}
        name={user?.name}
        phone={user?.phone} />
    </div>
  );
};


export default Profile;


