"use client"

import { PasswordResetIcon } from "@/assets";
import AuthPageLayout from "@/components/LandingPage/AuthPageLayout";
import ForgetPasswordForm from "@/app/forgot-password/securities/ForgotPasswordForm";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import React from "react";
import { ResetPasswordFormState } from "./securities/ResetFormPassword/schema";
import ResetCodeForm from "./securities/ResetCodeForm";
import ResetPasswordForm from "./securities/ResetFormPassword";

const ForgotPasswordPage: NextPage<any> = ()=>{

    // State
    const [loading, setLoading] = React.useState<boolean>(false);
    const [resetCode, setResetCode] = React.useState<string>("");
    const [isReset, setIsReset] = React.useState<boolean>(false);

    // Hooks
    const searchParams = useSearchParams();
    const router = useRouter();

    // Query Params
    const emailSent = searchParams.get('email-sent');

    // Handlers
    const handleSubmit = ()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
            alert("Yay, submitted!")
            router.push("/forgot-password?email-sent=true")
        }, 1500);
    }
    const handleCodeSubmit = (code: string)=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
            // alert(`Code submitted: ${code}`)
            setResetCode(code)
        }, 1500);
    }
    const handleResetPassword = (state: ResetPasswordFormState)=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
            // alert(`Code submitted: ${code}`)
            setIsReset(true)
        }, 1500);
    }
    const handleDone = ()=> router.push('/login');


    // Elements
    const successDisplay = (
        <div className="bg-white rounded-lg shadow lg:w-2/5 sm:w-3/5 w-full dark:bg-gray-800 md:p-14 px-6 py-10">
            <div className="flex justify-center">
                <PasswordResetIcon/>
            </div>
            <p className="my-6 text-center text-gray-700 text-2xl">
                Password Reset Successful.
            </p>
            <div className="flex justify-center">
                <button 
                    onClick={handleDone}
                    type="button" 
                    className="px-20 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-2 focus:ring-brand-100 focus:outline-none bg-brand-200"
                >
                    Done
                </button>
            </div>
        </div>
    )

    return(
        <AuthPageLayout>
            {
                emailSent !== 'true' && !resetCode && !isReset &&
                <ForgetPasswordForm
                    isLoading={loading}
                    onFormSubmit={handleSubmit}
                />
            }
            {
                emailSent === 'true' && !resetCode && !isReset &&
                <ResetCodeForm
                    isLoading={loading}
                    onFormSubmit={handleCodeSubmit}
                />
            }
            {
                emailSent === 'true' && resetCode && !isReset &&
                <ResetPasswordForm
                    isLoading={loading}
                    onFormSubmit={handleResetPassword}
                />
            }
            
            { isReset && successDisplay }
        </AuthPageLayout>
    )
}

export default ForgotPasswordPage;