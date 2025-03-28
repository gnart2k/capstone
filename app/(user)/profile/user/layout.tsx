
import { viewProfileAction } from "@/app/actions/profile/view-profile";
import { useParams } from "next/navigation";
import ProfileZone from "../component/profileZone";
import ProfileTopbar from "../component/topbar";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await viewProfileAction();
  return (
    <div className="w-full flex  justify-around rounded-lg">
      <ProfileZone name={data?.user?.name} avatar={data?.user?.image} email={data?.user?.email} />
      <div className="w-8/12 flex flex-col">
        <ProfileTopbar />
        <hr />
        {children}
      </div>
    </div>

  );
}



