"use client";

import FormButton from "@/components/FormElements/FormButton";

import FormInput from "@/components/FormElements/FormInput";

import Link from "next/link";

import React from "react";

import { LoginFormSchema, LoginFormState } from "./schema";

import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

export interface LoginFormProps {
  onFormSubmit: SubmitHandler<{ email: string; password: string }>;
  onRememberMe?: (checked: boolean) => void;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onRememberMe,
  onFormSubmit,
  isLoading,
}) => {
  // Variables

  let initialValues: LoginFormState = {
    email: "",
    password: "",
  };

  // Hooks

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormState>({
    resolver: yupResolver(LoginFormSchema),
  });

  // Handlers

  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    onRememberMe && onRememberMe(e.currentTarget.checked);
  };

  return (
    <div className="bg-white rounded-lg shadow lg:w-2/5 sm:w-3/5 w-full dark:bg-gray-800 md:p-14 px-6 py-10">
      {/** GreenPole Logo */}

      <div className="mb-8 flex justify-center">
        <Image
          src="/Greenpole-Logo 1.svg" 
          alt=""
          width={178}
          height={61}
        />
      </div>

      <div className="w-full">
        {/** Title */}

        <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">
          Login
        </h2>

        {/** Form */}

        <form
          className="mt-8 space-y-6 lg:pb-5"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          {/** Inputs */}

          <FormInput
            id="login-email"
            label="Email"
            placeholder="name@company.com"
            error={!!errors.email}
            errorMessage={errors.email?.message}
            {...register("email")}
          />

          <FormInput
            id="login-password"
            label="Password"
            type="password"
            error={!!errors.password}
            errorMessage={errors.password?.message}
            {...register("password")}
          />

          {/** Remeber me / Forgot Password */}

          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                id="remember-checkbox"
                type="checkbox"
                value=""
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />

              <label
                htmlFor="remember-checkbox"
                className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-brand hover:text-brand-200"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/** Pending -- Add color to tailwind config */}

          <FormButton
            className="bg-brand-200"
            //onClick={()=> props.handleSubmit()}
            loading={isLoading}
          >
            Login
          </FormButton>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
