import { auth } from "@/auth";
import Header from "@/components/custom/header";
import ManagerSidebar from "./components/ManagerSidebar";
import { RoleGate } from "@/app/auth/components/RoleGate";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session.user.role.toLowerCase() !== 'manager') {
    return (
      <div>
        <RoleGate allowedRole="manager" />
      </div>
    );
  } else {
    return (
      <div className="h-screen overflow-hidden">
        <Header
          user={
            session.user
          } />
        <div className="flex h-[86vh] ">
          <ManagerSidebar />
          <div className="w-10/12 h-screen ">
            {children}
          </div>
        </div>
      </div>
    );
  }
}


