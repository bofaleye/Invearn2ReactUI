"use client";

import FormButton from "@/components/FormElements/FormButton";
import FormInput from "@/components/FormElements/FormInput";
import React from "react";
import { ForgetPasswordFormSchema, ForgetPasswordFormState } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

export interface ForgetPasswordFormProps {
  onFormSubmit: SubmitHandler<ForgetPasswordFormState>;
  isLoading?: boolean;
}

const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = ({
  onFormSubmit,
  isLoading,
}) => {
  // Variables
  let initialValues: ForgetPasswordFormState = {
    email: "",
  };

  // Hooksnpm 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgetPasswordFormState>({
    resolver: yupResolver(ForgetPasswordFormSchema),
  });

  // Values
  const email = watch("email", "");

  return (
    <div className="bg-white rounded-lg shadow lg:w-2/5 sm:w-3/5 w-full dark:bg-gray-800 md:p-14 px-6 py-10">
      {/** GreenPole Logo */}
      <div className="mb-8">
        <Image src="/Greenpole-Logo 1.svg" alt="" width={178} height={61} />
      </div>

      <div className="w-full">
        {/** Title */}
        <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">
          Forgot your password?
        </h2>

        <p className="my-5 text-gray-500 sm:text-base text-sm">
          {`Don't fret! Just type in your email and we will send 
                    you a code to reset your password!`}
        </p>

        {/** Form */}
        <form
          className="space-y-6 lg:pb-5"
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

          <FormButton
            className={`${
              !email ? "bg-gray-200 text-gray-500" : "bg-brand-200"
            }`}
            // onClick={()=> props.handleSubmit()}
            loading={isLoading}
            disabled={!email}
          >
            Recover Password
          </FormButton>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
