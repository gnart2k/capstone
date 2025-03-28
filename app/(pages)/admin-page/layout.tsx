import { auth } from "@/auth";
import Header from "@/components/custom/header";
import ManagerSidebar from "../manager-page/components/ManagerSidebar";
import AdminSidebar from "./components/AdminSidebar";
import { RoleGate } from "@/app/auth/components/RoleGate";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session.user.role.toLowerCase() !== 'admin') {
    return (
      <div>
        <RoleGate allowedRole="admin" />
      </div>
    );
  } else {
    return (
      <div>
        <Header
          user={
            session.user
          } />
        <div className="flex overflow-hidden">
          <AdminSidebar />
          <div className="w-10/12 pb-8">
            {children}
          </div>
        </div>
      </div>
    );
  }
}



