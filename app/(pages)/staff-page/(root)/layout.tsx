import { auth } from "@/auth";
import Header from "@/components/custom/header";
import StaffSidebar from "./components/staffSidebar";
import { RoleGate } from "@/app/auth/components/RoleGate";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session.user.role.toLowerCase() !== 'staff') {
    return (
      <div>
        <RoleGate allowedRole="staff" />
      </div>
    );
  } else {
    return (
      <div className="">
        <Header
          user={
            session.user
          } />
        <div className="flex lg:flex-row flex-col overflow-hidden">
          <StaffSidebar />
          <div className="lg:w-10/12">
            {children}
          </div>
        </div>
      </div>
    );
  }

}
