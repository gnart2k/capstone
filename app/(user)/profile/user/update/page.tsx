import { viewProfileAction } from "@/app/actions/profile/view-profile";
import UpdateProfileForm from "./components/updateProfileForm";
import { GetDefaultAddress } from "@/app/actions/users/GetDefaultAddress";
import { auth } from "@/auth";

export default async function Profile() {
  const data = await viewProfileAction();
  const session = await auth();

  return (
    <div>
      <UpdateProfileForm
        id={session?.user?.id}
        phone={data?.user.phone}
        dob={data.user?.dob}
        addresses={data.user?.addresses}
        gender={data?.user?.gender}
        name={data?.user?.name}
      />
    </div>
  )

}
