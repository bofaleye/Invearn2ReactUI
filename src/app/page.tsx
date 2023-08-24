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
import Firebase from "../../firebase.config";
import { login } from "@/components/AuthManager";

const LoginPage: NextPage<any> = () => {
  // RTK
  // const [login, response] = useLoginMutation();

  // Hooks
  const router = useRouter();

  // Handlers
  const handleSubmit = async (state: LoginFormState) => {
    const { email, password } = state;
   const isLogin = await login({email, password});
   if(isLogin){
      router.push('/dashboard');
   }

  };
  const onRememberMe = (checked: boolean) => {
    alert(`Remember me is: ${checked}`);
  };

  return (
    <div className="bg-login-background h-screen bg-no-repeat bg-cover flex items-center justify-center sm:p-0 px-4">
      <LoginForm
        isLoading={false}
        onFormSubmit={handleSubmit}
        // onRememberMe={onRememberMe}
      />
    </div>
  );
};

export default LoginPage;
