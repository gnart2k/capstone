import { viewProfileAction } from "@/app/actions/profile/view-profile";
import UpdateProfileForm from "./components/updateProfileForm";
import { auth } from "@/auth";

export default async function Profile() {
  const data = await viewProfileAction();
  const session = await auth();

  return (
    <div>
      <UpdateProfileForm
        id={session?.user?.id}
        phone={data?.user.phone}
        dob={data.user?.dob ? data.user.dob : undefined}
        addresses={data.user?.addresses}
        gender={data?.user?.gender}
        name={data?.user?.name}
      />
    </div>
  )

}
