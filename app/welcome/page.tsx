"use client"
import Header from "@/components/custom/header";
import Welcome from "./component/Welcome";
import Footer from "@/components/custom/footer";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAsPath } from "../store/usePathStore";
import WelcomeSkeleton from "./component/WelcomSkeleton";
import HomeContainerSkeleton from "@/components/custom/skeleton/HomeSkeleton";
import LoadingPage from "@/components/custom/LoadingPage";

export default function WelcomePage() {
  const router = useRouter();
  const pathStore = useAsPath();
  const session = useSession();
  const [isRedirect, setIsRedirect] = useState(null)
  const isLoading = (pathStore.prevAsPath[pathStore?.prevAsPath.length - 1] == "/" && pathStore.prevAsPath[pathStore?.prevAsPath.length - 2] == "/home" && pathStore.prevAsPath[pathStore?.prevAsPath.length - 3] == "/auth/signin")
  useEffect(() => {
    setIsRedirect((pathStore.prevAsPath[pathStore?.prevAsPath.length - 1] == "/home" && pathStore.prevAsPath[pathStore?.prevAsPath.length - 2] == "/auth/signin") || (pathStore.prevAsPath[pathStore?.prevAsPath.length - 1] == "/auth/signin" && pathStore.prevAsPath[pathStore?.prevAsPath.length - 2] == "/auth/signin"))
    console.log(pathStore)
    if (session?.data?.user) {
      router.refresh();
      router.push("/home")
    } else {
      if (isRedirect) window?.location?.replace("/home");
    }
  }, [isRedirect]);

  return (
    <div>
      {
        (isRedirect == null || pathStore?.currentAsPath == undefined || isRedirect || isLoading) ? (
          <LoadingPage />
        ) : (
          <div>
            <Header user={session?.data?.user} />
            <div>
              <Welcome />
            </div>
            <Footer />

          </div>
        )
      }
    </div>
  );
}
