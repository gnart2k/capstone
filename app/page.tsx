"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.user) {
      router.refresh();
      router.push("/home");
    } else {
      router.refresh()
      router.push("/welcome");
    }
  }, [session, router]);
};


export default Home;
