import ProfileSidebar from "./component/sidebar";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="w-full flex items-center  justify-center">
      <div className="min-h-[80vh] flex w-full mt-12 justify-center ">
        <ProfileSidebar />
        <div className="w-9/12 flex shadow-lg shadow-gray-400 justify-around rounded-lg pt-10 border-t mb-10">
          <hr />
          {children}
        </div>
      </div>
    </div>
  );
}

