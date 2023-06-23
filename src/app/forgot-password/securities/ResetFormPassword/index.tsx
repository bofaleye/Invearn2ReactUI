"use client"

import FormButton from "@/components/FormElements/FormButton";
import FormInput from "@/components/FormElements/FormInput";
import React from "react";
import { ResetPasswordFormSchema, ResetPasswordFormState } from "./schema";
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";

export interface ResetPasswordFormProps{
    onFormSubmit: SubmitHandler<ResetPasswordFormState>;
    isLoading?: boolean
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
    onFormSubmit, 
    isLoading
})=>{

    // Variables
    let initialValues: ResetPasswordFormState = {
        password: "",
        confirmPassword: ""
    }

    // Hooks
    const { handleSubmit, watch, register, formState: { errors } } = useForm<ResetPasswordFormState>({
        resolver: yupResolver(ResetPasswordFormSchema)
    })

    // Values
    const password = watch('password', '');
    const confirmPassword = watch('confirmPassword', '');

    // Helpers
    const renderIcon = (isValid: boolean) =>{
        if (isValid) {
            return (
                <AiFillCheckCircle className="w-[15px] h-[15px] text-brand-200"/>
            )
        }

        return (
            <AiFillCloseCircle className="w-[15px] h-[15px] text-red-600"/>
        )
    }

    // Regex
    const atLeast10 = /(?=.{10,})/
    const atLeastUppercase = /(?=.*[A-Z])/
    const atLeastSpecialCharacter = /(?=.[-+_!@#$%^&., ?])/
    const combinedRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{10,})/

    return(
        <div className="bg-white rounded-lg shadow lg:w-2/5 sm:w-3/5 w-full dark:bg-gray-800 md:p-14 px-6 py-10">
            
            {/** GreenPole Logo */}
            <div className="mb-8">
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
                    Reset Password
                </h2>

                <p className="my-5 text-gray-500 sm:text-base text-sm">
                    {`Don't fret! Just type in your email and we will send 
                    you a code to reset your password!`}
                </p>

                {/** Form */}
                <form className="space-y-6 lg:pb-5" onSubmit={handleSubmit(onFormSubmit)}>

                    {/** Inputs */}
                    <FormInput
                        id="reset-password"
                        label="New Password"
                        type="password"
                        error={!!errors.password}
                        errorMessage=""
                        success={combinedRegex.test(password)}
                        {...register('password')}
                    />
                    {
                        password &&
                        <div className="flex flex-col space-y-2 pb-3">
                            <div className="flex">
                                { renderIcon(atLeast10.test(password)) }
                                <p className="ml-2 sm:text-xs text-[11px] text-gray-500">
                                    At least 10 characters (and up to 100 characters)
                                </p>
                            </div>
                            <div className="flex">
                                { renderIcon(atLeastUppercase.test(password)) }
                                <p className="ml-2 sm:text-xs text-[11px] text-gray-500">
                                    At least one uppercase character
                                </p>
                            </div>
                            <div className="flex">
                                { renderIcon(atLeastSpecialCharacter.test(password)) }
                                <p className="ml-2 sm:text-xs text-[11px] text-gray-500">
                                    Inclusion of at least one special character, e.g., ! @ # ?
                                </p>
                            </div>
                        </div>
                    }

                    <FormInput
                        id="reset-confirm-password"
                        label="Confirm New Password"
                        type="password"
                        error={!!errors.confirmPassword}
                        errorMessage={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                    />


                    <FormButton className={`${!(password && confirmPassword)? "bg-gray-200 text-gray-500" : "bg-brand-200"}`}
                        // onClick={()=> props.handleSubmit()}
                        loading={isLoading}
                        disabled={!(password && confirmPassword)}
                    >
                        Recover Password
                    </FormButton>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordForm;