"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { AUTH_KEY } from "@/constants/cookieKeys";
import { LoginResponsePayload } from "@/models/LoginModel";

export const useGuard = () => {
  const [auth, setAuth] = useState<LoginResponsePayload>();
  const router = useRouter();

  const currentAuth = getCookie(AUTH_KEY)?.toString();

  useEffect(() => {
    if (currentAuth) {
      setAuth(JSON.parse(currentAuth));
    }
    else{
        router.push('/login');
    }
  }, [currentAuth, router])

  return auth;
};
