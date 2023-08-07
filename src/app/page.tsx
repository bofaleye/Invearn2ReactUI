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

const LoginPage: NextPage<any> = () => {
  // RTK
  const [login, response] = useLoginMutation();

  // Hooks
  const router = useRouter();

  // Handlers
  const handleSubmit = async (state: LoginFormState) => {
    try {
      const { email, password } = state;
      const userCredential = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      const userToken = await user?.getIdToken();
      //  const tokenExpirationTime = user?.stsTokenManager.expirationTime;
      // let accessToken = userCred.user?.multiFactor?.user?.accessToken
      // let cookieExpiration = res.data?.payload.expiresIn
      //       ? new Date(res.data?.payload.expiresIn)
      //       : undefined;
      let obj = { accessToken: userToken };
      setCookie(AUTH_KEY, JSON.stringify(obj));
      router.push("/dashboard");
    } catch (err) {
      toast.error("An error occured while signing you in: " + err, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
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
