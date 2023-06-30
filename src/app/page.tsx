"use client";

import LoginForm from "@/app/login/securities/LoginForm";
import { NextPage } from "next";
import React from "react";
import { LoginFormState } from "./login/securities/LoginForm/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import { AUTH_KEY } from "@/constants/cookieKeys";
import { useLoginMutation } from "./login/loginApiSlice";

const LoginPage: NextPage<any> = () => {
  // RTK
  const [login, response] = useLoginMutation();

  // Hooks
  const router = useRouter();

  // Handlers
  const handleSubmit = (state: LoginFormState) => {
    login(state)
      .then((res: any) => {
        if (res.error) {
          toast.error(
            res.error?.data?.message || "An error occured while signing you in",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else {
          // Set auth
          let cookieExpiration = res.data?.payload.expiresIn
            ? new Date(res.data?.payload.expiresIn)
            : undefined;
          setCookie(AUTH_KEY, JSON.stringify(res.data?.payload), {
            expires: cookieExpiration,
          });
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        toast.error("An error occured while signing you in", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  const onRememberMe = (checked: boolean) => {
    alert(`Remember me is: ${checked}`);
  };

  return (
    <div className="bg-login-background h-screen bg-no-repeat bg-cover flex items-center justify-center sm:p-0 px-4">
      <LoginForm
        isLoading={response.isLoading}
        onFormSubmit={handleSubmit}
        // onRememberMe={onRememberMe}
      />
    </div>
  );
};

export default LoginPage;