"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useGuard = (): boolean => {
  const [authorized, setAuthorized] = useState(true);
  const router = useRouter();
  if(!authorized) {
    router.push("/");
  }

  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   if(status != "authenticated"){
  //     router.push("/login");
  //   }else if (status === "authenticated") {
  //     setAuthorized(true);
  //   }
  // }, [status, router])


  return authorized;
}