import { viewProfileAction } from "@/app/actions/profile/view-profile";
import { redirect } from "next/navigation";
const Profile = async () => {

  const data = await viewProfileAction();
  if (!data?.user) {
    return redirect("/auth/signin");
  } else {
    return redirect("/profile/user")
  }

}
export default Profile;
